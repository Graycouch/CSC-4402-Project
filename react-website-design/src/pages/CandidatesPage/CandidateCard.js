import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Markup } from 'interweave';
import './Candidates.css';
import { useState } from "react";

export default function CandidateCard(candidateData) {
    candidateData = candidateData.candidateData;
    const [candidate, setCandidate] = useState(candidateData.first_name + " " + candidateData.last_name);
    const [party, setParty] = useState(candidateData.party_ID);
    const [img, setImg] = useState('../../components/Images/' + candidateData.first_name + '-' + candidateData.last_name + '.png');
    const [bio, setBio] = useState(
        "<ul>" + 
        "<li>" + candidateData.state + "</li>" + 
        "<li>" + candidateData.DOB + "</li>" + 
        "<li>" + candidateData.current_job + "</li>" +
        "</ul>"
    );

    console.log(img);

    return (
        <Card sx={{ width: '350px', height: '350px', backgroundColor: "grey.200", mb: 3, mt: 3 }}>
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
    );
}