# getsessionflow.app

Site do Session Flow, publicado pelo GitHub Pages (o domínio está no
arquivo `CNAME`; o DNS fica no Namecheap).

| Endereço | O que é |
|---|---|
| `/`, `/en/`, `/es/` | Página inicial em português, inglês e espanhol. |
| `/baixar/` | Leva à loja do aparelho (iPhone → App Store, Android → Google Play); no computador, mostra as duas. É o destino do QR da página inicial e o link para compartilhar. |
| `/privacidade/`, `/termos/` | Política de Privacidade e Termos de Uso da Nuvem, em português — a versão oficial. |
| `/en/privacy/`, `/en/terms/` | Tradução para o inglês. |
| `/es/privacidad/`, `/es/terminos/` | Tradução para o espanhol. |
| `404.html`, `sitemap.xml`, `robots.txt` | Página de endereço inexistente e arquivos para os buscadores. |

O app web não fica aqui: está em `app.getsessionflow.app`, no Firebase
Hosting do projeto `session-flow-app`.

**O botão "Avaliar" do app** (até a versão 1.5.55) abre `getsessionflow.app`.
No Android, o Chrome informa o app de origem, e a página inicial segue
direto para a Play; no iPhone, a pessoa vê a página, com o botão da App
Store. Antes, `/` mandava todo celular para a loja — inclusive o robô do
Google, que se apresenta como Android, e por isso a página não aparecia na
busca.

## Não edite o HTML à mão

Tudo aqui é **gerado** a partir do repositório do app
(`dinizkaio/session-flow-privado`):

- **Página inicial, `/baixar/`, 404, estilo, script, fontes e imagens:**
  `tools/site/gerar.py` (textos em `tools/site/textos_site.py`; detalhes em
  `tools/site/README.md`):

  ```
  python3 tools/site/gerar.py /caminho/deste/repositorio
  ```
- **Páginas legais:** a partir de `docs/legal`. Para mudar um texto:
  1. Edite o `.md` em `docs/legal` (e as traduções em `docs/legal/en` e
     `docs/legal/es`) no repositório do app.
  2. Gere as páginas:

     ```
     pip install markdown
     python3 scripts/gerar_paginas_legais.py /caminho/deste/repositorio
     ```
  3. Publique aqui. Mudança relevante nos textos também pede versão nova no
     app (`kVersaoTermosNuvem` e `kVersaoPrivacidadeNuvem`), para quem usa a
     nuvem aceitar de novo.

## Privacidade do próprio site

Nada vem de fora: fontes, imagens e script são deste repositório. Sem
análise de uso, pixel ou serviço de terceiros — e, por isso, sem banner de
cookies. A língua escolhida fica guardada no navegador de quem visita.
