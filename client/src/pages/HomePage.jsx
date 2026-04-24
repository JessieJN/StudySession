import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

function HomePage({ currentUser, setCurrentUser }) {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");

  // Saves the latest search/filter used by the user
  const [activeSearch, setActiveSearch] = useState("");
  const [activeProgram, setActiveProgram] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // Fetch courses when the page loads
    fetchCourses(true, activeSearch, activeProgram);

    // Auto-refresh courses every 10 seconds
    const intervalId = setInterval(() => {
      fetchCourses(false, activeSearch, activeProgram);
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [activeSearch, activeProgram]);

  const fetchCourses = async (
    showLoading = true,
    searchValue = activeSearch,
    programValue = activeProgram
  ) => {
    if (showLoading) {
      setLoading(true);
    }

    try {
      setError("");

      const params = new URLSearchParams();

      if (searchValue.trim()) {
        params.append("search", searchValue.trim());
      }

      if (programValue) {
        params.append("program", programValue);
      }

      // Use the search endpoint only when search/filter is active
      const url = params.toString()
        ? `http://localhost:3000/courses/search?${params.toString()}`
        : "http://localhost:3000/courses";

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch courses");
      }

      // Only update state if the data has actually changed
      setCourses((prevCourses) => {
        if (JSON.stringify(prevCourses) === JSON.stringify(data)) {
          return prevCourses;
        }

        return data;
      });
    } catch (error) {
      setError(error.message || "Could not fetch courses");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const handleSearch = async () => {
    const newSearch = search.trim();
    const newProgram = program;

    // Save the current search/filter so auto-refresh keeps using it
    setActiveSearch(newSearch);
    setActiveProgram(newProgram);

    await fetchCourses(true, newSearch, newProgram);
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

      await fetchCourses(true, activeSearch, activeProgram);
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
        onCourseSaved={() => fetchCourses(true, activeSearch, activeProgram)}
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