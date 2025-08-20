const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3000;

const AUTH_HEADERS = {
    Authorization: "Token 4e15396f99ae10dd5c195d81fb6a3722c0a44a10",
    "Content-Type": "application/json",
};

app.use(cors());

app.get("/api/cargill/pdv", async (req, res) => {
    try {
        const response = await fetch(
            "https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/Cargil_PDVs",
            { headers: AUTH_HEADERS }
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("❌ Error en el proxy:", err);
        res.status(500).json({ error: "Error al obtener datos del PDV" });
    }
});

// app.get("/api/kimby/producto", async (req, res) => {
//     try {
//         const response = await fetch(
//             "https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/KimbyPortafolioProductos",
//             { headers: AUTH_HEADERS }
//         );
//         const data = await response.json();
//         res.json(data);
//     } catch (err) {
//         console.error("❌ Error en el proxy:", err);
//         res.status(500).json({ error: "Error al obtener datos del portafolio" });
//     }
// });

app.listen(PORT, () => {
    console.log(`Servidor proxy escuchando en http://localhost:${PORT}`);
});
