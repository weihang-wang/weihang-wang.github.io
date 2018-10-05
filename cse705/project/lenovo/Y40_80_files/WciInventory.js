if(typeof(window.wci) === 'undefined')
{
  window.wci = {};
}

(function (wci) {
  if(!wci)
  {
    wci = {};
  }
  
  if(!wci.inventory)
  {
    wci.inventory = {};    
  }
   
  wci.inventory.AvailabilityHandler = function(options) {
	  var defaults = {
	    maximumReqInQueue: 4,
	    maximumWaitTime: 2000,
	    successFn: this.renderResults,
	    completFn: function(){},
	    elementIdPostFixDelimiter: '_',
	    elementIdPostFix: 'oid',
	    itemWrapperEleId: '#itemWrapper',
	    availabilityEleId: '#availability',
	    estimatedShipEleId: '#estimatedship',
	    addToCartEleId: '#addtocart',
	    hideDepletedItem: false,
	    successFnExtraParam: this,
	  };
	  this.options = $.extend({},defaults,options);
	  this.stackReq = false;
	  this.reqItems = [];
	  this.reqCounter = 0; 
	  this.repeatPost = false; 
  }

  wci.inventory.AvailabilityHandler.createInstance = function(options) {
    wci.inventory.availabilityHandlerInstance = new wci.inventory.AvailabilityHandler(options);
	return wci.inventory.availabilityHandlerInstance;
  }
  
  wci.inventory.AvailabilityHandler.getInstance = function(options) {
	if(wci.inventory.availabilityHandlers ==  undefined)
	{
	  wci.inventory.availabilityHandlers = new Object();  
	}
	var availabilityHandlerInstance = wci.inventory.availabilityHandlers[options];
    if(availabilityHandlerInstance == null || availabilityHandlerInstance == undefined) {
    	availabilityHandlerInstance = new wci.inventory.AvailabilityHandler(options);
    	wci.inventory.availabilityHandlers[options] = availabilityHandlerInstance;
    }    
    return availabilityHandlerInstance;
  };  
  
  wci.inventory.AvailabilityHandler.prototype.getInventoryItems = function(url, groupName, itemCode, oid) {
    if( this.reqCounter == this.options.maximumReqInQueue )
    {
      this.stackReq = false;
      this.reqCounter = 0;
      this.sendReqs(this);      
    }
    this.reqCounter = this.reqCounter + 1;
    this.reqItems.push({url: url, groupName: groupName, itemCode: itemCode, oid: oid}); 
    if(this.options.maximumWaitTime != null && this.repeatPost == false)
    {
      setInterval(this.sendReqs,this.options.maximumWaitTime,this);
      this.repeatPost = true;
    }          
  }
    
  wci.inventory.AvailabilityHandler.prototype.sendReqs = function(ah)
  {
    reqSize = ah.reqItems.length;
    if( reqSize > 0)
    {
      var reqs = [];
      for (var i = 0; i < reqSize; i++)
      {
        reqs.push(ah.reqItems.shift());
      }
      var items = {
        Items: {
          Item: [ ]      
        }   
      };    

      for (var i = 0; i < reqs.length; i++)
      {
        var req = reqs[i];
        items.Items.Item.push({GroupName: req.groupName, ItemCode: req.itemCode, Oid: req.oid});
      }
	  var ajaxOpts = {
        url: reqs[0].url,
        data: JSON.stringify(items),
        dataType: 'json',
        contentType: 'application/json',
        type: 'post',
        cache: false,
        success: ah.options.successFn,
        successExtraParam: ah.options.successFnExtraParam
	  };
	  wci.inventory.AvailabilityHandler.getAvailability(ajaxOpts);            
    }     
  }
  
  wci.inventory.AvailabilityHandler.getItemAvailability = function(url, options)
  {
	ah = wci.inventory.AvailabilityHandler.getInstance(options);
    this.opts = ah.options;
    $.extend(this.opts,options);
	var ajaxOpts = {
      url: url,
      dataType: 'json',
      type: 'get',
      cache: false,
	  success: this.opts.successFn,
	  complete: this.opts.completeFn,
	  successExtraParam: this.opts.successFnExtraParam
	};
	wci.inventory.AvailabilityHandler.getAvailability(ajaxOpts);   
  }
  
  wci.inventory.AvailabilityHandler.getAvailability = function(ajaxOpts)
  {	 
    wci.ajaxEx({
      url: ajaxOpts.url,
      data: ajaxOpts.data,
      dataType: ajaxOpts.dataType,
      type: ajaxOpts.type,
      cache: ajaxOpts.cache,
      contentType: ajaxOpts.contentType,
      success: function(data, textStatus, jqXHR) { ajaxOpts.success(data, textStatus, jqXHR, ajaxOpts.successExtraParam)},      
      complete: ajaxOpts.complete
    });    
  }  
  
  wci.inventory.AvailabilityHandler.prototype.renderResults = function(data, textStatus, jqXHR, ah)
  {
    if(data.Items.Item)
    {
      data.Items.Item = $.makeArray(data.Items.Item);
      for(var i = 0; i < data.Items.Item.length; i++)
      {
        var item = data.Items.Item[i];
        var inventoryMsg = item.InventoryMessage;
        var estimatedShipMsg = item.EstimatedShipMessage;
        var inventoryAvailable = item.InInventory; 
        var postFix = '';
        if(ah.options.elementIdPostFix == 'oid')
        {
          postFix = item.Oid.replace(/:/g,ah.options.elementIdPostFixDelimiter);	
        }
        else if(ah.options.elementIdPostFix == 'groupcode')
        {
        	//TODO: get the pattern also as input in handler
          postFix = '';
        }        
        if (inventoryAvailable == 'false' && ah.options.hideDepletedItem == 'true')
    	{
          if($(ah.options.itemWrapperEleId+postFix).length > 0)
    	  {
            $(ah.options.itemWrapperEleId+postFix).css("visibility", "hidden");
    	  }    	
    	}
        else
    	{
          if($(ah.options.availabilityEleId+postFix).length > 0)
    	  {
            $(ah.options.availabilityEleId+postFix).html(inventoryMsg);
    	  }
          if($(ah.options.estimatedShipEleId+postFix).length > 0)
    	  {
            $(ah.options.estimatedShipEleId+postFix).html(estimatedShipMsg);
    	  }
          if(inventoryAvailable == 'false' && $(ah.options.addToCartEleId+postFix).length > 0)
          {
            $(ah.options.addToCartEleId+postFix).css("visibility", "hidden");
          }      	
    	}      
      }
    }
  }       
}(window.wci));
