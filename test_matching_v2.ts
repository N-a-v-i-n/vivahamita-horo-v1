import fetch from 'node-fetch';
import fs from 'fs';

const payload = {
  "boy": {
    "name": "Arjun",
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "minute": 30,
    "latitude": 17.3850,
    "longitude": 78.4867,
    "timezone": 5.5,
    "placeOfBirth": "Hyderabad"
  },
  "girl": {
    "name": "Priya",
    "year": 1993,
    "month": 8,
    "day": 21,
    "hour": 9,
    "minute": 15,
    "latitude": 13.0827,
    "longitude": 80.2707,
    "timezone": 5.5,
    "placeOfBirth": "Chennai"
  }
};

async function test() {
  const url = "http://localhost:3000/matching-v2?lang=en";
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    console.log("Success:", data.success);
    if (!data.success) {
      console.log("Error:", data.error);
    }
    console.log("PDF URL:", data.pdf?.url);
  } catch(e) {
    console.log(e);
  }
}

test();
