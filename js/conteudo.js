/* Smath Elétrica — conteúdo da trilha de estudo.
   Referências: ABNT NBR 5410 (instalações de baixa tensão), NBR 14136 (plugues e tomadas),
   NR-10 (segurança em eletricidade). Valores são didáticos: sempre confira a norma vigente
   e o manual do fabricante antes de executar um serviço. */

window.MODULOS = [
  { id: 'fundamentos', nome: 'Fundamentos e segurança', cor: 'var(--m1)', desc: 'Tensão, corrente, resistência, potência e as regras que mantêm você vivo.' },
  { id: 'cc', nome: 'Corrente contínua (CC)', cor: 'var(--m2)', desc: 'Pilhas, baterias, circuitos série e paralelo e energia solar off-grid.' },
  { id: 'ca', nome: 'Corrente alternada (CA)', cor: 'var(--m3)', desc: 'A rede da concessionária, 127/220 V, padrão de entrada e quadro.' },
  { id: 'componentes', nome: 'Componentes e proteção', cor: 'var(--m4)', desc: 'Cabos, disjuntores, DR, DPS, tomadas, interruptores e aterramento.' },
  { id: 'instalacao', nome: 'Instalação passo a passo', cor: 'var(--m5)', desc: 'Do zero ao funcionamento: tomada, lâmpada, three-way, chuveiro e quadro.' },
  { id: 'manutencao', nome: 'Manutenção e diagnóstico', cor: 'var(--m6)', desc: 'Multímetro, falhas comuns e manutenção preventiva.' }
];

