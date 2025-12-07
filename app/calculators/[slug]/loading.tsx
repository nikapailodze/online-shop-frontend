const CalculatorLoading = () => {
  return (
    <div style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 640, width: "100%", display: "grid", gap: 12 }}>
        <div style={{ height: 24, background: "#f3f4f6", borderRadius: 6 }} />
        <div style={{ height: 18, background: "#f3f4f6", borderRadius: 6, width: "80%" }} />
        <div style={{ height: 180, background: "#f3f4f6", borderRadius: 12 }} />
        <div style={{ height: 120, background: "#f3f4f6", borderRadius: 12 }} />
      </div>
    </div>
  );
};

export default CalculatorLoading;
