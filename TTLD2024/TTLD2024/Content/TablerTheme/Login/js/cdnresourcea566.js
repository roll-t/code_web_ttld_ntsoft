/*!decimal.js v4.0.2 https://github.com/MikeMcl/decimal.js/LICENCE*/;(function(global){'use strict';var convertBase,decimal,noConflict,crypto=global['crypto'],external=true,id=0,mathfloor=Math.floor,mathpow=Math.pow,outOfRange,toString=Object.prototype.toString,BASE=1e7,LOGBASE=7,NUMERALS='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',P={},EXP_LIMIT=9e15,MAX_DIGITS=1E9,INT_POW_LIMIT=3000,LN10='2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058';P['absoluteValue']=P['abs']=function(){var x=new this['constructor'](this);if(x['s']<0){x['s']=1;}
return rnd(x);};P['ceil']=function(){return rnd(new this['constructor'](this),this['e']+1,2);};P['comparedTo']=P['cmp']=function(y,b){var a,x=this,xc=x['c'],yc=(id=-id,y=new x['constructor'](y,b),y['c']),i=x['s'],j=y['s'],k=x['e'],l=y['e'];if(!i||!j){return null;}
a=xc&&!xc[0];b=yc&&!yc[0];if(a||b){return a?b?0:-j:i;}
if(i!=j){return i;}
a=i<0;if(!xc||!yc){return k==l?0:!xc^a?1:-1;}
if(k!=l){return k>l^a?1:-1;}
for(i=-1,j=(k=xc.length)<(l=yc.length)?k:l;++i<j;){if(xc[i]!=yc[i]){return xc[i]>yc[i]^a?1:-1;}}
return k==l?0:k>l^a?1:-1;};P['decimalPlaces']=P['dp']=function(){var c,v,n=null;if(c=this['c']){n=((v=c.length-1)-mathfloor(this['e']/LOGBASE))*LOGBASE;if(v=c[v]){for(;v%10==0;v/=10,n--);}
if(n<0){n=0;}}
return n;};P['dividedBy']=P['div']=function(y,b){id=2;return div(this,new this['constructor'](y,b));};P['dividedToIntegerBy']=P['divToInt']=function(y,b){var x=this,Decimal=x['constructor'];id=18;return rnd(div(x,new Decimal(y,b),0,1,1),Decimal['precision'],Decimal['rounding']);};P['equals']=P['eq']=function(n,b){id=3;return this['cmp'](n,b)===0;};P['exponential']=P['exp']=function(){return exp(this);};P['floor']=function(){return rnd(new this['constructor'](this),this['e']+1,3);};P['greaterThan']=P['gt']=function(n,b){id=4;return this['cmp'](n,b)>0;};P['greaterThanOrEqualTo']=P['gte']=function(n,b){id=5;b=this['cmp'](n,b);return b==1||b===0;};P['isFinite']=function(){return!!this['c'];};P['isInteger']=P['isInt']=function(){return!!this['c']&&mathfloor(this['e']/LOGBASE)>this['c'].length-2;};P['isNaN']=function(){return!this['s'];};P['isNegative']=P['isNeg']=function(){return this['s']<0;};P['isZero']=function(){return!!this['c']&&this['c'][0]==0;};P['lessThan']=P['lt']=function(n,b){id=6;return this['cmp'](n,b)<0;};P['lessThanOrEqualTo']=P['lte']=function(n,b){id=7;b=this['cmp'](n,b);return b==-1||b===0;};P['logarithm']=P['log']=function(base,b){var base10,c,denom,i,inf,num,sd,sd10,r,arg=this,Decimal=arg['constructor'],pr=Decimal['precision'],rm=Decimal['rounding'],guard=5;if(base==null){base=new Decimal(10);base10=true;}else{id=15;base=new Decimal(base,b);c=base['c'];if(base['s']<0||!c||!c[0]||!base['e']&&c[0]==1&&c.length==1){return new Decimal(NaN);}
base10=base['eq'](10);}
c=arg['c'];if(arg['s']<0||!c||!c[0]||!arg['e']&&c[0]==1&&c.length==1){return new Decimal(c&&!c[0]?-1/0:arg['s']!=1?NaN:c?0:1/0);}
inf=base10&&(i=c[0],c.length>1||i!=1&&i!=10&&i!=1e2&&i!=1e3&&i!=1e4&&i!=1e5&&i!=1e6);external=false;sd=pr+guard;sd10=sd+10;num=ln(arg,sd);if(base10){if(sd10>LN10.length){ifExceptionsThrow(Decimal,1,sd10,'log');}
denom=new Decimal(LN10.slice(0,sd10));}else{denom=ln(base,sd);}
r=div(num,denom,sd,1);if(checkRoundingDigits(r['c'],i=pr,rm)){do{sd+=10;num=ln(arg,sd);if(base10){sd10=sd+10;if(sd10>LN10.length){ifExceptionsThrow(Decimal,1,sd10,'log');}
denom=new Decimal(LN10.slice(0,sd10));}else{denom=ln(base,sd);}
r=div(num,denom,sd,1);if(!inf){if(+coefficientToString(r['c']).slice(i+1,i+15)+1==1e14){r=rnd(r,pr+1,0);}
break;}}while(checkRoundingDigits(r['c'],i+=10,rm));}
external=true;return rnd(r,pr,rm);};P['minus']=function(y,b){var t,i,j,xLTy,x=this,Decimal=x['constructor'],a=x['s'];id=8;y=new Decimal(y,b);b=y['s'];if(!a||!b){return new Decimal(NaN);}
if(a!=b){y['s']=-b;return x['plus'](y);}
var xc=x['c'],yc=y['c'],e=mathfloor(y['e']/LOGBASE),k=mathfloor(x['e']/LOGBASE),pr=Decimal['precision'],rm=Decimal['rounding'];if(!k||!e){if(!xc||!yc){return xc?(y['s']=-b,y):new Decimal(yc?x:NaN);}
if(!xc[0]||!yc[0]){x=yc[0]?(y['s']=-b,y):new Decimal(xc[0]?x:rm==3?-0:0);return external?rnd(x,pr,rm):x;}}
xc=xc.slice();i=xc.length;if(a=k-e){if(xLTy=a<0){a=-a;t=xc;i=yc.length;}else{e=k;t=yc;}
if((k=Math.ceil(pr/LOGBASE))>i){i=k;}
if(a>(i+=2)){a=i;t.length=1;}
t.reverse();for(b=a;b--;t.push(0));t.reverse();}else{if(xLTy=i<(j=yc.length)){j=i;}
for(a=b=0;b<j;b++){if(xc[b]!=yc[b]){xLTy=xc[b]<yc[b];break;}}}
if(xLTy){t=xc,xc=yc,yc=t;y['s']=-y['s'];}
if((b=-((j=xc.length)-yc.length))>0){for(;b--;xc[j++]=0);}
for(k=BASE-1,b=yc.length;b>a;){if(xc[--b]<yc[b]){for(i=b;i&&!xc[--i];xc[i]=k);--xc[i];xc[b]+=BASE;}
xc[b]-=yc[b];}
for(;xc[--j]==0;xc.pop());for(;xc[0]==0;xc.shift(),--e);if(!xc[0]){xc=[e=0];y['s']=rm==3?-1:1;}
y['c']=xc;for(a=1,b=xc[0];b>=10;b/=10,a++);y['e']=a+e*LOGBASE-1;return external?rnd(y,pr,rm):y;};P['modulo']=P['mod']=function(y,b){var n,q,x=this,Decimal=x['constructor'],m=Decimal['modulo'];id=9;y=new Decimal(y,b);b=y['s'];n=!x['c']||!b||y['c']&&!y['c'][0];if(n||!y['c']||x['c']&&!x['c'][0]){return n?new Decimal(NaN):rnd(new Decimal(x),Decimal['precision'],Decimal['rounding']);}
external=false;if(m==9){y['s']=1;q=div(x,y,0,3,1);y['s']=b;q['s']*=b;}else{q=div(x,y,0,m,1);}
q=q['times'](y);external=true;return x['minus'](q);};P['naturalLogarithm']=P['ln']=function(){return ln(this);};P['negated']=P['neg']=function(){var x=new this['constructor'](this);x['s']=-x['s']||null;return rnd(x);};P['plus']=function(y,b){var t,x=this,Decimal=x['constructor'],a=x['s'];id=10;y=new Decimal(y,b);b=y['s'];if(!a||!b){return new Decimal(NaN);}
if(a!=b){y['s']=-b;return x['minus'](y);}
var xc=x['c'],yc=y['c'],e=mathfloor(y['e']/LOGBASE),k=mathfloor(x['e']/LOGBASE),pr=Decimal['precision'],rm=Decimal['rounding'];if(!k||!e){if(!xc||!yc){return new Decimal(a/0);}
if(!xc[0]||!yc[0]){x=yc[0]?y:new Decimal(xc[0]?x:a*0);return external?rnd(x,pr,rm):x;}}
xc=xc.slice();if(a=k-e){if(a<0){a=-a;t=xc;b=yc.length;}else{e=k;t=yc;b=xc.length;}
if((k=Math.ceil(pr/LOGBASE))>b){b=k;}
if(a>++b){a=b;t.length=1;}
for(t.reverse();a--;t.push(0));t.reverse();}
if(xc.length-yc.length<0){t=yc,yc=xc,xc=t;}
for(a=yc.length,b=0,k=BASE;a;xc[a]%=k){b=(xc[--a]=xc[a]+yc[a]+b)/k|0;}
if(b){xc.unshift(b);++e;}
for(a=xc.length;xc[--a]==0;xc.pop());y['c']=xc;for(a=1,b=xc[0];b>=10;b/=10,a++);y['e']=a+e*LOGBASE-1;return external?rnd(y,pr,rm):y;};P['precision']=P['sd']=function(z){var n=null,x=this;if(z!=n&&z!==!!z&&z!==1&&z!==0){ifExceptionsThrow(x['constructor'],'argument',z,'precision',1);}
if(x['c']){n=getCoeffLength(x['c']);if(z&&x['e']+1>n){n=x['e']+1;}}
return n;};P['round']=function(){var x=this,Decimal=x['constructor'];return rnd(new Decimal(x),x['e']+1,Decimal['rounding']);};P['squareRoot']=P['sqrt']=function(){var m,n,sd,r,rep,t,x=this,c=x['c'],s=x['s'],e=x['e'],Decimal=x['constructor'],half=new Decimal(0.5);if(s!==1||!c||!c[0]){return new Decimal(!s||s<0&&(!c||c[0])?NaN:c?x:1/0);}
external=false;s=Math.sqrt(+x);if(s==0||s==1/0){n=coefficientToString(c);if((n.length+e)%2==0){n+='0';}
s=Math.sqrt(n);e=mathfloor((e+1)/2)-(e<0||e%2);if(s==1/0){n='1e'+e;}else{n=s.toExponential();n=n.slice(0,n.indexOf('e')+1)+e;}
r=new Decimal(n);}else{r=new Decimal(s.toString());}
sd=(e=Decimal['precision'])+3;for(;;){t=r;r=half['times'](t['plus'](div(x,t,sd+2,1)));if(coefficientToString(t['c']).slice(0,sd)===(n=coefficientToString(r['c'])).slice(0,sd)){n=n.slice(sd-3,sd+1);if(n=='9999'||!rep&&n=='4999'){if(!rep){rnd(t,e+1,0);if(t['times'](t)['eq'](x)){r=t;break;}}
sd+=4;rep=1;}else{if(!+n||!+n.slice(1)&&n.charAt(0)=='5'){rnd(r,e+1,1);m=!r['times'](r)['eq'](x);}
break;}}}
external=true;return rnd(r,e,Decimal['rounding'],m);};P['times']=function(y,b){var c,e,x=this,Decimal=x['constructor'],xc=x['c'],yc=(id=11,y=new Decimal(y,b),y['c']),i=mathfloor(x['e']/LOGBASE),j=mathfloor(y['e']/LOGBASE),a=x['s'];b=y['s'];y['s']=a==b?1:-1;if(!i&&(!xc||!xc[0])||!j&&(!yc||!yc[0])){return new Decimal(!a||!b||xc&&!xc[0]&&!yc||yc&&!yc[0]&&!xc?NaN:!xc||!yc?y['s']/0:y['s']*0);}
e=i+j;a=xc.length;b=yc.length;if(a<b){c=xc,xc=yc,yc=c;j=a,a=b,b=j;}
for(j=a+b,c=[];j--;c.push(0));for(i=b-1;i>-1;i--){b=0;for(j=a+i;j>i;){b=c[j]+yc[i]*xc[j-i-1]+b;c[j--]=b%BASE|0;b=b/BASE|0;}
c[j]=(c[j]+b)%BASE|0;}
if(b){++e;}else if(!c[0]){c.shift();}
for(j=c.length;!c[--j];c.pop());y['c']=c;for(a=1,b=c[0];b>=10;b/=10,a++);y['e']=a+e*LOGBASE-1;return external?rnd(y,Decimal['precision'],Decimal['rounding']):y;};P['toDecimalPlaces']=P['toDP']=function(dp,rm){var x=this;x=new x['constructor'](x);return dp==null||!checkArg(x,dp,'toDP')?x:rnd(x,(dp|0)+x['e']+1,checkRM(x,rm,'toDP'));};P['toExponential']=function(dp,rm){var x=this;return x['c']?format(x,dp!=null&&checkArg(x,dp,'toExponential')?dp|0:null,dp!=null&&checkRM(x,rm,'toExponential'),1):x.toString();};P['toFixed']=function(dp,rm){var str,x=this,Decimal=x['constructor'],neg=Decimal['toExpNeg'],pos=Decimal['toExpPos'];if(dp!=null){dp=checkArg(x,dp,str='toFixed')?x['e']+(dp|0):null;rm=checkRM(x,rm,str);}
Decimal['toExpNeg']=-(Decimal['toExpPos']=1/0);if(dp==null||!x['c']){str=x.toString();}else{str=format(x,dp,rm);if(x['s']<0&&x['c']){if(!x['c'][0]){str=str.replace('-','');}else if(str.indexOf('-')<0){str='-'+str;}}}
Decimal['toExpNeg']=neg;Decimal['toExpPos']=pos;return str;};P['toFormat']=function(dp,rm){var x=this;if(!x['c']){return x.toString();}
var i,isNeg=x['s']<0,f=x['constructor']['format'],groupSeparator=f['groupSeparator'],g1=+f['groupSize'],g2=+f['secondaryGroupSize'],arr=x.toFixed(dp,rm).split('.'),intPart=arr[0],fractionPart=arr[1],intDigits=isNeg?intPart.slice(1):intPart,len=intDigits.length;if(g2){len-=(i=g1,g1=g2,g2=i);}
if(g1>0&&len>0){i=len%g1||g1;intPart=intDigits.substr(0,i);for(;i<len;i+=g1){intPart+=groupSeparator+intDigits.substr(i,g1);}
if(g2>0){intPart+=groupSeparator+intDigits.slice(i);}
if(isNeg){intPart='-'+intPart;}}
return fractionPart?intPart+f['decimalSeparator']+((g2=+f['fractionGroupSize'])?fractionPart.replace(new RegExp('\\d{'+g2+'}\\B','g'),'$&'+f['fractionGroupSeparator']):fractionPart):intPart;};P['toFraction']=function(maxD){var d0,d2,e,frac,n,n0,p,q,x=this,Decimal=x['constructor'],n1=d0=new Decimal(Decimal['ONE']),d1=n0=new Decimal(0),xc=x['c'],d=new Decimal(d1);if(!xc){return x.toString();}
e=d['e']=getCoeffLength(xc)-x['e']-1;d['c'][0]=mathpow(10,(p=e%LOGBASE)<0?LOGBASE+p:p);if(maxD==null||(!(id=12,n=new Decimal(maxD))['s']||(outOfRange=n['cmp'](n1)<0||!n['c'])||(Decimal['errors']&&mathfloor(n['e']/LOGBASE)<n['c'].length-1))&&!ifExceptionsThrow(Decimal,'max denominator',maxD,'toFraction',0)||(maxD=n)['cmp'](d)>0){maxD=e>0?d:n1;}
external=false;n=new Decimal(coefficientToString(xc));p=Decimal['precision'];Decimal['precision']=e=xc.length*LOGBASE*2;for(;;){q=div(n,d,0,1,1);d2=d0['plus'](q['times'](d1));if(d2['cmp'](maxD)==1){break;}
d0=d1;d1=d2;n1=n0['plus'](q['times'](d2=n1));n0=d2;d=n['minus'](q['times'](d2=d));n=d2;}
d2=div(maxD['minus'](d0),d1,0,1,1);n0=n0['plus'](d2['times'](n1));d0=d0['plus'](d2['times'](d1));n0['s']=n1['s']=x['s'];frac=div(n1,d1,e,1)['minus'](x)['abs']()['cmp'](div(n0,d0,e,1)['minus'](x)['abs']())<1?[n1+'',d1+'']:[n0+'',d0+''];external=true;Decimal['precision']=p;return frac;};P['toNearest']=function(n,rm){var x=this,Decimal=x['constructor'];x=new Decimal(x);if(n==null){n=new Decimal(Decimal['ONE']);rm=Decimal['rounding'];}else{id=17;n=new Decimal(n);rm=checkRM(x,rm,'toNearest');}
if(n['c']){if(x['c']){if(n['c'][0]){external=false;x=div(x,n,0,rm<4?[4,5,7,8][rm]:rm,1)['times'](n);external=true;rnd(x);}else{x['c']=[x['e']=0];}}}else if(x['s']){if(n['s']){n['s']=x['s'];}
x=n;}
return x;};P['toNumber']=function(){var x=this;return+x||(x['s']?0*x['s']:NaN);};P['toPower']=P['pow']=function(y,b){var a,e,n,r,x=this,Decimal=x['constructor'],s=x['s'],yN=+(id=13,y=new Decimal(y,b)),i=yN<0?-yN:yN,pr=Decimal['precision'],rm=Decimal['rounding'];if(!x['c']||!y['c']||(n=!x['c'][0])||!y['c'][0]){return new Decimal(mathpow(n?s*0:+x,yN));}
x=new Decimal(x);a=x['c'].length;if(!x['e']&&x['c'][0]==x['s']&&a==1){return x;}
b=y['c'].length-1;if(!y['e']&&y['c'][0]==y['s']&&!b){r=rnd(x,pr,rm);}else{e=mathfloor(y['e']/LOGBASE);n=e>=b;if(!n&&s<0){r=new Decimal(NaN);}else{if(n&&a*LOGBASE*i<INT_POW_LIMIT){r=intPow(Decimal,x,i);if(y['s']<0){return Decimal['ONE']['div'](r);}}else{s=s<0&&y['c'][Math.max(e,b)]&1?-1:1;b=mathpow(+x,yN);e=b==0||!isFinite(b)?mathfloor(yN*(Math.log('0.'+coefficientToString(x['c']))/Math.LN10+x['e']+1)):new Decimal(b+'')['e'];if(e>Decimal['maxE']+1||e<Decimal['minE']-1){return new Decimal(e>0?s/0:0);}
external=false;Decimal['rounding']=x['s']=1;i=Math.min(12,(e+'').length);r=exp(y['times'](ln(x,pr+i)),pr);r=rnd(r,pr+5,1);if(checkRoundingDigits(r['c'],pr,rm)){e=pr+10;r=rnd(exp(y['times'](ln(x,e+i)),e),e+5,1);if(+coefficientToString(r['c']).slice(pr+1,pr+15)+1==1e14){r=rnd(r,pr+1,0);}}
r['s']=s;external=true;Decimal['rounding']=rm;}
r=rnd(r,pr,rm);}}
return r;};P['toPrecision']=function(sd,rm){var x=this;return sd!=null&&checkArg(x,sd,'toPrecision',1)&&x['c']?format(x,--sd|0,checkRM(x,rm,'toPrecision'),2):x.toString();};P['toSignificantDigits']=P['toSD']=function(d,rm){var x=this,Decimal=x['constructor'];x=new Decimal(x);return d==null||!checkArg(x,d,'toSD',1)?rnd(x,Decimal['precision'],Decimal['rounding']):rnd(x,d|0,checkRM(x,rm,'toSD'));};P['toString']=function(b){var u,str,strL,x=this,Decimal=x['constructor'],xe=x['e'];if(xe===null){str=x['s']?'Infinity':'NaN';}else if(b===u&&(xe<=Decimal['toExpNeg']||xe>=Decimal['toExpPos'])){return format(x,null,Decimal['rounding'],1);}else{str=coefficientToString(x['c']);if(xe<0){for(;++xe;str='0'+str);str='0.'+str;}else if(strL=str.length,xe>0){if(++xe>strL){for(xe-=strL;xe--;str+='0');}else if(xe<strL){str=str.slice(0,xe)+'.'+str.slice(xe);}}else{u=str.charAt(0);if(strL>1){str=u+'.'+str.slice(1);}else if(u=='0'){return u;}}
if(b!=null){if(!(outOfRange=!(b>=2&&b<65))&&(b==(b|0)||!Decimal['errors'])){str=convertBase(Decimal,str,b|0,10,x['s']);if(str=='0'){return str;}}else{ifExceptionsThrow(Decimal,'base',b,'toString',0);}}}
return x['s']<0?'-'+str:str;};P['truncated']=P['trunc']=function(){return rnd(new this['constructor'](this),this['e']+1,1);};P['valueOf']=P['toJSON']=function(){return this.toString();};function coefficientToString(a){var s,z,i=1,j=a.length,r=a[0]+'';for(;i<j;i++){s=a[i]+'';for(z=LOGBASE-s.length;z--;){s='0'+s;}
r+=s;}
for(j=r.length;r.charCodeAt(--j)===48;);return r.slice(0,j+1||1);}
function checkRoundingDigits(c,i,rm,repeating){var ci,k,n,r,rd;for(k=1,n=c[0];n>=10;n/=10,k++);n=i-k;if(n<0){n+=LOGBASE;ci=0;}else{ci=Math.ceil((n+1)/LOGBASE);n%=LOGBASE;}
k=mathpow(10,LOGBASE-n);rd=c[ci]%k|0;if(repeating==null){if(n<3){if(n==0){rd=rd/100|0;}else if(n==1){rd=rd/10|0;}
r=rm<4&&rd==99999||rm>3&&rd==49999||rd==50000||rd==0;}else{r=(rm<4&&rd+1==k||rm>3&&rd+1==k/2)&&(c[ci+1]/k/100|0)==mathpow(10,n-2)-1||(rd==k/2||rd==0)&&(c[ci+1]/k/100|0)==0;}}else{if(n<4){if(n==0){rd=rd/1000|0;}else if(n==1){rd=rd/100|0;}else if(n==2){rd=rd/10|0;}
r=(repeating||rm<4)&&rd==9999||!repeating&&rm>3&&rd==4999;}else{r=((repeating||rm<4)&&rd+1==k||(!repeating&&rm>3)&&rd+1==k/2)&&(c[ci+1]/k/1000|0)==mathpow(10,n-3)-1;}}
return r;}
function checkRM(x,rm,method){var Decimal=x['constructor'];return rm==null||((outOfRange=rm<0||rm>8)||rm!==0&&(Decimal['errors']?parseInt:parseFloat)(rm)!=rm)&&!ifExceptionsThrow(Decimal,'rounding mode',rm,method,0)?Decimal['rounding']:rm|0;}
function checkArg(x,n,method,min){var Decimal=x['constructor'];return!(outOfRange=n<(min||0)||n>=MAX_DIGITS+1)&&(n===0||(Decimal['errors']?parseInt:parseFloat)(n)==n)||ifExceptionsThrow(Decimal,'argument',n,method,0);}
convertBase=(function(){function toBaseOut(str,baseIn,baseOut){var j,arr=[0],arrL,i=0,strL=str.length;for(;i<strL;){for(arrL=arr.length;arrL--;arr[arrL]*=baseIn);arr[j=0]+=NUMERALS.indexOf(str.charAt(i++));for(;j<arr.length;j++){if(arr[j]>baseOut-1){if(arr[j+1]==null){arr[j+1]=0;}
arr[j+1]+=arr[j]/baseOut|0;arr[j]%=baseOut;}}}
return arr.reverse();}
return function(Decimal,str,baseOut,baseIn,sign){var e,j,r,x,xc,y,i=str.indexOf('.'),pr=Decimal['precision'],rm=Decimal['rounding'];if(baseIn<37){str=str.toLowerCase();}
if(i>=0){str=str.replace('.','');y=new Decimal(baseIn);x=intPow(Decimal,y,str.length-i);y['c']=toBaseOut(x.toFixed(),10,baseOut);y['e']=y['c'].length;}
xc=toBaseOut(str,baseIn,baseOut);e=j=xc.length;for(;xc[--j]==0;xc.pop());if(!xc[0]){return '0';}
if(i<0){e--;}else{x['c']=xc;x['e']=e;x['s']=sign;x=div(x,y,pr,rm,0,baseOut);xc=x['c'];r=x['r'];e=x['e'];}
i=xc[pr];j=baseOut/2;r=r||xc[pr+1]!=null;if(rm<4?(i!=null||r)&&(rm==0||rm==(x['s']<0?3:2)):i>j||i==j&&(rm==4||r||rm==6&&xc[pr-1]&1||rm==(x['s']<0?8:7))){xc.length=pr;for(--baseOut;++xc[--pr]>baseOut;){xc[pr]=0;if(!pr){++e;xc.unshift(1);}}}else{xc.length=pr;}
for(j=xc.length;!xc[--j];);for(i=0,str='';i<=j;str+=NUMERALS.charAt(xc[i++]));if(e<0){for(;++e;str='0'+str);str='0.'+str;}else{i=str.length;if(++e>i){for(e-=i;e--;str+='0');}else if(e<i){str=str.slice(0,e)+'.'+str.slice(e);}}
return str;};})();var div=(function(){function multiplyInteger(x,k,base){var temp,carry=0,i=x.length;for(x=x.slice();i--;){temp=x[i]*k+carry;x[i]=temp%base|0;carry=temp/base|0;}
if(carry){x.unshift(carry);}
return x;}
function compare(a,b,aL,bL){var i,cmp;if(aL!=bL){cmp=aL>bL?1:-1;}else{for(i=cmp=0;i<aL;i++){if(a[i]!=b[i]){cmp=a[i]>b[i]?1:-1;break;}}}
return cmp;}
function subtract(a,b,aL,base){var i=0;for(;aL--;){a[aL]-=i;i=a[aL]<b[aL]?1:0;a[aL]=i*base+a[aL]-b[aL];}
for(;!a[0]&&a.length>1;a.shift());}
return function(x,y,pr,rm,dp,base){var cmp,e,i,logbase,more,n,prod,prodL,q,qc,rem,remL,rem0,t,xi,xL,yc0,yL,yz,Decimal=x['constructor'],s=x['s']==y['s']?1:-1,xc=x['c'],yc=y['c'];if(!xc||!xc[0]||!yc||!yc[0]){return new Decimal(!x['s']||!y['s']||(xc?yc&&xc[0]==yc[0]:!yc)?NaN:xc&&xc[0]==0||!yc?s*0:s/0);}
if(base){logbase=1;e=x['e']-y['e'];}else{base=BASE;logbase=LOGBASE;e=mathfloor(x['e']/logbase)-mathfloor(y['e']/logbase);}
yL=yc.length;xL=xc.length;q=new Decimal(s);qc=q['c']=[];for(i=0;yc[i]==(xc[i]||0);i++);if(yc[i]>(xc[i]||0)){e--;}
if(pr==null){s=pr=Decimal['precision'];rm=Decimal['rounding'];}else if(dp){s=pr+(x['e']-y['e'])+1;}else{s=pr;}
if(s<0){qc.push(1);more=true;}else{s=s/logbase+2|0;i=0;if(yL==1){n=0;yc=yc[0];s++;for(;(i<xL||n)&&s--;i++){t=n*base+(xc[i]||0);qc[i]=t/yc|0;n=t%yc|0;}
more=n||i<xL;}else{n=base/(yc[0]+1)|0;if(n>1){yc=multiplyInteger(yc,n,base);xc=multiplyInteger(xc,n,base);yL=yc.length;xL=xc.length;}
xi=yL;rem=xc.slice(0,yL);remL=rem.length;for(;remL<yL;rem[remL++]=0);yz=yc.slice();yz.unshift(0);yc0=yc[0];if(yc[1]>=base/2){yc0++;}
do{n=0;cmp=compare(yc,rem,yL,remL);if(cmp<0){rem0=rem[0];if(yL!=remL){rem0=rem0*base+(rem[1]||0);}
n=rem0/yc0|0;if(n>1){if(n>=base){n=base-1;}
prod=multiplyInteger(yc,n,base);prodL=prod.length;remL=rem.length;cmp=compare(prod,rem,prodL,remL);if(cmp==1){n--;subtract(prod,yL<prodL?yz:yc,prodL,base);}}else{if(n==0){cmp=n=1;}
prod=yc.slice();}
prodL=prod.length;if(prodL<remL){prod.unshift(0);}
subtract(rem,prod,remL,base);if(cmp==-1){remL=rem.length;cmp=compare(yc,rem,yL,remL);if(cmp<1){n++;subtract(rem,yL<remL?yz:yc,remL,base);}}
remL=rem.length;}else if(cmp===0){n++;rem=[0];}
qc[i++]=n;if(cmp&&rem[0]){rem[remL++]=xc[xi]||0;}else{rem=[xc[xi]];remL=1;}}while((xi++<xL||rem[0]!=null)&&s--);more=rem[0]!=null;}
if(!qc[0]){qc.shift();}}
if(logbase==1){q['e']=e;q['r']=+more;}else{for(i=1,s=qc[0];s>=10;s/=10,i++);q['e']=i+e*logbase-1;rnd(q,dp?pr+q['e']+1:pr,rm,more);}
return q;};})();function exp(x,pr){var denom,guard,j,pow,sd,sum,t,rep=0,i=0,k=0,Decimal=x['constructor'],one=Decimal['ONE'],rm=Decimal['rounding'],precision=Decimal['precision'];if(!x['c']||!x['c'][0]||x['e']>17){return new Decimal(x['c']?!x['c'][0]?one:x['s']<0?0:1/0:x['s']?x['s']<0?0:x:NaN);}
if(pr==null){external=false;sd=precision;}else{sd=pr;}
t=new Decimal(0.03125);while(x['e']>-2){x=x['times'](t);k+=5;}
guard=Math.log(mathpow(2,k))/Math.LN10*2+5|0;sd+=guard;denom=pow=sum=new Decimal(one);Decimal['precision']=sd;for(;;){pow=rnd(pow['times'](x),sd,1);denom=denom['times'](++i);t=sum['plus'](div(pow,denom,sd,1));if(coefficientToString(t['c']).slice(0,sd)===coefficientToString(sum['c']).slice(0,sd)){j=k;while(j--){sum=rnd(sum['times'](sum),sd,1);}
if(pr==null){if(rep<3&&checkRoundingDigits(sum['c'],sd-guard,rm,rep)){Decimal['precision']=sd+=10;denom=pow=t=new Decimal(one);i=0;rep++;}else{return rnd(sum,Decimal['precision']=precision,rm,external=true);}}else{Decimal['precision']=precision;return sum;}}
sum=t;}}
function format(n,i,j,k){var s,z,Decimal=n['constructor'],e=(n=new Decimal(n))['e'];if(i==null){j=0;}else{rnd(n,++i,j);j=k?i:i+n['e']-e;}
e=n['e'];s=coefficientToString(n['c']);if(k==1||k==2&&(i<=e||e<=Decimal['toExpNeg'])){for(;s.length<j;s+='0');if(s.length>1){s=s.charAt(0)+'.'+s.slice(1);}
s+=(e<0?'e':'e+')+e;}else{k=s.length;if(e<0){z=j-k;for(;++e;s='0'+s);s='0.'+s;}else{if(++e>k){z=j-e;for(e-=k;e--;s+='0');if(z>0){s+='.';}}else{z=j-k;if(e<k){s=s.slice(0,e)+'.'+s.slice(e);}else if(z>0){s+='.';}}}
if(z>0){for(;z--;s+='0');}}
return n['s']<0&&n['c'][0]?'-'+s:s;}
function getCoeffLength(c){var v=c.length-1,n=v*LOGBASE+1;if(v=c[v]){for(;v%10==0;v/=10,n--);for(v=c[0];v>=10;v/=10,n++);}
return n;}
function ifExceptionsThrow(Decimal,message,arg,method,more){if(Decimal['errors']){var error=new Error((method||['new Decimal','cmp','div','eq','gt','gte','lt','lte','minus','mod','plus','times','toFraction','pow','random','log','sqrt','toNearest','divToInt'][id?id<0?-id:id:1/id<0?1:0])+'() '+(['number type has more than 15 significant digits','LN10 out of digits'][message]||message+([outOfRange?' out of range':' not an integer',' not a boolean or binary digit'][more]||''))+': '+arg);error['name']='Decimal Error';outOfRange=id=0;throw error;}}
function intPow(Decimal,x,i){var r=new Decimal(Decimal['ONE']);for(external=false;;){if(i&1){r=r['times'](x);}
i>>=1;if(!i){break;}
x=x['times'](x);}
external=true;return r;}
function ln(y,pr){var c,c0,denom,e,num,rep,sd,sum,t,x1,x2,n=1,guard=10,x=y,xc=x['c'],Decimal=x['constructor'],one=Decimal['ONE'],rm=Decimal['rounding'],precision=Decimal['precision'];if(x['s']<0||!xc||!xc[0]||!x['e']&&xc[0]==1&&xc.length==1){return new Decimal(xc&&!xc[0]?-1/0:x['s']!=1?NaN:xc?0:x);}
if(pr==null){external=false;sd=precision;}else{sd=pr;}
Decimal['precision']=sd+=guard;c=coefficientToString(xc);c0=c.charAt(0);if(Math.abs(e=x['e'])<1.5e15){while(c0<7&&c0!=1||c0==1&&c.charAt(1)>3){x=x['times'](y);c=coefficientToString(x['c']);c0=c.charAt(0);n++;}
e=x['e'];if(c0>1){x=new Decimal('0.'+c);e++;}else{x=new Decimal(c0+'.'+c.slice(1));}}else{x=new Decimal(c0+'.'+c.slice(1));if(sd+2>LN10.length){ifExceptionsThrow(Decimal,1,sd+2,'ln');}
x=ln(x,sd-guard)['plus'](new Decimal(LN10.slice(0,sd+2))['times'](e+''));Decimal['precision']=precision;return pr==null?rnd(x,precision,rm,external=true):x;}
x1=x;sum=num=x=div(x['minus'](one),x['plus'](one),sd,1);x2=rnd(x['times'](x),sd,1);denom=3;for(;;){num=rnd(num['times'](x2),sd,1);t=sum['plus'](div(num,new Decimal(denom),sd,1));if(coefficientToString(t['c']).slice(0,sd)===coefficientToString(sum['c']).slice(0,sd)){sum=sum['times'](2);if(e!==0){if(sd+2>LN10.length){ifExceptionsThrow(Decimal,1,sd+2,'ln');}
sum=sum['plus'](new Decimal(LN10.slice(0,sd+2))['times'](e+''));}
sum=div(sum,new Decimal(n),sd,1);if(pr==null){if(checkRoundingDigits(sum['c'],sd-guard,rm,rep)){Decimal['precision']=sd+=guard;t=num=x=div(x1['minus'](one),x1['plus'](one),sd,1);x2=rnd(x['times'](x),sd,1);denom=rep=1;}else{return rnd(sum,Decimal['precision']=precision,rm,external=true);}}else{Decimal['precision']=precision;return sum;}}
sum=t;denom+=2;}}
function rnd(x,sd,rm,r){var digits,i,j,k,n,rd,xc,xci,Decimal=x['constructor'];out:if(sd!=null){if(!(xc=x['c'])){return x;}
for(digits=1,k=xc[0];k>=10;k/=10,digits++);i=sd-digits;if(i<0){i+=LOGBASE;j=sd;n=xc[xci=0];rd=n/mathpow(10,digits-j-1)%10|0;}else{xci=Math.ceil((i+1)/LOGBASE);if(xci>=xc.length){if(r){for(;xc.length<=xci;xc.push(0));n=rd=0;digits=1;i%=LOGBASE;j=i-LOGBASE+1;}else{break out;}}else{n=k=xc[xci];for(digits=1;k>=10;k/=10,digits++);i%=LOGBASE;j=i-LOGBASE+digits;rd=j<0?0:mathfloor(n/mathpow(10,digits-j-1)%10);}}
r=r||sd<0||xc[xci+1]!=null||(j<0?n:n%mathpow(10,digits-j-1));r=rm<4?(rd||r)&&(rm==0||rm==(x['s']<0?3:2)):rd>5||rd==5&&(rm==4||r||rm==6&&((i>0?j>0?n/mathpow(10,digits-j):0:xc[xci-1])%10)&1||rm==(x['s']<0?8:7));if(sd<1||!xc[0]){xc.length=0;if(r){sd-=x['e']+1;xc[0]=mathpow(10,sd%LOGBASE);x['e']=-sd||0;}else{xc[0]=x['e']=0;}
return x;}
if(i==0){xc.length=xci;k=1;xci--;}else{xc.length=xci+1;k=mathpow(10,LOGBASE-i);xc[xci]=j>0?(n/mathpow(10,digits-j)%mathpow(10,j)|0)*k:0;}
if(r){for(;;){if(xci==0){for(i=1,j=xc[0];j>=10;j/=10,i++);j=xc[0]+=k;for(k=1;j>=10;j/=10,k++);if(i!=k){x['e']++;if(xc[0]==BASE){xc[0]=1;}}
break;}else{xc[xci]+=k;if(xc[xci]!=BASE){break;}
xc[xci--]=0;k=1;}}}
for(i=xc.length;xc[--i]===0;xc.pop());}
if(external){if(x['e']>Decimal['maxE']){x['c']=x['e']=null;}else if(x['e']<Decimal['minE']){x['c']=[x['e']=0];}}
return x;}
decimal=(function(){function config(obj){var p,u,v,Decimal=this,c='config',parse=Decimal['errors']?parseInt:parseFloat;if(obj==u||typeof obj!='object'&&!ifExceptionsThrow(Decimal,'object expected',obj,c)){return Decimal;}
if((v=obj[p='precision'])!=u){if(!(outOfRange=v<1||v>MAX_DIGITS)&&parse(v)==v){Decimal[p]=v|0;}else{ifExceptionsThrow(Decimal,p,v,c,0);}}
if((v=obj[p='rounding'])!=u){if(!(outOfRange=v<0||v>8)&&parse(v)==v){Decimal[p]=v|0;}else{ifExceptionsThrow(Decimal,p,v,c,0);}}
if((v=obj[p='toExpNeg'])!=u){if(!(outOfRange=v<-EXP_LIMIT||v>0)&&parse(v)==v){Decimal[p]=mathfloor(v);}else{ifExceptionsThrow(Decimal,p,v,c,0);}}
if((v=obj[p='toExpPos'])!=u){if(!(outOfRange=v<0||v>EXP_LIMIT)&&parse(v)==v){Decimal[p]=mathfloor(v);}else{ifExceptionsThrow(Decimal,p,v,c,0);}}
if((v=obj[p='minE'])!=u){if(!(outOfRange=v<-EXP_LIMIT||v>0)&&parse(v)==v){Decimal[p]=mathfloor(v);}else{ifExceptionsThrow(Decimal,p,v,c,0);}}
if((v=obj[p='maxE'])!=u){if(!(outOfRange=v<0||v>EXP_LIMIT)&&parse(v)==v){Decimal[p]=mathfloor(v);}else{ifExceptionsThrow(Decimal,p,v,c,0);}}
if((v=obj[p='errors'])!=u){if(v===!!v||v===1||v===0){outOfRange=id=0;Decimal[p]=!!v;}else{ifExceptionsThrow(Decimal,p,v,c,1);}}
if((v=obj[p='crypto'])!=u){if(v===!!v||v===1||v===0){Decimal[p]=!!(v&&crypto&&typeof crypto=='object');}else{ifExceptionsThrow(Decimal,p,v,c,1);}}
if((v=obj[p='modulo'])!=u){if(!(outOfRange=v<0||v>9)&&parse(v)==v){Decimal[p]=v|0;}else{ifExceptionsThrow(Decimal,p,v,c,0);}}
if((obj=obj[p='format'])!=u){if(typeof obj=='object'){for(var objP in obj){Decimal[p][objP]=obj[objP];}}else{ifExceptionsThrow(Decimal,'format object expected',obj,c);}}
return Decimal;}
function exp(n){return new this(n)['exp']();}
function ln(n){return new this(n)['ln']();}
function log(x,y){return new this(x)['log'](y);}
function maxOrMin(Decimal,args,ltgt){var m,n,i=0;if(toString.call(args[0])=='[object Array]'){args=args[0];}
m=new Decimal(args[0]);for(;++i<args.length;){n=new Decimal(args[i]);if(!n['s']){m=n;break;}else if(m[ltgt](n)){m=n;}}
return m;}
function max(){return maxOrMin(this,arguments,'lt');}
function min(){return maxOrMin(this,arguments,'gt');}
var parseDecimal=(function(){var isValid=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,trim=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,'');};return function(Decimal,x,n,b){var d,e,i,isNum,orig,valid;if(typeof n!='string'){n=(isNum=typeof n=='number'||toString.call(n)=='[object Number]')&&n===0&&1/n<0?'-0':n+'';}
orig=n;if(b==null&&isValid.test(n)){x['s']=n.charCodeAt(0)===45?(n=n.slice(1),-1):1;}else{if(b==10){return rnd(new Decimal(n),Decimal['precision'],Decimal['rounding']);}
n=trim.call(n).replace(/^\+(?!-)/,'');x['s']=n.charCodeAt(0)===45?(n=n.replace(/^-(?!-)/,''),-1):1;if(b!=null){if((b==(b|0)||!Decimal['errors'])&&!(outOfRange=!(b>=2&&b<65))){d='['+NUMERALS.slice(0,b=b|0)+']+';n=n.replace(/\.$/,'').replace(/^\./,'0.');if(valid=new RegExp('^'+d+'(?:\\.'+d+')?$',b<37?'i':'').test(n)){if(isNum){if(n.replace(/^0\.0*|\./,'').length>15){ifExceptionsThrow(Decimal,0,orig);}
isNum=!isNum;}
n=convertBase(Decimal,n,10,b,x['s']);}else if(n!='Infinity'&&n!='NaN'){ifExceptionsThrow(Decimal,'not a base '+b+' number',orig);n='NaN';}}else{ifExceptionsThrow(Decimal,'base',b,0,0);valid=isValid.test(n);}}else{valid=isValid.test(n);}
if(!valid){x['c']=x['e']=null;if(n!='Infinity'){if(n!='NaN'){ifExceptionsThrow(Decimal,'not a number',orig);}
x['s']=null;}
id=0;return x;}}
if((e=n.indexOf('.'))>-1){n=n.replace('.','');}
if((i=n.search(/e/i))>0){if(e<0){e=i;}
e+=+n.slice(i+1);n=n.substring(0,i);}else if(e<0){e=n.length;}
for(i=0;n.charCodeAt(i)===48;i++);for(b=n.length;n.charCodeAt(--b)===48;);n=n.slice(i,b+1);if(n){b=n.length;if(isNum&&b>15){ifExceptionsThrow(Decimal,0,orig);}
x['e']=e=e-i-1;x['c']=[];i=(e+1)%LOGBASE;if(e<0){i+=LOGBASE;}
if(i<b){if(i){x['c'].push(+n.slice(0,i));}
for(b-=LOGBASE;i<b;){x['c'].push(+n.slice(i,i+=LOGBASE));}
n=n.slice(i);i=LOGBASE-n.length;}else{i-=b;}
for(;i--;n+='0');x['c'].push(+n);if(external){if(x['e']>Decimal['maxE']){x['c']=x['e']=null;}else if(x['e']<Decimal['minE']){x['c']=[x['e']=0];}}}else{x['c']=[x['e']=0];}
id=0;return x;};})();function pow(x,y){return new this(x)['pow'](y);}
function random(dp){var a,n,v,i=0,r=[],Decimal=this,rand=new Decimal(Decimal['ONE']);if(dp==null||!checkArg(rand,dp,'random')){dp=Decimal['precision'];}else{dp|=0;}
n=Math.ceil(dp/LOGBASE);if(Decimal['crypto']){if(crypto&&crypto['getRandomValues']){a=crypto['getRandomValues'](new Uint32Array(n));for(;i<n;){v=a[i];if(v>=4.29e9){a[i]=crypto['getRandomValues'](new Uint32Array(1))[0];}else{r[i++]=v%1e7;}}}else if(crypto&&crypto['randomBytes']){a=crypto['randomBytes'](n*=4);for(;i<n;){v=a[i]+(a[i+1]<<8)+(a[i+2]<<16)+
((a[i+3]&0x7f)<<24);if(v>=2.14e9){crypto['randomBytes'](4).copy(a,i);}else{r.push(v%1e7);i+=4;}}
i=n/4;}else{ifExceptionsThrow(Decimal,'crypto unavailable',crypto,'random');}}
if(!i){for(;i<n;){r[i++]=Math.random()*1e7|0;}}
n=r[--i];dp%=LOGBASE;if(n&&dp){v=mathpow(10,LOGBASE-dp);r[i]=(n/v|0)*v;}
for(;r[i]===0;i--){r.pop();}
if(i<0){r=[n=0];}else{n=-1;for(;r[0]===0;){r.shift();n-=LOGBASE;}
for(i=1,v=r[0];v>=10;){v/=10;i++;}
if(i<LOGBASE){n-=LOGBASE-i;}}
rand['e']=n;rand['c']=r;return rand;}
function sqrt(n){return new this(n)['sqrt']();}
function decimalFactory(obj){function Decimal(n,b){if(typeof n==='number'){n=String(n);}
var x=this;if(!(x instanceof Decimal)){ifExceptionsThrow(Decimal,'Decimal called without new',n);return new Decimal(n,b);}
x['constructor']=Decimal;if(n instanceof Decimal){if(b==null){id=0;x['s']=n['s'];x['e']=n['e'];x['c']=(n=n['c'])?n.slice():n;return x;}else if(b==10){return rnd(new Decimal(n),Decimal['precision'],Decimal['rounding']);}else{n+='';}}
return parseDecimal(Decimal,x,n,b);}
Decimal['precision']=20;Decimal['rounding']=4;Decimal['modulo']=1;Decimal['toExpNeg']=-7;Decimal['toExpPos']=21;Decimal['minE']=-EXP_LIMIT;Decimal['maxE']=EXP_LIMIT;Decimal['errors']=true;Decimal['crypto']=false;Decimal.format={decimalSeparator:',',groupSeparator:'.',groupSize:3,secondaryGroupSize:0,fractionGroupSeparator:'\xA0',fractionGroupSize:0};Decimal.prototype=P;Decimal['ONE']=new Decimal(1);Decimal['ROUND_UP']=0;Decimal['ROUND_DOWN']=1;Decimal['ROUND_CEIL']=2;Decimal['ROUND_FLOOR']=3;Decimal['ROUND_HALF_UP']=4;Decimal['ROUND_HALF_DOWN']=5;Decimal['ROUND_HALF_EVEN']=6;Decimal['ROUND_HALF_CEIL']=7;Decimal['ROUND_HALF_FLOOR']=8;Decimal['EUCLID']=9;Decimal['config']=config;Decimal['constructor']=decimalFactory;Decimal['exp']=exp;Decimal['ln']=ln;Decimal['log']=log;Decimal['max']=max;Decimal['min']=min;Decimal['pow']=pow;Decimal['sqrt']=sqrt;Decimal['random']=random;if(obj!=null){Decimal['config'](obj);}
return Decimal;}
return decimalFactory();})();if(typeof define=='function'&&define.amd){define(function(){return decimal;});}else if(typeof module!='undefined'&&module.exports){module.exports=decimal;if(!crypto){try{crypto=require('crypto');}catch(e){}}}else{noConflict=global['Decimal'];decimal['noConflict']=function(){global['Decimal']=noConflict;return decimal;};global['Decimal']=decimal;}})(this);