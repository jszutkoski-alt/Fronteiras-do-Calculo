# Fronteiras do Cálculo

Aplicação educacional com mapa de 22 paradas, 110 questões principais e três questões adicionais de revisão. Cada parada tem personagem, explicação, exemplo em etapas, visualização interativa e duelo. Público: estudantes de Cálculo I.

## Conteúdo e componentes
- `content/stops.ts`: mapa, nomes, regiões e pré-requisitos sequenciais.
- `content/curriculum-lessons.json`: narrativas, explicações, exemplos e tipo de visualização das 21 novas paradas.
- `content/curriculum-questions.json`: banco de questões separado, gabaritos, dicas e resoluções.
- `content/lesson.ts` e `content/questions.ts`: conteúdo original do Mirante, com IDs preservados.
- `content/catalog.ts`: reúne os registros de conteúdo; a interface não contém gabaritos fixos.
- `components/game/Explorer.tsx`: visualizações matemáticas para funções, limites, derivadas e integrais. `Graph.tsx` preserva o explorador de secantes do Mirante.
- `lib/game/evaluation.ts`: avaliação numérica e de alternativas, estrelas e pontuação.
- `lib/game/state.ts`: progressão, migração, revisão espaçada, formação de desafios e domínio por habilidade.
- `lib/game/progress.ts`: repositório local substituível por API autenticada.

## Jornada e avaliação
Um jogador novo começa na Cidade das Funções. Cada conclusão abre a parada seguinte. As conquistas da versão 1 do Mirante são migradas sem conceder outras conclusões. Revisar nunca reduz a melhor conquista ou as estrelas anteriores.

Duelo com cinco questões. Cada questão permite duas tentativas: primeiro erro gera dica; segundo erro gera explicação, com resolução revelada separadamente. Aprovação com pelo menos 70% (quatro das cinco corretas). Acertos com dica contam para concluir. Estrelas: três para cinco acertos iniciais; duas para aprovação com pelo menos três acertos iniciais; uma nas demais aprovações. Os resultados são registrados somente ao terminar o desafio.

Quando há conteúdo anterior estudado com revisão indicada, um duelo pode conter quatro questões da parada atual e uma de revisão. Nos treinos, são priorizados erros e revisões vencidas. Acerto inicial agenda revisão em 3, 7 ou 14 dias conforme histórico; acerto com dica em 1 dia; erro retorna imediatamente. Questões do banco ainda não respondidas, pertencentes a um tópico já estudado, também podem ser usadas em revisão. O treino voluntário pode ocorrer antes do vencimento.

O domínio é a média dos tópicos avaliados em cada habilidade, usando as 15 respostas mais recentes por tópico. Acerto inicial vale 100, acerto com dica 65 e erro zero. A cobertura de tópicos é mostrada separadamente: pontuação alta em um tópico não afirma domínio da habilidade inteira.

## Professor
Painel com dados reais do navegador atual, tentativas, erros por questão, cobertura, histórico e prévias de todas as aulas. O modo de prévia não grava respostas nem libera paradas. Não há autenticação institucional, turma compartilhada ou banco de dados de alunos. As prévias são um recurso didático, não uma fronteira de segurança. Antes de coletar notas remotas, implementar autenticação, autorização por papel e persistência no servidor. Resultados locais não devem ser usados como notas oficiais.

## Extensão e verificação
Para uma nova parada, adicionar o nó em `stops.ts`, o registro da aula em `curriculum-lessons.json`, as questões em `curriculum-questions.json` e apontar para um explorador suportado. A navegação e o duelo já usam o catálogo, sem páginas individuais.

`node scripts/verify-curriculum.cjs` valida os 22 conjuntos de conteúdo, as 110 questões, as fórmulas KaTeX, a jornada sequencial completa, as estrelas, a migração e a revisão. A compilação segue os scripts existentes do projeto. O teste de navegador cobre também aulas, parâmetros e prévias; o registro WebMCP opcional é ignorado onde a API não existe.

## Retratos e matemática no texto
Os 21 personagens têm retratos próprios, mapeados em `content/characters.ts` e reutilizados no mapa, na aula e no duelo. Elena participa de duas paradas. As imagens são servidas localmente em WebP.

`RichText.tsx` renderiza expressões inline delimitadas por `$...$` ou `\(...\)` com KaTeX, preservando o restante como texto React. Exemplo de conteúdo: `Para $f(x)=x^2$, calcule $f'(2)$.` Em JSON, duplique a barra das instruções TeX: `"$\\frac{1}{x}$"`. Os campos de fórmula em destaque continuam recebendo TeX sem delimitadores. Não se tenta adivinhar fórmulas em tempo de execução. Perguntas, alternativas, dicas, resoluções, explicações e legendas interativas usam o mesmo renderizador.

## Cartografia
`frontier-map-aligned.webp` reúne os locais do percurso. As coordenadas de `stops.ts`, os pontos intermediários de `map-layout.ts`, a imagem e a camada SVG compartilham a proporção 3:2. A ponta de cada marcador indica o local; o número identifica sua ordem. Alterações futuras na ilustração exigem revisar esses pontos em conjunto. Os IDs, pré-requisitos e registros de progresso independem das coordenadas.
