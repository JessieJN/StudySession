import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

function HomePage({ currentUser, setCurrentUser }) {
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

      <CourseList
        courses={courses}
        loading={loading}
        error={error}
        message={message}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleAddCourseToUser={handleAddCourseToUser}
      />
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
  }
};

export default HomePage;