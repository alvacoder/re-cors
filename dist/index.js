/**
 * @author Idris Adeniji (alvacoder)
 * @email idrisadeniji01@gmail.com
 * @create date 2021-10-19 11:44:48
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import axios from "axios";
import helmet from "helmet";
import morgan from "morgan";
dotenv.config(); // Initialise App

const app = express();
const port = process.env.PORT || 7000; //  Setup Middlewares

app.use(morgan("tiny"));
app.use(compression());
app.use(cors("*"));
app.use(helmet());
app.use(bodyParser.json({
  limit: "50mb",
  extended: true,
  parameterLimit: "50mb"
})); // app.use(bodyParser.urlencoded({ extended: true, parameterLimit: "100000" }));
// Handle CORS

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "HEAD", "PATCH", "GET, POST, PUT, DELETE");
    return res.status(200).end();
  }

  next();
}); // Setup Routes

app.get("/:url", async (req, res) => {
  const {
    url
  } = req.params;
  let data;

  try {
    console.log(url, 2);
    console.log(req.params, 1);
    data = await axios.get(`${url}`);
    data = data.data;
    res.send({
      status: 200,
      data
    });
  } catch (error) {
    // console.log(error);
    res.send({
      status: 500,
      message: "An error occurred.",
      response: error.message
    });
  }
});
app.get("/*", async (req, res) => {
  let url = req.params['0'];
  let data;

  try {
    // console.log(url, 2);
    //   console.log(req.params, req.query, 1);
    //   process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
    //   console.log(Object.keys(req.query), 4);
    url = `${url}?${Object.keys(req.query)[0]}=${req.query[Object.keys(req.query)[0]]}`; //   console.log(url, 333);

    data = await axios.get(`${url}`);
    data = data.data;
    res.send({
      status: 200,
      data
    });
  } catch (error) {
    // console.log(error);
    res.send({
      status: 500,
      message: "An error occurred.",
      response: error.message
    });
  }
});
app.get("/", async (req, res) => {
  console.log(22);
  res.send({
    status: 200,
    message: "Welcome to Re-cors 1.0"
  });
});
app.listen(port, () => {
  console.log("app running on port %s", port);
});