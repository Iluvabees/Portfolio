/*
 * EDD RICK PORTFOLIO — YOUR CONTENT LIVES HERE
 * ---------------------------------------------
 * Edit text below without changing the layout code.
 * To remove a whole section: change its value in sections to false.
 * To remove one project, experience, or photo slot: set enabled: false.
 * To add an image: put it in assets/photos/ and enter its path in image.
 * Empty images automatically show designed placeholders.
 * Optional project.features and project.screenshots can be removed entirely.
 * Individual screenshots support image: 'assets/photos/your-file.webp'.
 * To hide unfinished-content prompts before publishing: showDraftNotes: false.
 */
window.PORTFOLIO_DATA = {
  settings: {
    showDraftNotes: false,
    sections: {
      hero: true,
      work: true,
      about: true,
      tools: true,
      journey: true,
      moments: true,
      certificates: true,
      contact: true
    }
  },
  personal: {
    displayName: 'Eddrick',
    fullName: 'Aung Kaung Sett Naing',
    location: 'Pathum Thani, Thailand',
    email: 'eddricksettnaing@gmail.com',
    phone: '', // Optional; don't put a private number into public site source code
    showPhonePublicly: false,
    portrait: 'assets/photos/eddrick-portrait.jpg', // Original user-provided portfolio portrait
    portraitAlt: 'Portrait of Eddrick',
    headlineParts: ['I build', 'digital', 'things that', 'make sense.'], // Four independently styled phrases for the homepage
    tagline: 'ICT student · Developer · Curious problem solver',
    introduction: 'I enjoy building software, exploring AI, and thinking about how people actually use technology. I like learning by building things, solving problems, and working with others.',
    about: [
      "Hi, I’m Eddrick. A student at Rangsit University in Bangkok, studying Information and Communication Technology.",
      "I enjoy exploring the overlap between software engineering, artificial intelligence, and human-centered design. My projects have involved web development, database systems, usability evaluation, and collaborative product building.",
      "What really excites me about technology is making useful, understandable, and more people-friendly tech."
    ],
    links: {
      github: 'https://github.com/Iluvabees', // Verified connected public GitHub profile
      linkedin: '',  // Add your profile URL when ready
      resume: 'assets/cv/Eddrick-Full-CV.pdf' // General, full CV; not a company-specific résumé
    }
  },
  // Add, reorder, or hide tools below without touching layouts.
  // Icons are local SVGs so they work without a CDN connection.
  tools: [
    { name: 'Supabase', type: 'Backend / Platform', icon: 'supabase' },
    { name: 'GitHub', type: 'Code hosting', icon: 'github' },
    { name: 'JavaScript', type: 'Language', icon: 'javascript' },
    { name: 'React.js', type: 'UI framework', icon: 'react' },
    { name: 'Node.js', type: 'Runtime', icon: 'nodejs' },
    { name: 'PostgreSQL', type: 'Database', icon: 'postgresql' },
    { name: 'Docker', type: 'Containers', icon: 'docker' },
    { name: 'Git', type: 'Version control', icon: 'git' },
    { name: 'Figma', type: 'Design', icon: 'figma' }
  ],
  skills: [
    { title: 'Building', items: ['HTML, CSS & JavaScript', 'React.js & Node.js', 'SQL & database systems', 'Docker & web hosting'] },
    { title: 'Exploring', items: ['AI applications & RAG', 'UML modeling & systems design', 'Software engineering', 'IT project management research'] },
    { title: 'Thinking', items: ['UI/UX evaluation', 'Usability testing', 'Technical documentation', 'Team collaboration'] }
  ],
  projects: [
    {
      enabled: true,
      slug: 'bangkok-rail-explorer',
      title: 'Bangkok Rail Explorer',
      fullTitle: 'Bangkok Rail Explorer — ICT324 Data Mining & Data Warehousing',
      number: '01',
      date: '2026 · Milestone 3',
      category: 'data',
      categoryLabel: 'Data / Analytics',
      role: 'Project Team Member · Web Presentation & Data Analysis',
      tagline: 'Turning complex railway records into a clearer picture of Bangkok travel.',
      summary: 'A team project exploring historical Airport Rail Link ridership with data cleaning, preliminary model comparisons, and a map-first web demonstration.',
      contributions: [
        'Collaborated on an ICT324 team project combining data mining, data preparation, and an interactive website presentation.',
        'Helped present a map-first research concept with station selection, historical exploration, and clearly described dataset coverage.',
        'Documented the data-cleaning workflow and distinguished preliminary model scores from independently validated forecasting results.'
      ],
      tech: ['Python', 'Pandas', 'scikit-learn', 'Data Cleaning', 'HTML / CSS / JS', 'GitHub Pages'],
      image: 'assets/photos/bangkok-rail-overview.webp',
      imageAlt: 'Editorial visual summarizing the eight Airport Rail Link stations and the original and cleaned row counts; not an app screenshot',
      visual: 'rail',
      challenge: 'Public rail passenger records are difficult to compare when station coverage, date formats and aggregation levels vary. Our ICT324 project explored how to clean and explain the data while offering an approachable web interface for historical exploration.',
      process: 'The Milestone 3 repository includes an original Department of Rail Transport CSV with 12,408 station-day records covering eight Airport Rail Link stations (A1–A8), a 12,296-row cleaned extract, a documented cleaning log, a Python builder, and preliminary model comparisons. The pipeline removed 112 all-zero station-days under a documented assumption and adjusted 16 date entries. Those assumptions still need independent validation. The project website presents the research and an interactive railway map demonstration; the station-day dataset is not yet wired into the map timeline, and some map values are simulated and labeled accordingly.',
      outcome: 'A public GitHub Pages research website and reproducible project files. Early model experiments include Random Forest shuffled cross-validation F1 of approximately 0.923, but the reported past-to-future F1 was about 0.734, so the higher score should not be presented as forecasting accuracy. The work is ongoing and documents its data-quality and implementation limitations.',
      screenshotsHeading: 'The data and modeling story.',
      screenshotsNote: 'These are editorial diagrams drawn from the documented public repository and its preliminary results, not screenshots of a fully integrated production dashboard. Open the live project to explore the map demonstration.',
      screenshots: [
        { title: 'Dataset and station coverage', description: 'Eight Airport Rail Link stations, with original and cleaned row counts.', image: 'assets/photos/bangkok-rail-overview.webp', alt: 'Rail Explorer overview graphic with A1 to A8 stations and record counts', orientation: 'landscape' },
        { title: 'Preprocessing workflow', description: 'A transparent view of records, cleaning steps and documented assumptions.', image: 'assets/photos/bangkok-rail-data-pipeline.webp', alt: 'Four-stage data preparation diagram from original public CSV to preliminary analysis', orientation: 'landscape' },
        { title: 'Preliminary model comparison', description: 'Shuffled cross-validation F1 scores; not a claim of future forecasting performance.', image: 'assets/photos/bangkok-rail-model-results.webp', alt: 'Bar chart comparing baseline, logistic regression, decision tree and random forest F1 scores with a validation caveat', orientation: 'landscape' }
      ],
      demoLinkLabel: 'Explore the live project',
      demoNote: 'Academic Milestone 3. The website map is an interactive demonstration; the cleaned station-day data has not yet been integrated into its timeline.',
      links: {
        demo: 'https://iluvabees.github.io/The-Teletubbies-Bangkok-Rail-Explorer/',
        repo: 'https://github.com/Iluvabees/The-Teletubbies-Bangkok-Rail-Explorer'
      }
    },
    {
      enabled: true,
      slug: 'ai-gaming-assistant',
      title: 'NexusCore',
      fullTitle: 'NexusCore — AI Enhanced FAQ for Games',
      number: '02',
      date: 'January – April 2026',
      category: 'ai',
      categoryLabel: 'AI / Full-stack',
      role: 'Team Strategy & Project Coordinator',
      tagline: 'Helping gamers get answers faster with AI, RAG, and community-sourced knowledge.',
      summary: 'An AI-enhanced FAQ web app for games that lets users ask natural-language questions and receive structured answers drawn from gaming forums, APIs, and a Retrieval-Augmented Generation pipeline.',
      contributions: [
        'Helped shape the project direction and coordinate the team workflow across planning, analysis, design, development, testing, and deployment.',
        'Produced technical documentation and system design materials, including UML diagrams and software specifications.',
        'Supported refinement of the chatbot experience by responding to user feedback and improving answer clarity and readability.',
        'Contributed to testing, bug fixing, and deployment preparation using GitHub, Docker, and Vercel.'
      ],
      tech: ['React.js', 'FastAPI', 'Node.js', 'RAG', 'OpenAI API', 'Reddit API', 'Steam API', 'Docker'],
      image: 'assets/photos/nexuscore-composite.webp',
      imageAlt: 'Editorial composite showing original NexusCore home, answer, and login screens extracted from the project report',
      visual: 'gaming',
      challenge: 'Gamers often have to search through multiple places — Reddit threads, guide websites, videos, and official resources — just to answer one question. The project explored how an AI-powered FAQ system could reduce that friction by collecting relevant information and presenting it in one place.',
      process: 'NexusCore was developed as a semester project using a hybrid SDLC and agile workflow. The report shows requirement analysis, UML design, implementation, testing, and deployment. The frontend was built in React.js and JavaScript, while the backend combined Python (FastAPI) and Node.js. The system used APIs and forum retrieval, with RAG-based answer generation. During development, the team discovered that equal treatment of all retrieved Reddit content led to generic or weak answers, so the retrieval logic was refined to prioritize more relevant, trustworthy, and highly upvoted community posts. User feedback from around 20 testers also led to homepage improvements and a redesign of chatbot output into shorter, labeled responses.',
      outcome: 'The result was a deployed prototype that supported login, search, chatbot interaction, and gameplay-related retrieval, with a later round of testing showing improvements to answer quality and the gameplay feature. The project demonstrated both the technical side of building an AI-assisted information system and the importance of iterative usability improvements when shaping the final experience.',
      featuresHeading: 'Three parts of the system we kept refining.',
      featuresIntro: 'From the user-facing chat flow to the retrieval logic behind it, these were key ideas behind the project.',
      features: [
        { number: '01', title: 'Ask game questions naturally', description: 'Instead of navigating static FAQ categories, users can type natural-language questions directly into a chatbot interface.', symbol: 'track' },
        { number: '02', title: 'Blend AI with real sources', description: 'Answers were designed to combine AI generation with retrieved material from forums, APIs, and supporting knowledge sources.', symbol: 'rank' },
        { number: '03', title: 'Iterate through testing', description: 'The team used feedback, debugging, and repeated testing to improve answer clarity, homepage navigation, and overall usability.', symbol: 'verify' }
      ],
      screenshotsHeading: 'Selected screens from the final report.',
      screenshotsNote: 'Original screenshots and development artefacts extracted from the NexusCore project report. They show the interface, answer refinement, and parts of the implementation workflow.',
      screenshots: [
        { title: 'Homepage and support categories', description: 'The main landing screen for asking questions and browsing popular issue categories.', image: 'assets/photos/nexuscore-home.webp', alt: 'Original NexusCore home interface with search, category cards, and trending issues', orientation: 'landscape' },
        { title: 'Login flow', description: 'A simple authentication screen used before entering the system.', image: 'assets/photos/nexuscore-login.webp', alt: 'Original NexusCore login interface', orientation: 'landscape' },
        { title: 'Initial answer output', description: 'An earlier chatbot response style that users found too long and dense.', image: 'assets/photos/nexuscore-answer-old.webp', alt: 'Early NexusCore AI answer output with a long block of text', orientation: 'portrait' },
        { title: 'Refined answer output', description: 'A later version with shorter, clearer, and better-labeled content.', image: 'assets/photos/nexuscore-answer-new.webp', alt: 'Improved NexusCore answer output with shorter sections and clearer formatting', orientation: 'portrait' },
        { title: 'Backend retrieval and debugging', description: 'Terminal output showing data retrieval, API responses, and debugging during implementation.', image: 'assets/photos/nexuscore-debug.webp', alt: 'NexusCore backend terminal logs during retrieval and debugging', orientation: 'landscape' },
        { title: 'Repository structure', description: 'A snapshot of the project files used during development and version control.', image: 'assets/photos/nexuscore-repo.webp', alt: 'GitHub repository file list for the NexusCore project', orientation: 'landscape' }
      ],
      links: { demo: '', repo: '' }
    },
    {
      enabled: true,
      slug: 'motivnation',
      title: 'MotivNation',
      fullTitle: 'MotivNation Fitness Tracking Platform',
      number: '03',
      date: 'August – October 2025',
      category: 'software',
      categoryLabel: 'Web App / Backend',
      role: 'Backend Developer & Database Management',
      tagline: 'Build better habits together.',
      summary: 'A colorful, gamified habit-tracking app for logging hydration, steps, workouts, and sleep, earning XP, and encouraging progress through community rankings.',
      contributions: [
        'Worked on the backend and database management for a centralized fitness dashboard.',
        'Implemented real-time leaderboard functionality and XP-based rewards.',
        'Designed verification workflows for submitted fitness achievements.'
      ],
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Gamification', 'Local Storage'],
      image: 'assets/photos/motivnation-leaderboard.webp',
      imagePresentation: 'browser', // Show the screenshot inside a responsive browser frame
      imageAlt: 'MotivNation archived demo leaderboard: colorful podium ranking sample players by XP',
      visual: 'fitness',
      challenge: 'The project explored how tracking everyday activity and introducing friendly competition could make fitness goals more engaging.',
      process: 'I contributed to backend and database development for the original project. The provided frontend uses React, TypeScript, and Tailwind CSS, with browser-local storage for several habit-tracking features and Supabase integration for separate account and administration functionality. For this portfolio, a database-free archive demonstration was created using the existing interface and XP rules as references.',
      outcome: 'MotivNation was originally published at motivnation.digital. With the original database no longer available, the portfolio includes a standalone archive demo with sample members and device-local progress. It demonstrates the main tracking, XP, ranking, and rewards concepts without suggesting that the original backend is live.',
      demoNote: 'Archived interactive demo. Uses sample profiles and browser-local progress; original authentication, database and admin tools are not connected.',
      demoLinkLabel: 'Try the archived demo',
      featuresHeading: 'A little progress. A lot of motivation.',
      features: [
        { number: '01', title: 'Everyday activity', description: 'Log steps, glasses of water, workouts, and sleep, with XP assigned to each activity.', symbol: 'track' },
        { number: '02', title: 'Leaderboard & XP', description: 'Points and ranking mechanisms designed to make progress more engaging.', symbol: 'rank' },
        { number: '03', title: 'Progress sharing', description: 'Submit an optional proof photo and see activity posts in a community gallery.', symbol: 'verify' }
      ],
      screenshotsHeading: 'Four views from the archived demo.',
      screenshotsNote: 'Rendered from a source-inspired, database-free archive. All member names and XP shown are demonstration data.',
      screenshots: [
        { title: 'Welcome to MotivNation', description: 'The original wellness illustration and brand styling', image: 'assets/photos/motivnation-home.webp', alt: 'MotivNation archive homepage showing the gradient title and original fitness illustration' },
        { title: 'Daily habit logging', description: 'Hydration, steps, workouts and sleep with optional photo evidence', image: 'assets/photos/motivnation-log.webp', alt: 'MotivNation archive daily logging form and XP rules' },
        { title: 'Leaderboard & XP', description: 'A ranked podium using sample profiles', image: 'assets/photos/motivnation-leaderboard.webp', alt: 'MotivNation archive leaderboard with three sample competitors' },
        { title: 'Reward milestones', description: 'Achievements and the proposed community rewards', image: 'assets/photos/motivnation-rewards.webp', alt: 'MotivNation archive rewards and badges screen' }
      ],
      links: { demo: 'motivnation-demo/index.html', repo: '' }

    },
    {
      enabled: true,
      slug: 'lumen-ux-concept',
      title: 'LUMEN',
      fullTitle: 'LUMEN — AI Companion UI/UX Design Concept',
      number: '04',
      date: 'April 2025',
      category: 'design',
      categoryLabel: 'UI/UX / Product Concept',
      role: 'Collaborative UI/UX Design & Documentation',
      tagline: 'Designing a more personal way to interact with an AI companion.',
      summary: 'A multidisciplinary UI/UX concept for a customizable AI companion, explored across web, mobile, and smartwatch interfaces in a team design report.',
      contributions: [
        'Co-authored a team report documenting the AI companion concept and its interface decisions.',
        'Explored user flows, navigation patterns, account journeys, onboarding, personalization, and responsive interfaces.',
        'Applied Nielsen’s usability heuristics, Fitts’s Law, Hick’s Law, and other human-computer interaction principles to the proposed design.'
      ],
      tech: ['UI/UX Design', 'User Flows', 'Heuristics', 'Cross-platform'],
      image: 'assets/photos/lumen-no-avatars.webp',
      imageAlt: 'LUMEN interface design editorial cover featuring the original help navigation screen without character avatars',
      visual: 'lumen',
      challenge: 'The team explored how an AI companion could feel approachable and understandable across different devices while giving people meaningful control over onboarding, interaction, and customization.',
      process: 'The 2025 coursework report documents information architecture, sitemaps and interface flows for web, mobile and smartwatch experiences. This portfolio version focuses on original navigation, help and wearable interface screens from the report rather than character imagery.',
      outcome: 'The deliverable was a documented interface concept and design rationale, not a released or user-validated AI product. It is an early-stage team project and a record of the design techniques explored at the time.',
      screenshotsHeading: 'Interface details, without the avatars.',
      screenshotsNote: 'Selected original screen designs from the April 2025 team report. The character renders are intentionally hidden; these are concept screens, not a deployed product.',
      screenshots: [
        { title: 'Help and navigation', description: 'Information categories and search-first support design.', image: 'assets/photos/lumen-help.webp', alt: 'Original LUMEN help page with support categories and search', orientation: 'landscape' },
        { title: 'FAQ information hierarchy', description: 'A desktop FAQ layout for common questions.', image: 'assets/photos/lumen-faq.webp', alt: 'Original LUMEN desktop FAQ cards', orientation: 'landscape' },
        { title: 'Smartwatch navigation', description: 'Compact primary actions in the wearable concept.', image: 'assets/photos/lumen-watch-menu.webp', alt: 'Original LUMEN smartwatch menu without a character avatar', orientation: 'portrait' },
        { title: 'Smartwatch settings', description: 'Simple controls and action hierarchy on a small screen.', image: 'assets/photos/lumen-watch-settings.webp', alt: 'Original LUMEN smartwatch settings screen', orientation: 'portrait' }
      ],
      links: { demo: '', repo: '' }
    },
    {
      enabled: true,
      slug: 'ux-evaluation',
      title: 'Human-Centered UX Evaluation',
      fullTitle: 'Human-Centered UI/UX Evaluation',
      number: '05',
      date: 'January – April 2025',
      category: 'design',
      categoryLabel: 'Research / UX',
      role: 'Usability Evaluation Lead & Report Writer',
      tagline: 'Looking beyond appearance to find what makes products usable.',
      summary: 'A structured usability evaluation using Nielsen’s 10 Usability Heuristics, documented in a 40-page report.',
      contributions: [
        'Conducted usability evaluation using Nielsen’s 10 Usability Heuristics.',
        'Led preparation of a 40-page evaluation report.',
        'Analyzed interface strengths and weaknesses.',
        'Proposed improvements to user experience and accessibility.'
      ],
      tech: ['UX Research', 'Heuristic Evaluation', 'Accessibility', 'Reporting'],
      image: '',
      imageAlt: 'Screenshot from the UI/UX evaluation project',
      visual: 'ux',
      challenge: '',
      process: '',
      outcome: '',
      links: { demo: '', repo: '' }
    }
  ],
  education: [
    {
      enabled: true,
      institution: 'Rangsit University',
      location: 'Pathum Thani, Thailand',
      qualification: 'Bachelor of Information and Communication Technology (ICT)',
      dates: 'June 2024 – August 2027 (expected)',
      detail: 'GPA 3.87 / 4.00',
      notes: 'Relevant coursework: Software Engineering, Human Computer Interaction, Web Development, Artificial Intelligence, Database Systems, System Analysis & Design, IT Project Management.'
    }
  ],
  experience: [
    {
      enabled: true,
      organization: 'RiSE Education Center',
      position: 'IGCSE Business Instructor',
      location: 'Onsite · Yangon',
      dates: 'Dec 2022 – Dec 2023',
      details: [
        'Taught IGCSE/Pre-IGCSE, Maths, and Physics to groups of up to 15 students using tailored quizzes and rubrics.',
        'Provided written feedback and progress tracking; reported average class-performance improvement of 15–20%.'
      ]
    }
  ],
  // Optional milestones appear beneath Experience & Education.
  // Set enabled: false to hide an entry; remove the whole array to hide this block.
  milestones: [
    {
      enabled: true,
      label: 'Competition',
      date: 'July 2024',
      title: '1st Runner-Up · Utopia Digital Newspaper Competition',
      description: 'Digital Media Literacy Project — coordinated sections, content planning and the live exhibition presentation.'
    },
    {
      enabled: true,
      label: 'Academic research',
      date: 'January – April 2026',
      title: 'Emerging Technologies in IT Project Management',
      description: 'Lead Researcher & Primary Report Writer — researched AI, hyperautomation, blockchain, IoT, cybersecurity, and their relevance to project management.'
    },
    {
      enabled: true,
      label: 'English proficiency',
      date: '2024',
      title: 'IELTS · Overall Band 8',
      description: 'Language proficiency: Burmese (native) and English (advanced).'
    },
    {
      enabled: true,
      label: 'Academic exposure',
      date: 'December 2024',
      title: 'Japan Academic & Industry Exposure Program',
      description: 'Certificate of One-Week Field Trip.'
    }
  ],
  // Speaking, facilitating, and workshop participation. Use enabled: false to hide any entry.
  // Original certificate images are stored in assets/certificates/ and link to larger versions.
  certificates: [
    {
      enabled: true,
      role: 'Certification',
      date: 'February 2024',
      title: 'IELTS Academic · Overall Band 8.0',
      description: 'Academic IELTS result with CEFR level C1. Listening 9.0, Reading 8.5, Writing 7.0, and Speaking 7.0.',
      image: 'assets/certificates/ielts-trf.jpg',
      alt: 'IELTS Academic Test Report Form showing an overall band score of 8.0 and CEFR level C1',
      file: 'assets/certificates/ielts-trf.jpg',
      theme: 'navy'
    },
    {
      enabled: true,
      role: 'Presenter',
      date: '27 July 2026',
      title: 'Emerging Trends in AI & Cybersecurity',
      description: 'Presented at an online webinar hosted by Rangsit University International College.',
      image: 'assets/certificates/ai-cybersecurity-webinar.webp',
      alt: 'Certificate of appreciation recognizing Eddrick as presenter of the Emerging Trends in AI and Cybersecurity webinar on 27 July 2026',
      file: 'assets/certificates/ai-cybersecurity-webinar.webp',
      theme: 'navy'
    },
    {
      enabled: true,
      role: 'Moderator',
      date: '27 July 2026',
      title: 'Generative AI and the Future of ICT Learning',
      description: 'Moderated a symposium organized by Rangsit International College.',
      image: 'assets/certificates/generative-ai-symposium.webp',
      alt: 'Certificate of appreciation recognizing Eddrick as moderator of the Generative AI and the Future of ICT Learning symposium',
      file: 'assets/certificates/generative-ai-symposium.pdf',
      theme: 'gold'
    },
    {
      enabled: true,
      role: 'Participant',
      date: '20 October 2026',
      title: 'AgriFood Forward Innovation Workshop 2026',
      description: 'Explored innovation and AI applications in agriculture and food at Rangsit University.',
      image: 'assets/certificates/agrifood-workshop.webp',
      alt: 'Certificate of participation in AgriFood Forward Innovation Workshop 2026 at Rangsit University, 20 October 2026',
      file: 'assets/certificates/agrifood-workshop.webp',
      theme: 'green'
    }
  ],
  moments: [
    { enabled: true, title: 'RSU AI Hackathon 2026', detail: 'Working through the March 2026 hackathon with judges and mentors moving between teams during development.', image: 'assets/photos/hackathon-judging.jpg', alt: 'Eddrick and teammates presenting work-in-progress during the RSU AI Hackathon 2026' },
    { enabled: true, title: 'Feedback & iteration', detail: 'Discussing the product direction and technical decisions during a judging and feedback round at the hackathon.', image: 'assets/photos/hackathon-mentor.jpg', alt: 'Eddrick receiving mentor feedback with teammates during the RSU AI Hackathon 2026' },
    { enabled: true, title: 'More moments', detail: 'Additional event highlights, team snapshots, and portfolio photos will be added over time.', image: '', alt: 'Additional event photography coming soon' }
  ]
};
