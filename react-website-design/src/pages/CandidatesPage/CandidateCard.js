import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Markup } from 'interweave';
import './Candidates.css';
import { useState } from "react";

export default function CandidateCard(candidateData) {
    const [candidate, setCandidate] = useState(candidateData.first_name + " " + candidateData.last_name);
    const [party, setParty] = useState(candidateData.party_ID);
    const [img, setImg] = useState(null);
    const [bio, setBio] = useState(
        "<ul>" + 
        "<li>" + candidateData.state + "</li>" + 
        "<li>" + candidateData.DOB + "</li>" + 
        "<li>" + candidateData.current_job + "</li>" +
        "</ul>"
    );
    
    setImg('./Images/' + candidate.first_name + '-' + candidate.last_name + '.png');

    return (
        <Card sx={{ maxWidth: '100%', backgroundColor: "grey.200", mb: 3 }}>
            <CardMedia
                component="img"
                height="140"
                image={img}
                alt={candidate + party + "img"}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {candidate}
                    {party}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <Markup content={bio}/>
                </Typography>
            </CardContent>
        </Card>
    )
}
