//pages/api/webhook/status-update.js

import connectDB from "../../../lib/db";
import CollectRequest from "../../../models/CollectRequest";
import CollectRequestStatus from "../../../models/CollectRequestStatus";


const handler = async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    await connectDB();
  
    const { order_info } = req.body;
  
    if (!order_info || !order_info.order_id) {
      return res.status(400).json({ error: "Invalid payload" });
    }
  
    try {
      const updatedTransaction = await CollectRequestStatus.findOneAndUpdate(
        { collect_id: order_info.order_id },
        { status: req.body.status, transaction_amount: order_info.transaction_amount },
        { new: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
  
      res.status(200).json({ message: "Transaction updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update transaction" });
    }
  };
  
  export default handler;
  