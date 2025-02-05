import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import cors from "cors";
import { connectToMongoDatabase } from "./Database/connectDatabase.js";
import { ContactRouter } from "./Routes/contactRouter.js";
import { AdminRouter } from "./Routes/adminRouter.js";
import { SubscriberRouter } from "./Routes/subscriberRouter.js";

config();

const test = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors(test));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.get("/hello", (req, res) => {
  res.send("this is working  the way it should  wokr");
});
app.use("/admin", AdminRouter);
app.use("/contacts", ContactRouter);
app.use("/subscriber", SubscriberRouter);

app.listen(PORT, () => {
  console.log(`The server has started on the port ${PORT}`);
  connectToMongoDatabase();
});
