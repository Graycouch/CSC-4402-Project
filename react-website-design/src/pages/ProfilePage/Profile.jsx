import { useGlobalState } from '../../globalValues';
import "./Profile.css";

export default function Profile() {
  const [user] = useGlobalState("user");

  return (
    <div className="Profile">
      <div>
        <p>
          <img className="profile-picture" src="goat.png" alt="Profile" />
        </p>
      </div>

      <div className="profile-container">
        <div className="profile-info">
          <p><strong>Voter ID: </strong>{user.ID}</p>
          <p><strong>Name: </strong>{user.first_name} {user.last_name}</p>
          <p><strong>Date of Birth: </strong>{user.DOB}</p>
          <p><strong>Political Party: </strong>{user.party_ID}</p>
          <p><strong>District Number: </strong>{user.district_number}</p>
          <p><strong>State: </strong>{user.state}</p>
        </div>
      </div>
    </div>
  )
}
