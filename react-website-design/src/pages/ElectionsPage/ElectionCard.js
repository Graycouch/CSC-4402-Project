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
  const [img] = useState('/Images/'+ office.split(" ")[0] + '.jpg');

  const navigate = useNavigate();
  const onSeeCandidatesClick = () => {
    navigate({
      pathname: '/electioncandidates',
      search: createSearchParams({ id: ID, office: office }).toString()
    });
  };

  return (
   <div>
    <Card className="card" sx={{ width: '350px', height: '530px', backgroundColor: '#FFFFFF' }}>
    <CardMedia 
          className="ElectionImg"
          component="img"
          height="300"
          width="200"
          image={img}
          alt="Election Image"
        />
      <CardContent>
      <Typography variant="h5" component="div" color="black" textAlign="center">
          {office}
        </Typography>
        <Typography variant="p3" component="div" color="black" textAlign="center">
          {election_date}
        </Typography>
        <div style={{paddingTop: '10px'}} />
        <Markup className="description" color="black" content={description} />
      </CardContent>
      <Button variant="outlined" className="button" style={{ right: '2%', position: 'absolute', bottom: '5%' }} onClick={onSeeCandidatesClick}>See Candidates</Button>
    </Card>
    </div>
  );

};
