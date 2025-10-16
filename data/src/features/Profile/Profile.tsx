"use client";

import React, { useState, useEffect } from "react";

import { User } from "@/types/user";
import { useSidebar } from "@/features/Sidebar/SidebarContext";

import CustomAlert, { AlertProps } from "../Alert/Alert";

import { useRecentlyStore } from "@/store/Games/recentlyStore";

import GameGrid from "../GameGrid/GameGrid";

import { getStatistics, Statistics } from "@/services/Games/statistics.service";
import { getVerificationStatus } from "@/services/User/getStatus";

import "./Profile.css";

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { isOpen } = useSidebar();

  const emailConfirmed = user?.isEmailConfirmed;
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const games = useRecentlyStore((state) => state.games);

  const [isVerificated, setIsVerificated] = useState(false);

  useEffect(() => {
    const verification = async () => {
      try {
        const data = await getVerificationStatus();
        setIsVerificated(data);
      } catch {
        setIsVerificated(false);
      }
    };
    verification();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStatistics();
        setStatistics(data);
      } catch {
        return;
      }
    };

    loadStats();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(user.id);
      setAlert({ type: "success", message: "Copyied" });
    } catch {
      setAlert({ type: "error", message: "Error" });
    }
  };

  return (
    <article
      className={`profile-container ${
        isOpen ? "profile-container--unshifted" : ""
      }`}
    >
      <section className="btn-container">
        <header className="profile-header">
          <div className="profile_info">
            <h1 className="profile__login">{user.name}</h1>
            <h4 className="profile__id">
              Your ID:{" "}
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--yellow)",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={copyToClipboard}
              >
                {user.id}
              </button>
            </h4>
          </div>

          <section className="twofactor-container">
            {!emailConfirmed ? (
              <div className="verify-container">
                <p>Your email is not confirmed</p>
              </div>
            ) : (
              <span className="verified-label">✔ Email comfirmed</span>
            )}
            {!isVerificated ? (
              <div className="verify-container">
                <p>Your account is not verified</p>
              </div>
            ) : (
              <span className="verified-label">✔ Account verified</span>
            )}
          </section>
        </header>

        {alert && <CustomAlert {...alert} onClose={() => setAlert(null)} />}

        <main className="profile-content">
          <section className="amounts-container">
            <h3 className="gold-gradient" style={{ fontSize: 32 }}>
              Statistics
            </h3>
            <ul>
              <li>
                Amount of bets <div>{statistics?.betsCount || 0}</div>
              </li>
              <li>
                Bets made <div>{statistics?.betsSumAmount || 0}</div>
              </li>
              <li>
                Amount of winnings <div>{statistics?.winsSumAmount || 0}</div>
              </li>
              <li>
                Bets win <div>{statistics?.winsCount || 0}</div>
              </li>
            </ul>
          </section>

          <section className="profile-sections">
            <section>
              <h3 className="gold-gradient">Last Games</h3>
              <div className="last-games">
                {games.length > 0 ? (
                  <GameGrid games={games} />
                ) : (
                  <p>No last games yet</p>
                )}
              </div>
            </section>

            <section>
              <h3 className="gold-gradient">Favorite Games</h3>
              <div className="favourite-games">
                <p>No favorite games yet</p>
              </div>
            </section>
          </section>
        </main>
      </section>
    </article>
  );
};

export default Profile;
