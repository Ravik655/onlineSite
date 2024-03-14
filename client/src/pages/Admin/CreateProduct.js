import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const BASE_URL = "https://onlinesite.onrender.com";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState();

  // get category
  const getAllcategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went worng in gitting category");
    }
  };

  useEffect(() => {
    getAllcategories();
  }, []);

  // Create product function
  const handlerCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("product created successfully");
        navigate("/Dashboard/Admin/product");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("somthing went worng");
    }
  };

  return (
    <Layout title={"CreateProduct"}>
      <div className="container-fluid m-3 p-3">
        <div className="row d-flex justify-content-betweenx">
          <div className="row">
            <div className="col-md-5">
              <AdminMenu />
            </div>
            <div className="col-md-6">
              <h1>CreateProduct</h1>
              <div className="m-1">
                <Select
                  bordered={false}
                  placeholder="Selecta category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-mb-12">
                    {photo ? photo.name : "Upload photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product-pic"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="write a name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="write a Description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="write a Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="write a quiantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <Select
                      bordered={false}
                      placeholder="select shipping"
                      size="large"
                      showSearch
                      className="form-control mb-3"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value="0">no</Option>
                      <Option value="1">yes</Option>
                    </Select>
                  </div>
                  <div className="mn-3">
                    <button className="btn btn-primary" onClick={handlerCreate}>
                      CREATE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
