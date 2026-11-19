/*
  Website behavior and reusable UI.
  Edit content in js/site-data.js rather than editing this file.
  Navigation uses hash routes, so the site works on static hosting and offline.
*/
(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  const main = document.getElementById('main-content');
  const header = document.getElementById('site-header');
  const mobile = document.getElementById('mobile-navigation');
  const menuToggle = document.querySelector('.menu-toggle');
  const progress = document.querySelector('.page-progress');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!data || !main || !header) return;

  let activeFilter = 'all';
  let currentRoute = null;
  let revealObserver;
  const esc = (value = '') => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const linkSafe = value => {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    return /^(https?:\/\/|mailto:|tel:|assets\/|motivnation-demo\/)/i.test(trimmed) ? trimmed : '';
  };
  const enabled = arr => (Array.isArray(arr) ? arr.filter(entry => entry && entry.enabled !== false) : []);
  const sectionOn = id => data.settings?.sections?.[id] !== false;
  const sectionAvailable = id => sectionOn(id) && (id === 'moments' ? enabled(data.moments).length > 0 : id === 'certificates' ? enabled(data.certificates).length > 0 : true);
  const drafting = () => data.settings?.showDraftNotes !== false;
  const arrow = '<span class="btn-arrow" aria-hidden="true">↗</span>';
  const tagList = (tags, limit) => `<div class="project-tags">${(tags || []).slice(0,limit || 20).map(x => `<span class="project-tag">${esc(x)}</span>`).join('')}</div>`;
  const projectRoute = project => `#/project/${encodeURIComponent(project.slug)}`;
  const sectionIntro = (label, title, emphasis, description) => `
    <div class="section-header reveal">
      <div><span class="eyebrow"><span class="line"></span>${esc(label)}</span><h2 class="section-title">${esc(title)} <span class="accent-serif">${esc(emphasis)}</span></h2></div>
      <p class="section-desc">${esc(description)}</p>
    </div>`;

  function art(project, detail = false) {
    if (project.image) {
      if (project.imagePresentation === 'browser') return `<div class="project-art project-art--screenshot project-art--${esc(project.visual)}"><div class="shot-browser"><div class="shot-browser__bar"><span class="shot-browser__dots" aria-hidden="true"><i></i><i></i><i></i></span><span>PROJECT / ${esc(project.title)}</span><span class="shot-browser__mark" aria-hidden="true">↗</span></div><div class="shot-browser__viewport"><img src="${esc(project.image)}" alt="${esc(project.imageAlt || project.title)}" loading="${detail ? 'eager' : 'lazy'}" decoding="async"></div></div><span class="shot-source-label">ARCHIVED PROJECT DEMO</span></div>`;
      return `<div class="project-art project-art--${esc(project.visual)}"><img src="${esc(project.image)}" alt="${esc(project.imageAlt || project.title)}" loading="${detail ? 'eager' : 'lazy'}" decoding="async"></div>`;
    }
    let interior = '';
    switch (project.visual) {
      case 'traffic':
        interior = `<div class="art-grid"></div><div class="art-device art-device--traffic"><div class="art-device__header"><span>TRAFFIC / CONCEPT VIEW</span><span class="art-dots"><i></i><i></i><i></i></span></div><div class="traffic-map"><span class="traffic-route one"></span><span class="traffic-route two"></span><span class="traffic-route three"></span><span class="traffic-point one"></span><span class="traffic-point two"></span><span class="traffic-point three"></span><div class="traffic-card">ROUTE OVERVIEW<strong>BKK → CITY</strong><em>Illustrative overview</em></div></div></div>`;
        break;
      case 'gaming':
        interior = `<div class="art-grid"></div><div class="art-device art-device--gaming"><div class="art-device__header"><span>ASSISTANT / AI</span><span class="art-dots"><i></i><i></i><i></i></span></div><div class="chat-screen"><div class="chat-bubble user">How can I improve my strategy?</div><div class="chat-bubble">Let's explore a few approaches.<div class="chat-lines"><i></i><i></i><i></i></div></div></div></div>`;
        break;
      case 'fitness':
        interior = `<div class="art-grid"></div><div class="art-device art-device--fitness"><div class="art-device__header" style="background:#dcece6;color:#3c6c64;border-color:#c3d9d1"><span>MOTIVNATION / DASHBOARD</span><span class="art-dots"><i></i><i></i></span></div><div class="fitness-main"><small>Daily progress · sample UI</small><div class="fitness-num">6,840 <span style="font-size:12px;letter-spacing:0">steps</span></div><div class="fitness-track"><span></span></div><div class="fitness-row"><div class="fitness-box"><small>Water</small><b>5/8</b></div><div class="fitness-box"><small>Activity</small><b>42m</b></div><div class="fitness-box"><small>XP</small><b>+120</b></div></div></div></div>`;
        break;
      default:
        interior = `<div class="art-grid"></div><div class="art-device art-device--ux"><div class="art-device__header" style="background:#f2dfd6;color:#77595b;border-color:#e3c8be"><span>UX / HEURISTIC REVIEW</span><span class="art-dots"><i></i><i></i></span></div><div class="ux-main"><div class="ux-column"><b>Observation</b><span class="ux-line"></span><span class="ux-line"></span><span class="ux-line"></span><span class="ux-rating">Review</span></div><div class="ux-column"><b>Recommendation</b><span class="ux-line"></span><span class="ux-line"></span><span class="ux-line"></span><span class="ux-rating">Improve</span></div></div></div>`;
    }
    return `<div class="project-art project-art--${esc(project.visual || 'ux')}" role="img" aria-label="Illustrative project concept; original visuals coming soon">${interior}<span class="art-label">Original visuals coming soon</span></div>`;
  }

  function hero() {
    const p = data.personal;
    const headline = p.headlineParts || ['I build', 'digital', 'things that', 'make sense.'];
    const portrait = p.portrait
      ? `<img src="${esc(p.portrait)}" alt="${esc(p.portraitAlt || 'Portrait')}" decoding="async" fetchpriority="high">`
      : `<div class="portrait-fallback portrait-fallback--editorial" aria-label="Portrait coming soon"><span class="portrait-card__edition">A PERSONAL PORTFOLIO / 2026</span><span class="portrait-fallback__center"><span class="portrait-fallback__monogram" aria-hidden="true">e.</span><strong>EDDRICK</strong><small>Developer · Design · AI</small></span><span class="portrait-fallback__soon">PORTRAIT COMING SOON <span aria-hidden="true">↗</span></span></div>`;
    return `<section class="hero" id="top" aria-labelledby="hero-title"><div class="container hero-main">
      <div class="hero-copy">
        ${drafting() ? '<span class="label-pill"><span class="status-orb"></span> A PORTFOLIO IN PROGRESS</span>' : ''}
        <p class="eyebrow"><span class="line"></span>${esc(p.tagline)}</p>
        <h1 id="hero-title" class="display">${esc(headline[0] || 'I build')} <span class="accent">${esc(headline[1] || 'digital')}</span> ${esc(headline[2] || 'things that')} <span class="accent-serif">${esc(headline[3] || 'make sense.')}</span></h1>
        <p class="hero-intro">${esc(p.introduction)}</p>
        <div class="hero-actions">${sectionOn('work') ? `<a class="btn btn--light" href="#work">Explore my work ${arrow}</a>` : ''}${linkSafe(p.links?.resume) ? `<a class="text-link" href="${esc(p.links.resume)}" target="_blank" rel="noopener noreferrer" aria-label="Read my full CV (opens in a new tab)">View full CV <span class="arrow" aria-hidden="true">↗</span></a>` : ''}</div>
      </div>
      <div class="hero-visual" aria-label="Portrait area"><div class="portrait-card">${portrait}<div class="portrait-card__bottom"><span>BEHIND THE CODE</span><span>✳ / 2026</span></div></div><div class="portrait-sticker"><strong>Hi, I'm<br>${esc(p.displayName)}.</strong><small>Nice to meet you ↗</small></div></div>
      </div><div class="container hero-footer"><span>${esc(p.fullName)} · ${esc(p.location)}</span>${sectionOn('work') ? '<a class="footer-scroll" href="#work">SCROLL TO EXPLORE <span class="scroll-line"></span><span aria-hidden="true">↓</span></a>' : ''}</div></section>`;
  }

  function projectCard(project, idx) {
    return `<article class="project-card ${idx === 0 ? 'project-card--featured' : ''} reveal" data-category="${esc(project.category)}">
      <div class="project-card__content"><div class="project-card__top"><span>${esc(project.categoryLabel)}</span><span class="project-card__num">${esc(project.number || String(idx+1).padStart(2,'0'))} / ${esc(project.date)}</span></div>
        <h3>${esc(project.title)}</h3><p class="project-card__summary">${esc(project.summary)}</p>${tagList(project.tech, 4)}
        <div class="project-card__actions"><a class="project-card__view" href="${projectRoute(project)}" aria-label="Read case study: ${esc(project.title)}">Explore this project <span aria-hidden="true">↗</span></a>${linkSafe(project.links?.demo) ? `<a class="project-card__visit" href="${esc(project.links.demo)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${esc(project.title)} website (opens in a new tab)">${esc(project.demoLinkLabel || 'Live website')} ↗</a>` : ''}</div></div>
      ${art(project, idx === 0)}</article>`;
  }

  function work() {
    const projects = enabled(data.projects);
    const filters = [['all','All projects'],['ai','AI'],['software','Software'],['data','Data'],['design','UX']];
    return `<section class="section work-section" id="work" aria-labelledby="work-title"><div class="container">
      ${sectionIntro('SELECTED WORK','Things I’ve','built.','Some projects are about code. Others are about people. All of them have taught me something worth sharing.').replace('<h2 class="section-title">','<h2 id="work-title" class="section-title">')}
      <div class="work-toolbar"><div class="filter-row" role="group" aria-label="Filter projects">${filters.map(([filter, label]) => `<button type="button" class="filter-btn" data-filter="${filter}" aria-pressed="${activeFilter === filter}">${label}</button>`).join('')}</div><span class="work-count" role="status" aria-live="polite">${projects.length} selected projects</span></div>
      <div class="project-grid" id="project-grid">${projects.map(projectCard).join('') || '<div class="empty-state"><strong>Projects coming soon.</strong><p>More projects will be shared here as they are ready.</p></div>'}</div>
      ${drafting() ? '<div class="work-after"><p>Illustrated previews are placeholders until real screenshots and project links are ready.</p></div>' : ''}
    </div></section>`;
  }

  function about() {
    const p = data.personal;
    return `<section class="section about-section" id="about" aria-labelledby="about-title"><div class="container">
      <div class="about-grid"><div class="reveal"><span class="eyebrow"><span class="line"></span>THE PERSON</span><h2 id="about-title" class="about-lead">A curious mind, an eye for <em class="accent-serif">details,</em> and a drive to keep building.</h2></div>
      <div class="about-copy reveal">${(p.about || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}<div class="about-signature"><span aria-hidden="true"></span>${esc(p.fullName)} / ${esc(p.displayName)}</div></div></div>
      <div class="skills-grid">${(data.skills || []).map((group,i)=> `<div class="skill-panel reveal"><span class="mini-index">SKILLSET</span><h3>${esc(group.title)}</h3><ul>${(group.items||[]).map(item=>`<li>${esc(item)}</li>`).join('')}</ul></div>`).join('')}</div>
    </div></section>`;
  }

  function toolsSection() {
    const tools = enabled(data.tools);
    if (!tools.length) return '';
    return `<section class="tools-section" id="tools" aria-labelledby="tools-title"><div class="container">
      <div class="tools-heading reveal"><div><span class="eyebrow"><span class="line"></span>THE TOOLKIT</span><h2 id="tools-title">Tools behind <em class="accent-serif">the work.</em></h2></div><p>A growing toolkit I have used while building, experimenting, collaborating, and designing.</p></div>
      <div class="tool-grid">${tools.map(tool => `<div class="tool-card reveal"><span class="tool-card__icon"><img loading="lazy" decoding="async" src="${esc(tool.icon.startsWith('data:image/') ? tool.icon : 'assets/logos/'+tool.icon+'.svg')}" alt="" aria-hidden="true"></span><span class="tool-card__name">${esc(tool.name)}</span><span class="tool-card__type">${esc(tool.type || '')}</span></div>`).join('')}</div>
    </div></section>`;
  }

  function journey() {
    const education = enabled(data.education);
    const experience = enabled(data.experience);
    const milestones = enabled(data.milestones);
    return `<section class="section journey-section" id="journey" aria-labelledby="journey-title"><div class="container">
      ${sectionIntro('THE PATH SO FAR','Experience &','education.','A snapshot of where I have studied, taught, and grown — with room for what comes next.').replace('<h2 class="section-title">','<h2 id="journey-title" class="section-title">')}
      <div class="timeline-layout"><div class="reveal"><div class="timeline-heading"><h3>Education</h3><span>LEARNING</span></div>
      ${education.map(entry => `<article class="timeline-entry"><span class="timeline-date">${esc(entry.dates)}</span><h4>${esc(entry.institution)}</h4><p class="timeline-role">${esc(entry.qualification)}</p><p>${esc(entry.location)}</p>${entry.detail ? `<p><strong>${esc(entry.detail)}</strong></p>` : ''}${entry.notes ? `<p>${esc(entry.notes)}</p>` : ''}</article>`).join('') || '<p>No education entries shown.</p>'}
      </div><div class="reveal"><div class="timeline-heading"><h3>Experience</h3><span>DOING</span></div>
      ${experience.map(entry=>`<article class="timeline-entry"><span class="timeline-date">${esc(entry.dates)}</span><h4>${esc(entry.organization)}</h4><p class="timeline-role">${esc(entry.position)} · ${esc(entry.location)}</p><ul>${(entry.details||[]).map(item=>`<li>${esc(item)}</li>`).join('')}</ul></article>`).join('') || '<p>No experience entries shown.</p>'}
      ${drafting() ? '<div class="draft-inline">+ More roles, internships, volunteer work, or leadership experience can be added here later. This note can be hidden for launch.</div>' : ''}
      </div></div>
      ${milestones.length ? `<div class="milestone-section reveal"><div class="milestone-heading"><div><span class="eyebrow"><span class="line"></span>BEYOND THE CORE</span><h3>Milestones <em>& highlights.</em></h3></div><p>Research, recognition, and experiences that have shaped how I work.</p></div>
      <div class="milestone-grid">${milestones.map(entry=>`<article class="milestone-card"><div class="milestone-top"><span>${esc(entry.label)}</span><time>${esc(entry.date)}</time></div><h4>${esc(entry.title)}</h4>${entry.description ? `<p>${esc(entry.description)}</p>` : ''}</article>`).join('')}</div></div>` : ''}
      </div></section>`;
  }

  function certificatesSection() {
    const certificates = enabled(data.certificates);
    if (!certificates.length) return '';
    return `<section class="section certificates-section" id="certificates" aria-labelledby="certificates-title"><div class="container">
      ${sectionIntro('OFF THE CLOCK','Speaking &','learning.','A few opportunities to share ideas, facilitate conversations, and keep exploring technology beyond coursework.').replace('<h2 class="section-title">','<h2 id="certificates-title" class="section-title">')}
      <div class="certificates-grid">${certificates.map((entry,index)=>`<article class="certificate-card" data-certificate-theme="${esc(entry.theme || 'navy')}">
        <a class="certificate-card__visual" href="${esc(entry.file || entry.image)}" target="_blank" rel="noopener noreferrer" aria-label="Open certificate: ${esc(entry.title)} (new tab)">
          <img src="${esc(entry.image)}" alt="${esc(entry.alt || entry.title)}" loading="lazy" decoding="async" width="1600" height="1131">
          <span class="certificate-card__open" aria-hidden="true">View original <span>↗</span></span>
        </a>
        <div class="certificate-card__details"><div class="certificate-card__meta"><span class="certificate-card__role">${esc(entry.role)}</span><time>${esc(entry.date)}</time></div>
          <h3>${esc(entry.title)}</h3><p>${esc(entry.description || '')}${/IELTS/i.test(entry.title) ? ' Organizations may request the unredacted Test Report Form directly from me for verification.' : ''}</p>
          <a class="certificate-card__link" href="${esc(entry.file || entry.image)}" target="_blank" rel="noopener noreferrer">View certificate <span aria-hidden="true">↗</span></a>
        </div></article>`).join('')}</div>
      <p class="certificates-footnote">The public IELTS report is redacted for privacy. The other certificates document university presentations and workshops.</p>
    </div></section>`;
  }

  function moments() {
    const moments = enabled(data.moments);
    if (!moments.length) return '';
    const withPhotos = moments.filter(m => m.image);
    const coming = moments.filter(m => !m.image);
    const momentIntro = sectionIntro('OFF THE SCREEN','Beyond the','browser.','The people, events, and experiences that shape the work beyond the code.').replace('<h2 class="section-title">','<h2 id="moments-title" class="section-title">');
    const published = withPhotos.length ? `<div class="moments-grid">${withPhotos.map(m => `<article class="moment reveal"><div class="moment-photo"><img src="${esc(m.image)}" alt="${esc(m.alt || m.title)}" loading="lazy" decoding="async"></div><div class="moment-meta"><div><h3>${esc(m.title)}</h3><p>${esc(m.detail || '')}</p></div></div></article>`).join('')}</div>` : '';
    const teaser = coming.length ? `<div class="moments-coming reveal"><div class="moments-coming__stamp"><span class="moments-coming__asterisk" aria-hidden="true">✳</span><span>STORIES IN PROGRESS</span></div><div class="moments-coming__copy"><span class="moments-coming__eyebrow">THE PERSONAL ARCHIVE / UP NEXT</span><h3>More moments,<br><em>coming soon.</em></h3><p>More campus events, team projects, and behind-the-scenes stories will join this collection over time.</p><div class="moments-coming__topics">${coming.map(m => `<span>${esc(m.title)}</span>`).join('')}</div></div><span class="moments-coming__corner" aria-hidden="true">↗</span></div>` : '';
    return `<section class="section moments-section" id="moments" aria-labelledby="moments-title"><div class="container">${momentIntro}${published}${teaser}</div></section>`;
  }

  function contact(detailMode = false) {
    const p = data.personal;
    const extra = [];
    if (linkSafe(p.links?.github)) extra.push(`<a href="${esc(p.links.github)}" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>`);
    if (linkSafe(p.links?.linkedin)) extra.push(`<a href="${esc(p.links.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>`);
    if (linkSafe(p.links?.resume)) extra.push(`<a href="${esc(p.links.resume)}" target="_blank" rel="noopener noreferrer">View full CV <span aria-hidden="true">↗</span></a>`);
    if (p.showPhonePublicly && p.phone) extra.push(`<a href="tel:${esc(p.phone.replace(/[^+\d]/g,''))}">${esc(p.phone)} <span aria-hidden="true">↗</span></a>`);
    return `<footer class="contact-section" id="contact"><div class="container"><div class="contact-grid"><div><span class="eyebrow"><span class="line"></span>REACH OUT</span><h2 class="contact-heading display">Let's make <em class="accent-serif">something</em> work.</h2></div><div><p class="contact-intro">Have an opportunity, collaboration, or interesting idea? I'm always happy to have a conversation.</p><div class="contact-links"><a href="mailto:${esc(p.email)}">${esc(p.email)} <span aria-hidden="true">↗</span></a>${extra.join('')}</div></div></div><div class="footer-bottom"><span>© <span id="copyright-year">2026</span> ${esc(p.displayName)}. Built with intention.</span><span>${esc(p.location)}</span>${detailMode ? '<button type="button" class="footer-back" data-scroll-top>Back to top ↑</button>' : '<a href="#top">Back to top ↑</a>'}</div></div></footer>`;
  }

  function renderHome() {
    document.title = `${data.personal.displayName}'s Portfolio`;
    return [
      sectionOn('hero') ? hero() : '<div id="top"></div>',
      sectionOn('work') ? work() : '',
      sectionOn('about') ? about() : '',
      sectionOn('tools') ? toolsSection() : '',
      sectionOn('journey') ? journey() : '',
      sectionOn('certificates') ? certificatesSection() : '',
      sectionOn('moments') ? moments() : '',
      sectionOn('contact') ? contact() : ''
    ].join('');
  }

  // Optional per-project sections; projects without these fields render as before.
  function featureSpotlight(project) {
    const features = Array.isArray(project.features) ? project.features.filter(item => item && item.title) : [];
    if (!features.length) return '';
    return `<section class="detail-features" aria-labelledby="detail-features-heading">
      <div class="feature-heading"><div><span class="eyebrow"><span class="line"></span>ANATOMY OF THE PROJECT</span><h2 id="detail-features-heading">${esc(project.featuresHeading || 'What the experience includes.')}</h2></div><p>${esc(project.featuresIntro || 'Three parts of the experience, as developed for the project.')}</p></div>
      <div class="feature-grid">${features.map(f => `<article class="feature-tile"><div class="feature-tile__top"><span>${esc(f.number || '')} / FEATURE</span><span class="feature-symbol feature-symbol--${['track','rank','verify'].includes(f.symbol)?f.symbol:'track'}" aria-hidden="true">${f.symbol === 'rank' ? '↗' : f.symbol === 'verify' ? '✓' : '◎'}</span></div><h3>${esc(f.title)}</h3><p>${esc(f.description || '')}</p></article>`).join('')}</div>
    </section>`;
  }

  function screenshotGallery(project) {
    const shots = Array.isArray(project.screenshots) ? project.screenshots.filter(item => item && item.title) : [];
    if (!shots.length) return '';
    return `<section class="detail-screens" aria-labelledby="detail-screens-heading"><div class="screen-heading"><div><span class="eyebrow"><span class="line"></span>INTERFACE GALLERY</span><h2 id="detail-screens-heading">${esc(project.screenshotsHeading || 'A closer look at the experience.')}</h2></div><p>${esc(project.screenshotsNote || (shots.some(shot => !shot.image) ? 'Original screens and visuals coming soon.' : 'Selected screens from the project.'))}</p></div>
      <div class="screen-grid">${shots.map((shot,i) => `<figure class="screen-card"><div class="screen-card__media ${shot.image ? 'screen-card__media--image' : ''} ${shot.orientation ? 'screen-card__media--'+esc(shot.orientation) : ''}">${shot.image ? `<a class="screen-image-link" href="${esc(shot.image)}" target="_blank" rel="noopener noreferrer" aria-label="View full screenshot: ${esc(shot.title)}"><img src="${esc(shot.image)}" alt="${esc(shot.alt || shot.title)}" loading="eager" decoding="async"><span class="screen-enlarge" aria-hidden="true">View full image ↗</span></a>` : `<div class="screen-placeholder" aria-label="Original image coming soon: ${esc(shot.title)}"><span class="screen-placeholder__mark" aria-hidden="true">${['◎','▥','✓'][i%3]}</span><span>VISUAL COMING SOON</span><small>More from this project soon</small></div>`}</div><figcaption><strong>${esc(shot.title)}</strong><span>${esc(shot.description || '')}</span></figcaption></figure>`).join('')}</div>
    </section>`;
  }

  function detailContent(project) {
    const prompt = (!project.challenge || !project.process || !project.outcome) && drafting()
      ? `<section class="detail-draft"><h3>✳ Case study still growing</h3><p>Easy-to-add details for later: the initial problem, design or engineering decisions, actual screenshots, obstacles encountered, and measurable results (if available). Blank sections are intentionally not presented as facts.</p></section>` : '';
    return `<section class="detail-hero" id="top"><div class="container"><a class="back-link" href="#work"><span aria-hidden="true">←</span> Back to selected work</a><div class="eyebrow"><span class="line"></span>${esc(project.categoryLabel)} / ${esc(project.date)}</div><h1 class="display">${esc(project.title)}</h1><p class="detail-hero__summary">${esc(project.tagline || project.summary)}</p><div class="detail-hero__bottom"><span>${esc(project.role)}</span><span>${esc(project.date)}</span></div></div></section>
      <div class="detail-body"><div class="container"><div class="detail-art">${art(project,true)}</div>${featureSpotlight(project)}${screenshotGallery(project)}<div class="detail-columns"><div class="detail-copy">
        <section><span class="eyebrow"><span class="line"></span>THE PROJECT</span><h2>What is it about?</h2><p>${esc(project.summary)}</p></section>
        ${project.challenge ? `<section><span class="eyebrow"><span class="line"></span>THE PROBLEM</span><h2>What we set out to solve</h2><p>${esc(project.challenge)}</p></section>` : ''}
        <section><span class="eyebrow"><span class="line"></span>MY ROLE</span><h2>What I contributed</h2><ul>${(project.contributions||[]).map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section>
        ${project.process ? `<section><span class="eyebrow"><span class="line"></span>THE PROCESS</span><h2>How it came together</h2><p>${esc(project.process)}</p></section>` : ''}
        ${project.outcome ? `<section><span class="eyebrow"><span class="line"></span>THE OUTCOME</span><h2>What came out of it</h2><p>${esc(project.outcome)}</p></section>` : ''}
        ${prompt}
      </div><aside class="detail-sidebar"><h3>Project notes</h3><div class="fact"><small>Project</small><strong>${esc(project.fullTitle || project.title)}</strong></div><div class="fact"><small>When</small><strong>${esc(project.date)}</strong></div><div class="fact"><small>My role</small><strong>${esc(project.role)}</strong></div><div class="fact"><small>Focus</small>${tagList(project.tech)}</div>
      ${linkSafe(project.links?.demo) ? `<div class="fact"><a class="text-link" href="${esc(project.links.demo)}" target="_blank" rel="noopener noreferrer">${esc(project.demoLinkLabel || 'Visit project website')} ↗</a>${project.demoNote ? `<p class="fact-note">${esc(project.demoNote)}</p>` : ''}</div>` : ''}
      ${linkSafe(project.links?.repo) ? `<div class="fact"><a class="text-link" href="${esc(project.links.repo)}" target="_blank" rel="noopener noreferrer">Source code ↗</a></div>` : ''}
      </aside></div></div></div><section class="detail-cta"><div class="container"><div><span class="eyebrow"><span class="line"></span>KEEP EXPLORING</span><h2>More things I've built.</h2></div><a class="btn btn--dark" href="#work">All projects <span class="btn-arrow" aria-hidden="true">↗</span></a></div></section>${sectionOn('contact') ? contact(true) : ''}`;
  }

  function notFound() {
    document.title = 'Project not found — Eddrick';
    return `<section class="not-found" id="top"><div class="container"><span class="eyebrow">404 / NOT FOUND</span><h1 class="display">That project isn't here.</h1><p>The link may have changed or the project may be hidden for now.</p><a class="btn btn--light" href="#work">Return to projects ↗</a></div></section>${sectionOn('contact') ? contact(true) : ''}`;
  }

  function parseRoute() {
    const hash = decodeURIComponent(location.hash || '#top');
    if (hash.startsWith('#/project/')) return { type: 'project', slug: hash.slice('#/project/'.length) };
    return { type: 'home', anchor: hash.startsWith('#') ? hash.slice(1) : 'top' };
  }

  function closeMenu(restoreFocus = false) {
    mobile.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    header.classList.remove('menu-visible');
    document.body.classList.remove('nav-open');
    if (restoreFocus) menuToggle.focus();
    updateHeader();
  }
  function updateHeader() {
    const isScrolled = window.scrollY > 45;
    header.classList.toggle('scrolled', isScrolled && !document.body.classList.contains('nav-open'));
    // On the detail page the first screen is dark too.
    progress.style.width = `${Math.max(0,Math.min(100, (window.scrollY / Math.max(1,document.documentElement.scrollHeight - window.innerHeight)) * 100))}%`;
  }
  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    const elements = document.querySelectorAll('.reveal');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('in-view'));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 50px 0px', threshold: .04 });
    elements.forEach(el => revealObserver.observe(el));
  }
  function applyFilter(filter) {
    activeFilter = filter;
    const cards = Array.from(document.querySelectorAll('.project-card'));
    let count = 0;
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      card.style.display = visible ? '' : 'none';
      if (visible) count++;
      card.classList.toggle('project-card--featured',false);
    });
    // Whichever card is first in a filtered collection gets the large showcase treatment.
    const first = cards.find(card => card.style.display !== 'none');
    if (first) first.classList.add('project-card--featured');
    document.querySelectorAll('.filter-btn').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter)));
    const status = document.querySelector('.work-count');
    if (status) status.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
  }
  function handleRoute(initial = false) {
    const route = parseRoute();
    document.querySelectorAll('.desktop-nav a, .mobile-nav a, .header-contact').forEach(link => {
      const key = link.getAttribute('href')?.slice(1);
      if (key && ['work','about','journey','certificates','moments','contact'].includes(key)) link.hidden = !sectionAvailable(key);
    });
    const signature = route.type === 'project' ? `project:${route.slug}` : 'home';
    const lastSignature = currentRoute?.signature;
    const hasChangedView = signature !== lastSignature;
    route.signature = signature;
    currentRoute = route;
    closeMenu();
    if (hasChangedView || !main.innerHTML) {
      if (route.type === 'project') {
        const project = enabled(data.projects).find(p => p.slug === route.slug);
        main.innerHTML = project ? detailContent(project) : notFound();
        if (project) document.title = `${project.title} — Eddrick`;
      } else main.innerHTML = renderHome();
      activeFilter = 'all';
      observeReveals();
      document.getElementById('copyright-year')?.replaceChildren(document.createTextNode(String(new Date().getFullYear())));
    }
    if (route.type === 'home' && route.anchor && route.anchor !== 'top') {
      const target = document.getElementById(route.anchor);
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: initial || reducedMotion.matches ? 'instant' : 'smooth', block: 'start' }));
      else if (hasChangedView) window.scrollTo(0,0);
    } else if (hasChangedView || initial) window.scrollTo({top:0,behavior:'instant'});
    if (!initial && hasChangedView) main.focus({preventScroll:true});
    updateHeader();
  }

  document.querySelector('.skip-link')?.addEventListener('click', event => {
    event.preventDefault();
    main.focus({preventScroll:true});
    main.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
  });

  menuToggle.addEventListener('click', () => {
    const opening = mobile.hidden;
    if (opening) {
      mobile.hidden = false;
      menuToggle.setAttribute('aria-expanded','true');
      menuToggle.setAttribute('aria-label','Close navigation');
      header.classList.add('menu-visible');
      document.body.classList.add('nav-open');
      mobile.querySelector('a')?.focus();
    } else closeMenu(true);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobile.hidden) closeMenu(true);
    if (event.key === 'Tab' && !mobile.hidden) {
      const focusable = [menuToggle, ...mobile.querySelectorAll('a')];
      const at = focusable.indexOf(document.activeElement);
      if (event.shiftKey && at === 0) {event.preventDefault(); focusable[focusable.length-1].focus();}
      else if (!event.shiftKey && at === focusable.length-1) {event.preventDefault(); focusable[0].focus();}
    }
  });
  document.addEventListener('click', event => {
    const filter = event.target.closest('[data-filter]');
    if (filter) applyFilter(filter.dataset.filter);
    if (event.target.closest('[data-scroll-top]')) window.scrollTo({top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    if (!mobile.hidden && event.target.closest('.mobile-nav a')) closeMenu();
  });
  window.addEventListener('scroll', updateHeader, {passive:true});
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800 && !mobile.hidden) closeMenu();
    updateHeader();
  }, {passive:true});
  window.addEventListener('hashchange', () => handleRoute());
  handleRoute(true);
})();
