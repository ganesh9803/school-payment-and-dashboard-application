//pages/api/transactions/manual-update.js

import connectDB from "../../../lib/db";
import CollectRequest from "../../../models/CollectRequest";
import CollectRequestStatus from "../../../models/CollectRequestStatus";

const handler = async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    await connectDB();
  
    const { collect_id, status } = req.body;
  
    if (!collect_id || !status) {
      return res.status(400).json({ error: "Invalid payload" });
    }
  
    try {
      const updatedTransaction = await CollectRequestStatus.findOneAndUpdate(
        { collect_id },
        { status },
        { new: true }
      );
  
      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
  
      res.status(200).json({ message: "Transaction status updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update transaction status" });
    }
  };
  
  export default handler;
  