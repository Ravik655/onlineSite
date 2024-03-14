import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://onlinesite.onrender.com";

const Searchinput = () => {
  const { values, setValues } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="d-flex " role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2 "
        type="search"
        placeholder="Search"
        aria-label="Search"
        style={{ width: "400px", height: "50px" }}
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button
        className="btn btn-outline-success"
        type="submit"
        style={{ height: "50px", width: "100px" }}
      >
        Search
      </button>
    </form>
  );
};

export default Searchinput;
