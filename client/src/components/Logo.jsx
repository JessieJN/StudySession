import { BookOpen } from "lucide-react";

function Logo() {
  return (
    <div style={styles.logoContainer}>
      <BookOpen size={20} color="#6b5b52" />
      <span style={styles.logoText}>Study Session</span>
    </div>
  );
}

const styles = {
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  logoText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#3a322e"
  }
};

export default Logo;