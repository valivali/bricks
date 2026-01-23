import React from "react"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
