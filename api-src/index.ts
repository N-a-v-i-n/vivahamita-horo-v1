/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import dotenv from "dotenv";
import astrologyRouter from "../src/routes/astrology";

dotenv.config();

const app = express();
app.use(express.json());

// Set up permissive CORS headers for the Vivahamitra API Platform
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-user-id");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Mount the core astrological matching router directly
app.use("/api", astrologyRouter);

// Base health endpoint for the serverless executor
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", platform: "Vercel Serverless", timestamp: new Date().toISOString() });
});

export default app;
