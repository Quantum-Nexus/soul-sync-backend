const User = require("../models/User");
const mongoose = require("mongoose");

exports.updateProfile = async (req, res) => {
  try {
    console.log("Entered");
    const id = req.user.id;
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;
    

    // Find the profile by id
    const userDetails = await User.findById(id);

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    // Update the profile fields
    userDetails.dateOfBirth = dateOfBirth;
    userDetails.about = about;
    userDetails.contactNumber = contactNumber;
    userDetails.gender = gender;

    // Save the updated profile
    await userDetails.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)


    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


exports.myprofile = async (req, res) => {
  try {
    console.log("entered");
    console.log(req.user.id);

    const user = await User.findById(req.user.id);
    console.log(user);
    
    return res.json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}