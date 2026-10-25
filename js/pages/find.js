// Find Transactions
function fr(label,inner,kind,btn){return '<form data-f="find" data-k="'+kind+'" novalidate class="fgrp"><div class="frow"><b>'+label+'</b>'+inner+'<button class="btn">Find Transactions</button></div><div class="err" id="e-'+kind+'"></div></form>'}
P.find=function(){var u=U();return '<h2>Find Transactions</h2><div class="frow"><b><label for="facct">Select an Account:</label></b><select id="facct">'+opts(S.facct)+'</select></div>'+
 fr('Find by Transaction ID:','<input name="v" aria-label="Transaction ID" placeholder="e.g. 19004">','id')+
 fr('Find by Date:','<input name="v" aria-label="Date" placeholder="MM-DD-YYYY">','date')+
 fr('Find by Date Range:','<span>Between</span><input name="a" aria-label="Start date" placeholder="MM-DD-YYYY" style="width:140px"><span>and</span><input name="b" aria-label="End date" placeholder="MM-DD-YYYY" style="width:140px">','range')+
 fr('Find by Amount:','<input name="v" aria-label="Amount" placeholder="0.00">','amount')+
 (S.res?'<h3>Transaction Results</h3>'+(S.res.err?M('er',S.res.err):'<p class="muted">'+S.res.list.length+' result(s) for account '+S.res.acct+'</p>'+txRows(S.res.list)):'')};
F.find=function(f){var k=f.dataset.k,id=$('#facct').value,list=U().tx.filter(function(t){return t.acct===id}),err=null,out;S.facct=id;
 function v(n){return f[n].value.trim()}
 if(k==='id'){if(!v('v'))err='Enter a transaction ID.';else if(!/^\d+$/.test(v('v')))err='Transaction ID must be numeric.';else out=list.filter(function(t){return t.id===v('v')})}
 if(k==='date'){if(!v('v'))err='Enter a date.';else{var d=parseD(v('v'));if(!d)err='Invalid date. Use MM-DD-YYYY.';else out=list.filter(function(t){return t.date===d})}}
 if(k==='range'){if(!v('a')||!v('b'))err='Enter both start and end dates.';else{var a=parseD(v('a')),b=parseD(v('b'));if(!a||!b)err='Invalid date. Use MM-DD-YYYY.';else if(a>b)err='Start date must not be after end date.';else out=list.filter(function(t){return t.date>=a&&t.date<=b})}}
 if(k==='amount'){if(!v('v'))err='Enter an amount.';else{var m=money(v('v'));if(!m)err='Invalid amount. Enter a positive number.';else out=list.filter(function(t){return Math.abs(t.amount-m)<0.005})}}
 if(err){S.res={err:err,acct:id};return render()}
 S.res={list:out,acct:id};render()};
