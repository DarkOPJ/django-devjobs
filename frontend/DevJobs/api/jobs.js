// // api/jobs.js
// export default async function handler(req, res) {
//   try {
//     console.log("Fetching data from external API...");
//     const response = await fetch("https://jsondevdessert.onrender.com/jobs");
    
//     if (!response.ok) {
//       console.error("Error fetching data:", response.status, response.statusText);
//       return res.status(response.status).json({ error: "Failed to fetch jobs" });
//     }
    
//     const data = await response.json();
//     console.log("Successfully fetched data:", data);
//     return res.status(200).json(data);
//   } catch (error) {
//     console.error("Internal server error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }