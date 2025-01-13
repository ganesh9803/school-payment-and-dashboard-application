import connectDB from "../../../../lib/db";
import CollectRequestStatus from "../../../../models/CollectRequestStatus";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectDB();

  const { customOrderId } = req.query;

  try {
    // Find the transaction using the custom_order_id
    const transaction = await CollectRequestStatus.aggregate([
      {
        $lookup: {
          from: "collectrequests",  // The collection name for CollectRequest
          localField: "collect_id",
          foreignField: "_id",
          as: "request",
        },
      },
      {
        $unwind: "$request",
      },
      {
        $match: {
          "request.custom_order_id": customOrderId,  // Match by custom_order_id
        },
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

    if (transaction.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction[0]);  // Return the transaction details with the status
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transaction status" });
  }
};

export default handler;
