/* Ilustrações das lições em SVG. As cores vêm dos tokens CSS, então funcionam no tema claro e escuro.
   Convenção de fios: fase = vermelho, neutro = azul-claro, terra = verde-amarelo, retorno = amarelo. */
(function () {
  const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.fs || 11}" fill="${o.c || 'var(--ink)'}" text-anchor="${o.a || 'middle'}" font-weight="${o.w || 500}" font-family="var(--f-ui)">${s}</text>`;
  const W = (d, cor, w = 3.5) => `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const F = 'var(--fase)', N = 'var(--neutro)', R = 'var(--retorno)', I = 'var(--ink)', M = 'var(--muted)', S = 'var(--surface-2)', A = 'var(--accent)';
  const PE = (d) => W(d, 'var(--terra)', 3.5) + `<path d="${d}" fill="none" stroke="var(--terra-2)" stroke-width="3.5" stroke-dasharray="6 6" stroke-linecap="butt"/>`;
  const box = (x, y, w, h, r = 6, fill = S, st = M) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${st}" stroke-width="1.5"/>`;
  const dot = (x, y, c = I) => `<circle cx="${x}" cy="${y}" r="4" fill="${c}"/>`;
  const bulb = (x, y, on = true) => `<circle cx="${x}" cy="${y}" r="16" fill="${on ? 'var(--glow)' : S}" stroke="${I}" stroke-width="1.5"/>${W(`M${x - 6} ${y + 4} q3 -10 6 0 q3 -10 6 0`, I, 1.5)}${on ? `<circle cx="${x}" cy="${y}" r="24" fill="none" stroke="var(--glow)" stroke-width="2" opacity=".6"/>` : ''}`;
  const svg = (inner, vb = '0 0 360 200') => `<svg viewBox="${vb}" role="img" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

  window.ILUSTRACOES = {
    circuitoBasico: () => svg(
      box(30, 70, 50, 70, 6) + T(55, 95, '+', { fs: 16, w: 700 }) + T(55, 128, '−', { fs: 16, w: 700 }) + T(55, 160, 'Fonte') +
      W('M80 90 H180 V40 H260', F) + W('M80 125 H180 V170 H300 V80', N) +
      bulb(290, 60) + T(290, 30, 'Carga') +
      W('M270 40 L285 44', F) +
      `<g fill="${A}">${[110, 150, 210, 240].map(x => `<path d="M${x} 84 l8 6 -8 6z"/>`).join('')}</g>` +
      T(200, 190, 'Elétrons percorrem o caminho fechado', { c: M }) + T(150, 72, 'condutor', { c: M, fs: 10 })
    ),
    ohm: () => svg(
      `<path d="M180 20 L290 180 H70 Z" fill="${S}" stroke="${I}" stroke-width="2"/>` +
      W('M110 120 H250', I, 2) + W('M180 120 V180', I, 2) +
      T(180, 98, 'V', { fs: 34, w: 700, c: F }) + T(140, 165, 'I', { fs: 30, w: 700, c: A }) + T(220, 165, 'R', { fs: 30, w: 700, c: N }) +
      T(40, 40, 'V = R × I', { a: 'start', fs: 12 }) + T(40, 58, 'I = V ÷ R', { a: 'start', fs: 12 }) + T(40, 76, 'R = V ÷ I', { a: 'start', fs: 12 }) +
      T(320, 40, 'P = V × I', { a: 'end', fs: 12 }) + T(320, 58, 'I = P ÷ V', { a: 'end', fs: 12 }) + T(320, 76, 'P = R × I²', { a: 'end', fs: 12 }) +
      T(180, 196, 'Cubra a grandeza que quer descobrir', { c: M, fs: 10 })
    ),
    ccca: () => {
      let s = 'M200 100';
      for (let x = 0; x <= 140; x += 2) s += ` L${200 + x} ${100 - 45 * Math.sin(x / 140 * 4 * Math.PI)}`;
      return svg(
        W('M20 100 H160', M, 1) + W('M20 30 V170', M, 1) + W('M20 55 H160', F, 3.5) + T(90, 45, '+12 V constante', { fs: 10 }) +
        T(90, 190, 'Corrente contínua (CC)', { w: 700 }) +
        W('M200 100 H345', M, 1) + W('M200 30 V170', M, 1) + W(s, N, 3) +
        T(272, 190, 'Corrente alternada (CA)', { w: 700 }) + T(272, 28, '60 ciclos por segundo', { fs: 10, c: M })
      );
    },
    epi: () => {
      const it = (x, lbl, g) => `<g>${box(x, 40, 70, 90, 10)}${g}${T(x + 35, 150, lbl, { fs: 10 })}</g>`;
      return svg(
        it(10, 'Capacete', `<path d="M25 100 q20 -45 40 0 z" fill="${A}"/>${W('M20 100 H70', I, 2)}`) +
        it(97, 'Óculos', `<circle cx="117" cy="85" r="11" fill="none" stroke="${I}" stroke-width="3"/><circle cx="147" cy="85" r="11" fill="none" stroke="${I}" stroke-width="3"/>${W('M128 85 H136', I, 3)}`) +
        it(184, 'Luvas isolantes', `<path d="M205 115 V75 q0 -6 5 -6 q5 0 5 6 V70 q0 -6 5 -6 q5 0 5 6 V72 q0 -5 5 -5 q5 0 5 5 V95 q0 20 -15 20 z" fill="var(--warn)" stroke="${I}" stroke-width="1.5"/>`) +
        it(271, 'Botina isolante', `<path d="M285 70 h20 v30 q20 0 30 12 v8 h-50 z" fill="${M}" stroke="${I}" stroke-width="1.5"/>`) +
        T(180, 185, 'Sem anéis, relógio ou correntes metálicas', { c: 'var(--bad)', w: 700 })
      );
    },
    choque: () => svg(
      `<circle cx="150" cy="40" r="14" fill="none" stroke="${I}" stroke-width="2.5"/>` + W('M150 54 V120 M150 70 L110 95 M150 70 L200 60 M150 120 L130 175 M150 120 L170 175', I, 2.5) +
      box(205, 45, 30, 30, 4, 'var(--bad-bg)', 'var(--bad)') + T(220, 66, '⚡', { fs: 16 }) + W('M235 60 H300', F) + T(300, 50, 'Fase', { a: 'start', fs: 10 }) +
      W('M195 64 Q170 70 155 90 Q150 110 165 170', 'var(--bad)', 2) + `<path d="M160 165 l5 10 5 -10z" fill="var(--bad)"/>` +
      W('M60 180 H300', M, 2) + T(80, 195, 'Terra / piso', { fs: 10, c: M }) +
      T(40, 110, 'A corrente', { a: 'start', fs: 10, c: 'var(--bad)' }) + T(40, 124, 'atravessa', { a: 'start', fs: 10, c: 'var(--bad)' }) + T(40, 138, 'o coração', { a: 'start', fs: 10, c: 'var(--bad)' })
    ),
    bateriaFusivel: () => svg(
      box(30, 70, 120, 90, 8) + box(45, 58, 20, 12, 2, F, I) + box(115, 58, 20, 12, 2, I, I) + T(55, 52, '+', { fs: 16, w: 700 }) + T(125, 52, '−', { fs: 16, w: 700 }) +
      T(90, 120, '12 V', { fs: 18, w: 700 }) + T(90, 140, '100 Ah', { fs: 12, c: M }) +
      W('M55 58 V30 H95', F) + box(95, 20, 40, 20, 4, 'var(--glow)', I) + T(115, 34, 'Fusível', { fs: 9, w: 700 }) + W('M135 30 H300 V90', F) +
      W('M125 58 V45 H160 V180 H300 V130', I) + box(270, 90, 60, 40, 6) + T(300, 115, 'Carga', { fs: 11 }) +
      T(190, 22, '≤ 20 cm do borne +', { fs: 10, c: 'var(--bad)', a: 'start' })
    ),
    serieParalelo: () => svg(
      T(90, 20, 'Série', { w: 700 }) + box(20, 80, 26, 50, 4) + T(33, 110, 'V', { fs: 10 }) +
      W('M33 80 V40 H150 V70', F, 2.5) + W('M33 130 V170 H150 V150', N, 2.5) + bulb(75, 40, true) + bulb(120, 40, true) + W('M150 70 V150', I, 2.5) +
      T(90, 192, 'Mesma corrente, tensão divide', { fs: 10, c: M }) +
      T(270, 20, 'Paralelo', { w: 700 }) + box(200, 80, 26, 50, 4) + T(213, 110, 'V', { fs: 10 }) +
      W('M213 80 V40 H340', F, 2.5) + W('M213 130 V170 H340', N, 2.5) + W('M270 40 V170 M330 40 V170', I, 2) + bulb(270, 105, true) + bulb(330, 105, true) +
      T(270, 192, 'Mesma tensão, correntes somam', { fs: 10, c: M })
    ),
    solar: () => {
      const b = (x, l, sub) => box(x, 70, 70, 60, 8) + T(x + 35, 98, l, { fs: 10, w: 700 }) + T(x + 35, 114, sub, { fs: 9, c: M });
      return svg(
        `<g transform="translate(10 60) skewX(-10)"><rect width="70" height="70" fill="var(--m2)" stroke="${I}"/>${[17, 35, 52].map(v => `<path d="M${v} 0 V70 M0 ${v} H70" stroke="var(--surface)" stroke-width="1.5"/>`).join('')}</g>` +
        T(40, 150, 'Painel', { fs: 10, w: 700 }) + T(40, 164, 'gera CC', { fs: 9, c: M }) +
        `<circle cx="40" cy="30" r="12" fill="var(--glow)"/>` +
        W('M85 100 H105', F) + b(105, 'Controlador', 'regula a carga') + W('M175 100 H195', F) + b(195, 'Bateria', 'armazena') +
        W('M265 100 H285', F) + box(285, 70, 65, 60, 8) + T(317, 98, 'Inversor', { fs: 10, w: 700 }) + T(317, 114, 'CC → CA', { fs: 9, c: M }) +
        T(140, 160, '1º ligue aqui', { fs: 10, c: 'var(--bad)', w: 700 }) + W('M160 150 L200 132', 'var(--bad)', 1.5) +
        T(180, 190, 'Fusível em toda ligação com a bateria', { fs: 10, c: M })
      );
    },
    sistemas: () => svg(
      box(10, 30, 100, 140, 8) + T(60, 50, 'Monofásico', { w: 700 }) + W('M30 80 H90', F) + W('M30 110 H90', N) + T(60, 145, 'F–N: 127 ou 220 V', { fs: 9 }) +
      box(130, 30, 100, 140, 8) + T(180, 50, 'Bifásico', { w: 700 }) + W('M150 75 H210', F) + W('M150 95 H210', 'var(--fase-2)') + W('M150 115 H210', N) + T(180, 140, 'F–N: 127 V', { fs: 9 }) + T(180, 154, 'F–F: 220 V', { fs: 9 }) +
      box(250, 30, 100, 140, 8) + T(300, 50, 'Trifásico', { w: 700 }) + W('M270 70 H330', F) + W('M270 88 H330', 'var(--fase-2)') + W('M270 106 H330', 'var(--fase-3)') + W('M270 124 H330', N) + T(300, 148, '3 fases + neutro', { fs: 9 }) +
      T(180, 192, 'Vermelho/preto/marrom: fases · Azul-claro: neutro', { fs: 10, c: M })
    ),
    rede: () => svg(
      W('M30 180 V30', M, 6) + W('M15 40 H45', M, 4) + box(40, 50, 26, 30, 4) + T(53, 95, 'Trafo', { fs: 9 }) +
      W('M66 60 Q120 50 150 80', F, 2.5) + W('M66 70 Q120 65 150 90', N, 2.5) +
      box(150, 70, 60, 80, 6) + `<circle cx="180" cy="100" r="14" fill="var(--surface)" stroke="${I}"/>` + T(180, 104, 'kWh', { fs: 8, w: 700 }) + box(165, 125, 30, 16, 3, 'var(--surface)', I) + T(180, 162, 'Medidor', { fs: 10 }) +
      W('M180 150 V185', 'var(--terra)', 3) + `<path d="M170 185 h20 M174 190 h12 M177 195 h6" stroke="${I}" stroke-width="2"/>` +
      W('M210 100 H270', F, 3) + W('M210 112 H270', N, 3) + box(270, 70, 70, 80, 6) + T(305, 105, 'Quadro', { fs: 10, w: 700 }) + T(305, 120, '(QDC)', { fs: 9, c: M }) +
      T(100, 25, 'Concessionária', { fs: 10, c: 'var(--bad)', w: 700 }) + T(290, 25, 'Sua instalação', { fs: 10, c: 'var(--ok)', w: 700 }) + W('M215 15 V195', M, 1)
    ),
    quadro: () => {
      const dj = (x, l, c = 'var(--surface)') => box(x, 70, 22, 50, 3, c, I) + box(x + 6, 82, 10, 14, 2, I, I) + T(x + 11, 135, l, { fs: 8 });
      return svg(
        box(20, 20, 320, 170, 10) +
        dj(40, 'Geral') + box(75, 70, 22, 50, 3, 'var(--surface)', I) + T(86, 92, 'DPS', { fs: 7, w: 700 }) + T(86, 135, 'DPS', { fs: 8 }) +
        box(110, 70, 44, 50, 3, 'var(--surface)', I) + box(124, 82, 16, 14, 2, I, I) + T(132, 110, 'T', { fs: 9, w: 700 }) + T(132, 135, 'DR 30 mA', { fs: 8 }) +
        dj(170, 'Ilum.') + dj(200, 'TUG') + dj(230, 'Coz.') + dj(260, 'Chuv.') + dj(290, 'Res.', S) +
        box(40, 150, 130, 14, 3, N, I) + T(105, 161, 'Barramento neutro', { fs: 8, w: 700, c: '#0b2233' }) +
        box(190, 150, 130, 14, 3, 'var(--terra)', I) + T(255, 161, 'Barramento terra', { fs: 8, w: 700, c: '#0d2610' }) +
        T(180, 45, 'Quadro de distribuição', { w: 700 })
      );
    },
    cabos: () => {
      const c = (y, cor, l, extra = '') => W(`M40 ${y} H250`, cor, 10) + extra + `<path d="M250 ${y} H290" stroke="var(--copper)" stroke-width="5"/>` + T(305, y + 4, l, { a: 'start', fs: 11 });
      return svg(
        c(40, F, 'Fase') + c(75, N, 'Neutro') +
        W('M40 110 H250', 'var(--terra)', 10) + `<path d="M40 110 H250" stroke="var(--terra-2)" stroke-width="10" stroke-dasharray="14 14"/><path d="M250 110 H290" stroke="var(--copper)" stroke-width="5"/>` + T(305, 114, 'Terra', { a: 'start' }) +
        c(145, R, 'Retorno') +
        T(180, 185, '1,5 mm² iluminação · 2,5 mm² tomadas · 4–6 mm² chuveiro', { fs: 10, c: M })
      );
    },
    disjuntor: () => svg(
      box(130, 20, 100, 160, 8) + box(160, 60, 40, 50, 4, I, I) + box(166, 64, 28, 22, 2, 'var(--ok)', I) + T(180, 80, 'ON', { fs: 9, w: 700, c: '#fff' }) +
      T(180, 135, 'C20', { fs: 20, w: 700 }) + T(180, 155, '230/400 V~', { fs: 9, c: M }) +
      W('M180 20 V5', F) + W('M180 180 V195', F) + T(250, 12, 'Entrada (linha)', { a: 'start', fs: 10 }) + T(250, 195, 'Saída (carga)', { a: 'start', fs: 10 }) +
      T(20, 70, 'C = curva', { a: 'start', fs: 10, c: M }) + T(20, 86, '20 = 20 A', { a: 'start', fs: 10, c: M }) +
      T(20, 120, 'Térmico:', { a: 'start', fs: 10, w: 700 }) + T(20, 134, 'sobrecarga', { a: 'start', fs: 10 }) + T(20, 154, 'Magnético:', { a: 'start', fs: 10, w: 700 }) + T(20, 168, 'curto-circuito', { a: 'start', fs: 10 })
    ),
    dr: () => svg(
      box(120, 30, 120, 140, 8) + box(140, 50, 30, 40, 4, I, I) + `<circle cx="210" cy="70" r="12" fill="var(--warn)" stroke="${I}"/>` + T(210, 74, 'T', { fs: 12, w: 700 }) +
      T(180, 120, 'IDR', { fs: 16, w: 700 }) + T(180, 140, '40 A · 30 mA', { fs: 10 }) +
      W('M150 30 V8', F) + W('M210 30 V8', N) + W('M150 170 V192', F) + W('M210 170 V192', N) +
      T(30, 60, 'Mede:', { a: 'start', fs: 11, w: 700 }) + T(30, 78, 'I fase − I neutro', { a: 'start', fs: 10 }) + T(30, 100, 'Se > 30 mA', { a: 'start', fs: 10, c: 'var(--bad)' }) + T(30, 114, 'desliga', { a: 'start', fs: 10, c: 'var(--bad)' }) +
      T(255, 100, 'Botão T:', { a: 'start', fs: 10, w: 700 }) + T(255, 114, 'teste mensal', { a: 'start', fs: 10 }) + T(255, 150, 'Terra NÃO', { a: 'start', fs: 10, c: 'var(--bad)' }) + T(255, 164, 'passa aqui', { a: 'start', fs: 10, c: 'var(--bad)' })
    ),
    dps: () => svg(
      W('M20 40 H340', F) + T(25, 30, 'Fase', { a: 'start', fs: 10 }) + W('M180 40 V70', F, 2.5) +
      box(155, 70, 50, 60, 6) + box(170, 82, 20, 10, 2, 'var(--ok)', I) + T(180, 115, 'DPS', { fs: 12, w: 700 }) +
      PE('M180 130 V170') + `<path d="M165 172 h30 M170 178 h20 M175 184 h10" stroke="${I}" stroke-width="2"/>` +
      `<path d="M60 20 l-10 18 h10 l-8 16" fill="none" stroke="var(--warn)" stroke-width="3"/>` + T(70, 70, 'Surto', { fs: 10, c: 'var(--warn)', w: 700 }) +
      W('M110 50 Q160 55 172 70', 'var(--warn)', 2) +
      T(220, 90, 'Janela verde = ok', { a: 'start', fs: 10 }) + T(220, 106, 'Vermelha = trocar', { a: 'start', fs: 10, c: 'var(--bad)' }) + T(220, 160, 'Fio curto até o terra', { a: 'start', fs: 10, c: M })
    ),
    tomada: () => svg(
      box(110, 20, 140, 160, 16, 'var(--surface)', I) + `<path d="M180 45 a55 55 0 1 1 -0.1 0z" fill="${S}" stroke="${I}" stroke-width="1.5"/>` +
      `<circle cx="155" cy="105" r="7" fill="${I}"/><circle cx="205" cy="105" r="7" fill="${I}"/><circle cx="180" cy="125" r="7" fill="${I}"/>` +
      W('M155 105 L80 60', F, 2) + T(75, 55, 'Fase', { a: 'end', fs: 11 }) + W('M205 105 L280 60', N, 2) + T(285, 55, 'Neutro', { a: 'start', fs: 11 }) +
      W('M180 125 L270 170', 'var(--terra)', 2) + T(275, 175, 'Terra (central)', { a: 'start', fs: 11 }) +
      T(60, 150, '10 A: furo 4,0 mm', { fs: 10, c: M }) + T(60, 166, '20 A: furo 4,8 mm', { fs: 10, c: M })
    ),
    interruptor: () => svg(
      T(60, 20, 'Quadro', { fs: 10, w: 700 }) + box(30, 30, 60, 40, 6) + T(60, 55, 'F  N', { fs: 11 }) +
      W('M50 70 V160 H150', F) + box(150, 140, 50, 40, 6) + W('M162 165 L188 150', I, 2.5) + dot(162, 165) + dot(188, 165) + T(175, 195, 'Interruptor', { fs: 10 }) +
      W('M200 160 H290 V75', R) + W('M70 70 V100 H230 V60 H275', N) + bulb(290, 55, true) + T(320, 92, 'Lâmpada', { fs: 10 }) +
      T(100, 155, 'fase', { fs: 9, c: M }) + T(250, 155, 'retorno', { fs: 9, c: M }) + T(150, 94, 'neutro direto', { fs: 9, c: M })
    ),
    threeway: () => {
      const sw = (x, lbl) => box(x - 25, 130, 50, 50, 6) + dot(x, 165) + dot(x - 15, 142) + dot(x + 15, 142) + W(`M${x} 165 L${x - 13} 145`, I, 2.5) + T(x, 196, lbl, { fs: 10 }) + T(x, 175, 'C', { fs: 8, c: M });
      return svg(
        box(10, 20, 60, 36, 6) + T(40, 43, 'F  N', { fs: 11 }) +
        W('M30 56 V165 H95', F) + sw(120, 'Paralelo 1') + sw(260, 'Paralelo 2') +
        W('M105 142 V110 H245 V142', R, 2.5) + W('M135 142 V122 H275 V142', R, 2.5) + T(190, 105, 'dois paralelos', { fs: 9, c: M }) +
        W('M260 165 H330 V75', R) + W('M50 56 V80 H190 V45 H310', N) + bulb(330, 45, true) +
        T(80, 180, 'fase no comum', { fs: 9, c: M }) + T(300, 180, 'retorno do comum', { fs: 9, c: M })
      );
    },
    lampada: () => svg(
      `<path d="M180 30 a45 45 0 0 1 30 80 v20 h-60 v-20 a45 45 0 0 1 30 -80z" fill="var(--glow)" stroke="${I}" stroke-width="2"/>` +
      box(150, 132, 60, 30, 4, M, I) + W('M150 140 H210 M150 148 H210 M150 156 H210', 'var(--surface)', 1.5) +
      T(60, 50, '9 W LED', { fs: 13, w: 700 }) + T(60, 68, '≈ 806 lm', { fs: 11 }) + T(60, 84, '= 60 W incand.', { fs: 10, c: M }) +
      T(300, 50, '2.700 K', { fs: 12, w: 700, c: 'var(--warm)' }) + T(300, 66, 'quente', { fs: 10 }) + T(300, 100, '6.500 K', { fs: 12, w: 700, c: N }) + T(300, 116, 'fria', { fs: 10 }) +
      T(180, 188, 'Rosca: neutro · contato central: retorno', { fs: 10, c: M })
    ),
    aterramento: () => svg(
      `<rect x="0" y="120" width="360" height="80" fill="var(--soil)"/>` + T(30, 140, 'Solo', { fs: 10, a: 'start', c: 'var(--surface)' }) +
      W('M180 110 V195', 'var(--copper)', 8) + T(200, 180, 'Haste cobreada 2,4 m', { a: 'start', fs: 10, c: 'var(--surface)' }) +
      box(150, 70, 60, 40, 6) + T(180, 94, 'BEP', { fs: 12, w: 700 }) +
      PE('M210 90 H320 V40') + box(290, 15, 60, 25, 4) + T(320, 32, 'Tomadas', { fs: 9 }) +
      PE('M150 90 H40 V40') + box(10, 15, 60, 25, 4) + T(40, 32, 'Chuveiro', { fs: 9 }) +
      T(180, 60, 'Barramento de equipotencialização', { fs: 9, c: M })
    ),
    chuveiro: () => svg(
      W('M60 10 V40 H120', M, 8) + `<path d="M120 25 h70 v30 q-35 25 -70 0z" fill="${S}" stroke="${I}" stroke-width="2"/>` +
      `<g stroke="${N}" stroke-width="2" stroke-dasharray="4 6">${[135, 150, 165, 180].map(x => `<path d="M${x} 70 L${x - 10} 140"/>`).join('')}</g>` +
      W('M190 35 H250 V110', F, 3) + W('M190 42 H262 V110', 'var(--fase-2)', 3) + PE('M190 49 H274 V110') +
      box(235, 110, 60, 50, 6) + T(265, 132, 'Disjuntor', { fs: 9 }) + T(265, 146, '+ DR', { fs: 9, w: 700 }) + T(265, 175, 'Circuito exclusivo', { fs: 10, w: 700 }) +
      T(40, 170, '5.500 W / 220 V = 25 A', { a: 'start', fs: 11, w: 700 }) + T(40, 186, 'fio 4 mm² · disjuntor 32 A', { a: 'start', fs: 10, c: M })
    ),
    multimetro: () => svg(
      box(120, 15, 120, 175, 16, 'var(--warn)', I) + box(135, 30, 90, 40, 4, '#c9d6c2', I) + T(180, 58, '127.4', { fs: 20, w: 700, c: '#1a1a1a' }) +
      `<circle cx="180" cy="115" r="28" fill="${S}" stroke="${I}" stroke-width="2"/>` + W('M180 115 L200 95', I, 3) +
      T(150, 92, 'V~', { fs: 8, w: 700, c: '#1a1a1a' }) + T(212, 92, 'V⎓', { fs: 8, w: 700, c: '#1a1a1a' }) + T(214, 140, 'Ω', { fs: 9, w: 700, c: '#1a1a1a' }) + T(146, 140, 'A', { fs: 9, w: 700, c: '#1a1a1a' }) +
      `<circle cx="150" cy="170" r="7" fill="#111"/><circle cx="210" cy="170" r="7" fill="${F}"/>` + T(150, 186, 'COM', { fs: 7, c: '#1a1a1a' }) + T(210, 186, 'VΩ', { fs: 7, c: '#1a1a1a' }) +
      W('M150 170 Q90 180 60 120', '#222', 3) + W('M210 170 Q270 180 300 120', F, 3) +
      T(60, 105, 'Tensão: em paralelo', { fs: 9 }) + T(300, 105, 'CAT III 600 V', { fs: 9 })
    ),
    diagnostico: () => {
      const n = (x, y, w, l, c = S) => box(x, y, w, 30, 6, c) + T(x + w / 2, y + 19, l, { fs: 10 });
      return svg(
        n(110, 5, 140, 'Disjuntor desarmou') + W('M180 35 V50', I, 1.5) +
        n(110, 50, 140, 'Desarmou na hora?') + W('M140 80 L80 105 M220 80 L280 105', I, 1.5) + T(95, 90, 'sim', { fs: 9 }) + T(265, 90, 'não', { fs: 9 }) +
        n(10, 105, 140, 'Curto-circuito', 'var(--bad-bg)') + n(210, 105, 140, 'Sobrecarga', 'var(--warn-bg)') +
        T(80, 160, 'Desligue tudo e', { fs: 9 }) + T(80, 174, 'procure o ponto', { fs: 9 }) + T(280, 160, 'Meça a corrente,', { fs: 9 }) + T(280, 174, 'divida o circuito', { fs: 9 }) +
        T(180, 196, 'Nunca aumente o disjuntor', { fs: 10, c: 'var(--bad)', w: 700 })
      );
    },
    checklist: () => svg(
      box(90, 10, 180, 180, 10, 'var(--surface)', I) +
      ['Testar DR (mensal)', 'Ver janela do DPS', 'Checar aquecimento', 'Reapertar quadro', 'Trocar tomada frouxa'].map((l, i) =>
        box(105, 28 + i * 32, 16, 16, 3, i < 3 ? 'var(--ok)' : S, I) + (i < 3 ? W(`M108 ${36 + i * 32} l4 4 7 -8`, '#fff', 2) : '') + T(130, 41 + i * 32, l, { a: 'start', fs: 11 })
      ).join('')
    )
  };
})();
