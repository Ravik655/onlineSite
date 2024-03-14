import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";

const BASE_URL = "https://onlinesite.onrender.com";

const Search = () => {
  const { values } = useSearch();
  return (
    <Layout>
      <div className="container col-md-8 ">
        <div className="text-center">
          <h1>Search result</h1>
          <h6>
            {values?.result?.length < 1
              ? "no product found"
              : `found ${values?.result.length}`}
          </h6>
          <div className="d-flex flex-wrap m-2">
            {values?.result?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  // dynamic exice
                  src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <p className="card-text">Rs{p.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
