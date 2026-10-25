// Update Contact Info
P.contact=function(){var u=U();return '<h2>Update Contact Info</h2><form data-f="contact" class="form" novalidate>'+field('First Name','fn',u.first)+field('Last Name','ln',u.last)+field('Street Address','st',u.street)+field('City','ct',u.city)+field('State','sa',u.state)+field('ZIP Code','zp',u.zip)+field('Phone Number','ph',u.phone)+'<div class="full"><button class="btn">Update Profile</button></div></form>'+S.out};
F.contact=function(f){var e=[];
 if(!f.fn.value.trim()||!f.ln.value.trim())e.push('First and last name are required.');
 if(!f.st.value.trim()||!f.ct.value.trim()||!f.sa.value.trim())e.push('Street address, city and state are required.');
 if(!/^\d{6}$/.test(f.zp.value.trim()))e.push('ZIP code must be 6 digits.');
 if(!/^\d{10}$/.test(f.ph.value.trim()))e.push('Phone number must be 10 digits.');
 if(e.length){S.out=M('er',e.join('<br>'));return render()}
 var u=U();u.first=f.fn.value.trim();u.last=f.ln.value.trim();u.street=f.st.value.trim();u.city=f.ct.value.trim();u.state=f.sa.value.trim();u.zip=f.zp.value.trim();u.phone=f.ph.value.trim();save();
 S.out=M('ok','<b>Profile Updated.</b> Your contact information was saved successfully.');render();$('#who').textContent='Signed in: '+u.first+' '+u.last};
