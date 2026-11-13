export default function NoAiSign({ className }: NoAiSignProps) {
  return (
    <svg
      viewBox="0 0 167 477"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <use href="#stroke0_10381_1837" fill="#7D7D7D" />
      <use
        href="#stroke0_10381_1837"
        fill="url(#paint0_linear_10381_1837)"
        fillOpacity="0.2"
      />
      <circle
        cx="83.0606"
        cy="83.0606"
        r="79.2635"
        fill="#FF0000"
        strokeWidth="7.59411"
        stroke="white"
      />
      <path
        d="M55.3294 116.426H36.2125L57.7509 51.1733H81.9657L103.504 116.426H84.3872L70.1132 69.1432H69.6034L55.3294 116.426ZM51.7609 90.6816H87.7008V103.936H51.7609V90.6816ZM127.504 51.1733V116.426H109.789V51.1733H127.504Z"
        fill="black"
      />
      <path
        d="M138.592 27.5273L27.5283 138.591M27.5283 27.5273L138.592 138.591"
        strokeWidth="7.47545"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="white"
        strokeOpacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10381_1837"
          x1="109.165"
          y1="279.558"
          x2="56.4813"
          y2="279.558"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.495192" stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <path
          id="stroke0_10381_1837"
          d="M96.3504 476.056H70.2456V83.5352H96.3504V476.056Z"
        />
      </defs>
    </svg>
  );
}

interface NoAiSignProps {
  className?: string;
}
