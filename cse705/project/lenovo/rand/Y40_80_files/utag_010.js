//tealium universal tag - utag.139 ut4.0.201506291502, Copyright 2015 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1};u.initialized=false;u.map={};u.extend=[function(a,b){try
{var spiceData="";if(window.jsonCart)
{var spiceQty="";var spicePart="";var spicePrice="";for(var icount=0;jsonCart&&jsonCart.items&&icount<jsonCart.items.length;icount++)
{if(spiceQty.length>0)
{spiceQty+="%2C";spicePart+="%2C";spicePrice+="%2C";}
var unitPrice=Number(jsonCart.items[icount].price.replace(/[^0-9\.]+/g,"")).toFixed(2);spiceQty+=jsonCart.items[icount].qty;spicePart+=decodeURIComponent(jsonCart.items[icount].partno);spicePrice+=unitPrice;}
spiceData="quantity="+spiceQty+"&item="+spicePart+"&price="+spicePrice;if(window.utag_data)
{spiceData+="&cartid="+encodeURIComponent(window.utag_data['js_cartid']);}
if(window.lmd)
{if(window.lmd.events)
{spiceData+="&events="+encodeURIComponent(window.lmd.events.toLowerCase());}}}
$("<img src='//px.spiceworks.com/px/qovs?"+spiceData+"'>").appendTo($("body"));}
catch(serr)
{}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
}};utag.o[loader].loader.LOAD(id);})("139","lenovo.ag");}catch(error){utag.DB(error);}
