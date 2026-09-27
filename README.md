# getsessionflow.app

Site do Session Flow, publicado pelo GitHub Pages (o domínio está no
arquivo `CNAME`; o DNS fica no Namecheap).

| Endereço | O que é |
|---|---|
| `/` | No celular, leva direto à loja: o botão "Avaliar" do app abre este endereço, e todas as versões instaladas dependem disso. No computador, mostra as lojas, o app no navegador e os links legais. |
| `/privacidade/`, `/termos/` | Política de Privacidade e Termos de Uso da Nuvem, em português — a versão oficial. |
| `/en/privacy/`, `/en/terms/` | Tradução para o inglês. |
| `/es/privacidad/`, `/es/terminos/` | Tradução para o espanhol. |
| `404.html` | Página de endereço inexistente. |

O app web não fica aqui: está em `app.getsessionflow.app`, no Firebase
Hosting do projeto `session-flow-app`.

## Textos legais

As páginas legais são **geradas** a partir de `docs/legal` do repositório do
app (`dinizkaio/session-flow-privado`). Não edite o HTML à mão. Para mudar
um texto:

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
