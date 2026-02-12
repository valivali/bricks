import React from "react"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

export const ErrorBadgeIcon: React.FC<IconProps> = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 48 48" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M24.032 13c.445 0 .806.366.806.798v11.056h2v-8.18a.807.807 0 0 1 1.613 0V27.64l1.888.46 1.54-2.977a1.03 1.03 0 0 1 1.462-.413l.044.027.046.023c.553.276.726.957.416 1.443l-.012.018-3.71 6.393C29.211 34.127 27.721 35 26.02 35H20.69C18.077 35 16 32.926 16 30.337V17.933a.807.807 0 0 1 1.613 0v6.741h2v-9.528a.807.807 0 0 1 1.612 0v9.618h2V13.798c0-.432.361-.798.807-.798m-2.521-.43a2.807 2.807 0 0 1 5.327 1.228v.197a2.807 2.807 0 0 1 3.613 2.68v6.996a3.03 3.03 0 0 1 3.916-.678c1.572.815 2.104 2.792 1.177 4.267l-3.697 6.373-.005.007C30.59 35.719 28.468 37 26.02 37H20.69C16.981 37 14 34.04 14 30.337V17.933a2.807 2.807 0 0 1 3.613-2.68v-.107a2.807 2.807 0 0 1 3.898-2.577"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M24 5c10.493 0 19 8.507 19 19s-8.507 19-19 19S5 34.493 5 24 13.507 5 24 5m21 19c0-11.598-9.402-21-21-21S3 12.402 3 24s9.402 21 21 21 21-9.402 21-21"
      clipRule="evenodd"
    />
  </svg>
)
