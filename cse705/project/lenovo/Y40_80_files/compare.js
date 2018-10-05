var specRows = 0,
	specColumns = 0,
	compareCookieUIDomain = "",
	compareCookieExpireDate = 1,
	compareOIDS = null,
	compareTemplate = "/WW/site/templates/compare/CompareTemplate.html",
	sliderTemplate = "/WW/site/templates/compare/SliderTemplate.html";

function Set_Cookie(n, v, d) {
	document.cookie = n + "=" + v + d + "; path=/";
}

function Get_Cookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function Delete_Cookie(name) {
	Set_Cookie(name, null, getCompareCookieExpireDate(-1));
}

function compareOverlay(itemOIDs) {
	if(typeof s != 'undefined') s_clt(s.pageName+'|Compare items|Button', 'event29', 'eVar23', s.pageName+'|Compare items|Button', 'prop25', 'D=v23');
	$('#sliderTab').click();
	// if no oids are given try to pull from cookies.
	if (!itemOIDs) itemOIDs = getOidsFromCookie();
	openCompareOverlay(itemOIDs);
	return false;
}

function toggleCheckBox(oid) {
	var cbx = document.getElementById(getCheckBoxReference(oid));
	if (cbx !== null) {
		if (cbx.checked) {
			cbx.checked = false;
			if (document.getElementById(getCheckBoxReference(oid) + "_label_checked") !== null) {
				document.getElementById(getCheckBoxReference(oid) + "_label_checked").className = "cbxhide";
			}
			if (document.getElementById(getCheckBoxReference(oid) + "_label_unchecked") !== null) {
				document.getElementById(getCheckBoxReference(oid) + "_label_unchecked").className = "cbxshow";
			}
		}
	}
}

function getCheckBoxReference(oid) {
	return unescape(oid).replace(/:/g, '\\:') + '_cb';
}

function checkCompareCheckBox(oid) {
	if (isOnCookieList(oid)) {
		if (document.getElementById(getCheckBoxReference(oid)) !== null) {
			document.getElementById(getCheckBoxReference(oid)).checked = true;
			if (document.getElementById(getCheckBoxReference(oid) + "_label_checked") !== null) {
				document.getElementById(getCheckBoxReference(oid) + "_label_checked").className = "cbxshow";
			}
		}
	} else if (document.getElementById(getCheckBoxReference(oid) + "_label_checked") !== null) {
		document.getElementById(getCheckBoxReference(oid) + "_label_unchecked").className = "cbxshow";
	}
}

function getOidsFromCookie() {
	var currCookie = Get_Cookie("LnvCompare" + getCompareCookieUIDomain());
	if (currCookie !== null && currCookie !== "") {
		//get and check double entries
		var cookieVals = currCookie.split(",");
		for (var c=0;c<cookieVals.length;c++) {
			if (cookieVals[c] === "") {
				cookieVals.splice(c, 1);
				c--;
				continue;
			}
			cookieVals[c] = unescape(cookieVals[c]);
		}
		return cookieVals.join(",");
	}
	return "";
}

function getOidsFromCookieCount() {
	var currCookie = getOidsFromCookie();
	if (!currCookie) {
		return 0;
	} else {
		return currCookie.split(",").length;
	}
}

function handleCheckbox(cbx, oid) {
	var $slider = $('#sliderTab');
	if ($slider.parent().hasClass('closed') === false) {
		// if slider is open, close it (needs to be refreshed)
		$slider.click();
	}

	if (cbx.checked) {
		addCompareCookieValue(oid);
	} else {
		removeCompareCookieValue(oid);
	}

	$(document.getElementById(getCheckBoxReference(oid) + "_label_checked"))
		.add(document.getElementById(getCheckBoxReference(oid) + "_label_unchecked"))
			.toggleClass('cbxshow cbxhide');
}

function addCompareCookieValue(oid) {
	var currCookie = Get_Cookie("LnvCompare" + getCompareCookieUIDomain());
	if (!currCookie) {
		currCookie = escape(oid);
	} else {
		//get and check double entries
		var cookieVals = currCookie.split(",");
		var cookieExists = false;
		var numOIDs = 0;
		for (var c=0;c<cookieVals.length;c++) {
			if (unescape(cookieVals[c]) == oid) {
				cookieExists = true;
			}
			if (cookieVals[c] !== "") {
				numOIDs++;
			} else {
				cookieVals.splice(c, 1);
				c--;
			}
		}
		if(cookieExists === false) {
			currCookie += "," + escape(oid);
		}
		if(cookieExists === false && currCookie.split(",").length >= 2) {
			$('#compareSlider').css("visibility", "visible");
		}
	}
	clearAllCompareItems();
	Set_Cookie("LnvCompare" + getCompareCookieUIDomain(), currCookie, getCompareCookieExpireDate());
}

