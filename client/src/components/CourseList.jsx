import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import CourseForm from "./CourseForm";

function CourseList({ currentUser, setCurrentUser }) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3000/courses");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch courses");
      }

      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      if (!search.trim() && !program) {
        await fetchCourses();
        return;
      }

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (program) {
        params.append("program", program);
      }

      const response = await fetch(
        `http://localhost:3000/courses/search?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to search courses");
      }

      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this course?");

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`http://localhost:3000/courses/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete course");
      }

      if (selectedCourse && selectedCourse._id === id) {
        setSelectedCourse(null);
      }

      await fetchCourses();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddCourseToUser = async (courseId) => {
    try {
      setError("");
      setMessage("");

      if (!currentUser) {
        throw new Error("No user is logged in");
      }

      const response = await fetch(
        `http://localhost:3000/users/${currentUser._id}/add-course`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ courseId })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to add course");
        return;
      }

      setCurrentUser(data.user);
      setMessage("Course added to My Page");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const clearSelectedCourse = () => {
    setSelectedCourse(null);
  };

  return (
    <section style={styles.pageSection}>
      <h1 style={styles.title}>Courses</h1>
      <p style={styles.subtitle}>Manage and explore courses</p>

      <SearchBar
        search={search}
        setSearch={setSearch}
        program={program}
        setProgram={setProgram}
        handleSearch={handleSearch}
      />

      <CourseForm
        onCourseSaved={fetchCourses}
        selectedCourse={selectedCourse}
        clearSelectedCourse={clearSelectedCourse}
      />

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
    </section>
  );
}

const styles = {
  pageSection: {
    padding: "32px",
    backgroundColor: "#f5ebe0",
    minHeight: "100vh"
  },
  title: {
    fontSize: "40px",
    marginBottom: "8px",
    color: "#2f2723"
  },
  subtitle: {
    fontSize: "16px",
    marginBottom: "24px",
    color: "#6b5b52"
  },
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