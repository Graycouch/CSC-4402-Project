import { getSessionState, setSessionState } from '../../globalValues';
import React, { useState } from 'react';
import "./Profile.css";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBBtn, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import axios from 'axios';

export default function Profile() {
  const user = getSessionState("user");
  const partyIDs = getSessionState("partyIDs");
  const [state, setState] = useState(user.state);
  const [district_number, setDistrictNumber] = useState(user.district_number);
  const [email, setEmail] = useState(user.email);
  const [phone_number, setPhoneNumber] = useState(user.phone_number);
  const [party_name, setPartyName] = useState(partyIDs.find((partyID) => {
    return partyID.ID === user.party_ID
  })?.party_name);

  const editProfile = () => {
    document.getElementById("editProfile").style.display = "none";
    document.getElementById("saveChanges").style.display = "block";

    document.getElementById("state").style.display = "none";
    document.getElementById("stateInput").style.display = "block";

    document.getElementById("districtNumber").style.display = "none";
    document.getElementById("districtNumberInput").style.display = "block";

    document.getElementById("email").style.display = "none";
    document.getElementById("emailInput").style.display = "block";

    document.getElementById("phoneNumber").style.display = "none";
    document.getElementById("phoneNumberInput").style.display = "block";

    document.getElementById("partyID").style.display = "none";
    document.getElementById("dropdown").style.display = "block";
  }

  const saveChanges = async () => {
    document.getElementById("editProfile").style.display = "block";
    document.getElementById("saveChanges").style.display = "none";

    document.getElementById("state").style.display = "block";
    document.getElementById("stateInput").style.display = "none";

    document.getElementById("districtNumber").style.display = "block";
    document.getElementById("districtNumberInput").style.display = "none";

    document.getElementById("email").style.display = "block";
    document.getElementById("emailInput").style.display = "none";

    document.getElementById("phoneNumber").style.display = "block";
    document.getElementById("phoneNumberInput").style.display = "none";

    document.getElementById("partyID").style.display = "block";
    document.getElementById("dropdown").style.display = "none";

    const party_ID = partyIDs.find((partyID) => {
      return partyID.party_name === party_name
    }).ID;

    setSessionState("user", {
      "ID": user.ID,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "SSN": user.SSN,
      "DOB": user.DOB,
      "email": email,
      "phone_number": phone_number,
      "party_ID": party_ID,
      "district_number": district_number,
      "state": state
    });

    const res = await axios.post("http://localhost:8080/voter/update", {
      "ID": user.ID,
      "email": email,
      "phone_number": phone_number,
      "party_ID": party_ID,
      "district_number": district_number,
      "state": state
    });

    console.log(res);
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
                  <div id="editProfile">
                    <MDBBtn className='my-4' outline color="light" style={{ height: '36px', overflow: 'visible' }} onClick={() => editProfile()}>
                      Edit profile
                    </MDBBtn>
                  </div>

                  <div id="saveChanges" style={{ display: "none" }}>
                    <MDBBtn className='my-4' outline color="light" style={{ height: '36px', overflow: 'visible' }} onClick={() => saveChanges()}>
                      Save Changes
                    </MDBBtn>
                  </div>
                </MDBCol>

                <MDBCol md="8">
                  <MDBCardBody className="p-4">

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">SSN</MDBTypography>
                        <div id="SSN">
                          <MDBCardText className="text-muted">{user.SSN}</MDBCardText>
                        </div>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Birthday</MDBTypography>
                        <div id="DOB">
                          <MDBCardText className="text-muted">{user.DOB}</MDBCardText>
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">State</MDBTypography>
                        <div id="state">
                          <MDBCardText className="text-muted">{state}</MDBCardText>
                        </div>
                        <div id="stateInput" style={{ display: "none" }}>
                          <input type="text" className="form-control" style={{ width: "90%" }} value={state} onChange={e => setState(e.target.value)} />
                        </div>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">

                        <MDBTypography tag="h6">District Number</MDBTypography>
                        <div id="districtNumber">
                          <MDBCardText className="text-muted">{district_number}</MDBCardText>
                        </div>
                        <div id="districtNumberInput" style={{ display: "none" }}>
                          <input type="text" className="form-control" style={{ width: "90%" }} value={district_number} onChange={e => setDistrictNumber(e.target.value)} />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <div id="email">
                          <MDBCardText className="text-muted">{email ? email : "N/A"}</MDBCardText>
                        </div>
                        <div id="emailInput" style={{ display: "none" }}>
                          <input type="text" className="form-control" style={{ width: "90%" }} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone Number</MDBTypography>
                        <div id="phoneNumber">
                          <MDBCardText className="text-muted">{phone_number ? phone_number : "N/A"}</MDBCardText>
                        </div>
                        <div id="phoneNumberInput" style={{ display: "none" }}>
                          <input type="text" className="form-control" style={{ width: "90%" }} value={phone_number} onChange={e => setPhoneNumber(e.target.value)} />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-4">
                        <MDBTypography tag="h6">Party Affiliation</MDBTypography>
                        <div id="partyID">
                          <MDBCardText className="text-muted">{party_name ? party_name : "N/A"}</MDBCardText>
                        </div>
                        <MDBDropdown id="dropdown" style={{ position: "fixed", display: "none" }}>
                          <MDBDropdownToggle className="btn btn-dark dropdown-toggle" style={{ height: "40px", width: "180px" }}>{party_name}</MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <MDBDropdownItem style={{ height: "40px", width: "180px" }} link onClick={() => setPartyName(partyIDs[0].party_name)}>{partyIDs[0].party_name}</MDBDropdownItem>
                            <hr className="mt-0" />
                            <MDBDropdownItem style={{ height: "40px", width: "180px" }} link onClick={() => setPartyName(partyIDs[1].party_name)}>{partyIDs[1].party_name}</MDBDropdownItem>
                            <hr className="mt-0" />
                            <MDBDropdownItem style={{ height: "40px", width: "180px" }} link onClick={() => setPartyName(partyIDs[2].party_name)}>{partyIDs[2].party_name}</MDBDropdownItem>
                            <hr className="mt-0" />
                            <MDBDropdownItem style={{ height: "40px", width: "180px" }} link onClick={() => setPartyName(partyIDs[3].party_name)}>{partyIDs[3].party_name}</MDBDropdownItem>
                            <hr className="mt-0" />
                            <MDBDropdownItem style={{ height: "40px", width: "180px" }} link onClick={() => setPartyName(partyIDs[4].party_name)}>{partyIDs[4].party_name}</MDBDropdownItem>
                            <hr className="mt-0" />
                            <MDBDropdownItem style={{ height: "40px", width: "180px" }} link onClick={() => setPartyName(partyIDs[5].party_name)}>{partyIDs[5].party_name}</MDBDropdownItem>
                            <hr className="mt-0" />
                            <MDBDropdownItem style={{ height: "40px", width: "180px" }} link onClick={() => setPartyName(partyIDs[6].party_name)}>{partyIDs[6].party_name}</MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
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
