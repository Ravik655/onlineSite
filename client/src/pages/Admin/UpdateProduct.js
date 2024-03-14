import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");


  const BASE_URL = "https://onlinesite.onrender.com";

  // getSingle category
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/get-product/${params.slug}`
      );

      setDescription(data.product.description);
      setCategory(data.product.category._id);
      setName(data.product.name);
      setId(data.product.id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      // setPhoto(data.product.photo.data)
    } catch (error) {
      console.log(error);
      toast.error("somthing went error");
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

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

  // Update product function
  const handlerUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("price", price);
      photo && productData.append("photo", photo);
      productData.append("category", category);


      const { data } = await axios.put(
        `${BASE_URL}/api/v1/product/update-product/${params.slug}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("product updated successfully");
        navigate("/Dashboard/Admin/Product");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("somthing went worng");
    }
  };
  // delete  a product
  const handlerDelete = async () => {
    try {
      let answer = window.confirm("Are you sure want to delete this product");
      if (!answer) return;
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/product/delete-product/${params.slug}`
      );
      if (data.success) {
        toast.success("product deleted");
      }
      toast.success("product deleted successfully");
      navigate("/Dashboard/Admin/Product");
    } catch (error) {
      console.log(error);
      toast.error("something went worng on delete");
    }
  };

  return (
    <Layout title={"UpdateProduct"}>
      <div className="container-fluid m-3 p-3">
        <div className="row d-flex justify-content-betweenx">
          <div className="row">
            <div className="col-md-5">
              <AdminMenu />
            </div>
            <div className="col-md-6">
              <h1>UpdateProduct</h1>
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
                  value={category}
                >
                  {categories?.map((p) => (
                    <Option key={p._id} value={p._id}>
                      {p.name}
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
                    {!photo && id ? (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product-Preview"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        {
                          <img
                            src={`${BASE_URL}/api/v1/product/product-photo/${params.slug}`}
                            alt="product-Preview"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        }
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
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
                      value={shipping ? "yes" : "no"}
                    >
                      <Option value="0">no</Option>
                      <Option value="1">yes</Option>
                    </Select>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handlerUpdate}>
                      UPDATE PRODUCT
                    </button>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-danger" onClick={handlerDelete}>
                      DELETE PRODUCT
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

export default UpdateProduct;
