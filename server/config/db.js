import mongoose from "mongoose";
import Color from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_url);

    console.log(
      `connect to mongodb database ${conn.connection.host}`.bgMagenta
    );
  } catch (error) {
    console.log(`error in mangodb ${error} `.bgRed.white);
  }
};
export default connectDB;
