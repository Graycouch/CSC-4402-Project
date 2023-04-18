import { useState, useEffect } from "react";
import { getSessionState } from '../../globalValues';
import { Card, CardContent, CardMedia, Modal, Typography, Box, Button } from "@mui/material";
import { Markup } from 'interweave';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from 'axios';
import './Candidates.css';

/*
    TODO:
      - Make all modals the same size.
      - See if you can make the modal scrollable.
      - Add a darker shadow behind the modal.
      - See if you can make it nicer looking.
*/

export default function CandidateCard(candidateData) {
  let favorites = candidateData.favorites;
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
  const [open, setOpen] = useState(false);
  const [favoriteClicked, setFavoriteClicked] = useState(false); //isOpen
  const user = getSessionState("user");

  const [bio] = useState(
    "<p>" +
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

  useEffect(() => {
    getFavorites();
  }, []);

  async function getFavorites() {
    try {
      const isFavorite = favorites.find((favorite) => {
        return favorite.ID === candidateData.ID;
      });

      if (isFavorite !== undefined) {
        setFavoriteClicked(false);
        document.getElementById("favorite" + candidateData.ID).style.display = "block";
        document.getElementById("favoriteBorder" + candidateData.ID).style.display = "none";
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const favoriteClick = async () => {
    setFavoriteClicked(!favoriteClicked);

    if (!favoriteClicked) {
      document.getElementById("favorite" + candidateData.ID).style.display = "none";
      document.getElementById("favoriteBorder" + candidateData.ID).style.display = "block";

      await axios.post('http://localhost:8080/favorites/delete', {
        voter_ID: user.ID,
        candidate_ID: candidateData.ID
      });
    } else {
      document.getElementById("favorite" + candidateData.ID).style.display = "block";
      document.getElementById("favoriteBorder" + candidateData.ID).style.display = "none";

      await axios.post('http://localhost:8080/favorites/create', {
        voter_ID: user.ID,
        candidate_ID: candidateData.ID
      });
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleElectionClick = () => {
    window.location.href = "/elections";
  };

  const modalContent = (
    <Box sx={{ position: 'absolute', borderRadius: '10px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#fcf9e8', boxShadow: 24, p: 4, overflowY: 'auto' }}>
      <Typography variant="h4" color="black" >{candidate}</Typography>
      <Typography variant="h6" color="black" gutterBottom>{party}</Typography>
      <CardMedia className="candidateImg"
        component="img"
        height="300"
        width="200"
        image={img}
        alt="Candidate Image"
        sx={{ mb: 2 }}
      />
      <Typography variant="body1" color="black" sx={{ mb: 2 }}>
        <Markup className="details" content={details} />
        <Button variant="contained" className="buttons" style={{ border: '1px solid #f00', bottom: -20, left: '35%' }} onClick={handleElectionClick}>Vote Now</Button>
      </Typography>
    </Box>
  );

  return (
    <div>
      <Card className="card" sx={{ width: '350px', height: '600px', backgroundColor: '#fcf9e8' }}>
        <CardMedia 
          className="candidateImg"
          /*border="10px solid black"*/
          component="img"
          height="400"
          width="200"
          image={img}
          alt="Candidate Image"
        />
        <CardContent>
          <Typography className="title" variant="h5" component="div" color="black" textAlign="center">
            {candidate}
          </Typography>
          <Typography className="title" variant="p3" component="p" color="black" textAlign="center">
            {party}
          </Typography>
          <Markup className="bio" color="black" content={bio} />
          <Button variant="contained" className="buttons" style={{ border: '1px solid #f00', right: '2%' }} onClick={handleOpen}>Learn More</Button>
          <IconButton color="primary" style={{ left: '48%' }} onClick={favoriteClick}>
            <FavoriteBorder id={"favoriteBorder" + candidateData.ID} fontSize="large" />
            <Favorite style={{ display: "none" }} id={"favorite" + candidateData.ID} fontSize="large" />
          </IconButton>
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
