import rawPolicies from './policies.json'
import { getPolicyImageByName } from './policyImages'

const DEPARTMENT_DEFAULTS = {
  Finance: {
    official_link: 'https://www.finmin.nic.in',
    launch_year: 2014,
  },
  Education: {
    official_link: 'https://www.education.gov.in',
    launch_year: 2020,
  },
  Health: {
    official_link: 'https://www.mohfw.gov.in',
    launch_year: 2018,
  },
  Agriculture: {
    official_link: 'https://agricoop.gov.in',
    launch_year: 2016,
  },
  Employment: {
    official_link: 'https://labour.gov.in',
    launch_year: 2015,
  },
  'Digital India': {
    official_link: 'https://www.digitalindia.gov.in',
    launch_year: 2015,
  },
}

const POLICY_OVERRIDES = {
  'pm-jan-dhan-yojana': {
    official_link: 'https://pmjdy.gov.in/',
    launch_year: 2014,
  },
  'gst-one-nation-one-tax': {
    official_link: 'https://www.gst.gov.in/',
    launch_year: 2017,
  },
  'pm-svanidhi': {
    official_link: 'https://pmsvanidhi.mohua.gov.in/',
    launch_year: 2020,
  },
  digital_rupee: {
    official_link: 'https://www.rbi.org.in/Scripts/CBDC.aspx',
    launch_year: 2022,
  },
  mudra_yojana: {
    official_link: 'https://www.mudra.org.in/',
    launch_year: 2015,
  },
  faceless_tax_assessment: {
    official_link: 'https://www.incometax.gov.in/',
    launch_year: 2020,
  },
  direct_benefit_transfer: {
    official_link: 'https://dbtbharat.gov.in/',
    launch_year: 2013,
  },
  sovereign_gold_bond: {
    official_link: 'https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=1658',
    launch_year: 2015,
  },
  atal_pension_yojana: {
    official_link: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    launch_year: 2015,
  },
  national_pension_system: {
    official_link: 'https://www.npscra.nsdl.co.in/',
    launch_year: 2004,
  },
  stand_up_india: {
    official_link: 'https://www.standupmitra.in/',
    launch_year: 2016,
  },
  stand_up_india_employment: {
    official_link: 'https://www.standupmitra.in/',
    launch_year: 2016,
  },
  production_linked_incentive: {
    official_link: 'https://dpiit.gov.in/production-linked-incentive-schemes',
    launch_year: 2020,
  },
  production_linked_incentive_jobs: {
    official_link: 'https://dpiit.gov.in/production-linked-incentive-schemes',
    launch_year: 2020,
  },
  startup_india_funding: {
    official_link: 'https://seedfund.startupindia.gov.in/',
    launch_year: 2021,
  },
  'national-education-policy-2020': {
    official_link: 'https://www.education.gov.in/en/national-education-policy-2020',
    launch_year: 2020,
  },
  'samagra-shiksha': {
    official_link: 'https://samagra.education.gov.in/',
    launch_year: 2018,
  },
  'midday-meal-scheme': {
    official_link: 'https://pmposhan.education.gov.in/',
    launch_year: 2021,
  },
  swayam: {
    official_link: 'https://swayam.gov.in/',
    launch_year: 2017,
  },
  pm_ebvidya: {
    official_link: 'https://pmevidya.education.gov.in/',
    launch_year: 2020,
  },
  diksha_platform: {
    official_link: 'https://diksha.gov.in/',
    launch_year: 2017,
  },
  nipun_bharat: {
    official_link: 'https://nipunbharat.education.gov.in/',
    launch_year: 2021,
  },
  vidyanjali: {
    official_link: 'https://vidyanjali.education.gov.in/',
    launch_year: 2021,
  },
  study_webs_of_active_learning: {
    official_link: 'https://swayamprabha.gov.in/',
    launch_year: 2017,
  },
  national_digital_library: {
    official_link: 'https://ndl.iitkgp.ac.in/',
    launch_year: 2015,
  },
  atal_tinkering_labs: {
    official_link: 'https://aim.gov.in/atl.php',
    launch_year: 2016,
  },
  skill_hub_initiative: {
    official_link: 'https://www.education.gov.in/',
    launch_year: 2021,
  },
  eklavya_model_schools: {
    official_link: 'https://tribal.nic.in/EMRS.aspx',
    launch_year: 1997,
  },
  'mission-indradhanush': {
    official_link: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=824&lid=220',
    launch_year: 2014,
  },
  'tele-mental-health-programme': {
    official_link: 'https://telemanas.mohfw.gov.in/',
    launch_year: 2022,
  },
  national_digital_health_mission: {
    official_link: 'https://abdm.gov.in/',
    launch_year: 2020,
  },
  jan_aushadhi_yojana: {
    official_link: 'https://janaushadhi.gov.in/',
    launch_year: 2008,
  },
  fit_india_movement: {
    official_link: 'https://fitindia.gov.in/',
    launch_year: 2019,
  },
  eat_right_india: {
    official_link: 'https://eatrightindia.gov.in/',
    launch_year: 2018,
  },
  poshan_abhiyaan: {
    official_link: 'https://poshanabhiyaan.gov.in/',
    launch_year: 2018,
  },
  tb_mukt_bharat: {
    official_link: 'https://tbcindia.mohfw.gov.in/',
    launch_year: 2025,
  },
  anaemia_mukt_bharat: {
    official_link: 'https://anemiamuktbharat.info/',
    launch_year: 2018,
  },
  e_sanjeevani: {
    official_link: 'https://esanjeevani.mohfw.gov.in/',
    launch_year: 2019,
  },
  national_health_mission: {
    official_link: 'https://nhm.gov.in/',
    launch_year: 2013,
  },
  pradhan_mantri_surakshit_matritva_abhiyan: {
    official_link: 'https://pmsma.nhp.gov.in/',
    launch_year: 2016,
  },
  'ayushman-bharat-pmjay': {
    official_link: 'https://pmjay.gov.in/',
    launch_year: 2018,
  },
  'soil-health-card': {
    official_link: 'https://soilhealth.dac.gov.in/',
    launch_year: 2015,
  },
  enam: {
    official_link: 'https://www.enam.gov.in/',
    launch_year: 2016,
  },
  pm_fasal_bima_yojana: {
    official_link: 'https://pmfby.gov.in/',
    launch_year: 2016,
  },
  paramparagat_krishi_vikas_yojana: {
    official_link: 'https://pgsindia-ncof.gov.in/pkvy/index.aspx',
    launch_year: 2015,
  },
  pm_krishi_sinchai_yojana: {
    official_link: 'https://pmksy.gov.in/',
    launch_year: 2015,
  },
  kisan_credit_card: {
    official_link: 'https://www.nabard.org/content1.aspx?id=591&catid=23&mid=530',
    launch_year: 1998,
  },
  operation_greens: {
    official_link: 'https://mofpi.gov.in/Schemes/operation-greens',
    launch_year: 2018,
  },
  agri_infrastructure_fund: {
    official_link: 'https://agriinfra.dac.gov.in/',
    launch_year: 2020,
  },
  national_beekeeping_honey_mission: {
    official_link: 'https://nbhm.gov.in/',
    launch_year: 2020,
  },
  national_agriculture_market: {
    official_link: 'https://www.enam.gov.in/web/',
    launch_year: 2016,
  },
  rashtriya_gokul_mission: {
    official_link: 'https://dahd.nic.in/schemes/programmes/rashtriya-gokul-mission',
    launch_year: 2014,
  },
  sub_mission_on_agricultural_mechanization: {
    official_link: 'https://agrimachinery.nic.in/',
    launch_year: 2014,
  },
  mgnrega: {
    official_link: 'https://nrega.nic.in/',
    launch_year: 2005,
  },
  'skill-india-mission': {
    official_link: 'https://www.skillindia.gov.in/',
    launch_year: 2015,
  },
  'national-career-service': {
    official_link: 'https://www.ncs.gov.in/',
    launch_year: 2015,
  },
  startup_india: {
    official_link: 'https://www.startupindia.gov.in/',
    launch_year: 2016,
  },
  make_in_india: {
    official_link: 'https://www.makeinindia.com/',
    launch_year: 2014,
  },
  pm_kaushal_vikas_yojana: {
    official_link: 'https://www.pmkvyofficial.org/',
    launch_year: 2015,
  },
  atma_nirbhar_bharat_rozgar_yojana: {
    official_link: 'https://labour.gov.in/abry',
    launch_year: 2020,
  },
  deen_dayal_upadhyaya_gramin_kaushalya_yojana: {
    official_link: 'https://ddugky.gov.in/',
    launch_year: 2014,
  },
  garib_kalyan_rojgar_abhiyan: {
    official_link: 'https://rural.nic.in/',
    launch_year: 2020,
  },
  digital_india_bpo_scheme: {
    official_link: 'https://www.meity.gov.in/',
    launch_year: 2014,
  },
  national_apprenticeship_promotion_scheme: {
    official_link: 'https://www.apprenticeshipindia.gov.in/',
    launch_year: 2016,
  },
  'pm-kisan': {
    official_link: 'https://pmkisan.gov.in/',
    launch_year: 2019,
  },
  'digital-india-programme': {
    official_link: 'https://digitalindia.gov.in/',
    launch_year: 2015,
  },
  bharatnet: {
    official_link: 'https://bbnl.nic.in/',
    launch_year: 2011,
  },
  upi: {
    official_link: 'https://www.npci.org.in/what-we-do/upi/product-overview',
    launch_year: 2016,
  },
  digilocker: {
    official_link: 'https://www.digilocker.gov.in/',
    launch_year: 2015,
  },
  'cowin_platform': {
    official_link: 'https://www.cowin.gov.in/',
    launch_year: 2021,
  },
  umang_app: {
    official_link: 'https://web.umang.gov.in/',
    launch_year: 2017,
  },
  aadhaar_enabled_payment_system: {
    official_link: 'https://www.npci.org.in/what-we-do/aeps/product-overview',
    launch_year: 2011,
  },
  government_e_marketplace: {
    official_link: 'https://gem.gov.in/',
    launch_year: 2016,
  },
  open_network_for_digital_commerce: {
    official_link: 'https://ondc.org/',
    launch_year: 2021,
  },
  mygov_platform: {
    official_link: 'https://www.mygov.in/',
    launch_year: 2014,
  },
  national_digital_communications_policy: {
    official_link: 'https://dot.gov.in/',
    launch_year: 2018,
  },
  cyber_surakshit_bharat: {
    official_link: 'https://www.meity.gov.in/cyber-surakshit-bharat',
    launch_year: 2018,
  },
  national_digital_literacy_mission: {
    official_link: 'https://www.pmgdisha.in/',
    launch_year: 2014,
  },
}

const FALLBACK = {
  official_link: 'https://www.india.gov.in',
  launch_year: 2015,
}

const policies = rawPolicies.map((policy) => {
  const dep = DEPARTMENT_DEFAULTS[policy.department] ?? FALLBACK
  const over = POLICY_OVERRIDES[policy.id] ?? {}
  return {
    ...policy,
    official_link: over.official_link ?? dep.official_link,
    launch_year: over.launch_year ?? dep.launch_year,
    image: getPolicyImageByName(policy.title),
  }
})

export default policies
