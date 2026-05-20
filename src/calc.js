export function calcCAPM({ Rf, beta, ERP }) {
  const r = Rf + beta * ERP;
  return { r };
}

export function calcGordon({ EPS, payout, g, r, currentPrice }) {
  if (r <= g) throw new Error('r ≤ g: 할인율이 성장률보다 커야 합니다.');
  const D0 = EPS * payout;
  const D1 = D0 * (1 + g);
  const P = D1 / (r - g);
  const gap = ((P - currentPrice) / currentPrice) * 100;
  return { D0, D1, P, gap };
}

export function calc2Stage({ EPS, payout, g1, g2, n, r, currentPrice }) {
  if (r <= g2) throw new Error('r ≤ g2: 할인율이 2단계 성장률보다 커야 합니다.');
  let D = EPS * payout;
  let pv1 = 0;
  for (let t = 1; t <= n; t++) {
    D = D * (1 + g1);
    pv1 += D / Math.pow(1 + r, t);
  }
  const TV = (D * (1 + g2)) / (r - g2);
  const pvTV = TV / Math.pow(1 + r, n);
  const P = pv1 + pvTV;
  const gap = ((P - currentPrice) / currentPrice) * 100;
  return { pv1, TV, pvTV, P, gap };
}

export function calc3Stage({ EPS, payout, g1, g3, n1, n2, r, currentPrice }) {
  if (r <= g3) throw new Error('r ≤ g3: 할인율이 3단계 성장률보다 커야 합니다.');
  let D = EPS * payout;
  let pv1 = 0;

  // Stage 1
  for (let t = 1; t <= n1; t++) {
    D = D * (1 + g1);
    pv1 += D / Math.pow(1 + r, t);
  }

  // Stage 2 (linear interpolation of growth)
  let pv2 = 0;
  for (let t = 1; t <= n2; t++) {
    const gt = g1 + (g3 - g1) * (t / n2);
    D = D * (1 + gt);
    pv2 += D / Math.pow(1 + r, n1 + t);
  }

  const TV = (D * (1 + g3)) / (r - g3);
  const pvTV = TV / Math.pow(1 + r, n1 + n2);
  const P = pv1 + pv2 + pvTV;
  const gap = ((P - currentPrice) / currentPrice) * 100;
  return { pv1, pv2, TV, pvTV, P, gap };
}
