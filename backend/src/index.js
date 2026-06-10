import dotenv from "dotenv"
import connectDB from "./db/index.js";
import dns from "dns";

dotenv.config({
   path: "./.env",
});

dns.setServers([
  "1.1.1.1", 
  "8.8.8.8" 
]);

import app from "./app.js"

connectDB()
   .then(() => {
      app.listen(process.env.PORT || 5000, () => {
         console.log(`Server running on port ${process.env.PORT}`);         
      });
   })
   .catch((err) => {
      console.log("MongoDB Connection Failed:", err);
   });