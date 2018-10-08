

function getHtml(pageUrl, errorStatus) {
	$.ajax({
		ignoreErrors : false,
		url : pageUrl + "?errorStatus=" + errorStatus,
		type : "GET",
		dataType : "html",
		//timeout : 3000,
		success : function(data) {
			$('#unavailableDiv').html(data);
		},
		error : function(data, status, validate) {
			$('#unavailableDiv').html('<h1>Unavailable</h1>Tried to access error page but even that is unavailable: ' + pageUrl);
		}
	});
}

function showForm(continueUrl, errorUrl) {
	floatingPopupShowUpperRightCloseButton(true);
	$
			.ajax({
				ignoreErrors : false,
				url : continueUrl,
				type : "GET",
//				timeout : 3000,
				dataType : "html",
				beforeSend : function() {
					openFloatingPopup(
							"<div id='unavailableDiv' style='height:460px;width:300px'>" +
							"  <img src='/SEUILibrary/hightech-portal/images/ajax-loader.gif'/>" +
							"</div>",
							'unavailableDiv');
				},
				success : function(data) {
					$('#unavailableDiv').html(data);
				},
				error : function(data, status, validate) {
					getHtml(errorUrl, status);
				},
				complete : function() {
				}
			});
}
