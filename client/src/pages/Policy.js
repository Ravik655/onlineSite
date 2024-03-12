import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"policy"}>
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
          <p className="text-justify mt-2">
            Policy is a deliberate system of guidelines to guide decisions and
            achieve rational outcomes. A policy is a statement of intent and is
            implemented as a procedure or protocol. Policies are generally
            adopted by a governance body within an organization. Policies can
            assist in both subjective and objective decision making.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
