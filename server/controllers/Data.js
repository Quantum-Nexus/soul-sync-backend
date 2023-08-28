const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.fetchallusers = async (req, res) => {
  try {
    console.log("entered in fetching user");

    const currentUserId = req.user.id;

    const currentUser = await User.findById(currentUserId);
    const followingIds = currentUser.following;

    const oppositeGender = currentUser.gender === 'Male' ? 'Female' : 'Male';

    const usersNotFollowing = await User.find({ 
      _id: { $nin: followingIds },
      gender: oppositeGender
    });

    console.log("printing", usersNotFollowing);
    return res.status(200).json(usersNotFollowing);

  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
    });
  }
};

exports.addconnection = async (req, res) => {
  try {
    console.log("printing req.body" + req.body);

    const token = req.body.my_token.replace("Bearer ", "");
    const otheremail = req.body.otheremail;

    console.log("printnig myemail" + otheremail);
    console.log("printing token of my " + token);

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode ko print kiyta hau" + decode.email);

    console.log("done");

    const loggedinuser = await User.findOne({ email: decode.email });
    const likeduser = await User.findOne({ email: otheremail });

    console.log("printing logged in user" + loggedinuser);
    console.log("printing liked user" + likeduser);

    const followeduser = await User.findOneAndUpdate(
      { email: decode.email },
      { $push: { following: likeduser._id } },
      { new: true }
    );

    const folliwinguser = await User.findOneAndUpdate(
      { email: otheremail },
      { $push: { follow: loggedinuser._id } },
      { new: true }
    );

    // const followeduser = await User.findOneAndUpdate(
    //   { _id: id },
    //   { $push: { following: connection_id } },
    //   { new: true }
    // );

    // const folliwinguser = await User.findOneAndUpdate(
    //   { _id: connection_id },
    //   { $push: { follow: connection_id } },
    //   { new: true }
    // );

    console.log("done");
    return res.json({
      success: true,
      message: "Successfully followed the user",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Something went wrong while following the user",
    });
  }
};
