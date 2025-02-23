import * as React from 'react';

type AlkeLogoProps = React.SVGProps<SVGSVGElement>;

const AlkeLogo: React.FC<AlkeLogoProps> = (props) => {
  return (
    <svg
      // Removed `version="1.1"` because React doesn't need it.
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1500"
      height="1500"
      viewBox="0 0 1500 1000"
      {...props} // Spread any additional props (e.g., className, onClick, etc.)
    >
      <rect
        width="1500"
        height="1000"
        x="0"
        y="0"
        id="background"
        stroke="transparent"
        fill="#3a3836"
      />
      {/* Nested <svg> */}
      <svg
        xmlSpace="preserve"
        width="1000"
        height="500"
        data-version="2"
        data-id="lg_qrcDG8imJAxfHD9gOI"
        viewBox="0 0 563 112"
        x="250"
        y="250"
      >
        <rect width="100%" height="100%" fill="transparent" />
        <path
          fill="#4be62e"
          d="M276.49 86.72h-34.82l39.16-74.76q1.43-2.72 4.43-4.22 3.01-1.5 6.27-1.5 2.91 0 5.69 1.33 2.79 1.33 4.32 4.09l42.02 75.06h-40l-3.11-7.79h-21.3zm13.46-44.73-8.38 21.31h15.92zm56.66 44.73V7.96h30.67V63h26.49v23.72zm60.31-78.76h31.21v24.22l18.99-24.22h32.01l-25.45 33.19 29.39 45.57h-35.95l-16.47-27.86-1.83 3.2v24.66h-31.9zm92.02 78.76V7.96h56.76v22.69h-26.09v6.46h25.99v19.33h-25.99v7.45h27.81v22.83z"
        />
        <rect
          width="100"
          height="50.38"
          x="-50"
          y="-25.19"
          fill="#4be62e"
          rx="7"
          ry="7"
          transform="translate(121.327 56.366) scale(1.8508)"
        />
        <path
          fill="#3a3836"
          d="m93.996 1.128 63.345 54.912-63.345 54.912H52.111l48.229-41.746H5.58V42.585h94.41L52.035 1.049z"
        />
        <circle
          r="7.829"
          fill="#3a3836"
          transform="translate(181.587 56.365) scale(1.8508)"
        />
      </svg>
    </svg>
  );
};

export default AlkeLogo;
