$('document').ready(function(){
	$('.button-full').each(function(){
		var pageType = $('meta[name="PageType"]').attr('content');
		if(pageType == "ProductPage")
		{
			//swap out the add to cart link with the builder link
			var addToCartLink= $(this).attr('HREF');
			var oid = $('meta[name="metaidentifier"]').attr('content');
			var re = /.+?(?:com)/;
			var friendly_url = addToCartLink.match(re);

			if(typeof oid != 'undefined' && typeof friendly_url != 'undefined')
			{
				$(this).attr('href', friendly_url[0] + "/outlet_us/builder/?sb=" + oid);
			}
		}
	});
});

