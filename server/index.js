const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database")
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload")




const userRoutes = require("./routes/user")
const fetchingData = require("./routes/data")
const contactus = require("./routes/contact")



const PORT = process.env.PORT || 4000;
database.connect()


app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: "/tmp/",
  })
)


cloudinaryConnect()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/fetch", fetchingData)
app.use("/api/v1/", contactus)

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
