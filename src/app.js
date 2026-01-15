
import express from "express";

const app = express(); //create an express app

app.use(express.json());


//import routes
import userRoute from "./routes/user.route.js";
//import postRouter from "./routes/post.route.js";

//route declaration

app.use("/api/v1/users", userRoute);
//app.use("/api/v1/posts", postRouter)



// so the URL(route) Its gonna look like:http://localhost:4000/api/v1/users/register
export default app;