export default function ResultRow({ label, value, highlight, gapColor }) {
  return (
    <div className={`result-row${highlight ? ' highlight' : ''}`}>
      <span className="label">{label}</span>
      <span className={`value${gapColor ? ` gap-${gapColor}` : ''}`}>{value}</span>
    </div>
  );
}
