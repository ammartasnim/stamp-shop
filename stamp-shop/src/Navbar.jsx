import React from 'react'

function Navbar() {
  return (
    <nav style={styles.nav}>
        <a href=""><img src="" alt="" /></a>
        <ul style={styles.links}>
            <li><a href="">Home</a></li>
            <li><a href="">About us</a></li>
            <li><a href="">Catalogue</a></li>
            <li><a href="">Conditions</a></li>
            <li><a href="">Help</a></li>
            <li><a href="">Links</a></li>
            <li><a href="">Contact</a></li>
        </ul>
    </nav>
  )
}
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff"
  },
  links: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0
  }
};

export default navbar