import React, { useCallback, useContext, useEffect } from "react";
import { UserContext } from "../context/UsersContext";
import { Loader } from "../components/Loader";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import moment from "moment";

export const Profile = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    axios
      .get("http://localhost:3500/users/profile", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          setUserContext((oldValues) => {
            return { ...oldValues, details: response.data };
          });
        } else {
          if (response.status === 401) {
            window.location.reload();
          } else {
            setUserContext((oldValues) => {
              return { ...oldValues, details: null };
            });
          }
        }
      });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  return userContext.details === null ? (
    <Loader />
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <>
      <MDBContainer>
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top d-flex flex-row"
                style={{ backgroundColor: "#28314D", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={userContext.details.profile_picture.url}
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5">
                    {userContext.details.name}
                    {userContext.details.last_name &&
                      " " + userContext.details.last_name}
                  </MDBTypography>
                  <MDBCardText>{userContext.details.username}</MDBCardText>
                </div>
              </div>
              <div className="p-4" style={{ backgroundColor: "#2D3757" }}>
                <div className="d-flex justify-content-center text-center py-1">
                  <div>
                    <MDBCardText className="small mb-0">Genre</MDBCardText>
                    <MDBCardText className="mb-1 h5">
                      {userContext.details.genre}
                    </MDBCardText>
                  </div>
                  <div className="px-5">
                    <MDBCardText className="small mb-0">
                      Phone Number
                    </MDBCardText>
                    <MDBCardText className="mb-1 h5">
                      {userContext.details.phone_number}
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="small mb-0">
                      Date of Birthday
                    </MDBCardText>
                    <MDBCardText className="mb-1 h5">
                      {moment(userContext.details.date_birth).format("LL")}
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody
                style={{ backgroundColor: "#354166" }}
                className="p-4"
              >
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Description</p>
                  <div className="p-4" style={{ backgroundColor: "#2D3757" }}>
                    <MDBCardText className="font-italic mb-1">
                      {userContext.details.description}
                    </MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    All Posts
                  </MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};
