import { getSessionState, setSessionState } from '../../globalValues';
import { useState } from "react";
import { Routes, Route, useNavigate, createSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Elections.css';

export default function ElectionCard(electionData) {
  electionData = electionData.electionData;

  const [ID] = useState(electionData.ID);
  const [office] = useState(electionData.office);
  const [election_date] = useState(electionData.election_date);
  const [winner] = useState(electionData.winner);
  const [description] = useState(electionData.description);
  const [candidates] = useState(electionData.candidates);

  const navigate = useNavigate();
  const onSeeCandidatesClick = () => {
    navigate({
      pathname: '/electioncandidates',
      search: createSearchParams({ id: ID }).toString()
    });
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {office}
        </Typography>
        <Typography variant="h5" component="div">
          {election_date}
        </Typography>
        <Typography variant="h5" component="div">
          {description}
        </Typography>
        <Typography variant="h5" component="div">
          {candidates}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='outlined' size="small" onClick={onSeeCandidatesClick}>See Candidates</Button>
      </CardActions>
    </Card>
  );

};
