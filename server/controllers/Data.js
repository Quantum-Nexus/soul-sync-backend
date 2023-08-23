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
    console.log("Add conntection");
    console.log( "Printing req ka user" + req.user);
    const id = req.user.id; //user id
    console.log( "Printing req ka user ka id" +  id);

    const userconnect = req.body;
    console.log("printing req ka body" + userconnect);
    const connection_id = userconnect._id;
    console.log(connection_id);

    const followeduser = await User.findOneAndUpdate(
      { _id: id },
      { $push: { following: connection_id } },
      { new: true }
    );

    const folliwinguser = await User.findOneAndUpdate(
      { _id: connection_id },
      { $push: { follow: connection_id } },
      { new: true }
    );

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
