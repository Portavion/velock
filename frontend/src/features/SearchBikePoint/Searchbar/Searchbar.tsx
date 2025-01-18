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
    </>
  );
}

export { Searchbar };
