import mongoose from "mongoose";

const CollectRequestSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    school_id: { type: String, required: true },
    trustee_id: { type: String, required: true },
    gateway: { type: String, required: true },
    order_amount: { type: Number, required: true },
    custom_order_id: { type: String, required: true },
});
  

export default mongoose.models.CollectRequest ||
  mongoose.model("CollectRequest", CollectRequestSchema);
