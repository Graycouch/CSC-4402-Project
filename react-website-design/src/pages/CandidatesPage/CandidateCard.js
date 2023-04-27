import { useState, useEffect } from "react";
import { getSessionState } from '../../globalValues';
import { Card, CardContent, CardMedia, Modal, Typography, Box, Button } from "@mui/material";
import { Markup } from 'interweave';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from 'axios';
import './Candidates.css';

export default function CandidateCard(candidateData) {
  let favorites = candidateData.favorites;
  let pageType = candidateData.pageType;
  let electionID = candidateData.electionID;
  candidateData = candidateData.candidateData;

  const partyNames = {
    "R": "Republican",
    "D": "Democrat",
    "LIB": "Libertarian",
    "GRE": "Green",
    "FWD": "Forward",
    "IND": "Independent",
    "PRO": "Progressive",
    "SUS": "Socialist Party USA",
    "ILL": "Illuminati"
  };

  const [candidate] = useState(candidateData.first_name + " " + candidateData.last_name);
  const [id] = useState(candidateData.ID);
  const [party] = useState(partyNames[candidateData.party_ID]);
  const [img] = useState('/Images/' + candidateData.first_name + '-' + candidateData.last_name + '.png');
  const [open, setOpen] = useState(false);
  const [favoriteClicked, setFavoriteClicked] = useState(false);
  const [numVotes, setNumVotes] = useState(0);
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

    if (pageType === "Election") {
      getNumVotes();
    }
  }, []);

  async function getFavorites() {
    try {
      const isFavorite = favorites.find((favorite) => {
        return favorite.ID === candidateData.ID;
      });

      if (isFavorite !== undefined) {
        setFavoriteClicked(true);
        document.getElementById("favorite" + candidateData.ID).style.display = "block";
        document.getElementById("favoriteBorder" + candidateData.ID).style.display = "none";
      } else {
        setFavoriteClicked(false);
        document.getElementById("favorite" + candidateData.ID).style.display = "none";
        document.getElementById("favoriteBorder" + candidateData.ID).style.display = "block";
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async function getNumVotes() {
    try {
      await axios.get(`http://localhost:8080/election/get-votes/${electionID}`).then(response => {
        let numVotesData = response.data.find((candidate) => {
          return candidate.ID === candidateData.ID
        });
        setNumVotes(numVotesData.numVotes);
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  const favoriteClick = async () => {
    if (!favoriteClicked) {
      setFavoriteClicked(!favoriteClicked);
      document.getElementById("favorite" + candidateData.ID).style.display = "block";
      document.getElementById("favoriteBorder" + candidateData.ID).style.display = "none";

      await axios.post('http://localhost:8080/favorites/create', {
        voter_ID: user.ID,
        candidate_ID: candidateData.ID
      });
    } else {
      setFavoriteClicked(!favoriteClicked);
      document.getElementById("favorite" + candidateData.ID).style.display = "none";
      document.getElementById("favoriteBorder" + candidateData.ID).style.display = "block";

      await axios.post('http://localhost:8080/favorites/delete', {
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

  const handleElectionClick = async () => {
    if (pageType === "Election") {
      var d = new Date();
      var seconds = Math.round(d.getTime() / 1000);

      await axios.post('http://localhost:8080/vote/create', {
        vote_ID: seconds,
        election_ID: electionID,
        candidate_ID: candidateData.ID
      });

      console.log(`Vote with voted_ID = ${seconds} was created successfully!`);
      setNumVotes(numVotes + 1);
    } else {
      window.location.href = "/elections";
    }
  };

  const modalContent = (
    <Box sx={{ position: 'absolute', borderRadius: '10px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#2b3036', boxShadow: 24, p: 4, overflowY: 'auto', width: '600px' }}>
      {pageType === "Election" ? (
        <Typography variant="h5" component="p" color="whitesmoke" style={{ paddingBottom: "20px" }}>
          {"Total Votes: " + numVotes}
        </Typography>
      ) : (
        <div />
      )
      }
      <Typography variant="h4" color="whitesmoke" >{candidate}</Typography>
      <Typography variant="h6" color="whitesmoke" gutterBottom>{party}</Typography>
      <CardMedia className="candidateImg"
        component="img"
        height="400"
        width="200"
        image={img}
        alt="Candidate Image"
        sx={{ mb: 2 }}
      />
      <Typography variant="body1" color="whitesmoke" sx={{ mb: 2 }}>
        <Markup className="details" content={details} />
        <Button variant="contained" style={{ bottom: -20, width: '160px', left: '36%' }} onClick={handleElectionClick}>{pageType === "Election" ? "Vote Now" : "View Elections"}</Button>
      </Typography>
    </Box>
  );

  return (
    <div>
      <Card className="card" sx={{ width: '350px', height: '600px', backgroundColor: '#2b3036' }}>
        <CardMedia
          className="candidateImg"
          component="img"
          height="400"
          width="200"
          image={img}
          alt="Candidate Image"
        />
        <CardContent>
          <Typography variant="h5" component="div" color="whitesmoke" textAlign="center">
            {candidate}
          </Typography>
          <Typography variant="p3" component="p" color="whitesmoke" textAlign="center">
            {party}
          </Typography>
          <Markup className="bio" color="whitesmoke" content={bio} />
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
