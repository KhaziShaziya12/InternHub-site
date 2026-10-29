/* Router/render function and app start. */
function render(){const me=D.users.find(u=>u.id===D.me);
  if(!me){$("#nav").innerHTML="";$("#who").innerHTML="";$("#main").innerHTML=auth();return}
  $("#nav").innerHTML=NAV.map(n=>`<button class="${view===n[0]?"on":""}" data-go="${n[0]}">${n[1]}</button>`).join("");
  $("#who").innerHTML=`<button class="avatar ${popOpen||view==="profile"?"on":""}" data-pop title="${esc(me.name)}" aria-label="My profile" aria-expanded="${popOpen}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg></button><button class="btn btn-sm btn-outline-secondary" data-logout>Log out</button>${popOpen?popPanel(me):""}`;
  $("#main").innerHTML=({home,jobs,register,students,apps,apply:applyForm,profile})[view]()}
render();init();
