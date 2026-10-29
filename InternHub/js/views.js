/* Page views: home, internships, registration, students, applications and the apply form. */
let ask=null,popOpen=false;
const delBtn=(key,attr,id)=>ask===key?`<button class="btn btn-sm btn-danger" ${attr}="${id}">Confirm delete</button> <button class="btn btn-sm btn-outline-secondary" data-cancel>Cancel</button>`:`<button class="btn btn-sm btn-outline-danger" ${attr}="${id}">Delete</button>`;
const NAV=[["home","Home"],["jobs","Internships"],["register","Register"],["students","Students"],["apps","Applications"]];
const go=v=>{ask=null;popOpen=false;view=v;if(v!=="register")editId=null;render();scrollTo(0,0)};
const stat=(n,l)=>`<div class="col-6 col-md-3"><div class="card stat"><b>${n}</b><span class="text-muted small">${l}</span></div></div>`;
function home(){const acc=D.apps.filter(a=>a.status==="Accepted").length;
  return `<section class="hero"><h1>Find your first internship. Track every application.</h1>
  <p>InternHub connects students with companies hiring interns. Register once, browse openings with their eligibility criteria, apply in a click, and see each decision as it arrives.</p>
  <div class="d-flex gap-2 flex-wrap"><button class="btn btn-light btn-lg" data-go="jobs">Browse internships</button><button class="btn btn-outline-light btn-lg" data-go="register">Register as a student</button></div></section>
  <div class="row mb-4">${stat(INTERNSHIPS.length,"Open internships")}${stat(COMPANIES.length,"Hiring companies")}${stat(D.students.length,"Registered students")}${stat(D.apps.length,"Applications")}</div>
  <div class="row"><div class="col-md-4"><div class="card card-body h-100"><b>1. Register</b><p class="small text-muted mb-1">Add your department and skills so companies know who you are.</p></div></div>
  <div class="col-md-4"><div class="card card-body h-100"><b>2. Apply</b><p class="small text-muted mb-1">Check eligibility on each listing, then apply as a registered student.</p></div></div>
  <div class="col-md-4"><div class="card card-body h-100"><b>3. Follow the decision</b><p class="small text-muted mb-1">${acc?acc+" application"+(acc>1?"s":"")+" accepted so far.":"Each application moves from Pending to Accepted or Rejected."}</p></div></div></div>`}
function jobs(){const me=D.users.find(u=>u.id===D.me),own=D.students.find(s=>s.email===me.email);return `<h2 class="mb-3">Internships</h2><div class="row">${INTERNSHIPS.map(j=>{const c=co(j.cid),n=D.apps.filter(a=>a.jid===j.id).length,ap=own&&D.apps.find(a=>a.sid===own.id&&a.jid===j.id);return `<div class="col-md-6 col-lg-6"><div class="card h-100"><div class="card-body">
  <h3 class="card-title">${esc(j.title)}</h3><div class="text-muted small mb-2">${esc(c.name)} (${esc(c.industry)})</div>
  <p class="flex-grow-1 mb-2">${esc(j.desc)}</p><div class="mb-2"><span class="badge b-p">${esc(j.loc)}</span><span class="badge b-lt">Eligibility: ${esc(j.elig)}</span></div>
  <div class="d-flex gap-2 align-items-center">${ap?`<span class="badge ${SC[ap.status]}">Applied: ${ap.status}</span>`:`<button class="btn btn-primary btn-sm" data-apply="${j.id}">Apply</button>`}<span class="small text-muted">${n} applicant${n===1?"":"s"}</span></div></div></div></div>`}).join("")}</div>`}
