import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";

// App component (root component)
// Manages global state (current user and current page)
// Handles authentication using localStorage
// Controls which page is displayed (Login, Home, MyPage)

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Show login page if no user is logged in
  if (!currentUser) {
    return (
      <LoginPage
        setCurrentUser={setCurrentUser}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  return (
    <div>
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCurrentUser={setCurrentUser}
      />

      {currentPage === "home" && (
        <HomePage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}

      {currentPage === "myPage" && (
        <MyPage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default App;