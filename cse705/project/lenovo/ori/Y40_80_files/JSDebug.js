var debugWinReady = false;
var debug = false;
var debugWin = null;
var message = "";
var maxChars = 25000;

//open a debug window if debug flag is on
function setDebugSize(newSize)
{
	if(typeof(debugAllowed) == "undefined" || debugAllowed == false)
	{
		return;
	}	
  if(newSize>100)
  {
    maxChars=newSize;
  }
}

//open a debug window if debug flag is on
function setDebug(on, consoleName)
{
	if(typeof(debugAllowed) == "undefined" || debugAllowed == false)
	{
		return;
	}
	
	//does not work properly on IE.
  if(/MSIE (\d+\.\d+);/.test(navigator.userAgent))
  {
    return;
  }
	
  if(on==true && debug==false)
  {
    debugWin = window.open('', 'JSDebug', '');
    debug=true;
    printInitialMessage((consoleName != null?consoleName:""));
  } else if(on==false)
  {
    debugWin.close();
    debugwinReady = false;
    debug=false;
    message="";
  }
}

function printInitialMessage(consoleName)
{
	if(typeof(debugAllowed) == "undefined" || debugAllowed == false)
	{
		return;
	}
    debugWinReady = true;
    printDebug(consoleName + " debug console:");
    printDebug(""+new Date());
    printDebug("------------------------------------------------------------------------");
}

function addDebugRow(text)
{
	if(typeof(debugAllowed) == "undefined" || debugAllowed == false)
	{
		return;
	}	
  if(debugWinReady == true)
  {
    //show only last maxChars chars
    var totlen = message.length + text.length;
    if(totlen > maxChars)
    {
      message=message.substring(0,maxChars -(totlen-maxChars));
    }

    text = text.replace(/"/gi  , '&quot;');
    text = text.replace(/>/gi  , '&gt;');
    text = text.replace(/</gi  , '&lt;');
    text = text.replace(/\r/gi, '');
    text = text.replace(/\n/gi, '<BR>');

    message += (new Date()+" :: "+text+"<br>");

    if(debugWin&&!debugWin.closed&&debugWin.document)
    {
      debugWin.document.open();
      debugWin.document.write(message);
      debugWin.document.close();
    }else
    {
       debugwinReady = false;
       debug=false;
    }
  }
}

function printDebug(text)
{
	if(typeof(debugAllowed) == "undefined" || debugAllowed == false)
	{
		return;
	}
	
  if(debug ==true && debugWin != null  && debugWinReady == true)
  {
    addDebugRow(new String(text));
  }
}
