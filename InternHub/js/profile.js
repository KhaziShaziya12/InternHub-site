/* Profile icon panel and the My profile page (saved details and resume). */
function popPanel(me){const p=me.profile||{},kb=r=>Math.max(1,Math.round(r.size/1024)),
  row=(l,v)=>v?`<div class="small" style="margin-bottom:6px"><span class="text-muted">${l}</span><br>${v}</div>`:"",
  has=p.phone||p.dept||p.year||(p.cgpa!==undefined&&p.cgpa!=="")||p.skills||p.link||p.resume;
  return `<div class="pop" role="dialog" aria-label="My details"><div style="font-weight:600">${esc(me.name)}</div><div class="small text-muted" style="margin-bottom:10px">${esc(me.email)}</div>
  ${has?row("Phone",esc(p.phone))+row("Department",esc(p.dept)+(p.year?", "+esc(p.year):""))+row("CGPA",p.cgpa!==""?esc(p.cgpa):"")+row("Skills",esc(p.skills))
   +row("Link",p.link?`<a href="${esc(p.link)}" target="_blank" rel="noopener noreferrer">${esc(p.link)}</a>`:"")+row("Resume",p.resume?esc(p.resume.name)+` <span class="text-muted">(${kb(p.resume)} KB)</span>`:"No resume saved yet")
   :`<p class="small text-muted">No details saved yet. Add your phone, education and resume once, and they are used for every application.</p>`}
  <button class="btn btn-sm btn-primary" data-go="profile" style="margin-top:4px">${has?"Edit profile":"Add your details"}</button></div>`}
function profile(){const me=D.users.find(u=>u.id===D.me),p=me.profile||{},v=k=>esc(p[k]??"");
  return `<h2 class="mb-3">My profile</h2><form id="pf" class="card card-body" style="max-width:720px" novalidate><div id="pferr"></div><div class="row mb-3">
  <b style="grid-column:1/-1">Personal details</b>
  <div class="col-md-6"><label>Full name</label><input class="form-control" name="name" value="${esc(me.name)}"></div>
  <div class="col-md-6"><label>Email</label><input class="form-control" value="${esc(me.email)}" readonly></div>
  <div class="col-md-6"><label>Phone number</label><input class="form-control" name="phone" value="${v("phone")}" placeholder="+91 98765 43210"></div>
  <b style="grid-column:1/-1;margin-top:8px">Education</b>
  <div class="col-md-6"><label>Department</label><select class="form-select" name="dept">${DEPTS.map(d=>`<option ${p.dept===d?"selected":""}>${d}</option>`).join("")}</select></div>
  <div class="col-md-6"><label>Year of study</label><select class="form-select" name="year">${yearOpts(p.year)}</select></div>
  <div class="col-md-6"><label>CGPA (out of 10)</label><input class="form-control" name="cgpa" type="number" step="0.01" min="0" max="10" value="${v("cgpa")}"></div>
  <div class="col-md-6"><label>Skills (separate with commas)</label><input class="form-control" name="skills" value="${v("skills")}" placeholder="Python, SQL, Figma"></div>
  <div style="grid-column:1/-1"><label>LinkedIn or portfolio link</label><input class="form-control" type="url" name="link" value="${v("link")}" placeholder="https://"></div>
  <b style="grid-column:1/-1;margin-top:8px">Resume</b>
  <div style="grid-column:1/-1">${p.resume?`<div class="d-flex gap-2 align-items-center flex-wrap mb-2"><span class="badge b-ok">Saved</span><span>${esc(p.resume.name)} <span class="text-muted small">(${Math.max(1,Math.round(p.resume.size/1024))} KB, added ${esc(p.resume.date)})</span></span><button type="button" class="btn btn-sm btn-outline-danger" data-rmresume>Remove</button></div>`:`<p class="small text-muted mb-2">No resume saved yet.</p>`}
  <label>${p.resume?"Replace your resume":"Upload your resume"} (PDF, DOC or DOCX, up to 2 MB)</label><input class="form-control" type="file" name="resume" accept=".pdf,.doc,.docx">
  <div class="small text-muted" style="margin-top:4px">Your saved resume is attached automatically when you apply, so you only upload it once.</div></div></div>
  <div><button class="btn btn-primary">Save profile</button></div></form>`}
