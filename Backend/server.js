require("dotenv").config();
require('./middlewares/authMiddleware');

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRouter");
const expenseRoutes = require("./routes/expenseRouter");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

//middlewares
app.use(cors({
    origin:process.env.CLIENT_URL || "*",
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}));

app.use(express.json());

connectDB();

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/income', require('./routes/incomeRouter'));
app.use('/api/v1/expense', require('./routes/expenseRouter'));
app.use('/api/v1/dashboard', require('./routes/dashboardRoutes'));




app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});