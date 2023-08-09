const User = require("../models/User");

exports.fetchallusers = async (req, res) => {
    try {
        User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
    } catch (error) {
        console.log(error)
        return res.json({
            error: error.message
        })
        
    }
}