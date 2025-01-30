import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../../components/Input";

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
      <div className="flex items-center mb-10 h-10">
        <Input
          type="text"
          placeholder="Search by postcode, address..."
          className="bg-slate-500 text-slate-50 h-9"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></Input>

        <button
          type="button"
          onClick={redirectToSearchPage}
          className="bg-slate-100 text-black text-center p-0 mx-1 rounded-md"
        >
          <span
            className="material-symbols-outlined text-center p-0  table m-1"
            style={{ fontSize: "20px", display: "flex" }}
          >
            search
          </span>
        </button>
      </div>
    </>
  );
}

export { Searchbar };
