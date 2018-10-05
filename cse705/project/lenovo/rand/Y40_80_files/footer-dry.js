//globals
var userChoice = true; // sentinel to guard user choice

$(function(){

    //update flag on page load
    /*<meta content="EC" name="Lenovo.Country"/>*/
    var $flag = $("meta[name='Lenovo.Country']").attr("content");

    if ($flag === null || typeof $flag === "undefined"){
        //DO OPTION
        $flag = $("#countrySelector option[selected]").attr("cc");

        if ($flag === null || typeof $flag === "undefined") {
            console.log("CC not available, parsing URL string");
            //do purl
            // or do JSLT tag?
        }
    }

    var  $flagClass = "flag-" + $flag,
        $trustClass = "trust-" + $flag;

    $(".countrySelector-flag").addClass($flagClass);
    // bugzilla 1826
    $("#truste").addClass($trustClass);

    //column behavior
    var $thisList,
        $otherList,
        $allFooterLists = $(".footer-navigation-links-list ul"),
        $allFooterHeaders = $(".footer-navigation-links-list h3"),
        $row1FooterLists,
        $row1FooterHeaders,
        $row2FooterLists,
        $row2FooterHeaders,
        $thisIndex,
        tallestList = 0,
        maxList = 0,
        rowsShown = [true, true],
        listsShown = false;          // default for medium, large is open

    //find tallest list and max list Number
    $allFooterLists.each(function(index){
        if($(this).outerHeight() > tallestList){
            tallestList = $(this).outerHeight();
        }
    });
    maxList = $allFooterLists.length;
    $(".footer-navigation-links > ul").addClass("footer-navigation-column-" + maxList);

    if (maxList === 4){
        $row1FooterLists = $allFooterLists.slice(0,2);
        $row1FooterHeaders = $allFooterHeaders.slice(0,2);
        $row2FooterLists = $allFooterLists.slice(2,$allFooterHeaders.length);
        $row2FooterHeaders = $allFooterHeaders.slice(2,$allFooterHeaders.length);
    }
    else if (maxList === 3){
        $row1FooterLists = $allFooterLists.slice(0,3);
        $row1FooterHeaders = $allFooterHeaders.slice(0,3);
    }
	else if (maxList === 2){
        $row1FooterLists = $allFooterLists.slice(0,2);
        $row1FooterHeaders = $allFooterHeaders.slice(0,2);
    }
	else if (maxList === 1){
        $row1FooterLists = $allFooterLists.slice(0,1);
        $row1FooterHeaders = $allFooterHeaders.slice(0,1);
    }
    else if (maxList === 5){
        $row1FooterLists = $allFooterLists.slice(0,3);
        $row1FooterHeaders = $allFooterHeaders.slice(0,3);
        $row2FooterLists = $allFooterLists.slice(3,$allFooterHeaders.length);
        $row2FooterHeaders = $allFooterHeaders.slice(3,$allFooterHeaders.length);
    }
    else if (maxList === 6){
        $row1FooterLists = $allFooterLists.slice(0,3);
        $row1FooterHeaders = $allFooterHeaders.slice(0,3);
        $row2FooterLists = $allFooterLists.slice(3,$allFooterHeaders.length);
        $row2FooterHeaders = $allFooterHeaders.slice(3,$allFooterHeaders.length);
    }
    //on load check for small if small, then hide lists

    if (viewport().width  < 560) {
        listsShown = true;
        listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        $("#truste a").removeClass("footer-icons-truste-logo").addClass("footer-icons-m-truste-logo");
    }
    else{
        $allFooterHeaders.addClass("footer-nav-list-open");
    }
    listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);

    //check for resize events
    $(window).resize(function(){

        $thisIndex = -1; //represents resize Event to prevent false toggles
        //headerCollapse($allFooterHeaders,$allFooterLists);
		if (typeof $row1FooterHeaders != "undefined"){
			if(($row1FooterHeaders).hasClass("footer-nav-list-open")){
				($row1FooterHeaders).addClass("footer-nav-list-collapsed").removeClass("footer-nav-list-open");
				animationToggle($row1FooterLists);
				listsShown = true;
			}
		}
        if (typeof $row2FooterHeaders != "undefined"){
            if(($row2FooterHeaders).hasClass("footer-nav-list-open")){
                ($row2FooterHeaders).addClass("footer-nav-list-collapsed").removeClass("footer-nav-list-open");
                animationToggle($row2FooterLists);
                listsShown = true;
            }
        }
        if (viewport().width  < 560 ){
            $("#truste a").removeClass("footer-icons-truste-logo").addClass("footer-icons-m-truste-logo");
        }
        else if (viewport().width >= 560){ // medium and large
            $("#truste a").removeClass("footer-icons-m-truste-logo").addClass("footer-icons-truste-logo");
        }
        if (viewport().width  < 560 ){   //small
            listsShown = true;     //force all closed
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 6 && viewport().width > 1216 && listsShown === false){ // single row
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 5 && viewport().width > 1023 && listsShown === false){ //single row

            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 4 && viewport().width > 865 && listsShown === false){ //single row
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 3 && viewport().width > 560 && listsShown === false){ //single row

            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
		else if(maxList === 2 && viewport().width > 560 && listsShown === false){ //single row

            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
		else if(maxList === 1 && viewport().width > 560 && listsShown === false){ //single row

            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }

    });

    // Click functionality
    $(".footer-navigation-links-title").click(function(){
        //cache this ul

        $thisList = $(this).siblings("ul");
        $thisIndex = $(this).parent().index(); // used for 2row function

        if(maxList === 6 && viewport().width > 1216){ // single row
            userChoice = !userChoice; // click tracker
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 6 && viewport().width <= 1216 && viewport().width  > 560){ // double row
            userChoice = !userChoice; // click tracker
            rowsShown = lists2RowController($row1FooterLists, $row1FooterHeaders, $row2FooterLists, $row2FooterHeaders, rowsShown, $thisIndex, maxList);
        }
        else if(maxList === 5 && viewport().width > 1023){ //single row
            userChoice = !userChoice; // click tracker

            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 5 && viewport().width <= 1023 && viewport().width  > 560){ // double row
            userChoice = !userChoice; // click tracker
            rowsShown = lists2RowController($row1FooterLists, $row1FooterHeaders, $row2FooterLists, $row2FooterHeaders, rowsShown, $thisIndex, maxList);
        }
        else if(maxList === 4 && viewport().width > 865){ //single row
            userChoice = !userChoice; // click tracker
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 3 && viewport().width  > 560){ // single row - no double row for three column
            userChoice = !userChoice; // click tracker
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
		else if(maxList === 2 && viewport().width  > 560){ // single row - no double row for three column
            userChoice = !userChoice; // click tracker
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
		else if(maxList === 1 && viewport().width  > 560){ // single row - no double row for three column
            userChoice = !userChoice; // click tracker
            listsShown = listsController($allFooterLists, $allFooterHeaders, listsShown);
        }
        else if(maxList === 4 && viewport().width <= 865 && viewport().width  > 560){ // double row
            userChoice = !userChoice; // click tracker
            rowsShown = lists2RowController($row1FooterLists, $row1FooterHeaders, $row2FooterLists, $row2FooterHeaders, rowsShown, $thisIndex, maxList);
        }
        else if (viewport().width  < 560){ //small
            //show this list
            if ($(this).hasClass("footer-nav-list-collapsed")) {

                //close any open lists
                $allFooterHeaders.each(function(index){
                    if ($(this).hasClass("footer-nav-list-open")){
                        $otherList = $(this).siblings("ul");
                        animationToggle($otherList);
                        classToggleClosed($(this));
                    }
                });

                animationToggle($thisList);
                classToggleOpen($(this));
            }
            //hide this list
            else if ($(this).hasClass("footer-nav-list-open")) {
                animationToggle($thisList);
                classToggleClosed($(this));
            }
        }
    });
});

//DRY Functions
function animationToggle(thisList){
    thisList.animate({
        opacity: "toggle",
        height: "toggle"
    }, 500, function() {
        // Animation complete.
    });
}

function classToggleOpen(thisList){
    thisList.removeClass("footer-nav-list-collapsed").addClass("footer-nav-list-open");
}

function classToggleClosed(thisList){
    thisList.addClass("footer-nav-list-collapsed").removeClass("footer-nav-list-open");
}

function classToggle(thisList) {
    if (thisList.hasClass("footer-nav-list-open")){

        thisList.addClass("footer-nav-list-collapsed").removeClass("footer-nav-list-open");
    }
    else{

        thisList.removeClass("footer-nav-list-collapsed").addClass("footer-nav-list-open");
    }

}



// single Row Controller
function listsController(allFooterLists, allFooterHeaders, listsShown){
    if (viewport().width >= 560) {
        if (!listsShown && userChoice) {     //show lists

            animationToggle(allFooterLists);
            classToggle(allFooterHeaders);
            listsShown = true;
        }
        else if (listsShown && !userChoice) {  //hide all lists

            animationToggle(allFooterLists);
            classToggle(allFooterHeaders);
            listsShown = false;
        }
    }
    else if (listsShown && viewport().width  < 560) { // mobile override
        allFooterLists.hide();
        classToggleClosed(allFooterHeaders);
        listsShown = false;
    }

    return listsShown;
}

// 2 Row Controller
function lists2RowController($row1FooterLists, $row1FooterHeaders, $row2FooterLists, $row2FooterHeaders, rowsShown, $thisIndex, maxList ){
    if (maxList == 4) {
        if($thisIndex == 0 || $thisIndex == 1) { //row1
            animationToggle($row1FooterLists);
            classToggle($row1FooterHeaders);
        }
        else {                                   //row2
            animationToggle($row2FooterLists);
            classToggle($row2FooterHeaders);

        }
    }
    else if (maxList == 3) {
        if($thisIndex == 0 || $thisIndex == 1) { //row1
            animationToggle($row1FooterLists);
            classToggle($row1FooterHeaders);
        }
        else {                                   //row2
            animationToggle($row2FooterLists);
            classToggle($row2FooterHeaders);

        }
    }
    else if (maxList == 5 || maxList == 6) {
        if($thisIndex == 0 || $thisIndex == 1 || $thisIndex == 2 ) { //row1
            animationToggle($row1FooterLists);
            classToggle($row1FooterHeaders);
        }
        else {                                   //row2
            animationToggle($row2FooterLists);
            classToggle($row2FooterHeaders);
        }
    }
    return rowsShown;
}

/*-------------Fix to get viewport size instead of window to match CSS media queries---------*/
/*---From http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript---*/
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}