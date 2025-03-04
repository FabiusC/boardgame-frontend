import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

// Importing all SVG avatars from the folder
import antelope from "../../assets/animals/antelope.svg";
import bear from "../../assets/animals/bear.svg";
import beaver from "../../assets/animals/beaver.svg";
import bull from "../../assets/animals/bull.svg";
import catGrey from "../../assets/animals/cat-grey.svg";
import catOrange from "../../assets/animals/cat-orange.svg";
import chipmunk from "../../assets/animals/chipmunk.svg";
import cow from "../../assets/animals/cow.svg";
import deer from "../../assets/animals/deer.svg";
import donkey from "../../assets/animals/donkey.svg";
import duck from "../../assets/animals/duck.svg";
import giraffe from "../../assets/animals/giraffe.svg";
import goat from "../../assets/animals/goat.svg";
import goose from "../../assets/animals/goose.svg";
import hare from "../../assets/animals/hare.svg";
import horse from "../../assets/animals/horse.svg";
import kangaroo from "../../assets/animals/kangaroo.svg";
import leopard from "../../assets/animals/leopard.svg";
import lizard from "../../assets/animals/lizard.svg";
import moose from "../../assets/animals/moose.svg";
import ox from "../../assets/animals/ox.svg";
import pegasus from "../../assets/animals/pegasus.svg";
import pig from "../../assets/animals/pig.svg";
import raccoon from "../../assets/animals/raccoon.svg";
import ram from "../../assets/animals/ram.svg";
import sheep from "../../assets/animals/sheep.svg";
import unicorn from "../../assets/animals/unicorn.svg";
import wolf from "../../assets/animals/wolf.svg";
import zebra from "../../assets/animals/zebra.svg";

const avatars = [
  antelope,
  bear,
  beaver,
  bull,
  catGrey,
  catOrange,
  chipmunk,
  cow,
  deer,
  donkey,
  duck,
  giraffe,
  goat,
  goose,
  hare,
  horse,
  kangaroo,
  leopard,
  lizard,
  moose,
  ox,
  pegasus,
  pig,
  raccoon,
  ram,
  sheep,
  unicorn,
  wolf,
  zebra,
];

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }
    setPasswordMatchError("");

    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password does not meet security requirements");
      return;
    }
    console.log("Registering:", { name, email, password, selectedAvatar });
    navigate("/login");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Invalid email format");
    return isValid;
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = passwordRegex.test(password);
    setPasswordError(
      isValid
        ? ""
        : "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    );
    return isValid;
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>

      {selectedAvatar && (
        <img
          src={selectedAvatar}
          alt="Selected Avatar"
          className="selected-avatar"
        />
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
          className="register-input"
          required
        />
        {emailError && <span className="error-text">{emailError}</span>}

        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validatePassword(password)}
            className="register-input"
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={toggleShowPassword}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {passwordError && <span className="error-text">{passwordError}</span>}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
          required
        />
        {passwordMatchError && (
          <span className="error-text">{passwordMatchError}</span>
        )}

        <div className="avatar-selection">
          <h4>Select Your Avatar</h4>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt="Avatar"
                className={`avatar ${
                  selectedAvatar === avatar ? "selected" : ""
                }`}
                onClick={() => handleAvatarSelect(avatar)}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="register-button">
          Sign Up
        </button>
        <button
          type="button"
          className="back-button"
          onClick={handleBackToLogin}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;
