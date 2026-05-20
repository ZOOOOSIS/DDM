import { useState } from 'react';
import Field from './Field';
import ResultRow from './ResultRow';
import { calc3Stage } from '../calc';

const init = { EPS: '', payout: '', g1: '', g3: '', n1: '', n2: '', r: '', currentPrice: '' };

export default function ThreeStage() {
  const [f, setF] = useState(init);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  function run() {
    setError('');
    setResult(null);
    try {
      setResult(calc3Stage({
        EPS: Number(f.EPS),
        payout: Number(f.payout),
        g1: Number(f.g1),
        g3: Number(f.g3),
        n1: Number(f.n1),
        n2: Number(f.n2),
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
      <h2>3-Stage DDM</h2>
      <div className="form-grid">
        <Field label="EPS" hint="주당순이익 (원)" value={f.EPS} onChange={set('EPS')} />
        <Field label="배당성향 (Payout)" hint="예: 0.4" value={f.payout} onChange={set('payout')} />
        <Field label="g1 (1단계 성장률)" hint="예: 0.15" value={f.g1} onChange={set('g1')} />
        <Field label="g3 (영구 성장률)" hint="예: 0.03" value={f.g3} onChange={set('g3')} />
        <Field label="n1 (1단계 기간, 년)" hint="예: 5" value={f.n1} onChange={set('n1')} />
        <Field label="n2 (2단계 전환 기간, 년)" hint="예: 5" value={f.n2} onChange={set('n2')} />
        <Field label="r (할인율)" hint="예: 0.079" value={f.r} onChange={set('r')} />
        <Field label="현재주가" hint="원" value={f.currentPrice} onChange={set('currentPrice')} />
      </div>
      <button className="btn" onClick={run}>계산</button>
      {error && <div className="error-box">{error}</div>}
      {result && (
        <div className="result">
          <ResultRow label="PV (1단계 배당합)" value={result.pv1.toFixed(2)} />
          <ResultRow label="PV (2단계 배당합)" value={result.pv2.toFixed(2)} />
          <ResultRow label="Terminal Value" value={result.TV.toFixed(2)} />
          <ResultRow label="PV (Terminal Value)" value={result.pvTV.toFixed(2)} />
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
