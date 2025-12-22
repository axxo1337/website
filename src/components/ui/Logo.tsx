export default function Logo({ className }: Logo) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 35"
      fill="none"
      className={className}
    >
      <path
        d="M34.5791 34.5371L17.5898 23.9053L17.5 23.8486L17.4102 23.9053L0.419922 34.5371L17.5 0.37793L34.5791 34.5371Z"
        fill="white"
        stroke="black"
        strokeWidth="0.337775"
      />
    </svg>
  );
}

interface Logo {
  className?: string;
}
