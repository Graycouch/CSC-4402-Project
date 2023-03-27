import { setGlobalState } from '../../globalValues';
import axios from 'axios';
import "./Register.css"

export default function Register() {
    const handleSignUpClick = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/voter/create`, {
            ID: document.getElementById("ID").value,
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            DOB: document.getElementById("DOB").value,
            SSN: document.getElementById("SSN").value,
            state: document.getElementById("state").value,
            district_number: document.getElementById("district_number").value
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
                        <input placeholder="Voter ID" required className="LoginInput" id="ID" />
                        <input placeholder="First Name" required className="LoginInput" id="first_name" />
                        <input placeholder="Last Name" required className="LoginInput" id="last_name" />
                        <input placeholder="Date of Birth: MM/DD/YYYY" required className="LoginInput" id="DOB" />
                        <input placeholder="Social Security Number: XXX-XX-XXXX" required className="LoginInput" id="SSN" />
                        <input placeholder="State (Example: Louisiana)" required className="LoginInput" id="state" />
                        <input placeholder="District Number: XXX" required className="LoginInput" id="district_number" />

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
