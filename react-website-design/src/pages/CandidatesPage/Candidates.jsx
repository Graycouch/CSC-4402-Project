import { useGlobalState } from '../../globalValues';
import { useState, useEffect } from 'react'
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CandidateCard from './CandidateCard.js';
import axios from 'axios'
import './Candidates.css'

export default function Candidates() {
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
    const [candidates, setCandidates] = useState([]);
    const [cards, setCards] = useState(null);
    const [user] = useGlobalState("user");

    /* Don't know how to properly use database functions */
    async function getCandidates() {
        try {
            const response = await axios.get('http://localhost:8080/candidate');
            console.log(response);
            setCandidates(response.data[0]);
        }
        catch (error) {
            console.log(error);
        }
    }

    // Function to render cards
    function showCandidateCards() {
        return (
            <Grid container spacing={10} justifyContent="center" className={'candidate-cards'} sx={{ textAlign: "center" }}>
                {candidates.map((candidate) => {
                    return (
                        <Grid item md={3}>
                            <CandidateCard candidateData={candidate} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    }

    //Ensures cards are not lost after page refresh
    useEffect(() => {
        getCandidates();
        setCards(showCandidateCards());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="Candidates">
                <div>
                    <h1 style={{ textAlign: 'center' }}>Candidates</h1>
                </div>
                <br></br>
                <div>
                    {cards}
                </div>
            </div>
        </ThemeProvider>
    )
}
