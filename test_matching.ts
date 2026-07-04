import { matchingV2Router } from './src/routes/matchingV2.js';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use('/matching', matchingV2Router);

async function run() {
  const payload = {
    "boy": {"name": "Arjun", "year": 1990, "month": 5, "day": 15, "hour": 10, "minute": 30, "latitude": 17.3850, "longitude": 78.4867, "timezone": 5.5, "gender": "Male", "placeOfBirth": "Hyderabad"},
    "girl": {"name": "Priya", "year": 1992, "month": 8, "day": 20, "hour": 14, "minute": 45, "latitude": 12.9716, "longitude": 77.5946, "timezone": 5.5, "gender": "Female", "placeOfBirth": "Bangalore"},
    "pdfRequested": true
  };

  try {
    const res = await request(app).post('/matching?lang=te').send(payload);
    console.log(JSON.stringify(res.body, null, 2));
  } catch (err) {
    console.error(err);
  }
}

run();
