import { FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastError } from "../components/Toast";
import axios from "axios";
import { UserContext } from "../context/UsersContext";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

export function Signup() {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    axios
      .post("http://localhost:3500/users/signup", {
        name,
        last_name,
        username,
        email,
        password,
      })
      .then(async (response) => {
        setIsSubmitting(true);
        if (response.data.errors) {
          setIsSubmitting(false);
          for (const i in response.data.errors) {
            toastError(response.data.errors[i].error);
          }
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, token: response.data.token };
          });
          navigate("/profile");
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
        toastError(genericErrorMessage);
      });
  };

  return (
    <MDBCard className="card-form">
      <MDBCardBody>
        <div className="img-form-container">
          <img
            className="img-form"
            src="https://res.cloudinary.com/dh9ph7mpz/image/upload/v1670752876/uploads_webapp/logo-cipher_mdbtxt.png"
          />
        </div>
        <MDBCardTitle className="card-title">For Gamers By Gamers</MDBCardTitle>
        <form onSubmit={formSubmitHandler} className="auth-form">
          <FormGroup label="First Name" labelFor="name">
            <InputGroup
              id="name"
              placeholder="First Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup label="Last Name" labelFor="last_name">
            <InputGroup
              id="last_name"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={last_name}
            />
          </FormGroup>
          <FormGroup label="User Name" labelFor="username">
            <InputGroup
              id="username"
              placeholder="User Name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </FormGroup>
          <FormGroup label="Email" labelFor="email">
            <InputGroup
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormGroup>
          <FormGroup label="Password" labelFor="password">
            <InputGroup
              id="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </FormGroup>
          <button
            className="button-form"
            disabled={isSubmitting}
            type="submit"
          >{`${isSubmitting ? "Registering" : "Register"}`}</button>
        </form>
      </MDBCardBody>
      <div className="account-suggest">
        <p className="suggest-text">
          Do you already have an account?{" "}
          <Link className="link-suggest" to={"/"}>
            Login
          </Link>
        </p>
      </div>
    </MDBCard>
  );
}
