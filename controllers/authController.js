import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/oderModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //* Input Validation
    if (!name) {
      return res.send({ message: "Name is Require" });
    }
    if (!email) {
      return res.send({ message: "Email is Require" });
    }
    if (!password) {
      return res.send({ message: "Password is Require" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number is Require" });
    }
    if (!address) {
      return res.send({ message: "Address is Require" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Require" });
    }

    //* Exisiting  user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ success: false, message: "Already Register please login" });
    }

    //* Validation for register user
    const hashedPassword = await hashPassword(password);
    //* Save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res
      .status(201)
      .send({ success: true, message: "User Register Succefully", user });
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Registration", error });
  }
};

//* POST loginController
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //* Validation inputs
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or passwoed" });
    }
    //* Find User by Email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email is not registerd" });
    }

    // if got user by email then check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid password" });
    }
    //todo: Create a token if both email and password are verfied
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
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
    // console.log(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};
// todo:forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    // Check email and answer
    const user = await userModel.findOne({ email, answer });
    // Validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.loq(error);
    res.status(500).send({
      success: false,
      message: "Somthing went wrong",
      error,
    });
  }
};

// todo: testController
export const testController = (req, res) => {
  try {
    res.send("Protectes Router");
  } catch (error) {
    // console.log(error);
  }
};

// * Update Profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const user = await userModel.findById(req.user._id);
    // password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character login" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        email: email || user.email,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "profile Updated Successfullly",
      updatedUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};

// export default { registerController };
// orders
export const getOrdersControllers = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// All Orders
export const getAllOrdersControllers = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// Order Status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While  Updating Order",
      error,
    });
  }
};
