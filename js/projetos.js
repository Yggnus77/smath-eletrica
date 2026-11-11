/* Smath Elétrica — criador de projetos do dia a dia: residencial (CA) e solar off-grid (CC).
   Cálculo didático baseado na NBR 5410. Não substitui projeto assinado por profissional habilitado. */
(function () {
  const { esc } = window.SM;
  const fmt = (x, d = 1) => Number(x).toFixed(d).replace('.', ',');

  const CATALOGO = [
    { nome: 'Lâmpada LED 9 W', w: 9, tipo: 'ilum' }, { nome: 'Plafon LED 18 W', w: 18, tipo: 'ilum' }, { nome: 'Luminária LED 24 W', w: 24, tipo: 'ilum' }, { nome: 'Fita LED 5 m', w: 36, tipo: 'ilum' },
    { nome: 'Tomada de uso geral', w: 100, tipo: 'tug' }, { nome: 'Tomada de cozinha/lavanderia', w: 600, tipo: 'tug' }, { nome: 'Geladeira', w: 250, tipo: 'tug' }, { nome: 'TV + som', w: 200, tipo: 'tug' },
    { nome: 'Chuveiro 5.500 W', w: 5500, tipo: 'tue', v220: true }, { nome: 'Chuveiro 7.500 W', w: 7500, tipo: 'tue', v220: true }, { nome: 'Torneira elétrica', w: 5500, tipo: 'tue', v220: true },
    { nome: 'Ar-condicionado 9.000 BTU', w: 900, tipo: 'tue', v220: true }, { nome: 'Ar-condicionado 12.000 BTU', w: 1200, tipo: 'tue', v220: true }, { nome: 'Ar-condicionado 18.000 BTU', w: 1800, tipo: 'tue', v220: true },
    { nome: 'Micro-ondas', w: 1400, tipo: 'tue' }, { nome: 'Forno elétrico', w: 2000, tipo: 'tue', v220: true }, { nome: 'Cooktop indução 2 bocas', w: 3500, tipo: 'tue', v220: true },
    { nome: 'Máquina de lavar', w: 1000, tipo: 'tue' }, { nome: 'Secadora de roupas', w: 3000, tipo: 'tue', v220: true }, { nome: 'Aquecedor', w: 1500, tipo: 'tue' }, { nome: 'Bomba d\'água 1/2 cv', w: 450, tipo: 'tue' },
    { nome: 'Carregador de carro elétrico', w: 7000, tipo: 'tue', v220: true }
  ];
  const CAT_SOLAR = [
    { nome: 'Lâmpada LED 12 V 7 W', w: 7, h: 5 }, { nome: 'Celular (carga)', w: 10, h: 2 }, { nome: 'TV LED 32"', w: 45, h: 4 }, { nome: 'Notebook', w: 60, h: 4 },
    { nome: 'Geladeira pequena', w: 90, h: 10 }, { nome: 'Ventilador', w: 50, h: 6 }, { nome: 'Roteador Wi-Fi', w: 10, h: 24 }, { nome: 'Câmera de segurança', w: 6, h: 24 }, { nome: 'Bomba d\'água 12 V', w: 60, h: 1 }
  ];
  const DISJ = [10, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100, 125];
  const CABOS = [[1.5, 17.5], [2.5, 24], [4, 32], [6, 41], [10, 57], [16, 76], [25, 101], [35, 125], [50, 151]];
  const RHO = 0.0172;

  const novoId = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const C = (nome, w, qtd = 1) => { const c = CATALOGO.find(x => x.nome === nome) || CAT_SOLAR.find(x => x.nome === nome); return Object.assign({}, c, { qtd, w: w || c.w }); };

  const MODELOS = [
    { titulo: 'Casa de 2 quartos', desc: 'Sala, cozinha, 2 quartos, banheiro e lavanderia. Bifásico 127/220 V.', gera: () => ({ tipo: 'residencial', nome: 'Casa de 2 quartos', ligacao: 'bi127', comodos: [
      { nome: 'Sala', area: 16, dist: 6, umido: false, cargas: [C('Plafon LED 18 W', 0, 2), C('Tomada de uso geral', 0, 5), C('TV + som')] },
      { nome: 'Cozinha', area: 10, dist: 4, umido: true, cargas: [C('Plafon LED 18 W'), C('Tomada de cozinha/lavanderia', 0, 3), C('Tomada de uso geral', 0, 1), C('Geladeira'), C('Micro-ondas')] },
      { nome: 'Quarto 1', area: 12, dist: 10, umido: false, cargas: [C('Plafon LED 18 W'), C('Tomada de uso geral', 0, 4), C('Ar-condicionado 9.000 BTU')] },
      { nome: 'Quarto 2', area: 10, dist: 12, umido: false, cargas: [C('Plafon LED 18 W'), C('Tomada de uso geral', 0, 3)] },
      { nome: 'Banheiro', area: 4, dist: 9, umido: true, cargas: [C('Lâmpada LED 9 W'), C('Tomada de uso geral', 0, 1), C('Chuveiro 5.500 W')] },
      { nome: 'Lavanderia', area: 5, dist: 7, umido: true, cargas: [C('Lâmpada LED 9 W'), C('Tomada de cozinha/lavanderia', 0, 2), C('Máquina de lavar')] }] }) },
    { titulo: 'Trocar chuveiro por um mais potente', desc: 'Banheiro a 18 m do quadro, chuveiro de 7.500 W em 220 V.', gera: () => ({ tipo: 'residencial', nome: 'Chuveiro 7.500 W', ligacao: 'bi127', comodos: [
      { nome: 'Banheiro', area: 4, dist: 18, umido: true, cargas: [C('Chuveiro 7.500 W')] }] }) },
    { titulo: 'Tomadas na área externa', desc: 'Varanda com iluminação e tomadas para churrasqueira elétrica.', gera: () => ({ tipo: 'residencial', nome: 'Área externa', ligacao: 'mono127', comodos: [
      { nome: 'Varanda', area: 15, dist: 14, umido: true, cargas: [C('Luminária LED 24 W', 0, 3), C('Tomada de cozinha/lavanderia', 0, 2), C('Tomada de uso geral', 0, 2)] }] }) },
    { titulo: 'Home office com ar-condicionado', desc: 'Escritório com computador, iluminação e ar de 12.000 BTU.', gera: () => ({ tipo: 'residencial', nome: 'Home office', ligacao: 'bi127', comodos: [
      { nome: 'Escritório', area: 9, dist: 8, umido: false, cargas: [C('Luminária LED 24 W', 0, 2), C('Tomada de uso geral', 0, 6), C('Ar-condicionado 12.000 BTU')] }] }) },
    { titulo: 'Kit solar para camping', desc: 'Luzes, celulares e ventilador em 12 V, 1 dia de autonomia.', gera: () => ({ tipo: 'solar', nome: 'Kit camping', sist: 12, hsp: 5, aut: 1, bat: 'chumbo', painelW: 100, cargas: [C('Lâmpada LED 12 V 7 W', 0, 3), C('Celular (carga)', 0, 3), C('Ventilador')] }) },
    { titulo: 'Sítio com energia solar', desc: 'Geladeira, TV, luzes e bomba, bateria de lítio, 2 dias de autonomia.', gera: () => ({ tipo: 'solar', nome: 'Sítio off-grid', sist: 24, hsp: 4.5, aut: 2, bat: 'litio', painelW: 550, cargas: [C('Lâmpada LED 12 V 7 W', 0, 6), C('Geladeira pequena'), C('TV LED 32"'), C('Celular (carga)', 0, 2), C('Bomba d\'água 12 V'), C('Roteador Wi-Fi')] }) },
    { titulo: 'Projeto residencial em branco', desc: 'Comece do zero adicionando cômodos e aparelhos.', gera: () => ({ tipo: 'residencial', nome: 'Meu projeto', ligacao: 'bi127', comodos: [{ nome: 'Cômodo 1', area: 10, dist: 8, umido: false, cargas: [] }] }) },
    { titulo: 'Projeto solar em branco', desc: 'Liste seus aparelhos e horas de uso.', gera: () => ({ tipo: 'solar', nome: 'Meu sistema solar', sist: 12, hsp: 4.5, aut: 1, bat: 'chumbo', painelW: 150, cargas: [] }) }
  ];

  /* ---------- Cálculo residencial ---------- */
  function dimensiona(c) {
    const In = DISJ.find(d => d >= c.I * 1.1) || null; // folga de 10% sobre a corrente de projeto
    let idx = CABOS.findIndex(([s, iz]) => s >= c.min && In && iz >= In);
    if (idx < 0) return Object.assign(c, { In, S: null, dv: null });
    const dv = (S) => (2 * c.L * c.I * RHO / S) / c.V * 100;
    while (dv(CABOS[idx][0]) > 4 && idx < CABOS.length - 1) idx++;
    return Object.assign(c, { In, S: CABOS[idx][0], dv: dv(CABOS[idx][0]) });
  }
  function calcResidencial(p) {
    const vFN = p.ligacao === 'mono220' ? 220 : 127, tem220 = p.ligacao !== 'mono127';
    const circ = [], alertas = [];
    const grupos = { ilum: [], tugSeco: [], tugUmido: [] };
    p.comodos.forEach(cm => cm.cargas.forEach(cg => {
      for (let k = 0; k < (cg.qtd || 1); k++) {
        if (cg.tipo === 'tue') {
          const V = cg.v220 && tem220 ? 220 : vFN;
          circ.push({ desc: `${cg.nome} (${cm.nome})`, tipo: 'TUE', V, VA: cg.w, L: cm.dist, min: 2.5, dr: cm.umido || /chuveiro|torneira/i.test(cg.nome), ff: V === 220 && vFN === 127 });
        } else grupos[cg.tipo === 'ilum' ? 'ilum' : (cm.umido ? 'tugUmido' : 'tugSeco')].push({ cm, w: cg.w });
      }
    }));
    const agrupa = (lista, limA, tipo, nomeBase, min, dr) => {
      let atual = null, n = 0;
      lista.forEach(({ cm, w }) => {
        if (!atual || (atual.VA + w) / vFN > limA) { n++; atual = { desc: nomeBase + (n > 1 ? ' ' + n : ''), comodos: new Set(), tipo, V: vFN, VA: 0, L: 0, min, dr: dr || false }; circ.push(atual); }
        atual.VA += w; atual.comodos.add(cm.nome); atual.L = Math.max(atual.L, cm.dist); if (cm.umido) atual.dr = true;
      });
    };
    agrupa(grupos.ilum, vFN === 127 ? 10 : 8, 'Iluminação', 'Iluminação', 1.5);
    agrupa(grupos.tugSeco, 16, 'TUG', 'Tomadas', 2.5);
    agrupa(grupos.tugUmido, 16, 'TUG', 'Tomadas áreas molhadas', 2.5, true);
    circ.forEach(c => { if (c.comodos) c.desc += ': ' + [...c.comodos].join(', '); c.L = c.L + 3; c.I = c.VA / c.V; dimensiona(c); });
    circ.sort((a, b) => ({ Iluminação: 0, TUG: 1, TUE: 2 }[a.tipo] - { Iluminação: 0, TUG: 1, TUE: 2 }[b.tipo]));
    // fases (bifásico): distribui circuitos 127 V entre F1 e F2 pela maior carga
    const carga = { F1: 0, F2: 0 };
    [...circ].sort((a, b) => b.VA - a.VA).forEach(c => {
      if (p.ligacao !== 'bi127') { c.fase = p.ligacao === 'mono220' ? 'F + N' : 'F + N'; return; }
      if (c.ff) { c.fase = 'F1 + F2'; carga.F1 += c.VA / 2; carga.F2 += c.VA / 2; }
      else { const f = carga.F1 <= carga.F2 ? 'F1' : 'F2'; c.fase = f + ' + N'; carga[f] += c.VA; }
    });
    // demanda simplificada
    const ilumTug = circ.filter(c => c.tipo !== 'TUE').reduce((s, c) => s + c.VA, 0);
    const tues = circ.filter(c => c.tipo === 'TUE').map(c => c.VA).sort((a, b) => b - a);
    const instalada = ilumTug + tues.reduce((s, x) => s + x, 0);
    const demanda = ilumTug * 0.6 + (tues[0] || 0) + tues.slice(1).reduce((s, x) => s + x, 0) * 0.6;
    const Vger = p.ligacao === 'bi127' ? 220 : vFN;
    const Iger = p.ligacao === 'bi127' ? Math.max(carga.F1, carga.F2) * (instalada ? demanda / instalada : 0) / 127 : demanda / Vger;
    const geral = dimensiona({ I: Iger, V: Vger === 220 && p.ligacao === 'bi127' ? 127 : Vger, L: 15, min: 6 });
    // alertas
    circ.forEach(c => {
      if (!c.In) alertas.push(['erro', `${c.desc}: ${fmt(c.I)} A é corrente alta demais para um circuito residencial comum. Revise a ligação (220 V ou trifásico).`]);
      else if (c.I > 40 && c.V === 127) alertas.push(['erro', `${c.desc}: ${fmt(c.I)} A em 127 V. Peça ligação bifásica e use 220 V para este aparelho.`]);
    });
    if (circ.some(c => c.dr)) alertas.push(['aviso', 'Há circuitos em áreas molhadas ou com chuveiro: DR de 30 mA obrigatório (NBR 5410). A forma mais simples é um DR geral na entrada do quadro.']);
    if (p.ligacao === 'mono127' && demanda > 8000) alertas.push(['aviso', `Demanda estimada de ${fmt(demanda / 1000)} kW é alta para ligação monofásica 127 V. Consulte a concessionária sobre ligação bifásica.`]);
    if (circ.some(c => c.dv > 3.5 && c.S)) alertas.push(['aviso', 'Algum circuito ficou próximo do limite de 4% de queda de tensão. A bitola já foi aumentada quando preciso.']);
    if (p.ligacao === 'bi127' && carga.F1 + carga.F2 > 0) { const d = Math.abs(carga.F1 - carga.F2) / Math.max(carga.F1, carga.F2) * 100; if (d > 30) alertas.push(['aviso', `As fases ficaram desequilibradas (${Math.round(d)}%). Tente mover cargas de 127 V entre F1 e F2.`]); }
    alertas.push(['info', 'Inclua um DPS por fase no quadro e deixe espaço reserva para circuitos futuros.']);
    // materiais
    const metros = {};
    circ.forEach(c => { if (c.S) metros[c.S] = (metros[c.S] || 0) + c.L * (c.tipo === 'Iluminação' ? 4 : 3) * 1.15; });
    const disj = {}; circ.forEach(c => { if (c.In) { const k = `${c.In} A ${c.ff ? 'bipolar' : 'monopolar'}`; disj[k] = (disj[k] || 0) + 1; } });
    return { circ, alertas, instalada, demanda, geral, carga, metros, disj, vFN };
  }

  /* ---------- Cálculo solar ---------- */
  function calcSolar(p) {
    const wh = p.cargas.reduce((s, c) => s + c.w * c.h * (c.qtd || 1), 0);
    const pico = p.cargas.reduce((s, c) => s + c.w * (c.qtd || 1), 0);
    const painel = wh / (p.hsp * 0.8);
    const nMod = Math.max(1, Math.ceil(painel / p.painelW));
    const dod = p.bat === 'litio' ? 0.8 : 0.5;
    const ah = wh * p.aut / (p.sist * dod);
    const ctrl = nMod * p.painelW / p.sist * 1.25;
    const INV = [300, 500, 1000, 1500, 2000, 3000, 5000];
    const inv = INV.find(x => x >= pico * 1.25) || INV[INV.length - 1];
    const iInv = inv / p.sist / 0.9;
    const cabo = [[20, 4], [32, 6], [45, 10], [60, 16], [85, 25], [110, 35], [140, 50], [999, 70]].find(([i]) => i >= iInv * 1.25)[1];
    const fus = [10, 15, 20, 25, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250].find(x => x >= iInv * 1.25) || 250;
    const alertas = [];
    if (pico * 1.25 > INV[INV.length - 1]) alertas.push(['erro', 'Potência simultânea acima de 5 kW: considere dividir as cargas ou um sistema de 48 V.']);
    if (iInv > 100 && p.sist === 12) alertas.push(['aviso', `Em 12 V o inversor puxa ${Math.round(iInv)} A da bateria. Use 24 V ou 48 V para reduzir corrente e bitola.`]);
    if (p.bat === 'chumbo' && p.aut > 2) alertas.push(['aviso', 'Muitos dias de autonomia com chumbo-ácido deixam o banco enorme. Lítio costuma compensar.']);
    alertas.push(['info', 'Ligue o controlador na bateria antes do painel. Fusível em toda ligação com a bateria.']);
    return { wh, pico, painel, nMod, ah, ctrl, inv, iInv, cabo, fus, alertas, dod };
  }

  /* ---------- Telas ---------- */
  let atual = null;
  const E = () => window.SM.estado();

  function lista(el) {
    const ps = E().projetos;
    el.innerHTML = `<header class="licao-cab"><span class="eyebrow">Criar projeto</span><h1>Projetos do dia a dia</h1>
      <p class="muted" style="max-width:65ch">Escolha um modelo ou comece em branco. O Smath divide os circuitos, calcula corrente, bitola do fio, disjuntor, DR e queda de tensão, e gera a lista de materiais.</p></header>
      ${ps.length ? `<section><div class="secao-tit"><h2>Meus projetos</h2></div><div class="modelos">${ps.map(p => `<button class="modelo" data-abrir="${p.id}"><span class="eyebrow">${p.tipo === 'solar' ? 'Solar off-grid (CC)' : 'Residencial (CA)'}</span><h3>${esc(p.nome)}</h3><small>${p.tipo === 'solar' ? p.cargas.length + ' aparelhos' : p.comodos.length + ' cômodos'}</small></button>`).join('')}</div></section>` : ''}
      <section><div class="secao-tit"><h2>Modelos prontos</h2></div><div class="modelos">${MODELOS.map((m, i) => `<button class="modelo" data-modelo="${i}"><h3>${esc(m.titulo)}</h3><small>${esc(m.desc)}</small></button>`).join('')}</div></section>
      <p class="muted" style="font-size:.88rem">Os projetos ficam salvos neste navegador. O cálculo é didático, baseado na NBR 5410: para executar uma obra, valide com um eletricista ou engenheiro habilitado.</p>`;
    el.querySelectorAll('[data-modelo]').forEach(b => b.onclick = () => { atual = Object.assign({ id: novoId(), salvo: false }, MODELOS[+b.dataset.modelo].gera()); editor(el); });
    el.querySelectorAll('[data-abrir]').forEach(b => b.onclick = () => { atual = JSON.parse(JSON.stringify(E().projetos.find(p => p.id === b.dataset.abrir))); atual.salvo = true; editor(el); });
  }

  function cabecalho(p) {
    return `<nav class="migalha"><a href="#projetos" id="voltar">Projetos</a> / <span>${esc(p.nome)}</span></nav>
      <div class="cartao"><div class="form-linha">
        <div class="ctrl" style="flex:2 1 240px"><label for="p-nome">Nome do projeto</label><input id="p-nome" value="${esc(p.nome)}"></div>
        ${p.tipo === 'residencial' ? `<div class="ctrl"><label for="p-lig">Ligação</label><select id="p-lig">
          <option value="mono127" ${p.ligacao === 'mono127' ? 'selected' : ''}>Monofásico 127 V</option>
          <option value="bi127" ${p.ligacao === 'bi127' ? 'selected' : ''}>Bifásico 127/220 V</option>
          <option value="mono220" ${p.ligacao === 'mono220' ? 'selected' : ''}>Monofásico 220 V</option></select></div>`
        : `<div class="ctrl"><label for="p-sist">Tensão do banco</label><select id="p-sist">${[12, 24, 48].map(v => `<option ${p.sist === v ? 'selected' : ''} value="${v}">${v} V</option>`).join('')}</select></div>
          <div class="ctrl"><label for="p-bat">Bateria</label><select id="p-bat"><option value="chumbo" ${p.bat === 'chumbo' ? 'selected' : ''}>Chumbo-ácido (50%)</option><option value="litio" ${p.bat === 'litio' ? 'selected' : ''}>Lítio LiFePO4 (80%)</option></select></div>
          <div class="ctrl"><label for="p-hsp">Horas de sol pleno</label><input id="p-hsp" type="number" step="0.1" min="2" max="7" value="${p.hsp}"></div>
          <div class="ctrl"><label for="p-aut">Dias de autonomia</label><input id="p-aut" type="number" min="1" max="5" value="${p.aut}"></div>
          <div class="ctrl"><label for="p-pw">Painel (W cada)</label><input id="p-pw" type="number" step="10" min="50" value="${p.painelW}"></div>`}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn prim" id="p-salvar">${p.salvo ? 'Salvar alterações' : 'Salvar projeto'}</button>${p.salvo ? '<button class="btn" id="p-dup">Duplicar</button><button class="btn" id="p-del">Excluir</button>' : ''}<span id="p-msg" class="muted" style="align-self:center"></span></div></div>`;
  }

  function editor(el) {
    const p = atual;
    const corpo = p.tipo === 'solar' ? editorSolar(p) : editorResidencial(p);
    el.innerHTML = `<header class="licao-cab"><span class="eyebrow">${p.tipo === 'solar' ? 'Projeto solar off-grid (corrente contínua)' : 'Projeto residencial (corrente alternada)'}</span><h1>${esc(p.nome)}</h1></header>${cabecalho(p)}${corpo}`;
    const re = () => editor(el);
    el.querySelector('#voltar').onclick = (e) => { e.preventDefault(); atual = null; lista(el); };
    el.querySelector('#p-nome').onchange = (e) => { p.nome = e.target.value || 'Projeto'; re(); };
    const bind = (id, k, num) => { const i = el.querySelector(id); if (i) i.onchange = (e) => { p[k] = num ? +e.target.value : e.target.value; re(); }; };
    bind('#p-lig', 'ligacao'); bind('#p-sist', 'sist', 1); bind('#p-bat', 'bat'); bind('#p-hsp', 'hsp', 1); bind('#p-aut', 'aut', 1); bind('#p-pw', 'painelW', 1);
    el.querySelector('#p-salvar').onclick = () => {
      const ps = E().projetos, i = ps.findIndex(x => x.id === p.id); p.salvo = true;
      const copia = JSON.parse(JSON.stringify(p)); i >= 0 ? ps[i] = copia : ps.push(copia); window.SM.salvar(); re(); el.querySelector('#p-msg').textContent = 'Projeto salvo.';
    };
    const dup = el.querySelector('#p-dup'); if (dup) dup.onclick = () => { atual = JSON.parse(JSON.stringify(p)); atual.id = novoId(); atual.nome += ' (cópia)'; atual.salvo = false; re(); };
    const del = el.querySelector('#p-del');
    if (del) del.onclick = () => {
      if (del.dataset.conf) { const ps = E().projetos; ps.splice(ps.findIndex(x => x.id === p.id), 1); window.SM.salvar(); atual = null; lista(el); }
      else { del.dataset.conf = 1; del.textContent = 'Clique de novo para excluir'; del.classList.add('escuro'); }
    };
    if (p.tipo === 'solar') ligaSolar(el, p, re); else ligaResidencial(el, p, re);
  }

  function editorResidencial(p) {
    const r = calcResidencial(p);
    const opts = (tipo) => CATALOGO.map((c, i) => `<option value="${i}">${esc(c.nome)} (${c.w} W)</option>`).join('');
    return `
    <section class="duas" style="align-items:start">
      <div class="cartao"><div class="secao-tit" style="margin:0"><h3>Cômodos e aparelhos</h3><button class="btn peq" id="add-comodo">+ Cômodo</button></div>
        <div class="comodos">${p.comodos.map((cm, ci) => `<div class="comodo" data-ci="${ci}">
          <div class="comodo-cab"><input class="cm-nome" value="${esc(cm.nome)}" aria-label="Nome do cômodo" style="font-weight:700;border:0;background:transparent;font-size:1.05rem;min-width:0;flex:1"><button class="x rm-comodo" aria-label="Remover cômodo">×</button></div>
          <div class="form-linha">
            <div class="ctrl"><label>Área (m²)</label><input class="cm-area" type="number" min="1" value="${cm.area}"></div>
            <div class="ctrl"><label>Distância do quadro (m)</label><input class="cm-dist" type="number" min="1" value="${cm.dist}"></div>
            <label style="display:flex;gap:6px;align-items:center;font-size:.9rem;padding-bottom:8px"><input class="cm-umido" type="checkbox" ${cm.umido ? 'checked' : ''}> Área molhada</label>
          </div>
          <div class="cargas">${cm.cargas.map((cg, gi) => `<div class="carga" data-gi="${gi}"><span>${esc(cg.nome)} ${cg.tipo === 'tue' ? '<span class="pill aviso">exclusivo</span>' : ''}</span><input class="cg-qtd" type="number" min="1" value="${cg.qtd}" aria-label="Quantidade"><input class="cg-w" type="number" min="1" value="${cg.w}" aria-label="Potência em W"><button class="x rm-carga" aria-label="Remover">×</button></div>`).join('') || '<span class="muted" style="font-size:.9rem">Nenhum aparelho. Adicione abaixo.</span>'}
          ${cm.cargas.length ? '<div class="carga muted" style="font-size:.75rem"><span></span><span>qtd</span><span>W cada</span><span></span></div>' : ''}</div>
          <div class="form-linha"><div class="ctrl"><select class="cg-novo" aria-label="Adicionar aparelho"><option value="">+ Adicionar aparelho ou ponto…</option>${opts()}</select></div></div>
          ${cm.cargas.some(c => c.tipo === 'ilum') ? '' : `<span class="muted" style="font-size:.85rem">A NBR 5410 pede ao menos um ponto de luz no teto por cômodo. Sugestão para ${cm.area} m²: ${100 + Math.floor(Math.max(0, cm.area - 6) / 4) * 60} VA de iluminação prevista.</span>`}
        </div>`).join('')}</div></div>

      <div style="display:grid;gap:14px;min-width:0">
        <div class="resumo-proj">
          <div class="stat"><span class="eyebrow">Circuitos</span><b class="num">${r.circ.length}</b></div>
          <div class="stat"><span class="eyebrow">Carga instalada</span><b class="num">${fmt(r.instalada / 1000)} kW</b></div>
          <div class="stat"><span class="eyebrow">Demanda estimada</span><b class="num">${fmt(r.demanda / 1000)} kW</b></div>
          <div class="stat"><span class="eyebrow">Disjuntor geral</span><b class="num">${r.geral.In ? r.geral.In + ' A' : '—'}</b></div>
        </div>
        <div class="msgs">${r.alertas.map(([t, m]) => `<div class="msg ${t === 'info' ? 'ok' : t}">${esc(m)}</div>`).join('')}</div>
      </div>
    </section>

    <section class="cartao"><h3>Quadro de cargas</h3>
      <div class="tb-wrap"><table class="tb"><thead><tr><th>#</th><th>Circuito</th><th>Tensão</th><th>${p.ligacao === 'bi127' ? 'Fases' : 'Condutores'}</th><th>Potência</th><th>Corrente</th><th>Fio</th><th>Disjuntor</th><th>Queda</th><th>DR</th></tr></thead><tbody>
      ${r.circ.map((c, i) => `<tr><td class="num">${i + 1}</td><td>${esc(c.desc)}</td><td class="num">${c.V} V</td><td class="num">${c.fase}</td><td class="num">${Math.round(c.VA)} VA</td><td class="num">${fmt(c.I)} A</td><td class="num">${c.S ? fmt(c.S, c.S < 2 || c.S === 2.5 ? 1 : 0) + ' mm²' : '—'}</td><td class="num">${c.In ? c.In + ' A' + (c.ff ? ' 2P' : '') : '—'}</td><td class="num">${c.dv != null ? fmt(c.dv) + '%' : '—'}</td><td>${c.dr ? '<span class="pill dr">30 mA</span>' : '<span class="pill ok">opcional</span>'}</td></tr>`).join('') || '<tr><td colspan="10" class="muted">Adicione aparelhos para gerar os circuitos.</td></tr>'}
      </tbody></table></div>
      <p class="muted" style="font-size:.85rem;margin:0">Comprimento considerado = distância do quadro + 3 m de descidas. Capacidade dos fios: cobre/PVC embutido, método B1. Demanda: simplificação didática (iluminação e tomadas 60%, maior aparelho exclusivo 100%, demais 60%).</p>
    </section>

    <section class="cartao"><h3>Lista de materiais (estimativa)</h3>
      <div class="duas"><div><p class="eyebrow">Cabos</p><ul>${Object.entries(r.metros).sort((a, b) => a[0] - b[0]).map(([s, m]) => `<li><span class="num">${Math.ceil(m)} m</span> de cabo ${fmt(s, s == 2.5 || s == 1.5 ? 1 : 0)} mm², dividido entre fase, neutro, terra${s == 1.5 ? ' e retorno' : ''} nas cores corretas</li>`).join('') || '<li class="muted">—</li>'}</ul></div>
      <div><p class="eyebrow">Proteção</p><ul>${Object.entries(r.disj).map(([k, n]) => `<li><span class="num">${n}×</span> disjuntor ${k}, curva C</li>`).join('')}
        ${r.geral.In ? `<li>1× disjuntor geral ${r.geral.In} A ${p.ligacao === 'bi127' ? 'bipolar' : ''} (confirme com a concessionária)</li>` : ''}
        ${r.circ.some(c => c.dr) ? `<li>1× IDR ${p.ligacao === 'bi127' ? '4' : '2'} polos 30 mA, corrente nominal ≥ disjuntor geral</li>` : ''}
        <li>${p.ligacao === 'bi127' ? '3' : '2'}× DPS classe II (${r.vFN === 127 ? '175' : '275'} V)</li></ul></div></div>
    </section>`;
  }
  function ligaResidencial(el, p, re) {
    el.querySelector('#add-comodo').onclick = () => { p.comodos.push({ nome: 'Cômodo ' + (p.comodos.length + 1), area: 10, dist: 8, umido: false, cargas: [] }); re(); };
    el.querySelectorAll('.comodo').forEach(box => {
      const cm = p.comodos[+box.dataset.ci];
      box.querySelector('.cm-nome').onchange = (e) => { cm.nome = e.target.value; re(); };
      box.querySelector('.cm-area').onchange = (e) => { cm.area = Math.max(1, +e.target.value); re(); };
      box.querySelector('.cm-dist').onchange = (e) => { cm.dist = Math.max(1, +e.target.value); re(); };
      box.querySelector('.cm-umido').onchange = (e) => { cm.umido = e.target.checked; re(); };
      box.querySelector('.rm-comodo').onclick = () => { p.comodos.splice(+box.dataset.ci, 1); re(); };
      box.querySelector('.cg-novo').onchange = (e) => { if (e.target.value !== '') { cm.cargas.push(Object.assign({}, CATALOGO[+e.target.value], { qtd: 1 })); re(); } };
      box.querySelectorAll('.carga[data-gi]').forEach(row => {
        const cg = cm.cargas[+row.dataset.gi];
        row.querySelector('.cg-qtd').onchange = (e) => { cg.qtd = Math.max(1, +e.target.value); re(); };
        row.querySelector('.cg-w').onchange = (e) => { cg.w = Math.max(1, +e.target.value); re(); };
        row.querySelector('.rm-carga').onclick = () => { cm.cargas.splice(+row.dataset.gi, 1); re(); };
      });
    });
  }

  function editorSolar(p) {
    const r = calcSolar(p);
    return `<section class="duas" style="align-items:start">
      <div class="cartao"><h3>Aparelhos e horas de uso por dia</h3>
        <div class="cargas">${p.cargas.map((c, i) => `<div class="carga" data-i="${i}" style="grid-template-columns:minmax(0,1fr) 56px 70px 64px 28px"><span>${esc(c.nome)}</span><input class="s-qtd" type="number" min="1" value="${c.qtd}" aria-label="Quantidade"><input class="s-w" type="number" min="1" value="${c.w}" aria-label="Watts"><input class="s-h" type="number" min="0" step="0.5" value="${c.h}" aria-label="Horas por dia"><button class="x s-rm" aria-label="Remover">×</button></div>`).join('') || '<span class="muted">Nenhum aparelho.</span>'}
        ${p.cargas.length ? '<div class="carga muted" style="font-size:.75rem;grid-template-columns:minmax(0,1fr) 56px 70px 64px 28px"><span></span><span>qtd</span><span>W</span><span>h/dia</span><span></span></div>' : ''}</div>
        <div class="ctrl"><select id="s-novo" aria-label="Adicionar aparelho"><option value="">+ Adicionar aparelho…</option>${CAT_SOLAR.map((c, i) => `<option value="${i}">${esc(c.nome)} (${c.w} W)</option>`).join('')}</select></div>
        <figure class="ilustra" style="margin:0">${window.ILUSTRACOES.solar()}</figure>
      </div>
      <div style="display:grid;gap:14px;min-width:0">
        <div class="resumo-proj" style="grid-template-columns:repeat(2,minmax(0,1fr))">
          <div class="stat"><span class="eyebrow">Consumo diário</span><b class="num">${Math.round(r.wh)} Wh</b></div>
          <div class="stat"><span class="eyebrow">Potência simultânea</span><b class="num">${Math.round(r.pico)} W</b></div>
        </div>
        <div class="cartao"><h3>Dimensionamento</h3>
          <div class="tb-wrap"><table class="tb"><tbody>
            <tr><td>Painéis</td><td class="num"><b>${r.nMod} × ${p.painelW} W</b> (mínimo calculado ${Math.round(r.painel)} W)</td></tr>
            <tr><td>Banco de baterias</td><td class="num"><b>${Math.ceil(r.ah)} Ah em ${p.sist} V</b> (${p.bat === 'litio' ? 'lítio' : 'chumbo-ácido'}, descarga de ${Math.round(r.dod * 100)}%, ${p.aut} dia${p.aut > 1 ? 's' : ''})</td></tr>
            <tr><td>Controlador de carga</td><td class="num"><b>${Math.ceil(r.ctrl / 10) * 10} A</b> ${p.nMod > 1 || p.painelW > 200 ? 'MPPT' : 'PWM ou MPPT'}, ${p.sist} V</td></tr>
            <tr><td>Inversor</td><td class="num"><b>${r.inv} W</b> onda senoidal pura</td></tr>
            <tr><td>Cabo bateria–inversor</td><td class="num"><b>${r.cabo} mm²</b> (${Math.round(r.iInv)} A), trecho curto</td></tr>
            <tr><td>Fusível da bateria</td><td class="num"><b>${r.fus} A</b> CC, a até 20 cm do positivo</td></tr>
          </tbody></table></div>
          <p class="muted" style="font-size:.85rem;margin:0">Painel = consumo ÷ (horas de sol × 0,8). Bateria = consumo × dias ÷ (tensão × descarga). Controlador = corrente dos painéis × 1,25.</p>
        </div>
        <div class="msgs">${r.alertas.map(([t, m]) => `<div class="msg ${t === 'info' ? 'ok' : t}">${esc(m)}</div>`).join('')}</div>
      </div></section>`;
  }
  function ligaSolar(el, p, re) {
    el.querySelector('#s-novo').onchange = (e) => { if (e.target.value !== '') { p.cargas.push(Object.assign({}, CAT_SOLAR[+e.target.value], { qtd: 1 })); re(); } };
    el.querySelectorAll('.carga[data-i]').forEach(row => {
      const c = p.cargas[+row.dataset.i];
      row.querySelector('.s-qtd').onchange = (e) => { c.qtd = Math.max(1, +e.target.value); re(); };
      row.querySelector('.s-w').onchange = (e) => { c.w = Math.max(1, +e.target.value); re(); };
      row.querySelector('.s-h').onchange = (e) => { c.h = Math.max(0, +e.target.value); re(); };
      row.querySelector('.s-rm').onclick = () => { p.cargas.splice(+row.dataset.i, 1); re(); };
    });
  }

  window.Projetos = { render(el) { atual = null; lista(el); }, _calcResidencial: calcResidencial, _calcSolar: calcSolar, _modelos: MODELOS };
})();
