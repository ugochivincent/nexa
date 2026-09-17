import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Nexa"
  });
});

app.listen(PORT, () => {
  console.log(`Nexa is running on port ${PORT}`);
});
