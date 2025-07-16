# Vitrine Digital Reutilizável

Plataforma moderna e responsiva para comerciantes exibirem seus produtos em uma vitrine online, com painel administrativo para fácil personalização, sem necessidade de programação.

## ✨ Funcionalidades
- Exibição de produtos em cards modernos, responsivos e com tema escuro
- Painel administrativo protegido por senha para adicionar, editar e remover produtos
- Personalização do nome, logo e contato da loja
- Redirecionamento para links externos de compra (Shopee, WhatsApp, Instagram, etc)
- Dados salvos no LocalStorage (modo offline) ou Firebase (opcional, modo online)
- Layout adaptável para celulares e desktops
- Sistema modular: pode ser duplicado para diferentes comerciantes/negócios

## 📁 Estrutura do Projeto
```
/modelo-vitrine
├── index.html           # Página pública da vitrine
├── painel.html          # Painel administrativo
├── style.css            # Estilos modernos e responsivos
├── script.js            # Lógica da vitrine
├── painel.js            # Lógica do painel admin
├── produtos.json        # Dados dos produtos (exemplo/base)
├── loja.json            # Dados da loja (nome, logo, contato)
└── /imagens             # Imagens dos produtos e logo
```

## 🚀 Como Usar
1. **Clone ou copie a pasta `modelo-vitrine` para seu projeto ou hospedagem.**
2. Coloque as imagens dos produtos e logo em `/imagens`.
3. Edite `loja.json` para personalizar nome, logo e contato da loja.
4. Acesse `painel.html` para adicionar, editar ou remover produtos facilmente (senha padrão: `1234`).
5. A vitrine será atualizada automaticamente em `index.html`.
6. Para resetar os produtos, limpe o LocalStorage do navegador.

## 🔐 Segurança
- O painel administrativo é protegido por senha simples (pode ser alterada em `painel.js`).
- Não armazena dados sensíveis, apenas informações públicas dos produtos e loja.

## 🛠️ Tecnologias Utilizadas
- HTML5, CSS3 (tema escuro, responsivo, Google Fonts)
- JavaScript (Vanilla.js, LocalStorage)
- Firebase (opcional, para modo online)

## 💡 Personalização e Escalabilidade
- Duplicando a pasta, você pode criar vitrines para diferentes comerciantes, cada um com sua própria configuração e produtos.
- O painel permite total autonomia para o comerciante, sem necessidade de editar código.

## 📱 Responsividade
- Layout em grid fluido, adaptando-se a celulares, tablets e desktops.
- Imagens centralizadas e destaque para produtos.

## 🧩 Extensões Futuras
- Filtros por categoria
- Modal de detalhes do produto
- Exportação de dados (.csv)
- Compatibilidade PWA (uso offline avançado)
- Integração com outros sistemas de pagamento

## 🏷️ Licença
MIT. Livre para uso, modificação e distribuição.

---
Desenvolvido por Jackob. Dúvidas ou sugestões? Entre em contato!
