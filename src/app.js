
import express from "express";

const app = express(); //create an express app

app.use(express.json());


//import routes
import userRoute from "./routes/user.route.js";
//import postRouter from "./routes/post.route.js";

//route declaration

app.use("/api/v1/users", userRoute);
//app.use("/api/v1/posts", postRouter)
import adminRoute from "./routes/admin.route.js";

app.use("/api/v1/admin", adminRoute);

import authRoute from "./routes/auth.route.js";

app.use("/api/v1/auth", authRoute);


// so the URL(route) Its gonna look like:http://localhost:4000/api/v1/users/register
//POST
//http://localhost:4000/api/v1/admin/create-user
//http://localhost:4000/api/v1/auth/set-password
//token=18f119b8ba2b2ce47e97f85c27a20f0ada2e9a5cef876874b9c28d11397e8f93
export default app;