import React from 'react';

type AlkeIconProps = React.SVGProps<SVGSVGElement>;

const AlkeIcon: React.FC<AlkeIconProps> = (props) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="./logo-color.svg"
    >
      {/* Place the rest of your <path> or <g> elements here */}
    </svg>
  );
};

export default AlkeIcon;
