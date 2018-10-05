Date.prototype.addHours = function(h)
{
 this.setTime(this.getTime() + (h*60*60*1000));
 return this;
}

var numCrumbs = 0;

function setCrumbTail( crumbTailTxt )
{
  crumbId = 'crumb'+(crumbCount-1);
  var elem = document.getElementById(crumbId);
  if( elem )
  {
    elem.innerHTML='<h1>'+crumbTailTxt+'</h1>';
  }
}

function setCrumbDetail(crumbdetail)
{
  var elem = document.getElementById('crumbdetail');
  if( elem )
  {
    elem.innerHTML=crumbdetail;
  }
}

function setCrumbDisplay(crumb_id, disp)
{
}

function hideCrumbs()
{
}

function showCrumbs()
{
}

function showCrumb2()
{
}

function setNumCrumbs()
{
  setInfo(0);
}

function highlightCrumb(crumbIndex)
{
}

function setInfo(step)
{
}

function setBreadCrumb2(text)
{
}

function showCategoryInBreadCrumb(family, text)
{
}

function setWorkingAndPromoCategory(work_id, promo_id)
{
  setWorkingCategory(work_id);
  setPromoCategory(promo_id);
}

function setWorkingCategory(category_id)
{
  var workc = document.getElementById('WorkingCategory');
  if( workc != null )
  {
    workc.value = category_id;
  }
}

function setPromoCategory(category_id)
{
  var promoc = document.getElementById('PromoCategory');
  if( promoc != null )
  {
    promoc.value = category_id;
  }
}

function startSolutionNoAutomaticParamsWithMessage(alertMsg, targetWorkflow, params)
{
  alert(alertMsg);
  if(params != null && params != "")
  {
    if(targetWorkflow.indexOf("?") > 0)
    {
      targetWorkflow += '&' + params;
    }
    else
    {
      targetWorkflow += '?' + params;
    }
  }
  showInPopup(targetWorkflow,'');

}
function showInPopup(wURL, wFeatures)
{
  if( !wFeatures )
  {
    wFeatures = 'height=420, width=800, resizeable=yes, modal=yes, alwaysRaised=yes';
  }

  var wAnswer;
  var wParams = '';
  wAnswer=window.open(wURL, wParams , wFeatures);
  wAnswer.focus();
}
function startSolutionNoAutomaticParams(targetWorkflow, params)
{
  if(params != null && params != "")
  {
    if(targetWorkflow.indexOf("?") > 0)
    {
      targetWorkflow += '&' + params;
    }
    else
    {
      targetWorkflow += '?' + params;
    }
  }
  loadContent(targetWorkflow);
}
function loadContent(url, timeout)
{
  document.location.href = url;
}

var bpeParams = "";

function setBPEParams(params)
{
  bpeParams = params;
}
function executeOnEnterKey(event, codeToExecute)
{
  if (window.event && window.event.keyCode == 13)
  {
    eval(codeToExecute);
  }
  else if(event && event.which == 13)
  {
    eval(codeToExecute);
  }
  else
  {
    return true;
  }
}
