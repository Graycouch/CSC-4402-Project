import { setGlobalState } from '../../globalValues';
import axios from "axios";
import React from "react";
import "./Login.css";

function Login() {
    const handleLoginClick = async (e) => {
        e.preventDefault();
        const ID = document.getElementsByClassName("LoginInput")[0].value;
        try {
            const user = await axios.get("http://localhost:8080/voter/get/" + ID);

            if (user.data[0] !== undefined) {
                console.log(user.data[0]);
                setGlobalState("user", user.data[0]);
                setGlobalState("isLoggedIn", true);
            } else {
                console.log("Please enter a valid Voter ID");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setGlobalState("isRegistering", true);
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
                    <form className="LoginBox" onSubmit={handleLoginClick}>
                        <input placeholder="Voter ID" required className="LoginInput" />
                        <button className="LoginButton" type="submit">{"Log In"}</button>

                        <button className="LoginRegisterButton" onClick={handleRegisterClick}>
                            <div style={{ textDecoration: "none" }} className="LoginRegisterLink">
                                {"Create a New Account"}
                            </div>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
