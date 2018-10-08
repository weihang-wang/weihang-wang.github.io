function initializeMenu(selectedMenu) {}
function setMenuId(elem) {}
function getMenuId() {}
function addRefId(menuId) {}
function openSubmenu(e) {}
function closeSubmenus(e) {}
function followLink(e) {
	var url = $(e.currentTarget).attr('href');
	window.location.href = url;
}
function init(selectedMenu) {}

jQuery(function($) {
	/* close typeahead in search if clicked outside */
	$(document).on('click.presearch', function(e) {
		var tgt = e.target, ele = ".preSearchContent";
		if (!$(tgt).is(ele) && !$(tgt).parents().is(ele) && $(ele).is(':visible')) {
			$(ele).hide();
		}
	});
});