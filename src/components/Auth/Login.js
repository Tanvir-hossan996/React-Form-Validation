import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, Form, Segment, Header, Button, Icon, Message } from "semantic-ui-react";
import { auth, signInWithEmailAndPassword } from "../../Firebase-config";
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMsg: "",
    loading: false,
    successMsg: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isEmpaty = ({ email, password }) => {
    if (!email.length && !password.length) {
      this.setState({ errorMsg: "Fill the all filed" });
    } else if (!email.length) {
      this.setState({ errorMsg: "Enter Your Email" });
    } else if (!password.length) {
      this.setState({ errorMsg: "Enter Your Password" });
    } else {
      return true;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isEmpaty(this.state)) {
      this.setState({ loading: true });
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          console.log(userCredential);
          this.setState({ email: "" });
          this.setState({ password: "" });
          this.setState({ errorMsg: "" });
          this.setState({ loading: false });
          this.setState({ successMsg: "Your Account Login Successful." });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("user")) {
            this.setState({ errorMsg: "This email not found" });
          } else if (errorCode.includes("wrong-password")) {
            this.setState({ errorMsg: "This is wrong password" });
          }
          this.setState({ loading: false });
        });
    }
  };
  render() {
    const { email, password, errorMsg, successMsg, loading } = this.state;
    return (
      <Grid textAlign="center" style={{ background: "#3AADA3", height: "100vh" }}>
        <Grid.Column style={{ maxWidth: "500px" }}>
          <Header as="h1" icon textAlign="center" style={{ color: "white" }}>
            <Icon name="group" style={{ color: "white" }} />
            LOGIN
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
              <Button
                style={{ width: "60%", borderRadius: "20px", background: "#3AADA3", color: "white" }}
                type="submit"
                className={loading ? "loading primary disabled" : ""}
              >
                {" "}
                Sign In
              </Button>
            </Form>
            <Message>
              <Message.Header>
                Don't Have An Account? <Link to="/">Sign Up</Link>
              </Message.Header>
            </Message>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
