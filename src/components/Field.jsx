export default function Field({ label, hint, ...props }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input type="number" step="any" {...props} />
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}
