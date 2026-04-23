import Logo from "./Logo";

function Header() {
  return (
    <header style={styles.header}>
      <Logo />

      <nav style={styles.nav}>
        <button style={{ ...styles.navButton, ...styles.activeButton }}>
          Home
        </button>

        <button style={styles.navButton}>
          My Page
        </button>

        <div style={styles.profileIcon}>◦</div>
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
    fontSize: "22px"
  }
};

export default Header;