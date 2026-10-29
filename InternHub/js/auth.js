/* Login and sign-up page, password hashing and its submit handler. */
function auth(){const su=authMode==="signup";
  return `<div class="auth"><div class="auth-side"><h1>Your internship search, in one place.</h1><p>Create an account to register students, apply to openings and follow every decision.</p></div>
  <form class="auth-form" id="${su?"sf":"lf"}" novalidate><div class="nav mb-3"><button type="button" class="${su?"":"on"}" data-auth="login">Log in</button><button type="button" class="${su?"on":""}" data-auth="signup">Sign up</button></div>
  <div id="aerr"></div>
  ${su?'<div class="mb-3"><label>Full name</label><input class="form-control" name="name" autocomplete="name"></div>':""}
  <div class="mb-3"><label>Email</label><input class="form-control" type="email" name="email" autocomplete="email"></div>
  <div class="mb-3"><label>Password${su?" (8+ characters)":""}</label><div class="d-flex gap-2"><input class="form-control" type="password" name="pw" autocomplete="${su?"new-password":"current-password"}"><button type="button" class="btn btn-outline-secondary" data-eye>Show</button></div></div>
  ${su?'<div class="mb-3"><label>Confirm password</label><input class="form-control" type="password" name="pw2" autocomplete="new-password"></div>':""}
  <button class="btn btn-primary" style="width:100%">${su?"Create account":"Log in"}</button>
  <p class="small text-muted" style="margin:12px 0 0">${su?"Already have an account?":"New to InternHub?"} <a href="#" data-auth="${su?"login":"signup"}">${su?"Log in":"Create an account"}</a></p></form></div>`}
async function hash(salt,pw){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(salt+pw));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
const aerr=m=>{$("#aerr").innerHTML=`<div class="alert alert-danger"><span>${esc(m)}</span></div>`};
document.addEventListener("submit",async e=>{const f=e.target;if(f.id!=="lf"&&f.id!=="sf")return;
  const email=f.email.value.trim().toLowerCase(),pw=f.pw.value;
  if(!/^\S+@\S+\.\S+$/.test(email))return aerr("Enter a valid email address.");
  if(f.id==="sf"){const name=f.name.value.trim();
    if(!name)return aerr("Enter your full name.");
    if(pw.length<8)return aerr("Use a password with at least 8 characters.");
    if(pw!==f.pw2.value)return aerr("The passwords don’t match.");
    if(D.users.some(u=>u.email===email))return aerr("An account with that email already exists. Log in instead.");
    const salt=Math.random().toString(36).slice(2)+Date.now().toString(36),u={id:D.uid++,name,email,salt,hash:await hash(salt,pw)};
    D.users.push(u);D.me=u.id;save();view="home";render();flash("Welcome, "+name+". Your account is ready.")}
  else{const u=D.users.find(x=>x.email===email);
    if(!u||await hash(u.salt,pw)!==u.hash)return aerr("Incorrect email or password.");
    D.me=u.id;save();view="home";render();flash("Welcome back, "+u.name+".")}});
