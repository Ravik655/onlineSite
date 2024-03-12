import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authroute from "./router/authroute.js";
import categoryRoutes from "./router/categoryRoutes.js";
import cors from "cors";
import productRoutes from "./router/productRoutes.js";

// configur
dotenv.config();
// dotenv.config("path in case of out side of root")

// database config
connectDB();

// rest object
const server = express();

// middlweare
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

// routes
server.use("/api/v1/auth", authroute);
server.use("/api/v1/category", categoryRoutes);
server.use("/api/v1/product", productRoutes);

// rest api
server.get("/", (req, res) => {
  res.send({
    message: "welcome to my site",
  });
});
// port
const port = process.env.port || 8000;

server.listen(port, () => {
  // when useing env
  // console.log(`server running on  ${process.env.DEV_MODE} mode on port ${port}`);
  console.log(`server running on ${port}`);
});
