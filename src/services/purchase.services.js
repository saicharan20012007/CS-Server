const { Purchase } = require("../models");

const PurchaseService = {
  async getpurchases(query, projection) {
    try {
      const purchases = await Purchase.find(query, projection);
      return purchases;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async createPurchase(purchaseDetails) {
    try {
      const purchase = new Purchase(purchaseDetails);
      await purchase.save();
      return { message: "Purchase created successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = PurchaseService;
