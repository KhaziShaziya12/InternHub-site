/* App state, helpers, and loading/saving (account storage + browser copy). */
let D={students:[],apps:[],sid:1,aid:1,users:[],uid:1,me:null},authMode="login",pending=null,view="home",editId=null,applyJob=null,save=()=>{};
const $=s=>document.querySelector(s),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const co=id=>COMPANIES.find(c=>c.id===id),job=id=>INTERNSHIPS.find(j=>j.id===id),stu=id=>D.students.find(s=>s.id===id),today=()=>new Date().toISOString().slice(0,10);
function flash(m,c="success"){$("#flash").innerHTML=`<div class="alert alert-${c}"><span>${esc(m)}</span><button onclick="this.parentNode.remove()" aria-label="Dismiss">✕</button></div>`;clearTimeout(window._f);window._f=setTimeout(()=>$("#flash").innerHTML="",3500)}
async function init(){let remote=null;
  try{const u=await claude.use("user"),id=u&&await u.id(),db=await claude.use("db");if(db&&id)remote=db.doc("data/users/"+id+"/state")}catch(e){}
  let rd=null,ld=null;try{if(remote){const x=await remote.get();if(x.exists)rd=x.data()}}catch(e){}
  try{ld=JSON.parse(localStorage.getItem("ih2")||"null")}catch(e){}
  const best=[rd,ld].filter(Boolean).sort((a,b)=>(b.ts||0)-(a.ts||0))[0];if(best)D=Object.assign(D,best);
  save=()=>{D.ts=Date.now();const c=JSON.parse(JSON.stringify(D));try{localStorage.setItem("ih2",JSON.stringify(c))}catch(e){}
    if(remote)remote.set(c).catch(()=>flash("Couldn’t sync to your account. Your changes are still saved in this browser.","info"))};
  $("#note").textContent=remote?"Preview mode: records are saved to your account and this browser.":"Preview mode: records are saved in this browser only.";
  clean();render()}
function clean(){D.students=(D.students||[]).filter(x=>Number.isInteger(x.id));D.users=D.users||[];
  D.apps=(D.apps||[]).filter(a=>Number.isInteger(a.id)&&Number.isInteger(a.sid)&&Number.isInteger(a.jid)&&job(a.jid)&&stu(a.sid));
  D.aid=Math.max(D.aid||1,...D.apps.map(a=>a.id+1));D.sid=Math.max(D.sid||1,...D.students.map(x=>x.id+1));save()}
