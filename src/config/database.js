import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Just pass the URI alone
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI,
      {tls:true}
    );

    console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;