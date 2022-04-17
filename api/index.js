import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./handler/db.js";
import trackingRoute from "./routes/trackingRoutes.js";
import icalRoute from "./routes/icalRoutes.js";
import userRoute from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;

//Initialiing app
const app = express();

//Allowing cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database connection
await connectDB();

app.get("/", async (req, res) => {
  res.send(`Server running on port ${PORT}`);
});

app.use("/tracking", trackingRoute);
app.use("/user", userRoute);
app.use("/ical", icalRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;
