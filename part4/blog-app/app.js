const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const {
  requestHandler,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogRouter");
const usersRouter = require("./controllers/userRouter");
const loginRouter = require("./controllers/loginRouter");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB: ", error);
  });

app.use(cors());
app.use(express.json());
app.use(requestHandler);
app.use(tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(unknownEndpoint);

app.use(errorHandler);

module.exports = app;
