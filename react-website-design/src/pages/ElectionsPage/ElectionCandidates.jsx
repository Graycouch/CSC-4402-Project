import { getSessionState, setSessionState } from '../../globalValues';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CandidateCard from '../CandidatesPage/CandidateCard';
import axios from 'axios';
import './Elections.css';

function ElectionCandidates() {
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

    const [candidateData, setCandidates] = useState([]);
    const [cards, setCards] = useState(null);
    const user = getSessionState("user");
    const [searchparams] = useSearchParams();
    const ID = searchparams.get("id");
    const office = searchparams.get("office");
    const [favorites, setFavorites] = useState([]);

    async function getFavorites() {
        try {
            const res = await axios.get(`http://localhost:8080/favorites/get/${user.ID}`);
            setFavorites(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function getCandidates() {
        try {
            const res = await axios.get(`http://localhost:8080/election/get-candidates/${ID}`);
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
                        <CandidateCard candidateData={candidate} favorites={favorites} pageType={"Election"} electionID={ID} />
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
            <div className="Candidates" style={{ backgroundColor: '#f4f5f7' }}>
                <div>
                    <h1 style={{ textAlign: 'center' }}>{office} Candidates</h1>
                </div>
                <br></br>
                <div className='grids' style={{ backgroundColor: '#f4f5f7' }}>
                    <div className="card-container">
                        {cards}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default ElectionCandidates;
