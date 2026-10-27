
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("NOIRÉ backend is running!");
});

app.listen(PORT, () => {
    console.log(`NOIRÉ backend running at http://localhost:${PORT}`);
});

