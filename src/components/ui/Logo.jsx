export default function Logo({ size = 'md' }) {
  // height targets: sm=32px, md=40px, lg=52px
  const heights = { sm: 32, md: 40, lg: 52 };
  const h = heights[size] ?? 40;

  return (
    <img
      src="/logo.png"
      alt="N Square Energies"
      height={h}
      style={{ height: h, width: 'auto', display: 'block' }}
      loading="eager"
    />
  );
}
