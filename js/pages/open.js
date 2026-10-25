// Open New Account
P.open=function(){return '<h2>Open New Account</h2><form data-f="open" class="form" novalidate><label for="type">What type of Account would you like to open?</label><select id="type" name="type"><option>Checking</option><option>Savings</option></select><label for="from">Existing account to fund from</label><select id="from" name="from">'+opts()+'</select><p class="muted full">A minimum opening deposit of ₹1,000 is transferred from the selected account.</p><div class="full"><button class="btn">Open New Account</button></div></form>'+S.out};
F.open=function(f){var a=acc(f.from.value);
 if(!a||a.balance<1000){S.out=M('er','Insufficient balance. The funding account needs at least ₹1,000.');return render()}
 var id=String(db.nextAcct++),n={id:id,type:f.type.value,balance:0};U().accts.push(n);
 addTx(a,'Debit',1000,'Opening deposit for new account '+id);addTx(n,'Credit',1000,'Opening deposit from account '+a.id);save();
 S.out=M('ok','<b>Account Opened!</b> Congratulations, your new '+n.type+' account has been created.')+'<div class="card"><dl><dt>Your new account number</dt><dd><b>'+id+'</b></dd><dt>Opening balance</dt><dd>'+inr(1000)+'</dd><dt>Funded from</dt><dd>'+a.id+'</dd></dl></div>';render()};
