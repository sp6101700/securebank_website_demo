// SecureBank demo – core: storage, helpers, navigation, routing, events
var K='sb_demo_v1', S={page:'overview',out:'',acct:null,res:null,flash:''}, db;
var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var inr=function(n){return '₹'+Number(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})};
var fmtD=function(i){var p=i.split('-');return p[1]+'-'+p[2]+'-'+p[0]};
var today=function(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
function parseD(s){var m=/^(\d{2})-(\d{2})-(\d{4})$/.exec((s||'').trim());if(!m)return null;var d=new Date(+m[3],+m[1]-1,+m[2]);if(d.getFullYear()!=+m[3]||d.getMonth()!=+m[1]-1||d.getDate()!=+m[2])return null;return m[3]+'-'+m[1]+'-'+m[2]}
function seed(){
 var t=[[1,'13344','2026-07-02','Salary credit – Acme Pvt Ltd','Credit',62000],[2,'13344','2026-07-05','Rent payment – Sunrise Residency','Debit',18000],[3,'13344','2026-07-12','Electricity bill – MSEDCL','Debit',2450.5],[4,'13344','2026-08-02','Salary credit – Acme Pvt Ltd','Credit',62000],[5,'13344','2026-08-09','Grocery – Big Bazaar','Debit',4120],[6,'13344','2026-09-02','Salary credit – Acme Pvt Ltd','Credit',62000],[7,'13344','2026-09-14','Broadband – Airtel','Debit',1179],[8,'13344','2026-10-02','Salary credit – Acme Pvt Ltd','Credit',62000],[9,'13455','2026-08-15','Interest credit','Credit',1850],[10,'13455','2026-09-15','Interest credit','Credit',1862.4],[11,'13455','2026-10-01','Funds transfer from 13344','Credit',20000],[12,'13566','2026-09-20','Cash deposit – Sangli Branch','Credit',15000],[13,'13566','2026-10-05','Mobile recharge – Jio','Debit',2699],[14,'13344','2026-10-01','Funds transfer to 13455','Debit',20000]];
 return {nextTx:20015,nextAcct:14001,session:null,users:{demo:{password:'demo123',first:'Aarav',last:'Kulkarni',street:'12 Krishna Nagar, MG Road',city:'Sangli',state:'MH',zip:'416416',phone:'9876543210',
 accts:[{id:'13344',type:'Checking',balance:84250.5},{id:'13455',type:'Savings',balance:245000},{id:'13566',type:'Checking',balance:12300}],
 tx:t.map(function(r){return {id:String(19000+r[0]),acct:r[1],date:r[2],desc:r[3],type:r[4],amount:r[5]}})}}}}
function load(){try{var r=localStorage.getItem(K);db=r?JSON.parse(r):seed()}catch(e){db=seed()}}
function save(){try{localStorage.setItem(K,JSON.stringify(db))}catch(e){}}
function U(){return db.users[db.session]}
function acc(id){return U().accts.filter(function(a){return a.id===id})[0]}
function addTx(a,type,amt,desc){var tx={id:String(db.nextTx++),acct:a.id,date:today(),desc:desc,type:type,amount:amt};a.balance=Math.round((a.balance+(type==='Credit'?amt:-amt))*100)/100;U().tx.push(tx);return tx}
function opts(sel,skip){return U().accts.map(function(a){return '<option value="'+a.id+'"'+(a.id===sel?' selected':'')+'>'+a.id+' – '+a.type+' ('+inr(a.balance)+')</option>'}).join('')}
function txRows(list){if(!list.length)return '<p class="muted">No transactions found.</p>';
 list=list.slice().sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:b.id-a.id});
 return '<div class="tw"><table><thead><tr><th>Transaction ID</th><th>Date</th><th>Description</th><th>Type</th><th class="n">Amount</th></tr></thead><tbody>'+list.map(function(t){return '<tr><td>'+t.id+'</td><td>'+fmtD(t.date)+'</td><td>'+esc(t.desc)+'</td><td>'+t.type+'</td><td class="n '+(t.type==='Credit'?'cr':'db')+'">'+(t.type==='Credit'?'+':'−')+inr(t.amount)+'</td></tr>'}).join('')+'</tbody></table></div>'}
var M=function(c,t){return '<div class="msg '+c+'" role="alert">'+t+'</div>'};
var money=function(v){v=String(v).trim();if(!/^\d+(\.\d{1,2})?$/.test(v))return null;v=parseFloat(v);return v>0?v:null};
function row(l,i){return '<label for="'+i.split('"')[1]+'">'+l+'</label>'+i}
function field(l,id,v,ph,type){return '<label for="'+id+'">'+l+'</label><input id="'+id+'" name="'+id+'" type="'+(type||'text')+'" value="'+esc(v||'')+'" placeholder="'+(ph||'')+'" autocomplete="off">'}

var NAV=[['open','Open New Account'],['overview','Accounts Overview'],['transfer','Transfer Funds'],['bill','Bill Pay'],['find','Find Transactions'],['contact','Update Contact Info'],['loan','Request Loan'],['logout','Log Out']];
var P={};
function render(){
 var w=$('#wrap');
 if(!db.session||!U()){w.className='wrap auth';w.innerHTML=authView(S.page==='register');$('#who').textContent='';return}
 w.className='wrap';$('#who').textContent='Signed in: '+U().first+' '+U().last;
 w.innerHTML='<aside><h3>Account Services</h3><nav>'+NAV.map(function(n){return '<button data-go="'+n[0]+'"'+(S.page===n[0]?' class="on"':'')+'>'+n[1]+'</button>'}).join('')+'</nav></aside><main>'+(S.flash||'')+P[S.page]()+'</main>';
}
function go(p){S.page=p;S.out='';S.flash='';S.res=null;S.v=null;render();window.scrollTo(0,0)}

var F={};
document.addEventListener('submit',function(e){var f=e.target;if(f.dataset&&f.dataset.f&&F[f.dataset.f]){e.preventDefault();F[f.dataset.f](f)}});
document.addEventListener('click',function(e){var t=e.target.closest('[data-go],[data-acct],[data-do],[data-auth]');if(!t)return;
 if(t.dataset.go)go(t.dataset.go);
 else if(t.dataset.acct){S.acct=t.dataset.acct;render()}
 else if(t.dataset.auth){S.page=t.dataset.auth;S.flash='';render()}
 else if(t.dataset.do==='logout'){db.session=null;save();S.page='login';S.acct=null;S.flash=M('ok','You have been logged out successfully. See you soon!');render()}});
