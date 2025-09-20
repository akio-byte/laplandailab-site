import React from 'react'
import { NavItem } from '../../types/content'

interface SiteFooterProps {
  navigation: NavItem[]
}

const SiteFooter: React.FC<SiteFooterProps> = ({ navigation }) => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-3">
            <a
              href="#hero"
              className="text-lg font-semibold tracking-tight text-white transition hover:text-sky-300"
            >
              Lapland<span className="text-sky-400">AI</span>Lab
            </a>
            <p className="text-sm text-gray-400">
              Lapland AI Lab kokoaa Lapin korkeakoulujen ja yritysten osaamisen yhteen ja
              auttaa viemään tekoälyn mahdollisuudet käytännön ratkaisuiksi.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-sm text-gray-300">
            <nav aria-label="Alavalikko" className="flex flex-wrap gap-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="text-xs text-gray-500">
              © {year} Lapland AI Lab. Kaikki oikeudet pidätetään.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
