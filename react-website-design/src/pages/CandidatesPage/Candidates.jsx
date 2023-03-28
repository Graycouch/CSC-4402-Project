import { useGlobalState } from '../../globalValues';
import React, { useState, useEffect } from 'react';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CandidateCard from './CandidateCard';
import axios from 'axios';
import './Candidates.css';

/*
    TODO:
    - Create Dropdown for each candidate card to show info on their current election (total votes, etc.)
    - Create a learn more button that links to the candidate's profile page (which can be instantiated with the candidate's ID)
    - Create a vote button that links to the candidate's election page 
*/

function Candidates() {
    // Creates theme for Material UI components
    const theme = createTheme({
        palette: {
            primary: {
                main: '#f44336',
            },
        },
        typography: {
            fontFamily: 'Bison, sans-serif',
            fontWeightBold: 700,
        },
    });

    // Global variables for maintaining candidate data and to render cards
    const [candidateData, setCandidates] = useState([]);
    const [cards, setCards] = useState(null);
    const [user] = useGlobalState("user");

    /* Don't know how to properly use database functions */
    async function getCandidates() {
        try {
            const res = await axios.get('http://localhost:8080/candidate');
            setCandidates(res.data);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCandidates();
    }, []);
   
    // Function to render cards
    function showCandidateCards(candidateData) {
        return (
          <Grid container spacing={10} justifyContent="center" className={'candidate-cards'}>
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
        setCards(showCandidateCards(candidateData));
    }, [candidateData]);
    
    return (
        <ThemeProvider theme={theme}>
            <div>
                <h1 style={{ textAlign: 'center' }}>Candidates</h1>
            </div>
            <br></br>
            <div className="card-container">
                {cards}
            </div>
        </ThemeProvider>
    )
}

export default Candidates;