function removeCompareCookieValue(oid) {
	var currCookie = Get_Cookie("LnvCompare" + getCompareCookieUIDomain());
	if (currCookie !== null && currCookie !== "") {
		//get and check double entries
		var cookieVals = currCookie.split(",");
		var cookieExists = false;
		for (var c=0;c<cookieVals.length;c++) {
			if (cookieVals[c] === "") {
				cookieVals.splice(c, 1);
				c--;
				continue;
			}
			if (unescape(cookieVals[c]) == oid) {
				cookieVals.splice(c, 1);
				toggleCheckBox(oid);
				cookieExists = true;
				break;
			}
		}

		clearAllCompareItems();
		Set_Cookie("LnvCompare" + getCompareCookieUIDomain(), cookieVals.join(","), getCompareCookieExpireDate());

		if (cookieVals.length >= 2) {
			$('#compareSlider').css("visibility", "visible");
		} else {
			$('#compareSlider').css("visibility", "hidden");
		}
	}
}

function loadCookieSlider(templateFile) {
	var oids = getOidsFromCookie();
	if (oids !== "") {
		$('#sliderContent').addClass('compareLoader').empty();
		$.post(cmpr_opts.burl + "/wci.workflow:load?page=" + (!templateFile ? sliderTemplate : templateFile) + "&action=" + new Date().getTime(), {
			'oids' : oids,
			'cmd' : 'wci.workflow:friendlyload'
		}, function(compareContent) {
			$('#sliderContent').removeClass('compareLoader').html(compareContent);
		});
	}
}

function toggleAllCompareItems() {
	var currCookie = getOidsFromCookie();
	if (currCookie !== null && currCookie !== "") {
		//get and check double entries
		var cookieVals = currCookie.split(",");
		for (var c=0;c<cookieVals.length;c++) {
			if (cookieVals[c] !== "") {
				toggleCheckBox(cookieVals[c]);
			}
		}
	}
}

function clearAllCompareItems() {
	Set_Cookie("LnvCompare" + getCompareCookieUIDomain(), "", getCompareCookieExpireDate()); //set just in case if compare is invoked on same page without page transition
	Delete_Cookie("LnvCompare" + getCompareCookieUIDomain());
}

function isOnCookieList(oid) {
	var currCookie = Get_Cookie("LnvCompare" + getCompareCookieUIDomain());
	if (currCookie !== null && currCookie !== "") {
		//get and check double entries
		var cookieVals = currCookie.split(",");
		var cookieExists = false;
		for (var c=0;c<cookieVals.length;c++) {
			if (unescape(cookieVals[c]) == oid) {
				return true;
			}
		}
	}
	return false;
}

function setCompareCookieUIDomain(uiDomain) {
	compareCookieUIDomain = uiDomain;
}

function getCompareCookieUIDomain() {
	if (compareCookieUIDomain === null) {
		return "";
	}
	return compareCookieUIDomain;
}

function setCompareCookieExpireDate(expireValue) {
	compareCookieExpireDate = expireValue;
}

function getCompareCookieExpireDate(specificDays) {
	if(typeof(compareCookieExpireDate) == "undefined" || isNaN(compareCookieExpireDate) || compareCookieExpireDate <= 0) {
		return null; //session cookie
	}
	var cookieDate = new Date();
	cookieDate.setTime(cookieDate.getTime() + (parseInt((!specificDays ? compareCookieExpireDate : specificDays), 10) * 24 * 60 * 60 * 1000));
	var expires = "; expires="+cookieDate.toGMTString();
	return expires;
}

function removeColumn(oid, i) {
	$('#cmpoverlaytableheader td:nth-child(' + i + ')').add('#cmpoverlaytable td:nth-child(' + i + ')').hide();
	removeCompareValue(oid);
}

function removeCompareValue(oid) {
	removeCompareCookieValue(oid);
	var cmpArray = getOidsFromCookie();
	if (!cmpArray) {
		$.fancybox.close();
		return;
	}
	$('#fancybox-wrap').trigger('reposition');
	$.fancybox.center(true);
}

function setCompareTemplate(templateFilePath) {
	compareTemplate = templateFilePath;
}