function register(){const me=D.users.find(u=>u.id===D.me),own=D.students.some(x=>x.email===me.email),s=editId?stu(editId):(own?{}:{name:me.name,email:me.email});const v=k=>esc(s[k]||"");
  return `<h2 class="mb-3">${editId?"Edit student":"Student registration"}</h2><form id="rf" class="card card-body" style="max-width:640px"><div class="row mb-3">
  <div class="col-md-6"><label>Full name</label><input class="form-control" name="name" value="${v("name")}" required></div>
  <div class="col-md-6"><label>Email</label><input class="form-control" type="email" name="email" value="${v("email")}" required></div>
  <div class="col-md-6"><label>Phone number</label><input class="form-control" name="phone" value="${v("phone")}" pattern="[0-9+ \\-]{7,15}" title="7 to 15 digits" required></div>
  <div class="col-md-6"><label>Department</label><select class="form-select" name="dept">${DEPTS.map(d=>`<option ${s.dept===d?"selected":""}>${d}</option>`).join("")}</select></div>
  <div style="grid-column:1/-1"><label>Skills (separate with commas)</label><input class="form-control" name="skills" value="${v("skills")}" placeholder="Python, SQL, Figma"></div></div>
  <div class="d-flex gap-2"><button class="btn btn-primary">${editId?"Save changes":"Register"}</button>${editId?'<button type="button" class="btn btn-outline-secondary" data-go="students">Cancel</button>':""}</div></form>`}
function students(){return `<h2 class="mb-3">Students</h2>${D.students.length?`<div class="tw"><table class="table"><tr><th>Name</th><th>Email</th><th>Phone</th><th>Department</th><th>Skills</th><th></th></tr>
  ${D.students.map(s=>`<tr><td>${esc(s.name)}</td><td>${esc(s.email)}</td><td>${esc(s.phone)}</td><td>${esc(s.dept)}</td><td>${esc(s.skills)}</td>
  <td style="white-space:nowrap"><button class="btn btn-sm btn-outline-primary" data-edit="${s.id}">Edit</button> ${delBtn("stu:"+s.id,"data-del",s.id)}</td></tr>`).join("")}</table></div>`
  :`<div class="card card-body text-center py-5"><p class="text-muted">No students yet. Register the first one to start applying.</p><div><button class="btn btn-primary" data-go="register">Register a student</button></div></div>`}`}
let openApp=null;
function apps(){const rows=D.apps.filter(a=>stu(a.sid)&&job(a.jid));
  const det=a=>a.why?`<div class="small"><div class="row"><div class="col-md-3"><b>Year</b><br>${esc(a.year)}</div><div class="col-md-3"><b>CGPA</b><br>${esc(a.cgpa)}</div><div class="col-md-3"><b>Can start</b><br>${esc(a.avail)}</div><div class="col-md-3"><b>Link</b><br>${a.link?`<a href="${esc(a.link)}" target="_blank" rel="noopener noreferrer">${esc(a.link)}</a>`:"Not provided"}</div>
  <div style="grid-column:1/-1"><b>Skills</b><br>${esc(a.skills)||"Not provided"}</div><div style="grid-column:1/-1"><b>Why this internship</b><br>${esc(a.why)}</div></div></div>`:`<span class="small text-muted">No additional details were submitted with this application.</span>`;
  return `<h2 class="mb-3">Applications</h2>${rows.length?`<div class="tw"><table class="table"><tr><th>Student</th><th>Internship</th><th>Company</th><th>Applied</th><th>Resume</th><th>Status</th><th></th></tr>
  ${rows.map(a=>{const s=stu(a.sid),j=job(a.jid);return `<tr><td>${esc(s.name)}</td><td>${esc(j.title)}</td><td>${esc(co(j.cid).name)}</td><td>${a.date}</td>
  <td>${a.resume?esc(a.resume.name)+` <span class="text-muted small">(${Math.max(1,Math.round(a.resume.size/1024))} KB)</span>`:"Not provided"}</td>
  <td><span class="badge ${SC[a.status]}">${a.status}</span> <select class="form-select form-select-sm" style="width:auto;display:inline-block" data-st="${a.id}">${STATUS.map(x=>`<option ${a.status===x?"selected":""}>${x}</option>`).join("")}</select></td>
  <td style="white-space:nowrap"><button class="btn btn-sm btn-outline-primary" data-view="${a.id}">${openApp===a.id?"Hide":"Details"}</button> ${delBtn("app:"+a.id,"data-delapp",a.id)}</td></tr>
  ${openApp===a.id?`<tr><td colspan="7">${det(a)}</td></tr>`:""}`}).join("")}</table></div>`
  :`<div class="card card-body text-center py-5"><p class="text-muted">No applications yet. Pick an internship and apply.</p><div><button class="btn btn-primary" data-go="jobs">Browse internships</button></div></div>`}`}
