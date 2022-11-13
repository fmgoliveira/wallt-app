import mongoose from 'mongoose';

let cached = (global as typeof globalThis & { mongoose: any }).mongoose;
if (!cached) {
  cached = (global as typeof globalThis & { mongoose: any }).mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI!).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};