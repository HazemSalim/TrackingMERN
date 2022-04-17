import mongoose from "mongoose";

const connectDB = async () => {
  const dbURI = process.env.MONGO_URL;
  await mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));
};

export default connectDB;

//Docker Mongo DB Configurations

// mongoose.connect(
//   "mongodb://host.docker.internal:27017/tracking",
//   {
//     auth: {
//       username: process.env.MONGO_INITDB_ROOT_USERNAME,
//       password: process.env.MONGO_INITDB_ROOT_PASSWORD,
//     },
//     authSource: "admin",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.error("failed to connect to mongoDB");
//       console.error(err);
//     } else {
//       console.log("mongodb is running and secured");
//       app.listen(PORT);
//     }
//   }
// );
