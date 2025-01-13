//pages/api/transaction/index.js
import connectDB from "../../../lib/db";
import authenticate from "../../../middleware/auth";
import CollectRequest from "../../../models/CollectRequest";
import CollectRequestStatus from "../../../models/CollectRequestStatus"; // Import the authentication middleware

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Authenticate the user
  authenticate(req, res, async () => {
    await connectDB();

    try {
      const transactions = await CollectRequestStatus.aggregate([
        {
          $lookup: {
            from: "collectrequests",
            localField: "collect_id",
            foreignField: "_id",
            as: "request",
          },
        },
        {
          $unwind: "$request",
        },
        {
          $project: {
            collect_id: 1,
            school_id: "$request.school_id",
            gateway: 1,
            order_amount: "$request.order_amount",
            transaction_amount: 1,
            status: 1,
            custom_order_id: "$request.custom_order_id",
          },
        },
      ]);

      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });
};

export default handler;
