import React, { useState, useEffect } from 'react'
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CandidateCard from './CandidateCard.js';
import axios from 'axios'
import './Candidates.css'


function Candidates() {
    // Creates theme for Material UI components
    const theme = createTheme({
        palette: {
            primary: {
                main: '#f44336',
            },
        },
        typography: {
            fontFamily: 'Playfair Display',
        },
    });

    // Global variables for maintaining candidate data and to render cards
    const [candidateData, setCandidates] = useState([]);
    const [cards, setCards] = useState(null);

    /* Don't know how to properly use database functions */
    async function getCandidates() {
        try {
            const res = await axios.get('http://localhost:8080/candidate');
            console.log(res.data);
            setCandidates(res.data);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCandidates();
    }, []);
    /* Hard-coded candidate data */
    // const candidates = [
    //     {first_name: "Ashley", last_name: "Jakobs", party_ID: "Green", image: './Images/Ashley-Jakobs.png', state: 'NY', DOB: '44', current_job: 'Lawyer'},
    //     {first_name: "Ben", last_name: "Jake", party_ID: "Dem.", image: './Images/Ben-Jake.png', state: 'LA', DOB: '57', current_job: 'Doctor'},
    //     {first_name: "Billy", last_name: "Bob", party_ID: "Ind.", image: './Images/Billy-Bob.png', state: 'KS', DOB: '49', current_job: 'Farmer'},
    //     {first_name: "Brice", last_name: "Samuel", party_ID: "Lib.", image: './Images/Brice-Samuel.png', state: 'TX', DOB: '60', current_job: 'Governor'},
    //     {first_name: "Dan", last_name: "Jackson", party_ID: "Forw.", image: './Images/Dan-Jackson.png', state: 'FL', DOB: '63', current_job: 'Senator'},
    //     {first_name: "Joe", last_name: "Mama", party_ID: "Rep.", image: './Images/Joe-Mama.png', state: 'TX', DOB: '68', current_job: 'Lobbyist'},
    //     {first_name: "Specimen", last_name: "#0911", party_ID: "Illuminati", image: './Images/Specimen.png', state: 'Mars', DOB: '3225', current_job: 'Mind Control'},
    //     {first_name: "Default", last_name: "Candidate", party_ID: "N/A", image: './Images/default.png', state: '*', DOB: '0', current_job: '-----'}
    // ];

    // Function to render cards
    function showCandidateCards() {
        return (
          <Grid container spacing={10} justifyContent="center" className={'candidate-cards'} sx={{ textAlign: "center" }}>
            {candidateData.map((candidate) => (
              <Grid item xs={12} sm={6} md={4}>
                <CandidateCard candidateData={candidate} />
              </Grid>
            ))}
          </Grid>
        );
    }

    //Ensures cards are not lost after page refresh
    useEffect(() => {
        setCards(showCandidateCards());
    }, [candidateData]);
    
    return (
        <ThemeProvider theme={theme}>
            <div>
                <h1 style={{ textAlign: 'center' }}>Candidates</h1>
            </div>
            <br></br>
            <div>
                {cards}
            </div>
        </ThemeProvider>
    );
}

export default Candidates;
