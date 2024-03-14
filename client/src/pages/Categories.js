import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";

const BASE_URL = "https://onlinesite.onrender.com";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-5 mt-5 mb-3 gy-3" key={c._id}>
              <Link to={`${BASE_URL}/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
