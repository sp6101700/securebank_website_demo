// Request Loan
P.loan=function(){return '<h2>Request a Loan</h2><form data-f="loan" class="form" novalidate>'+field('Loan Amount (₹)','la','','0.00')+field('Down Payment (₹)','dp','','0.00')+'<label for="from">From account #</label><select id="from" name="from">'+opts()+'</select><p class="muted full">Demo rule: down payment ≥ 10% of the loan, and the financed amount ≤ 5× your total balance.</p><div class="full"><button class="btn">Apply Now</button></div></form>'+S.out};
F.loan=function(f){var L=money(f.la.value),D=f.dp.value.trim()===''?null:parseFloat(f.dp.value),a=acc(f.from.value),tot=U().accts.reduce(function(s,x){return s+x.balance},0);
 if(!L||D===null||isNaN(D)||D<0||D>L){S.out=M('er','Enter a valid loan amount and a down payment between 0 and the loan amount.');return render()}
 var fin=L-D,why=[];
 if(D<L*0.1)why.push('Down payment must be at least 10% of the loan ('+inr(L*0.1)+').');
 if(fin>tot*5)why.push('Financed amount exceeds 5× your total balance ('+inr(tot*5)+').');
 if(D>a.balance)why.push('Insufficient funds in account '+a.id+' for the down payment.');
 if(why.length){S.out=M('er','<b>Loan Denied.</b><br>'+why.join('<br>'))+'<div class="card"><dl><dt>Status</dt><dd>Denied</dd></dl></div>';return render()}
 var t1=D>0?addTx(a,'Debit',D,'Loan down payment'):null,t2=addTx(a,'Credit',fin,'Loan disbursement (demo)');save();
 S.out=M('ok','<b>Loan Approved!</b> Congratulations, you are eligible for this loan.')+'<div class="card"><dl><dt>Application status</dt><dd>Approved</dd><dt>Loan amount</dt><dd>'+inr(L)+'</dd><dt>Down payment</dt><dd>'+inr(D)+'</dd><dt>Amount financed</dt><dd>'+inr(fin)+'</dd><dt>Credited to</dt><dd>Account '+a.id+' (Txn '+t2.id+')</dd></dl></div>';render()};
