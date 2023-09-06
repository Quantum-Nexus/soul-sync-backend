const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.addConfession = async (req, res) => {
  try {
    console.log("entered in add confession");

    const currentUserId = req.user.id;
    const message = req.body.message;

    const folliwinguser = await User.findOneAndUpdate(
      { _id: currentUserId },
      { $push: { confessions: message } },
      { new: true }
    );

    folliwinguser.password = undefined;
    return res.json({
      success: true,
      message: "Confession added successfully",
      data: folliwinguser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while uploading conession",
    });
  }
};

exports.allConfessions = async (req, res) => {
  try {
    console.log("entered in all confession");
    const users = await User.find({}, "confessions");

    const allConfessions = users.flatMap((user) => user.confessions);
    console.log("done")

    res.status(200).json(allConfessions);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while fetching all conession",
    });

  }
};
