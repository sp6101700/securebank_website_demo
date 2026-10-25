// Accounts Overview
P.overview=function(){var u=U(),tot=0;
 var h='<h2>Accounts Overview</h2><div class="tw"><table><thead><tr><th>Account Number</th><th>Account Type</th><th class="n">Balance</th><th>Account Status</th></tr></thead><tbody>'+u.accts.map(function(a){tot+=a.balance;return '<tr><td><button class="lnk" data-acct="'+a.id+'">'+a.id+'</button></td><td>'+a.type+'</td><td class="n">'+inr(a.balance)+'</td><td>Active</td></tr>'}).join('')+'<tr><td colspan="2"><b>Total</b></td><td class="n"><b>'+inr(tot)+'</b></td><td></td></tr></tbody></table></div><p class="muted">Select an account number to view its transaction details.</p>';
 if(S.acct&&acc(S.acct)){var a=acc(S.acct);h+='<div class="card"><h3>Account Details</h3><dl><dt>Account Number</dt><dd>'+a.id+'</dd><dt>Account Type</dt><dd>'+a.type+'</dd><dt>Balance</dt><dd>'+inr(a.balance)+'</dd><dt>Status</dt><dd>Active</dd></dl></div><h3>Account Activity</h3>'+txRows(u.tx.filter(function(t){return t.acct===a.id}))}
 return h};
