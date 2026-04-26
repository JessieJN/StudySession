import { Pencil, Trash2, Plus } from "lucide-react";

// CourseList component
// Displays courses in a table and handles edit, delete, and add-to-profile actions
function CourseList({
  courses,
  loading,
  error,
  message,
  handleEdit,
  handleDelete,
  handleAddCourseToUser
}) {
  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>All courses</h2>

      {message && <p style={styles.message}>{message}</p>}

      {loading && <p style={styles.message}>Loading courses...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p style={styles.message}>No courses found.</p>
      )}

      {!loading && !error && courses.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Course name</th>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Program</th>
              <th style={styles.th}>Semester</th>
              <th style={styles.th}>Credits</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td style={styles.td}>{course.name}</td>
                <td style={styles.td}>{course.code}</td>
                <td style={styles.td}>{course.program}</td>
                <td style={styles.td}>{course.semester}</td>
                <td style={styles.td}>{course.credits}</td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      onClick={() => handleEdit(course)}
                      style={styles.iconButton}
                      title="Edit course"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(course._id)}
                      style={styles.iconButton}
                      title="Delete course"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      onClick={() => handleAddCourseToUser(course._id)}
                      style={styles.iconButton}
                      title="Add to my courses"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
    overflowX: "auto"
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#2f2723"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    textAlign: "left",
    padding: "14px 12px",
    borderBottom: "1px solid #e3d5ca",
    color: "#6b5b52",
    fontSize: "14px"
  },
  td: {
    padding: "16px 12px",
    borderBottom: "1px solid #f1e7dd",
    color: "#3a322e",
    fontSize: "14px",
    verticalAlign: "middle"
  },
  actionButtons: {
    display: "flex",
    gap: "10px"
  },
  iconButton: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    border: "1px solid #e3d5ca",
    backgroundColor: "#ffffff",
    color: "#6b5b52",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  message: {
    color: "#6b5b52",
    fontSize: "15px"
  },
  error: {
    color: "#c2410c",
    fontSize: "15px",
    fontWeight: "500"
  }
};

export default CourseList;