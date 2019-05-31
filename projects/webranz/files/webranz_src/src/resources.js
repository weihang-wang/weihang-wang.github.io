if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function(require, exports) {
    /* local version */     
    /*
    var server        = "localhost";
    var absolute_path = "http://" + server + ":8080/WebRanz/websites/rand/showcase/";
    //*/
    
    /* remote version */
    //*
    var webranz_server          = "50.129.86.149";
    var webranz_port            = "8080";
    var webranz_randomize_path  = "http://" + webranz_server + ":" + webranz_port + "/WebRanz/";
    var webranz_absolute_path   = webranz_randomize_path + "testwebsites/rand/showcase/";
    //*/

    var webranz_redirectUrl = webranz_randomize_path + "proxy/phps/redirect.php?link=";
	var webranz_bypassUrl   = webranz_randomize_path + "proxy/phps/bypassUrl.php?link=";
    
    /**************************			Mac 		*****************************/
    /*		randomize.js: /Library/Tomcat/Home/webapps/WebRanz/src/ 	*/
    var crawl_sites_path = "/Users/weiwei/Documents/workspace/crawl-sites/";

    /**************************			Ubuntu		*****************************/
    /*		randomize.js: /var/lib/tomcat7/webapps/ROOT/abp/randomize/src/	 	*/
    //var randomize_path = "http://" + server + ":8080/abp/randomize/";
    //var crawl_sites_path = "/home/weiwei/workspace/crawl-sites/";

    function getCrawlSitesPath() {
        return crawl_sites_path;
    }

	function getServer() {
	    return webranz_server;
	}	
    function getAbsolutePath() {
	    return webranz_absolute_path;
	}
    function getRedirectUrl() {
	    return webranz_redirectUrl;
	}
    function getBypassUrl() {
	    return webranz_bypassUrl;
	}
    function getRandomizePath() {
        return webranz_randomize_path;
    }
    exports.getServer = getServer;
    exports.getAbsolutePath = getAbsolutePath;
    exports.getRedirectUrl = getRedirectUrl;    
    exports.getBypassUrl = getBypassUrl;
    exports.getRandomizePath = getRandomizePath;
    exports.getCrawlSitesPath = getCrawlSitesPath;

});