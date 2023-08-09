const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
    heigh:{
        type: Number,
    }
    
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);
