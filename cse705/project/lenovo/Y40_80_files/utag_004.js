//tealium universal tag - utag.88 ut4.0.201408191907, Copyright 2014 Tealium.com Inc. All Rights Reserved.
if(typeof utag.ut=="undefined"){utag.ut={};}
utag.ut.libloader2=function(o,a,b,c,l){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.async=true;b.src=o.src;if(o.id){b.id=o.id}
if(typeof o.cb=='function'){b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb();}};b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb();}};}
l=o.loc||'head';c=a.getElementsByTagName(l)[0];if(c){if(l=='script'){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}
utag.DB("Attach to "+l+": "+o.src);}};try{(function(id,loader){var u=utag.o[loader].sender[id]={};u.ev={'view':1};u.initialized=false;u.map={};u.extend=[function(a,b){if(typeof jQuery!=="undefined"){$(function(){$("a[href*='.ibm.com/']").attr("target","_blank").addClass("externalLink");});}}];u.send=function(a,b){if(u.ev[a]||typeof u.ev.all!="undefined"){var c,d,e,f,i;u.data={};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'){e=u.map[d].split(',');for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
}};utag.o[loader].loader.LOAD(id);})('88','lenovo.main');}catch(e){}
