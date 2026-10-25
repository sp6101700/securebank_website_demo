// Transfer Funds
P.transfer=function(){return '<h2>Transfer Funds</h2><form data-f="transfer" class="form" novalidate>'+field('Amount (₹)','amt','','0.00')+'<label for="from">From account #</label><select id="from" name="from">'+opts()+'</select><label for="to">To account #</label><select id="to" name="to">'+opts(U().accts[1]&&U().accts[1].id)+'</select><div class="full"><button class="btn">Transfer</button></div></form>'+S.out};
F.transfer=function(f){var amt=money(f.amt.value),a=acc(f.from.value),b=acc(f.to.value);
 if(!amt)S.out=M('er','Enter a valid amount greater than zero (up to 2 decimals).');
 else if(a.id===b.id)S.out=M('er','From and To accounts must be different.');
 else if(a.balance<amt)S.out=M('er','Insufficient funds. Available balance in '+a.id+' is '+inr(a.balance)+'.');
 else{var t=addTx(a,'Debit',amt,'Funds transfer to '+b.id);addTx(b,'Credit',amt,'Funds transfer from '+a.id);save();
  S.out=M('ok','<b>Transfer Complete!</b>')+'<div class="card"><dl><dt>Transaction ID</dt><dd>'+t.id+'</dd><dt>Amount</dt><dd>'+inr(amt)+'</dd><dt>From</dt><dd>'+a.id+'</dd><dt>To</dt><dd>'+b.id+'</dd><dt>Date</dt><dd>'+fmtD(t.date)+'</dd><dt>New balance</dt><dd>'+inr(a.balance)+'</dd></dl></div>'}
 render()};
