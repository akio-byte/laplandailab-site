import React from 'react'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import { navigation } from '../../data/siteContent'

interface SiteLayoutProps {
  children: React.ReactNode
  mainClassName?: string
  contactHref?: string
}

const SiteLayout: React.FC<SiteLayoutProps> = ({
  children,
  mainClassName,
  contactHref = '#contact',
}) => {
  const mainClasses = ['flex-1', mainClassName].filter(Boolean).join(' ')

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <SiteHeader navigation={navigation} contactHref={contactHref} />
      <main className={mainClasses}>{children}</main>
      <SiteFooter navigation={navigation} />
    </div>
  )
}

export default SiteLayout
