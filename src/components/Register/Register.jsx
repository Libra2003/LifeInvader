import React, { useState } from "react";
import "./Register.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {



  const [isRegistered, setIsRegistered] = useState(false);
  const [plan, setPlan] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  let history = useNavigate();

  const handleRegisterClick = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!username) {
      setUsernameError("Please fill out the field");
      isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError("Username must contain only alphabets and numbers");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Please fill out the field");
      isValid = false;
    } else if (!/^(?=.*[a-zA-Z]).{6,}$/.test(password)) {
      setPasswordError("Password must contain at least six alphabets or a combination of upper and lowercase alphabets");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!email) {
      setEmailError("Please fill out the field");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!phone) {
      setPhoneError("Please fill out the field");
      isValid = false;
    } else if (!/^[0-9+]+$/.test(phone)) {
      setPhoneError("Phone number can only contain numbers and the optional '+' symbol");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (isValid) {
      // All fields are valid, handle registration logic here

      // Prepare the data to be sent to the server
      const requestData = {
        UserName: username,
        reg_email: email,
        reg_password: password,
        phone_Number: phone,
        plans: plan
      };

      // Send the data to the server
      // ...

      axios.post('http://localhost/php-react/Registration-login/Insert.php', requestData)
      .then((response) => {
        console.log(response.data);
        if (response.data.data.status === 'invalid') {
          if (response.data.data.message === "Username already exists") {
            setUsernameError('Username already exists');
            console.log(response.data.data.message);
            alert("Username already exists");
          } else if (response.data.data.message === 'Email already exists') {
            setEmailError('Email already exists');
            alert("Email already exists");
          } else {
            alert('Registration failed');
          }
        } else {
          console.log("Validation");
          window.location.href = 'http://localhost/php-react/Registration-login/validation.php';
          // Proceed to the next page
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle error if the API request fails
      });
    

// ...

    }
  };

  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <form onSubmit={handleRegisterClick}>
          <div className="register-form">
            <div className="register-form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              {usernameError && <p className="alert-message">⚠️ {usernameError}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              {emailError && <p className="alert-message">⚠️ {emailError}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {passwordError && <p className="alert-message">⚠️ {passwordError}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="phone">Phone No.</label>
              <input type="text" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              {phoneError && <p className="alert-message">⚠️ {phoneError}</p>}
            </div>
            <div className="register-form-group-plan">
              <label htmlFor="plan">Plans</label>
              <div className="register-radio-group">
                <label>
                  <input
                    type="radio"
                    name="plans"
                    value="basic"
                    checked={plan === "basic"}
                    onChange={handlePlanChange}
                  />
                  Basic
                </label>
                <label>
                  <input
                    type="radio"
                    name="plans"
                    value="premium"
                    checked={plan === "premium"}
                    onChange={handlePlanChange}
                  />
                  Premium
                </label>
                <label>
                  <input
                    type="radio"
                    name="plans"
                    value="pro"
                    checked={plan === "pro"}
                    onChange={handlePlanChange}
                  />
                  Pro
                </label>
              </div>
            </div>
            <div className="register-form-group">
              <button type="submit" className="register-btn larger">
                Register
              </button>
              <div className="switch-link">
                Already have an account? <Link to="/Login">Login</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
