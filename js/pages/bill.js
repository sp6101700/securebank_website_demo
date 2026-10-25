// Bill Pay
P.bill=function(){var v=S.v||{};return '<h2>Bill Payment Service</h2><p>Enter payee information</p><form data-f="bill" class="form" novalidate>'+field('Payee Name','pn',v.pn)+field('Address','pa',v.pa)+field('City','pc',v.pc)+field('State','ps',v.ps,'e.g. MH')+field('ZIP Code','pz',v.pz,'6-digit PIN')+field('Phone Number','pp',v.pp,'10 digits')+field('Amount (₹)','amt',v.amt,'0.00')+'<label for="from">From account #</label><select id="from" name="from">'+opts(v.from)+'</select><div class="full"><button class="btn">Send Payment</button></div></form>'+S.out};
F.bill=function(f){var v={pn:f.pn.value,pa:f.pa.value,pc:f.pc.value,ps:f.ps.value,pz:f.pz.value,pp:f.pp.value,amt:f.amt.value,from:f.from.value},e=[],amt=money(v.amt),a=acc(v.from);
 if(!v.pn.trim())e.push('Payee name is required.');if(!v.pa.trim())e.push('Address is required.');if(!v.pc.trim())e.push('City is required.');
 if(!/^[A-Za-z]{2,}$/.test(v.ps.trim()))e.push('Enter a valid state (letters only).');
 if(!/^\d{6}$/.test(v.pz.trim()))e.push('ZIP code must be 6 digits.');
 if(!/^\d{10}$/.test(v.pp.trim()))e.push('Phone number must be 10 digits.');
 if(!amt)e.push('Enter a valid amount greater than zero.');else if(a.balance<amt)e.push('Insufficient funds in account '+a.id+'.');
 S.v=v;
 if(e.length){S.out=M('er',e.join('<br>'));return render()}
 var t=addTx(a,'Debit',amt,'Bill payment to '+v.pn.trim());save();S.v=null;
 S.out=M('ok','<b>Bill Payment Complete.</b> '+inr(amt)+' was paid to '+esc(v.pn.trim())+' from account '+a.id+'.')+'<div class="card"><dl><dt>Transaction ID</dt><dd>'+t.id+'</dd><dt>Payee</dt><dd>'+esc(v.pn)+', '+esc(v.pa)+', '+esc(v.pc)+', '+esc(v.ps)+' '+esc(v.pz)+'</dd><dt>Phone</dt><dd>'+esc(v.pp)+'</dd><dt>Amount</dt><dd>'+inr(amt)+'</dd><dt>Date</dt><dd>'+fmtD(t.date)+'</dd><dt>New balance</dt><dd>'+inr(a.balance)+'</dd></dl></div>';render()};
