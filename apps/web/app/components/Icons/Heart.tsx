export default function Heart({ color = 'currentColor' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2761_8608)">
        <path
          d="M14.4473 1.95729C12.7348 0.497912 10.1879 0.760412 8.61601 2.38229L8.00038 3.01666L7.38476 2.38229C5.81601 0.760412 3.26601 0.497912 1.55351 1.95729C-0.408992 3.63229 -0.512117 6.63854 1.24413 8.45416L7.29101 14.6979C7.68163 15.101 8.31601 15.101 8.70663 14.6979L14.7535 8.45416C16.5129 6.63854 16.4098 3.63229 14.4473 1.95729Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2761_8608">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
