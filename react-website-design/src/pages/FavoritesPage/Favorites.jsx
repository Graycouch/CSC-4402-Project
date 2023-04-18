import { getSessionState } from '../../globalValues';
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
    const [candidateData, setFavorites] = useState([]);
    const [favorites, setIcon] = useState([]);
    const [cards, setCards] = useState(null);
    const user = getSessionState("user");

    async function getFavorites() {
        try {
            const res = await axios.get(`http://localhost:8080/favorites/get/${user.ID}`);
            setIcon(res.data);
            setFavorites(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFavorites();
    }, []);

    // Function to render favorites cards
    function showFavoritesCard(candidateData, favorites) {
        return (
            <Grid container spacing={10} className={'candidate-cards'}>
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
        setCards(showFavoritesCard(candidateData, favorites));
    }, [candidateData, favorites]);

    return favorites.length > 0 ? (
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
    ) : (
        <div>
            <ThemeProvider theme={theme}>
                <div className="Candidates">
                    <div>
                        <h1 style={{ textAlign: 'center' }}>Favorites</h1>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <text style={{ fontSize: 30, fontWeight: '400', color: 'gray' }}>
                            You currently don't have any favorites, go to the Candidates page to add some!
                        </text>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <text style={{ fontSize: 50, fontWeight: '400', color: 'gray' }}>
                            (╯°□°)╯︵ ┻━┻
                        </text>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Favorites;
