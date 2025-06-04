const express = require("express");
const middleware = require('./api/middleware/middleware')
require("dotenv").config();
const cors = require("cors");
const v1Routes = require("./api/routes/v1");
const app = express();
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.verifyToken)

app.use("/api/v1", v1Routes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
