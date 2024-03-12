import React from "react";
import Layout from "../components/Layout/Layout";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { IoMailOpenSharp } from "react-icons/io5";

const Contact = () => {
  return (
    <Layout title={"ContactUs"}>
      <div class="row contactus">
        <div className="col-md-5">
          <img
            src="/image/small-groups-344.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-4">
            any quary and info about product feel free for call anytime we 24x7
            vaialible
          </p>

          <p className="mt-3">
            <IoMailOpenSharp />
            :www.help@ecommerce.com
          </p>
          <p className="mt-3">
            <IoCallSharp />
            9355750655
          </p>
          <p className="mt-3">
            <MdOutlineSupportAgent />
            :1800-0000-0000(toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
