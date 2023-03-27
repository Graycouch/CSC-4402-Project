import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Markup } from 'interweave';
import './Candidates.css';
import { useState } from "react";

export default function CandidateCard(candidateData) {
    candidateData = candidateData.candidateData;
    const partyNames = {
        1: "Republican",
        2: "Democratic",
        3: "Libertarian",
        4: "Green",
        5: "Forward",
        9: "Independent",
        99: "Illuminati"
    }
    const [candidate] = useState(candidateData.first_name + " " + candidateData.last_name);
    const [party] = useState(partyNames[candidateData.party_ID]);
    const [img] = useState('/Images/' + candidateData.first_name + '-' + candidateData.last_name + '.png');
    const [bio] = useState(
        "<ul>" + 
        "<li>" + candidateData.state + "</li>" + 
        "<li>" + candidateData.DOB + "</li>" + 
        "<li>" + candidateData.current_job + "</li>" +
        "</ul>"
    );
    
    return (
        <Card sx={{ width: '350px', height: '600px', backgroundColor: "grey.200", mb: 3, mt: 3 }}>
            <CardMedia
                component="img"
                height="400"
                width="200"
                image={img}
                alt="Candidate Image"
            />
            <CardContent>
                <Typography variant="h5" component="div" textAlign="center">
                    {candidate}
                </Typography>
                <Typography variant="p3" component="div" textAlign="center">
                    {party}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <Markup content={bio}/>
                </Typography>
            </CardContent>
        </Card>
    );
}
