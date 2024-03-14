import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
// import toast from "react-hot-toast";
import { Select } from "antd";
const { Option } = Select;


const BASE_URL = "https://onlinesite.onrender.com";

const AdminOrder = () => {
  const [order, setOrder] = useState([]);
  const { auth } = useAuth([]);

  const [status] = useState([
    "Not Process",
    "Processing",
    "Shiping",
    "deliverd",
    "cancel",
  ]);


    const getOrder = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/auth/all-Order`);
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
    if (auth?.token) {
      getOrder();
    }
  }, [auth.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/auth/status-update/${orderId}`,
        {
          status: value,
        }
      );
      getOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All order Data"}>
      <div className="container-fluid m-3 p-3 Dashboard">
        <div className="row ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center">All Order</h1>
            {order.map((order, index) => {
              return (
                <div className="border shadow" key={index}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Date</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(order._id, value)}
                            defaultValue={order?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{moment(order?.createAt).fromNow()}</td>
                        <td>{order?.product.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.product?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
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

export default AdminOrder;
