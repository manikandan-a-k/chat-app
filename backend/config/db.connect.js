import mongoose from "mongoose";

const connectDb = async () => {
  try {
    
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDb Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDb Connection Failed: ${error.message}`);
    process.exit(1); 
  }
};
export default connectDb;
