import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-sky-500 text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 active:bg-sky-500/90',
  secondary:
    'bg-white/10 text-white hover:bg-white/20 active:bg-white/30',
  ghost: 'text-sky-400 hover:text-sky-300 hover:bg-sky-500/10',
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = 'primary', className, children, ...rest }, ref) => {
    const classes = [baseStyles, variantStyles[variant], className]
      .filter(Boolean)
      .join(' ')

    return (
      <a ref={ref} className={classes} {...rest}>
        {children}
      </a>
    )
  },
)

ButtonLink.displayName = 'ButtonLink'

export default ButtonLink
