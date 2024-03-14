import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";



const BASE_URL = "https://onlinesite.onrender.com";

const Profile = () => {
  // context
  const { auth, setAuth } = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user profile
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });

        let locals = localStorage.getItem("auth");
        locals = JSON.parse(locals);
        locals.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(locals));
        toast.success("Profile updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went worng");
    }
  };

  return (
    <Layout title={"user-Profile"}>
      <div className="container fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="row contactus">
              <div className="col-md-5">
                <img
                  src="/image/register.jpg"
                  alt="Register"
                  style={{ width: "100%" }}
                />
              </div>

              <div className="col-md-6">
                <h1 className="bg-dark p-2 text-white text-center">
                  USER PROFILE
                </h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                  />
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    disabled
                  />
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" enter your Password"
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />

                  <button type="submit" className="btn btn-primary">
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
