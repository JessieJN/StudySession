import Logo from "./Logo";
import { useState } from "react";

// Header component
// Handles navigation between pages and user menu (dropdown)
function Header({ currentPage, setCurrentPage, setCurrentUser }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header style={styles.header}>
      <Logo />

      <nav style={styles.nav}>
        {/* Navigation buttons */}
        <button
          onClick={() => setCurrentPage("home")}
          style={{
            ...styles.navButton,
            ...(currentPage === "home" ? styles.activeButton : {})
          }}
        >
          Home
        </button>

        <button
          onClick={() => setCurrentPage("myPage")}
          style={{
            ...styles.navButton,
            ...(currentPage === "myPage" ? styles.activeButton : {})
          }}
        >
          My Page
        </button>

        {/* Profile / Settings dropdown */}
        <div style={{ position: "relative" }}>
          <div
            style={styles.profileIcon}
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </div>

          {showMenu && (
            <div style={styles.dropdown}>
              <button style={styles.dropdownItem}>
                Change name
              </button>

              <button style={styles.dropdownItem}>
                Change password
              </button>

              <button
                type="button"
                style={styles.dropdownItem}
                onClick={() => {
                  // Clear stored user and reset app state
                  localStorage.removeItem("user");
                  setCurrentUser(null);
                  setCurrentPage("home");
                  setShowMenu(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}