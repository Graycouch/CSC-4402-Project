import { getSessionState, setSessionState } from '../../globalValues';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CandidateCard from '../CandidatesPage/CandidateCard';
import axios from 'axios';
import './Elections.css';

/*
    TODO:
    - Create Dropdown for each candidate card to show info on their current election (total votes, etc.)
    - Create a learn more button that links to the candidate's profile page (which can be instantiated with the candidate's ID)
    - Create a vote button that links to the candidate's election page 
*/

function ElectionCandidates() {
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
    const user = getSessionState("user");
    const [searchparams] = useSearchParams();
    const ID = searchparams.get("id");
    const [favorites, setFavorites] = useState([]);

    async function getCandidates() {
        try {
            const res = await axios.get(`http://localhost:8080/election/get-candidates/${ID}`);
            setCandidates(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getFavorites() {
        try {
            const res = await axios.get(`http://localhost:8080/favorites/get/${user.ID}`);
            setFavorites(res.data);
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
                    <h1 style={{ textAlign: 'center' }}>Election Candidates</h1>
                </div>
                <br></br>
                <div className="card-container">
                    {cards}
                </div>
            </div>
        </ThemeProvider>
    )
}

export default ElectionCandidates;