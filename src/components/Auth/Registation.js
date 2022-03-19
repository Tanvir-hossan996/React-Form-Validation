import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Form, Segment, Header, Button, Icon, Message } from "semantic-ui-react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  getDatabase,
  ref,
  set,
} from "../../Firebase-config";

export default class Registation extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
    successMsg: "",
    loading: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isEmpaty = ({ firstName, lastName, email, password, confirmPassword }) => {
    if (
      !firstName.length &&
      !lastName.length &&
      !email.length &&
      !password.length &&
      !confirmPassword.length
    ) {
      this.setState({ errorMsg: "Fill the all filed" });
    } else if (!firstName.length) {
      this.setState({ errorMsg: "Enter the first Name" });
    } else if (!lastName.length) {
      this.setState({ errorMsg: "Enter the Last Name" });
    } else if (!email.length) {
      this.setState({ errorMsg: "Enter the Email" });
    } else if (!password.length) {
      this.setState({ errorMsg: "Enter the Password" });
    } else if (!confirmPassword.length) {
      this.setState({ errorMsg: "Enter the confirm Password" });
    } else if (password.length < 8 || confirmPassword.length < 8) {
      this.setState({ errorMsg: "Password should be at least 8 letter" });
    } else if (password !== confirmPassword) {
      this.setState({ errorMsg: "Password did not match" });
    } else {
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isEmpaty(this.state)) {
      this.setState({ loading: true });
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          console.log(userCredential);
          updateProfile(auth.currentUser, {
            displayName: this.state.firstName + " " + this.state.lastName,
          })
            .then(() => {
              this.writeUserData(userCredential);
              console.log(userCredential);
            })
            .then(() => {
              this.setState({ firstName: "" });
              this.setState({ lastName: "" });
              this.setState({ email: "" });
              this.setState({ password: "" });
              this.setState({ confirmPassword: "" });
              this.setState({ errorMsg: "" });
              this.setState({ loading: false });
              this.setState({ successMsg: "Account Created Successfully." });
            })
            .catch((error) => {
              const errorCode = error.code;
              if (errorCode) {
                this.setState({ errorMsg: "User name not valid" });
              }
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("email")) {
            this.setState({ errorMsg: "This email already in use" });
          }
          this.setState({ loading: false });
        });
    }
  };

  writeUserData = (user) => {
    const db = getDatabase();
    set(ref(db, "users/" + user.user.uid), {
      username: this.state.firstName + " " + this.state.lastName,
    });
  };

  render() {
    const { firstName, lastName, email, password, confirmPassword, errorMsg, successMsg, loading } =
      this.state;
    return (
      <Grid style={{ background: "#3AADA3", height: "100vh" }} textAlign="center">
        <Grid.Column style={{ maxWidth: "500px" }}>
          <Header as="h1" icon textAlign="center" style={{ color: "white" }}>
            <Icon style={{ color: "white" }} name="group" />
            CREATE ACCOUNT
          </Header>
          <Segment stacked>
            {errorMsg ? (
              <Message negative>
                <Message.Header>{errorMsg}</Message.Header>
              </Message>
            ) : (
              ""
            )}
            {successMsg ? (
              <Message positive>
                <Message.Header>{successMsg}</Message.Header>
              </Message>
            ) : (
              ""
            )}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group width="equal">
                <Form.Field style={{ width: "49%", marginRight: "10px" }}>
                  <label style={{ textAlign: "left" }}>
                    <Icon name="user" />
                    Fist Name
                  </label>
                  <input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    onChange={this.handleChange}
                    value={firstName}
                  />
                </Form.Field>
                <Form.Field style={{ width: "49%" }}>
                  <label style={{ textAlign: "left" }}>
                    <Icon name="user" />
                    Last Name
                  </label>
                  <input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    onChange={this.handleChange}
                    value={lastName}
                  />
                </Form.Field>
              </Form.Group>
              {/* Equal */}
              <Form.Field className={errorMsg.includes("email") ? "error" : ""}>
                <label style={{ textAlign: "left" }}>
                  <Icon name="mail" />
                  E-mail
                </label>
                <input
                  placeholder="Your E-mail"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                />
              </Form.Field>
              <Form.Field className={errorMsg.includes("Password") ? "error" : ""}>
                <label style={{ textAlign: "left" }}>
                  <Icon name="lock" />
                  Password
                </label>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                />
              </Form.Field>
              <Form.Field className={errorMsg.includes("Password") ? "error" : ""}>
                <label style={{ textAlign: "left" }}>
                  <Icon name="repeat" />
                  Confirm Password
                </label>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.handleChange}
                  value={confirmPassword}
                />
              </Form.Field>
              <Button
                style={{ width: "60%", borderRadius: "20px", background: "#3AADA3", color: "white" }}
                type="submit"
                className={loading ? "loading primary disabled" : ""}
              >
                Sign Up
              </Button>
            </Form>
            <Message>
              <Message.Header>
                Already Have An Account? <Link to="/login"> Sign In</Link>
              </Message.Header>
            </Message>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
