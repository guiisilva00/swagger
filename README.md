# SWAGGER — Mini E-commerce

Loja fictícia construída com Next.js (App Router), consumindo o catálogo da [Fake Store API](https://fakestoreapi.com).

🔗 **Site:** https://guiisilva00.github.io/swagger/ _(domínio próprio `swagg.com` em configuração)_

## Stack

- **Framework:** Next.js 16 (App Router), export estático (`output: "export"`)
- **Linguagem:** JavaScript puro (sem TypeScript)
- **Estilização:** Tailwind CSS
- **Dados:** snapshot local do catálogo da Fake Store API (`src/data/products.json`)
- **Deploy:** GitHub Actions → GitHub Pages

## Funcionalidades

- Listagem de produtos com filtro por categoria/preço, busca e ordenação
- Página de detalhe do produto
- Carrinho de compras
- Lista de favoritos
- Páginas de conta (login/cadastro)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Gera o export estático em `out/`, pronto para hospedagem estática (GitHub Pages, etc).

## Deploy

O workflow em `.github/workflows/deploy.yml` builda e publica no GitHub Pages a cada push em `main`. O catálogo de produtos vem de um snapshot local (`src/data/products.json`) em vez de buscar a Fake Store API em tempo de build, já que os runners do GitHub Actions costumam ser bloqueados (403) por ela.
