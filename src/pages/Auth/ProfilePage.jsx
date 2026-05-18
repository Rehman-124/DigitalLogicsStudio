import React, { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Zap,
  Trophy,
  Settings,
  LogOut,
  ChevronRight,
  Flame,
  Award,
  Sparkles,
  BookOpen,
  Activity,
  CheckCircle2,
  HelpCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import useLearningProgress from "../../hooks/useLearningProgress";
import coreTopics from "../../data/coreTopics";
import { problemsCatalog } from "../Problems/problemCatalog";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [logoutError, setLogoutError] = React.useState("");
  const navigate = useNavigate();

  // Load user's real learning progress
  const { snapshot } = useLearningProgress({
    user,
    topics: coreTopics,
    problems: problemsCatalog,
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      setLogoutError(
        error.response?.data?.message || "Unable to log out right now."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Helper: Dynamic K-Map Progress Calculation
  const kmapStats = useMemo(() => {
    const kmapProblems = problemsCatalog.filter(p => 
      p.topic?.toLowerCase().includes("k-map") || 
      p.tags?.some(t => t.toLowerCase().includes("k-map")) ||
      p.title?.toLowerCase().includes("k-map")
    );
    const solved = kmapProblems.filter(p => snapshot.state.problems[p.id]?.status === "solved");
    const pct = kmapProblems.length > 0 ? Math.round((solved.length / kmapProblems.length) * 100) : 0;
    return { pct, solved: solved.length, total: kmapProblems.length };
  }, [snapshot.state.problems]);

  // Helper: Dynamic Circuit Forge Progress Calculation
  const forgeStats = useMemo(() => {
    const forgeProblems = problemsCatalog.filter(p => 
      p.topic?.toLowerCase().includes("circuit") || 
      p.tags?.some(t => t.toLowerCase().includes("circuit")) ||
      p.title?.toLowerCase().includes("gate")
    );
    const solved = forgeProblems.filter(p => snapshot.state.problems[p.id]?.status === "solved");
    const pct = forgeProblems.length > 0 ? Math.round((solved.length / forgeProblems.length) * 100) : 0;
    return { pct, solved: solved.length, total: forgeProblems.length };
  }, [snapshot.state.problems]);

  // Helper: Recent Dynamic Activity
  const recentActivities = useMemo(() => {
    const activities = Object.entries(snapshot.state.problems)
      .map(([problemId, state]) => {
        const problem = problemsCatalog.find(p => String(p.id) === String(problemId));
        return {
          ...problem,
          status: state.status,
          timestamp: state.updatedAt || state.attemptedAt || new Date().toISOString(),
        };
      })
      .filter(item => item.title)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);

    return activities;
  }, [snapshot.state.problems]);

  // Helper: Challenge Tracker Stats
  const stats = useMemo(() => {
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    problemsCatalog.forEach((p) => {
      const state = snapshot.state.problems[p.id];
      if (state && state.status === "solved") {
        if (p.difficulty === "Easy") easySolved++;
        else if (p.difficulty === "Medium") mediumSolved++;
        else if (p.difficulty === "Hard") hardSolved++;
      }
    });

    const totalSolved = easySolved + mediumSolved + hardSolved;
    const totalProblems = problemsCatalog.length;
    const remaining = Math.max(0, totalProblems - totalSolved);

    return {
      easySolved,
      mediumSolved,
      hardSolved,
      remaining,
      totalSolved,
      totalProblems,
    };
  }, [snapshot.state.problems]);

  const chartItems = useMemo(() => {
    return [
      { name: "Easy Solved", value: stats.easySolved, color: "#06b6d4", key: "easy" },
      { name: "Medium Solved", value: stats.mediumSolved, color: "#10b981", key: "medium" },
      { name: "Hard Solved", value: stats.hardSolved, color: "#6366f1", key: "hard" },
      { name: "Remaining", value: stats.remaining, color: "#f59e0b", key: "remaining" },
    ];
  }, [stats]);

  const circumference = 2 * Math.PI * 38;

  const segments = useMemo(() => {
    const total = stats.totalProblems;
    let accumulatedLength = 0;

    return chartItems.map((item) => {
      const pct = total > 0 ? (item.value / total) * 100 : 0;
      const strokeLength = (pct / 100) * circumference;
      const strokeOffset = -accumulatedLength;
      accumulatedLength += strokeLength;
      return {
        ...item,
        pct,
        strokeLength,
        strokeOffset,
      };
    });
  }, [chartItems, stats.totalProblems]);

  // Define our 8 Gorgeous Liquid Bubbles
  const bubbleCards = useMemo(() => {
    const booleanAlgebraPct = snapshot.state.topics["boolean-algebra"]?.completionPercentage || 0;
    const numberSystemsPct = snapshot.state.topics["number-systems"]?.completionPercentage || 0;
    const arithmeticPct = snapshot.state.topics["arithmetic-functions-and-hdls"]?.completionPercentage || 0;
    const sequentialPct = snapshot.state.topics["sequential-circuits"]?.completionPercentage || 0;
    const memoryPct = snapshot.state.topics["memory-systems"]?.completionPercentage || 0;

    return [
      {
        title: "K-Map Solver",
        pct: kmapStats.pct,
        countText: `${kmapStats.solved}/${kmapStats.total} solved`,
        accentRgb: "249, 115, 22", // Orange
        to: "/kmapgenerator"
      },
      {
        title: "Boolean Algebra",
        pct: booleanAlgebraPct,
        countText: `${snapshot.state.topics["boolean-algebra"]?.completedCount || 0}/${snapshot.state.topics["boolean-algebra"]?.totalSubtopics || 10} modules`,
        accentRgb: "139, 92, 246", // Violet
        to: "/boolean/overview"
      },
      {
        title: "Circuit Forge",
        pct: forgeStats.pct,
        countText: `${forgeStats.solved}/${forgeStats.total} solved`,
        accentRgb: "236, 72, 153", // Pink
        to: "/boolforge"
      },
      {
        title: "Number Systems",
        pct: numberSystemsPct,
        countText: `${snapshot.state.topics["number-systems"]?.completedCount || 0}/${snapshot.state.topics["number-systems"]?.totalSubtopics || 7} modules`,
        accentRgb: "6, 182, 212", // Cyan
        to: "/numbersystemcalculator"
      },
      {
        title: "Arithmetic Labs",
        pct: arithmeticPct,
        countText: `${snapshot.state.topics["arithmetic-functions-and-hdls"]?.completedCount || 0}/${snapshot.state.topics["arithmetic-functions-and-hdls"]?.totalSubtopics || 10} modules`,
        accentRgb: "245, 158, 11", // Amber
        to: "/arithmetic/binary-adders"
      },
      {
        title: "Sequential Ckts",
        pct: sequentialPct,
        countText: `${snapshot.state.topics["sequential-circuits"]?.completedCount || 0}/${snapshot.state.topics["sequential-circuits"]?.totalSubtopics || 8} modules`,
        accentRgb: "16, 185, 129", // Emerald
        to: "/sequential/intro"
      },
      {
        title: "Memory Systems",
        pct: memoryPct,
        countText: `${snapshot.state.topics["memory-systems"]?.completedCount || 0}/${snapshot.state.topics["memory-systems"]?.totalSubtopics || 7} modules`,
        accentRgb: "79, 70, 229", // Indigo
        to: "/memory/basics"
      },
      {
        title: "Trainer Board",
        pct: snapshot.summary.completionRate || 0,
        countText: `${snapshot.summary.solvedProblems} solved total`,
        accentRgb: "239, 68, 68", // Red
        to: "/trainer-board"
      }
    ];
  }, [snapshot, kmapStats, forgeStats]);

  return (
    <div className="profile-dashboard-shell">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-top">
          <Link to="/" className="dash-brand">
            <div className="dash-brand-icon">B</div>
            <span className="dash-brand-name">Boolforge Studio</span>
          </Link>

          <nav className="dash-nav-group">
            <span className="dash-nav-label">Main Menu</span>
            <Link to="/profile" className="dash-nav-item active">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link to="/boolforge" className="dash-nav-item">
              <Zap size={18} />
              Circuit Forge
            </Link>
            <Link to="/problems" className="dash-nav-item">
              <Trophy size={18} />
              Problems Arena
            </Link>
            <Link to="/trainer-board" className="dash-nav-item">
              <Settings size={18} />
              Trainer Board
            </Link>
          </nav>

          <nav className="dash-nav-group">
            <span className="dash-nav-label">Core Modules</span>
            <Link to="/kmapgenerator" className="dash-nav-item">
              <Sparkles size={16} />
              K-Map Generator
            </Link>
            <Link to="/boolean/overview" className="dash-nav-item">
              <BookOpen size={16} />
              Boolean Algebra
            </Link>
            <Link to="/numbersystemcalculator" className="dash-nav-item">
              <Activity size={16} />
              Number Systems
            </Link>
            <Link to="/arithmetic/binary-adders" className="dash-nav-item">
              <Award size={16} />
              Arithmetic Labs
            </Link>
          </nav>
        </div>

        <div className="dash-sidebar-bottom">
          <div className="dash-user-card">
            <div className="dash-user-info">
              <span className="dash-user-name">{user?.name || "Demo User"}</span>
              <span className="dash-user-role">{user?.email || "learner@boolforge.com"}</span>
            </div>
            <button
              type="button"
              className="dash-logout-btn"
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Logout session"
            >
              <LogOut size={16} />
            </button>
          </div>
          {logoutError && <p className="auth-error" style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>{logoutError}</p>}
        </div>
      </aside>

      {/* ── MAIN DASHBOARD CONTENT ── */}
      <main className="dash-content-area">
        <header className="dash-header">
          <div className="dash-header-title">
            <h1>Learner Analytics</h1>
            <p>Track your hardware design, logic optimization, and circuit mastery.</p>
          </div>
        </header>

        {/* ── TOP 4 METRICS CARDS ── */}
        <section className="dash-metrics-grid">
          <div className="dash-metric-card" style={{ "--card-accent": "#22c55e" }}>
            <div className="dash-metric-head">
              <span className="dash-metric-label">Solved Problems</span>
              <div className="dash-metric-icon" style={{ color: "#22c55e" }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="dash-metric-val">{snapshot.summary.solvedProblems}</div>
            <div className="dash-metric-trend dash-trend-up">
              <Flame size={14} />
              Real-time progress
            </div>
          </div>

          <div className="dash-metric-card" style={{ "--card-accent": "#eab308" }}>
            <div className="dash-metric-head">
              <span className="dash-metric-label">Active Streak</span>
              <div className="dash-metric-icon" style={{ color: "#eab308" }}>
                <Flame size={18} />
              </div>
            </div>
            <div className="dash-metric-val">{snapshot.summary.streaks.current} Days</div>
            <div className="dash-metric-trend dash-trend-up">
              Max streak: {snapshot.summary.streaks.max || 1} days
            </div>
          </div>

          <div className="dash-metric-card" style={{ "--card-accent": "#3b82f6" }}>
            <div className="dash-metric-head">
              <span className="dash-metric-label">Attempted Problems</span>
              <div className="dash-metric-icon" style={{ color: "#3b82f6" }}>
                <Activity size={18} />
              </div>
            </div>
            <div className="dash-metric-val">{snapshot.summary.attemptedProblems}</div>
            <div className="dash-metric-trend dash-trend-up">
              Keep pushing forward!
            </div>
          </div>

          <div className="dash-metric-card" style={{ "--card-accent": "#a855f7" }}>
            <div className="dash-metric-head">
              <span className="dash-metric-label">Overall Mastery</span>
              <div className="dash-metric-icon" style={{ color: "#a855f7" }}>
                <Award size={18} />
              </div>
            </div>
            <div className="dash-metric-val">{snapshot.summary.completionRate}%</div>
            <div className="dash-metric-trend dash-trend-up">
              Comprehension rate
            </div>
          </div>
        </section>

        {/* ── DOUBLE SECTION GRID ── */}
        <section className="dash-layout-grid">
          {/* LEFT: BUBBLE PROGRESS MAP */}
          <div className="dash-main-section">
            <div className="section-head">
              <h2>Logic Mastery Map</h2>
              <p>Sloshing liquid bubbles track your progression in each core topic. Click any bubble to open the module path.</p>
            </div>

            <div className="bubbles-container">
              {bubbleCards.map((bubble, idx) => (
                <div
                  key={idx}
                  className="liquid-bubble-card"
                  style={{ "--accent-rgb": bubble.accentRgb }}
                  onClick={() => navigate(bubble.to)}
                >
                  {/* Wave liquid element */}
                  <div
                    className="liquid-bubble-water"
                    style={{ "--fill-percent": `${Math.max(8, bubble.pct)}%` }}
                  />

                  {/* Centered textual contents */}
                  <div className="liquid-bubble-content">
                    <span className="liquid-bubble-title">{bubble.title}</span>
                    <span className="liquid-bubble-pct">{bubble.pct}%</span>
                    <span className="liquid-bubble-count">{bubble.countText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR COLUMN */}
          <div className="dash-right-column">
            {/* CHALLENGE TRACKER GRAPH CARD */}
            <div className="dash-side-section">
              <div className="section-head">
                <h2>Challenge Tracker</h2>
                <p>Dynamic analysis of your problem-solving progress.</p>
              </div>

              <div className="dash-donut-chart-container">
                <svg className="dash-donut-chart-svg" viewBox="0 0 100 100">
                  {/* Background track circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="rgba(255, 255, 255, 0.04)"
                    strokeWidth="8"
                  />
                  
                  {/* Dynamic colored segments */}
                  {segments.map((seg) => {
                    if (seg.strokeLength <= 0) return null;
                    return (
                      <circle
                        key={seg.key}
                        className="dash-donut-chart-segment"
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="8"
                        strokeDasharray={`${seg.strokeLength} ${circumference}`}
                        strokeDashoffset={seg.strokeOffset}
                        transform="rotate(-90 50 50)"
                        style={{ "--dot-color": seg.color }}
                      />
                    );
                  })}
                </svg>

                {/* Centered label inside the donut */}
                <div className="dash-donut-chart-center">
                  <span className="center-val">{stats.totalSolved}</span>
                  <span className="center-lbl">Solved</span>
                </div>
              </div>

              {/* Legend breakdown list */}
              <div className="dash-donut-legend">
                {chartItems.map((item) => (
                  <div key={item.key} className="dash-donut-legend-item">
                    <div className="dash-donut-legend-left">
                      <div
                        className="dash-donut-legend-dot"
                        style={{
                          backgroundColor: item.color,
                          "--dot-color": item.color,
                        }}
                      />
                      <span className="dash-donut-legend-label">{item.name}</span>
                    </div>
                    <span className="dash-donut-legend-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: RECENT ACTIVITIES */}
            <div className="dash-side-section">
              <div className="section-head">
                <h2>Recent Activities</h2>
                <p>Your latest solved or attempted circuit design tasks.</p>
              </div>

              <div className="activity-list">
                {recentActivities.length > 0 ? (
                  recentActivities.map((act) => (
                    <div key={act.id} className="activity-item" style={{ "--item-accent-rgb": act.status === "solved" ? "34, 197, 94" : "59, 130, 246" }}>
                      <div className="activity-icon">
                        <Zap size={14} />
                      </div>
                      <div className="activity-details">
                        <span className="activity-text">{act.title}</span>
                        <span className="activity-meta">
                          {act.status === "solved" ? "Solved successfully" : "Attempted"} • {act.difficulty || "Core"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="activity-empty">
                    <QuestionIcon size={24} style={{ opacity: 0.4, marginBottom: "0.5rem" }} />
                    <p>No recent activity. Open the Problems Arena to start solving challenges!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
