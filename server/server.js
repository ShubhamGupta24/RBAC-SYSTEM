require('dotenv').config();
const express = require("express");
// to resolve cross origin resources issues
const cors = require("cors")
const app = express();
const router = require("./routes/auth-route");
const connectDb = require("./utils/db");


// Invoking the  error middleware
const errorMiddleware = require("./middlewares/error-middleware");


// const corsOptions = {
//   origin: "https://localhost:3000",
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// };
// Always use this middle ware before express.json or data parsing 
app.use(cors());
//MiddleWare to parse json data
app.use(express.json());


// Mount the Router: 
// To use the router in your main Express app,
//  you can "mount" it at a specific URL prefix
app.use("/api/auth", router);


// MiddleWare to handle errors
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});