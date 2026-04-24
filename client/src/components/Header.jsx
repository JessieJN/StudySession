import Logo from "./Logo";
import { useState } from "react";

function Header({ currentPage, setCurrentPage, setCurrentUser }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header style={styles.header}>
      <Logo />

      <nav style={styles.nav}>
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

        {/* Profile / Settings */}
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
                  localStorage.removeItem("user")
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

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 32px",
    backgroundColor: "#f5ebe0",
    borderBottom: "1px solid #e3d5ca"
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },

  navButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    color: "#6b5b52",
    padding: "6px 10px"
  },

  activeButton: {
    borderBottom: "2px solid #d5bdaf",
    fontWeight: "600",
    color: "#3a322e"
  },

  profileIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "1px solid #d5bdaf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6b5b52",
    fontSize: "18px",
    cursor: "pointer"
  },

  dropdown: {
    position: "absolute",
    top: "45px",
    right: "0",
    minWidth: "160px",
    backgroundColor: "#ffffff",
    border: "1px solid #e3d5ca",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    zIndex: 10
  },

  dropdownItem: {
    padding: "10px 14px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#3a322e"
  }
};

export default Header;