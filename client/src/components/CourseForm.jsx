import { useEffect, useState } from "react";

function CourseForm({ onCourseSaved, selectedCourse, clearSelectedCourse }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [credits, setCredits] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fill form when a course is selected for update
  useEffect(() => {
    if (selectedCourse) {
      setName(selectedCourse.name || "");
      setCode(selectedCourse.code || "");
      setProgram(selectedCourse.program || "");
      setSemester(selectedCourse.semester || "");
      setCredits(selectedCourse.credits || "");
      setError("");
      setSuccessMessage("");
    }
  }, [selectedCourse]);

    // Clear success message after a short time
    useEffect(() => {
        if (!successMessage) {
        return;
        }

        const timer = setTimeout(() => {
        setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

  // Create or update course
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccessMessage("");

      const isEditing = Boolean(selectedCourse);

      const url = isEditing
        ? `http://localhost:3000/courses/${selectedCourse._id}`
        : "http://localhost:3000/courses";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          code,
          program,
          semester,
          credits: Number(credits)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save course");
      }

      setSuccessMessage(
        isEditing ? "Course updated successfully" : "Course added successfully"
      );

      // Clear form
      setName("");
      setCode("");
      setProgram("");
      setSemester("");
      setCredits("");

      // Clear selected course after update
      if (clearSelectedCourse) {
        clearSelectedCourse();
      }

      // Refresh course list
      onCourseSaved();

    } catch (error) {
      setError(error.message);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setName("");
    setCode("");
    setProgram("");
    setSemester("");
    setCredits("");
    setError("");
    setSuccessMessage("");

    if (clearSelectedCourse) {
      clearSelectedCourse();
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>
        {selectedCourse ? "Update course" : "Add new course"}
      </h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Course name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Course code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={styles.input}
        />

        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          style={styles.input}
        >
          <option value="">Program</option>
          <option value="Software Development">Software Development</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Web Development">Web Development</option>
          <option value="IT Security">IT Security</option>
        </select>

        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {selectedCourse ? "Update course" : "Add course"}
        </button>

        {selectedCourse && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        )}
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
    marginBottom: "24px"
  },

  title: {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#2f2723"
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    alignItems: "center"
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e3d5ca",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    outline: "none"
  },

  button: {
    padding: "14px 20px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#d5bdaf",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },

  cancelButton: {
    padding: "14px 20px",
    borderRadius: "12px",
    border: "1px solid #d5bdaf",
    backgroundColor: "#ffffff",
    color: "#6b5b52",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  },

  error: {
    color: "#c2410c",
    marginTop: "12px"
  },

  success: {
    color: "#15803d",
    marginTop: "12px"
  }
};

export default CourseForm;