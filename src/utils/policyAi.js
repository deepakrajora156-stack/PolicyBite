const baseSuggestedQuestions = [
  'Why was this policy introduced?',
  'How does this affect people?',
  'What changed after this?',
  'Who benefits most from this?',
]

const hotQaByPolicyId = {
  'gst-one-nation-one-tax': {
    question: 'Why do businesses complain about GST?',
    answer:
      'Mostly because filing and compliance can feel heavy, especially for small businesses. GST improved tax structure, but paperwork and rule updates can still be stressful.',
  },
  upi: {
    question: 'How did UPI change daily payments in India?',
    answer:
      'UPI made payments instant and super simple with just a phone and QR code. It turned even tiny payments like snacks or auto rides into quick digital transactions.',
  },
  'ayushman-bharat-pmjay': {
    question: 'Can poor families really get free hospital treatment through this?',
    answer:
      'Eligible families can get major treatment support at empanelled hospitals. It is not unlimited for everything, but it can reduce huge hospital bills a lot.',
  },
  'national-education-policy-2020': {
    question: 'Will NEP 2020 reduce pressure on students?',
    answer:
      'That is the goal: more flexibility and less rote pressure. But real stress reduction depends on how fast schools, boards, and teaching style actually change.',
  },
  'pm-kisan': {
    question: 'Is PM Kisan enough support for farmers?',
    answer:
      'It helps as basic income support, especially for small expenses. But farmers still need better prices, irrigation, insurance, and market access too.',
  },
  'pm-jan-dhan-yojana': {
    question: 'Why was opening bank accounts for everyone such a big deal?',
    answer:
      'Because without bank accounts, people missed direct benefits and depended on cash/middlemen. Accounts made salaries, scholarships, and support transfers much cleaner.',
  },
  'pm-svanidhi': {
    question: 'How does this help street vendors grow their business?',
    answer:
      'It gives small working-capital loans so vendors can restock, buy tools, and improve daily sales. For many vendors, that small credit makes a big difference.',
  },
  digital_rupee: {
    question: 'Will Digital Rupee replace cash in the future?',
    answer:
      'Not fully in the near term. It is more likely to run alongside cash, giving people one more government-backed digital payment option.',
  },
  mudra_yojana: {
    question: 'Can small businesses really succeed with Mudra loans?',
    answer:
      'Many can, if they use the loan smartly and manage repayments well. The loan opens doors, but success still depends on demand and business planning.',
  },
  faceless_tax_assessment: {
    question: 'Did online tax assessment reduce corruption?',
    answer:
      'It reduced face-to-face interaction, which can lower certain corruption risks. Still, system quality and grievance handling matter a lot.',
  },
  direct_benefit_transfer: {
    question: 'Did DBT actually stop corruption and middlemen?',
    answer:
      'It has reduced leakages in many schemes by sending money straight to accounts. It is a big improvement, though banking errors can still happen.',
  },
  sovereign_gold_bond: {
    question: 'Is digital gold safer than buying real gold?',
    answer:
      'For storage and theft risk, yes, SGBs are safer than keeping physical gold at home. But value still moves with gold prices.',
  },
  atal_pension_yojana: {
    question: 'Can small workers depend on this pension in old age?',
    answer:
      'It can provide a stable retirement base for many low-income workers. It may not cover all expenses, but it adds important security.',
  },
  national_pension_system: {
    question: 'Should young people start pension savings early?',
    answer:
      'Usually yes. Starting early gives more time for growth and builds better retirement discipline with smaller monthly contributions.',
  },
  stand_up_india: {
    question: 'Does this really help women become entrepreneurs?',
    answer:
      'It helps by improving access to formal loans for women and SC/ST founders. Success still depends on mentorship, market support, and execution.',
  },
  production_linked_incentive: {
    question: 'Is PLI actually creating jobs in India?',
    answer:
      'It has boosted manufacturing momentum in sectors like electronics. Job impact is real in places, but varies by sector and implementation speed.',
  },
  startup_india_funding: {
    question: 'Can student startups benefit from this scheme?',
    answer:
      'Yes, early-stage student teams can benefit if they qualify through incubators and selection processes. It can help bridge the first funding gap.',
  },
  swayam: {
    question: 'Can online courses replace traditional classrooms?',
    answer:
      'Online courses are great for flexibility and access, but they usually work best with classroom support, mentorship, and peer interaction.',
  },
  pm_ebvidya: {
    question: 'Did digital classes help students during school closures?',
    answer:
      'Yes, they helped many continue learning when schools shut. But device and internet gaps meant the benefit was not equal for everyone.',
  },
  diksha_platform: {
    question: 'How is DIKSHA helping teachers and students?',
    answer:
      'DIKSHA gives lesson resources, training content, and digital materials in one place. It supports both teaching quality and student access.',
  },
  nipun_bharat: {
    question: 'Why are basic reading and math skills such a big concern?',
    answer:
      'If basics are weak early, students struggle in every later subject. Strong foundational literacy and numeracy are the base for all learning.',
  },
  vidyanjali: {
    question: 'Can volunteers improve government schools?',
    answer:
      'Yes, especially by adding exposure and practical mentorship. They work best as support to teachers, not as a replacement for core staffing.',
  },
  study_webs_of_active_learning: {
    question: 'Can TV learning still help students today?',
    answer:
      'Definitely for households with limited internet. TV classes are still useful for reach, especially in remote and low-connectivity areas.',
  },
  national_digital_library: {
    question: 'Can digital libraries replace physical libraries?',
    answer:
      'Digital libraries improve access hugely, but physical libraries still matter for quiet study spaces and community learning support.',
  },
  atal_tinkering_labs: {
    question: 'Are Indian schools becoming more innovative?',
    answer:
      'ATL-style labs have pushed more hands-on projects, coding, and design thinking in many schools. Reach is growing, though still uneven.',
  },
  skill_hub_initiative: {
    question: 'Should schools focus more on practical skills than theory?',
    answer:
      'A balanced mix works best. Theory builds understanding, and practical skills improve employability and confidence in real-world work.',
  },
  eklavya_model_schools: {
    question: 'Are tribal students finally getting better education access?',
    answer:
      'EMRS has improved access in many regions through residential schooling support. Quality and reach are improving, but still need expansion.',
  },
  national_digital_health_mission: {
    question: 'Is digital health data safe and private?',
    answer:
      'It can be safer with strong consent, security, and governance systems. Privacy protection must stay a top priority as adoption grows.',
  },
  jan_aushadhi_yojana: {
    question: 'Why are generic medicines much cheaper?',
    answer:
      'Because they avoid heavy branding and marketing costs while using the same active ingredients in many cases. That cuts overall price.',
  },
  fit_india_movement: {
    question: 'Can campaigns really make people healthier?',
    answer:
      'Campaigns alone are not enough, but they can spark habits and awareness. Real impact comes when people stick to activity and diet changes.',
  },
  eat_right_india: {
    question: 'Why is junk food becoming a health problem for teenagers?',
    answer:
      'Frequent high-sugar, high-fat food plus low activity raises long-term risks. Teen habits formed now strongly affect adult health.',
  },
  poshan_abhiyaan: {
    question: 'Why is child malnutrition still a problem in India?',
    answer:
      'It is linked to diet quality, maternal health, sanitation, and awareness. POSHAN helps, but last-mile delivery remains a challenge.',
  },
  tb_mukt_bharat: {
    question: 'Why is tuberculosis still affecting so many people?',
    answer:
      'TB spreads faster where nutrition, housing, and early diagnosis are weak. Long treatment cycles and stigma also slow control efforts.',
  },
  anaemia_mukt_bharat: {
    question: 'Why do so many teenagers suffer from anaemia?',
    answer:
      'Main reasons include poor iron intake, diet imbalance, and low awareness. Regular nutrition and supplementation can improve this a lot.',
  },
  e_sanjeevani: {
    question: 'Can online doctor consultations replace hospital visits?',
    answer:
      'For many basic or follow-up cases, yes, they help a lot. But emergencies and serious conditions still need physical hospital care.',
  },
  national_health_mission: {
    question: 'Has healthcare improved in villages because of this mission?',
    answer:
      'In many areas yes, with better primary care access and staffing support. But quality still varies district to district.',
  },
  pradhan_mantri_surakshit_matritva_abhiyan: {
    question: 'Why is pregnancy healthcare important for a country’s future?',
    answer:
      'Healthy mothers and safe pregnancies directly improve newborn outcomes, family wellbeing, and long-term human development.',
  },
  pm_fasal_bima_yojana: {
    question: 'Do farmers actually receive insurance money on time?',
    answer:
      'Some do, but delays can happen due to claim processing and local data issues. Faster settlement is still a common demand.',
  },
  paramparagat_krishi_vikas_yojana: {
    question: 'Is organic farming really better than chemical farming?',
    answer:
      'Organic methods can improve soil health and reduce chemical load, but transition takes time and yield patterns can vary initially.',
  },
  pm_krishi_sinchai_yojana: {
    question: 'Why is water such a big issue for farmers?',
    answer:
      'Because crop success depends on timely water, and rainfall is uncertain. Better irrigation means more stable output and lower risk.',
  },
  kisan_credit_card: {
    question: 'Did KCC reduce farmers’ dependence on money lenders?',
    answer:
      'It has helped many farmers access formal credit at lower rates. But coverage and awareness still decide how much dependency drops.',
  },
  operation_greens: {
    question: 'Why do onion and tomato prices suddenly increase so much?',
    answer:
      'Supply shocks, storage gaps, weather, and transport disruptions can quickly affect prices. Operation Greens tries to smooth this volatility.',
  },
  agri_infrastructure_fund: {
    question: 'Why do crops get wasted after harvesting?',
    answer:
      'Main reasons are poor storage, weak cold chain, and delayed transport. Better infrastructure can save both farmer income and food supply.',
  },
  national_beekeeping_honey_mission: {
    question: 'Can honey farming become a major income source?',
    answer:
      'It can be a strong additional income stream, especially for small farmers. Training, market links, and quality standards are key.',
  },
  national_agriculture_market: {
    question: 'Can farmers now get fair prices more easily?',
    answer:
      'Digital market reforms improve price discovery and buyer access. Fair pricing is improving, but internet and market adoption still vary.',
  },
  rashtriya_gokul_mission: {
    question: 'Why is dairy farming important for India’s economy?',
    answer:
      'Dairy gives daily cash flow to rural families and supports nutrition, jobs, and allied industries. Better cattle productivity boosts this further.',
  },
  sub_mission_on_agricultural_mechanization: {
    question: 'Will machines replace farm workers in future?',
    answer:
      'Machines usually reduce heavy manual effort and improve productivity. The goal should be safer work plus new skills, not simple displacement.',
  },
}

