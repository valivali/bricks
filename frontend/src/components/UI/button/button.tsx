import * as React from "react"

import styles from "./button.module.scss"

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

export type ButtonSize = "default" | "sm" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading = false, asChild = false, children, disabled, ...props }, ref) => {
    const variantClass = `button--${variant}`
    const sizeClass = `button--size-${size}`

    const classes = [styles.button, styles[variantClass], styles[sizeClass], className].filter(Boolean).join(" ")

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>
      return React.cloneElement(child, {
        className: [classes, child.props.className].filter(Boolean).join(" "),
        ref,
        ...props,
        disabled: (disabled || isLoading) as unknown as boolean
      } as React.ButtonHTMLAttributes<HTMLButtonElement>)
    }

    return (
      <button className={classes} ref={ref} disabled={disabled || isLoading} {...props}>
        {isLoading ? "Loading..." : children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
