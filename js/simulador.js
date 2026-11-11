/* Smath Elétrica — simuladores: bancada de ligações (CA), circuito CC e calculadora. */
(function () {
  const { esc } = window.SM;
  const COR = {
    fase: { n: 'Fase (vermelho)', v: 'var(--fase)' },
    preto: { n: 'Fase (preto)', v: 'var(--fase-2)' },
    neutro: { n: 'Neutro (azul-claro)', v: 'var(--neutro)' },
    terra: { n: 'Terra (verde-amarelo)', v: 'var(--terra)' },
    retorno: { n: 'Retorno (amarelo)', v: 'var(--retorno)' }
  };

  /* ---------- Exercícios da bancada ---------- */
  const EX = {
    simples: {
      nome: 'Interruptor simples + lâmpada', licao: 'inst-interruptor',
      objetivo: 'Faça a lâmpada acender pelo interruptor. Ao desligar, a lâmpada deve ficar sem fase.',
      comps: [
        { id: 'S1', tipo: 'sw2', x: 330, y: 250, nome: 'Interruptor' },
        { id: 'L', tipo: 'lamp', x: 580, y: 100, nome: 'Lâmpada' }
      ],
      solucao: [['src.F', 'S1.a', 'fase'], ['S1.b', 'L.1', 'retorno'], ['src.N', 'L.2', 'neutro']]
    },
    tomada: {
      nome: 'Tomada 2P+T', licao: 'inst-tomada',
      objetivo: 'Ligue a tomada com fase, neutro e terra nos bornes certos.',
      comps: [{ id: 'TM', tipo: 'tomada', x: 470, y: 160, nome: 'Tomada' }],
      solucao: [['src.F', 'TM.F', 'fase'], ['src.N', 'TM.N', 'neutro'], ['src.T', 'TM.T', 'terra']]
    },
    threeway: {
      nome: 'Three-way (dois pontos)', licao: 'inst-threeway',
      objetivo: 'Comande a lâmpada pelos dois interruptores paralelos. Qualquer um deve mudar o estado da lâmpada.',
      comps: [
        { id: 'P1', tipo: 'sw3', x: 280, y: 260, nome: 'Paralelo 1' },
        { id: 'P2', tipo: 'sw3', x: 480, y: 260, nome: 'Paralelo 2' },
        { id: 'L', tipo: 'lamp', x: 620, y: 100, nome: 'Lâmpada' }
      ],
      solucao: [['src.F', 'P1.C', 'fase'], ['P1.A', 'P2.A', 'retorno'], ['P1.B', 'P2.B', 'retorno'], ['P2.C', 'L.1', 'retorno'], ['src.N', 'L.2', 'neutro']]
    }
  };

  // Posição dos bornes de cada componente
  function bornes(c) {
    if (c.tipo === 'sw2') return { a: [c.x - 30, c.y + 20, 'entrada'], b: [c.x + 30, c.y + 20, 'saída'] };
    if (c.tipo === 'sw3') return { C: [c.x, c.y + 40, 'comum'], A: [c.x - 34, c.y - 20, 'A'], B: [c.x + 34, c.y - 20, 'B'] };
    if (c.tipo === 'lamp') return { 1: [c.x - 26, c.y + 50, 'centro'], 2: [c.x + 26, c.y + 50, 'rosca'] };
    if (c.tipo === 'tomada') return { F: [c.x - 40, c.y + 90, 'L'], N: [c.x + 40, c.y + 90, 'N'], T: [c.x, c.y + 110, '⏚'] };
    return {};
  }
  const FONTE = { 'src.F': [70, 90, 'F'], 'src.N': [70, 160, 'N'], 'src.T': [70, 230, 'T'] };

  let S = { aba: 'bancada', ex: 'simples', fios: [], sel: null, cor: 'fase', ligado: false, est: {}, cc: { V: 12, modo: 'serie', n: 2, R: 6, fus: 5, queim: [], curto: false } };

  function posTerm(ex, id) {
    if (FONTE[id]) return FONTE[id];
    const [cid, t] = id.split('.');
    const c = ex.comps.find(x => x.id === cid);
    return bornes(c)[t];
  }
  function resetEstados(ex) { S.est = {}; ex.comps.forEach(c => { if (c.tipo === 'sw2') S.est[c.id] = false; if (c.tipo === 'sw3') S.est[c.id] = 'A'; }); }

  /* ---------- Análise elétrica por união de nós ---------- */
  function nets(ex, est) {
    const pai = {};
    const f = (a) => { pai[a] = pai[a] || a; return pai[a] === a ? a : (pai[a] = f(pai[a])); };
    const u = (a, b) => { pai[f(a)] = f(b); };
    S.fios.forEach(w => u(w.a, w.b));
    ex.comps.forEach(c => {
      if (c.tipo === 'sw2' && est[c.id]) u(c.id + '.a', c.id + '.b');
      if (c.tipo === 'sw3') u(c.id + '.C', c.id + '.' + est[c.id]);
    });
    return f;
  }
  function avaliar(ex, est) {
    const f = nets(ex, est), F = f('src.F'), N = f('src.N'), T = f('src.T');
    const r = { curto: F === N, fugaT: F === T, nt: N === T && F !== N };
    const L = ex.comps.find(c => c.tipo === 'lamp');
    if (L) {
      const a = f('L.1'), b = f('L.2');
      r.acesa = !r.curto && ((a === F && b === N) || (a === N && b === F));
      r.faseNaLampada = !r.acesa && (a === F || b === F);
      r.lampCurto = a === b && a === F;
    }
    const TM = ex.comps.find(c => c.tipo === 'tomada');
    if (TM) { r.tF = f('TM.F'); r.tN = f('TM.N'); r.tT = f('TM.T'); r.F = F; r.N = N; r.T = T; }
    return r;
  }
  function combinacoes(ex) {
    const sws = ex.comps.filter(c => c.tipo === 'sw2' || c.tipo === 'sw3');
    let lista = [{}];
    sws.forEach(c => { const op = c.tipo === 'sw2' ? [false, true] : ['A', 'B']; lista = lista.flatMap(e => op.map(o => Object.assign({}, e, { [c.id]: o }))); });
    return { sws, lista };
  }
  function diagnostico(ex) {
    const out = [];
    if (!S.fios.length) return [{ t: 'aviso', m: 'Nenhum fio ligado ainda. Escolha a cor do fio e clique em dois bornes para conectar.' }];
    const { sws, lista } = combinacoes(ex);
    const res = lista.map(e => ({ e, r: avaliar(ex, e) }));
    if (res.some(x => x.r.curto)) out.push({ t: 'erro', m: 'Curto-circuito: em alguma posição a fase encontra o neutro sem passar por uma carga. O disjuntor desarmaria. Verifique se fase e neutro não chegam juntos no interruptor.' });
    if (res.some(x => x.r.fugaT)) out.push({ t: 'erro', m: 'A fase está ligada ao terra. Isso faz o DR desarmar e pode energizar carcaças metálicas.' });
    if (res.some(x => x.r.nt)) out.push({ t: 'aviso', m: 'Neutro ligado ao terra dentro da instalação. No esquema TN-S eles só se unem no padrão de entrada; com DR, ele desarma.' });
    // cores
    const f0 = nets(ex, lista[0]), F = f0('src.F'), N = f0('src.N'), T = f0('src.T');
    S.fios.forEach(w => {
      const n = f0(w.a);
      if (w.cor === 'terra' && n !== T) out.push({ t: 'erro', m: 'Fio verde-amarelo usado fora do terra. Essa cor é exclusiva do condutor de proteção.' });
      if (w.cor === 'neutro' && n !== N) out.push({ t: 'aviso', m: 'Fio azul-claro usado fora do neutro. Quem fizer manutenção vai achar que é neutro.' });
      if (n === N && w.cor !== 'neutro') out.push({ t: 'aviso', m: 'Um fio ligado ao neutro não está em azul-claro.' });
      if (n === T && w.cor !== 'terra') out.push({ t: 'aviso', m: 'Um fio ligado ao terra não está em verde-amarelo.' });
    });
    if (ex === EX.tomada) {
      const r = res[0].r;
      if (r.tT !== r.T) out.push({ t: 'erro', m: 'O borne central (terra) da tomada não está ligado ao terra.' });
      if (r.tF === r.N && r.tN === r.F) out.push({ t: 'aviso', m: 'Fase e neutro invertidos na tomada. Funciona, mas padronize a posição em toda a casa.' });
      else if (r.tF !== r.F || r.tN !== r.N) { if (!(r.tF === r.N && r.tN === r.F)) out.push({ t: 'erro', m: 'A tomada não está recebendo fase e neutro nos bornes L e N.' }); }
      if (!out.some(o => o.t === 'erro') && r.tT === r.T && ((r.tF === r.F && r.tN === r.N) || (r.tF === r.N && r.tN === r.F))) out.unshift({ t: 'ok', m: 'Tomada ligada corretamente: fase, neutro e terra no lugar. Medições esperadas: F-N 127 V, F-T 127 V, N-T ≈ 0 V.' });
    } else {
      if (res.some(x => x.r.faseNaLampada)) out.push({ t: 'erro', m: 'Com a lâmpada apagada ainda existe fase nela. O interruptor está cortando o neutro: quem trocar a lâmpada pode levar choque.' });
      const acesas = res.filter(x => x.r.acesa).length;
      if (!acesas) out.push({ t: 'aviso', m: 'Em nenhuma posição dos interruptores a lâmpada recebe fase e neutro. Confira o caminho fase → interruptor → retorno → lâmpada → neutro.' });
      else if (acesas === res.length) out.push({ t: 'aviso', m: 'A lâmpada fica acesa em todas as posições: o interruptor não está no caminho.' });
      else {
        const muda = sws.every(sw => res.every(x => {
          const outro = res.find(y => Object.keys(x.e).every(k => k === sw.id ? y.e[k] !== x.e[k] : y.e[k] === x.e[k]));
          return outro.r.acesa !== x.r.acesa;
        }));
        if (!muda) out.push({ t: 'aviso', m: 'Algum interruptor não muda o estado da lâmpada em todas as posições. No three-way, a fase vai no comum do primeiro e o retorno sai do comum do segundo.' });
        else if (!out.some(o => o.t === 'erro')) out.unshift({ t: 'ok', m: `Funcionou! Testei ${res.length} combinações: a lâmpada responde a ${sws.length > 1 ? 'qualquer um dos interruptores' : 'o interruptor'} e fica sem fase quando apagada.` });
      }
    }
    // remove duplicados
    return out.filter((o, i) => out.findIndex(x => x.m === o.m) === i);
  }

  /* ---------- Desenho da bancada ---------- */
  function desenhaBancada(ex) {
    const r = S.ligado ? avaliar(ex, S.est) : {};
    const termo = (id, x, y, lbl, cor = 'var(--ink)') => `<g class="terminal ${S.sel === id ? 'sel' : ''}" data-id="${id}"><circle class="t" cx="${x}" cy="${y}" r="8" fill="var(--copper)" stroke="${cor}" stroke-width="2"/><text x="${x}" y="${y + 24}" font-size="11" text-anchor="middle" fill="var(--muted)" font-family="var(--f-ui)">${lbl}</text></g>`;
    let s = `<rect x="20" y="40" width="100" height="240" rx="10" fill="var(--surface-2)" stroke="var(--muted)"/>
      <text x="70" y="62" text-anchor="middle" font-weight="700" font-size="13" fill="var(--ink)" font-family="var(--f-ui)">Quadro</text>
      <text x="70" y="300" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--f-ui)">127 V · 60 Hz</text>
      <circle cx="100" cy="62" r="5" fill="${S.ligado ? 'var(--ok)' : 'var(--muted)'}"/>`;
    let ts = termo('src.F', 70, 90, 'Fase', 'var(--fase)') + termo('src.N', 70, 160, 'Neutro', 'var(--neutro)') + termo('src.T', 70, 230, 'Terra', 'var(--terra)');
    ex.comps.forEach(c => {
      const b = bornes(c);
      if (c.tipo === 'sw2') {
        const on = S.est[c.id];
        s += `<g class="sw" data-sw="${c.id}" style="cursor:pointer"><rect x="${c.x - 45}" y="${c.y - 40}" width="90" height="70" rx="8" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/>
          <rect x="${c.x - 14}" y="${c.y - 28}" width="28" height="40" rx="4" fill="var(--surface-2)" stroke="var(--ink)"/><rect x="${c.x - 10}" y="${on ? c.y - 24 : c.y - 8}" width="20" height="16" rx="3" fill="${on ? 'var(--ok)' : 'var(--muted)'}"/>
          <text x="${c.x}" y="${c.y - 48}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)" font-family="var(--f-ui)">${c.nome}: ${on ? 'ligado' : 'desligado'}</text></g>`;
      }
      if (c.tipo === 'sw3') {
        const p = S.est[c.id], alvo = b[p];
        s += `<g class="sw" data-sw="${c.id}" style="cursor:pointer"><rect x="${c.x - 55}" y="${c.y - 45}" width="110" height="100" rx="8" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/>
          <line x1="${c.x}" y1="${c.y + 40}" x2="${alvo[0]}" y2="${alvo[1] + 6}" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
          <text x="${c.x}" y="${c.y - 54}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)" font-family="var(--f-ui)">${c.nome}: posição ${p}</text></g>`;
      }
      if (c.tipo === 'lamp') {
        const ac = S.ligado && r.acesa;
        s += `${ac ? `<circle cx="${c.x}" cy="${c.y}" r="48" fill="var(--glow)" opacity=".35"/>` : ''}<circle cx="${c.x}" cy="${c.y}" r="30" fill="${ac ? 'var(--glow)' : 'var(--surface-2)'}" stroke="var(--ink)" stroke-width="2"/>
          <path d="M${c.x - 10} ${c.y + 6} q5 -16 10 0 q5 -16 10 0" fill="none" stroke="var(--ink)" stroke-width="1.5"/><rect x="${c.x - 18}" y="${c.y + 28}" width="36" height="14" rx="3" fill="var(--muted)"/>
          <text x="${c.x}" y="${c.y - 42}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)" font-family="var(--f-ui)">${c.nome}${S.ligado ? (ac ? ': acesa' : ': apagada') : ''}</text>`;
      }
      if (c.tipo === 'tomada') {
        s += `<rect x="${c.x - 70}" y="${c.y - 70}" width="140" height="150" rx="18" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.5"/>
          <circle cx="${c.x}" cy="${c.y}" r="50" fill="var(--surface-2)" stroke="var(--ink)"/><circle cx="${c.x - 22}" cy="${c.y - 6}" r="6" fill="var(--ink)"/><circle cx="${c.x + 22}" cy="${c.y - 6}" r="6" fill="var(--ink)"/><circle cx="${c.x}" cy="${c.y + 18}" r="6" fill="var(--ink)"/>
          <text x="${c.x}" y="${c.y - 80}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)" font-family="var(--f-ui)">Tomada (vista por trás: bornes)</text>`;
      }
      Object.entries(b).forEach(([k, [x, y, lbl]]) => { ts += termo(c.id + '.' + k, x, y, lbl); });
    });
    const fios = S.fios.map((w, i) => {
      const [x1, y1] = posTerm(ex, w.a), [x2, y2] = posTerm(ex, w.b);
      const d = `M${x1} ${y1} C${x1 + 40} ${y1 + 50} ${x2 - 40} ${y2 + 50} ${x2} ${y2}`;
      const terra = w.cor === 'terra' ? `<path d="${d}" fill="none" stroke="var(--terra-2)" stroke-width="5" stroke-dasharray="8 8" pointer-events="none"/>` : '';
      return `<g class="fio" data-i="${i}"><path d="${d}" fill="none" stroke="transparent" stroke-width="16"/><path d="${d}" fill="none" stroke="${COR[w.cor].v}" stroke-width="5" stroke-linecap="round"/>${terra}</g>`;
    }).join('');
    // ordem: corpos dos componentes, fios por cima, bornes por último (sempre clicáveis)
    return `<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">${s}${fios}${ts}</svg>`;
  }

  function viewBancada(box) {
    const ex = EX[S.ex];
    if (!Object.keys(S.est).length) resetEstados(ex);
    const live = S.ligado ? avaliar(ex, S.est) : null;
    const diag = S.mostrarDiag ? diagnostico(ex) : [];
    box.innerHTML = `
      <div class="form-linha" style="margin-bottom:14px">
        <div class="ctrl"><label for="sel-ex">Exercício</label><select id="sel-ex">${Object.entries(EX).map(([k, e]) => `<option value="${k}" ${k === S.ex ? 'selected' : ''}>${e.nome}</option>`).join('')}</select></div>
        <a class="btn peq" href="#licao-${ex.licao}">Ver a lição</a>
      </div>
      <div class="sim-grid">
        <div class="bancada">${desenhaBancada(ex)}</div>
        <div class="cartao">
          <span class="eyebrow">Objetivo</span><p style="margin:0">${ex.objetivo}</p>
          <span class="eyebrow">Cor do próximo fio</span>
          <div class="cores">${Object.entries(COR).map(([k, c]) => `<button data-cor="${k}" class="${S.cor === k ? 'ativo' : ''}"><i style="background:${c.v}"></i>${c.n}</button>`).join('')}</div>
          <p class="muted" style="font-size:.88rem;margin:0">${S.sel ? 'Agora clique no segundo borne.' : 'Clique em um borne e depois em outro para ligar um fio. Clique num fio para removê-lo. Com o circuito energizado, clique nos interruptores.'}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn ${S.ligado ? 'escuro' : 'prim'}" id="energizar">${S.ligado ? 'Desligar disjuntor' : 'Ligar disjuntor'}</button>
            <button class="btn" id="testar">Testar ligação</button>
            <button class="btn peq" id="limpar">Limpar fios</button>
            <button class="btn peq" id="solucao">Mostrar solução</button>
          </div>
          <div class="msgs">${live && live.curto ? '<div class="msg erro"><b>Disjuntor desarmou.</b> Curto-circuito entre fase e neutro.</div>' : ''}
            ${live && live.fugaT ? '<div class="msg erro"><b>DR desarmou.</b> Fuga de corrente da fase para o terra.</div>' : ''}
            ${diag.map(d => `<div class="msg ${d.t}">${esc(d.m)}</div>`).join('')}</div>
        </div>
      </div>`;
    if (live && (live.curto || live.fugaT)) S.ligado = false;

    box.querySelector('#sel-ex').onchange = (e) => { S.ex = e.target.value; S.fios = []; S.sel = null; S.ligado = false; S.mostrarDiag = false; resetEstados(EX[S.ex]); viewBancada(box); };
    box.querySelectorAll('.cores button').forEach(b => b.onclick = () => { S.cor = b.dataset.cor; viewBancada(box); });
    box.querySelectorAll('.terminal').forEach(t => t.onclick = () => {
      const id = t.dataset.id;
      if (!S.sel) S.sel = id;
      else if (S.sel === id) S.sel = null;
      else { if (!S.fios.some(w => (w.a === S.sel && w.b === id) || (w.b === S.sel && w.a === id))) S.fios.push({ a: S.sel, b: id, cor: S.cor }); S.sel = null; S.mostrarDiag = false; }
      viewBancada(box);
    });
    box.querySelectorAll('.fio').forEach(g => g.onclick = () => { S.fios.splice(+g.dataset.i, 1); S.mostrarDiag = false; viewBancada(box); });
    box.querySelectorAll('.sw').forEach(g => g.onclick = () => {
      const c = ex.comps.find(x => x.id === g.dataset.sw);
      S.est[c.id] = c.tipo === 'sw2' ? !S.est[c.id] : (S.est[c.id] === 'A' ? 'B' : 'A');
      viewBancada(box);
    });
    box.querySelector('#energizar').onclick = () => { S.ligado = !S.ligado; viewBancada(box); };
    box.querySelector('#testar').onclick = () => { S.mostrarDiag = true; viewBancada(box); };
    box.querySelector('#limpar').onclick = () => { S.fios = []; S.sel = null; S.ligado = false; S.mostrarDiag = false; viewBancada(box); };
    box.querySelector('#solucao').onclick = () => { S.fios = ex.solucao.map(([a, b, cor]) => ({ a, b, cor })); S.mostrarDiag = true; viewBancada(box); };
  }

  /* ---------- Circuito CC ---------- */
  function calcCC() {
    const c = S.cc, ok = [...Array(c.n).keys()].filter(i => !c.queim.includes(i));
    let I = 0, lamps = [];
    if (c.curto) I = c.V / 0.05;
    else if (c.modo === 'serie') { I = ok.length === c.n ? c.V / (c.R * c.n) : 0; lamps = [...Array(c.n).keys()].map(i => ({ V: I * c.R, I, P: I * I * c.R })); }
    else { lamps = [...Array(c.n).keys()].map(i => ok.includes(i) ? { V: c.V, I: c.V / c.R, P: c.V * c.V / c.R } : { V: c.V, I: 0, P: 0 }); I = lamps.reduce((s, l) => s + l.I, 0); }
    if (c.curto) lamps = [...Array(c.n).keys()].map(() => ({ V: 0, I: 0, P: 0 }));
    const Pnom = 144 / c.R; // lâmpada nominal de 12 V
    return { I, lamps, Pnom, fusQueima: c.fus > 0 && I > c.fus };
  }
  function viewCC(box) {
    const c = S.cc, r = calcCC();
    const desligado = r.fusQueima;
    const W = 640, xs = [...Array(c.n).keys()].map(i => 200 + i * (380 / Math.max(c.n, 1)) + (c.modo === 'paralelo' ? 40 : 30));
    let s = `<rect x="40" y="120" width="70" height="110" rx="8" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.5"/><text x="75" y="170" text-anchor="middle" font-weight="700" font-size="18" fill="var(--ink)" font-family="var(--f-mono)">${c.V} V</text><text x="75" y="140" text-anchor="middle" font-size="16" fill="var(--fase)">+</text><text x="75" y="220" text-anchor="middle" font-size="16" fill="var(--ink)">−</text>`;
    const vel = r.I > 0 && !desligado ? Math.max(0.25, 2 / r.I) : 0;
    const fluxo = (d, cor) => `<path d="${d}" fill="none" stroke="${cor}" stroke-width="4"/>${vel ? `<path d="${d}" class="corrente" style="--vel:${vel}s" fill="none" stroke="var(--accent)" stroke-width="2"/>` : ''}`;
    // fusível
    s += `<rect x="130" y="52" width="46" height="20" rx="4" fill="${desligado ? 'var(--bad)' : 'var(--glow)'}" stroke="var(--ink)"/><text x="153" y="44" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--f-ui)">${c.fus ? 'Fusível ' + c.fus + ' A' : 'Sem fusível'}</text>`;
    const lampSvg = (x, y, i) => {
      const L = r.lamps[i] || { P: 0 }, q = c.queim.includes(i), br = desligado ? 0 : Math.min(1, L.P / r.Pnom);
      return `<g class="lampcc" data-i="${i}" style="cursor:pointer">${br > 0.05 ? `<circle cx="${x}" cy="${y}" r="${26 + 16 * br}" fill="var(--glow)" opacity="${0.15 + 0.35 * br}"/>` : ''}
        <circle cx="${x}" cy="${y}" r="22" fill="${br > 0.05 ? 'var(--glow)' : 'var(--surface-2)'}" opacity="${br > 0.05 ? 0.4 + 0.6 * br : 1}" stroke="var(--ink)" stroke-width="2"/>
        ${q ? `<path d="M${x - 10} ${y - 10} l20 20 M${x + 10} ${y - 10} l-20 20" stroke="var(--bad)" stroke-width="3"/>` : `<path d="M${x - 8} ${y + 4} q4 -12 8 0 q4 -12 8 0" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`}
        <text x="${x}" y="${y + 44}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--f-mono)">${q ? 'queimada' : (desligado ? '0' : L.V.toFixed(1)) + ' V'}</text></g>`;
    };
    if (c.modo === 'serie') {
      s += fluxo(`M75 120 V62 H130 M176 62 H600 V290 H75 V230`, 'var(--fase)');
      xs.forEach((x, i) => { s += `<rect x="${x - 26}" y="38" width="52" height="48" fill="var(--surface)"/>` + lampSvg(x, 62, i); });
    } else {
      s += fluxo(`M75 120 V62 H130 M176 62 H${xs[xs.length - 1]}`, 'var(--fase)') + fluxo(`M75 230 V290 H${xs[xs.length - 1]}`, 'var(--neutro)');
      xs.forEach((x, i) => { s += `<path d="M${x} 62 V290" stroke="var(--muted)" stroke-width="3"/>` + lampSvg(x, 176, i); });
    }
    if (c.curto) s += `<path d="M90 120 Q150 175 90 230" fill="none" stroke="var(--bad)" stroke-width="5"/><text x="140" y="180" font-size="12" font-weight="700" fill="var(--bad)" font-family="var(--f-ui)">curto</text>`;

    const msgs = [];
    if (c.curto && !c.fus) msgs.push(['erro', `Curto sem fusível: a corrente passa de ${Math.round(r.I)} A. O fio esquenta até derreter a isolação. Risco de incêndio.`]);
    else if (r.fusQueima) msgs.push(['erro', `O fusível de ${c.fus} A queimou: a corrente chegou a ${r.I.toFixed(1).replace('.', ',')} A. Ele cumpriu a função de proteger o fio.`]);
    if (!c.curto && r.lamps.some(l => l.P > r.Pnom * 1.3) && !r.fusQueima) msgs.push(['aviso', 'Tensão acima da nominal das lâmpadas (12 V): elas brilham demais e queimam rápido.']);
    if (c.modo === 'serie' && c.queim.length && !c.curto) msgs.push(['aviso', 'Em série, uma lâmpada queimada abre o circuito e todas apagam.']);
    if (c.modo === 'paralelo' && c.queim.length && !c.curto) msgs.push(['ok', 'Em paralelo, as outras lâmpadas continuam acesas. É assim que a sua casa é ligada.']);
    if (!msgs.length) msgs.push(['ok', c.modo === 'serie' ? `Série: a corrente é a mesma (${r.I.toFixed(2)} A) e a tensão se divide entre as ${c.n} lâmpadas.` : `Paralelo: cada lâmpada recebe ${c.V} V e as correntes se somam (${r.I.toFixed(2)} A no total).`]);

    box.innerHTML = `<div class="sim-grid">
      <div class="bancada"><svg viewBox="0 0 ${W} 330" xmlns="http://www.w3.org/2000/svg">${s}</svg></div>
      <div class="cartao">
        <div class="seg" role="group"><button data-m="serie" class="${c.modo === 'serie' ? 'ativo' : ''}">Série</button><button data-m="paralelo" class="${c.modo === 'paralelo' ? 'ativo' : ''}">Paralelo</button></div>
        <div class="ctrl"><label for="cc-v">Tensão da bateria: <span class="num">${c.V} V</span></label><input id="cc-v" type="range" min="1.5" max="24" step="0.5" value="${c.V}"></div>
        <div class="ctrl"><label for="cc-n">Lâmpadas: <span class="num">${c.n}</span></label><input id="cc-n" type="range" min="1" max="4" step="1" value="${c.n}"></div>
        <div class="ctrl"><label for="cc-r">Resistência de cada lâmpada: <span class="num">${c.R} Ω</span></label><input id="cc-r" type="range" min="2" max="24" step="1" value="${c.R}"></div>
        <div class="ctrl"><label for="cc-f">Fusível: <span class="num">${c.fus ? c.fus + ' A' : 'nenhum'}</span></label><input id="cc-f" type="range" min="0" max="20" step="1" value="${c.fus}"></div>
        <div class="leituras">
          <div class="leitura"><span class="eyebrow">Corrente total</span><b>${r.fusQueima ? '0,00' : r.I.toFixed(2).replace('.', ',')} A</b></div>
          <div class="leitura"><span class="eyebrow">Potência total</span><b>${r.fusQueima ? '0' : (r.I * c.V).toFixed(1).replace('.', ',')} W</b></div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn peq" id="cc-curto">${c.curto ? 'Remover curto' : 'Provocar curto'}</button><button class="btn peq" id="cc-reset">Trocar fusível e lâmpadas</button></div>
        <p class="muted" style="font-size:.88rem;margin:0">Clique numa lâmpada para queimá-la ou trocá-la.</p>
        <div class="msgs">${msgs.map(([t, m]) => `<div class="msg ${t}">${m}</div>`).join('')}</div>
      </div></div>`;
    box.querySelectorAll('.seg button').forEach(b => b.onclick = () => { c.modo = b.dataset.m; viewCC(box); });
    [['cc-v', 'V'], ['cc-n', 'n'], ['cc-r', 'R'], ['cc-f', 'fus']].forEach(([id, k]) => box.querySelector('#' + id).oninput = (e) => { c[k] = +e.target.value; if (k === 'n') c.queim = c.queim.filter(i => i < c.n); viewCC(box); box.querySelector('#' + id).focus(); });
    box.querySelectorAll('.lampcc').forEach(g => g.onclick = () => { const i = +g.dataset.i; c.queim = c.queim.includes(i) ? c.queim.filter(x => x !== i) : c.queim.concat(i); viewCC(box); });
    box.querySelector('#cc-curto').onclick = () => { c.curto = !c.curto; viewCC(box); };
    box.querySelector('#cc-reset').onclick = () => { c.curto = false; c.queim = []; viewCC(box); };
  }

  /* ---------- Calculadora Ohm / potência ---------- */
  function viewCalc(box) {
    box.innerHTML = `<div class="duas">
      <div class="cartao"><span class="eyebrow">Lei de Ohm e potência</span><h3>Preencha dois valores</h3>
        <div class="form-linha">${[['V', 'Tensão (V)'], ['I', 'Corrente (A)'], ['R', 'Resistência (Ω)'], ['P', 'Potência (W)']].map(([k, l]) => `<div class="ctrl"><label for="c-${k}">${l}</label><input id="c-${k}" type="number" step="any" min="0" inputmode="decimal"></div>`).join('')}</div>
        <div style="display:flex;gap:8px"><button class="btn prim" id="c-calc">Calcular</button><button class="btn" id="c-limpar">Limpar</button></div>
        <div class="msgs" id="c-out"></div></div>
      <div class="cartao"><span class="eyebrow">Consumo na conta de luz</span><h3>Quanto custa um aparelho</h3>
        <div class="form-linha"><div class="ctrl"><label for="k-p">Potência (W)</label><input id="k-p" type="number" value="5500"></div><div class="ctrl"><label for="k-h">Horas por dia</label><input id="k-h" type="number" step="0.1" value="0.5"></div><div class="ctrl"><label for="k-t">Tarifa (R$/kWh)</label><input id="k-t" type="number" step="0.01" value="0.85"></div></div>
        <div class="leituras" id="k-out"></div>
        <p class="muted" style="font-size:.85rem;margin:0">Exemplo carregado: chuveiro de 5.500 W, 30 minutos por dia. A tarifa é um valor de exemplo; use a da sua conta.</p></div></div>`;
    const g = (k) => { const v = box.querySelector('#c-' + k).value; return v === '' ? null : +v; };
    box.querySelector('#c-calc').onclick = () => {
      let V = g('V'), I = g('I'), R = g('R'), P = g('P');
      const n = [V, I, R, P].filter(x => x !== null).length, out = box.querySelector('#c-out');
      if (n < 2) { out.innerHTML = '<div class="msg aviso">Preencha pelo menos dois campos.</div>'; return; }
      for (let k = 0; k < 3; k++) {
        if (V === null && I !== null && R !== null) V = I * R;
        if (V === null && P !== null && I) V = P / I;
        if (V === null && P !== null && R !== null) V = Math.sqrt(P * R);
        if (I === null && V !== null && R) I = V / R;
        if (I === null && P !== null && V) I = P / V;
        if (R === null && V !== null && I) R = V / I;
        if (P === null && V !== null && I !== null) P = V * I;
      }
      const f = (x, d = 2) => x === null || !isFinite(x) ? '—' : x.toFixed(d).replace('.', ',');
      ['V', 'I', 'R', 'P'].forEach((k, i) => { box.querySelector('#c-' + k).value = [V, I, R, P][i] !== null && isFinite([V, I, R, P][i]) ? +[V, I, R, P][i].toFixed(3) : ''; });
      out.innerHTML = `<div class="msg ok"><span class="num">V = ${f(V)} V · I = ${f(I)} A · R = ${f(R)} Ω · P = ${f(P, 1)} W</span></div>` + (I > 10 && V > 100 ? '<div class="msg aviso">Acima de 10 A: a NBR 5410 pede circuito exclusivo para este equipamento.</div>' : '');
    };
    box.querySelector('#c-limpar').onclick = () => { ['V', 'I', 'R', 'P'].forEach(k => box.querySelector('#c-' + k).value = ''); box.querySelector('#c-out').innerHTML = ''; };
    const kwh = () => {
      const p = +box.querySelector('#k-p').value || 0, h = +box.querySelector('#k-h').value || 0, t = +box.querySelector('#k-t').value || 0, mes = p / 1000 * h * 30;
      box.querySelector('#k-out').innerHTML = `<div class="leitura"><span class="eyebrow">Por mês</span><b>${mes.toFixed(1).replace('.', ',')} kWh</b></div><div class="leitura"><span class="eyebrow">Custo mensal</span><b>R$ ${(mes * t).toFixed(2).replace('.', ',')}</b></div>`;
    };
    box.querySelectorAll('#k-p,#k-h,#k-t').forEach(i => i.oninput = kwh); kwh();
  }

  window.Simulador = {
    render(el, arg) {
      if (arg && EX[arg]) { if (S.ex !== arg) { S.ex = arg; S.fios = []; S.ligado = false; S.mostrarDiag = false; resetEstados(EX[arg]); } S.aba = 'bancada'; }
      el.innerHTML = `<header class="licao-cab"><span class="eyebrow">Simular</span><h1>Laboratório virtual</h1>
        <p class="muted" style="max-width:65ch">Erre aqui, não na parede. Ligue fios na bancada e o Smath testa todas as posições dos interruptores, aponta curtos, fase exposta e cores erradas.</p></header>
        <div class="abas" role="tablist">${[['bancada', 'Bancada de ligações (CA)'], ['cc', 'Circuito CC: série e paralelo'], ['calc', 'Calculadoras']].map(([k, l]) => `<button role="tab" data-a="${k}" class="${S.aba === k ? 'ativo' : ''}">${l}</button>`).join('')}</div>
        <div id="sim-box"></div>`;
      const box = el.querySelector('#sim-box');
      const go = () => { el.querySelectorAll('.abas button').forEach(b => b.classList.toggle('ativo', b.dataset.a === S.aba)); (S.aba === 'bancada' ? viewBancada : S.aba === 'cc' ? viewCC : viewCalc)(box); };
      el.querySelectorAll('.abas button').forEach(b => b.onclick = () => { S.aba = b.dataset.a; go(); });
      go();
    }
  };
})();
