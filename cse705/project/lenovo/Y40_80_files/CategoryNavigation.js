  function issCN_selectData( level, pos, prefix, parentPos )
  {
    var choises = eval(prefix+"LevelChoises")
    if( level > 0 )
    {
      if( level > 1 )
      {
        choises[level-2] = parentPos
      }
      choises[level-1] = pos
    }
  }
    
  function issCN_showPopup( level, pos, prefix, parentPos ,catalogType)
  {
    var p = document.getElementById( prefix+level )
    var myOffset=null;
    if( p )
    {
      if( level == 0 )
      {
        $('#'+prefix).fadeIn("fast")
        $('#'+prefix+'Catalog').addClass('categoryNaviCatalogHover')
        myOffset = $('#'+prefix).parent().offset()
      }
      issCN_selectData( level, pos, prefix, parentPos )
      p.innerHTML = issCN_getEvenLevelChoises(level, prefix,catalogType)

      if( myOffset )
      {
        $('#'+prefix+level).css('margin-left',myOffset.left-13)
      }
      $('#'+prefix+level).fadeIn("fast")
      var cCanHide = eval(prefix+"CanHide")  
      cCanHide[0] = true;
    }
  }
  function issCN_out( prefix )
  {
    issCN_setCanHide(0,prefix)  
  }
  function issCN_in( prefix )
  {
    issCN_clearHide(0,prefix)  
  }

  function issCN_clearHide( level, prefix )
  {
    var cHideAsked = eval(prefix+"HideAsked")
    var cCanHide   = eval(prefix+"CanHide")
    cHideAsked[0] = false;
    cCanHide[0]   = false;
  }
  function issCN_setCanHide( level, prefix )
  {
    var cCanHide = eval(prefix+"CanHide")
    cCanHide[0] = true;
    issCN_askHide( 0, prefix )
  }
  function issCN_askHide( level, prefix )
  {
    var cHideAsked = eval(prefix+"HideAsked")
    if(cHideAsked[0])
    {
      return;
    }
    cHideAsked[0] = true;
    setTimeout("issCN_hidePopup("+level+",'"+prefix+"')", 100 ); 
  }

  function issCN_hidePopup( level, prefix )
  {
    var cHideAsked = eval(prefix+"HideAsked")
    var cCanHide   = eval(prefix+"CanHide")
    
    if( !cHideAsked[0] ) // hide cleared
    {
      return
    }
    if( !cCanHide[0] )
    {
      return
    }
    cHideAsked[0] = false;

    for( var i=0; i<5; i++)
    {
      $('#'+prefix+i).fadeOut()
    }
    $('#'+prefix).fadeOut()
    $('#'+prefix+'Catalog').removeClass('categoryNaviCatalogHover')
  }
  function issCN_getEvenLevelChoises(level, prefix, catalogType)
  {
    var myArr = eval(prefix+"Data")
    var choises = eval(prefix+"LevelChoises")
    var target = eval(prefix+"Target")
      
    var i=0
    var lev=level
    while( lev > 0 )
    {
      myArr = myArr[choises[i]].children
      lev--
      i++
    }

    var mycont = "<div class=\"categoryNaviGroup\" ><ul class=\"categoryNaviLevel"+level+"\">"
    var nlev = level+1
    for( var i=0; myArr && i<myArr.length; i++)
    {
      if( myArr[i].type == "adjustment" )
      {
        var methods =  "";
        if( level < 1 )
        {
          methods = "onClick=\"issCN_showPopup("+nlev+","+i+",'"+prefix+"',"+i+",'"+catalogType+"');issShowCategoryInElement('"+myArr[i].oid+"','"+target+"')\" "
        }
        else
        {
          methods = "onClick=\"issShowAdjustmentInElement('"+myArr[i].oid+"','"+target+"',true,'"+myArr[i].coid+"')\" "
        }
        
        mycont += "<li onMouseOver=\"issCN_hoverClass(this, true, 'categoryNaviGroupInPromo')\" onMouseOut=\"issCN_hoverClass(this, false, 'categoryNaviGroupInPromo')\" class=\"categoryNaviGroupInPromo\"><span class=\"categoryNaviGroupTitle\" "+methods+">"+myArr[i].name+"</span></li>";
        continue;
      }
      
      var methods = "onClick=\"issShowCategoryInElement('"+myArr[i].oid+"','"+target+"')\" "
      mycont += "<li onMouseOver=\"issCN_hoverClass(this, true, 'categoryNaviGroupIn')\" onMouseOut=\"issCN_hoverClass(this, false, 'categoryNaviGroupIn')\" class=\"categoryNaviGroupIn\"><span class=\"categoryNaviGroupTitle\" "+methods+">"+myArr[i].name+"</span>";
      var chArr = myArr[i].children
      if( chArr && chArr.length > 0 )
      {
        var njlev = nlev+1
        mycont += "<ul class=\"categoryNaviLevel"+level+"\">"
        for( var j=0; j<chArr.length; j++ )
        {
          var chMethods = "onClick=\"issCN_showPopup("+njlev+","+j+",'"+prefix+"',"+i+",'"+catalogType+"');issShowCategoryInElement('"+chArr[j].oid+"', '"+target+"', "+(chArr[j].children?false:true)+",'"+catalogType+"'); return false\" "
          if( njlev > 2 )
          {
            chMethods = "onClick=\"issCN_showPopup("+njlev+","+j+",'"+prefix+"',"+i+",'"+catalogType+"');issShowCategoryInElement('"+chArr[j].oid+"', '"+target+"', "+(chArr[j].children?false:true)+",'"+catalogType+"'); issCN_setCanHide('"+njlev+"','"+prefix+"');return false\" "
          }
          mycont += "<li class=\"categoryNaviLink\" onMouseOver=\"issCN_hoverClass(this, true, 'categoryNaviLink')\" onMouseOut=\"issCN_hoverClass(this, false, 'categoryNaviLink')\" "+chMethods+">"+chArr[j].name+"</li>";
        }
        mycont += "</ul>"
      }
      mycont += "</li>"
    }
    mycont+="</ul></div>"
    return mycont;
  }
  function issCN_hoverClass(elem, turnOn, clName)
  {
    if( turnOn )
    {
      elem.className = clName+'Hover';
    }
    else
    {
      elem.className = clName;
    }
  }
