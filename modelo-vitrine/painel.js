// Painel administrativo simples com autenticação e CRUD de produtos
const SENHA_PADRAO = '1234'; // Troque para sua senha

function mostrarPainel() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('painel-section').style.display = 'block';
  carregarProdutosPainel();
}

document.getElementById('btn-login').onclick = function() {
  const senha = document.getElementById('senha').value;
  if (senha === SENHA_PADRAO) {
    mostrarPainel();
  } else {
    document.getElementById('login-erro').textContent = 'Senha incorreta.';
  }
};

function carregarProdutosPainel() {
  let produtos = [];
  if (localStorage.getItem('produtos')) {
    try {
      produtos = JSON.parse(localStorage.getItem('produtos'));
    } catch {}
  }
  if (produtos.length === 0) {
    fetch('produtos.json')
      .then(r => r.json())
      .then(produtos => renderizarPainel(produtos))
      .catch(() => {
        document.getElementById('painel-produtos').innerHTML = '<p>Erro ao carregar produtos.</p>';
      });
  } else {
    renderizarPainel(produtos);
  }
}

function renderizarPainel(produtos) {
  const painel = document.getElementById('painel-produtos');
  painel.innerHTML = '';
  produtos.forEach((produto, idx) => {
    const div = document.createElement('div');
    div.className = 'painel-card';
    div.innerHTML = `
      <input type="text" value="${produto.nome}" placeholder="Nome">
      <input type="text" value="${produto.descricao}" placeholder="Descrição">
      <input type="text" value="${produto.imagem}" placeholder="URL da Imagem">
      <input type="text" value="${produto.preco}" placeholder="Preço">
      <input type="text" value="${produto.linkCompra}" placeholder="Link de Compra">
      <button onclick="removerProduto(${idx})">Remover</button>
    `;
    painel.appendChild(div);
  });
}

document.getElementById('btn-adicionar').onclick = function() {
  let produtos = [];
  if (localStorage.getItem('produtos')) {
    try {
      produtos = JSON.parse(localStorage.getItem('produtos'));
    } catch {}
  }
  produtos.push({
    nome: '',
    descricao: '',
    imagem: '',
    preco: '',
    linkCompra: ''
  });
  localStorage.setItem('produtos', JSON.stringify(produtos));
  carregarProdutosPainel();
};

window.removerProduto = function(idx) {
  let produtos = [];
  if (localStorage.getItem('produtos')) {
    try {
      produtos = JSON.parse(localStorage.getItem('produtos'));
    } catch {}
  }
  produtos.splice(idx, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  carregarProdutosPainel();
};

document.getElementById('btn-salvar').onclick = function() {
  const painel = document.getElementById('painel-produtos');
  const cards = painel.querySelectorAll('.painel-card');
  const produtos = Array.from(cards).map(card => {
    const inputs = card.querySelectorAll('input');
    return {
      nome: inputs[0].value,
      descricao: inputs[1].value,
      imagem: inputs[2].value,
      preco: inputs[3].value,
      linkCompra: inputs[4].value
    };
  });
  localStorage.setItem('produtos', JSON.stringify(produtos));
  alert('Alterações salvas!');
};
