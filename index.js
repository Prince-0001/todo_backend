const express =require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require('dotenv');
const authRoute =require("./routes/auth")
const userRoute =require("./routes/users")
const taskRoute=require("./routes/task")
const verifyRoute=require('./routes/token')

dotenv.config();

main().catch(err => console.log(err));
main().then(console.log("Connected to mongodb"));

async function main() {
  await mongoose.connect(process.env.MONGO_URL)
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.sendStatus(200);
});
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use('/api/task',taskRoute);
app.use('/api',verifyRoute);

app.listen(8800,()=>{
    console.log("Backend server is running!")
})