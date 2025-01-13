import mongoose from "mongoose";

const CollectRequestStatusSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    collect_id: { type: String, required: true },
    status: { type: String, required: true },
    payment_method: { type: String, required: true },
    gateway: { type: String, required: true },
    transaction_amount: { type: Number, required: true },
    bank_refrence: { type: String, required: true },
});
  

export default mongoose.models.CollectRequestStatus ||
  mongoose.model("CollectRequestStatus", CollectRequestStatusSchema);
