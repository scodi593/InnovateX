const express = require('express')
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-route");
const adminEventRouter = require("./routes/admin/event-routes")
const userEventRouter = require("./routes/user/event-routes")
const userRegisteredEvents = require("./routes/user/user-event-routes")
const addressRouter = require("./routes/user/address-routes")
const paymentRouter = require("./routes/user/payment-routes")
//Ceate a database connection
mongoose
  .connect("mongodb+srv://ranawatpakshal310800:Pmmn3108@cluster0.itu5e.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));


const app = express()
const PORT = process.env.PORT || 5001

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
          ],
        credentials: true,
    })
)

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/events",adminEventRouter);
app.use("/api/user/events", userEventRouter)
app.use("/api/user/registeredevents",userRegisteredEvents)
app.use("/api/user/address",addressRouter)
app.use("/api/user/payment",paymentRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

  