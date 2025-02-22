const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}..`);
    });
}).catch((err) => {
    console.log(err);
});

// Define Schema for Teachers
const teacherSchema = new mongoose.Schema({
    name: String,
    subject: String,
    email: String,
    experience: Number,
    department: String
});

// Define Schema for Courses
const courseSchema = new mongoose.Schema({
    name: String,
    duration: String
});

// Create Models (Collections in MongoDB)
const teacherModel = mongoose.model("teachers", teacherSchema);
const courseModel = mongoose.model("courses", courseSchema);

// Route to get all teachers
app.get("/getteachers", async (req, res) => {
    try {
        const teachers = await teacherModel.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teachers", error });
    }
});

// Route to get all courses
app.get("/getcourses", async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error });
    }
});
