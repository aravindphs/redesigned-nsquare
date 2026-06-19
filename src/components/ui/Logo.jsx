export default function Logo({ size = 'md' }) {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;
  const hexW = Math.round(44 * scale);
  const hexH = Math.round(50 * scale);
  const fontSize = Math.round(16 * scale);

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: hexW, height: hexH }}>
        <svg width={hexW} height={hexH} viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="22,1 43,12.5 43,37.5 22,49 1,37.5 1,12.5"
            fill="#16A34A"
            stroke="#16A34A"
            strokeWidth="1"
          />
          <text
            x="22"
            y="28"
            textAnchor="middle"
            fill="white"
            fontFamily="Poppins, sans-serif"
            fontWeight="700"
            fontSize={fontSize}
          >
            N²
          </text>
          <circle cx="36" cy="10" r="4" fill="#DC2626" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className="font-bold tracking-tight"
          style={{ color: '#16A34A', fontSize: Math.round(16 * scale) }}
        >
          N Square Energies
        </span>
        <span
          className="text-gray-500 font-medium"
          style={{ fontSize: Math.round(10 * scale) }}
        >
          Solar EPC Tamil Nadu
        </span>
      </div>
    </div>
  );
}
