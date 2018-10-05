var xmlBridgeCallback = null;
var xmlBridgeErrorCallback = null;
var xmlBridgeCursorChange = true;
function setBridgeCallBack(cbx)
{
  xmlBridgeCallback = cbx;
}
function setBridgeCursorChange(tggle)
{
  xmlBridgeCursorChange = tggle;
}
function setBridgeErrorCallBack(cbx)
{
  xmlBridgeErrorCallback = cbx;
}
 function createXMLHttpRequest()
 {
   try { return new XMLHttpRequest(); } catch(e) {}
   try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
   try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
   alert("XMLHttpRequest not supported");
   return null;
}

function loadBridgeDoc(url, headernames, headervalues)
{
  var bridgeReq = createXMLHttpRequest();
  if(bridgeReq != null)
  {
    if(xmlBridgeCursorChange == true)
    {
      document.documentElement.style.cursor = 'wait';
    }
    bridgeReq.open("post", url, true);
    if(headernames != null && headervalues != null && headernames.length == headervalues.length)
    {
      for(var i=0;i<headernames.length;i++)
      {
        bridgeReq.setRequestHeader(headernames[i], headervalues[i]);
      }
    }
    bridgeReq.onreadystatechange = function() {
      if (bridgeReq.readyState == 4)
      {
        window.status = "";
        if (bridgeReq.status == 200)
        {
          if(xmlBridgeCallback != null)
          {
            xmlBridgeCallback(bridgeReq.responseText);
/*
            if(window && window.event)
            {
              window.event.cancelBubble = false;
            }
*/
            if(xmlBridgeCursorChange == true)
            {
              document.documentElement.style.cursor = 'auto';
            }
          }
          else
          {
            alert("No callback defined for XMLHTTPRequest");
            if(xmlBridgeCursorChange == true)
            {
              document.documentElement.style.cursor = 'auto';
            }
          }
        }
        else if(xmlBridgeErrorCallback != null)
        {
          xmlBridgeErrorCallback(bridgeReq.status, bridgeReq.responseText);
          if(xmlBridgeCursorChange == true)
          {
            document.documentElement.style.cursor = 'auto';
          }
        }
        else
        {
          alert("There was a problem retrieving the XML data, and no error callback was defined:\n" + bridgeReq.statusText);
          if(xmlBridgeCursorChange == true)
          {
            document.documentElement.style.cursor = 'auto';
          }
        }
        bridgeReq.abort();
        bridgeReq = null;
      }
    };
    bridgeReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    bridgeReq.send(null);
  }
}