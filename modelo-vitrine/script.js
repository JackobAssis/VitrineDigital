// Carrega dados da loja e produtos do JSON/localStorage
function carregarLoja() {
  fetch('loja.json')
    .then(r => r.json())
    .then(loja => {
      if (loja.logo) {
        document.getElementById('logo-loja').src = loja.logo;
        document.getElementById('logo-loja').style.display = 'block';
      }
      document.getElementById('nome-loja').textContent = loja.nome || 'Minha Loja';
      document.getElementById('contato-loja').textContent = loja.contato || '';
    })
    .catch(() => {});
}

function carregarProdutos() {
  let produtos = [];
  if (localStorage.getItem('produtos')) {
    try {
      produtos = JSON.parse(localStorage.getItem('produtos'));
    } catch {}
  }
  if (produtos.length === 0) {
    fetch('produtos.json')
      .then(r => r.json())
      .then(renderizarProdutos)
      .catch(() => {
        document.getElementById('produtos').innerHTML = '<p>Erro ao carregar produtos.</p>';
      });
  } else {
    renderizarProdutos(produtos);
  }
}

function renderizarProdutos(produtos) {
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
}

carregarLoja();
carregarProdutos();
