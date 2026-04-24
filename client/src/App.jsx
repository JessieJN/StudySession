import { useState } from "react";
import Header from "./components/Header";
import CourseList from "./components/CourseList";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

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
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && (
      <CourseList currentUser={currentUser} setCurrentUser={setCurrentUser} />
    )}
      {currentPage === "myPage" && <MyPage currentUser={currentUser} setCurrentUser={setCurrentUser} />}
    </div>
  );
}

export default App;