import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDatabase from './database.js';
import College from '../models/college.model.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedDatabase = async () => {
  try {
    // Connect to database using central database.js configuration
    await connectDatabase();
    console.log('Seeder database connection established.');

    // Clear existing college data
    await College.deleteMany({});
    console.log('Cleared existing college data from collection.');

    // Read seed data
    const dataPath = path.join(__dirname, 'data', 'UG.json');
    if (!fs.existsSync(dataPath)) {
      throw new Error(`Seed data file not found at: ${dataPath}`);
    }

    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const collegeData = JSON.parse(jsonData);

    const transformedData = collegeData.map((item) => ({
      "Sr. No.": item["Sr. No."],
      "College Code": item["College Code"],
      "Course Type": item["Course Type"],
      "Course Name": item["Course Name"],
      "District": item["District"],
      "College Name": item["College Name"],
      "Contact Number": item["Contact Number"] || null,
      "Status": item["Status"] || null,
      "Total Intake": item["Total Intake"] || null
    }));

    console.log(`Processing ${transformedData.length} records...`);

    // Insert database records
    await College.insertMany(transformedData);
    console.log(`Successfully seeded ${transformedData.length} colleges into the database.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
