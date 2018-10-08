/* jQuery remove Genuine tooltip plugin
* ----------------------------------------------------------
* Author: J Reid Linker/LENOVO
* Version: 1.0
* Date: 2011-Aug-01
*/

// keep legacy functions to avoid errors (i hope)
function ShowToolTip(evt, holdMod){
  if(typeof(jQuery) != "undefined") {
    // in case this is still used someplace?
    $(this).removeGenuine();
  }
}
function HideToolTip(){}

// auto-executes; no configuration
if(typeof(jQuery) != "undefined") {
(function($) {
  $.fn.removeGenuine = (function(options) {
    // initial context
    var context = $('body');

    // the main function
    function removeGenuine(_context) {
      // if context is defined means is the first init, if not use 'this'
      var context = _context || this;

      // if context element is not present return nothing, can't chain anyway
      if (!context.length) return;

      // find all links with "javascript:ShowToolTip()" as href value
      var genTip = context.find('a[href*="ShowToolTip"], a[href*="http://www.microsoft.com/genuine"]');

      if (genTip.length) {
        // unwrap contents of each link
        $.each(genTip, function(i) {
          $(this).contents().unwrap().wrap('<nobr></nobr>');
        });
      }

      // make it chainable
      return context;
    }

    function removeStrong(_context) {
      // if context is defined means is the first init, if not use 'this'
      var context = _context || this;

      // if context element is not present return nothing, can't chain anyway
      if (!context.length) return;

      // find all strong/bold nodes with contents containing "GB" (case-sensitive)
      var strongNode = context.find('strong:contains("GB"), b:contains("GB"), strong:contains(" 1 Go"), b:contains("1 Go"), strong:contains("2 Go"), b:contains("2 Go"), strong:contains("3 Go"), b:contains("3 Go"), strong:contains("4 Go"), b:contains("4 Go"), strong:contains("6 Go"), b:contains("6 Go"), strong:contains("8 Go"), b:contains("8 Go")');

      if (strongNode.length) {
        // unwrap contents of each node
        $.each(strongNode, function(i) {
          $(this).contents().unwrap();
        });
      }

      // make it chainable
      return context;
    }

    // ajax complete hook (for builder, faceted browse, etc)
    $(document).ajaxComplete(function(e, xhr, settings) {
      removeGenuine(context);
      removeStrong(context);
    });

    // first init
    removeGenuine(context);

    // also init on document ready
    $(document).ready(function() {
      removeGenuine(context);
      removeStrong(context);
    });

    // return the function for future calls
    // for example on ajax callback for the loaded content if needed
    return removeGenuine;
  })();

  // phew...it works?
})(jQuery);
}