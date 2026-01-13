const WAVE_LAYERS = [
  { duration: '20s', direction: 'normal', opacity: 'opacity-40' },
  { duration: '15s', direction: 'reverse', opacity: 'opacity-40' },
  { duration: '10s', direction: 'normal', opacity: 'opacity-30' },
] as const;

export const WavyLine = () => (
  <div className="relative w-full h-12 overflow-hidden select-none pointer-events-none text-gray-400 dark:text-gray-100">
    {WAVE_LAYERS.map((layer, i) => (
      <div
        key={i}
        className={`absolute top-0 left-0 flex w-[200%] animate-wave-scroll ${layer.opacity}`}
        style={{ animationDuration: layer.duration, animationDirection: layer.direction }}
      >
        <WaveSVG />
        <WaveSVG />
      </div>
    ))}
  </div>
);

const WaveSVG = () => (
  <svg
    className="w-1/2 block"
    viewBox="0 0 1200 48"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M0 24 Q 150 36 300 24 T 600 24 T 900 24 T 1200 24"
      stroke="currentColor"
      strokeWidth="2"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);
