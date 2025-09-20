import type {
  ActionLink,
  ContactChannel,
  FocusArea,
  HeroStat,
  MissionItem,
  NavItem,
  Program,
  UpdateItem,
} from '../types/content'

export const navigation: NavItem[] = [
  { label: 'Toiminta', href: '#mission' },
  { label: 'Painopisteet', href: '#focus' },
  { label: 'Ohjelmat', href: '#programs' },
  { label: 'Ajankohtaista', href: '#updates' },
  { label: 'Yhteys', href: '#contact' },
]

export const heroContent = {
  tagline: 'Lapin korkeakoulujen yhteinen tekoäly-ympäristö',
  title: 'Rakennamme älykästä ja kestävää tulevaisuutta Lapissa',
  description:
    'Lapland AI Lab yhdistää yritykset, tutkijat ja opiskelijat kehittämään ratkaisuja arktisten olosuhteiden haasteisiin. Tuemme ideasta pilotointiin ja autamme viemään tekoälyn käytännön hyötyihin.',
  primaryAction: { label: 'Varaa tapaaminen', href: '#contact' } satisfies ActionLink,
  secondaryAction: { label: 'Tutustu toimintaamme', href: '#mission' } satisfies ActionLink,
  stats: [
    { label: 'Yrityskumppania', value: '35+' },
    { label: 'Käynnissä olevaa hanketta', value: '12' },
    { label: 'Opiskelijatiimiä', value: '20+' },
  ] satisfies HeroStat[],
}

export const missionDescription =
  'Lapland AI Lab on Lapin korkeakoulujen yhteinen innovaatioalusta, joka vauhdittaa alueen digivihreää siirtymää. Tarjoamme tukea tutkimus- ja kehityshankkeille, yritysten palveluinnovaatioille sekä opiskelijoiden oppimispoluille.'

export const missionItems: MissionItem[] = [
  {
    title: 'Yrityksille',
    description:
      'Autamme kartoittamaan tekoälyn sovellusmahdollisuudet ja viemään ideat käytännön piloteiksi yhteistyössä asiantuntijoidemme kanssa.',
  },
  {
    title: 'Tutkijoille',
    description:
      'Tarjoamme monialaisen tutkimusympäristön sekä kumppaniverkoston, jonka avulla tutkimus löytää tiensä käytännön vaikutuksiin.',
  },
  {
    title: 'Opiskelijoille',
    description:
      'Mahdollistamme aidot projektit, joissa tulevaisuuden osaajat pääsevät kehittämään ratkaisuja yritysten ja yhteiskunnan tarpeisiin.',
  },
]

export const focusAreas: FocusArea[] = [
  {
    title: 'Tekoäly arktisissa olosuhteissa',
    description:
      'Tutkimme ja kehitämme ratkaisuja, jotka huomioivat pohjoisen erityispiirteet ja tukevat kestävää kehitystä.',
    highlights: [
      'Älykkäät logistiset ratkaisut ja infrastruktuurin optimointi',
      'Sensorien ja konenäön hyödyntäminen haastavissa ympäristöissä',
      'Data-analytiikka ilmaston ja luonnonvarojen seurannassa',
    ],
  },
  {
    title: 'Kestävä digitaalinen liiketoiminta',
    description:
      'Autamme yrityksiä rakentamaan kilpailukykyä ja vastuullista kasvua dataan ja tekoälyyn pohjautuvilla palveluilla.',
    highlights: [
      'Palvelumuotoilu ja asiakaskokemuksen kehittäminen',
      'Dataohjattu päätöksenteko ja automaatio',
      'Kokeilukulttuuri ja ketterä tuotekehitys',
    ],
  },
  {
    title: 'Elinikäinen oppiminen ja osaamisen kehitys',
    description:
      'Rakennamme ohjelmia, jotka kasvattavat alueen osaamista ja tuovat tekoälyn työkalut kaikkien ulottuville.',
    highlights: [
      'Yrityskohtaiset valmennukset ja koulutukset',
      'Monialaiset opiskelijaprojektit ja hackathonit',
      'Osaamisen kartoitus ja henkilökohtaiset oppimispolut',
    ],
  },
]

export const programs: Program[] = [
  {
    title: 'Innovaatiopajat',
    description:
      'Kokoamme yritykset ja asiantuntijat yhteisiin työpajoihin, joissa ideat muovautuvat konkreettisiksi kokeiluiksi.',
    deliverables: [
      '2–4 viikon intensiiviset sprintit',
      'Monialainen fasilitointi ja konseptointi',
      'Selkeä etenemissuunnitelma jatkokehitykseen',
    ],
  },
  {
    title: 'Tutkimuskumppanuudet',
    description:
      'Kytkemme tutkimusryhmät yritysten tarpeisiin ja varmistamme, että tulokset jalostuvat vaikuttaviksi ratkaisuiksi.',
    deliverables: [
      'Yhteishankkeet ja rahoitusneuvonta',
      'Prototyyppien kehitys ja validointi',
      'Käyttöönoton tuki ja mittaristo',
    ],
  },
  {
    title: 'Koulutus- ja valmennusohjelmat',
    description:
      'Tarjoamme räätälöityjä koulutuksia sekä avoimia ohjelmia, joissa osaaminen vahvistuu käytännönläheisesti.',
    deliverables: [
      'Modulaariset koulutuskokonaisuudet',
      'Mentorointi ja asiantuntijaverkosto',
      'Sertifioitavat oppimispolut',
    ],
  },
]

export const updates: UpdateItem[] = [
  {
    title: 'Lapland AI Lab käynnistää arktisen datan pilottiohjelman',
    description:
      'Keväällä 2024 starttaava ohjelma kutsuu yrityksiä kokeilemaan tekoälyn hyödyntämistä vaativissa olosuhteissa.',
    date: 'Toukokuu 2024',
    href: '#',
  },
  {
    title: 'Yhteistyöverkosto laajenee uusilla tutkimuskumppaneilla',
    description:
      'Olemme solmineet kumppanuuksia kansainvälisten tutkimuslaitosten kanssa vahvistaaksemme arktista osaamista.',
    date: 'Huhtikuu 2024',
    href: '#',
  },
  {
    title: 'Opiskelijatiimit sparraavat Lapin yrityksiä innovaatioleirillä',
    description:
      'Neljä opiskelijatiimiä kehitti viikon mittaisessa leirissä konsepteja matkailun ja logistiikan haasteisiin.',
    date: 'Maaliskuu 2024',
    href: '#',
  },
]

export const contactIntro =
  'Haluatko keskustella yhteistyöstä, hankkeesta tai koulutuksesta? Jätä viesti tai varaa tapaaminen – autamme eteenpäin.'

export const contactChannels: ContactChannel[] = [
  {
    label: 'Sähköposti',
    value: 'info@laplandailab.fi',
    href: 'mailto:info@laplandailab.fi',
    description: 'Vastaamme viesteihin kahden arkipäivän kuluessa.',
  },
  {
    label: 'Puhelin',
    value: '+358 40 123 4567',
    href: 'tel:+358401234567',
    description: 'Arkipäivisin klo 9–16.',
  },
  {
    label: 'Käyntiosoite',
    value: 'Lapin yliopisto, Yliopistonkatu 8, Rovaniemi',
    description: 'Tapaamiset sopimuksen mukaan – tervetuloa käymään!',
  },
]
