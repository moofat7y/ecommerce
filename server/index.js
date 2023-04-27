const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// import routes
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
// const blogRoute = require("./routes/blogRoute");
const prodCategoryRoute = require("./routes/prodCategoryRoute");
// const blogCategoryRoute = require("./routes/blogCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const coponRoute = require("./routes/coponRoute");
const colorRoute = require("./routes/colorRoute");
const enqRoute = require("./routes/enqRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/stripeRoute");

// initilize server
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to database
dbConnect();

// Apply middlewares
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ecommerce-moofat7y.vercel.app",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/register", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
// app.use("/api/blog", blogRoute);
app.use("/api/prodcategory", prodCategoryRoute);
// app.use("/api/blogcategory", blogCategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/copon", coponRoute);
app.use("/api/color", colorRoute);
app.use("/api/enq", enqRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", paymentRoute);

// Catching all errors form middlwares
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const errMessage = error.message;
  res.status(status).json({ message: errMessage });
});

// Listning on port 8080
app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}`);
});
