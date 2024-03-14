import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [relatedproduct, setRelatedproduct] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = "https://onlinesite.onrender.com";

  // get product
  const getProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/get-product/${params.slug}`
      );

      if (data && data.product) {
        setProduct(data?.product);
        getsimilarproduct(data?.product?._id, data?.product.category);
      } else {
        console.error("Product data or product is undefined.");
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.slug, BASE_URL]);
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug, getProduct]);

  // get similar product
  const getsimilarproduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${ BASE_URL}/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedproduct(data?.product);
    } catch (error) {
      console.log("Error fetching related products:", error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-4 ">
        <div className="col-md-5 text-center">
          <img
            // dynamic exice
            src={`${BASE_URL}/api/v1/product/product-photo/${params.slug}`}
            className="card-img-top"
            alt={product.name}
            height="400px"
            width="300px"
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Price: {product.price}</h6>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Category: {product.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
        <hr />
        <div className="row">
          <h6>Related Product</h6>

          {relatedproduct.length >= 0 && <p>No similar product found</p>}
          <div className="d-flex flex-wrap">
            {relatedproduct?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
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

                  <button 
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
