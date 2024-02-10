const express = require("express");
const { PurchaseService } = require("../services");
const { verifySuperAdmin } = require("../middleware/authenticator");
const { createPurchase, getPurchases } = require("../controllers/purchase.controller");

const PurchaseRouter = express.Router();
PurchaseRouter.use(verifySuperAdmin)
PurchaseRouter.post("/create", createPurchase);
PurchaseRouter.get("/fetch", getPurchases);

module.exports = { PurchaseRouter };
