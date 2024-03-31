export default function Ticket({ color = 'currentColor' }) {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_2761_7188)'>
        <path
          d='M3.55556 5.33268H12.4444V10.666H3.55556V5.33268ZM14.6667 7.99935C14.6667 8.73574 15.2636 9.33268 16 9.33268V11.9993C16 12.7357 15.4031 13.3327 14.6667 13.3327H1.33333C0.596944 13.3327 0 12.7357 0 11.9993V9.33268C0.736389 9.33268 1.33333 8.73574 1.33333 7.99935C1.33333 7.26296 0.736389 6.66602 0 6.66602V3.99935C0 3.26296 0.596944 2.66602 1.33333 2.66602H14.6667C15.4031 2.66602 16 3.26296 16 3.99935V6.66602C15.2636 6.66602 14.6667 7.26296 14.6667 7.99935ZM13.3333 5.11046C13.3333 4.74227 13.0349 4.44379 12.6667 4.44379H3.33333C2.96514 4.44379 2.66667 4.74227 2.66667 5.11046V10.8882C2.66667 11.2564 2.96514 11.5549 3.33333 11.5549H12.6667C13.0349 11.5549 13.3333 11.2564 13.3333 10.8882V5.11046Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_2761_7188'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}