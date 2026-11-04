/* Maynard K. Nay-osan portfolio — content, navigation, theme and pointer effects */

/* ===== Edit your content here ===== */
/* ===== Edit your content here ===== */
const CFG_EMAIL="nayosanmaynard184@gmail.com",CFG_GH="https://github.com/sankura-san",CFG_PHONE="09272977135";
const CFG={
first:"Maynard K.",last:"Nay-osan",role:"Aspiring Software Developer",
sections:[
{id:"home",label:"home",html:`<h2>Learning, building, and exploring the possibilities of technology.</h2><p>I’m <b>Maynard K. Nay-osan</b>, a first-year Computer Science student at the University of the Cordilleras. I’m developing my knowledge of programming and software development, with experience in Java and Python through coursework and personal exercises.</p><p>I want to explore different areas of technology, sharpen my problem-solving, and build practical projects as I continue my journey in Computer Science.</p><div class="tags"><span>BS Computer Science · 1st Year</span><span>University of the Cordilleras</span><span>Sadanga, Mountain Province</span></div><div class="tags"><span>Open to learning opportunities and collaborations</span></div><div class="btns"><a class="btn pri" href="#contact">Contact me</a><a class="btn" href="${CFG_GH}" target="_blank" rel="noopener">GitHub profile</a></div>`},
{id:"about",label:"about",html:`<h2>A little about me</h2><p>I’m a Computer Science student who enjoys learning how technology works and how software is built. Outside of academics, I enjoy creative activities such as drawing and painting, and strategy games that challenge my thinking.</p><div class="paper"><div class="ph">Personal details</div><dl class="dl"><div><dt>Full name</dt><dd>Maynard K. Nay-osan</dd></div><div><dt>Status</dt><dd>College student</dd></div><div><dt>Program</dt><dd>BS Computer Science</dd></div><div><dt>Year level</dt><dd>1st Year</dd></div><div><dt>University</dt><dd>University of the Cordilleras</dd></div><div><dt>Address</dt><dd>Sadanga, Mountain Province, Philippines</dd></div><div><dt>Email</dt><dd>${CFG_EMAIL}</dd></div><div><dt>Phone</dt><dd>${CFG_PHONE}</dd></div></dl><div class="split"><div><dt>Hobbies</dt><div class="tags"><span>Drawing and painting</span><span>Chess and strategy games</span><span>Reading manhwa</span><span>Watching anime</span></div></div><div><dt>Interests</dt><div class="tags"><span>Programming</span><span>Software development</span><span>Web development</span><span>Technology</span><span>Problem-solving</span></div></div></div></div>`},
{id:"education",label:"education",html:`<h2>Educational attainment</h2><p>My education has built my interest in technology, problem-solving and continuous learning. I’m now pursuing a Bachelor of Science in Computer Science, building my foundation in programming and computing.</p><div class="rows"><div class="row"><div><h3>College</h3><small>Currently studying</small></div><p><b>University of the Cordilleras</b><br>Bachelor of Science in Computer Science</p></div><div class="row"><div><h3>Senior high school</h3><small>Completed Grade 12</small></div><p><b>Sadanga National Technical Vocational and Skills Training High School</b></p></div><div class="row"><div><h3>Junior high school</h3><small>Completed</small></div><p><b>Sadanga National Technical Vocational and Skills Training High School</b></p></div><div class="row"><div><h3>Elementary</h3><small>Completed</small></div><p><b>Sadanga Central School</b></p></div></div>`},
{id:"skills",label:"skills",html:`<h2>Skills &amp; interests</h2><p>I’m building my programming skills through coursework, coding exercises and independent practice. My focus right now is strengthening my fundamentals in Java and Python while exploring other areas of software development.</p><div class="rows"><div class="row"><div><h3>Languages</h3></div><div class="tags" style="margin:0"><span>Java</span><span>Python</span></div></div><div class="row"><div><h3>Tools</h3></div><div class="tags" style="margin:0"><span>Git</span><span>GitHub</span></div></div><div class="row"><div><h3>Fundamentals</h3></div><p>Variables, data types, conditional statements, loops and functions.</p></div><div class="row"><div><h3>Other knowledge</h3></div><p>Basic problem-solving, algorithms and programming logic.</p></div><div class="row"><div><h3>Currently learning</h3></div><div class="tags" style="margin:0"><span>Object-oriented programming</span><span>Data structures</span><span>Web development</span></div></div></div>`},
{id:"projects",label:"projects",html:`<h2>Projects</h2><div class="soon"><span>Coming Soon</span><p>Projects and coding activities will be added here as I continue developing my programming skills and gaining experience in Computer Science.</p></div>`},
{id:"contact",label:"contact",html:`<h2>Let’s get in touch</h2><p>Have a question, project idea or opportunity to collaborate? Feel free to contact me through the details below.</p><div class="rows"><div class="row"><div><h3>Email</h3></div><p><a href="mailto:${CFG_EMAIL}">${CFG_EMAIL}</a></p></div><div class="row"><div><h3>GitHub</h3></div><p><a href="${CFG_GH}" target="_blank" rel="noopener">github.com/sankura-san</a></p></div><div class="row"><div><h3>Phone</h3></div><p><a href="tel:${CFG_PHONE}">${CFG_PHONE}</a></p></div><div class="row"><div><h3>Location</h3></div><p>Mountain Province, Philippines</p></div></div><div class="btns"><a class="btn pri" href="${CFG_GH}" target="_blank" rel="noopener">View my GitHub</a><a class="btn" href="mailto:${CFG_EMAIL}">Send an email</a></div>`}
]};
/* ===== UI ===== */
const $=s=>document.querySelector(s),S=CFG.sections,RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
const pad=n=>String(n+1).padStart(2,"0");
$("#name").innerHTML=CFG.first+" <em>"+CFG.last+"</em>";$("#role").textContent=CFG.role;
$("#nav").innerHTML=S.map((s,i)=>`<a href="#${s.id}" data-i="${i}"><span class="r"><span>${pad(i)} // ${s.label}</span><span>${pad(i)} // ${s.label}</span></span></a>`).join("");
let cur=-1,seq=0;
function paint(i){$("#view").innerHTML=S[i].html;$("#pg").textContent=pad(i)+" / "+pad(S.length-1);document.querySelectorAll("#nav a").forEach((a,k)=>k===i?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));$("#next .lbl").textContent=i===S.length-1?"Back to start":"Continue";$("#panel").scrollTop=0}
async function go(i){if(i===cur)return;const dir=i>cur?1:-1,el=$("#panel"),tok=++seq;
if(cur>=0&&!RM){const a=el.animate([{opacity:1,transform:"none"},{opacity:0,transform:`translateX(${-24*dir}px)`}],{duration:220,easing:"ease-in",fill:"forwards"});await a.finished;if(tok!==seq){a.cancel();return}cur=i;paint(i);a.cancel();el.animate([{opacity:0,transform:`translateX(${24*dir}px)`},{opacity:1,transform:"none"}],{duration:420,easing:"cubic-bezier(.2,.7,.2,1)"})}
else{cur=i;paint(i)}}
function fromHash(){const k=S.findIndex(s=>"#"+s.id===location.hash);go(k<0?0:k)}
addEventListener("hashchange",fromHash);fromHash();
const step=d=>{location.hash=S[(Math.max(cur,0)+d+S.length)%S.length].id};
$("#next").onclick=()=>step(1);
addEventListener("keydown",e=>{if(e.target.closest&&e.target.closest("a,button")&&e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;if(e.key==="ArrowRight")step(1);if(e.key==="ArrowLeft")step(-1)});

/* ===== Theme: circular reveal from the toggle; the smoke recolours with it ===== */
const root=document.documentElement;
let theme="dark";try{theme=localStorage.getItem("mn-theme")||"dark"}catch(e){}
function applyTheme(t){theme=t;root.dataset.theme=t;$("#tg").setAttribute("aria-label","Switch to "+(t==="dark"?"light":"dark")+" theme")}
function setTheme(t,save,o){
if(save)try{localStorage.setItem("mn-theme",t)}catch(e){}
if(!o||RM||!document.startViewTransition){applyTheme(t);Smoke.set(t==="light",!o);return}
const r=Math.hypot(Math.max(o.x,innerWidth-o.x),Math.max(o.y,innerHeight-o.y));
root.classList.add("vt");
const vt=document.startViewTransition(()=>{applyTheme(t);Smoke.set(t==="light",true)});
vt.ready.then(()=>root.animate({clipPath:[`circle(0px at ${o.x}px ${o.y}px)`,`circle(${r}px at ${o.x}px ${o.y}px)`]},{duration:950,easing:"cubic-bezier(.65,0,.35,1)",pseudoElement:"::view-transition-new(root)"})).catch(()=>{});
vt.finished.finally(()=>root.classList.remove("vt"))}
$("#tg").addEventListener("click",e=>{const b=e.currentTarget.getBoundingClientRect();setTheme(theme==="dark"?"light":"dark",true,{x:b.left+b.width/2,y:b.top+b.height/2})});
setTheme(theme,false);
/* ===== Pointer: cursor, magnetic controls, spotlight, photo parallax ===== */
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
const HOT="a,button,.row,.tags span,.soon,figure",MAG=".next,.tg,.btn,.logo";
if(fine&&!RM){
root.classList.add("has-cursor");
const cd=$("#cd"),cr=$("#cr");let x=0,y=0,rx=0,ry=0,on=false,mg=null;
addEventListener("pointermove",e=>{x=e.clientX;y=e.clientY;if(!on){on=true;rx=x;ry=y;root.classList.add("cur-on")}
cd.style.transform=`translate3d(${x}px,${y}px,0)`;
const el=e.target.closest&&e.target.closest(MAG);if(mg&&mg!==el)mg.style.transform="";mg=el;
if(el){const r=el.getBoundingClientRect();el.style.transform=`translate(${(x-r.left-r.width/2)*.25}px,${(y-r.top-r.height/2)*.35}px)`}},{passive:true});
(function tick(){rx+=(x-rx)*.17;ry+=(y-ry)*.17;cr.style.transform=`translate3d(${rx}px,${ry}px,0)`;requestAnimationFrame(tick)})();
document.addEventListener("pointerover",e=>{const h=!!(e.target.closest&&e.target.closest(HOT));cr.classList.toggle("hot",h);cd.classList.toggle("hot",h)});
addEventListener("pointerdown",()=>cr.classList.add("down"));addEventListener("pointerup",()=>cr.classList.remove("down"));
root.addEventListener("pointerleave",()=>{on=false;root.classList.remove("cur-on")});
const pn=$("#panel");
pn.addEventListener("pointermove",e=>{const r=pn.getBoundingClientRect();pn.style.setProperty("--mx",e.clientX-r.left+"px");pn.style.setProperty("--my",e.clientY-r.top+"px")});
pn.addEventListener("pointerleave",()=>{pn.style.setProperty("--mx","-999px")});
const fg=$("figure");
fg.addEventListener("pointermove",e=>{const r=fg.getBoundingClientRect();fg.style.setProperty("--px",((e.clientX-r.left)/r.width-.5)*2);fg.style.setProperty("--py",((e.clientY-r.top)/r.height-.5)*2)});
fg.addEventListener("pointerleave",()=>{fg.style.setProperty("--px",0);fg.style.setProperty("--py",0)});
}
