const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

// Permite que o frontend acesse a API
app.use(cors());

// Rota para buscar as promoções no banco de dados
app.get('/api/promocoes', (req, res) => {
    db.all("SELECT * FROM Promocoes", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Backend rodando em http://localhost:${PORT}`);
});
