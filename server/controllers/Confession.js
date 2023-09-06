const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.addConfession = async (req, res) => {
  const userId = req.user.id;
  const confessionText = req.body.confessionText;

  try {
    const { message } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.confessions.push({ message });
    await user.save();

    res.status(201).json({ message: "Confession added successfully" });
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
    const confessions = await User.aggregate([
      {
        $unwind: "$confessions",
      },
      {
        $sort: { "confessions.date": -1 },
      },
      {
        $group: {
          _id: null,
          confessions: { $push: "$confessions" },
        },
      },
    ]);

    if (confessions.length === 0) {
      return res.status(404).json({ message: "No confessions found" });
    }

    res.status(200).json(confessions[0].confessions);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while fetching all conession",
    });
  }
};