const yearOpts=sel=>["1st year","2nd year","3rd year","Final year","Postgraduate"].map(y=>`<option ${sel===y?"selected":""}>${y}</option>`).join("");
function applyForm(){const j=job(applyJob),c=co(j.cid),me=D.users.find(u=>u.id===D.me),s=D.students.find(x=>x.email===me.email)||{},pr=me.profile||{},v=k=>esc(pr[k]??s[k]??"");
  return `<button class="btn btn-sm btn-outline-secondary mb-3" data-go="jobs">Back to internships</button>
  <div class="card card-body mb-3"><h2 class="card-title">Apply for ${esc(j.title)}</h2><div class="text-muted small">${esc(c.name)} (${esc(c.industry)}), ${esc(j.loc)}</div><div style="margin-top:8px"><span class="badge b-lt">Eligibility: ${esc(j.elig)}</span></div></div>
  <form id="af" class="card card-body" style="max-width:720px" novalidate><div id="aferr"></div><div class="row mb-3">
  <b style="grid-column:1/-1">Personal details</b>
  <div class="col-md-6"><label>Full name</label><input class="form-control" name="name" value="${esc(me.name)}"></div>
  <div class="col-md-6"><label>Email (from your account)</label><input class="form-control" name="email" value="${esc(me.email)}" readonly></div>
  <div class="col-md-6"><label>Phone number</label><input class="form-control" name="phone" value="${v("phone")}" placeholder="+91 98765 43210"></div>
  <b style="grid-column:1/-1;margin-top:8px">Education</b>
  <div class="col-md-6"><label>Department</label><select class="form-select" name="dept">${DEPTS.map(d=>`<option ${(pr.dept||s.dept)===d?"selected":""}>${d}</option>`).join("")}</select></div>
  <div class="col-md-6"><label>Year of study</label><select class="form-select" name="year">${yearOpts(pr.year)}</select></div>
  <div class="col-md-6"><label>CGPA (out of 10)</label><input class="form-control" name="cgpa" type="number" step="0.01" min="0" max="10" value="${v("cgpa")}"></div>
  <div class="col-md-6"><label>Skills (separate with commas)</label><input class="form-control" name="skills" value="${v("skills")}" placeholder="Python, SQL, Figma"></div>
  <b style="grid-column:1/-1;margin-top:8px">About your application</b>
  <div style="grid-column:1/-1"><label>Why do you want this internship?</label><textarea class="form-control" name="why" rows="4" placeholder="Describe your interest and what you can contribute (at least 30 characters)"></textarea></div>
  <div class="col-md-6"><label>Earliest start date</label><input class="form-control" type="date" name="avail" min="${today()}"></div>
  <div class="col-md-6"><label>LinkedIn or portfolio link (optional)</label><input class="form-control" type="url" name="link" value="${v("link")}" placeholder="https://"></div>
  <div style="grid-column:1/-1"><label>Resume</label>${pr.resume?`<div class="d-flex gap-2 align-items-center flex-wrap mb-2"><span class="badge b-ok">From your profile</span><span>${esc(pr.resume.name)} <span class="text-muted small">(${Math.max(1,Math.round(pr.resume.size/1024))} KB)</span></span></div><label>Upload a different resume for this application only (optional)</label>`
   :`<label>Upload your resume (PDF, DOC or DOCX, up to 2 MB). It is also saved to your profile for future applications.</label>`}<input class="form-control" type="file" name="resume" accept=".pdf,.doc,.docx"></div>
  <label style="grid-column:1/-1;display:flex;gap:8px;align-items:flex-start;color:var(--tx)"><input type="checkbox" name="agree" style="margin-top:5px"> I confirm that the details above are correct.</label></div>
  <div class="d-flex gap-2"><button class="btn btn-primary">Submit application</button><button type="button" class="btn btn-outline-secondary" data-go="jobs">Cancel</button></div></form>`}
