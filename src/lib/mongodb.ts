import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache;
}

const cached: MongooseCache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // MongoDB is completely optional in this deployment
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.warn("MongoDB connection failed (optional DB):", e);
    return null;
  }

  return cached.conn;
}

export default connectDB;
