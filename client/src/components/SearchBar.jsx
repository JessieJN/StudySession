// SearchBar component
// Handles search input and program filter for courses

function SearchBar({ search, setSearch, program, setProgram, handleSearch }) {
  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        placeholder="Search by course name or code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <select
        value={program}
        onChange={(e) => setProgram(e.target.value)}
        style={styles.select}
      >
        <option value="">All programs</option>
        <option value="Software Development">Software Development</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Web Development">Web Development</option>
        <option value="IT Security">IT Security</option>
      </select>

      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap"
  },

  input: {
    flex: "1",
    minWidth: "260px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e3d5ca",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    outline: "none"
  },

  select: {
    minWidth: "200px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #e3d5ca",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    outline: "none"
  },

  button: {
    padding: "14px 24px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#d5bdaf",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default SearchBar;