import { useState } from "react";

function StudySessionForm({ currentUser, courses, onSessionAdded }) {
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [focusLevel, setFocusLevel] = useState("");
  const [studyMethod, setStudyMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Create a new study session
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const response = await fetch("http://localhost:3000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: currentUser._id,
          course,
          date,
          durationMinutes: Number(durationMinutes),
          focusLevel: Number(focusLevel),
          studyMethod,
          notes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create study session");
      }

      setSuccess("Study session added successfully");

      // Clear form fields after successful submit
      setCourse("");
      setDate("");
      setDurationMinutes("");
      setFocusLevel("");
      setStudyMethod("");
      setNotes("");

      // Refresh the session list in MyPage
      onSessionAdded();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Add study session</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={styles.input}
        >
          <option value="">Select course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Minutes"
          value={durationMinutes}
          min="1"
          onChange={(e) => setDurationMinutes(e.target.value)}
          style={styles.input}
        />

        <select
          value={focusLevel}
          onChange={(e) => setFocusLevel(e.target.value)}
          style={styles.input}
        >
          <option value="">Focus level</option>
          <option value="1">1 - Very low</option>
          <option value="2">2 - Low</option>
          <option value="3">3 - Medium</option>
          <option value="4">4 - High</option>
          <option value="5">5 - Very high</option>
        </select>

        <select
          value={studyMethod}
          onChange={(e) => setStudyMethod(e.target.value)}
          style={styles.input}
        >
          <option value="">Study method</option>
          <option value="reading">Reading</option>
          <option value="coding">Coding</option>
          <option value="video">Video</option>
          <option value="lecture">Lecture</option>
          <option value="exercises">Exercises</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Save session
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fffaf6",
    borderRadius: "18px",
    padding: "20px",
    marginTop: "20px",
    border: "1px solid #f0e3d8"
  },
  title: {
    marginBottom: "16px",
    color: "#2f2723"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "12px"
  },
  input: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #e3d5ca",
    outline: "none"
  },
  button: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#d5bdaf",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer"
  },
  error: {
    color: "#c2410c"
  },
  success: {
    color: "#15803d"
  }
};

export default StudySessionForm;