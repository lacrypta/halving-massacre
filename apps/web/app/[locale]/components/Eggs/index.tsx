'use client';

import { useState } from 'react';
import './styles.css';

export default function Eggs() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
     <div
      className={`egg ${isHovered ? 'shake' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M29.2644 16.2676C27.7767 21.8198 23.8836 23.1677 19.8186 22.0785C15.7536 20.9893 13.056 17.8754 14.5437 12.3232C16.0314 6.77102 21.141 0.882984 25.206 1.9722C29.2711 3.06141 30.7521 10.7154 29.2644 16.2676Z"
        fill="url(#paint0_linear_2319_11122)"
      />
      <g filter="url(#filter0_d_2319_11122)">
        <path
          d="M18.2151 12.6952C19.7028 18.2474 17.0052 21.3613 12.9402 22.4505C8.87519 23.5397 4.98209 22.1918 3.49438 16.6396C2.00667 11.0874 3.48772 3.43342 7.55273 2.34421C11.6177 1.25499 16.7274 7.14303 18.2151 12.6952Z"
          fill="url(#paint1_linear_2319_11122)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2319_11122"
          x="0.929199"
          y="2.21289"
          width="23.6997"
          height="28.5859"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0 0.109804 0 0 0 0.65 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2319_11122" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2319_11122" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_2319_11122"
          x1="25.206"
          y1="1.9722"
          x2="19.8186"
          y2="22.0785"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.175" stopColor="#F2EFEA" />
          <stop offset="1" stopColor="#BDB7AF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2319_11122"
          x1="7.55273"
          y1="2.34421"
          x2="12.9402"
          y2="22.4505"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.175" stopColor="#F2EFEA" />
          <stop offset="1" stopColor="#BDB7AF" />
        </linearGradient>
      </defs>
      </svg>
      </div>
  );
}
