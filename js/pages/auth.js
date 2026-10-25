// Login + Register pages and handlers
function authView(reg){
 if(reg)return '<main><h2>Register (Demo)</h2><p class="muted">Create a demo profile. Use made-up details only.</p>'+(S.flash||'')+'<form data-f="register" class="form" novalidate>'+field('First Name','fn')+field('Last Name','ln')+field('Username','un')+field('Password','pw','','min 6 characters','password')+field('Confirm Password','pc','','','password')+'<div class="full"><button class="btn">Register</button> <button type="button" class="btn alt" data-auth="login">Back to Login</button></div></form></main>';
 return '<main><h2>Customer Login</h2>'+(S.flash||'')+'<form data-f="login" class="form" novalidate>'+field('Username','un')+field('Password','pw','','','password')+'<div class="full"><button class="btn">Log In</button></div><p class="full">Don’t have an account? <button type="button" class="lnk" data-auth="register">Register</button></p></form><div class="card muted">Demo login: username <b>demo</b>, password <b>demo123</b></div></main>'}

F.login=function(f){var u=f.un.value.trim(),p=f.pw.value;
 if(!u||!p){S.flash=M('er','Please enter both username and password.');return render()}
 if(!db.users[u]||db.users[u].password!==p){S.flash=M('er','Invalid username or password.');return render()}
 db.session=u;save();S.flash='';go('overview')};
F.register=function(f){var u=f.un.value.trim(),e=[];
 if(!f.fn.value.trim()||!f.ln.value.trim())e.push('First and last name are required.');
 if(!/^[A-Za-z0-9_]{3,20}$/.test(u))e.push('Username must be 3–20 letters, numbers or underscores.');
 else if(db.users[u])e.push('That username is already taken.');
 if(f.pw.value.length<6)e.push('Password must be at least 6 characters.');
 if(f.pw.value!==f.pc.value)e.push('Passwords do not match.');
 if(e.length){S.flash=M('er',e.join('<br>'));return render()}
 var id=String(db.nextAcct++);
 db.users[u]={password:f.pw.value,first:f.fn.value.trim(),last:f.ln.value.trim(),street:'',city:'',state:'',zip:'',phone:'',accts:[{id:id,type:'Checking',balance:5000}],tx:[{id:String(db.nextTx++),acct:id,date:today(),desc:'Welcome bonus (demo)',type:'Credit',amount:5000}]};
 save();S.page='login';S.flash=M('ok','Registration successful. Log in with your new username.');render()};
