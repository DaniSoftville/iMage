import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./mongodb/connect.js";
import iMageRoutes from "./routes/iMageRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/image", iMageRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from iMage!",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("iMage Server started on port 8080"));
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
