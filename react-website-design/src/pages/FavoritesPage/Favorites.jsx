import { useGlobalState } from '../../globalValues';
import React, { useState, useEffect } from 'react';
import CandidateCard from '../CandidatesPage/CandidateCard';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import axios from 'axios';
import './Favorites.css'

function Favorites() {
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
    const [candidateData, satFavorites] = useState([]);
    const [cards, setCards] = useState(null);
    const [user] = useGlobalState("user");

    /* Don't know how to properly use database functions */
    async function getFavorites() {
        try {
            const res = await axios.get(`http://localhost:8080/favorites/get/${user.ID}`);
            console.log(res.data);
            satFavorites(res.data);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFavorites();
    }, []);

    // Function to render favorites cards
    function showFavoritesCard(candidateData) {
        return (
            <Grid container spacing={10} justifyContent="center" className={'candidate-cards'}>
                {candidateData.map((candidate) => (
                    <Grid item xs={12} sm={6} md={4} key={candidate.ID}>
                        <CandidateCard candidateData={candidate} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    //Ensures cards are not lost after page refresh
    useEffect(() => {
        setCards(showFavoritesCard(candidateData));
    }, [candidateData]);

    return (
        <ThemeProvider theme={theme}>
            <div className="Candidates">
                <div>
                    <h1 style={{ textAlign: 'center' }}>Favorites</h1>
                </div>
                <br></br>
                <div className="card-container">
                    {cards}
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Favorites;
