import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"AboutUs"}>
      <div class="row contactus">
        <div className="col-md-6">
          <img
            src="/image/about.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>

        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-3">
            Hi,I work as a web developer. I am a software engineer who loves to
            create websites as well as apps for people. I think that people
            should look at the bigger picture when they are building something.
            I love to work in groups where everyone can voice their opinions and
            ideas.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
