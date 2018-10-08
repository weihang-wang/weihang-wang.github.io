(function(win) {
  if(!win.itemstatus) {
    var itemst = {};
    win.itemstatus = itemst;
    
    itemst.iStatusMsg = null;
    itemst.iStatusMsgLong = null;
    itemst.iRb = null;
   
    itemst.hideElementByRule = function( items, mydiv, etype, eparam )
    {
      alinks = mydiv.children(etype);
      alinks.each( function( ) {
                     content = $(this).attr(eparam);
                     for( var i=0;i<items.length; i++)
                     {
                       var format1 = 'cart.workflow:AddToCart?addtocart-item-id='+items[i];
                       var format2 = '?sb='+items[i];                       
                       var format3 = 'null';
                       if( content && ( content.indexOf( format1 ) >= 0 ||
                                        content.indexOf( format2 ) >= 0 ||
                                        content == format3 ) )
                       {
                           win.itemstatus.iStatusMsg = itemstatus_iStatusMsg;
                           win.itemstatus.iStatusMsgLong = itemstatus_iStatusMsg;
                           
                           if( !win.itemstatus.iStatusMsg )
                           {
                             win.itemstatus.iStatusMsg = "Item not available";
                           }
                           if( !win.itemstatus.iStatusMsgLong )
                           {
                             win.itemstatus.iStatusMsgLong = "Item not available";
                           }
                           if( mydiv.hasClass( 'buttonText-right' ) ) // special for builder page
                           {
                             mydiv = mydiv.parent('div').parent('div');
                           }
                           
                           mydiv.html('<span class="notAvailableItem" title="'+win.itemstatus.iStatusMsgLong+'" >'+win.itemstatus.iStatusMsg+'<span>');
                       }
                     }
                   });
    }

    itemst.hideElementByRule2 = function( items, etype, eparam )
    {
      $(etype).each( function( ) {
                     var mydiv = $(this);
                     content = mydiv.attr(eparam);
                     for( var i=0;i<items.length; i++)
                     {
                       var format1 = items[i];
                       if( content && content.indexOf( format1 ) >= 0 )
                       {
                    	   win.itemstatus.iStatusMsg = itemstatus_iStatusMsg;
                           win.itemstatus.iStatusMsgLong = itemstatus_iStatusMsg;
                           if( !win.itemstatus.iStatusMsg )
                           {
                             win.itemstatus.iStatusMsg = "Item not available";
                           }
                           if( !win.itemstatus.iStatusMsgLong )
                           {
                             win.itemstatus.iStatusMsgLong = "Item not available";
                           }
                           mydiv = mydiv.closest('table');
                           mydiv.html('<tbody><tr><td><span class="notAvailableItem" title="'+win.itemstatus.iStatusMsgLong+'" >'+win.itemstatus.iStatusMsg+'<span></td></tr></tbody>');
                       }
                     }
                   });
    }
    
    itemst.hideAll = function ( items )
    {
      $( "div" ).each(
        function ()
        {
          mydiv = $(this);
          itemstatus.hideElementByRule( items, mydiv, "A", "href");
          itemstatus.hideElementByRule( items, mydiv, "BUTTON", "onclick");
        });
      itemstatus.hideElementByRule2( items, "img", "onclick");
      
      for( var i=0;i<items.length; i++)
      {
        if( typeof(eHide) == 'function' )
        {
          eHide(items[i]);
        }
      }
    }
    itemst.counter = 0;
    
    itemst.checkState = function ()
    {
      $.ajax({ url: itemstatus_eItemsUrl, dataType: "xml", success : function (xml)
               {
    	         var t;
                 var i=0;
                 var myItems = [];
                 $(xml).find('Items').each(
                   function()
                   {
                     var oids = $(this).find('OID');
                     if( oids )
                     {
                       $(oids).each( function () 
                                     {
                                       t = $(this).text();
                                       if( t && t.length > 0 )
                                       {                                    	   
                                         myItems[i++] = t;
                                       }
                                     });
                     }
                   })
                   itemstatus.doHiding( myItems );
               },
               error : function( jqXHR, textStatus, errorThrown )
               {
            	  // console.log( 'itemstatus: '+ errorThrown );
               }
             }
             );
    }
    
    itemst.doHiding = function ( items )
    {
      if( !items || items.length < 1 )
      {
        return;
      }
      win.itemstatus.hideAll(items);
    }
  }
})(window);
 
$(document).ready( function ()
                   {
                     var items = itemstatus.checkState();
                   });
 

