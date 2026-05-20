import { useState } from 'react';
import CAPM from './components/CAPM';
import Gordon from './components/Gordon';
import TwoStage from './components/TwoStage';
import ThreeStage from './components/ThreeStage';

const TABS = [
  { id: 'capm', label: 'CAPM' },
  { id: 'gordon', label: 'Gordon Growth' },
  { id: '2stage', label: '2-Stage DDM' },
  { id: '3stage', label: '3-Stage DDM' },
];

export default function App() {
  const [tab, setTab] = useState('capm');

  return (
    <>
      <h1>DDM 주가 계산기</h1>
      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {tab === 'capm' && <CAPM />}
      {tab === 'gordon' && <Gordon />}
      {tab === '2stage' && <TwoStage />}
      {tab === '3stage' && <ThreeStage />}
    </>
  );
}
