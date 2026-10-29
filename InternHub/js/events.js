/* Click, change, keyboard and form-submit handlers. */
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&popOpen){popOpen=false;render()}});
document.addEventListener("click",e=>{const t=e.target.closest("[data-go],[data-apply],[data-edit],[data-del],[data-delapp],[data-pop],[data-rmresume],[data-view],[data-cancel],[data-auth],[data-logout],[data-eye]");const outside=popOpen&&!e.target.closest("#who");if(outside)popOpen=false;if(!t){if(outside)render();return}const d=t.dataset;
  if("pop"in d){popOpen=!popOpen;render();return}
  if(d.auth){e.preventDefault();authMode=d.auth;render();return}
  if("logout"in d){popOpen=false;D.me=null;save();view="home";authMode="login";render();flash("You have been logged out.","info");return}
  if("eye"in d){const i=t.closest("div").querySelector("input");i.type=i.type==="password"?"text":"password";t.textContent=i.type==="password"?"Show":"Hide";return}
  if(d.go)go(d.go);
  if(d.edit){editId=+d.edit;go("register");editId=+d.edit;render()}
  if("rmresume"in d){const m=D.users.find(u=>u.id===D.me);if(m.profile)m.profile.resume=null;save();render();flash("Saved resume removed.","info");return}
  if(d.view){openApp=openApp===+d.view?null:+d.view;render();return}
  if("cancel"in d){ask=null;render();return}
  if(d.del){if(ask!=="stu:"+d.del){ask="stu:"+d.del;render();return}
    ask=null;D.students=D.students.filter(x=>x.id!==+d.del);D.apps=D.apps.filter(a=>a.sid!==+d.del);save();flash("Student deleted along with their applications.","info");render()}
  if(d.delapp){if(ask!=="app:"+d.delapp){ask="app:"+d.delapp;render();return}
    ask=null;D.apps=D.apps.filter(a=>a.id!==+d.delapp);save();flash("Application deleted.","info");render()}
  if(d.apply){const me=D.users.find(u=>u.id===D.me),own=D.students.find(x=>x.email===me.email),jid=+d.apply;
    if(own&&D.apps.some(a=>a.sid===own.id&&a.jid===jid)){flash("You have already applied to this internship.","info");return}
    applyJob=jid;go("apply")}});
document.addEventListener("change",e=>{const id=e.target.dataset.st;if(id){D.apps.find(a=>a.id===+id).status=e.target.value;save();flash("Status updated.");render()}});
document.addEventListener("submit",e=>{e.preventDefault();
  if(e.target.id==="rf"){const f=e.target,o={name:f.name.value.trim(),email:f.email.value.trim().toLowerCase(),phone:f.phone.value.trim(),dept:f.dept.value,skills:f.skills.value.split(",").map(x=>x.trim()).filter(Boolean).join(", ")};
    if(D.students.some(s=>s.email===o.email&&s.id!==editId)){flash("That email is already registered.","danger");return}
    if(editId){Object.assign(stu(editId),o);flash("Student updated.")}else{const ns={id:D.sid++,...o};D.students.push(ns);flash("Student registered. You can now apply for internships.");
      if(pending){D.apps.unshift({id:D.aid++,sid:ns.id,jid:pending,date:today(),status:"Pending"});pending=null;flash("Profile saved and application submitted. Status: Pending.");save();go("apps");return}}
    save();go(editId?"students":"jobs")}});
document.addEventListener("submit",e=>{const f=e.target;if(f.id!=="pf")return;
  const err=m=>{$("#pferr").innerHTML=`<div class="alert alert-danger"><span>${esc(m)}</span></div>`;scrollTo(0,0)},g=n=>f[n].value.trim(),me=D.users.find(u=>u.id===D.me),file=f.resume.files[0],cg=g("cgpa")===""?"":parseFloat(g("cgpa"));
  if(!g("name"))return err("Enter your full name.");
  if(g("phone")&&!/^[0-9+ \-]{7,15}$/.test(g("phone")))return err("Enter a valid phone number with 7 to 15 digits.");
  if(cg!==""&&!(cg>=0&&cg<=10))return err("Enter your CGPA as a number between 0 and 10.");
  if(file&&!/\.(pdf|docx?)$/i.test(file.name))return err("The resume must be a PDF, DOC or DOCX file.");
  if(file&&file.size>2*1024*1024)return err("The resume must be 2 MB or smaller.");
  me.name=g("name");me.profile={phone:g("phone"),dept:f.dept.value,year:f.year.value,cgpa:cg,skills:g("skills"),link:g("link"),resume:file?{name:file.name,size:file.size,date:today()}:(me.profile||{}).resume};
  const st=D.students.find(x=>x.email===me.email);if(st){st.name=me.name;if(g("phone"))st.phone=g("phone");st.dept=f.dept.value;st.skills=g("skills")}
  save();render();flash("Profile saved."+(file?" Your resume will be attached to future applications.":""))});
document.addEventListener("submit",e=>{const f=e.target;if(f.id!=="af")return;
  const err=m=>{$("#aferr").innerHTML=`<div class="alert alert-danger"><span>${esc(m)}</span></div>`;scrollTo(0,0)},g=n=>f[n].value.trim(),file=f.resume.files[0],cg=parseFloat(g("cgpa"));
  if(!g("name"))return err("Enter your full name.");
  if(!/^[0-9+ \-]{7,15}$/.test(g("phone")))return err("Enter a valid phone number with 7 to 15 digits.");
  if(!(cg>=0&&cg<=10))return err("Enter your CGPA as a number between 0 and 10.");
  if(g("why").length<30)return err("Tell the company why you want this internship (at least 30 characters).");
  if(!g("avail"))return err("Choose the earliest date you can start.");
  const saved=(D.users.find(u=>u.id===D.me).profile||{}).resume;
  if(!file&&!saved)return err("Upload your resume, or save one in your profile.");
  if(file&&!/\.(pdf|docx?)$/i.test(file.name))return err("The resume must be a PDF, DOC or DOCX file.");
  if(file&&file.size>2*1024*1024)return err("The resume must be 2 MB or smaller.");
  if(!f.agree.checked)return err("Confirm that your details are correct.");
  const me=D.users.find(u=>u.id===D.me);let st=D.students.find(x=>x.email===me.email);
  me.profile=Object.assign(me.profile||{},{phone:g("phone"),dept:f.dept.value,year:f.year.value,cgpa:cg,skills:g("skills"),link:g("link")});
  if(file&&!saved)me.profile.resume={name:file.name,size:file.size,date:today()};
  if(!st){st={id:D.sid++,name:g("name"),email:me.email,phone:g("phone"),dept:f.dept.value,skills:g("skills")};D.students.push(st)}
  if(D.apps.some(a=>a.sid===st.id&&a.jid===applyJob)){flash("You have already applied to this internship.","info");go("jobs");return}
  D.apps.unshift({id:D.aid++,sid:st.id,jid:applyJob,date:today(),status:"Pending",year:f.year.value,cgpa:cg,skills:g("skills"),avail:g("avail"),link:g("link"),why:g("why"),resume:file?{name:file.name,size:file.size}:{name:saved.name,size:saved.size}});
  save();flash("Application submitted to "+co(job(applyJob).cid).name+". Status: Pending.");go("apps")});
