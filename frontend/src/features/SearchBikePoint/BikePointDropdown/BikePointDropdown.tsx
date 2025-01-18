// import React from "react";
import styles from "./BikePointDropdown.module.css";

function BikePointDropdown() {
  fetch("http://localhost:3000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  return (
    <>
      <select
        className={styles.dropdown}
        name="BikePointListsDropdown"
        id="BikePointListsDropdown"
      >
        <option value="Test">Test</option>
      </select>
    </>
  );
}

export { BikePointDropdown };
