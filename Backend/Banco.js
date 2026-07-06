const sqlite3 = require('sqlite3').verbose();

// Cria um banco de dados em memória (ideal para testes rápidos)
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Cria a tabela de promoções
    db.run(`
        CREATE TABLE Promocoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            preco REAL,
            descricao TEXT,
            imagem TEXT
        )
    `);

    // Insere os dados exatos do design do Figma
    const insert = db.prepare("INSERT INTO Promocoes (titulo, preco, descricao, imagem) VALUES (?, ?, ?, ?)");
    insert.run(
        'Promoção de Junho', 
        100.00, 
        'Depilação + Unhas (Mão e Pé)', 
        'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80' // Imagem de placeholder simulando o serviço
    );
    insert.finalize();
});

module.exports = db;
