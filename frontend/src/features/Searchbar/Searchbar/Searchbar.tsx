// import React from "react";
import styles from "./Searchbar.module.css";

function Searchbar() {
  return (
    <>
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Search address, postcode.."
      />
      <button type="button" className={styles.addButton}>
        &#128269;
      </button>
    </>
  );
}

export { Searchbar };
