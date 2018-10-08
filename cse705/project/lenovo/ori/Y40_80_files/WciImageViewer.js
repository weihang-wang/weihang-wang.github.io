if(typeof(window.wci) === 'undefined')
{
  window.wci = {};
}

(function (wci) {
  if(!wci.imageViewer)
  {

    var ImageViewer = {};
    wci.imageViewer = ImageViewer;

    ImageViewer.refreshDisplayImage = function(tgtImgElem,srcImgElem)
    {
      tgtImgElem.attr("imgFile",srcImgElem.attr("imgFile"));
      tgtImgElem.attr("styleImgFile",srcImgElem.attr("styleImgFile"));
      tgtImgElem.attr("imgSize",srcImgElem.attr("imgSize"));              
      tgtImgElem.attr("src",srcImgElem.attr("src")); 
    }

    ImageViewer.refreshZoomImage = function(imgElem)
    {
      var imgSrc = imgElem.attr("src");
      var strEnd = imgSrc.lastIndexOf("/");
      var strStart =  imgSrc.substring(0,strEnd-1).lastIndexOf("/");
      var size = imgSrc.substring(strStart+1,strEnd);
      imgSrc = imgSrc.replace(size,'large');
      imgElem.parent().attr("href",imgSrc);
    }

    ImageViewer.handleThumbnailFallback = function(imgElem)
    {
      firstThumb = imgElem.attr("firstThumb");
      if (!firstThumb)
      {
        imgElem.parent().parent().parent().hide();
        return;
      }

      var imgSize = imgElem.attr("imgSize");
      var reqImgSize = imgElem.attr("reqImgSize");
      if (reqImgSize == null || reqImgSize == ''){
        imgElem.attr("reqImgSize",imgSize);
      }
      var imgPath = imgElem.attr("imgPath");
      var imgFile = imgElem.attr("imgFile");

      if (imgSize == 'thumbnail'){
        imgSize = 'small'
          imgElem.attr("imgSize", 'small');
      }else if (imgSize == 'small'){
        imgSize = 'main'
          imgElem.attr("imgSize", 'main');
      }else if (imgSize == 'main'){
        imgSize = 'large'
          imgElem.attr("imgSize", 'large');
      }else if (imgElem.attr("styleImgFile") != null && imgElem.attr("styleImgFile") != '' && imgElem.attr("isStyleUsed") === undefined){
        imgSize = imgElem.attr("reqImgSize");
        imgElem.attr("imgSize", imgSize);     
        imgFile = imgElem.attr("styleImgFile");
        imgElem.attr("isStyleUsed", "");   
      }else{        
        if(imgElem.attr("endFallback")=='true')
        {
          // stop infinite loop if no images found
          imgElem.attr("src", "/SEUILibrary/hightech-portal/images/pixel.gif");
          return;        
        }
        imgElem.parent().parent().parent().parent().parent().find(".imageViewerImage img").each(function(){
          imgElem.attr("src", $(this).attr("src"));
          imgElem.parent().parent().parent().addClass("selected");
          var relAtt = imgElem.parent().attr("rel");
          startIndex = relAtt.indexOf("smallImage:")+13;
          endIndex = relAtt.indexOf("'",startIndex  );
          tgtString = relAtt.substring(startIndex,endIndex);
          relAtt = relAtt.replace(tgtString,imgElem.attr("src"));
          imgElem.parent().attr("rel",relAtt);
          imgElem.parent().CloudZoom();
        });
        imgElem.attr("endFallback", "true"); 
        return;
      }

      var imageURL = imgPath + imgSize + "/" + imgFile;
      imgElem.attr("src", imageURL);

    }

    ImageViewer.isScrolledIntoView = function(elem)
    {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
    }

    ImageViewer.getScrollBarForLazyLoad = function()
    {
        var scrollBar = document.getElementById('windowDiv');
        if(scrollBar == null || scrollBar == undefined){
      	  scrollBar = window;
        }
        return scrollBar;
    }
    
    ImageViewer.setupLazyLoad = function(imageClass, imageClassLoaded, scrollComponent)
    {
      $(wci.imageViewer.getScrollBarForLazyLoad()).scroll(function() {
        var images = $(".imageViewerImage").find("img." + imageClass);
        images.each(function(i, val){
          var inView = wci.imageViewer.isScrolledIntoView( $(this) );
          if (inView)
          {
            imageSrc = $(this).attr("imgSrc");
            $(this).attr("src", imageSrc);
            $(this).removeClass(imageClass);
            $(this).addClass(imageClassLoaded);
          }
        });
      })
    }

    ImageViewer.resizeWithAspectRatio = function(imgElem)
    {
      var boxWidth = parseFloat(imgElem.css('max-width'));
      var boxHeight = parseFloat(imgElem.css('max-height'));

      var boxAspectRatio = boxWidth/boxHeight;

      var width = parseFloat(imgElem.width());
      var height = parseFloat(imgElem.height());
      var aspectRatio = width/height;

      if ( ( (boxHeight && height > boxHeight) || (boxWidth && width > boxWidth) ) 
          || ( (boxHeight && height < boxHeight) && (boxWidth && width < boxWidth) ) )
      {
        if ( aspectRatio > boxAspectRatio ) {
          boxHeight = ~~ ( height / width * boxWidth );
        } else {
          boxWidth = ~~ ( width / height * boxHeight );
        }
        imgElem.css('height', boxHeight + 'px');
        imgElem.css('width', boxWidth + 'px');
      }else{ //Fix for IE - explicit set for width and height
        imgElem.css('height', height + 'px');
        imgElem.css('width', width + 'px');
      }
    }

    ImageViewer.doInitialLoad = function()
    {
      $(wci.imageViewer.getScrollBarForLazyLoad()).trigger('scroll');
    }

    ImageViewer.handleImageDOMFallback = function(img)
    {
      //create random ID so we can grab jquery object
      var filename = img.src.substring(img.src.lastIndexOf("/")+1);
      var madeUpID = "dummyid_" + filename;
      madeUpID = madeUpID.replace(/_/gi, '');
      madeUpID = madeUpID.replace(/ /gi, '');
      madeUpID = madeUpID.replace(/\./gi, '');
      img.id = madeUpID;
      var imgElem = $('#' + madeUpID);
      
      wci.imageViewer.handleImageFallback(imgElem);
      if(imgElem.parent().hasClass('cloud-zoom'))
      {
        wci.imageViewer.refreshZoomImage(imgElem);
      }      
      imgElem.attr("isErrored","true");      
    }

    ImageViewer.handleImageFallback = function(imgElem)
    {
      var endFallback = imgElem.attr("endFallback");
      if (endFallback == "true"){
          // stop infinite loop if no images found
          imgElem.attr("src", "/SEUILibrary/hightech-portal/images/pixel.gif");
          return;
      }
      
      var imgSize = imgElem.attr("imgSize");
      var reqImgSize = imgElem.attr("reqImgSize");
      if (reqImgSize == null || reqImgSize == ''){
        imgElem.attr("reqImgSize",imgSize);
      }

      var imgPath = imgElem.attr("imgPath");
      var imgFile = imgElem.attr("imgFile");
      var fallbackImg = imgElem.attr("fallbackImg");
      if (fallbackImg != null && fallbackImg != ''){
          imgElem.attr("endFallback", "true");
          imgElem.attr("src", fallbackImg);
          return;
      }
      
      if (imgSize == 'default'){
        imgSize = 'small';
        imgElem.attr("imgSize", 'small');
      }else if (imgSize == 'small'){
        imgSize = 'main'
          imgElem.attr("imgSize", 'main');
      }else if (imgSize == 'main'){
        imgSize = 'large'
          imgElem.attr("imgSize", 'large');
      }else if (imgElem.attr("styleImgFile") != null && imgElem.attr("styleImgFile") != '' && imgElem.attr("isStyleUsed") === undefined){
        imgSize = imgElem.attr("reqImgSize");
        imgElem.attr("imgSize", imgSize);     
        imgFile = imgElem.attr("styleImgFile");
        imgElem.attr("isStyleUsed", ""); 
        if(!imgElem.parent().parent().parent().parent().find("li").hasClass("selected"))
        {
          imgElem.parent().parent().parent().parent().find("li:first-child").addClass("selected");
        }
      }else{
        imgElem.attr("src", "/SEUILibrary/hightech-portal/images/pixel.gif");
        return;
      } 

      var imageURL = imgPath + imgSize + "/" + imgFile;
      imgElem.attr("src", imageURL);      
    }

    ImageViewer.createThumbs = function ()
    {
      var elements = $("ul.imageViewerThumbs");
      elements.each( function()
          {
        var show = $(this).attr("showdynthumbs");
        if(show == 'true')
        {
          var thumbs = wci.imageViewer.createDynamicThumbsHTML($(this));
          wci.imageViewer.attachDynamicThumbsHTML($(this),thumbs);
        }
          });    
    }

    ImageViewer.createDynamicThumbsHTML = function(thumbsElem)
    {
      var imgElem = thumbsElem.parent().find("img");
      var imageId = thumbsElem.parent().find("a").attr("id");
      var styleImageFile = imgElem.attr("styleImgFile");
      var imagePath = imgElem.attr("imgPath");
      var imageFile = imgElem.attr("imgFile");
      if (styleImageFile != null && styleImageFile != ''){
        imageFile = styleImageFile;
      }  
      var maxThumbs = thumbsElem.attr("maxThumbs");

      //***
      var imgFileBegin = imageFile.substring(0, imageFile.lastIndexOf("_V1"));
      var imgFileEnd = imageFile.substring(imageFile.lastIndexOf("_V1")+3);

      //***
      var thumbs = new Array();
      for (i=1;i <= maxThumbs;i++)
      {      
      	//if this array is defined then server side fallback has been done. rely on it in that case.
      	//if no array is found, use design fallback.
      	if(typeof(thumbImages) != "undefined" && thumbImages[i] == null)
      	{
          thumbs[i-1] = null; 
      	}
      	else
      	{
          thumb = {
               "thumbImg": (thumbImages[i] != null)?thumbImages[i]:(imagePath + "thumbnail/" + imgFileBegin + "_V" + i + imgFileEnd),
               "displayImg": imagePath + "main/" + imgFileBegin + "_V" + i + imgFileEnd,
               "zoomImg": imagePath + "large/" + imgFileBegin + "_V" + i + imgFileEnd,
               "imgFile": imgFileBegin + "_V" + i + imgFileEnd
             }
          thumbs[i-1] = thumb; 
        }
      }
            
      thumbnail = {
          "imageViewerId": imageId,
          "selectedClass": "selected",
          "thumbZoomClass": "cloud-zoom-gallery",
          "imgPath": imagePath,
          "imgSize": "thumbnail",
          "thumbnails": thumbs
      }

      return thumbnail;     
    }

    ImageViewer.attachDynamicThumbsHTML = function(thumbsEle,thumbs)
    {
      var newEle = "";
      var firstThumb = true;
      for(var i=0;i<thumbs.thumbnails.length;i++)
      {
      	if(thumbs.thumbnails[i] == null)
      	{
      		continue;
      	}
      	
        var fThumb = ""; 
        if(firstThumb)
        {
          newEle=     newEle + "<li class=\""+thumbs.selectedClass+"\">";
          fThumb = " firstThumb=\"true\" "; 
          firstThumb = false;
        }
        else
        {
          newEle=     newEle + "<li>";
        }
        newEle = newEle + "<div><a class=\""+thumbs.thumbZoomClass+
        "\" href=\""+thumbs.thumbnails[i].zoomImg+"\" rel=\""+
        "useZoom: \'" + thumbs.imageViewerId + "\', smallImage: \'" + 
        thumbs.thumbnails[i].displayImg + "\' \">"+"<img  src=\""+
        thumbs.thumbnails[i].thumbImg +"\" imgPath=\"" +thumbs.imgPath
        + "\" imgFile=\"" +thumbs.thumbnails[i].imgFile + "\" imgSize=\"" +
        thumbs.imgSize + "\" styleImgFile=\"" +thumbs.thumbnails[i].styleImgFile
        + "\"" + fThumb + " style=\"display:none;\" /></a></div></li>";          
      }
      thumbsEle.append(newEle);
      thumbsEle.find(".cloud-zoom-gallery").CloudZoom();
    }

    ImageViewer.attachImageViewerEvents = function(imageViewerId, imgClickFn,thumbClickFn)
    {
      var imgElements = $("div.imageViewerImage  a");
      var thumbElements = $("ul.imageViewerThumbs  li");
      if(imageViewerId != null && imageViewerId !='')
      {
	imgElements = $("div#"+imageViewerId).find(".imageViewerImage a");
	thumbElements = $("div#"+imageViewerId).find(".imageViewerThumbs li");
      }
      imgElements.each( function()
	  {
	wci.imageViewer.attachImgEvents(imgClickFn);
	  });
      thumbElements.each( function()
	  {
	wci.imageViewer.attachThumbEvents($(this),thumbClickFn);
	  });
    }
    
    ImageViewer.attachImgEvents = function(imgClickFn)
    {

    }
    ImageViewer.attachThumbEvents = function(element, thumbClickFn)
    {
      element.hover( function()
          {
        $(this).addClass("hover");
          }, function() 
          {
            $(this).removeClass("hover");          
          }); 

      element.click( function(e)
          {
        if($(this).hasClass("selected"))
        {
          return;
        }
        var thumbAnchor = $(this).find("a");
        var normalImg = thumbAnchor.attr("href");
        if(normalImg != null && normalImg !='')
        {
          var zoomImg = thumbAnchor.attr("href");
          e.preventDefault();
          var imgAnchor = $(this).parent().parent().parent().find(".imageViewerImage a");
          imgAnchor.find("img").attr("src",normalImg);
          imgAnchor.attr("href",zoomImg);
          $(this).parent().find("li").removeClass("selected");  
          $(this).addClass("selected");
          imgAnchor.CloudZoom();    
        }
          });   
    }
    
    ImageViewer.registerFallbackEvents = function(imgViewerElem)
    {
      if(imgViewerElem != null && imgViewerElem !='')
      {
        imgViewerElem.find(".imageViewerThumbs").find("img").error(function(){
          wci.imageViewer.handleThumbnailFallback($(this))
        }); 
/*        
      	imgViewerElem.find(".imageViewerImage").find("img").error(function(){
      	  wci.imageViewer.handleImageFallback($(this));
   	  if($(this).parent().hasClass('cloud-zoom'))
   	  {
   	    refreshZoomImage($(this));
   	  }
      	});       
*/      	
        imgViewerElem.find(".imageViewerImage").find("img").load(function(){
          var imgAspectRatioResize = $(this).attr("imgAspectRatioResize");
          if (imgAspectRatioResize == null || imgAspectRatioResize == 'true'){
             wci.imageViewer.resizeWithAspectRatio($(this));
          }
          $(this).removeAttr("isStyleUsed");
          if($(this).parent().hasClass('cloud-zoom'))
          {
            $(this).parent().CloudZoom();
          }       
        }); 
      }
      else
      {
        $(".imageViewerThumbs").find("img").error(function(){
          wci.imageViewer.handleThumbnailFallback($(this))
        }); 
        $(".imageViewerThumbs").find("img").load(function(){
          $(this).attr("style", "display:inline-block;");
        });         
/*        
        $(".imageViewerImage").find("img").error(function(){
          wci.imageViewer.handleImageFallback($(this));
          $(this).attr("isErrored","true");
        });          
*/        
        $(".imageViewerImage").find("img").load(function(){
          var imgAspectRatioResize = $(this).attr("imgAspectRatioResize");
          if (imgAspectRatioResize == null || imgAspectRatioResize == 'true'){
              wci.imageViewer.resizeWithAspectRatio($(this));
          }
          $(this).removeAttr("isStyleUsed");
          if($(this).parent().hasClass('cloud-zoom'))
          {
            if($(this).attr("isErrored") == 'true')
            {
              wci.imageViewer.refreshZoomImage($(this));
              $(this).removeAttr("isErrored");
            }
            $(this).parent().CloudZoom();
          }       
        }); 
      }

    }
    
    $(document).ready(function () {
      wci.imageViewer.createThumbs();
      wci.imageViewer.registerFallbackEvents();
      wci.imageViewer.attachImageViewerEvents();
    });
  }
}(window.wci));