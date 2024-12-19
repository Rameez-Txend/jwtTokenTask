import mongoose from "mongoose";

const dbURL =
  "mongodb+srv://rameezumer:W9Rt77rbcUxYCNE0@cluster0.yihap.mongodb.net/jwtDatabase?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Db connection successful!");
  } catch (error) {
    console.warn("error while connecting db: ", error);
  }
};

connectDB();
