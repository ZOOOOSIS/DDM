import { useState } from 'react';
import Field from './Field';
import ResultRow from './ResultRow';
import { calcGordon } from '../calc';

const init = { EPS: '', payout: '', g: '', r: '', currentPrice: '' };

export default function Gordon() {
  const [f, setF] = useState(init);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  function run() {
    setError('');
    setResult(null);
    try {
      setResult(calcGordon({
        EPS: Number(f.EPS),
        payout: Number(f.payout),
        g: Number(f.g),
        r: Number(f.r),
        currentPrice: Number(f.currentPrice),
      }));
    } catch (e) {
      setError(e.message);
    }
  }

  const gap = result?.gap;

  return (
    <div className="card">
      <h2>Gordon Growth Model</h2>
      <div className="form-grid">
        <Field label="EPS" hint="주당순이익 (원)" value={f.EPS} onChange={set('EPS')} />
        <Field label="배당성향 (Payout)" hint="예: 0.4" value={f.payout} onChange={set('payout')} />
        <Field label="g (성장률)" hint="예: 0.03" value={f.g} onChange={set('g')} />
        <Field label="r (할인율)" hint="예: 0.079" value={f.r} onChange={set('r')} />
        <Field label="현재주가" hint="원" value={f.currentPrice} onChange={set('currentPrice')} />
      </div>
      <button className="btn" onClick={run}>계산</button>
      {error && <div className="error-box">{error}</div>}
      {result && (
        <div className="result">
          <ResultRow label="D0 (EPS × Payout)" value={result.D0.toFixed(2)} />
          <ResultRow label="D1 (D0 × (1+g))" value={result.D1.toFixed(2)} />
          <ResultRow label="적정주가 P" value={`${result.P.toFixed(2)} 원`} highlight />
          <ResultRow
            label="괴리율"
            value={`${gap >= 0 ? '+' : ''}${gap.toFixed(2)} %`}
            highlight
            gapColor={gap >= 0 ? 'positive' : 'negative'}
          />
        </div>
      )}
    </div>
  );
}
