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
} from './data/siteContent'
import { fallbackUpdates } from './data/fallbackUpdates'
import { useUpdates } from './hooks/useUpdates'
import ContactSection from './sections/ContactSection'
import FocusAreasSection from './sections/FocusAreasSection'
import HeroSection from './sections/HeroSection'
import MissionSection from './sections/MissionSection'
import ProgramsSection from './sections/ProgramsSection'
import UpdatesSection from './sections/UpdatesSection'

const App: React.FC = () => {
  const { updates: remoteUpdates, isLoading, error } = useUpdates()
  const hasRemoteUpdates = remoteUpdates.length > 0
  const updates = hasRemoteUpdates ? remoteUpdates : fallbackUpdates

  const theme =
    typeof document !== 'undefined' ? document.documentElement.dataset.theme ?? 'dark' : 'dark'

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme
    }
  }, [theme])

  return (
    <div className="app-shell" data-theme={theme}>
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

        <UpdatesSection
          title="Ajankohtaista Lapland AI Labissa"
          description="Seuraa kehitystä ja ajankohtaisia hankkeita. Kerromme säännöllisesti, miten yhteistyö tuottaa tuloksia Lapissa ja kansainvälisesti."
          updates={updates}
          status={{
            isLoading,
            error,
            isFallback: !hasRemoteUpdates && !isLoading,
          }}
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