export function getSuggestedPolicyQuestions(policy) {
  const hot = hotQaByPolicyId[policy?.id]?.question
  return hot ? [hot, ...baseSuggestedQuestions] : baseSuggestedQuestions
}

export function createMockPolicyAnswer(policy, question) {
  const exactHot = hotQaByPolicyId[policy?.id]
  if (exactHot && String(question || '').trim().toLowerCase() === exactHot.question.toLowerCase()) {
    return exactHot.answer
  }

  const q = String(question || '').toLowerCase()

  if (q.includes('why')) {
    return `Great question. ${policy.title} was introduced mainly because ${policy.why}. In simple terms, it tries to solve a real gap people were facing.`
  }
  if (q.includes('affect') || q.includes('people')) {
    return `For regular people, this usually means: ${policy.one_liner} A relatable example is: ${policy.example}`
  }
  if (q.includes('changed') || q.includes('before') || q.includes('after')) {
    return `Before: ${policy.before}\nAfter: ${policy.after}\nSo yes, the goal is to make the system more practical for daily life.`
  }
  if (q.includes('pros') || q.includes('cons')) {
    const pros = (policy.pros || []).slice(0, 2).join(', ')
    const cons = (policy.cons || []).slice(0, 2).join(', ')
    return `Quick take:\nPros: ${pros || 'better access and support'}.\nCons: ${cons || 'implementation and awareness gaps'}.\nMost policies help, but execution matters a lot.`
  }

  return `Short answer: ${policy.what} It matters because ${policy.why} If you want, ask me about key benefits or “before vs after” for a quick breakdown.`
}