window.LICOES = [
/* ============================ FUNDAMENTOS ============================ */
{
  id: 'o-que-e-eletricidade', mod: 'fundamentos', titulo: 'O que é eletricidade', tempo: 8, ilustracao: 'circuitoBasico',
  resumo: 'Elétrons em movimento, empurrados por uma diferença de potencial, através de um caminho fechado.',
  conceito: `<p>Eletricidade é o movimento ordenado de cargas elétricas (elétrons) através de um material condutor, como o cobre. Para os elétrons andarem, três coisas precisam existir ao mesmo tempo:</p>
  <ul><li><b>Uma fonte</b> que cria a diferença de potencial (pilha, bateria, rede elétrica).</li><li><b>Um caminho fechado</b> (o circuito) feito de condutores.</li><li><b>Uma carga</b> que usa a energia (lâmpada, motor, resistência).</li></ul>
  <p>Se o caminho for interrompido em qualquer ponto (um fio solto, um interruptor aberto), a corrente para.</p>`,
  funcao: `<p>A eletricidade transporta energia de onde ela é gerada (usina, painel solar, bateria) até onde ela é usada, e lá é convertida em luz, calor, movimento ou sinal.</p>
  <p><b>Analogia da água:</b> a tensão é a pressão da caixa d'água, a corrente é a quantidade de água que passa no cano por segundo, e a resistência é o quanto o cano é estreito.</p>`,
  passosTitulo: 'Monte seu primeiro circuito (experiência segura com pilha)',
  ferramentas: ['1 pilha AA (1,5 V) ou bateria 9 V', '1 LED com resistor de 330 Ω, ou lâmpada de lanterna', '2 pedaços de fio com garra jacaré'],
  passos: [
    { t: 'Identifique os polos', d: 'Na pilha, o polo positivo (+) é o lado com o "botão". No LED, a perna mais longa é o positivo (ânodo).' },
    { t: 'Ligue o positivo', d: 'Prenda um fio do + da pilha até o resistor e do resistor até a perna longa do LED.' },
    { t: 'Feche o circuito', d: 'Prenda o segundo fio da perna curta do LED até o − da pilha. O LED acende.' },
    { t: 'Abra o circuito', d: 'Solte qualquer garra. O LED apaga: sem caminho fechado, não há corrente.', alerta: 'Nunca ligue um fio direto do + ao − da bateria. Isso é um curto-circuito e esquenta o fio e a bateria rapidamente.' }
  ],
  exemplo: `<p>Uma lanterna é exatamente esse circuito: pilhas (fonte), mola e lâminas metálicas (condutores), botão (interruptor) e LED (carga).</p>`,
  pode: ['Fazer experiências com pilhas de até 12 V para aprender', 'Usar resistor em série com LED'],
  naoPode: ['Fazer experiências na tomada de casa', 'Colocar a pilha em curto (fio do + direto ao −)', 'Usar pilhas vazando ou estufadas'],
  quiz: { p: 'O que é necessário para existir corrente elétrica?', op: ['Só uma fonte de energia', 'Fonte, caminho fechado e carga', 'Apenas fios de cobre', 'Um disjuntor ligado'], c: 1, exp: 'Sem caminho fechado não há corrente, mesmo com fonte e fios.' }
},
{
  id: 'grandezas', mod: 'fundamentos', titulo: 'Tensão, corrente, resistência e potência', tempo: 12, ilustracao: 'ohm',
  resumo: 'As quatro grandezas que você vai usar em todo cálculo: V, A, Ω e W.',
  conceito: `<table class="tb"><thead><tr><th>Grandeza</th><th>Símbolo</th><th>Unidade</th><th>O que é</th></tr></thead><tbody>
  <tr><td>Tensão</td><td>V (ou U)</td><td>volt (V)</td><td>A "pressão" que empurra os elétrons</td></tr>
  <tr><td>Corrente</td><td>I</td><td>ampere (A)</td><td>Quantidade de carga que passa por segundo</td></tr>
  <tr><td>Resistência</td><td>R</td><td>ohm (Ω)</td><td>Oposição à passagem da corrente</td></tr>
  <tr><td>Potência</td><td>P</td><td>watt (W)</td><td>Energia usada por segundo</td></tr></tbody></table>
  <p><b>Lei de Ohm:</b> V = R × I. <b>Potência:</b> P = V × I. Daí saem também I = V ÷ R, R = V ÷ I, I = P ÷ V e P = R × I².</p>`,
  funcao: `<p>Essas fórmulas permitem descobrir quanta corrente um aparelho puxa, e é a corrente que define a bitola do fio e o tamanho do disjuntor.</p>
  <p><b>Energia consumida</b> (o que a conta de luz cobra) = potência × tempo, medida em kWh. Um chuveiro de 5.500 W ligado 30 minutos por dia gasta 5,5 kW × 0,5 h × 30 dias = 82,5 kWh por mês.</p>`,
  passosTitulo: 'Como calcular a corrente de um aparelho',
  ferramentas: ['A etiqueta do aparelho (potência em W e tensão em V)', 'Calculadora'],
  passos: [
    { t: 'Leia a etiqueta', d: 'Procure a potência (W) e a tensão (V). Ex.: micro-ondas 1.400 W, 127 V.' },
    { t: 'Divida potência por tensão', d: 'I = P ÷ V = 1.400 ÷ 127 ≈ 11 A.' },
    { t: 'Compare com o circuito', d: 'Um circuito de tomadas com fio de 2,5 mm² e disjuntor de 20 A suporta 11 A, mas somando outros aparelhos na mesma linha pode passar do limite.' },
    { t: 'Motores têm fator de potência', d: 'Para motores e compressores use I = P ÷ (V × FP). Se não souber, considere FP = 0,8.', alerta: 'Motores puxam de 3 a 7 vezes a corrente nominal na partida. Por isso geladeiras e ar-condicionado pedem disjuntor adequado à partida.' }
  ],
  exemplo: `<p>Chuveiro de 5.500 W: em 127 V puxa 43 A; em 220 V puxa 25 A. Por isso chuveiros potentes são instalados em 220 V: a mesma potência com metade da corrente e fios mais finos.</p>`,
  pode: ['Usar a etiqueta do aparelho para calcular a corrente', 'Somar as correntes de tudo que fica ligado ao mesmo tempo no circuito'],
  naoPode: ['Dimensionar fio pela "experiência" sem calcular', 'Ignorar a corrente de partida de motores'],
  quiz: { p: 'Uma airfryer de 1.500 W em 127 V puxa aproximadamente:', op: ['5 A', '8 A', '12 A', '19 A'], c: 2, exp: 'I = P ÷ V = 1.500 ÷ 127 ≈ 11,8 A.' }
},
{
  id: 'cc-x-ca', mod: 'fundamentos', titulo: 'Corrente contínua x corrente alternada', tempo: 8, ilustracao: 'ccca',
  resumo: 'CC flui em um só sentido; CA inverte o sentido 60 vezes por segundo no Brasil.',
  conceito: `<p><b>Corrente contínua (CC ou DC):</b> os elétrons andam sempre no mesmo sentido e a tensão é constante. Fontes: pilhas, baterias, painéis solares, carregadores de celular (na saída).</p>
  <p><b>Corrente alternada (CA ou AC):</b> a tensão sobe e desce em forma de onda senoidal e o sentido da corrente inverte. No Brasil a frequência é <b>60 Hz</b>. É o que chega na sua tomada.</p>`,
  funcao: `<p>A CA é usada na distribuição porque transformadores conseguem subir e baixar a tensão com facilidade, reduzindo as perdas no transporte por longas distâncias. A CC é usada em eletrônica, baterias, veículos e sistemas solares.</p>
  <p>Fontes de celular e notebook convertem CA em CC (retificação). Inversores fazem o contrário: CC da bateria em CA para ligar aparelhos comuns.</p>`,
  passosTitulo: 'Como identificar o tipo de corrente',
  ferramentas: ['Etiqueta do aparelho ou da fonte'],
  passos: [
    { t: 'Procure o símbolo', d: 'CC aparece como "DC" ou uma linha reta com tracejado embaixo (⎓). CA aparece como "AC" ou um til (~).' },
    { t: 'Veja entrada e saída', d: 'Um carregador mostra "Input: 100-240 V ~ 50/60 Hz" (CA) e "Output: 5 V ⎓ 2 A" (CC).' },
    { t: 'Confira a polaridade em CC', d: 'Em CC, inverter + e − pode queimar o equipamento. Vermelho costuma ser + e preto −.', alerta: 'Disjuntores e interruptores para CA podem não interromper CC com segurança: o arco em CC não se apaga sozinho. Use dispositivos com especificação "DC".' }
  ],
  exemplo: `<p>No carro tudo é CC 12 V. Na casa tudo é CA 127 V ou 220 V. Um inversor de 12 V para 127 V permite ligar um notebook no carro.</p>`,
  pode: ['Usar inversores e fontes certificados para converter entre CC e CA'],
  naoPode: ['Usar disjuntor comum de CA em painel solar (lado CC)', 'Inverter polaridade em circuitos CC'],
  quiz: { p: 'Qual a frequência da rede elétrica no Brasil?', op: ['50 Hz', '60 Hz', '127 Hz', '220 Hz'], c: 1, exp: 'O Brasil usa 60 Hz em todo o território.' }
},
{
  id: 'seguranca-nr10', mod: 'fundamentos', titulo: 'Segurança: NR-10 e EPIs', tempo: 12, ilustracao: 'epi',
  resumo: 'Antes de qualquer serviço: desligar, bloquear, testar e só então tocar.',
  conceito: `<p>A <b>NR-10</b> é a norma regulamentadora do Ministério do Trabalho para serviços em eletricidade. Ela exige treinamento, autorização e procedimentos para quem trabalha com instalações elétricas.</p>
  <p><b>EPI</b> (equipamento de proteção individual) é o que você veste: luvas isolantes, óculos, capacete com jugular, botina sem partes metálicas e roupa sem fibras sintéticas (que derretem com arco elétrico).</p>`,
  funcao: `<p>A segurança existe porque um erro com eletricidade não dá segunda chance. Correntes acima de 30 mA passando pelo corpo podem causar parada cardíaca. O procedimento padrão de <b>desenergização</b> garante que ninguém religue o circuito enquanto você trabalha.</p>`,
  passosTitulo: 'Procedimento de desenergização (antes de todo serviço)',
  ferramentas: ['Detector de tensão ou multímetro CAT III', 'Cadeado e etiqueta de bloqueio', 'Luvas isolantes', 'Óculos de proteção', 'Ferramentas com cabo isolado 1.000 V'],
  passos: [
    { t: 'Desligue o disjuntor do circuito', d: 'Identifique no quadro qual disjuntor alimenta o ponto. Na dúvida, desligue o disjuntor geral.' },
    { t: 'Bloqueie e sinalize', d: 'Coloque cadeado ou fita no disjuntor e uma etiqueta "NÃO LIGAR: manutenção em andamento".', alerta: 'Avise todos da casa. Muitos acidentes acontecem porque alguém religou o disjuntor sem saber.' },
    { t: 'Teste o detector', d: 'Antes, teste o detector de tensão em uma tomada que você sabe que está energizada.' },
    { t: 'Confirme ausência de tensão', d: 'Meça no ponto de trabalho, entre todos os condutores (fase-neutro, fase-terra, fase-fase).' },
    { t: 'Teste o detector de novo', d: 'Volte a testar em ponto energizado para ter certeza de que ele não falhou no meio do caminho.' },
    { t: 'Trabalhe e religue com cuidado', d: 'Terminou? Recolha ferramentas, feche as caixas, retire o bloqueio e só então religue.' }
  ],
  exemplo: `<p>Trocar uma tomada: desligue o disjuntor das tomadas do cômodo, coloque fita com aviso, teste com o detector na tomada que vai trocar, e só então solte os parafusos.</p>`,
  pode: ['Usar ferramentas isoladas com selo de 1.000 V', 'Trabalhar com uma mão só quando possível, evitando que a corrente atravesse o peito', 'Pedir ajuda a um eletricista habilitado'],
  naoPode: ['Trabalhar com os pés molhados ou descalço', 'Usar anel, relógio, pulseira ou corrente metálica', 'Confiar que "o disjuntor certo" foi desligado sem medir', 'Usar chave de teste (caneta neon) como única confirmação'],
  quiz: { p: 'Qual é a ordem correta antes de mexer em um circuito?', op: ['Medir, desligar, trabalhar', 'Desligar, bloquear, testar ausência de tensão, trabalhar', 'Desligar e trabalhar', 'Usar luva e trabalhar energizado'], c: 1, exp: 'Desligar, bloquear e sinalizar, e só então confirmar com instrumento que não há tensão.' }
},
{
  id: 'choque-eletrico', mod: 'fundamentos', titulo: 'Choque elétrico e primeiros socorros', tempo: 8, ilustracao: 'choque',
  resumo: 'O que a corrente faz no corpo e como socorrer sem virar a segunda vítima.',
  conceito: `<p>O choque acontece quando o corpo fecha um circuito entre um ponto energizado e outro de potencial diferente (outro fio, o chão, uma parede úmida). O perigo depende da <b>corrente</b> e do <b>caminho</b> que ela faz no corpo.</p>
  <table class="tb"><thead><tr><th>Corrente (CA 60 Hz)</th><th>Efeito típico</th></tr></thead><tbody>
  <tr><td>1 mA</td><td>Formigamento perceptível</td></tr><tr><td>10 a 25 mA</td><td>Contração muscular, a pessoa pode não conseguir soltar</td></tr>
  <tr><td>30 mA ou mais</td><td>Risco de parada respiratória e fibrilação ventricular</td></tr><tr><td>Acima de 1 A</td><td>Queimaduras graves internas</td></tr></tbody></table>`,
  funcao: `<p>Entender isso explica por que o <b>DR de 30 mA</b> é obrigatório em áreas molhadas: ele desliga o circuito antes da corrente de fuga chegar ao nível que causa fibrilação.</p>`,
  passosTitulo: 'O que fazer se alguém levar um choque',
  ferramentas: ['Telefone: SAMU 192, Bombeiros 193'],
  passos: [
    { t: 'Não toque na vítima', d: 'Se a pessoa ainda estiver em contato com a energia, ela conduz corrente. Você vira a segunda vítima.', alerta: 'Nunca puxe a vítima com as mãos enquanto o circuito estiver energizado.' },
    { t: 'Desligue a energia', d: 'Desligue o disjuntor geral ou retire o plugue da tomada.' },
    { t: 'Se não der para desligar', d: 'Afaste a vítima com um objeto seco e isolante: cabo de vassoura de madeira, cadeira de plástico. Fique sobre superfície seca.' },
    { t: 'Chame socorro', d: 'Ligue 192 (SAMU) ou 193 (Bombeiros) e informe que foi choque elétrico.' },
    { t: 'Avalie respiração', d: 'Se a pessoa não respira, inicie massagem cardíaca (100 a 120 compressões por minuto) se souber fazer, até o socorro chegar.' },
    { t: 'Leve ao hospital mesmo se parecer bem', d: 'A corrente pode causar arritmia horas depois e queimaduras internas que não aparecem na pele.' }
  ],
  exemplo: `<p>Caminho mão-mão ou mão-pé passa pelo coração e é o mais perigoso. Por isso a regra de trabalhar com uma mão só e com calçado isolante.</p>`,
  pode: ['Desligar a energia antes de socorrer', 'Usar objeto seco e isolante para afastar a vítima'],
  naoPode: ['Tocar na vítima energizada', 'Jogar água', 'Deixar de levar ao hospital "porque passou"'],
  quiz: { p: 'A partir de qual corrente aproximada o choque pode causar fibrilação?', op: ['1 mA', '5 mA', '30 mA', '10 A'], c: 2, exp: 'Por isso o DR usado para proteção de pessoas é de 30 mA.' }
},

/* ============================ CORRENTE CONTÍNUA ============================ */
{
  id: 'pilhas-baterias', mod: 'cc', titulo: 'Pilhas e baterias', tempo: 10, ilustracao: 'bateriaFusivel',
  resumo: 'Tipos, capacidade em Ah, ligação em série e paralelo e o fusível obrigatório.',
  conceito: `<p>Pilhas e baterias armazenam energia química e a entregam como corrente contínua. As principais características são a <b>tensão</b> (V) e a <b>capacidade</b> (Ah, ampere-hora).</p>
  <ul><li><b>Chumbo-ácido / estacionária:</b> 12 V, barata, pesada, não deve descarregar abaixo de 50%.</li><li><b>Lítio (LiFePO4):</b> 12,8 V, leve, aceita descarga de 80 a 90%, exige BMS (placa de proteção).</li><li><b>Íons de lítio:</b> celulares e notebooks, muito sensível a calor e perfuração.</li></ul>`,
  funcao: `<p>Energia armazenada = tensão × capacidade. Uma bateria de 12 V e 100 Ah guarda 1.200 Wh. Se você só pode usar 50% (chumbo-ácido), sobram 600 Wh: uma lâmpada LED de 10 W por 60 horas.</p>
  <p><b>Série</b> soma as tensões (duas de 12 V = 24 V, mesma Ah). <b>Paralelo</b> soma as capacidades (duas de 100 Ah = 200 Ah, mesmos 12 V).</p>`,
  passosTitulo: 'Instalar uma bateria 12 V com proteção',
  ferramentas: ['Bateria 12 V', 'Cabo flexível vermelho e preto na bitola indicada', 'Porta-fusível e fusível CC', 'Terminais olhal e alicate de crimpar', 'Chave de boca', 'Óculos e luvas'],
  passos: [
    { t: 'Calcule a corrente máxima', d: 'Some as potências das cargas e divida por 12 V. Ex.: 240 W ÷ 12 V = 20 A. Escolha cabo e fusível para essa corrente com folga de 25%: fusível de 25 A.' },
    { t: 'Prepare os cabos', d: 'Corte os cabos no menor comprimento possível. Crimpe terminais olhal nas pontas.' },
    { t: 'Instale o fusível perto do positivo', d: 'O porta-fusível vai no cabo vermelho, a no máximo cerca de 20 cm do borne positivo.', alerta: 'Sem fusível, um curto no cabo pode derreter o isolamento e causar incêndio. A bateria entrega centenas de amperes em curto.' },
    { t: 'Ligue primeiro o negativo na carga', d: 'Conecte os cabos no equipamento. Na bateria, ligue o positivo (com fusível retirado) e por último o negativo.' },
    { t: 'Coloque o fusível', d: 'Com tudo apertado e conferido, insira o fusível. Meça a tensão na carga: deve estar perto de 12 V.' },
    { t: 'Proteja os bornes', d: 'Cubra os bornes com capa isolante para que nenhuma ferramenta encoste neles.' }
  ],
  exemplo: `<p>Duas baterias de 12 V 60 Ah em paralelo = 12 V 120 Ah. Use cabos de mesmo comprimento para as duas, senão uma descarrega mais que a outra.</p>`,
  pode: ['Usar fusível próximo ao positivo', 'Ventilar o local de baterias de chumbo-ácido (liberam hidrogênio)'],
  naoPode: ['Misturar baterias velhas com novas ou de tipos diferentes', 'Apoiar ferramenta metálica sobre a bateria', 'Fumar ou fazer faísca perto de bateria em carga'],
  quiz: { p: 'Duas baterias de 12 V 100 Ah ligadas em série resultam em:', op: ['12 V 200 Ah', '24 V 100 Ah', '24 V 200 Ah', '12 V 100 Ah'], c: 1, exp: 'Em série a tensão soma e a capacidade continua a mesma.' }
},
{
  id: 'serie-paralelo', mod: 'cc', titulo: 'Circuitos série e paralelo', tempo: 10, ilustracao: 'serieParalelo',
  resumo: 'Por que as lâmpadas da sua casa são ligadas em paralelo e o pisca-pisca antigo em série.',
  conceito: `<p><b>Série:</b> as cargas ficam uma depois da outra, no mesmo caminho. A corrente é a mesma em todas e a tensão se divide. Se uma queima, todas apagam.</p>
  <p><b>Paralelo:</b> cada carga fica ligada diretamente à fonte. A tensão é a mesma em todas e as correntes se somam. Se uma queima, as outras continuam.</p>
  <p>Resistência equivalente: série R = R1 + R2 + …; paralelo 1/R = 1/R1 + 1/R2 + …</p>`,
  funcao: `<p>Toda instalação residencial é em <b>paralelo</b>: cada tomada e cada lâmpada recebe os 127 V ou 220 V completos. O interruptor, por outro lado, fica em <b>série</b> com a lâmpada que ele comanda.</p>`,
  passosTitulo: 'Experimente no simulador',
  ferramentas: ['Simulador CC do Smath'],
  passos: [
    { t: 'Abra o simulador', d: 'Vá em "Simular" e escolha a aba "Circuito CC".' },
    { t: 'Monte em série', d: 'Use 12 V e duas lâmpadas de 6 Ω em série. Observe: corrente 1 A, cada lâmpada com 6 V.' },
    { t: 'Mude para paralelo', d: 'Agora cada lâmpada recebe 12 V e puxa 2 A. Total 4 A. Elas brilham mais.' },
    { t: 'Queime uma lâmpada', d: 'Em série tudo apaga. Em paralelo só a queimada apaga.', alerta: 'Em paralelo, cada carga nova soma corrente. É assim que extensões e "benjamins" sobrecarregam e esquentam.' }
  ],
  exemplo: `<p>Um "T" (benjamim) com chuveiro portátil, ferro e aquecedor: 3 cargas em paralelo somando mais de 30 A numa tomada de 10 A. O plugue esquenta e derrete.</p>`,
  pode: ['Somar a corrente de todas as cargas em paralelo', 'Usar série para dividir tensão em eletrônica'],
  naoPode: ['Ligar lâmpadas de casa em série', 'Usar benjamins para ligar vários aparelhos de alta potência'],
  quiz: { p: 'Em um circuito em paralelo, o que é igual em todas as cargas?', op: ['A corrente', 'A tensão', 'A potência', 'A resistência'], c: 1, exp: 'No paralelo todas as cargas recebem a mesma tensão da fonte.' }
},
{
  id: 'solar-offgrid', mod: 'cc', titulo: 'Sistema solar off-grid', tempo: 15, ilustracao: 'solar',
  resumo: 'Painel, controlador de carga, bateria e inversor: cada peça, sua função e a ordem de ligação.',
  conceito: `<p>Um sistema <b>off-grid</b> (isolado) gera e armazena a própria energia, sem ligação com a concessionária. Componentes:</p>
  <ul><li><b>Painel fotovoltaico:</b> converte luz em CC.</li><li><b>Controlador de carga</b> (PWM ou MPPT): regula a carga da bateria e evita sobrecarga e descarga profunda.</li><li><b>Bateria:</b> armazena a energia para a noite.</li><li><b>Inversor:</b> transforma 12/24 V CC em 127/220 V CA para aparelhos comuns.</li></ul>`,
  funcao: `<p>Leva energia para sítios, barcos, motorhomes, câmeras de segurança e bombas d'água longe da rede. O dimensionamento parte do consumo diário em Wh e das horas de sol pleno do local (no Brasil, em média 4 a 5,5 horas por dia).</p>`,
  passosTitulo: 'Montagem do sistema, do início ao fim',
  ferramentas: ['Painel(is), controlador, bateria, inversor', 'Cabo solar 4 ou 6 mm² e conectores MC4', 'Fusíveis ou disjuntores CC', 'Chave seccionadora CC', 'Multímetro'],
  passos: [
    { t: 'Dimensione', d: 'Some o consumo diário (W × horas). Use o "Criar projeto > Solar off-grid" do Smath para calcular painel, bateria, controlador e inversor.' },
    { t: 'Fixe o painel', d: 'Voltado para o norte, inclinação próxima à latitude do local, sem sombra das 9 h às 15 h.' },
    { t: 'Ligue o controlador na bateria primeiro', d: 'Com fusível próximo à bateria. O controlador precisa reconhecer a tensão da bateria (12 ou 24 V) antes de receber o painel.', alerta: 'Ligar o painel antes da bateria pode queimar muitos controladores. Siga o manual do fabricante.' },
    { t: 'Ligue o painel no controlador', d: 'Com a chave seccionadora CC aberta, conecte o painel. Feche a chave. O controlador deve indicar carga.' },
    { t: 'Ligue o inversor direto na bateria', d: 'O inversor puxa corrente alta: ligue-o nos bornes da bateria com cabo grosso e fusível, não na saída de carga do controlador.' },
    { t: 'Teste', d: 'Meça tensão do painel (em aberto), da bateria e a saída CA do inversor. Ligue uma carga pequena.' },
    { t: 'Para desligar, ordem inversa', d: 'Desligue cargas e inversor, abra a chave do painel e por último desconecte a bateria.' }
  ],
  exemplo: `<p>Consumo de 600 Wh/dia (luzes, TV, celular). Com 5 h de sol e 20% de perdas: 600 ÷ 5 ÷ 0,8 = 150 W de painel. Bateria 12 V chumbo-ácido para 1 dia com 50% de descarga: 600 ÷ 12 ÷ 0,5 = 100 Ah.</p>`,
  pode: ['Usar componentes CC com especificação DC', 'Colocar fusível em cada ligação com a bateria', 'Aterrar a estrutura metálica do painel'],
  naoPode: ['Desconectar o painel puxando o conector MC4 sob carga', 'Ligar o inversor na saída de carga do controlador', 'Usar bateria automotiva comum em uso solar diário (vida muito curta)'],
  quiz: { p: 'Qual componente evita que a bateria seja sobrecarregada pelo painel?', op: ['Inversor', 'Controlador de carga', 'DPS', 'Disjuntor geral'], c: 1, exp: 'O controlador regula a tensão e corrente de carga da bateria.' }
},

/* ============================ CORRENTE ALTERNADA ============================ */
{
  id: 'rede-eletrica', mod: 'ca', titulo: 'A rede elétrica e as tensões no Brasil', tempo: 10, ilustracao: 'sistemas',
  resumo: '127 V ou 220 V, monofásico, bifásico ou trifásico: como identificar o que chega na sua casa.',
  conceito: `<p>A concessionária entrega energia através de um transformador no poste. Os condutores que chegam podem ser:</p>
  <ul><li><b>Monofásico:</b> 1 fase + neutro. Tensão fase-neutro de 127 V ou 220 V, conforme a região.</li><li><b>Bifásico:</b> 2 fases + neutro. 127 V entre fase e neutro, 220 V entre duas fases.</li><li><b>Trifásico:</b> 3 fases + neutro. Usado em casas maiores, comércio e motores trifásicos.</li></ul>
  <p><b>Fase</b> é o condutor energizado. <b>Neutro</b> é o condutor de retorno, ligado à terra no transformador. <b>Terra (PE)</b> é o condutor de proteção, que não conduz corrente em funcionamento normal.</p>`,
  funcao: `<p>Saber o tipo de ligação define quais tensões você tem disponíveis e como distribuir as cargas entre as fases para que fiquem equilibradas.</p>`,
  passosTitulo: 'Como descobrir a tensão e o tipo de ligação',
  ferramentas: ['Conta de luz', 'Multímetro CAT III'],
  passos: [
    { t: 'Leia a conta de luz', d: 'Procure "tipo de fornecimento" ou "classe": monofásico, bifásico ou trifásico, e a tensão nominal.' },
    { t: 'Olhe o padrão de entrada', d: 'Conte os fios que chegam do poste e quantos polos tem o disjuntor geral: 1 polo (mono), 2 polos (bi), 3 polos (tri).' },
    { t: 'Meça com multímetro', d: 'Na escala V~, meça entre fase e neutro e entre fases. Valores aceitáveis variam cerca de ±8% (ex.: 117 a 133 V para 127 V nominal).', alerta: 'Medição em ponto energizado é para quem tem treinamento e instrumento CAT III. Use pontas de prova com proteção e não toque nas partes metálicas.' }
  ],
  exemplo: `<p>São Paulo capital: bifásico 127/220 V. Brasília e boa parte do Nordeste: 220 V fase-neutro (380 V entre fases). Sempre confirme no local.</p>`,
  pode: ['Distribuir cargas entre as fases para equilibrar', 'Confirmar a tensão com instrumento'],
  naoPode: ['Supor a tensão pela cidade sem medir', 'Usar o neutro como terra'],
  quiz: { p: 'Em uma ligação bifásica 127/220 V, qual tensão existe entre duas fases?', op: ['127 V', '220 V', '380 V', '0 V'], c: 1, exp: 'Entre fase e neutro 127 V; entre duas fases 220 V.' }
},
{
  id: 'padrao-entrada', mod: 'ca', titulo: 'Padrão de entrada e medidor', tempo: 8, ilustracao: 'rede',
  resumo: 'A fronteira entre a concessionária e a sua instalação.',
  conceito: `<p>O <b>padrão de entrada</b> é o conjunto de poste ou pontalete, caixa do medidor, disjuntor geral e aterramento, construído pelo cliente seguindo as regras da concessionária local. Do medidor para dentro, a instalação é sua responsabilidade.</p>`,
  funcao: `<p>Recebe o ramal da concessionária, mede o consumo e protege toda a instalação com o disjuntor geral. É também onde fica o primeiro ponto de aterramento (haste de cobre).</p>`,
  passosTitulo: 'O que você precisa saber antes de mexer',
  ferramentas: ['Norma técnica da sua concessionária (está no site dela)'],
  passos: [
    { t: 'Consulte a norma da concessionária', d: 'Cada distribuidora tem sua norma de fornecimento com altura do poste, caixa, bitola de cabo e disjuntor para cada faixa de carga.' },
    { t: 'Peça aumento de carga quando necessário', d: 'Vai instalar chuveiro potente, ar-condicionado ou carregador de carro elétrico? Pode ser preciso mudar de monofásico para bifásico ou trifásico.' },
    { t: 'Contrate profissional habilitado', d: 'Montagem e alteração do padrão exigem projeto e vistoria em muitos casos.', alerta: 'Antes do medidor a energia não é desligada pelo seu disjuntor geral. Só a concessionária pode trabalhar ali.' }
  ],
  exemplo: `<p>Uma casa com chuveiro de 7.500 W, dois ar-condicionados e forno elétrico normalmente não cabe em um padrão monofásico de 40 A.</p>`,
  pode: ['Desligar o disjuntor geral para trabalhar na instalação interna', 'Pedir vistoria e ligação nova à concessionária'],
  naoPode: ['Abrir a caixa lacrada do medidor', 'Fazer ligações antes do medidor ("gato")', 'Aumentar o disjuntor geral por conta própria'],
  quiz: { p: 'Quem pode intervir nos condutores antes do medidor?', op: ['Qualquer eletricista', 'O morador', 'Somente a concessionária', 'Quem tiver luva isolante'], c: 2, exp: 'O ramal antes do medidor é da concessionária e não é desligado pelo disjuntor geral.' }
},
{
  id: 'quadro-distribuicao', mod: 'ca', titulo: 'Quadro de distribuição (QDC)', tempo: 12, ilustracao: 'quadro',
  resumo: 'O coração da instalação: disjuntor geral, DR, DPS, barramentos e um disjuntor por circuito.',
  conceito: `<p>O <b>quadro de distribuição de circuitos</b> recebe a alimentação do padrão de entrada e divide a instalação em circuitos, cada um com seu disjuntor. Composição típica:</p>
  <ul><li>Disjuntor geral (ou interruptor DR geral)</li><li>DPS (proteção contra surtos)</li><li>Disjuntores dos circuitos terminais</li><li>Barramento de neutro (azul) e barramento de terra (verde)</li></ul>`,
  funcao: `<p>Separar em circuitos permite desligar só uma parte para manutenção, evita que um defeito derrube a casa toda e permite usar fios e disjuntores do tamanho certo para cada carga.</p>
  <p>A NBR 5410 pede circuitos separados para iluminação e tomadas, e circuito exclusivo para cada equipamento com corrente acima de 10 A (chuveiro, ar-condicionado, forno).</p>`,
  passosTitulo: 'Como ler e identificar o seu quadro',
  ferramentas: ['Etiquetas', 'Caneta', 'Detector de tensão'],
  passos: [
    { t: 'Abra só a tampa externa', d: 'A tampa com recortes para as alavancas pode ser aberta com segurança. O espelho interno não deve ser retirado com o quadro energizado.' },
    { t: 'Identifique cada disjuntor', d: 'Desligue um por vez e veja o que apaga. Anote: "Tomadas cozinha", "Chuveiro", etc.' },
    { t: 'Etiquete', d: 'Cole etiquetas e guarde um diagrama simples dentro da porta do quadro.' },
    { t: 'Confira a proteção', d: 'Veja se há DR (tem botão de teste "T") e DPS. Se não houver, anote como melhoria prioritária.', alerta: 'Disjuntor esquentando, cheiro de queimado ou marcas pretas indicam mau contato. Desligue o geral e chame um eletricista.' }
  ],
  exemplo: `<p>Casa pequena típica: geral 50 A bipolar, DR 63 A 30 mA, DPS, iluminação 10 A, tomadas sala/quartos 20 A, tomadas cozinha 20 A, chuveiro 32 A bipolar.</p>`,
  pode: ['Etiquetar todos os circuitos', 'Deixar espaço reserva para circuitos futuros'],
  naoPode: ['Ligar dois fios no mesmo borne do disjuntor', 'Trocar disjuntor por um maior porque "está desarmando"', 'Deixar o quadro sem espelho interno'],
  quiz: { p: 'Um equipamento que puxa mais de 10 A deve ser ligado:', op: ['Em qualquer tomada', 'Em circuito exclusivo', 'No circuito de iluminação', 'Em um benjamim'], c: 1, exp: 'A NBR 5410 exige circuito independente para equipamentos acima de 10 A.' }
},

/* ============================ COMPONENTES ============================ */
{
  id: 'cabos-cores', mod: 'componentes', titulo: 'Cabos, bitolas e cores', tempo: 12, ilustracao: 'cabos',
  resumo: 'Azul-claro é neutro, verde-amarelo é terra. E como escolher entre 1,5, 2,5, 4 e 6 mm².',
  conceito: `<p>Condutores residenciais são de cobre com isolação de PVC (750 V), rígidos ou flexíveis. A <b>bitola</b> (seção) é medida em mm².</p>
  <table class="tb"><thead><tr><th>Função</th><th>Cor (NBR 5410)</th></tr></thead><tbody>
  <tr><td>Neutro (N)</td><td>Azul-claro</td></tr><tr><td>Proteção / terra (PE)</td><td>Verde-amarelo ou verde</td></tr>
  <tr><td>Fase (L)</td><td>Qualquer outra cor: preto, vermelho, marrom são as mais usadas</td></tr><tr><td>Retorno</td><td>Cor diferente das anteriores, por convenção do instalador (ex.: amarelo ou branco)</td></tr></tbody></table>`,
  funcao: `<p>Quanto maior a bitola, mais corrente o fio aguenta sem aquecer. Valores de referência (cobre, PVC, em eletroduto embutido, 2 condutores carregados, 30 °C):</p>
  <table class="tb"><thead><tr><th>Seção</th><th>Capacidade</th><th>Disjuntor máximo usual</th><th>Uso típico</th></tr></thead><tbody>
  <tr><td>1,5 mm²</td><td>17,5 A</td><td>16 A</td><td>Iluminação (mínimo da norma)</td></tr>
  <tr><td>2,5 mm²</td><td>24 A</td><td>20 A</td><td>Tomadas (mínimo da norma)</td></tr>
  <tr><td>4 mm²</td><td>32 A</td><td>32 A</td><td>Chuveiro 220 V, ar-condicionado</td></tr>
  <tr><td>6 mm²</td><td>41 A</td><td>40 A</td><td>Chuveiro potente, alimentação de quadro</td></tr>
  <tr><td>10 mm²</td><td>57 A</td><td>50 A</td><td>Alimentação do quadro</td></tr></tbody></table>`,
  passosTitulo: 'Como escolher e preparar o cabo',
  ferramentas: ['Alicate desencapador', 'Alicate universal', 'Fita isolante ou conectores de emenda'],
  passos: [
    { t: 'Calcule a corrente do circuito', d: 'Some as cargas e divida pela tensão.' },
    { t: 'Escolha a bitola pela tabela', d: 'A capacidade do fio deve ser maior ou igual ao disjuntor, que deve ser maior ou igual à corrente do circuito.' },
    { t: 'Confira a queda de tensão', d: 'Em trechos longos (acima de 20 a 30 m) o fio pode precisar ser maior para a tensão não cair mais de 4%. O "Criar projeto" do Smath calcula isso.' },
    { t: 'Desencape só o necessário', d: 'Cerca de 1 cm para bornes. Não pode sobrar cobre exposto fora do borne.', alerta: 'Não corte fios do cabo flexível para ele "caber" no borne. Use terminal tubular (ponteira).' },
    { t: 'Respeite as cores', d: 'Quem fizer manutenção depois confia nas cores para saber o que é cada fio.' }
  ],
  exemplo: `<p>Chuveiro 5.500 W em 220 V: 25 A. Fio de 4 mm² (32 A) com disjuntor de 32 A. Se o chuveiro estiver a 35 m do quadro, a queda de tensão pede 6 mm².</p>`,
  pode: ['Usar fio maior que o mínimo', 'Usar conectores de emenda tipo alavanca'],
  naoPode: ['Usar fio azul-claro como fase', 'Usar fio verde-amarelo para qualquer coisa que não seja terra', 'Emendar dentro do eletroduto (só em caixas)', 'Usar cabo paralelo (fio de som) em instalação fixa'],
  quiz: { p: 'Qual a seção mínima para circuitos de tomadas segundo a NBR 5410?', op: ['1 mm²', '1,5 mm²', '2,5 mm²', '4 mm²'], c: 2, exp: 'Iluminação mínimo 1,5 mm²; tomadas e força mínimo 2,5 mm².' }
},
{
  id: 'disjuntor', mod: 'componentes', titulo: 'Disjuntor termomagnético', tempo: 10, ilustracao: 'disjuntor',
  resumo: 'Protege o fio contra sobrecarga e curto-circuito. Não protege pessoas contra choque.',
  conceito: `<p>O disjuntor termomagnético tem dois mecanismos:</p>
  <ul><li><b>Térmico:</b> uma lâmina bimetálica aquece com corrente acima do nominal e desarma depois de algum tempo (sobrecarga).</li><li><b>Magnético:</b> uma bobina desarma instantaneamente com correntes muito altas (curto-circuito).</li></ul>
  <p>Tipos de curva: <b>B</b> (desarma com 3 a 5× a nominal, cargas resistivas), <b>C</b> (5 a 10×, uso geral e motores pequenos), <b>D</b> (10 a 20×, motores com partida pesada).</p>`,
  funcao: `<p>O disjuntor protege o <b>condutor</b>. Ele deve desarmar antes que o fio esquente a ponto de danificar a isolação. Por isso a regra é: corrente do circuito ≤ corrente do disjuntor ≤ capacidade do fio.</p>`,
  passosTitulo: 'Instalar um disjuntor no quadro',
  ferramentas: ['Chave de fenda isolada', 'Detector de tensão', 'Disjuntor do mesmo fabricante do trilho ou padrão DIN'],
  passos: [
    { t: 'Desenergize o quadro', d: 'Desligue o disjuntor geral e confirme ausência de tensão nos barramentos.', alerta: 'Os bornes de entrada do disjuntor geral continuam energizados. Não encoste neles.' },
    { t: 'Encaixe no trilho DIN', d: 'Apoie a parte de cima do disjuntor no trilho e empurre a parte de baixo até ouvir o clique.' },
    { t: 'Ligue a alimentação', d: 'Conecte a fase vinda do barramento ou do geral no borne superior (entrada).' },
    { t: 'Ligue a saída', d: 'Conecte a fase do circuito no borne inferior. Aperte firme (torque do fabricante, geralmente 2 a 2,5 N·m).' },
    { t: 'Ligue neutro e terra do circuito', d: 'Neutro no barramento de neutro e terra no barramento de terra.' },
    { t: 'Teste o aperto e religue', d: 'Puxe levemente cada fio. Feche o espelho, religue o geral e depois o novo disjuntor.' }
  ],
  exemplo: `<p>Circuito de tomadas com fio 2,5 mm² (24 A): disjuntor de 20 A, curva C. Trocar por 32 A "para parar de desarmar" faz o fio aquecer até 32 A sem proteção: risco de incêndio.</p>`,
  pode: ['Usar disjuntor bipolar em circuitos 220 V fase-fase', 'Escolher curva C para uso residencial geral'],
  naoPode: ['Usar disjuntor maior que a capacidade do fio', 'Ligar o neutro no disjuntor monopolar', 'Usar disjuntor como interruptor no dia a dia'],
  quiz: { p: 'O que o disjuntor termomagnético protege principalmente?', op: ['As pessoas contra choque', 'Os condutores contra sobrecarga e curto', 'Os aparelhos contra raios', 'A conta de luz'], c: 1, exp: 'Contra choque quem protege é o DR; contra surtos, o DPS.' }
},
{
  id: 'dr', mod: 'componentes', titulo: 'Dispositivo DR (diferencial residual)', tempo: 10, ilustracao: 'dr',
  resumo: 'O dispositivo que salva vidas: detecta fuga de corrente de 30 mA e desliga em milissegundos.',
  conceito: `<p>O <b>DR</b> compara a corrente que vai pela fase com a que volta pelo neutro. Se a diferença passar de 30 mA, significa que corrente está fugindo por outro caminho (o corpo de alguém, por exemplo), e ele desliga.</p>
  <p>Pode ser <b>IDR</b> (interruptor DR, só detecta fuga) ou <b>DDR</b> (disjuntor DR, que também protege contra sobrecarga e curto).</p>`,
  funcao: `<p>A NBR 5410 exige DR de alta sensibilidade (≤ 30 mA) em circuitos de banheiro, cozinha, copa, lavanderia, área de serviço, áreas externas e tomadas que possam alimentar equipamentos em áreas externas.</p>`,
  passosTitulo: 'Instalar um DR no quadro',
  ferramentas: ['IDR 2 polos (mono/bi) ou 4 polos (tri), 30 mA', 'Chave de fenda isolada', 'Detector de tensão'],
  passos: [
    { t: 'Desenergize', d: 'Desligue o disjuntor geral e confirme ausência de tensão.' },
    { t: 'Fixe no trilho', d: 'Normalmente logo após o disjuntor geral.' },
    { t: 'Passe fase E neutro pelo DR', d: 'A fase e o neutro dos circuitos protegidos entram e saem pelo DR. O neutro de saída vai para um barramento de neutro exclusivo dos circuitos protegidos.', alerta: 'O terra NUNCA passa pelo DR. E o neutro depois do DR não pode se misturar com o neutro de circuitos sem DR, senão ele desarma sem parar.' },
    { t: 'Religue', d: 'Ligue o geral e depois o DR.' },
    { t: 'Aperte o botão de teste "T"', d: 'O DR deve desarmar na hora. Se não desarmar, está com defeito ou mal ligado. Repita o teste uma vez por mês.' }
  ],
  exemplo: `<p>Chuveiro com resistência danificada encostando na carcaça: sem DR, quem tocar no registro leva choque. Com DR e chuveiro aterrado, o DR desliga assim que a fuga aparece.</p>`,
  pode: ['Instalar um DR geral para a casa toda', 'Testar mensalmente pelo botão T'],
  naoPode: ['Retirar o DR porque "fica desarmando" (ele está avisando de uma fuga real)', 'Ligar o terra no neutro depois do DR', 'Passar o condutor terra pelo DR'],
  quiz: { p: 'O DR compara:', op: ['Tensão de entrada e de saída', 'Corrente da fase com a do neutro', 'Potência com consumo', 'Fase com terra'], c: 1, exp: 'Se a corrente que vai não é a que volta, há fuga e o DR atua.' }
},
{
  id: 'dps', mod: 'componentes', titulo: 'DPS (protetor contra surtos)', tempo: 7, ilustracao: 'dps',
  resumo: 'Desvia para o terra os picos de tensão de raios e manobras da rede.',
  conceito: `<p>O <b>DPS</b> (dispositivo de proteção contra surtos) é ligado entre cada fase (e o neutro) e o terra. Em funcionamento normal ele não conduz. Quando aparece um pico de tensão, ele conduz por microssegundos e desvia o excesso para o aterramento.</p>`,
  funcao: `<p>Protege eletrônicos (TV, geladeira com placa, computador) contra surtos causados por descargas atmosféricas próximas e manobras da concessionária. Sem um bom aterramento o DPS não funciona.</p>`,
  passosTitulo: 'Instalar DPS no quadro',
  ferramentas: ['DPS classe II, tensão compatível (ex.: 175 V para rede 127 V, 275 V para 220 V)', 'Cabo 4 mm² ou maior para ligação ao terra'],
  passos: [
    { t: 'Desenergize o quadro', d: 'Desligue o geral e confirme.' },
    { t: 'Fixe próximo à entrada', d: 'Logo após o disjuntor geral, um DPS por fase e um para o neutro (no esquema TN-S).' },
    { t: 'Ligue cada DPS à sua fase', d: 'Com fio curto. O ideal é que a soma dos fios de ligação seja menor que 50 cm.' },
    { t: 'Ligue o lado inferior ao barramento de terra', d: 'Fio o mais curto e reto possível.', alerta: 'Fio longo ou com curvas reduz muito a eficácia do DPS.' },
    { t: 'Verifique o indicador', d: 'A janelinha verde indica DPS bom. Vermelha indica que ele já atuou e precisa ser trocado.' }
  ],
  exemplo: `<p>Depois de uma tempestade a janela do DPS ficou vermelha e nenhum aparelho queimou: ele fez o trabalho e se sacrificou. Troque o módulo.</p>`,
  pode: ['Verificar a janela de status após tempestades', 'Combinar DPS no quadro com filtro de linha nos eletrônicos'],
  naoPode: ['Instalar DPS sem aterramento', 'Usar DPS de tensão menor que a da rede'],
  quiz: { p: 'Para onde o DPS desvia o surto?', op: ['Para o neutro', 'Para o terra', 'Para o disjuntor', 'Para a concessionária'], c: 1, exp: 'Por isso o aterramento é indispensável para o DPS funcionar.' }
},
{
  id: 'tomadas', mod: 'componentes', titulo: 'Tomadas (padrão NBR 14136)', tempo: 8, ilustracao: 'tomada',
  resumo: 'Três pinos, 10 A ou 20 A, e por que o pino do meio é o terra.',
  conceito: `<p>O padrão brasileiro NBR 14136 tem tomadas de 3 pinos com rebaixo de segurança (impede tocar nos pinos ao encaixar). Existem duas versões:</p>
  <ul><li><b>10 A:</b> furos de 4,0 mm, para a maioria dos aparelhos.</li><li><b>20 A:</b> furos de 4,8 mm (geralmente vermelha), para aparelhos de maior potência. Aceita plugues de 10 A também.</li></ul>
  <p>O pino central, deslocado, é o <b>terra</b>. Os outros dois são fase e neutro (ou fase e fase em 220 V bifásico).</p>`,
  funcao: `<p>A tomada é o ponto de conexão dos aparelhos. TUG (tomada de uso geral) atende aparelhos portáteis. TUE (tomada de uso específico) atende um equipamento fixo determinado.</p>`,
  passosTitulo: 'Resumo da instalação (detalhada no módulo de instalação)',
  ferramentas: ['Tomada 10 A ou 20 A', 'Chave de fenda isolada', 'Detector de tensão'],
  passos: [
    { t: 'Desenergize e confirme', d: 'Desligue o disjuntor e teste a ausência de tensão.' },
    { t: 'Ligue terra no borne central', d: 'Fio verde-amarelo no borne do pino de terra.' },
    { t: 'Ligue fase e neutro', d: 'Padronize a posição em toda a casa para facilitar manutenção.' },
    { t: 'Etiquete a tensão', d: 'Se houver tomadas 127 V e 220 V, identifique as de 220 V.', alerta: 'Ligar um aparelho 127 V em tomada 220 V queima o aparelho na hora.' }
  ],
  exemplo: `<p>Micro-ondas de 1.400 W em 127 V puxa 11 A: use tomada de 20 A, em circuito com fio de 2,5 mm².</p>`,
  pode: ['Usar tomada 20 A para aparelhos acima de 10 A', 'Instalar a tomada a 30 cm, 1,10 m ou 2,20 m do piso conforme o uso'],
  naoPode: ['Quebrar o pino terra do plugue', 'Usar adaptadores para tirar o terra', 'Ligar plugue 20 A em tomada 10 A forçando'],
  quiz: { p: 'No padrão NBR 14136, o pino central é:', op: ['Fase', 'Neutro', 'Terra', 'Retorno'], c: 2, exp: 'O pino central deslocado é o condutor de proteção.' }
},
{
  id: 'interruptores', mod: 'componentes', titulo: 'Interruptores: simples, paralelo e intermediário', tempo: 10, ilustracao: 'interruptor',
  resumo: 'Interruptor sempre corta a fase. Paralelo (three-way) comanda de dois lugares.',
  conceito: `<ul><li><b>Simples (1 seção):</b> 2 bornes. Abre ou fecha um único caminho.</li><li><b>Paralelo (three-way):</b> 3 bornes: comum e duas saídas. Usado em pares para comandar a lâmpada de dois pontos.</li><li><b>Intermediário (four-way):</b> 4 bornes. Fica entre dois paralelos para um terceiro ponto de comando.</li></ul>`,
  funcao: `<p>O interruptor fica em série com a lâmpada e deve interromper a <b>fase</b>. Assim, com o interruptor desligado, a lâmpada fica sem tensão e pode ser trocada com segurança.</p>
  <p>O fio que sai do interruptor e vai para a lâmpada se chama <b>retorno</b>.</p>`,
  passosTitulo: 'Como identificar os bornes',
  ferramentas: ['Multímetro na escala de continuidade'],
  passos: [
    { t: 'Simples', d: 'Dois bornes, sem polaridade. Com a tecla ligada, há continuidade entre eles.' },
    { t: 'Paralelo', d: 'Procure o borne marcado com "C" ou de cor diferente: é o comum. Em cada posição da tecla o comum conecta com uma das outras saídas.' },
    { t: 'Confirme com o multímetro', d: 'Com o interruptor fora da caixa e desenergizado, teste a continuidade em cada posição.', alerta: 'Nunca use o multímetro em continuidade em fios energizados.' }
  ],
  exemplo: `<p>Escada: um paralelo embaixo, outro em cima, dois fios "paralelos" (retornos) entre eles. Liga embaixo, desliga em cima.</p>`,
  pode: ['Usar interruptor com luz de localização (neon/LED)', 'Usar paralelo em corredores e escadas'],
  naoPode: ['Interromper o neutro no interruptor', 'Ligar fase e neutro direto no interruptor (curto ao ligar)'],
  quiz: { p: 'Qual condutor o interruptor deve interromper?', op: ['Neutro', 'Terra', 'Fase', 'Qualquer um'], c: 2, exp: 'Interrompendo a fase, a lâmpada desligada fica sem tensão.' }
},
{
  id: 'iluminacao', mod: 'componentes', titulo: 'Lâmpadas e iluminação', tempo: 7, ilustracao: 'lampada',
  resumo: 'LED, lúmens, temperatura de cor e quantas lâmpadas por cômodo.',
  conceito: `<p>Hoje o padrão é <b>LED</b>: gasta até 85% menos que a incandescente e dura até 25.000 h. O que importa na escolha:</p>
  <ul><li><b>Lúmens (lm):</b> quantidade de luz. Uma LED de 9 W dá cerca de 800 a 900 lm.</li><li><b>Temperatura de cor (K):</b> 2.700 a 3.000 K amarelada (quartos, sala); 4.000 K neutra; 6.500 K branca fria (cozinha, área de serviço).</li><li><b>Bivolt:</b> funciona em 127 V e 220 V.</li></ul>`,
  funcao: `<p>A NBR 5410 pede ao menos um ponto de luz no teto por cômodo, comandado por interruptor. Carga mínima de referência para projeto: 100 VA para os primeiros 6 m² e mais 60 VA a cada 4 m² inteiros.</p>`,
  passosTitulo: 'Trocar uma luminária ou plafon',
  ferramentas: ['Escada', 'Chave de fenda isolada', 'Conectores de emenda', 'Detector de tensão'],
  passos: [
    { t: 'Desligue o disjuntor de iluminação', d: 'Não confie apenas no interruptor: se ele estiver no neutro por erro de instalação, a fase continua no bocal.', alerta: 'Use escada firme e nunca apoie em móveis.' },
    { t: 'Retire a luminária antiga', d: 'Teste os fios com o detector antes de tocar.' },
    { t: 'Identifique neutro e retorno', d: 'O neutro (azul-claro) vem direto do quadro; o retorno vem do interruptor.' },
    { t: 'Conecte', d: 'Fio da luminária ao neutro e o outro ao retorno, com conector de emenda. Se a luminária for metálica, ligue o terra.' },
    { t: 'Fixe e teste', d: 'Fixe a base, religue e teste pelo interruptor.' }
  ],
  exemplo: `<p>Quarto de 12 m²: 100 VA + 60 VA = 160 VA de carga prevista. Na prática, um plafon LED de 18 a 24 W resolve.</p>`,
  pode: ['Trocar incandescentes por LED sem mudar a fiação', 'Usar luz quente em áreas de descanso'],
  naoPode: ['Instalar lâmpada comum em luminária fechada com dimmer sem verificar compatibilidade', 'Deixar emendas sem isolação dentro do forro'],
  quiz: { p: 'O que indica a quantidade de luz que a lâmpada emite?', op: ['Watts', 'Kelvin', 'Lúmens', 'Volts'], c: 2, exp: 'Watts indica consumo; Kelvin, a cor; lúmens, a quantidade de luz.' }
},
{
  id: 'aterramento', mod: 'componentes', titulo: 'Aterramento', tempo: 10, ilustracao: 'aterramento',
  resumo: 'O caminho seguro para a corrente de fuga: haste, condutor de proteção e equipotencialização.',
  conceito: `<p>Aterramento é a ligação intencional das partes metálicas da instalação e dos aparelhos com a terra. É composto por <b>haste</b> de aço cobreado cravada no solo, <b>condutor de aterramento</b>, <b>barramento de equipotencialização (BEP)</b> e o <b>condutor de proteção (PE)</b>, verde-amarelo, que vai até cada tomada.</p>
  <p>No Brasil o esquema mais recomendado em residências é o <b>TN-S</b>: neutro e terra separados em toda a instalação, unidos apenas no padrão de entrada.</p>`,
  funcao: `<p>Se uma fase encostar na carcaça de um aparelho, a corrente vai pelo terra e o DR ou o disjuntor desliga. Sem terra, a carcaça fica energizada esperando alguém encostar.</p>`,
  passosTitulo: 'Instalar o condutor de terra até as tomadas',
  ferramentas: ['Cabo verde-amarelo de mesma seção da fase (até 16 mm²)', 'Guia passa-fio', 'Terrômetro (profissional) para medir a haste'],
  passos: [
    { t: 'Verifique a haste no padrão', d: 'Deve existir ao menos uma haste conectada ao barramento de terra do quadro.' },
    { t: 'Instale o barramento de terra no quadro', d: 'Separado do barramento de neutro (esquema TN-S).' },
    { t: 'Passe o fio terra pelos eletrodutos', d: 'Um condutor de proteção acompanhando cada circuito.' },
    { t: 'Ligue no pino central das tomadas', d: 'E nas carcaças de chuveiro, luminárias metálicas e torneira elétrica.', alerta: 'Nunca faça "terra" ligando o pino de terra ao neutro na própria tomada. Se o neutro romper, a carcaça do aparelho recebe fase.' },
    { t: 'Meça', d: 'Um profissional mede a resistência de aterramento com terrômetro. Valores baixos (ex.: até 10 Ω) são o objetivo usual.' }
  ],
  exemplo: `<p>Máquina de lavar dando "choquinho" na tampa: sinal de fuga e falta de aterramento. Aterrando e instalando DR, a fuga passa a desligar o circuito.</p>`,
  pode: ['Interligar o terra da casa com as ferragens e tubulações metálicas (equipotencialização)', 'Usar uma única malha de aterramento para a casa'],
  naoPode: ['Usar cano de água ou gás como terra', 'Fazer "terra" no neutro', 'Criar hastes isoladas separadas para cada aparelho'],
  quiz: { p: 'Qual a cor do condutor de proteção (terra)?', op: ['Azul-claro', 'Preto', 'Verde-amarelo', 'Vermelho'], c: 2, exp: 'Verde-amarelo, ou verde, é exclusivo do condutor de proteção.' }
},

/* ============================ INSTALAÇÃO ============================ */
{
  id: 'inst-tomada', mod: 'instalacao', titulo: 'Instalar uma tomada do zero', tempo: 15, ilustracao: 'tomada',
  resumo: 'Da caixa 4×2 vazia até a tomada funcionando e testada.',
  conceito: `<p>Uma tomada nova precisa de: caixa de embutir 4×2, eletroduto até um ponto com circuito de tomadas, três condutores (fase, neutro, terra) de 2,5 mm² e a tomada NBR 14136.</p>`,
  funcao: `<p>Leva um ponto de energia seguro para onde você precisa, evitando extensões e benjamins.</p>`,
  passosTitulo: 'Passo a passo completo',
  ferramentas: ['Tomada 10 A ou 20 A com placa', 'Caixa 4×2 e eletroduto corrugado 3/4"', 'Cabos 2,5 mm²: preto/vermelho (fase), azul-claro (neutro), verde-amarelo (terra)', 'Guia passa-fio', 'Alicate desencapador', 'Chave de fenda isolada', 'Detector de tensão', 'Serra copo ou talhadeira (se for embutir)'],
  passos: [
    { t: 'Planeje', d: 'Escolha o circuito de origem. Confira se ele suporta a nova carga e se tem DR caso seja área molhada.' },
    { t: 'Desligue e bloqueie o circuito', d: 'Disjuntor desligado, etiqueta "não ligar", ausência de tensão confirmada no ponto de origem.', alerta: 'Este é o passo mais importante. Sem ele, nada mais vale.' },
    { t: 'Fixe caixa e eletroduto', d: 'Embuta a caixa no nível da parede com argamassa. Altura: 30 cm (baixa), 1,10 m (média, bancadas) ou 2,20 m (alta, ar-condicionado).' },
    { t: 'Passe os cabos', d: 'Com a guia, puxe fase, neutro e terra da caixa de origem até a nova. Deixe sobra de 15 cm em cada caixa.' },
    { t: 'Faça as conexões na origem', d: 'Na caixa de origem, emende ou ligue nos mesmos bornes da tomada existente, cor com cor. Use conectores de alavanca.' },
    { t: 'Ligue a tomada nova', d: 'Terra no borne central, fase e neutro nos laterais, na mesma posição das outras tomadas da casa. Aperte bem.' },
    { t: 'Acomode e fixe', d: 'Dobre os fios em sanfona para dentro da caixa, sem forçar, e parafuse a tomada e a placa.' },
    { t: 'Religue e teste', d: 'Meça: fase-neutro (127 ou 220 V), fase-terra (mesmo valor), neutro-terra (perto de 0 V). Teste o DR pelo botão.', alerta: 'Se neutro-terra der a mesma tensão da rede, fase e neutro estão invertidos com o terra. Desligue e corrija.' }
  ],
  exemplo: `<p>Tomada para a TV na sala: deriva do circuito de tomadas da sala, altura de 30 cm ou atrás do painel a 1,10 m, 10 A.</p>`,
  pode: ['Derivar de outra tomada do mesmo circuito se a carga permitir', 'Usar tomada dupla para atender mais aparelhos'],
  naoPode: ['Derivar tomada do circuito de iluminação (fio 1,5 mm²)', 'Deixar emenda fora de caixa', 'Instalar tomada sem terra'],
  quiz: { p: 'Ao testar uma tomada correta, a tensão entre neutro e terra deve ser:', op: ['A mesma da rede', 'Próxima de 0 V', '220 V', '12 V'], c: 1, exp: 'Neutro e terra estão no mesmo potencial no padrão; a medição deve dar perto de zero.' }
},
{
  id: 'inst-interruptor', mod: 'instalacao', titulo: 'Interruptor simples com lâmpada', tempo: 15, ilustracao: 'interruptor',
  resumo: 'O circuito mais clássico da elétrica: fase no interruptor, retorno na lâmpada, neutro direto.',
  conceito: `<p>O circuito tem três condutores: <b>fase</b> (do quadro ao interruptor), <b>retorno</b> (do interruptor à lâmpada) e <b>neutro</b> (do quadro direto à lâmpada). Se a luminária for metálica, adicione o <b>terra</b>.</p>`,
  funcao: `<p>Liga e desliga a lâmpada de um ponto. Com a fase passando pelo interruptor, a lâmpada desligada fica sem tensão.</p>`,
  passosTitulo: 'Passo a passo completo',
  ferramentas: ['Interruptor simples com placa', 'Bocal ou luminária', 'Cabos 1,5 mm²: fase, retorno (amarelo), neutro (azul-claro)', 'Conectores de emenda', 'Detector de tensão', 'Chave de fenda isolada'],
  passos: [
    { t: 'Desligue o circuito de iluminação', d: 'Disjuntor desligado, bloqueado e ausência de tensão confirmada.' },
    { t: 'Passe os cabos', d: 'Do quadro (ou de outro ponto de luz) até a caixa do teto: fase e neutro. Da caixa do teto até a caixa do interruptor: fase e retorno.' },
    { t: 'Ligue o interruptor', d: 'Na caixa do interruptor: a fase em um borne e o retorno no outro.', alerta: 'O neutro NÃO vai para o interruptor simples. Se ligar fase e neutro no interruptor, ao acionar você provoca um curto-circuito.' },
    { t: 'Ligue a lâmpada', d: 'Na caixa do teto: neutro no bocal (rosca externa, preferencialmente) e retorno no contato central do bocal.' },
    { t: 'Isole as emendas', d: 'Emende apenas dentro de caixas, com conector ou fita isolante bem aplicada.' },
    { t: 'Religue e teste', d: 'Ligue o disjuntor, acione o interruptor. Com o interruptor desligado, teste o bocal com detector: não deve haver tensão.' }
  ],
  exemplo: `<p>Treine este circuito na <b>Bancada de ligações</b> do simulador. O Smath avisa se você colocar o interruptor no neutro ou fizer um curto.</p>`,
  pode: ['Usar conector de alavanca nas emendas', 'Usar a mesma fase para vários pontos de luz do mesmo circuito'],
  naoPode: ['Colocar o interruptor no neutro', 'Usar cabo de 1,5 mm² para tomadas', 'Emendar fios dentro do eletroduto'],
  quiz: { p: 'Quais condutores chegam na caixa do interruptor simples?', op: ['Fase e neutro', 'Fase e retorno', 'Neutro e retorno', 'Terra e neutro'], c: 1, exp: 'A fase entra no interruptor e o retorno sai para a lâmpada.' },
  bancada: 'simples'
},
{
  id: 'inst-threeway', mod: 'instalacao', titulo: 'Interruptor paralelo (three-way)', tempo: 18, ilustracao: 'threeway',
  resumo: 'Comandar a mesma lâmpada de dois lugares: escadas, corredores e quartos.',
  conceito: `<p>Usa dois interruptores paralelos, cada um com três bornes: <b>comum (C)</b> e duas saídas. Entre os dois interruptores passam dois fios chamados <b>paralelos</b> (ou retornos intermediários).</p>`,
  funcao: `<p>Qualquer um dos interruptores muda o estado da lâmpada: se estiver acesa, apaga; se estiver apagada, acende.</p>`,
  passosTitulo: 'Passo a passo completo',
  ferramentas: ['2 interruptores paralelos', 'Cabos 1,5 mm²', 'Multímetro para identificar o comum', 'Chave de fenda isolada', 'Detector de tensão'],
  passos: [
    { t: 'Desligue e confirme', d: 'Circuito de iluminação desligado, bloqueado e sem tensão.' },
    { t: 'Identifique o comum de cada interruptor', d: 'Geralmente marcado "C" ou "L", ou com parafuso de cor diferente.' },
    { t: 'Interruptor 1: fase no comum', d: 'A fase do circuito vai no borne comum do primeiro interruptor.' },
    { t: 'Ligue os dois paralelos', d: 'As duas saídas do interruptor 1 ligam nas duas saídas do interruptor 2 (dois fios entre eles).' },
    { t: 'Interruptor 2: retorno no comum', d: 'Do comum do segundo interruptor sai o retorno para a lâmpada.', alerta: 'Erro mais comum: ligar a fase ou o retorno numa saída e não no comum. Resultado: a lâmpada só funciona em certas combinações.' },
    { t: 'Lâmpada', d: 'Retorno no contato central do bocal e neutro direto do quadro na rosca.' },
    { t: 'Teste as 4 combinações', d: 'Cada vez que mudar qualquer interruptor, a lâmpada deve mudar de estado.' }
  ],
  exemplo: `<p>Monte este circuito na <b>Bancada de ligações</b>: o Smath testa automaticamente as 4 combinações dos interruptores.</p>`,
  pode: ['Adicionar interruptores intermediários entre os paralelos para mais pontos', 'Usar relé de impulso quando houver muitos pontos de comando'],
  naoPode: ['Passar neutro pelos interruptores', 'Misturar retornos de circuitos diferentes'],
  quiz: { p: 'Em um three-way, onde a fase é ligada?', op: ['Numa saída do interruptor 2', 'No comum do interruptor 1', 'Direto na lâmpada', 'Nos dois comuns'], c: 1, exp: 'Fase no comum do primeiro; retorno sai do comum do segundo.' },
  bancada: 'threeway'
},
{
  id: 'inst-chuveiro', mod: 'instalacao', titulo: 'Instalar chuveiro elétrico', tempo: 18, ilustracao: 'chuveiro',
  resumo: 'O maior consumidor da casa: circuito exclusivo, fio grosso, DR e aterramento obrigatórios.',
  conceito: `<p>O chuveiro é uma resistência que aquece a água. Potências usuais: 4.500 a 7.500 W. Precisa de <b>circuito exclusivo</b> desde o quadro, com disjuntor próprio, <b>DR de 30 mA</b> e <b>condutor terra</b>.</p>`,
  funcao: `<p>Aquece a água instantaneamente. Por ser a maior carga da casa, erros aqui são a principal causa de fios derretidos e incêndios residenciais.</p>`,
  passosTitulo: 'Passo a passo completo',
  ferramentas: ['Chuveiro (confira a tensão: 127 V ou 220 V)', 'Cabo de 4 ou 6 mm² conforme cálculo', 'Disjuntor bipolar (220 V fase-fase) ou monopolar (220 V fase-neutro)', 'Conector de porcelana ou borne apropriado (nunca fita)', 'Fita veda-rosca', 'Detector de tensão'],
  passos: [
    { t: 'Calcule', d: 'Corrente = potência ÷ tensão. 6.800 W em 220 V = 31 A → disjuntor de 40 A e fio de 6 mm² (o disjuntor precisa de folga acima da corrente e o fio precisa aguentar o disjuntor). Use o "Criar projeto" para conferir a queda de tensão.' },
    { t: 'Confira o padrão de entrada', d: 'O disjuntor geral precisa suportar o chuveiro somado às outras cargas.' },
    { t: 'Desligue e bloqueie', d: 'Desligue o geral se for passar cabo novo desde o quadro.' },
    { t: 'Passe o circuito exclusivo', d: 'Dois condutores de alimentação + terra, do quadro até a caixa do chuveiro, sem emendas.' },
    { t: 'Instale a proteção no quadro', d: 'Disjuntor do circuito e DR 30 mA (ou circuito já protegido pelo DR geral).' },
    { t: 'Fixe o chuveiro', d: 'Fita veda-rosca no cano e rosqueie. Deixe a água correr ANTES de energizar.', alerta: 'Ligar o chuveiro sem água queima a resistência na hora (resistência "seca").' },
    { t: 'Faça as conexões', d: 'Fios do chuveiro aos de alimentação com conector apropriado, bem apertado. O fio verde do chuveiro vai no terra.', alerta: 'Emenda com fita isolante em chuveiro aquece, derrete e é a principal causa de incêndio em banheiros.' },
    { t: 'Teste', d: 'Abra a água, religue, teste nas posições verão e inverno e aperte o botão do DR.' }
  ],
  exemplo: `<p>Trocar um chuveiro de 4.500 W por um de 7.500 W sem trocar fio e disjuntor é a receita de cabo derretido. Use o projeto modelo "Trocar chuveiro" para ver a diferença.</p>`,
  pode: ['Usar disjuntor bipolar em chuveiro 220 V entre fases', 'Preferir 220 V para potências acima de 5.500 W'],
  naoPode: ['Emendar com fita isolante', 'Ligar sem terra', 'Mexer na chave verão/inverno com o chuveiro ligado e molhado', 'Ligar sem água'],
  quiz: { p: 'Antes de energizar um chuveiro novo você deve:', op: ['Ligar na posição inverno', 'Deixar a água correr', 'Retirar o terra', 'Desligar o DR'], c: 1, exp: 'Sem água a resistência queima instantaneamente.' }
},
{
  id: 'inst-quadro', mod: 'instalacao', titulo: 'Montar um quadro de distribuição', tempo: 25, ilustracao: 'quadro',
  resumo: 'Do quadro vazio ao quadro organizado, com DR, DPS e circuitos identificados.',
  conceito: `<p>Montar o quadro é organizar a entrada de energia, os dispositivos de proteção e a saída de cada circuito, respeitando a separação entre neutro e terra.</p>`,
  funcao: `<p>Um quadro bem montado facilita manutenção, evita aquecimento e garante que cada proteção funcione.</p>`,
  passosTitulo: 'Passo a passo completo',
  ferramentas: ['Quadro com trilho DIN, barramentos de neutro e terra', 'Disjuntor geral, IDR 30 mA, DPS, disjuntores dos circuitos', 'Pente de barramento (opcional)', 'Terminais tubulares e alicate de crimpar', 'Anilhas de identificação', 'Chave de fenda isolada', 'Detector de tensão'],
  passos: [
    { t: 'Faça o projeto', d: 'Liste os circuitos com corrente, bitola e disjuntor. Use o "Criar projeto" do Smath para gerar a lista.' },
    { t: 'Desligue no padrão de entrada', d: 'O disjuntor do padrão desliga a alimentação do quadro. Confirme ausência de tensão no cabo de chegada.', alerta: 'Nunca monte quadro com a alimentação energizada.' },
    { t: 'Fixe os dispositivos no trilho', d: 'Ordem: geral, DPS, DR, depois os disjuntores dos circuitos. Deixe vagas de reserva.' },
    { t: 'Ligue a alimentação', d: 'Fases no geral. Neutro de chegada no barramento de neutro (ou no DR geral). Terra no barramento de terra.' },
    { t: 'Ligue DPS', d: 'Entre cada fase e o barramento de terra, com fios curtos.' },
    { t: 'Distribua para os disjuntores', d: 'Use pente de barramento ou jumpers de mesma bitola do alimentador. Equilibre circuitos entre as fases.' },
    { t: 'Ligue os circuitos', d: 'Fase em cada disjuntor, neutro no barramento de neutro correspondente (do DR), terra no barramento de terra. Use terminais em cabos flexíveis.' },
    { t: 'Identifique', d: 'Anilha em cada fio e etiqueta em cada disjuntor. Cole o diagrama na porta.' },
    { t: 'Inspecione e teste', d: 'Reaperte tudo, confira que não há cobre exposto, feche o espelho, energize e teste o DR.' }
  ],
  exemplo: `<p>Fios organizados em "pente", subindo pelas laterais e entrando reto em cada borne, ficam mais frios e mais fáceis de manter.</p>`,
  pode: ['Deixar 20% de espaço reserva', 'Equilibrar cargas entre as fases'],
  naoPode: ['Unir neutro e terra dentro do quadro de distribuição (só no padrão)', 'Colocar dois fios no mesmo borne', 'Usar fita isolante no lugar de terminais'],
  quiz: { p: 'No esquema TN-S, onde neutro e terra se unem?', op: ['Em cada tomada', 'No quadro de distribuição', 'Somente no padrão de entrada', 'Em lugar nenhum'], c: 2, exp: 'Daí em diante eles seguem separados por toda a instalação.' }
},

/* ============================ MANUTENÇÃO ============================ */
{
  id: 'multimetro', mod: 'manutencao', titulo: 'Usando o multímetro', tempo: 12, ilustracao: 'multimetro',
  resumo: 'Medir tensão, corrente, resistência e continuidade sem queimar o aparelho nem a si mesmo.',
  conceito: `<p>O multímetro mede várias grandezas. As escalas principais são <b>V~</b> (tensão alternada), <b>V⎓</b> (tensão contínua), <b>A</b> (corrente), <b>Ω</b> (resistência) e continuidade (bip).</p>
  <p>A categoria de segurança importa: para quadros e tomadas residenciais, use <b>CAT III 600 V</b> ou superior.</p>`,
  funcao: `<p>Confirmar ausência de tensão, encontrar fios rompidos, testar resistências de chuveiro, conferir baterias e diagnosticar defeitos.</p>`,
  passosTitulo: 'Como medir cada grandeza',
  ferramentas: ['Multímetro CAT III', 'Alicate amperímetro (para corrente em CA)'],
  passos: [
    { t: 'Tensão', d: 'Ponta preta em COM, vermelha em V. Escala V~ para tomadas. Meça em paralelo: uma ponta em cada condutor.' },
    { t: 'Corrente', d: 'Em instalações, use o alicate amperímetro: abrace apenas UM fio (só a fase). Abraçar fase e neutro juntos dá zero.', alerta: 'Medir corrente com as pontas na tomada (multímetro na escala A) é um curto direto: pode explodir o fusível ou o aparelho.' },
    { t: 'Resistência', d: 'Circuito DESLIGADO. Ex.: resistência de chuveiro 5.500 W em 220 V deve dar cerca de 8,8 Ω (R = V² ÷ P).' },
    { t: 'Continuidade', d: 'Circuito DESLIGADO. Bip indica caminho fechado: ótimo para achar fio rompido ou identificar fios no eletroduto.' },
    { t: 'Ao terminar', d: 'Volte a chave para V ou OFF e a ponta vermelha para o borne V.' }
  ],
  exemplo: `<p>Tomada sem energia: mede 0 V entre fase e neutro, mas 127 V entre fase e terra. Conclusão: neutro interrompido em alguma emenda.</p>`,
  pode: ['Testar o multímetro em fonte conhecida antes de usar', 'Usar alicate amperímetro para corrente'],
  naoPode: ['Medir resistência ou continuidade em circuito energizado', 'Girar a chave seletora com as pontas no circuito', 'Usar pontas de prova com isolação danificada'],
  quiz: { p: 'Para medir a corrente de um chuveiro com alicate amperímetro, você abraça:', op: ['Fase e neutro juntos', 'Só um condutor', 'O terra', 'Os três fios'], c: 1, exp: 'Abraçando ida e volta juntas os campos se anulam e a leitura dá zero.' }
},
{
  id: 'diagnostico', mod: 'manutencao', titulo: 'Diagnóstico de falhas comuns', tempo: 15, ilustracao: 'diagnostico',
  resumo: 'Disjuntor que desarma, DR que cai, tomada morta, luz piscando: causas e soluções.',
  conceito: `<p>Diagnosticar é ir do sintoma à causa testando hipóteses da mais simples para a mais complexa, sempre com segurança.</p>
  <table class="tb"><thead><tr><th>Sintoma</th><th>Causa provável</th><th>O que fazer</th></tr></thead><tbody>
  <tr><td>Disjuntor desarma após minutos</td><td>Sobrecarga (térmico)</td><td>Redistribuir cargas ou criar circuito novo</td></tr>
  <tr><td>Disjuntor desarma na hora ao ligar</td><td>Curto-circuito</td><td>Desligar aparelhos e procurar o ponto em curto</td></tr>
  <tr><td>DR desarma</td><td>Fuga para a terra (umidade, aparelho com defeito, neutro misturado)</td><td>Desligar aparelhos um a um e religar</td></tr>
  <tr><td>Tomada sem energia</td><td>Disjuntor desligado, emenda solta, neutro rompido</td><td>Medir fase-neutro e fase-terra</td></tr>
  <tr><td>Luz LED piscando desligada</td><td>Interruptor no neutro ou indução em retorno longo</td><td>Corrigir para interromper a fase</td></tr>
  <tr><td>Tomada ou plugue esquentando</td><td>Mau contato ou sobrecarga</td><td>Trocar tomada, reduzir carga</td></tr></tbody></table>`,
  funcao: `<p>Corrigir a causa em vez de esconder o sintoma. Aumentar o disjuntor ou retirar o DR esconde o problema e cria risco de incêndio ou choque.</p>`,
  passosTitulo: 'Roteiro para "o disjuntor fica desarmando"',
  ferramentas: ['Alicate amperímetro', 'Multímetro', 'Lista de aparelhos do circuito'],
  passos: [
    { t: 'Observe quando desarma', d: 'Na hora (curto) ou depois de um tempo com vários aparelhos ligados (sobrecarga)?' },
    { t: 'Desligue todos os aparelhos do circuito', d: 'Retire os plugues e religue o disjuntor.' },
    { t: 'Se desarmar sem nada ligado', d: 'O problema está na fiação: curto em caixa, prego no eletroduto, umidade. Chame um eletricista.', alerta: 'Não fique religando um disjuntor que desarma por curto. Cada tentativa gera arco e calor no ponto do defeito.' },
    { t: 'Religue um aparelho por vez', d: 'Se desarmar ao ligar um aparelho específico, o defeito é nele.' },
    { t: 'Meça a corrente total', d: 'Com o alicate na fase do circuito. Se for maior que o disjuntor, é sobrecarga: divida em circuitos.' }
  ],
  exemplo: `<p>Disjuntor de 20 A da cozinha cai quando a airfryer (12 A) e o micro-ondas (11 A) funcionam juntos: 23 A. Solução: circuito exclusivo para um deles.</p>`,
  pode: ['Testar uma hipótese por vez', 'Registrar o que encontrou'],
  naoPode: ['Trocar o disjuntor por um maior', 'Remover o DR', 'Religar repetidamente após curto'],
  quiz: { p: 'O disjuntor desarma instantaneamente ao ligar, com nenhum aparelho conectado. A causa mais provável é:', op: ['Sobrecarga', 'Curto-circuito na fiação', 'Lâmpada queimada', 'Tensão baixa'], c: 1, exp: 'Desarme instantâneo sem carga indica curto na própria fiação.' }
},
{
  id: 'preventiva', mod: 'manutencao', titulo: 'Manutenção preventiva', tempo: 10, ilustracao: 'checklist',
  resumo: 'O checklist que evita incêndios e prolonga a vida da instalação.',
  conceito: `<p>Manutenção preventiva é inspecionar e corrigir antes da falha. A NBR 5410 recomenda verificações periódicas, e a NR-10 exige registro em instalações de empresas.</p>`,
  funcao: `<p>Reapertar conexões, identificar aquecimento e testar proteções evita a maior parte dos incêndios de origem elétrica, que começam em maus contatos.</p>`,
  passosTitulo: 'Checklist anual da casa',
  ferramentas: ['Chave de fenda isolada', 'Multímetro', 'Termômetro infravermelho (opcional)', 'Lanterna'],
  passos: [
    { t: 'Todo mês: teste o DR', d: 'Aperte o botão T. Deve desarmar. Religue.' },
    { t: 'Inspecione o DPS', d: 'Janela verde = bom. Vermelha = trocar.' },
    { t: 'Verifique aquecimento', d: 'Com a casa em uso, passe a mão perto (sem tocar) ou use termômetro infravermelho no quadro, tomadas de alta carga e chuveiro.' },
    { t: 'Reaperte o quadro (desenergizado)', d: 'Uma vez por ano, com o geral desligado e tensão ausente confirmada, reaperte todos os bornes.', alerta: 'Reaperto com quadro energizado é serviço para profissional com EPI e NR-10.' },
    { t: 'Troque tomadas frouxas ou escurecidas', d: 'Plugue folgado = mau contato = calor.' },
    { t: 'Confira extensões e benjamins', d: 'Elimine as permanentes; elas indicam falta de tomadas.' },
    { t: 'Atualize o diagrama do quadro', d: 'Registre qualquer mudança feita no ano.' }
  ],
  exemplo: `<p>Uma tomada atrás da geladeira com marca escura no espelho: mau contato aquecendo há meses. Trocar a tomada custa pouco; o incêndio, não.</p>`,
  pode: ['Usar o simulador para treinar antes de mexer', 'Contratar inspeção profissional a cada 5 anos'],
  naoPode: ['Ignorar cheiro de queimado', 'Pintar sobre tomadas e quadros', 'Guardar objetos dentro ou em frente ao quadro'],
  quiz: { p: 'Com que frequência é recomendado testar o DR pelo botão de teste?', op: ['Uma vez por mês', 'A cada 10 anos', 'Só quando desarmar', 'Nunca'], c: 0, exp: 'O teste mensal garante que o mecanismo não travou.' }
}
];
