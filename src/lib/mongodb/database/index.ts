import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const ConnectToDatabse = async () => {
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB URI is Missing");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGODB_URI as string, {
      bufferCommands: false,
    });

    cached.conn=await cached.promise


    return cached.conn
};
