import { useState } from "react";
import styles from "./Searchbar.module.css";
import { useNavigate } from "react-router-dom";

function Searchbar({ activeListId }: { activeListId: number }) {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  function redirectToSearchPage() {
    navigate(
      `/search?address=${address.replaceAll(" ", "+")}&activelist=${activeListId}`,
    );
  }
  return (
    <>
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Search address, postcode.."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        type="button"
        onClick={redirectToSearchPage}
        className={styles.addButton}
      >
        &#128269;
      </button>
    </>
  );
}

export { Searchbar };
