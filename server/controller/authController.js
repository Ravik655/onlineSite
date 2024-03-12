import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";
import { hashPassword } from "../helper/authhelper.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "../helper/authhelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "name is requires" });
    }
    if (!email) {
      return res.send({ message: "email is require" });
    }
    if (!password) {
      return res.send({ message: "password is requires" });
    }
    if (!phone) {
      return res.send({ message: "phone number is requires" });
    }
    if (!address) {
      return res.send({ message: "address is requires" });
    }
    if (!answer) {
      return res.send({ message: "answer is require" });
    }
    // check user

    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    // registeruser
    const hashedpassword = await hashPassword(password);

    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Sucessfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error on registration",
      error,
    });
  }
};

// post ||login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email in not register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(201).send({
        success: false,
        message: "invalid password",
      });
    }

    // token
    const token = await jwt.sign({ _id: user._id }, process.env.jwt_secret, {
      expiresIn: "5d",
    });

    res.status(200).send({
      success: true,
      message: "login sucessfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    // check
    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};
// test controller
export const testController = (req, res) => {
  try {
    res.send("protectd Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// update Profile user

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);

    // password
    if (password && password.length < 6) {
      return res.json({ error: "password required  and character long" });
    }
    const hashedpassword = password ? await hashPassword(password) : undefined;

    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedpassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "user profile updated successfull",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while update Profile",
      error,
    });
  }
};

// get Order .
export const getOrderController = async (req, res) => {
  try {
    const order = await orderModel
      .find({ buyer: req.user._id })
      .populate("product", "-photo")
      .populate("buyer", "name");
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "while getting error on order",
      error,
    });
  }
};

// All orders

export const getAllOrderController = async (req, res) => {
  try {
    const order = await orderModel
      .find({})
      .populate("product", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "while getting error on order",
      error,
    });
  }
};

// order Status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while Updating Order",
    });
  }
};
