const express = require("express");
const router = express();




router.all("*", function (req, res, next) {
    res.send("Invalid Url");
});


module.exports = router;