function openCompareOverlay(itemOIDS) {
	if (!itemOIDS) return false;
	compareOIDS = itemOIDS;
	$.fancybox({
		ajax: {
			type: "POST",
			data: {
				'oids' : compareOIDS,
				'cmd' : 'wci.workflow:friendlyload'
			}
		},
		autoScale: false,
		autoDimensions: true,
		centerOnScroll: true,
		closeOnClick: false,
		enableKeyboardNav : false,
		hideOnOverlayClick: true,
		hideOnContentClick: false,
		href: cmpr_opts.burl + "/wci.workflow:load?page=" + compareTemplate + "&action=" + new Date().getTime(),
		margin: 20,
		overlayOpacity: 0.75,
		overlayColor: '#000',
		padding: 10,
		scrolling: 'yes',
		titleShow: false,
		showNavArrows: false,
		onStart: function() {
			$('#compareSlider').css('z-index', 100);
		},
		onComplete: function() {
			var html = $('html'),
				scrollPosition = [
					self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
					self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
				];
			html.data('scroll-position', scrollPosition);
			html.data('previous-overflow', html.css('overflow'));
			html.css('overflow', 'hidden');
			window.scroll(scrollPosition[0], scrollPosition[1]);
			if ($.type(window.equalHeight) === 'function') {
				var els = [
					"#cmpoverlaytable .PriceBlock > imgdiv",
					"#cmpoverlaytable .PriceBlock > dl"
				];
				$.each(els, function(i, v) {
					equalHeight($(v));
				});
			}
			if ($.type(window.getURLbyOID) === 'function') {
				$.each(compareOIDS.split(','), function(i, v) {
					var _url = getURLbyOID(v, cmpr_opts.burl, cmpr_opts.furl, cmpr_opts.file);
					if (_url !== false) {
						$('#row0_col' + (i + 1))
							.add('td.topmostrow:eq(' + i + ')')
							.add('td.bottommostrow:eq(' + i + ')')
								.find('span.legacy').wrap('a.prodLink').attr('href', _url);
					}
				});
			}
			$('#fancybox-content')
				.find('.compare').css('visibility', 'visible').end()
				.find('.add_more').click(function(e) {
					$.fancybox.close();
					e.preventDefault();
				});
			$.fancybox.resize();
			$('#fancybox-wrap').on('reposition.fancybox', function(e) {
				var _ww = $(window).width() - 60, // viewport width minus (paddingLeft + paddingRight + borderLeft + borderRight)
					_cw = $('#fancybox-content .compare #cmpoverlaytableheader').outerWidth(true),
					_wh = $(window).height() - 60, // viewport height minus (paddingTop + paddingBottom + borderTop + borderBottom)
					_ch = $('#fancybox-content .compare:first').height(),
					_sw = typeof(jQuery.scrollbarWidth) === 'function' ? $.scrollbarWidth() : 20;
				if (_cw > _ww) {
					$('#fancybox-wrap').width(_ww);
					$('#fancybox-content').css('width', 'auto').children('div').css('width', '100%');
				} else {
					$('#fancybox-wrap').css('width', 'auto');
					$('#fancybox-content').width(_cw + _sw).children('div').css('width', 'auto');
				}
				if (_ch > _wh) {
					$('#fancybox-content').height(_wh).children('div').css('height', '100%');
				} else {
					$('#fancybox-content').height(_ch).children('div').css('height', 'auto');
				}
			}).trigger('reposition.fancybox');
			$(window).on('resize.fancybox', function(e) {
				$('#fancybox-wrap').trigger('reposition');
			});
			if ($.support.leadingWhitespace === true) {
				$('#cmpoverlaytableheader, #cmpoverlaytable').css('position', 'relative');
				$('#fancybox-content > div').scroll(function(e) {
					var a = $(this).scrollTop(), b = $('#fancybox-content .add_more').outerHeight();
					if (a > b) {
						$('#cmpoverlaytableheader').css('top', a - b);
					} else {
						$('#cmpoverlaytableheader').css('top', 0);
					}
				});
			}
		},
		onCleanup: function() {
			var html = $('html'),
				scrollPosition = html.data('scroll-position');
			html.css('overflow', html.data('previous-overflow'));
			window.scroll(scrollPosition[0], scrollPosition[1]);
			$('#fancybox-wrap').off('reposition.fancybox');
			$(window).off('resize.fancybox');
		},
		onClosed: function() {
			$('#compareSlider').css('z-index', 9999999);
		}
	});
}

function checkSliderVisible() {
	if (getOidsFromCookie() === "" || getOidsFromCookie().split(",").length < 1) {
		$('#compareSlider').css("visibility", "hidden");
	} else {
		$('#compareSlider').css("visibility", "visible");
	}
}

function leftPos(obj) {
		var $this = $(obj);
		$this.css('left', ($(window).width()/2)-($this.outerWidth(true)/2));
}

function removeFromComparison(oid) {
	for (var c=0;c<compares.length;c++) {
		if (compares[c] == oid) {
			compares.splice(c, 1);
			removeCompareCookieValue(oid);
			$('#comp_' + oid.replace(/:/g, "_")).remove();
			break;
		}
	}
	if(compares.length < 2) {
		$('#sliderTab').click();
		$('#compareSlider').css("visibility", "hidden");
	}
}

function removeAllCompareItems() {
	for (var c=compares.length-1;c>=0;c--) {
		$('#comp_' + compares[c].replace(/:/g, "_")).remove();
	}
	toggleAllCompareItems();
	clearAllCompareItems();
	compares.length = 0;
	$("#sliderWrapper").empty();
	$('#sliderTab').click();
	$('#compareSlider').css("visibility", "hidden");
}