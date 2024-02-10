require("dotenv").config();
const express = require("express");
const errorMiddleware = require("./src/middleware/error.js");

const app = express();
const port = process.env.PORT;

const connection = require("./db/connection");

const bodyParser = require("body-parser");

const cors = require("cors");

const { AuthRouter } = require("./src/routes/auth.routes");
const { UserRouter } = require("./src/routes/user.routes");
const { ProjectRouter } = require("./src/routes/project.routes");
const { TaskRouter } = require("./src/routes/task.routes");
const { IndentRouter } = require("./src/routes/indent.routes");
const { VendorRouter } = require("./src/routes/vendor.routes");
const { PurchaseRouter } = require("./src/routes/purchase.routes");
const { IssueRouter } = require("./src/routes/issue.routes");
// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  optionSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

//end-points

//superAdmin
app.use("/api/user/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/project", ProjectRouter);
app.use("/api/task", TaskRouter);

app.use(errorMiddleware);

app.use("/api/indent",IndentRouter);
app.use("/api/vendor",VendorRouter);
app.use("/api/purchase",PurchaseRouter)
app.use("/api/issue",IssueRouter);
app.listen(port, async () => {
  try {
    await connection();
    console.log(`your server is running on port ${port} `);
  } catch (error) {
    console.log(error);
  }
});
