import { useState } from 'react';
import Field from './Field';
import ResultRow from './ResultRow';
import { calcCAPM } from '../calc';

const init = { Rf: '', beta: '', ERP: '' };

export default function CAPM() {
  const [f, setF] = useState(init);
  const [result, setResult] = useState(null);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  function run() {
    setResult(calcCAPM({
      Rf: Number(f.Rf),
      beta: Number(f.beta),
      ERP: Number(f.ERP),
    }));
  }

  return (
    <div className="card">
      <h2>CAPM — 기대수익률</h2>
      <div className="form-grid">
        <Field label="Rf (무위험수익률)" hint="예: 0.035" value={f.Rf} onChange={set('Rf')} />
        <Field label="β (베타)" hint="예: 0.8" value={f.beta} onChange={set('beta')} />
        <Field label="ERP (초과수익률)" hint="예: 0.055" value={f.ERP} onChange={set('ERP')} />
      </div>
      <button className="btn" onClick={run}>계산</button>
      {result && (
        <div className="result">
          <ResultRow label="Rf" value={f.Rf} />
          <ResultRow label="β × ERP" value={`${f.beta} × ${f.ERP} = ${(Number(f.beta) * Number(f.ERP)).toFixed(6)}`} />
          <ResultRow label="기대수익률 r" value={`${(result.r * 100).toFixed(4)} %`} highlight />
        </div>
      )}
    </div>
  );
}
