import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

import { avatars } from "../../constants/avatars";

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
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const navigate = useNavigate();

  // Handle Registration Request
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      // Send verification code request
      const response = await fetch(
        "http://localhost:5000/api/users/send-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            icon: selectedAvatar, // Make sure the key name matches the backend
          }),
        }
      );

      const data = await response.json(); // Parse API response

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification code.");
      }
      // Change Alert TODO
      alert("A verification code has been sent to your email.");
      setIsCodeSent(true);
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };

  // Handle Verification Code
  const handleVerifyCode = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/verify-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: userEnteredCode }),
        }
      );

      const data = await response.json(); // Parse response

      if (!response.ok) {
        throw new Error(data.error || "Verification failed.");
      }

      alert("Email verified successfully! You can now log in.");
      navigate("/login");
    } catch (error) {
      setVerificationError((error as Error).message); // Show error to user
      console.error("Error verifying code:", error);
    }
  };

  // Validate Inputs with REGEX
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

  // Functions for GUI
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

      {!isCodeSent ? (
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
                  src={avatar.url}
                  alt={avatar.name}
                  className={`avatar ${
                    selectedAvatar === avatar.url ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarSelect(avatar.url)}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="register-button">
            Send Verification Code
          </button>
        </form>
      ) : (
        <div className="verification-container">
          <h4>Enter Verification Code</h4>
          <input
            type="text"
            placeholder="_ _ _ _ _ _"
            value={userEnteredCode}
            onChange={(e) => setUserEnteredCode(e.target.value)}
            className="verification-input"
            required
          />
          {verificationError && (
            <span className="error-text">{verificationError}</span>
          )}
          <button
            type="button"
            className="verify-button"
            onClick={handleVerifyCode}
          >
            Verify Code
          </button>
        </div>
      )}

      <button
        type="button"
        className="register-button"
        onClick={handleBackToLogin}
      >
        Back to Login
      </button>
    </div>
  );
};

export default Register;
