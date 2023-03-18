import { setGlobalState } from '../../globalValues';
import axios from 'axios';
import "./Register.css"

function Register() {
    const handleSignUpClick = (e) => {
        e.preventDefault();
        const ID = document.getElementById("voterID").value;
        const party_ID = document.getElementById("partyID").value;

        axios.post(`http://localhost:8080/voter/create`, {
            ID: ID,
            party_ID: party_ID
        }).then((response) => {
            console.log(response);
            setGlobalState("isRegistering", false);
        }, (error) => {
            console.log(error);
        });
    }

    const handleLoginClick = (e) => {
        e.preventDefault();
        setGlobalState("isRegistering", false);
    }

    return (
        <div className="Login">
            <div className="LoginWrapper">
                <div className="LoginLeft">
                    <h3 className="LoginLogo">Voter Registration</h3>
                    <span className="LoginDescription">
                        We strongly encourage you to regsiter and vote because of the large scale impact voting has on our daily lives
                    </span>
                </div>

                <div className="LoginRight">
                    <form className="RegisterBox" onSubmit={handleSignUpClick}>
                        <input placeholder="Voter ID" required className="LoginInput" id="voterID" />
                        <input placeholder="Party ID" required className="LoginInput" id="partyID" />

                        <button className="LoginButton">Sign Up</button>

                        <button className="LoginRegisterButton" onClick={handleLoginClick}>
                            <div style={{ textDecoration: "none" }} className="LoginRegisterLink">
                                Log Into Your Account
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;