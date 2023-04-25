import { getSessionState, setSessionState } from '../../globalValues';
import { useState } from "react";
import { Routes, Route, useNavigate, createSearchParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Modal, Typography, Box, Button, CardActions } from "@mui/material";
import { Markup } from 'interweave';
import './Elections.css';

export default function ElectionCard(electionData) {
  electionData = electionData.electionData;

  const [ID] = useState(electionData.ID);
  const [office] = useState(electionData.office);
  const [election_date] = useState(electionData.election_date);
  const [winner] = useState(electionData.winner);
  const [description] = useState(electionData.office_description);
  const [img] = useState('/Images/'+ 'Specimen-947' + '.png');

  const navigate = useNavigate();
  const onSeeCandidatesClick = () => {
    navigate({
      pathname: '/electioncandidates',
      search: createSearchParams({ id: ID, office: office }).toString()
    });
  };

  return (
   <div>
    <Card className="card" sx={{ width: '350px', height: '600px', backgroundColor: '#2b3036' }}>
    <CardMedia 
          className="ElectionImg"
          component="img"
          height="300"
          width="200"
          image={img}
          alt="Election Image"
        />
      <CardContent>
      <Typography variant="h5" component="div" color="whitesmoke" textAlign="center">
          {office}
        </Typography>
        <Typography variant="h5" component="div" color="whitesmoke" textAlign="center">
          {election_date}
        </Typography>
        <Markup className="description" color="whitesmoke" content={description} />
      </CardContent>
      <Button variant="contained" className="button" style={{ border: '1px solid #f00', right: '2%' }} onClick={onSeeCandidatesClick}>See Candidates</Button>
    </Card>
    </div>
  );

};
