// Carrega produtos do JSON e renderiza os cards
fetch('produtos.json')
  .then(response => response.json())
  .then(produtos => {
    const container = document.getElementById('produtos');
    container.innerHTML = '';
    produtos.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <div class="preco">${produto.preco}</div>
        <a class="comprar" href="${produto.linkCompra}" target="_blank" rel="noopener noreferrer">Comprar</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    document.getElementById('produtos').innerHTML = '<p>Erro ao carregar produtos.</p>';
    console.error('Erro ao carregar produtos:', error);
  });
