import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import auth from "../utils/auth";

// import { BrowserRouter, Route, Switch } from 'react-router-dom';

function Login(props) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  let email = useRef()
  let password = useRef()
  let history = useHistory()

  const [loginStatus, setLoginStatus] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    let currentUser = {
      email: email.current.value,
      password: password.current.value,
    }
    console.log(currentUser)


    axios.post("/api/login", currentUser)
      .then((res) => {
        if (!res.data.auth) {
          setLoginStatus(false);
        } else {
          localStorage.setItem("token", "Bearer " + res.data.token);
          setLoginStatus(true);

          // auth.login(() => {
          //   props.history.push("/")
          // })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const userAuthenticated = () => {
    axios.get("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res);
    })
  }



  return (
    <Container className="container">
      <Card className="loginCard">
        <Card.Header>
          Login
        </Card.Header>
        <Form
          className="loginForm"
          onSubmit={handleSubmit}>
          <Form.Group
            className="loginGroup"
            size="lg"
            controlId="email">
            <Form.Label
              className="formLabel">
              Email
            </Form.Label>
            <Form.Control
              autoFocus
              type="email"
              ref={email}
            />
          </Form.Group>
          <Form.Group
            className="loginGroup"
            size="lg"
            controlId="password">
            <Form.Label
              className="formLabel">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              ref={password}
            />
          </Form.Group>
          <Button
            className="loginBtn"
            block type="submit">
            Login
          </Button>
        </Form>
      </Card>


      {loginStatus && (
        <button onClick={userAuthenticated}>Check If Auth</button>
      )}
    </Container>
  );

}

export default Login;