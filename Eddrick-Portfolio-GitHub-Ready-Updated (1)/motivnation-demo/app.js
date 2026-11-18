/* MotivNation — database-free archive adaptation, based on the supplied project's frontend. */
(()=>{'use strict';
const ROOT=document.getElementById('main'),KEY='motivnation_archive_1';
const emojis={hydration:'💧',steps:'🚶',workout:'🏋️',sleep:'😴'};
const units={hydration:'glasses',steps:'steps',workout:'sessions',sleep:'hours'};
const today=()=>new Date().toLocaleDateString('en-CA');
const yday=()=>{const d=new Date();d.setDate(d.getDate()-1);return d.toLocaleDateString('en-CA')};
const sample=()=>({selected:'a',members:[
{id:'a',name:'Alex Johnson',xp:350,streak:12,best:15,last:today(),demo:true},
{id:'b',name:'Sam Chen',xp:280,streak:8,best:12,last:today(),demo:true},
{id:'c',name:'Jordan Taylor',xp:150,streak:5,best:8,last:yday(),demo:true}],
logs:[{id:'l1',memberId:'a',date:today(),habit:'hydration',quantity:8,xp:40},
{id:'l2',memberId:'b',date:today(),habit:'workout',quantity:1,xp:20}]});
let state;try{const raw=JSON.parse(localStorage.getItem(KEY));state=raw&&Array.isArray(raw.members)&&Array.isArray(raw.logs)?raw:sample()}catch{state=sample()}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{return false}};save();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const el=(tag,html,cl='')=>`<${tag}${cl?` class="${cl}"`:''}>${html}</${tag}>`;
const rank=x=>x>=500?['Gold','🥇']:x>=200?['Silver','🥈']:x>=50?['Bronze','🥉']:['Newbie','🌱'];
const selected=()=>state.members.find(m=>m.id===state.selected);
const notify=t=>{const b=document.getElementById('toast');b.textContent=t;b.hidden=false;clearTimeout(notify.timer);notify.timer=setTimeout(()=>b.hidden=true,3300)};
const nav=(route)=>`#/`+route;
const lead=(title,desc)=>`<div class="page-lead"><h1>${title}</h1><p>${desc}</p></div>`;
function home(){return `<div class="shell page hero-page"><div class="page-lead"><h1 class="gradient-word">MotivNation</h1><h2>Build Better Habits Together</h2><p>Join your friends in a fun, trust-based challenge to stay healthy, earn rewards, and cheer each other on.</p></div>
<div class="hero-image"><img src="assets/hero-image.jpg" alt="Original MotivNation hero illustration showing wellness activities" decoding="async" fetchpriority="high"></div>
<div class="hero-actions"><a class="button primary" href="#/join">Join Now 🚀</a><a class="button light" href="#/log">Log Today 📝</a></div>
<div class="trio"><article class="card feature"><span class="feature-icon lime">✅</span><h3>Trust</h3><p>Build habits through community accountability and support</p></article><article class="card feature"><span class="feature-icon violet">📸</span><h3>Verification</h3><p>Share progress photos and celebrate achievements together</p></article><article class="card feature"><span class="feature-icon peach">🎉</span><h3>Fun XP</h3><p>Earn XP, build streaks, and unlock achievements</p></article></div>
<section class="activity-strip"><h2>Ready to start your journey?</h2><div class="activity-cats"><div><span>💧</span><small>Hydration</small></div><div><span>🚶</span><small>Steps</small></div><div><span>🏋️</span><small>Workout</small></div><div><span>😴</span><small>Sleep</small></div></div></section></div>`}
function join(){return `<div class="shell page">${lead('Join MotivNation 🚀','Create a profile or select a sample member to explore the project demo.')}
<div class="two-col"><div class="stack"><section class="card"><h2>＋ Create New Member</h2><form id="join-form"><label class="form-field"><span>Your name</span><input name="name" maxlength="36" autocomplete="off" required placeholder="Enter your name"></label><button class="button primary block" type="submit">Join the Community 🎉</button></form></section>
<section class="card"><h2>👥 Existing members</h2><div class="member-grid">${state.members.map(m=>`<button class="member-pick" data-select="${esc(m.id)}"><strong>${esc(m.name)}</strong><small>${m.xp} XP · ${m.streak}🔥 streak${m.demo?' · sample':''}</small></button>`).join('')}</div></section></div>
<aside class="side-card"><div style="font-size:36px">🌟</div><h3>Track Your Progress</h3><ul><li>⚡ Earn XP for healthy habits</li><li>🔥 Build unstoppable streaks</li><li>🏆 Compete on leaderboards</li><li>🎉 Cheer each other on</li></ul><p>All activity is local to your browser. There are no shared accounts.</p></aside></div></div>`}
function log(){const m=selected();const done=m&&state.logs.some(l=>l.memberId===m.id&&l.date===today());return `<div class="shell page">${lead('Daily Log 📝','Track healthy habits and earn XP in this interactive archive.')}
<div class="banner-success ${done?'':'warning'}"><h3>${done?'You logged today! ✅':"Don't lose your streak! ⏰"}</h3><p>${done?'Great job keeping up your streak!':'Choose an activity and record your progress.'}</p></div>
<div class="two-col"><section class="card"><h2>Log Today's Habits</h2><form id="log-form">
<label class="form-field"><span>Select member</span><select name="member" required>${state.members.map(x=>`<option ${x.id===state.selected?'selected':''} value="${esc(x.id)}">${esc(x.name)} (${x.xp} XP)</option>`).join('')}</select></label>
<label class="form-field"><span>Habit type</span><select name="habit" required><option value="" selected disabled>Choose a habit</option>${Object.keys(emojis).map(k=>`<option value="${k}">${emojis[k]} ${k[0].toUpperCase()+k.slice(1)}</option>`).join('')}</select></label>
<label class="form-field"><span>Quantity</span><input type="number" step="any" min="0.1" max="100000" name="quantity" placeholder="Enter amount" required><p>Hydration: glasses · Steps: step count · Workout: sessions · Sleep: hours</p></label>
<label class="form-field"><span>Proof photo (optional)</span><input type="file" name="photo" accept="image/jpeg,image/png,image/webp"><p>To protect local storage, images must be under 600 KB. Photos stay in this browser.</p></label>
<button type="submit" class="button primary block">Log Habit &amp; Earn XP ⚡</button></form></section>
<aside class="stack"><section class="side-card violet"><div style="font-size:34px">⚡</div><h3>XP Rules</h3><ul><li>💧 5 XP per glass</li><li>🚶 5 XP per 1,000 steps</li><li>🏋️ 20 XP per session</li><li>😴 10 XP for 7+ hours</li></ul></section><section class="card"><h2>Today's logs</h2>${state.logs.filter(l=>l.date===today()).slice(-6).reverse().map(l=>`<p style="border-bottom:1px solid #eee;padding-bottom:8px;color:#69677f">${emojis[l.habit]} ${esc(state.members.find(m=>m.id===l.memberId)?.name||'Member')} · ${l.quantity} ${units[l.habit]} <strong>+${l.xp} XP</strong></p>`).join('')||'<p>No entries yet.</p>'}</section></aside></div></div>`}
function leaderboard(){const sorted=[...state.members].sort((a,b)=>b.xp-a.xp), top=sorted.slice(0,3);return `<div class="shell page">${lead('🏆 Leaderboard','Celebrate progress, cheer each other on, and climb the rankings.')}
<div class="leader-heading"><h2>✨ The Hall of Motivation ✨</h2><p>Sample profiles and your own local progress · rankings update when you log habits</p></div>
<div class="podium">${[1,0,2].map(i=>{const m=top[i];return m?`<article class="podium-card ${i===0?'first':''}"><span class="medal">${['🥇','🥈','🥉'][i]}</span><strong>${esc(m.name)}</strong><small>${m.streak} 🔥 day streak</small><span class="score">${m.xp} XP</span></article>`:`<div class="podium-card">—</div>`}).join('')}</div>
<section class="card"><h2>All participants</h2><ol class="ranking-list">${sorted.map((m,i)=>`<li><div><strong><span class="ranknum">${i+1}</span>${esc(m.name)}</strong><small>${rank(m.xp)[1]} ${rank(m.xp)[0]} rank · ${m.streak} day streak${m.demo?' · demo':''}</small></div><strong class="score">${m.xp} XP</strong></li>`).join('')}</ol></section></div>`}
function community(){const logs=state.logs.filter(l=>l.photo).slice().reverse();return `<div class="shell page">${lead('📸 Community Wall','A place for encouragement, accountability, and sharing progress.')}
${logs.length?`<div class="feed">${logs.map(l=>`<article class="feed-card"><div class="photo"><img src="${esc(l.photo)}" alt="Uploaded wellness progress photo"></div><div class="feed-body"><strong>${esc(state.members.find(m=>m.id===l.memberId)?.name||'Member')}</strong><p>${emojis[l.habit]} ${l.quantity} ${units[l.habit]} · +${l.xp} XP</p><small>${esc(l.date)}</small></div></article>`).join('')}</div>`:`<div class="empty-note"><div style="font-size:50px;margin-bottom:15px">📸</div><h2>No photo posts yet</h2><p>Try submitting a small photo along with an activity in the Daily Log.</p><a class="button primary" href="#/log">Add a daily log</a></div>`}
<div class="big-cta"><span style="font-size:40px">🌟</span><h2>Keep Sharing!</h2><p>Every habit counts. Help others stay motivated.</p></div></div>`}
function rewards(){const items=[{icon:'⭐',title:'Weekly Shoutouts',subtitle:'Top streaks & improvements',style:'orange',benefits:['Community highlights','Recognition for consistency','Celebrate improvements']},{icon:'🏅',title:'Badges & Certificates',subtitle:'Virtual recognition',style:'green',benefits:['Digital achievement badges','Milestone recognition','Personal trophy case']},{icon:'🍎',title:'Snack Tokens',subtitle:'Original rewards concept',style:'blue',benefits:['Concept: rewards for 30-day streaks','Concept: healthy snack tokens','No real-world redemption in this demo']}];return `<div class="shell page">${lead('🎁 Rewards & Recognition','Building healthy habits deserves celebration. Here is the original project’s rewards concept.')}
<div class="trio">${items.map(i=>`<article class="reward-card ${i.style}"><span style="font-size:37px">${i.icon}</span><h3>${i.title}</h3><p>${i.subtitle}</p><ul>${i.benefits.map(b=>`<li>${b}</li>`).join('')}</ul></article>`).join('')}</div>
<section class="card" style="margin-top:26px"><h2 style="text-align:center">🏆 Achievement Milestones</h2><div class="achieve-grid">${[['⭐','7-Day Warrior','First week strong!'],['🏆','30-Day Champion','Habit forming level!'],['💯','50-Day Legend','Consistency master!'],['💪','XP Master','300+ total XP!']].map(a=>`<div class="achievement"><div class="icon">${a[0]}</div><strong>${a[1]}</strong><small>${a[2]}</small></div>`).join('')}</div></section>
<div class="big-cta"><span style="font-size:42px">🚀</span><h2>Ready to Earn XP?</h2><p>Try logging a habit and watch the sample leaderboard change.</p><a class="button" href="#/log">Start Daily Log</a><a class="button" href="#/leaderboard">View Leaderboard</a></div></div>`}
function route(){const id=(location.hash||'#/').replace(/^#\/?/,'').split('/')[0]||'home';const key=id==='home'?'home':id;let output;
switch(key){case 'home':output=home();break;case 'join':output=join();break;case 'log':output=log();break;case 'leaderboard':output=leaderboard();break;case 'community':output=community();break;case 'rewards':output=rewards();break;default:output=`<div class="shell page">${lead('Page not found','This route is not part of the archived demo.')}<a class="button primary" href="#/">Back to home</a></div>`}
ROOT.innerHTML=output;
document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
document.getElementById('nav-links').classList.remove('open');document.getElementById('menu-button').setAttribute('aria-expanded','false');
if(!route.initial){window.scrollTo(0,0)}route.initial=false;
}
async function addLog(form){const f=new FormData(form),memberId=String(f.get('member')||''),habit=String(f.get('habit')||''),quantity=Number(f.get('quantity'));
if(!state.members.some(m=>m.id===memberId)||!Object.hasOwn(emojis,habit)||!Number.isFinite(quantity)||quantity<=0||quantity>100000){notify('Please enter a valid member, habit, and quantity.');return}
let photo='';const file=f.get('photo');if(file instanceof File&&file.size){if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>600000){notify('Use a JPG, PNG or WebP image under 600 KB.');return}
photo=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(String(r.result));r.onerror=reject;r.readAsDataURL(file)}).catch(()=>{notify('Image could not be read.');return''})}
const xp=habit==='hydration'?quantity*5:habit==='steps'?Math.floor(quantity/1000)*5:habit==='workout'?quantity*20:quantity>=7?10:0;
const m=state.members.find(m=>m.id===memberId);const old=JSON.parse(JSON.stringify(state));if(m.last!==today()){m.streak=m.last===yday()?m.streak+1:1;m.best=Math.max(m.best,m.streak)}m.last=today();m.xp+=xp;
state.selected=memberId;state.logs.push({id:String(Date.now()),memberId,date:today(),habit,quantity,xp,photo});
if(!save()){state=old;notify('Browser storage is full. Try a smaller image or reset sample data.');return}
route();notify(`Habit logged! +${xp} XP earned 🎉`)}
ROOT.addEventListener('submit',async e=>{e.preventDefault();if(e.target.id==='join-form'){const field=e.target.elements.name;const name=String(field.value).trim().replace(/\s+/g,' ');if(name.length<2||name.length>36){notify('Name must be between 2 and 36 characters.');return}
const id='u'+Date.now();state.members.push({id,name,xp:0,streak:0,best:0,last:'',demo:false});state.selected=id;if(save()){location.hash='#/log';notify(`Welcome, ${name}! 🎉`)}else{state.members.pop();notify('Could not save profile on this device')}}else if(e.target.id==='log-form'){await addLog(e.target)}});
ROOT.addEventListener('click',e=>{const btn=e.target.closest('[data-select]');if(btn){state.selected=btn.dataset.select;save();location.hash='#/log';notify(`Welcome, ${state.members.find(m=>m.id===btn.dataset.select)?.name||'friend'}! 👋`)}});
document.getElementById('reset-demo').addEventListener('click',()=>{if(confirm('Reset local demo progress to the three sample profiles?')){state=sample();save();route();notify('Sample data restored.')}});
document.getElementById('menu-button').addEventListener('click',()=>{const m=document.getElementById('nav-links');m.classList.toggle('open');document.getElementById('menu-button').setAttribute('aria-expanded',String(m.classList.contains('open')))});
window.addEventListener('hashchange',route);document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.getElementById('nav-links').classList.remove('open');document.getElementById('menu-button').setAttribute('aria-expanded','false')}});
route.initial=true;route();
})();
