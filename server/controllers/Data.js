const User = require("../models/User");

exports.fetchallusers = async (req, res) => {
  try {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
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

    const myemail = req.body.myemail;
    const otheremail = req.body.otheremail;

    console.log("printnig myemail" + myemail);
    console.log("printing otheremail" + otheremail);

    const loggedinuser = await User.findOne({ email: myemail });
    const likeduser = await User.findOne({ email: otheremail });

    console.log( "printing logged in user" +loggedinuser);
    console.log("printing liked user" + likeduser);

    const followeduser = await User.findOneAndUpdate(
      { email: myemail },
      { $push: { following: loggedinuser._id } },
      { new: true }
    );

    const folliwinguser = await User.findOneAndUpdate(
      { email: otheremail },
      { $push: { follow: likeduser._id } },
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
      })
  }
};
