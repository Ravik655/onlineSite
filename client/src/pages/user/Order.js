import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [order, setOrder] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getOrder =useCallback( async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/Order");
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  },[]);

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth.token,getOrder]);
  return (
    <Layout title={"Your-Orders"}>
      <div className="container fluid p-3 m-3 Dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center">All order</h1>

            {order?.map((order, index) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Payment</th>
                        <th scope="col">date</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order?.status}</td>
                        <td>{order?.buyer?.name}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{moment(order?.createAt).fromNow()}</td>
                        <td>{order?.product.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.product?.map((p, i) => (
                      <div className="row card mb-2 ">
                        <div className="col-md-5">
                          {" "}
                          <img
                            // dynamic exice
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                          />
                        </div>
                        <div className="col-md-8 md-3">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">
                            {p.description.substring(0, 20)}...
                          </p>
                          <p className="card-text">Rs{p.price}</p>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/Cart")}
                          >
                            cancel Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
