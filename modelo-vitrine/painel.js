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
      <div style="margin:0.5rem 0;">
        <img src="${produto.imagem || ''}" alt="Preview" style="max-width:80px;max-height:80px;display:${produto.imagem ? 'block' : 'none'};margin-bottom:0.3rem;" id="preview-img-${idx}">
        <input type="file" accept="image/*" style="display:block;margin-bottom:0.3rem;" id="file-img-${idx}">
        <input type="text" value="${produto.imagem || ''}" placeholder="URL da Imagem ou cole aqui" id="input-img-${idx}" style="width:90%;">
      </div>
      <input type="text" value="${produto.preco}" placeholder="Preço">
      <input type="text" value="${produto.linkCompra}" placeholder="Link de Compra">
      <button onclick="removerProduto(${idx})">Remover</button>
    `;
    painel.appendChild(div);

    // Upload de arquivo
    const fileInput = div.querySelector(`#file-img-${idx}`);
    const urlInput = div.querySelector(`#input-img-${idx}`);
    const imgPreview = div.querySelector(`#preview-img-${idx}`);

    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          urlInput.value = ev.target.result;
          imgPreview.src = ev.target.result;
          imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });

    // Colar imagem (clipboard)
    urlInput.addEventListener('paste', function(e) {
      const items = (e.clipboardData || window.clipboardData).items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          const reader = new FileReader();
          reader.onload = function(ev) {
            urlInput.value = ev.target.result;
            imgPreview.src = ev.target.result;
            imgPreview.style.display = 'block';
          };
          reader.readAsDataURL(file);
          e.preventDefault();
          break;
        }
      }
    });

    // Preview ao digitar URL
    urlInput.addEventListener('input', function(e) {
      if (urlInput.value.startsWith('data:image') || urlInput.value.match(/^https?:\/\//)) {
        imgPreview.src = urlInput.value;
        imgPreview.style.display = 'block';
      } else {
        imgPreview.style.display = 'none';
      }
    });
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
    imagens: [], // array de imagens
    video: '',   // url do vídeo
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
    // inputs: [nome, descricao, file, url, preco, linkCompra]
    return {
      nome: inputs[0].value,
      descricao: inputs[1].value,
      imagem: inputs[3].value, // valor do campo URL/base64
      preco: inputs[4].value,
      linkCompra: inputs[5].value
    };
  });
  localStorage.setItem('produtos', JSON.stringify(produtos));
  alert('Alterações salvas!');
};
