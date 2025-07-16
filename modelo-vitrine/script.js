// Carrega dados da loja (prioriza localStorage, senão loja.json)
const nomeEl = document.getElementById('nome-loja');
const logoEl = document.getElementById('logo-loja');
const contatoEl = document.getElementById('contato-loja');
let loja = null;
if (localStorage.getItem('loja')) {
  try {
    loja = JSON.parse(localStorage.getItem('loja'));
  } catch {}
}
if (loja && (loja.nome || loja.logo || loja.contato)) {
  if (loja.nome) nomeEl.textContent = loja.nome;
  if (loja.logo) {
    logoEl.src = loja.logo;
    logoEl.style.display = 'block';
  }
  if (loja.contato) contatoEl.textContent = loja.contato;
} else {
  fetch('loja.json')
    .then(res => res.json())
    .then(loja => {
      if (loja.nome) nomeEl.textContent = loja.nome;
      if (loja.logo) {
        logoEl.src = loja.logo;
        logoEl.style.display = 'block';
      }
      if (loja.contato) contatoEl.textContent = loja.contato;
    })
    .catch(() => console.warn("Erro ao carregar loja.json"));
}

// Carrega os produtos
fetch('produtos.json')
  .then(res => res.json())
  .then(produtos => {
    const container = document.getElementById('produtos');
    produtos.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${prod.imagem}" alt="${prod.nome}">
        <h2>${prod.nome}</h2>
        <p>${prod.descricao}</p>
        <span class="preco">${prod.preco}</span>
        <a href="${prod.linkCompra}" target="_blank">Comprar</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(() => console.error("Erro ao carregar produtos.json"));