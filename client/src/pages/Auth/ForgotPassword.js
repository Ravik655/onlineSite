import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../Styles/authStyle.css";



const BASE_URL = "https://onlinesite.onrender.com";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const newPasswordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !newPassword) {
      toast.error("Please fill  in all fields");
      return;
    }

    // Additional validation checks (e.g., email format)

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!newPasswordRegex.test(newPassword)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot password "}>
      <div className="row-container d-flex flex-row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h4>RESET PASSWORD</h4>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder=" enter your secret answer"
              required
            />
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=" enter your new password"
              required
            />
            <button type="submit" className="btn btn-danger">
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
