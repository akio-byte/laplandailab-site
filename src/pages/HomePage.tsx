import React from 'react'
import SiteLayout from '../components/layout/SiteLayout'
import ContactSection from '../sections/ContactSection'
import FocusAreasSection from '../sections/FocusAreasSection'
import HeroSection from '../sections/HeroSection'
import MissionSection from '../sections/MissionSection'
import ProgramsSection from '../sections/ProgramsSection'
import UpdatesSection from '../sections/UpdatesSection'
import {
  contactChannels,
  contactIntro,
  focusAreas,
  heroContent,
  missionDescription,
  missionItems,
  programs,
} from '../data/siteContent'
import { formatUpdateDate, getAllUpdates } from '../app/updates/posts'
import type { UpdateItem } from '../types/content'

const latestUpdates: UpdateItem[] = getAllUpdates()
  .slice(0, 3)
  .map((update) => ({
    title: update.title,
    description: update.description ?? 'Tutustu tarkemmin artikkelistamme.',
    date: formatUpdateDate(update.date),
    href: `/updates/${update.slug}`,
  }))

const HomePage: React.FC = () => {
  return (
    <SiteLayout>
      <HeroSection {...heroContent} />

      <MissionSection
        title="Toimimme Lapin tekoälyn moottorina"
        description={missionDescription}
        items={missionItems}
      />

      <FocusAreasSection
        title="Painopistealueet"
        description="Monialainen kehitystyö keskittyy arktisiin olosuhteisiin sopiviin ratkaisuihin, vastuulliseen liiketoimintaan sekä alueen osaamisen kasvattamiseen."
        areas={focusAreas}
      />

      <ProgramsSection
        title="Ohjelmat ja palvelut"
        description="Rakennamme polkuja ideasta vaikuttavaksi ratkaisuksi. Ohjelmamme yhdistävät tutkimuksen, yritysten tarpeet ja opiskelijoiden osaamisen."
        programs={programs}
      />

      <UpdatesSection
        title="Ajankohtaista Lapland AI Labissa"
        description="Seuraa kehitystä ja ajankohtaisia hankkeita. Kerromme säännöllisesti, miten yhteistyö tuottaa tuloksia Lapissa ja kansainvälisesti."
        updates={latestUpdates}
      />

      <ContactSection
        title="Ota yhteyttä tiimiimme"
        description={contactIntro}
        channels={contactChannels}
        primaryAction={{
          label: 'Sovi työpaja tai tapaaminen',
          href: 'mailto:info@laplandailab.fi',
        }}
        note="Kerro viestissä taustastasi ja tavoitteistasi – palaamme pian ehdotuksella etenemisestä."
      />
    </SiteLayout>
  )
}

export default HomePage
