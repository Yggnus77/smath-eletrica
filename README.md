# Smath Elétrica

Plataforma de ensino de montagem e manutenção elétrica (corrente contínua e alternada), em português.

- **Painel** com barra de progresso geral e por módulo, quiz, lista de revisão e tutor de dúvidas.
- **Trilha** com 27 lições em 6 módulos: conceito, o que faz, passo a passo de instalação, exemplo, "pode / não pode" e quiz. Cada lição tem ilustração.
- **Simular**: bancada de ligações em CA (interruptor simples, tomada, three-way) que testa todas as posições e aponta curto, fase exposta e cores erradas; circuito CC série/paralelo com fusível; calculadoras de Lei de Ohm e consumo.
- **Criar projeto**: dimensionamento residencial (circuitos, fio, disjuntor, DR, queda de tensão, materiais) e solar off-grid (painel, bateria, controlador, inversor, cabo, fusível).

Sem dependências nem build: abra `index.html` no navegador. O progresso fica salvo no `localStorage`.

Conteúdo didático baseado na ABNT NBR 5410, NBR 14136 e NR-10. Não substitui projeto e execução por profissional habilitado.

## Estrutura
- `js/conteudo.js`: módulos e lições (edite aqui para adicionar conteúdo)
- `js/ilustracoes.js`: ilustrações SVG
- `js/app.js`: rotas, painel, trilha, lições, tutor
- `js/simulador.js`: bancada CA, circuito CC, calculadoras
- `js/projetos.js`: criador de projetos
- `artifact.html`: versão da página para publicação como Artifact (gerada a partir do `index.html`)
