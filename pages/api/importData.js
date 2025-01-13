//pages/api/importData.js

import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";
import connectDB from "../../lib/db";
import CollectRequestStatus from "../../models/CollectRequestStatus";
import CollectRequest from "../../models/CollectRequest";

// Middleware for handling file uploads
const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    await connectDB();
  
    const uploadFiles = upload.fields([
      { name: "file", maxCount: 1 },
      { name: "file2", maxCount: 1 },
    ]);
  
    uploadFiles(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }
  
      const { file, file2 } = req.files;
      if (!file || !file2) {
        return res.status(400).json({ error: "Both files are required" });
      }
  
      try {
        // Parse and insert data for collect_request
        const collectRequests = [];
        const collectRequestStream = fs
          .createReadStream(file[0].path)
          .pipe(csvParser());
        for await (const row of collectRequestStream) {
          collectRequests.push(row);
        }
        await CollectRequest.insertMany(collectRequests);
  
        // Parse and insert data for collect_request_status
        const collectRequestStatuses = [];
        const collectRequestStatusStream = fs
          .createReadStream(file2[0].path)
          .pipe(csvParser());
        for await (const row of collectRequestStatusStream) {
          collectRequestStatuses.push(row);
        }
        await CollectRequestStatus.insertMany(collectRequestStatuses);
  
        // Clean up uploaded files
        fs.unlinkSync(file[0].path);
        fs.unlinkSync(file2[0].path);
  
        res.status(200).json({ message: "Data imported successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to import data" });
      }
    });
  };  

export default handler;
