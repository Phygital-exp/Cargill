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

// ⭐ NUEVO: Ruta raíz - Railway usa esto para health checks
app.get("/", (req, res) => {
    res.json({ 
        status: "OK", 
        message: "Cargill Proxy Server Running",
        timestamp: new Date().toISOString()
    });
});

// ⭐ NUEVO: Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

app.get("/api/cargill/pdv", async (req, res) => {
    try {
        console.log("📡 Fetching Cargill PDV data..."); // ⭐ Agregado para debugging
        
        const response = await fetch(
            "https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/Cargil_PDVs",
            { headers: AUTH_HEADERS }
        );
        
        if (!response.ok) { // ⭐ Verificar si la respuesta fue exitosa
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("✅ Data fetched successfully"); // ⭐ Agregado para debugging
        res.json(data);
    } catch (err) {
        console.error("❌ Error en el proxy:", err);
        res.status(500).json({ 
            error: "Error al obtener datos del PDV",
            details: err.message 
        });
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

// ⭐ MODIFICADO: Escuchar en 0.0.0.0 para aceptar conexiones externas
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor proxy escuchando en puerto ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'production'}`);
});