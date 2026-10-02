# Código para GitHub

Cópia da versão 4, anterior às melhorias didáticas do Mirante.
Commit de origem: c927495c8a1e75ace5315b90d0ada229d0139d4e.

Inclui código-fonte, banco de questões, imagens locais, configurações e lockfile. Não inclui node_modules, histórico Git, dados de alunos, progresso do navegador ou arquivos de ambiente.

## Executar localmente

Use Node.js 22.13 ou superior e pnpm 11.25.0 (packageManager em package.json).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

O ambiente local usa a porta 5173. Para compilar: `pnpm build`. Consulte README.md para a arquitetura e critérios de avaliação.

## Colocar no GitHub

Extraia o ZIP e envie o conteúdo da pasta fronteiras-do-calculo para a raiz de um repositório. Preserve os arquivos iniciados por ponto, especialmente .openai/hosting.json, importado pela configuração de build, e .gitignore.

Este é um projeto React/TypeScript com Vinext e Cloudflare Workers. Armazenar o código no GitHub não publica automaticamente uma aplicação. Esta versão não é um site estático pronto para GitHub Pages.

A configuração de Sites mantém o identificador do projeto original; ele não é uma credencial. Nenhum token de publicação está incluído. Para hospedar em outro serviço será necessário adaptar a configuração de hospedagem.

O progresso permanece no navegador de cada jogador. O painel do professor não possui banco de dados compartilhado de alunos.
