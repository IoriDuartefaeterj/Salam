document.addEventListener('DOMContentLoaded', () => {
    // Busca os dados na API que criamos no backend
    fetch('http://localhost:3000/api/promocoes')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('promo-container');
            
            if(data.length > 0) {
                const promo = data[0]; // Pega a primeira promoção (Promoção de Junho)
                
                // Constrói o HTML dinamicamente com base no banco de dados
                container.innerHTML = `
                    <div class="promo-card">
                        <img src="${promo.imagem}" alt="${promo.titulo}">
                        <div class="promo-info">
                            <h2>${promo.titulo}</h2>
                            <h3>R$ ${promo.preco.toFixed(0)}</h3>
                            <p>${promo.descricao}</p>
                        </div>
                    </div>
                    
                    <div class="carousel-controls">
                        <span>&lt;</span>
                        <span>&gt;</span>
                    </div>
                `;
            } else {
                container.innerHTML = `<p>Nenhuma promoção encontrada.</p>`;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar as promoções:', error);
            document.getElementById('promo-container').innerHTML = `<p>Erro ao carregar dados do servidor.</p>`;
        });
});
