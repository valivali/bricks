import React from "react"

export const WallIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M3 21H21V11H3V21ZM3 11V3H21V11M9 3V21M15 3V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default WallIcon
