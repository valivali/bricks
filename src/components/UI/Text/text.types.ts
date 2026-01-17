import type React from "react"
export type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div" | "p" | "blockquote" | "caption"
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"

export interface TextProps {
  children: React.ReactNode
  className?: string
  size?: TextSize
  variant?: TextVariant
}

export interface TitleProps extends Omit<TextProps, "variant"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: TextSize
}

export interface SubtitleProps extends TextProps {
  variant?: "div" | "span" | "p"
}

export interface BlockquoteProps extends Omit<TextProps, "variant"> {
  author?: string
}
