import { useState } from "react";
import { Card, CardContent, CardMedia, Modal, Typography, Box, Button } from "@mui/material";
import { Markup } from 'interweave';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from 'axios';
import './Candidates.css';

export default function CandidateCard(candidateData) {
  candidateData = candidateData.candidateData;
  const partyNames = {
    1: "Republican",
    2: "Democrat",
    3: "Libertarian",
    4: "Green",
    5: "Forward",
    9: "Independent",
    99: "Illuminati"
  };
  const [candidate] = useState(candidateData.first_name + " " + candidateData.last_name);
  const [id] = useState(candidateData.ID);
  const [party] = useState(partyNames[candidateData.party_ID]);
  const [img] = useState('/Images/' + candidateData.first_name + '-' + candidateData.last_name + '.png');
  const [bio] = useState(
    "<p><br/>" + 
    "<strong>ID:</strong> " + id + "<br />" +
    "<strong>State:</strong> " + (candidateData.state || "N/A") + "<br />" +
    "<strong>District:</strong> " + candidateData.district_number + "<br />" +
    "<strong>Date of Birth:</strong> " + candidateData.DOB + "<br />" +
    "</p>"
  );
  const [details] = useState(
    "<table>" +
    "<tr><td><strong>Email:</strong></td><td>" + (candidateData.email || "N/A") + "</td></tr>" +
    "<tr><td><strong>Current Job:</strong></td><td>" + (candidateData.current_job || "N/A") + "</td></tr>" +
    "<tr><td><strong>Abortion:</strong></td><td>" + (candidateData.abortion || "N/A") + "</td></tr>" +
    "<tr><td><strong>Guns:</strong></td><td>" + (candidateData.guns || "N/A") + "</td></tr>" +
    "<tr><td><strong>Immigration:</strong></td><td>" + (candidateData.immigration || "N/A") + "</td></tr>" +
    "<tr><td><strong>LGBT:</strong></td><td>" + (candidateData.lgbt || "N/A") + "</td></tr>" +
    "<tr><td><strong>Environment:</strong></td><td>" + (candidateData.environment || "N/A") + "</td></tr>" +
    "<tr><td><strong>Other:</strong></td><td>" + (candidateData.other || "N/A") + "</td></tr>" +
    "</table>"
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalContent = (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, overflowY: 'auto' }}>
      <Typography variant="h4">{candidate}</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>{party}</Typography>
      <CardMedia
        component="img"
        height="400"
        width="200"
        image={img}
        alt="Candidate Image"
        sx={{ mb: 2 }}
      />
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        <Markup className="details" content={details} />
        <Button style={{ bottom:-20, left:'38%' }} /*onClick={election page}*/>Vote Now</Button>
      </Typography>
      {/* Add more details here */}
    </Box>
  );

  function toggleFavorites() {
    //const favoriteClick = (e) => {

      //check if candidate is already in the favorites database
      //const res = await axios.get(`http://localhost:8080/favorites/get/${user.ID}`); 
      
      //if not add to database, find a way to toggle icon? to Favorite
      //axios.post('http://localhost:8080/favorites/create');

      //else remove candidate from favorites database onClick
      //axios.post('http://localhost:8080/favorites/delete'); ?

    //}

  }

  return (
    <div>
      <Card sx={{ width: '350px', height: '650px', backgroundColor: "grey.200", mb: 3, mt: 3 }}>
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
          <Markup className="bio" content={bio} />
          <IconButton color="primary" style={{ right:'3%', bottom: 9 }}>
            <FavoriteBorder fontSize="large"/>
          </IconButton>
          <Button style={{ bottom: 0, left: '53%' }} onClick={handleOpen}>Learn More</Button>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent}
      </Modal>
    </div>
  );
}