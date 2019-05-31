(function() {
  
	var cnt = 10;
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'attributes') {
				console.log('attr mutation: ', mutation.attributeName, attributeNamespace);
			}
		
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var node = mutation.addedNodes[i];          
		  //console.log(node, mutation);
          //console.log(document.head);
          //console.log("---------------------\n");
          
				//if (node.className) {
					//if (node.className.indexOf('ui-tabs-panel')!==-1 && node.id.indexOf("new-posts")===-1 && node.id.indexOf("hot-posts")===-1) {
					//if (node.className.indexOf('ui-tabs-panel')!==-1) {
					//	console.log('===ui-tabs-panel===', node, node.getAttribute("id").toString());
					//}
					//node.className = node.className;
          		//}
          /*
          		var children = node.childNodes;
           		for (var i = 0; i < children.length; i++) {
            //console.log(children[i]);
            		var ss = children[i].nodeName.toLowerCase();
            		if (ss === 'img' || ss === "script") {
              			children[i].id = "abcd";
              //console.log(children[i].src);
            		}
          		}*/
        	}
      	});      
    });

	console.log("Addobserver: ", document, document.head);
    observer.observe(document, {
    	childList: true,
    	subtree: true,
    	attribute: true,
    });
    
}).call(this);
