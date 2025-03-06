import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Me.css";
import { avatars } from "../../constants/avatars";

interface Friend {
  id: number;
  name: string;
}

interface InvitedPlayer {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  icon: string;
  friends?: Friend[];
  invitedPlayers?: InvitedPlayer[];
}

const Me: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        console.error("No user found in localStorage");
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id;

      if (!userId) {
        console.error("No user ID found in localStorage data");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();

        setUser({
          ...data,
          friends: data.friends || [],
          invitedPlayers: data.invitedPlayers || [],
        });

        setEditedName(data.name);
        setEditedEmail(data.email);
        setSelectedAvatar(data.icon || "/default-avatar.png");

        // Fetch total games (from scoresheets where user is in players list)
        const scoresResponse = await fetch(
          `http://localhost:5000/api/scoresheets`
        );
        if (!scoresResponse.ok) {
          throw new Error("Failed to fetch scoresheets");
        }
        const scoresData = await scoresResponse.json();
        const userGames = scoresData.filter((sheet: { players: number[] }) =>
          sheet.players.includes(userId)
        ).length;

        setTotalGames(userGames);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // Reloads the entire app, including Header
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      name: editedName,
      email: editedEmail,
      icon: selectedAvatar,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="me-container">
      {/* Back & Logout Buttons */}
      <div className="header-buttons">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="me-layout">
        {/* Friends Column */}
        <div className="friends-section">
          <h3>Friends</h3>
          <div className="friends-list">
            {user?.friends?.length ? (
              user.friends.map((friend) => (
                <div key={friend.id} className="friend-card">
                  <p>{friend.name}</p>
                </div>
              ))
            ) : (
              <p>No friends yet.</p>
            )}
          </div>
          <button className="add-button">+</button>
        </div>

        {/* User Info Column */}
        <div className="user-card">
          {isEditing ? (
            <>
              {selectedAvatar && (
                <img
                  src={selectedAvatar}
                  alt="Selected Avatar"
                  className="selected-avatar"
                />
              )}
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="edit-input"
              />
              <div className="avatar-selection">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar.url}
                    alt="Avatar"
                    className={`avatar ${
                      selectedAvatar === avatar.url ? "selected" : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar.url)}
                  />
                ))}
              </div>
              <div className="edit-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h2>{user?.name}</h2>
              <img
                className="user-avatar"
                src={user?.icon || "/default-avatar.png"}
                alt="User Avatar"
              />
              <p>{user?.email}</p>
              <p>Total Games: {totalGames}</p>
              <button className="edit-button" onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
        </div>

        {/* Invited Players Column */}
        <div className="invited-section">
          <h3>Invited Players</h3>
          <div className="invited-list">
            {user?.invitedPlayers?.length ? (
              user.invitedPlayers.map((player) => (
                <div key={player.id} className="invited-card">
                  <p>{player.name}</p>
                </div>
              ))
            ) : (
              <p>No invited players yet.</p>
            )}
          </div>
          <button className="add-button">+</button>
        </div>
      </div>
    </div>
  );
};

export default Me;
