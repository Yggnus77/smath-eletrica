/* Smath Elétrica — navegação, painel, trilha e lições. */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  window.SM = { $, esc, norm };

  /* ---------- Estado salvo no navegador ---------- */
  const CHAVE = 'smath-eletrica-v1';
  const padrao = () => ({ feitas: {}, quiz: {}, passos: {}, ultima: null, projetos: [] });
  let E;
  try { E = Object.assign(padrao(), JSON.parse(localStorage.getItem(CHAVE) || '{}')); } catch (e) { E = padrao(); }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(E)); } catch (e) { /* armazenamento indisponível */ } };
  window.SM.estado = () => E;
  window.SM.salvar = salvar;

  const L = window.LICOES, M = window.MODULOS;
  const licoesDo = (mid) => L.filter(l => l.mod === mid);
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  const feitasDo = (mid) => licoesDo(mid).filter(l => E.feitas[l.id]).length;
  const totalFeitas = () => L.filter(l => E.feitas[l.id]).length;
  const proxima = () => L.find(l => !E.feitas[l.id]);
  const modDe = (l) => M.find(m => m.id === l.mod);

  function atualizaTopo() {
    const p = pct(totalFeitas(), L.length);
    $('#mini-pct').textContent = p + '%';
    $('#mini-barra').style.width = p + '%';
    document.querySelectorAll('.nav a').forEach(a => {
      const r = rota().nome;
      a.classList.toggle('ativo', a.dataset.r === r || (a.dataset.r === 'trilha' && (r === 'modulo' || r === 'licao')));
    });
  }

  /* ---------- Rotas ---------- */
  function rota() {
    const h = location.hash.replace('#', '') || 'painel';
    if (h.startsWith('licao-')) return { nome: 'licao', id: h.slice(6) };
    if (h.startsWith('modulo-')) return { nome: 'modulo', id: h.slice(7) };
    if (h.startsWith('simular')) return { nome: 'simular', id: h.slice(8) };
    if (h.startsWith('projetos')) return { nome: 'projetos' };
    if (h === 'trilha') return { nome: 'trilha' };
    return { nome: 'painel' };
  }
  function render() {
    const r = rota(), el = $('#app');
    if (r.nome === 'licao') viewLicao(el, r.id);
    else if (r.nome === 'modulo') viewModulo(el, r.id);
    else if (r.nome === 'trilha') viewTrilha(el);
    else if (r.nome === 'simular') window.Simulador.render(el, r.id);
    else if (r.nome === 'projetos') window.Projetos.render(el);
    else viewPainel(el);
    atualizaTopo();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  // Clicar num link para a página atual também reabre a tela (ex.: sair do editor de projeto)
  document.addEventListener('click', (e) => { const a = e.target.closest('a[href^="#"]'); if (a && a.getAttribute('href') === (location.hash || '#painel')) { e.preventDefault(); render(); } });

  /* ---------- Tutor: busca inteligente no conteúdo ---------- */
  const SINONIMOS = { luz: 'lampada iluminacao', fio: 'cabo condutor bitola', desarma: 'disjuntor diagnostico dr', cai: 'desarma disjuntor dr', choque: 'choque dr aterramento', terra: 'aterramento terra', solar: 'solar painel off-grid', bateria: 'bateria cc', raio: 'dps surto', tomada: 'tomada', chuveiro: 'chuveiro', quadro: 'quadro disjuntor', three: 'paralelo threeway', escada: 'paralelo threeway', medir: 'multimetro', esquenta: 'aquecimento diagnostico mau contato', queimado: 'diagnostico preventiva' };
  const indice = L.map(l => ({ l, tit: norm(l.titulo), res: norm(l.resumo), txt: norm([l.conceito, l.funcao, l.exemplo, (l.passos || []).map(p => p.t + ' ' + p.d + ' ' + (p.alerta || '')).join(' '), l.pode.join(' '), l.naoPode.join(' ')].join(' ').replace(/<[^>]+>/g, ' ')) }));
  function buscar(q) {
    let termos = norm(q).split(/[^a-z0-9]+/).filter(t => t.length > 2);
    termos = termos.concat(...termos.map(t => (SINONIMOS[t] || '').split(' ').filter(Boolean)));
    if (!termos.length) return [];
    return indice.map(i => {
      let s = 0;
      termos.forEach(t => { if (i.tit.includes(t)) s += 6; if (i.res.includes(t)) s += 3; const m = i.txt.split(t).length - 1; s += Math.min(m, 4); });
      return { l: i.l, s };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 4);
  }

  const DICAS = [
    'Desligar, bloquear, testar a ausência de tensão. Só então tocar.',
    'Disjuntor desarmando é um aviso. Nunca troque por um maior sem trocar o fio.',
    'O DR de 30 mA é obrigatório em banheiro, cozinha, lavanderia e áreas externas.',
    'O interruptor deve cortar a fase, nunca o neutro.',
    'Emenda de chuveiro com fita isolante é a principal causa de incêndio em banheiros.',
    'Verde-amarelo é só para o terra. Azul-claro é só para o neutro.',
    'Teste o botão do DR uma vez por mês.'
  ];

  /* ---------- Painel ---------- */
  function viewPainel(el) {
    const f = totalFeitas(), p = pct(f, L.length), prox = proxima();
    const quizFeitos = Object.keys(E.quiz).length, acertos = Object.values(E.quiz).filter(Boolean).length;
    const revisar = L.filter(l => E.quiz[l.id] === false);
    const minRest = L.filter(l => !E.feitas[l.id]).reduce((s, l) => s + l.tempo, 0);
    const dica = DICAS[new Date().getDate() % DICAS.length];
    el.innerHTML = `
    <section class="hero">
      <div class="hero-txt">
        <span class="eyebrow">Seu painel de estudo</span>
        <h1>${f === 0 ? 'Aprenda elétrica do conceito à instalação' : f === L.length ? 'Trilha concluída. Agora é praticar.' : 'Continue de onde parou'}</h1>
        <p class="muted">Corrente contínua e alternada, componentes, montagem e manutenção, com passo a passo ilustrado e alertas de segurança em cada lição.</p>
        <div class="progresso-geral">
          <div class="linha"><span class="pct num">${p}%</span><span class="muted"><b class="num">${f}</b> de <b class="num">${L.length}</b> lições concluídas</span></div>
          <div class="barra" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>
          <span class="muted" style="font-size:.88rem">${minRest ? `Faltam cerca de ${Math.round(minRest / 6) / 10} h de estudo` : 'Você estudou todo o conteúdo'}</span>
        </div>
        <div class="acoes">
          ${prox ? `<a class="btn prim" href="#licao-${prox.id}">${f ? 'Continuar' : 'Começar'}: ${esc(prox.titulo)}</a>` : ''}
          <a class="btn" href="#trilha">Ver trilha completa</a>
        </div>
      </div>
      <aside class="cta-sim">
        <svg class="fundo" viewBox="0 0 100 100"><path d="M55 5 L20 55 H48 L40 95 L80 40 H52 Z" fill="currentColor"/></svg>
        <div><span class="eyebrow" style="color:inherit;opacity:.7">Prática</span><h2>Simule ou crie um projeto</h2></div>
        <p>Ligue fios na bancada virtual, teste circuitos em CC ou dimensione a elétrica de um cômodo, de uma casa ou de um kit solar.</p>
        <div class="acoes">
          <a class="btn prim" href="#simular">Simular circuitos</a>
          <a class="btn" href="#projetos">Criar projeto do dia a dia</a>
        </div>
      </aside>
    </section>

    <section class="stats">
      <div class="stat"><span class="eyebrow">Lições</span><b class="num">${f}/${L.length}</b></div>
      <div class="stat"><span class="eyebrow">Acertos no quiz</span><b class="num">${quizFeitos ? pct(acertos, quizFeitos) + '%' : '—'}</b></div>
      <div class="stat"><span class="eyebrow">Módulos completos</span><b class="num">${M.filter(m => feitasDo(m.id) === licoesDo(m.id).length).length}/${M.length}</b></div>
      <div class="stat"><span class="eyebrow">Projetos salvos</span><b class="num">${E.projetos.length}</b></div>
    </section>

    <section>
      <div class="secao-tit"><h2>Módulos</h2><span class="muted">Do estudado ao que falta</span></div>
      <div class="modulos">${M.map((m, i) => {
        const t = licoesDo(m.id).length, d = feitasDo(m.id);
        return `<a class="modulo" href="#modulo-${m.id}" style="--cor:${m.cor}">
          <div class="topo-mod"><h3>${esc(m.nome)}</h3><span class="n">${String(i + 1).padStart(2, '0')}</span></div>
          <p>${esc(m.desc)}</p>
          <div class="barra" style="--cor:${m.cor}"><i style="width:${pct(d, t)}%"></i></div>
          <div class="rodape"><span>${d}/${t} lições</span><span>${pct(d, t)}%</span></div></a>`;
      }).join('')}</div>
    </section>

    <section class="duas">
      <div class="cartao tutor">
        <span class="eyebrow">Tutor Smath</span>
        <h3>Qual é a sua dúvida?</h3>
        <input id="busca" type="search" placeholder="Ex.: disjuntor fica desarmando, cor do fio terra, chuveiro 220 V" autocomplete="off">
        <div class="resultados" id="resultados"><span class="muted" style="font-size:.9rem">Digite um problema ou assunto. O tutor indica as lições e os trechos que respondem.</span></div>
      </div>
      <div class="grid" style="display:grid;gap:14px">
        <div class="cartao dica"><span class="eyebrow">Alerta de segurança do dia</span><p style="margin:0;font-weight:600">${dica}</p></div>
        <div class="cartao">
          <span class="eyebrow">Para revisar</span>
          ${revisar.length ? `<div class="resultados">${revisar.map(l => `<a class="res" style="--cor:var(--bad)" href="#licao-${l.id}"><b>${esc(l.titulo)}</b><small>Você errou o quiz desta lição</small></a>`).join('')}</div>`
            : `<p class="muted" style="margin:0">Nenhuma lição pendente de revisão. Os quizzes errados aparecem aqui.</p>`}
        </div>
      </div>
    </section>`;
    const inp = $('#busca'), out = $('#resultados');
    inp.addEventListener('input', () => {
      const r = buscar(inp.value);
      if (!inp.value.trim()) { out.innerHTML = '<span class="muted" style="font-size:.9rem">Digite um problema ou assunto.</span>'; return; }
      out.innerHTML = r.length ? r.map(({ l }) => `<a class="res" style="--cor:${modDe(l).cor}" href="#licao-${l.id}"><b>${esc(l.titulo)}</b><small>${esc(l.resumo)}</small></a>`).join('')
        : '<span class="muted">Nada encontrado. Tente outras palavras, como "tomada", "DR" ou "solar".</span>';
    });
  }

  /* ---------- Trilha ---------- */
  function itemLicao(l, i) {
    const f = E.feitas[l.id];
    return `<a class="item-licao ${f ? 'feita' : ''}" href="#licao-${l.id}">
      <span class="st">${f ? '✓' : i + 1}</span>
      <span><b>${esc(l.titulo)}</b><br><small>${esc(l.resumo)}</small></span>
      <small class="num">${l.tempo} min</small></a>`;
  }
  function viewTrilha(el) {
    el.innerHTML = `<header class="licao-cab"><span class="eyebrow">Trilha completa</span><h1>Do conceito à manutenção</h1>
      <p class="muted">${L.length} lições em ${M.length} módulos. Siga a ordem ou pule para o que precisa.</p></header>` +
      M.map(m => {
        const t = licoesDo(m.id).length, d = feitasDo(m.id);
        return `<section class="trilha-mod"><header><div class="secao-tit" style="margin:0"><h2 style="color:${m.cor}">${esc(m.nome)}</h2><span class="num muted">${d}/${t}</span></div>
          <div class="barra" style="--cor:${m.cor}"><i style="width:${pct(d, t)}%"></i></div></header>
          <div class="lista-licoes">${licoesDo(m.id).map(itemLicao).join('')}</div></section>`;
      }).join('');
  }
  function viewModulo(el, id) {
    const m = M.find(x => x.id === id);
    if (!m) { location.hash = 'trilha'; return; }
    const t = licoesDo(m.id).length, d = feitasDo(m.id);
    el.innerHTML = `<nav class="migalha"><a href="#painel">Painel</a> / <a href="#trilha">Trilha</a> / <span>${esc(m.nome)}</span></nav>
      <header class="licao-cab"><span class="eyebrow" style="color:${m.cor}">Módulo ${M.indexOf(m) + 1}</span><h1>${esc(m.nome)}</h1><p class="muted">${esc(m.desc)}</p>
      <div class="barra" style="--cor:${m.cor};max-width:420px"><i style="width:${pct(d, t)}%"></i></div><span class="muted num">${d} de ${t} concluídas</span></header>
      <div class="lista-licoes">${licoesDo(m.id).map(itemLicao).join('')}</div>`;
  }

  /* ---------- Lição ---------- */
  function viewLicao(el, id) {
    const l = L.find(x => x.id === id);
    if (!l) { location.hash = 'trilha'; return; }
    const m = modDe(l), i = L.indexOf(l), ant = L[i - 1], prox = L[i + 1];
    E.ultima = l.id; salvar();
    const feitos = new Set(E.passos[l.id] || []);
    const wrapTb = (h) => h.replace(/<table/g, '<div class="tb-wrap"><table').replace(/<\/table>/g, '</table></div>');
    const ilu = window.ILUSTRACOES[l.ilustracao];
    el.innerHTML = `
    <nav class="migalha"><a href="#painel">Painel</a> / <a href="#modulo-${m.id}">${esc(m.nome)}</a> / <span>${esc(l.titulo)}</span></nav>
    <header class="licao-cab">
      <span class="eyebrow" style="color:${m.cor}">${esc(m.nome)} · lição ${licoesDo(m.id).indexOf(l) + 1} de ${licoesDo(m.id).length}</span>
      <h1>${esc(l.titulo)}</h1>
      <p class="muted" style="font-size:1.08rem;max-width:65ch">${esc(l.resumo)}</p>
      <div class="meta"><span>${l.tempo} min</span><span>${l.passos.length} passos</span><span>${E.feitas[l.id] ? '<b style="color:var(--ok)">Concluída</b>' : 'Não concluída'}</span></div>
    </header>
    <div class="licao-grid">
      <div class="licao-corpo">
        <section class="bloco"><h3><span class="tag">Conceito</span>O que é</h3>${wrapTb(l.conceito)}</section>
        <section class="bloco"><h3><span class="tag">Função</span>O que faz</h3>${wrapTb(l.funcao)}</section>
        <section class="bloco"><h3><span class="tag">Prática</span>${esc(l.passosTitulo)}</h3>
          <p class="eyebrow" style="margin-bottom:8px">Você vai precisar</p>
          <div class="ferramentas">${l.ferramentas.map(f => `<span>${esc(f)}</span>`).join('')}</div>
          <p class="eyebrow" style="margin-bottom:8px">Passo a passo <span id="cont-passos" class="num">(${feitos.size}/${l.passos.length})</span></p>
          <ol class="passos">${l.passos.map((p, k) => `<li class="passo ${feitos.has(k) ? 'ok' : ''}" data-k="${k}">
            <button class="chk" aria-label="Marcar passo ${k + 1}">${feitos.has(k) ? '✓' : k + 1}</button>
            <div><b>${esc(p.t)}</b><p>${esc(p.d)}</p>${p.alerta ? `<div class="alerta">${esc(p.alerta)}</div>` : ''}</div></li>`).join('')}</ol>
          ${l.bancada ? `<p style="margin:14px 0 0"><a class="btn escuro" href="#simular-${l.bancada}">Treinar esta ligação na bancada virtual</a></p>` : ''}
        </section>
        <section class="bloco"><h3><span class="tag">Exemplo</span>Na vida real</h3>${l.exemplo}</section>
        <section class="pode-nao">
          <div class="sim"><h4>Pode fazer</h4><ul>${l.pode.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
          <div class="nao"><h4>Não pode fazer</h4><ul>${l.naoPode.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
        </section>
        <section class="bloco"><h3><span class="tag">Quiz</span>Teste o que aprendeu</h3>
          <div class="quiz" id="quiz"><p><b>${esc(l.quiz.p)}</b></p>${l.quiz.op.map((o, k) => `<button class="op" data-k="${k}">${esc(o)}</button>`).join('')}<div id="fb"></div></div>
        </section>
        <div class="navlicao">
          ${ant ? `<a class="btn" href="#licao-${ant.id}">← ${esc(ant.titulo)}</a>` : '<span></span>'}
          <button class="btn prim" id="concluir">${E.feitas[l.id] ? 'Concluída ✓' : 'Marcar como concluída'}</button>
          ${prox ? `<a class="btn" href="#licao-${prox.id}">${esc(prox.titulo)} →</a>` : '<a class="btn" href="#projetos">Criar um projeto →</a>'}
        </div>
      </div>
      <aside class="lado">
        ${ilu ? `<figure class="ilustra" style="margin:0">${ilu()}<figcaption>Ilustração: ${esc(l.titulo)}</figcaption></figure>` : ''}
        <div class="cartao">
          <span class="eyebrow">Progresso do módulo</span>
          <div class="barra" style="--cor:${m.cor}"><i id="barra-mod" style="width:${pct(feitasDo(m.id), licoesDo(m.id).length)}%"></i></div>
          <div class="lista-licoes" style="gap:4px">${licoesDo(m.id).map(x => `<a href="#licao-${x.id}" style="text-decoration:none;color:inherit;font-size:.9rem;${x.id === l.id ? 'font-weight:700' : ''}">${E.feitas[x.id] ? '<span style="color:var(--ok)">✓</span>' : '○'} ${esc(x.titulo)}</a>`).join('')}</div>
        </div>
      </aside>
    </div>`;

    el.querySelectorAll('.passo .chk').forEach(b => b.addEventListener('click', () => {
      const li = b.closest('.passo'), k = +li.dataset.k;
      feitos.has(k) ? feitos.delete(k) : feitos.add(k);
      E.passos[l.id] = [...feitos]; salvar();
      li.classList.toggle('ok', feitos.has(k)); b.textContent = feitos.has(k) ? '✓' : k + 1;
      $('#cont-passos').textContent = `(${feitos.size}/${l.passos.length})`;
    }));
    el.querySelectorAll('#quiz .op').forEach(b => b.addEventListener('click', () => {
      const k = +b.dataset.k, certo = k === l.quiz.c;
      el.querySelectorAll('#quiz .op').forEach(x => { x.classList.remove('certa', 'errada'); });
      b.classList.add(certo ? 'certa' : 'errada');
      if (certo) el.querySelector(`#quiz .op[data-k="${l.quiz.c}"]`).classList.add('certa');
      E.quiz[l.id] = certo; salvar();
      $('#fb').innerHTML = `<div class="feedback msg ${certo ? 'ok' : 'erro'}"><b>${certo ? 'Correto.' : 'Ainda não.'}</b> ${certo ? esc(l.quiz.exp) : 'Releia a lição e tente de novo. A lição entra na lista de revisão do painel.'}</div>`;
      if (certo && !E.feitas[l.id]) concluir();
    }));
    function concluir() {
      E.feitas[l.id] = Date.now(); salvar();
      $('#concluir').textContent = 'Concluída ✓';
      $('#barra-mod').style.width = pct(feitasDo(m.id), licoesDo(m.id).length) + '%';
      atualizaTopo();
    }
    $('#concluir').addEventListener('click', () => {
      if (E.feitas[l.id]) { delete E.feitas[l.id]; salvar(); $('#concluir').textContent = 'Marcar como concluída'; $('#barra-mod').style.width = pct(feitasDo(m.id), licoesDo(m.id).length) + '%'; atualizaTopo(); }
      else concluir();
    });
  }

  document.addEventListener('DOMContentLoaded', render);
  if (document.readyState !== 'loading') render();
})();
