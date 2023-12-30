const mongoose =require("mongoose");
const dotenv =require("dotenv");
dotenv.config();
const URL=process.env.MONGODB_URI;
mongoose
  .connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));