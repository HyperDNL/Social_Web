import React, { useContext, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import {
  FormGroup,
  InputGroup,
  TextArea,
  RadioGroup,
  Radio,
} from "@blueprintjs/core";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UsersContext";
import { FaUserEdit } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import { toastError } from "../components/Toast";

export function EditProfile() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(userContext.details.name);
  const [last_name, setLastName] = useState(userContext.details.last_name);
  const [description, setDescription] = useState(
    userContext.details.description
  );
  const [genre, setGenre] = useState(userContext.details.genre);
  const [date_birth, setDateBirth] = useState(userContext.details.date_birth);
  const [phone_number, setPhoneNumber] = useState(
    userContext.details.phone_number
  );

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const genericErrorMessage = "Something went wrong! Please try again later.";

    axios
      .put(
        "/users/updateProfile",
        {
          name,
          last_name,
          description,
          genre,
          date_birth,
          phone_number,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          },
        }
      )
      .then(async (response) => {
        setIsSubmitting(true);
        setUserContext((oldValues) => {
          return { ...oldValues, details: response.data };
        });
        navigate("/profile");
      })
      .catch((error) => {
        setIsSubmitting(false);
        toastError(genericErrorMessage);
      });
  };

  return (
    <MDBCard className="card-form">
      <MDBCardBody>
        <MDBCardTitle className="card-title">
          <FaUserEdit /> Edit User Account
        </MDBCardTitle>
        <form onSubmit={formSubmitHandler} className="auth-form">
          <FormGroup label="First Name" labelFor="name">
            <InputGroup
              id="name"
              placeholder="First Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup label="Last Name" labelFor="last_name">
            <InputGroup
              id="last_name"
              placeholder="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={last_name}
            />
          </FormGroup>
          <FormGroup label="Description" labelFor="description">
            <TextArea
              fill={true}
              id="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormGroup>
          <FormGroup label="Genre" labelFor="genre">
            <RadioGroup
              onChange={(e) => setGenre(e.target.value)}
              selectedValue={genre}
            >
              <Radio label="Male" value={"Male"} />
              <Radio label="Female" value={"Female"} />
            </RadioGroup>
          </FormGroup>
          <FormGroup label="Date of Birthday" labelFor="date_birth">
            <InputGroup
              id="date_birth"
              placeholder="Date of Birthday"
              onChange={(e) => setDateBirth(e.target.value)}
              type="date"
              value={moment(date_birth).format("YYYY-MM-DD")}
            />
          </FormGroup>
          <FormGroup label="Phone Number" labelFor="phone_number">
            <InputGroup
              id="phone_number"
              placeholder="Phone Number"
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phone_number}
            />
          </FormGroup>
          <button
            className="button-form"
            disabled={isSubmitting}
            type="submit"
          >{`${isSubmitting ? "Updating" : "Update"}`}</button>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
}
