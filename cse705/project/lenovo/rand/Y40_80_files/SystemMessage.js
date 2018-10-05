// This .js is used with the SystemMessageTag.
// Only one tag per page is currently supported when using these methods.
// noIcon - if true then do not show the icon
  function showErrorMessage(msg,imagePath, noIcon)
  {
    if(document.getElementById('SystemMessage'))
    {
      if( noIcon )
      {
        $('#SystemMessage').html( msg );
      }
      else
      {
        var text = '<table cellspacing="0" cellpadding="2" border="0" width="100%"><tr><td width="20" height="16"><img src="'+imagePath+'/alert_static.gif" width="16" height="16" alt="" border="0"></td><td valign="top" align="left" class="errorMessage">'+msg+'</td></tr></table>';
        document.getElementById('SystemMessage').innerHTML=text;
      }
    }
    else
    {
      alert(msg);
    }
  }

  function showPositiveMessage(msg,imagePath)
  {
    if(document.getElementById('SystemMessage'))
    {
      var text = '<table cellspacing="0" cellpadding="2" border="0" width="100%"><tr><td width="20" height="16"><img src="'+imagePath+'/alert_green_static.gif" width="16" height="16" alt="" border="0"></td><td valign="top" align="left" class="positiveMessage">'+msg+'</td></tr></table>';
      document.getElementById('SystemMessage').innerHTML=text;
    }
    else
    {
      alert(msg);
    }
  }

  function showNoMessage()
  {
    if(document.getElementById('SystemMessage'))
    {
      document.getElementById('SystemMessage').innerHTML='<table cellspacing="0" cellpadding="2" border="0" width="100%"><tr><td width=\"20\" height=\"20\">&nbsp;</td></tr></table>';
    }
  }
