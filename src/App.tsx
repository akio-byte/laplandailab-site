import React from 'react'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import {
  contactChannels,
  contactIntro,
  focusAreas,
  heroContent,
  missionDescription,
  missionItems,
  navigation,
  programs,
  updates,
} from './data/siteContent'
import ContactSection from './sections/ContactSection'
import FocusAreasSection from './sections/FocusAreasSection'
import HeroSection from './sections/HeroSection'
import MissionSection from './sections/MissionSection'
import ProgramsSection from './sections/ProgramsSection'
import SupabaseUpdates from './components/updates/SupabaseUpdates'

const App: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100">
      <SiteHeader navigation={navigation} />
      <main>
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

        <SupabaseUpdates
          title="Ajankohtaista Lapland AI Labissa"
          description="Seuraa kehitystä ja ajankohtaisia hankkeita. Kerromme säännöllisesti, miten yhteistyö tuottaa tuloksia Lapissa ja kansainvälisesti."
          fallback={updates}
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
      </main>
      <SiteFooter navigation={navigation} />
    </div>
  )
}

export default App
