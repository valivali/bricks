import React from "react"

import styles from "./text.module.scss"
import type { BlockquoteProps, SubtitleProps, TextProps, TitleProps } from "./text.types"

export const Text = ({ children, className, size, variant = "span" }: TextProps) => {
  const Tag = (variant === "caption" ? "span" : variant) as React.ElementType
  const sizeClass = size ? `text--${size}` : undefined
  const classes = [styles.text, sizeClass && styles[sizeClass], className].filter(Boolean).join(" ")

  return <Tag className={classes}>{children}</Tag>
}

const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

export const Title = ({ children, className, size, level = 1 }: TitleProps) => {
  const Tag = headingTags[level - 1] ?? "h1"
  const sizeClass = size ? `title--${size}` : undefined
  const classes = [styles.title, sizeClass && styles[sizeClass], className].filter(Boolean).join(" ")

  return <Tag className={classes}>{children}</Tag>
}

export const Subtitle = ({ children, className, size, variant = "div" }: SubtitleProps) => {
  const Tag = variant
  const sizeClass = size ? `subtitle--${size}` : undefined
  const classes = [styles.subtitle, sizeClass && styles[sizeClass], className].filter(Boolean).join(" ")

  return <Tag className={classes}>{children}</Tag>
}

export const Blockquote = ({ children, author, className, size }: BlockquoteProps) => {
  const sizeClass = size ? `blockquote--${size}` : undefined
  const classes = [styles.blockquote, sizeClass && styles[sizeClass], className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div className={styles.quoteText}>{children}</div>
      {author && <span className={styles.quoteAuthor}>— {author}</span>}
    </div>
  )
}
