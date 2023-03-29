import { useGlobalState } from '../../globalValues';
import React, { useState } from 'react';
import "./Profile.css";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

export default function Profile() {
  const [user] = useGlobalState("user");
  const [userData, setUserData] = useState(user);

  const editProfile = () => {
    console.log("Hello");
  }

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>

                  <MDBCardImage src="/Images/default.png" className="profile-picture" fluid />
                  <MDBTypography tag="h5">{user.first_name} {user.last_name}</MDBTypography>
                  <MDBBtn className='my-4' outline color="light" style={{ height: '36px', overflow: 'visible' }} onClick={() => editProfile()}>
                    Edit profile
                  </MDBBtn>
                </MDBCol>

                <MDBCol md="8">
                  <MDBCardBody className="p-4">

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">SSN</MDBTypography>
                        <MDBCardText className="text-muted">{userData.SSN}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Birthday</MDBTypography>
                        <MDBCardText className="text-muted">{userData.DOB}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">State</MDBTypography>
                        <MDBCardText className="text-muted">{user.state}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">District Number</MDBTypography>
                        <MDBCardText className="text-muted">{user.district_number}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone Number</MDBTypography>
                        <MDBCardText className="text-muted">{user.phone_number}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
