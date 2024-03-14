import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import "../Styles/Home.css";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const BASE_URL = "https://onlinesite.onrender.com";

const Home = () => {
  const [checked, setChecked] = useState([]);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  // get all category
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllcategory();
    getTotal();
  }, []);

  // get product
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/get-product`
      );
      setLoading(false);
      if (data?.product) {
        setProduct(data.product);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get Total
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // LoadMore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProduct([...product, ...data?.product]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter category

  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length]);

  // post filter product
  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/product/filter-product`,
        {
          checked,
          radio,
        }
      );
      if (data?.product) {
        setProduct(data?.product);
      }
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio, setProduct]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [filterProduct, checked, radio]);

  return (
    <Layout title={"All Product-shop Now"}>
      <div className="row mt-2">
        <div className="col-md-2">
          <h4 className="text-center">Filter By category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handlefilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter  */}
          <h4 className="text-center mt-4">Filter By price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p.id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              {" "}
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {product?.map((p) => (
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
                  >
                    More Details
                  </button>
                  <button
                    class="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );

                      toast.success("Item added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="m-2 p-3">
            {product && product.length <= total && (
              <button
                className="btn btn-warning"
                onClick={async (e) => {
                  e.preventDefault();
                  setPage(page + 1);
                  await loadMore();
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
