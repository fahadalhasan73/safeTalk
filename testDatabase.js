
require("dotenv").config();

const mongoose = require("mongoose");

// Temporary test schema
const testUserSchema = new mongoose.Schema({
  name: String,
  role: String,
  isTestAccount: Boolean
});

// Specify the collection name explicitly
const TestUser = mongoose.model(
  "TestUser",
  testUserSchema,
  "users"
);

async function testDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB Atlas!");

    const user = await TestUser.create({
      name: "SafeTalk Test Student",
      role: "student",
      isTestAccount: true
    });

    console.log("Test user successfully inserted!");
    console.log("Document ID:", user._id.toString());

  } catch (error) {
    console.error("Database test failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testDatabase();
