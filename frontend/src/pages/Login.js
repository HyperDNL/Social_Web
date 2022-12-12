import { FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toastError } from "../components/Toast";
import { UserContext } from "../context/UsersContext";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

export function Login() {
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
      .post("/users/signin", {
        email,
        password,
      })
      .then(async (response) => {
        setIsSubmitting(true);
        if (response.data.error) {
          toastError(response.data.message);
          setIsSubmitting(false);
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
    <>
      <MDBCard className="card-form">
        <MDBCardBody>
          <div className="img-form-container">
            <img
              className="img-form"
              src="https://res.cloudinary.com/dh9ph7mpz/image/upload/v1670752876/uploads_webapp/logo-cipher_mdbtxt.png"
            />
          </div>
          <MDBCardTitle className="card-title">
            For Gamers By Gamers
          </MDBCardTitle>
          <form onSubmit={formSubmitHandler} className="auth-form">
            <FormGroup label="Email" labelFor="email">
              <InputGroup
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup label="Password" labelFor="password">
              <InputGroup
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <button
              className="button-form"
              disabled={isSubmitting}
              type="submit"
            >{`${isSubmitting ? "Signing In" : "Sign In"}`}</button>
          </form>
        </MDBCardBody>
        <div className="account-suggest">
          <p className="suggest-text">
            Don't have an account?{" "}
            <Link className="link-suggest" to={"/signup"}>
              Sign Up
            </Link>
          </p>
        </div>
      </MDBCard>
    </>
  );
}
