import { getSessionState } from '../../globalValues';
import React, { useState, useEffect } from 'react';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CandidateCard from './CandidateCard';
import axios from 'axios';
import './Candidates.css';

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
    const [favorites, setFavorites] = useState([]);
    const [cards, setCards] = useState(null);
    const user = getSessionState("user");

    async function getFavorites() {
        try {
            const res = await axios.get(`http://localhost:8080/favorites/get/${user.ID}`);
            setFavorites(res.data);
        }
        catch (error) {
            console.log(error);
        }
      }

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
        getFavorites();
        getCandidates();
    }, []);

    // Function to render cards
    function showCandidateCards(candidateData, favorites) {
        return (
            <Grid container spacing={12} className={'candidate-cards'}>
                {candidateData.map((candidate) => (
                    <Grid item xs={12} sm={6} md={4} key={candidate.ID}>
                        <CandidateCard candidateData={candidate} favorites={favorites} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    //Ensures cards are not lost after page refresh
    useEffect(() => {
        setCards(showCandidateCards(candidateData, favorites));
    }, [candidateData, favorites]);

    return (
        <ThemeProvider theme={theme}>
            <div className="Candidates">
                <div>
                    <h1 style={{ textAlign: 'center' }}>Candidates</h1>
                </div>
                <br></br>
                <div className="card-container">
                    {cards}
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Candidates;
