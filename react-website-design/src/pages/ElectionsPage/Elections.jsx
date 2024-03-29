import { getSessionState, setSessionState } from '../../globalValues';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ElectionCard from './ElectionCard';
import CandidateCard from '../CandidatesPage/CandidateCard';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import { red, blue } from '@mui/material/colors';
import './Elections.css';

export default function Elections() {
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

    const [electionData, setElections] = useState([]);
    const user = getSessionState("user");
    const [cards, setCards] = useState(null);

    async function getElections() {
        try {
            const res = await axios.get('http://localhost:8080/election');
            setElections(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getElections();
    }, []);

    function renderElections(electionData) {
        return (
            <Grid container spacing={12} className={'elections'}>
                {electionData.map((election) => (
                    <Grid item xs={12} sm={6} md={4} key={election.ID}>
                        <ElectionCard electionData={election} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    useEffect(() => {
        setCards(renderElections(electionData));
    }, [electionData]);

    return (
        <ThemeProvider theme={theme}>
            <div className="Elections" style={{ backgroundColor: '#f4f5f7' }}>
                <div>
                    <h1 style={{ textAlign: 'center' }}>Elections</h1>
                </div>
                <br></br>
                <div className='grids' style={{ backgroundColor: '#f4f5f7' }}>
                    <div className="card-container" >
                        {cards}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
