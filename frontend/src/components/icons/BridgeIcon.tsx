import React from "react"

export const BridgeIcon: React.FC<React.SVGProps<SVGSVGElement>> = props => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M3 17V19H21V17M3 17L5.5 10H18.5L21 17M3 17H21M7 10V17M12 10V17M17 10V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default BridgeIcon
