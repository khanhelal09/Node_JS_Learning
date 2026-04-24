const express = require("express");
const router = express.Router();
const securityController = require("../controllers/securityController");

router.get("/test", async function (req, res, next){
    res.send('Successfully run API server');
});

router.get("/tokens", securityController.getTokens);
router.get("/accessToken", securityController.getNewAccessToken)


module.exports = router;