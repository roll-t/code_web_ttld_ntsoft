var MISA=MISA||{}
MISA.Service={ajaxWithPath:function(url,data,config,callback){if(config.host){url=config.host+url;}if(config.getDefaultPath){}
else{url=MISA.CommonFn.getBaseUrl()+url;}
var ajaxObj=config?config:{};if(!ajaxObj.hasOwnProperty('type')){ajaxObj.type="POST";}
if(!ajaxObj.hasOwnProperty('dataType')){ajaxObj.dataType="json";}
if(!ajaxObj.hasOwnProperty('contentType')){ajaxObj.contentType="application/json; charset=utf-8";}
if(!ajaxObj.hasOwnProperty('url')){ajaxObj.url=url;}
if(!ajaxObj.hasOwnProperty('data')){this.processData(data);ajaxObj.data=MISAJSON.stringify(data);}
if(ajaxObj.complete==undefined){ajaxObj.complete=function(msg){if(msg.status==200){var data=MISAJSON.parse(msg.responseText);if(data.d){if(callback){callback(data.d);}}else if(data){if(callback){callback(data);}}
else if(data.Message&&data.Message.indexOf('Authentication failed.')>=0){MISA.CommonFn.redirectUrl('/Logout.aspx');}else{}}else if(msg.status==401){MISA.CommonFn.redirectUrl('/Logout.aspx');}}}
if(ajaxObj.error==undefined){ajaxObj.error=function(e){console.log('server-side failure with status code '+e.status);}}
$.ajax(ajaxObj);},ajax:function(serviceName,functionName,data,config,callback){var url=this.getServicePath(serviceName,functionName);this.ajaxWithPath(url,data,config,callback);},getServicePath:function(serviceName,functionName){return 'Service/'+serviceName+'.svc/json/'+functionName;},processData:function(data){},}