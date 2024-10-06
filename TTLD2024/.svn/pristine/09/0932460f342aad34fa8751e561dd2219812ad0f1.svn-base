var TimezoneOffsetFixChrome67={AsiaBangkok:1076,AsiaSaigonBefore1906:-400,AsiaSaigonBefore1911:-390,AsiaSaigonBefore1942:0,AsiaSaigonBefore1945March:-3600,AsiaSaigonBefore1945September:-7200,AsiaSaigonBefore1947:0,AsiaSaigonBefore1955:-3600,AsiaSaigonBefore1959:0,AsiaSaigonBefore1975:-3600}
var MISAJSON={type:(function(){var class2type={};var arr="Boolean Number String Function Array Date RegExp Object".split(" ");for(var n=0;n<arr.length;n++){class2type["[object "+arr[n]+"]"]=arr[n].toLowerCase();}
return function(obj){var res='';if(obj==null){res=String(obj);}else if(obj instanceof Decimal){res='decimal';}else{res=class2type[Object.prototype.toString.call(obj)]||"object";}
return res;}})(),stringify:(function(){function formatDate(n){return n<10?'0'+n:n}
var quote=(function(){var escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};return function(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}})();return function(object){var value=Ext.clone(object);var arr=[],strRet,type=this.type(value);if(type==="date"){if(isFinite(value.valueOf())){value=value.getFullYear()+"-"+(value.getMonth()+1)+"-"+value.getDate();}else{value=null;}}
type=this.type(value);switch(type){case 'number':strRet=isFinite(value)?value:String(null);break;case 'boolean':strRet=String(value);break;case 'string':strRet=quote(value);break;case 'undefined':case 'null':strRet='null';break;case 'array':for(var n=0;n<value.length;n++){arr.push(this.stringify(value[n]));}
strRet="["+arr.join(",")+"]";break;case 'decimal':strRet=value.toJSON();break;default:for(var i in value){if(Object.prototype.hasOwnProperty.call(value,i)){if(this.type(value[i])!=="undefined"){arr.push(quote(i)+":"+this.stringify(value[i]));}}}
strRet="{"+arr.join(",")+"}";break;}
return strRet;}})(),parse:(function(){"use strict";var at,ch,escapee={'"':'"','\\':'\\','/':'/',b:'\b',f:'\f',n:'\n',r:'\r',t:'\t'},text,error=function(m){throw{name:'SyntaxError',message:m,at:at,text:text};},next=function(c){if(c&&c!==ch){error("Expected '"+c+"' instead of '"+ch+"'");}
ch=text.charAt(at);at+=1;return ch;},number=function(){var number,string='';if(ch==='-'){string='-';next('-');}
while(ch>='0'&&ch<='9'){string+=ch;next();}
if(ch==='.'){string+='.';while(next()&&ch>='0'&&ch<='9'){string+=ch;}}
if(ch==='e'||ch==='E'){string+=ch;next();if(ch==='-'||ch==='+'){string+=ch;next();}
while(ch>='0'&&ch<='9'){string+=ch;next();}}
if(/[0123456789\.\,\-]$/.test(string)){var idx=string.indexOf('.');if(idx>-1){var c=0;for(var i=string.length-1;i>=idx;i--){if(string[i]=='0'){c++;}else if(string[i]=='.'){c++;break;}else{break;}}
if(c>0){string=string.substr(0,string.length-c);}}
number=parseFloat(string);if(number!==0&&String(number)!==string){number=new Decimal(string);}}
return number;},string=function(){var hex,i,string='',uffff;if(ch==='"'){while(next()){if(ch==='"'){next();var res=string,regular=/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(.)?(\d{0,9})?(Z)?(\+)?(\d{2})?(:)?(\d{2})?$/;if(string&&regular.test(string)){var dte=new Date(string);if(Ext&&Ext.browser.name==='Chrome'){var timeZoneName=Intl.DateTimeFormat().resolvedOptions().timeZone;var timeZoneObj=TimezoneOffsetFixChrome67;switch(timeZoneName){case 'Asia/Bangkok':if(dte.getTimezoneOffset()!==-420){dte=dte.addSeconds(timeZoneObj.AsiaBangkok);}
break;case 'Asia/Saigon':case 'Asia/Ho_Chi_Minh':if(dte.getTimezoneOffset()!==-420){var dte1906=new Date('1906-06-30T23:59:59');var dte1911=new Date('1911-04-30T23:59:59');var dte1942=new Date('1942-12-31T22:59:59');var dte1945March=new Date('1945-03-14T22:59:59');var dte1945September=new Date('1945-09-01T23:59:59');var dte1947=new Date('1947-04-31T23:59:59');var dte1955=new Date('1955-06-30T23:59:59');var dte1959=new Date('1959-12-31T22:59:59');var dte1975=new Date('1975-06-12T23:59:59');var timeOffset=0;if(dte<=dte1906){timeOffset=timeZoneObj.AsiaSaigonBefore1906;}else if(dte<=dte1911){timeOffset=timeZoneObj.AsiaSaigonBefore1911;}else if(dte<=dte1945March){timeOffset=timeZoneObj.AsiaSaigonBefore1945March;}else if(dte<=dte1945September){timeOffset=timeZoneObj.AsiaSaigonBefore1945September;}
else if(dte<=dte1955){timeOffset=timeZoneObj.AsiaSaigonBefore1955;}
else if(dte<=dte1975){timeOffset=timeZoneObj.AsiaSaigonBefore1975;}
dte=dte.addSeconds(timeOffset);}
break;}}
res=dte;}
return res;}
if(ch==='\\'){next();if(ch==='u'){uffff=0;for(var i=0;i<4;i+=1){hex=parseInt(next(),16);if(!isFinite(hex)){break;}
uffff=uffff*16+hex;}
string+=String.fromCharCode(uffff);}else if(typeof escapee[ch]==='string'){string+=escapee[ch];}else{break;}}else{string+=ch;}}}
error("Bad string");},white=function(){while(ch&&ch<=' '){next();}},word=function(){switch(ch){case 't':next('t');next('r');next('u');next('e');return true;case 'f':next('f');next('a');next('l');next('s');next('e');return false;case 'n':next('n');next('u');next('l');next('l');return null;}
error("Unexpected '"+ch+"'");},value,array=function(){var array=[];if(ch==='['){next('[');white();if(ch===']'){next(']');return array;}
while(ch){array.push(value());white();if(ch===']'){next(']');return array;}
next(',');white();}}
error("Bad array");},object=function(){var key,object={};if(ch==='{'){next('{');white();if(ch==='}'){next('}');return object;}
while(ch){key=string();white();next(':');if(Object.hasOwnProperty.call(object,key)){error('Duplicate key "'+key+'"');}
object[key]=value();white();if(ch==='}'){next('}');return object;}
next(',');white();}}
error("Bad object");};value=function(){white();switch(ch){case '{':return object();case '[':return array();case '"':return string();case '-':return number();default:return ch>='0'&&ch<='9'?number():word();}};return function(source,reviver){if(!source){return source;}
var result;text=source;at=0;ch=' ';result=value();white();if(ch){error("Syntax error");}
return typeof reviver==='function'?(function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}({'':result},'')):result;};}())};