// services/gridfs.service.js
import mongoose from "mongoose";
import multer from "multer";
import { GridFSBucket, ObjectId } from "mongodb";
import { MONGODB_URL } from "#config/env.js";
import { ApiError } from "#utils/error.js";

// Connection
const conn = mongoose.createConnection(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BUCKET_NAME = "uploads";
let gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new GridFSBucket(conn.db, {
    bucketName: BUCKET_NAME,
  });
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;

// Retrieve by filename (streaming)
export const getImageByFilename = async (filename, res) => {
  try {
    const files = await conn.db
      .collection(`${BUCKET_NAME}.files`)
      .findOne({ filename });
    if (!files || !files.contentType.startsWith("image")) {
      return res.status(404).json({ error: "Image not found or invalid type" });
    }

    const readStream = gridFSBucket.openDownloadStreamByName(filename);
    readStream.on("error", () => {
      res.status(500).json({ error: "Error streaming image" });
    });

    res.set("Content-Type", files.contentType);
    return readStream.pipe(res);
  } catch (err) {
    throw new ApiError(500, err.message);
  }
};

export const streamImageFromGridFS = async (id, res) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);

    const downloadStream = gridFSBucket.openDownloadStream(objectId);

    downloadStream.on("file", (file) => {
      res.set({
        "Content-Type": file.contentType,
        "Content-Disposition": `inline; filename="${file.filename}"`,
      });
    });

    downloadStream.on("error", (err) => {
      console.error("Stream error:", err);
      return res.status(404).json({ error: "Image not found" });
    });

    downloadStream.pipe(res);
  } catch (err) {
    new ApiError(500, err.message);
  }
};

export async function uploadImageToGridFS(fileBuffer, fileName, mimeType) {
  return new Promise((resolve, reject) => {
    const uploadStream = gridFSBucket.openUploadStream(fileName, {
      contentType: mimeType,
    });

    uploadStream.end(fileBuffer);

    uploadStream.on("finish", (file) => {
      resolve({
        _id: uploadStream.id,
        fileName,
        contentType: mimeType,
      });
    });

    uploadStream.on("error", (err) => {
      reject(err);
    });
  });
}
