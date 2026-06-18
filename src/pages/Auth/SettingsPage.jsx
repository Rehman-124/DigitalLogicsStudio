import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Home/Navbar";
import Footer from "../Home/Footer";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

export default function SettingsPage() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="auth-page-shell">
      <div className="grid-background" />
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <main className="auth-main profile-main settings-main">
        <section className="profile-panel">
          <article className="profile-hero settings-hero">
            <span className="auth-eyebrow">Demo Settings</span>
            <h1>Account Settings</h1>
            <p>
              This is a demo settings page for your account menu. Your current signed-in
              account is <strong>{user?.name || "User"}</strong>.
            </p>
          </article>

          <article className="profile-card settings-card">
            <h2>Preferences</h2>
            <p>These controls are placeholders to complete the settings route and UI flow.</p>

            <div className="settings-list">
              <div className="settings-item">
                <div>
                  <h3>Theme Preference</h3>
                  <p>Use the navbar theme toggle to switch between light and dark mode.</p>
                </div>
                <span className="settings-badge">Enabled</span>
              </div>

              <div className="settings-item">
                <div>
                  <h3>Email Notifications</h3>
                  <p>Receive updates about progress milestones and new problem sets.</p>
                </div>
                <span className="settings-badge">Coming Soon</span>
              </div>

              <div className="settings-item">
                <div>
                  <h3>Privacy Controls</h3>
                  <p>Choose whether your stats appear in community leaderboards.</p>
                </div>
                <span className="settings-badge">Coming Soon</span>
              </div>
            </div>

            <div className="profile-actions settings-actions">
              <Link to="/profile" className="auth-secondary-btn settings-back-link">
                <span className="settings-back-icon" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </span>
                <span>Back to Profile</span>
              </Link>
              <Link to="/problems" className="auth-submit settings-primary-link settings-continue-link">
                Continue Practice
              </Link>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
