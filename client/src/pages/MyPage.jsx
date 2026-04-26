import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import StudySessionForm from "../components/StudySessionForm";

function MyPage({ currentUser, setCurrentUser }) {
  // State for study sessions
  const [sessions, setSessions] = useState([]);

  // Toggle form visibility
  const [showForm, setShowForm] = useState(false);

  // Loading and error states for sessions
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [errorSessions, setErrorSessions] = useState("");

  // Fetch sessions when component mounts
  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch study sessions for the current user
  const fetchSessions = async () => {
    try {
      setLoadingSessions(true);
      setErrorSessions("");

      const response = await fetch(
        `http://localhost:3000/sessions/user/${currentUser._id}`
      );
      const data = await response.json();

      // Handle API errors
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch study sessions");
      }

      setSessions(data);
    } catch (error) {
      setErrorSessions(error.message);
    } finally {
      setLoadingSessions(false);
    }
  };

  // Delete a study session
  const handleDeleteSession = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this study session?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `http://localhost:3000/sessions/${id}`,
      {
        method: "DELETE",
      }
    );

    // Refresh sessions after deletion
    if (response.ok) {
      fetchSessions();
    }
  };

  // Remove course from current user
  const handleRemoveCourse = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${currentUser._id}/remove-course`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove course");
      }

      // Update user locally without reloading page
      setCurrentUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section style={styles.pageSection}>
      <h1 style={styles.title}>My Page</h1>
      <p style={styles.subtitle}>Welcome, {currentUser.name}</p>

      {/* --- USER COURSES --- */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>My courses</h2>

        {currentUser.courses && currentUser.courses.length > 0 ? (
          <div style={styles.courseGrid}>
            {currentUser.courses.map((course) => (
              <div key={course._id} style={styles.courseChip}>
                <div>
                  <p style={styles.courseName}>{course.name}</p>
                  <p style={styles.courseCode}>{course.code}</p>
                </div>

                <button
                  onClick={() => handleRemoveCourse(course._id)}
                  style={styles.smallIconButton}
                  title="Remove course"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.message}>
            No courses added to your profile yet.
          </p>
        )}
      </div>

      {/* --- STUDY SESSIONS --- */}
      <div style={styles.card}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>My study sessions</h2>

          <button
            onClick={() => setShowForm(!showForm)}
            style={styles.addSessionButton}
          >
            <Plus size={16} />
            <span>
              {showForm ? "Close form" : "Add study session"}
            </span>
          </button>
        </div>

        {/* Form to create a new session */}
        {showForm && (
          <StudySessionForm
            currentUser={currentUser}
            courses={currentUser.courses || []}
            onSessionAdded={fetchSessions}
          />
        )}

        {/* Loading / error / empty states */}
        {loadingSessions && (
          <p style={styles.message}>Loading study sessions...</p>
        )}
        {errorSessions && (
          <p style={styles.error}>{errorSessions}</p>
        )}

        {!loadingSessions && !errorSessions && sessions.length === 0 && (
          <p style={styles.message}>No study sessions found.</p>
        )}

        {/* Sessions table */}
        {!loadingSessions && !errorSessions && sessions.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Minutes</th>
                <th style={styles.th}>Focus</th>
                <th style={styles.th}>Method</th>
                <th style={styles.th}>Notes</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr key={session._id}>
                  <td style={styles.td}>
                    {session.course?.name || "No course"}
                  </td>
                  <td style={styles.td}>
                    {new Date(session.date).toLocaleDateString("en-CA")}
                  </td>
                  <td style={styles.td}>
                    {session.durationMinutes}
                  </td>
                  <td style={styles.td}>
                    {session.focusLevel}
                  </td>
                  <td style={styles.td}>
                    {session.studyMethod}
                  </td>
                  <td style={styles.td}>
                    {session.notes || "-"}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() =>
                        handleDeleteSession(session._id)
                      }
                      style={styles.iconButton}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

const styles = {
  pageSection: {
    padding: "32px",
    backgroundColor: "#f5ebe0",
    minHeight: "100vh",
  },
  title: {
    fontSize: "40px",
    marginBottom: "8px",
    color: "#2f2723",
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "24px",
    color: "#6b5b52",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
    marginBottom: "24px",
    overflowX: "auto",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: "22px",
    color: "#2f2723",
    margin: 0,
  },
  courseGrid: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  courseChip: {
    minWidth: "220px",
    padding: "18px 20px",
    borderRadius: "16px",
    backgroundColor: "#f8efe6",
    border: "1px solid #f0e3d8",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  courseName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#3a322e",
  },
  courseCode: {
    margin: "6px 0 0 0",
    fontSize: "13px",
    color: "#6b5b52",
  },
  addSessionButton: {
    padding: "12px 18px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#d5bdaf",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "22px",
  },
  th: {
    textAlign: "left",
    padding: "14px 12px",
    borderBottom: "1px solid #e3d5ca",
    color: "#6b5b52",
    fontSize: "14px",
  },
  td: {
    padding: "16px 12px",
    borderBottom: "1px solid #f1e7dd",
    color: "#3a322e",
    fontSize: "14px",
  },
  iconButton: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    border: "1px solid #e3d5ca",
    backgroundColor: "#ffffff",
    color: "#6b5b52",
    cursor: "pointer",
  },
  message: {
    color: "#6b5b52",
    fontSize: "15px",
    marginTop: "20px",
  },
  error: {
    color: "#c2410c",
    fontSize: "15px",
    fontWeight: "500",
  },
};

export default MyPage;