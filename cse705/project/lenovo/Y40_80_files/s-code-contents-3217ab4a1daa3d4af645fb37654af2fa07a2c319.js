// s_code_setup.js
// Copyright 2011-2013 Adobe, Inc. All Rights Reserved
// More info available at http://www.omniture.com
// UPDATED: 28-July-2015
var s_fileVer='150728', 

adobeAnalytics = {
	/* 
	   The "lkup" object contains a function for each 'cc' (country code) and
	   'bu' (business unit) combination. These functions return the report
	   suite object that will be used by that combination of cc/bu.
	   When a new report suite is added to SC at least one function should be
	   added to this "lkup" object for that report suite.
	   Example:
	   If a new US report suite with the ID "lenovousabc" is created
	   for the "abc" business unit, a new function should be added to this
	   "lkup" object. The name of the function should contain the country code 
	   and business unit seperated by an underscore "_".
	   	   us_abc: function() { return 'lenovousabc', cc:'us', bu:'abc' }
	*/
	lkup: {
		/* ca - Canada */
		ca_public		: function() { return { rs:'lenovocapub,lenovoglobal',		cc:'ca', bu:'public'		} },	// 140513
		ca_support		: function() { return { rs:'lenovocapub,lenovoglobal',		cc:'ca', bu:'support'		} },	// 140521
		ca_epp			: function() { return { rs:'lenovocaepp,lenovoglobal,lenovocapub',		cc:'ca', bu:'epp'			} },	// 140513
		ca_affinity		: function() { return { rs:'lenovocaaffinity,lenovoglobal,lenovocapub',	cc:'ca', bu:'affinity'		} },	// 140513
		ca_cepp			: function() { return { rs:'lenovocaaffinity,lenovoglobal,lenovocapub',	cc:'ca', bu:'cepp'			} },	// 140513
		ca_cpp			: function() { return { rs:'lenovocaaffinity,lenovoglobal,lenovocapub',	cc:'ca', bu:'cpp'			} },	// 140513
		ca_gepp			: function() { return { rs:'lenovocaaffinity,lenovoglobal,lenovocapub',	cc:'ca', bu:'gepp'			} },	// 140513
		ca_mpp			: function() { return { rs:'lenovocaaffinity,lenovoglobal,lenovocapub',	cc:'ca', bu:'mpp'			} },	// 140513
		ca_tele			: function() { return { rs:'lenovocatele,lenovoglobal,lenovocapub',		cc:'ca', bu:'tele'			} },	// 140512
		ca_lpn			: function() { return { rs:'lenovocalpn,lenovoglobal,lenovocapub',		cc:'ca', bu:'lpn'			} },	// 140513
		/* us - United States */
		us_public		: function() { return { rs:'lenovouspub,lenovoglobal',		cc:'us', bu:'public'		} },	// 140513
		us_support		: function() { return { rs:'lenovouspub,lenovoglobal',		cc:'us', bu:'support'		} },	// 140521
		us_tablet		: function() { return { rs:'lenovouspub,lenovoglobal',		cc:'us', bu:'tablet'		} },	// 140521
		us_mobile		: function() { return { rs:'lenovouspub,lenovoglobal',		cc:'us', bu:'mobile'		} },	// 140521
		us_publicdev	: function() { return { rs:'lenovouspubdev',	cc:'us', bu:'publicdev'		} },	// 140513
		us_affinity		: function() { return { rs:'lenovoamericas,lenovoglobal,lenovouspub',	cc:'us', bu:'affinity'		} },	// 140513
		us_epp			: function() { return { rs:'lenovousepp,lenovoglobal,lenovouspub',		cc:'us', bu:'epp'			} },	// 140513
		us_eppdev		: function() { return { rs:'lenovoamericasdev',	cc:'us', bu:'eppdev'		} },	// 140513
		us_cepp			: function() { return { rs:'lenovoamericas,lenovoglobal,lenovouspub',	cc:'us', bu:'epp'			} },	// 140513
		us_ceppdev		: function() { return { rs:'lenovoamericasdev',	cc:'us', bu:'ceppdev'		} },	// 140513
		us_cpp			: function() { return { rs:'lenovoamericas,lenovoglobal,lenovouspub',	cc:'us', bu:'cpp'			} },	// 140513
		us_cppdev		: function() { return { rs:'lenovoamericasdev',	cc:'us', bu:'cppdev'		} },	// 140513
		us_mpp			: function() { return { rs:'lenovoamericas,lenovoglobal,lenovouspub',	cc:'us', bu:'mpp'			} },	// 140513
		us_mppdev		: function() { return { rs:'lenovoamericasdev',	cc:'us', bu:'mppdev'		} },	// 140513
		us_gepp			: function() { return { rs:'lenovoamericas,lenovoglobal,lenovouspub',	cc:'us', bu:'gepp'			} },	// 140513
		us_geppdev		: function() { return { rs:'lenovoamericasdev',	cc:'us', bu:'geppdev'		} },	// 140513
		us_le			: function() { return { rs:'lenovole,lenovoglobal',			cc:'us', bu:'le'			} },	// 140513
		us_lpn			: function() { return { rs:'lenovouslpn,lenovoglobal,lenovouspub',		cc:'us', bu:'lpn'			} },	// 140513
		us_outlet		: function() { return { rs:'lenovoagoutlet,lenovoglobal,lenovouspub',	cc:'us', bu:'outlet'		} },	// 140513
		us_tele			: function() { return { rs:'lenovoustele,lenovoglobal,lenovouspub',		cc:'us', bu:'tele'			} },	// 140513
		us_smb			: function() { return { rs:'lenovoussmb,lenovoglobal,lenovouspub',		cc:'us', bu:'smb'			} },	// 140513
		us_ovp			: function() { return { rs:'lenovoglobal',		cc:'us', bu:'ovp'			} },	// 140521
		us_retail		: function() { return { rs:'lenovousmsasp,lenovoglobal,lenovouspub',		cc:'us', bu:'retail'		} },	// 140820
		us_rm			: function() { return { rs:'lenovouspub,lenovoglobal',		cc:'us', bu:'rm'		} },	// 150721
		/* ww - World Wide (not a valid country code) */
		ww_synacor		: function() { return { rs:'lenovoglobal',		cc:'ww', bu:'synacor'		} },	// 140520
		ww_shareit		: function() { return { rs:'lenovoglobal',		cc:'ww', bu:'shareit'		} },	// 140820
		ww_thisisthinkpad : function() { return { rs: 'lenovoglobal',	cc:'ww', bu:'thisisthinkpad'} },	// 140916
		ww_apps			: function() { return { rs:'lenovoglobal',		cc:'ww', bu:'apps'			} },	// 140520
		ww_ovp			: function() { return { rs:'lenovoglobal',		cc:'ww', bu:'ovp'			} },	// 140520
		ww_teamsite		: function() { return { rs:'lenovoglobaldev',	cc:'ww', bu:'teamsite'		} },	// 140521
		ww_lenovocentral: function() { return { rs:'lenovow3',			cc:'ww', bu:'lenovocentral'	} },	// 140521
		ww_prefctr		: function() { return { rs:'lenovoglobal',			cc:'ww', bu:'prefctr'	} },	// 141021
		ww_dev			: function() { return { rs:'lenovoglobaldev',	cc:'ww', bu:'dev'			} }		// 140521
	},
	// Default report suite ID
	defObj: { rs:'lenovoglobalerrors',	cc:'n/a', bu:'n/a' },												// 140917
	// Default development report suite ID
	devObj: { rs:'lenovoglobaldev', 	cc:'n/a', bu:'n/a' },												// 140917
	/* 
	 * Get the report suite ID for the specific CountryCode (cc) and Route (bu).
	 *   - Return the specified report suite object if the cc & bu
	 *     combo that is passed to the function exists in the "lkup" object.
	 *   - Return the default report suite object "defObj" if cc & bu
	 *     aren't 2 characters long and >0 characters respectively, OR if cc & bu
	 *     combo that is passed to the function doesn't exist in the "lkup" object. 
	 *   - Return the default development object "devObj" if bu includes "dev" 
	 *     at the end AND doesn't exist in the "lkup" object.
	 */
	getObj: function(l){																					// 140917
		var r = this.defObj;
		if( l.cc.length==2 && l.bu.length>0 ){
			try{ r = this.lkup[ (l.cc +'_'+ l.bu).toLowerCase() ]() } 
			catch(er) {	if( l.bu.indexOf( 'dev' ) == l.bu.length-3 ) r = this.devObj }
		}
		return r
	},
	/*
	 * Set s_account: The legacy object for determining the report suite ID based on the page URL.
	 */
	setAcc: function(){
		/*
		 * get the Country Code and Language Code based on the values in the 
		 * "lmd" object, meta tag on the page or URL of the page.
		 * Precedence: 1. lmd object, 2. lenovo.country meta tag, 3. country meta tag,
		 *             4. geo.region meta tag, 5. page URL
		 */
		var getCCLC = function( lmda, frCC, toCC ){
			var P, 
				cc = s_LC(s_scrubWS(
					(lmda.cc && lmda.cc.length==2? lmda.cc: '')
					||(lmda.country && lmda.country.length==2? lmda.country: '')
					||s_getHTMLtag('meta','name','Lenovo.Country','content')
					||s_getHTMLtag('meta','name','country','content')
					||s_getHTMLtag('meta','name','geo.region','content'))),
				lc = s_LC(s_scrubWS(
					(lmda.language&&lmda.language.length==2?lmda.language:'')
					||s_getHTMLtag('meta','name','Lenovo.Language','content')
					||s_getHTMLtag('meta','name','DC.Language','content')
					||s_getHTMLtag('meta','name','language','content'))).substring(0,2);

			if( frCC && toCC && cc ) cc = s_matchList( cc, frCC, toCC ); //map cc if needed

			if(!cc){
				P = au.pullLocaleFromPath(); //set P object from url for locale if needed
				cc = P.cc;
			}
			if(!lc){
				if(!P) P = au.pullLocaleFromPath();
				lc = P.lc;
			}
			return {cc: cc, lc: lc};
		},	
		/*
		 * returns the Report Suite ID based on the values in the "mapv" and "lmd" objects
		 */
		getAccount = function( mapv, lmd, ldtRSID, errRSID ){

			var onLoadTest = function(rs){
					var r=0;
					if((rs==ldtRSID) || (!s_getVisitStart() && s_c_r('s_ldtv')=='T')){
						r=1;
						s_c_w('s_ldtv','T');
					}
					return r;
				},
				/*
				 * Determine if we're on an error page
				 */
				onErrorPage = function(){
					if(!s_errorPage){
						if(window.lenovoCommonErrorpagesStatus)s_errorPage=lenovoCommonErrorpagesStatus;
						if(window.lenovoCommonErrorpagesDesc=='string')s_errorPage+=(s_errorPage?' ':'')+lenovoCommonErrorpagesDesc;
					}
					if(!s_errorPage)s_errorPage=s_getQueryStr('reason');
					return s_errorPage;
				},
				/*
				 * isActiveRS - return 'true' if the report suite passed in is valid and/or active
				 */
				isActiveRS = function(rs){
					var list= //Valid report suites
						 'lenovoglobal,lenovouspub,lenovobeta,lenovoglobalerrors,lenovosbb,lenovoaepub,lenovoaglpn,lenovoagoutlet,lenovoagpubsec,lenovoamericas,'
						+'lenovoamericasdev,lenovoapaffinity,lenovoaple,lenovoarepp,lenovoarpub,lenovoartele,lenovoatcepp,lenovoatctobp,lenovoatepp,'
						+'lenovoatlpn,lenovoatpub,lenovoauaffinity,lenovoauepp,lenovoaulpn,lenovoaupub,lenovoautele,lenovobdpub,lenovobelpn,lenovobepub,'
						+'lenovobgpub,lenovoblogs,lenovobopub,lenovobraffinity,lenovobrepp,lenovobrlpn,lenovobrpub,lenovobrtele,lenovocaaffinity,lenovocaepp,'
						+'lenovocalpn,lenovocapub,lenovocatele,lenovochlpn,lenovochpub,lenovocislpn,lenovoclpub,lenovocnpub,lenovocoepp,lenovoconsumeresupport,'
						+'lenovocopub,lenovocotele,lenovoczlpn,lenovoczpub,lenovodeaffinity,lenovodecepp,lenovodeepp,lenovodelpn,lenovodeoutlet,lenovodepub,'
						+'lenovodklpn,lenovodkpub,lenovoecpub,lenovoedm,lenovoeelpn,lenovoemea,lenovoemeaaffinity,lenovoemeaepp,lenovoemeale,lenovoemealpn,'
						+'lenovoemeamidmkt,lenovoemeapubsec,lenovoemergingmicro,lenovoemployeedirectory,lenovoeslpn,lenovoespub,lenovoesupporten,lenovoesupportjp,'
						+'lenovofilpn,lenovofipub,lenovofraffinity,lenovofrcepp,lenovofrepp,lenovofrlpn,lenovofroutlet,lenovofrpub,lenovogbpub,lenovogbpubdev,'
						+'lenovogbtele,lenovoglobaldev,lenovogrpub,lenovohkpub,lenovohrpub,lenovohupub,lenovoidpub,lenovoieaffinity,lenovoiecepp,lenovoieepp,'
						+'lenovoielpn,lenovoieoutlet,lenovoiepub,lenovoiepubdev,lenovoillpn,lenovoilpub,lenovoinnovappsdev,lenovoinnovappsprod,lenovoinpub,'
						+'lenovoitlpn,lenovoitpub,lenovojpclub,lenovojpepp,lenovojpoutlet,lenovojppub,lenovojptele,lenovokrpub,lenovole,lenovoledev,'
						+'lenovolenovoegpub,lenovolenovonecpub,lenovolenovonecpubdev,lenovolenovonecpubtele,lenovolkpub,lenovolts,lenovomalpn,lenovomapub,lenovomelpn,'
						+'lenovomxepp,lenovomxpub,lenovomxtele,lenovomypub,lenovonllpn,lenovonlpub,lenovonolpn,lenovonopub,lenovonzaffinity,'
						+'lenovonzepp,lenovonzlpn,lenovonzpub,lenovopedia,lenovopepub,lenovophpub,lenovopllpn,lenovoplpub,lenovoptlpn,lenovoptpub,lenovopypub,'
						+'lenovoropub,lenovorspub,lenovorulpn,lenovorupub,lenovosapub,lenovosbpstore,lenovoselpn,lenovosepub,lenovosgpub,lenovosimpletapprod,'
						+'lenovosipub,lenovoskpub,lenovosocialmonitoring,lenovothpub,lenovotrlpn,lenovotrpub,lenovotvtlenovosolutionscenterprod,lenovotvtlenovowelcomeprod,'
						+'lenovotwpub,lenovoualpn,lenovouapub,lenovoukaffinity,lenovoukbp,lenovoukcepp,lenovoukepp,lenovoukepp2,lenovouklpn,lenovoukoutlet,'
						+'lenovousbpstore,lenovousepp,lenovouslpn,lenovousorderstatus,lenovouspubdev,lenovoustele,lenovouypub,lenovovepub,lenovovnpub,'
						+'lenovow3,lenovow3emea,lenovowwlpn,lenovowwlpndev,lenovoxepub,lenovozapub,lenovommpub,lenovomxaffinity,lenovocoaffinity,'
						+'lenovoaraffinity,lenovohkzhpub,lenovoussmb,lenovoussmbtele,lenovodkctobp,lenovodkcepp,lenovodkepp,lenovodkrewards,'
						+'lenovofrctobp,lenovofrrewards,lenovodectobp,lenovoderewards,lenovoiectobp,lenovoierewards,lenovonlctobp,lenovonlcepp,lenovonlepp,lenovonlrewards,'
						+'lenovosectobp,lenovosecepp,lenovoseepp,lenovoserewards,lenovochctobp,lenovochcepp,lenovochepp,lenovochrewards,lenovoukctobp,lenovoukrewards,'
						+'lenovomi,lenovoauoutlet,lenovoafpub,lenovobhpub,lenovocypub,lenovoiqpub,lenovoirpub,lenovojopub,lenovokwpub,lenovolbpub,lenovolypub,lenovoompub,'
						+'lenovopkpub,lenovopspub,lenovoqapub,lenovosypub,lenovoyepub,lenovonztele,lenovousretail,lenovoaopub,lenovongpub,lenovoghpub,lenovotnpub,lenovodzpub,'
						+'lenovokepub,lenovotzpub';
					return ( list + ',' ).indexOf( rs + ',' )>-1? true: false;
				},
				/*
				 * isInativeRS - return 'true' if the report suite passed in is invalid and/or inactive.
				 * This is a list of retired report suites that should no longer receive image requests.
				 */
				isInactiveRS = function(rs){
					var list= //Discard report suites
						'lenovo2008,lenovoagle,lenovoagmidmkt,lenovoagsalesintranet,lenovoamericasmi,lenovoapepp,lenovoapesite,lenovoaple,lenovoaplpn,lenovoapmidmkt,'
						+'lenovoappswertrackingprod,lenovoappubsec,lenovoappubsec ,lenovobchannels,lenovocaffinity,lenovocemapub,lenovocislpn,lenovocnesupport,'
						+'lenovoconsumeresupport,lenovocspub,lenovoculturecompass,lenovodummymenu,lenovodummyoldglobal,lenovodummyolduspub,lenovoedm,lenovoemeale,'
						+'lenovoemeapubsec,lenovoemergingmarkets,lenovoemployeedirectory,lenovoeprizelpn,lenovoestacoeslenovobr,lenovoestacoeslenovobr ,lenovoesupportkr,'
						+'lenovoforums,lenovofunfactordev,lenovogeoamrollup,lenovogeoaprollup,lenovogeocnrollup,lenovogeoemearollup,lenovohitecholympics,lenovohkepp,'
						+'lenovohrsite,lenovoielpn,lenovoiepubdev,lenovoinepp,lenovointernalblogs,lenovointernalblogs ,lenovojplpn,lenovokrepp,lenovolapub,'
						+'lenovolenovometroexperienceprod,lenovolenovomxepp,lenovolenovosimpletapprod ,lenovolenovospider,lenovolenovoteapepprollup,lenovoltsdev,'
						+'lenovomalpn,lenovomaturemarket,lenovomelpn,lenovometrocompanionprod,lenovometroexperiencedev,lenovometrosupportprod,lenovonextjump,lenovonity,'
						+'lenovoolympicportal,lenovoomnitureteststore,lenovoone,lenovopedia,lenovoreganzrollup,lenovoregaseanrollup,lenovoregbenrollup,lenovoregcarollup,'
						+'lenovoregcemarollup,lenovoregcnrollup,lenovoregcntrollup,lenovoregfrrollup,lenovoreghkrollup,lenovoregigitrollup,lenovoreginrollup,'
						+'lenovoregitrollup,lenovoregjprollup,lenovoregkrrollup,lenovoreglarollup,lenovoregnorrollup,lenovoregtwrollup,lenovoregukairrollup,'
						+'lenovoregusrollup,lenovorel,lenovorteanzrollup,lenovorteaseanrollup,lenovortecarollup,lenovortecnrollup,lenovorteemearollup,lenovortehkrollup,'
						+'lenovorteinrollup,lenovortejprollup,lenovortekrrollup,lenovortelarollup,lenovortetwrollup,lenovorteukrollup,lenovorteusrollup,lenovosandbox,'
						+'lenovosbpstoredev,lenovosgepp,lenovosimpletapdev,lenovosimpletapprod ,lenovosocialmonitoring,lenovospider,lenovosraffrollup,lenovosrepprollup,'
						+'lenovosrpubrollup,lenovoszpub ,lenovotest2010,lenovotestalp20110929,lenovotvtlenovosolutionscenterdev,lenovotvtlenovowelcomedev,lenovotwepp,'
						+'lenovotwitter,lenovoukbp,lenovoukepp2,lenovoukpub,lenovous108375433,lenovousaffinityplusepp,lenovousbp,lenovouseppdev,lenovousmobile,'
						+'lenovousoutbound,lenovouspersonalpages,lenovouspubgomez,lenovovision,lenovow3emea,lenovowedirect,lenovowwintranet,lenovowwlpndev,lenovowwmidmkt,'
						+'lenovowwpub,lenovowwpubsec,lenovowwrollup,lenovoxcpub,lenovoxmpub';
					return ( list + ',' ).indexOf( rs + ',' )>-1? true: false;
				},
				rs,	er='  ', //for error logging to console
				sah = [window.s_account?' >pg> '+window.s_account:''], //for console logging
				devRSIDsfx = 'dev', //dev suite suffix
				excepFrRSID = 'lenovousoutlet,lenovogboutlet,lenovoegpub,lenovonecpub,lenovonecpubdev,lenovonecpubtele,lenovogbaffinity', //Map from
				excepToRSID = 'lenovoagoutlet,lenovoukoutlet,lenovolenovoegpub,lenovolenovonecpub,lenovolenovonecpubdev,lenovolenovonecpubtele,lenovoukaffinity'; //Map to

			// if loaded from the disk don't send web beacons to SC
			if(mapv.Protocol.indexOf('file')==0){

				rs='ignore'; //invalid RSID
				mapv.noT=true; //set no t call flag
				sah.push(' >file:> '+rs );

			// if an ErrorPage, sent web beacon to the error report suite
			}else if(onErrorPage()){ 

				s_restoreAcc();
				rs=errRSID;
				sah.push( ' >err> '+rs );

			// if lmd.xDomainAcc is set, send web beacons to its value
			}else if(lmd.xDomainAcc){ 

				rs=lmd.xDomainAcc;
				sah.push( ' >xd> '+rs );

			}else{			
				var bt=s_LC(lmd.businessType||''); //server-side business type, might be needed to set s_account
				if(!rs || mapv.aFO){  //set s_account if not already set or force override true
					// Handle special cases
					if( lmd.teleAccount && lmd.teleCookieName && s_c_r(lmd.teleCookieName) ){ //Telesales?
						rs = lmd.teleAccount;
						sah.push( ' >tel> '+rs );
					}else if(bt=='affinity'||bt=='epp'){ //Affinity, EPP
						if( lmd.reportSuites ) {
							rs=lmd.reportSuites;
							sah.push( ' >spc> '+rs );
						} else {
							var btp = location.pathname.split('/e/')[1].split('/')[0], btr;
							if( btp.indexOf( 'cepp' )>-1 ) btr = 'lenovo~cepp';
							else if( btp.indexOf( 'epp' )>-1 ) btr = 'lenovo~epp';
							else if( btp.indexOf( 'ctobp' )>-1 ) btr = 'lenovo~ctobp';
							else if( btp.indexOf( 'rewards' )>-1 ) btr = 'lenovo~rewards';
							else if( btp.indexOf( 'education' )>-1 ) btr = 'lenovo~affinity';
							else btr = 'dummy';  // this will be replaced by the error report suite
							rs = btr.replace( '~', mapv.cc );
							sah.push( ' >spc exception> '+rs );
						}
						mapv.sec=bt;
					}else if(bt=='le'||bt=='partner'||(lmd.reportSuites&&lmd.reportSuites.indexOf('lenovojpclub')>-1)){ //A LE, BP, or JP Club?
						rs=lmd.reportSuites;
						sah.push( ' >le/partner> '+rs );
						mapv.sec=bt;				
					}else if(bt=='largepartner'){
						rs=errRSID;
					}else{ //Standard lookup
						rs=s_LC(mapv.acc);
						sah.push( ' >'+mapv.Match+':'+mapv.desc+'> '+rs );
						if(rs.indexOf('~')>-1){
							rs=rs.replace(/~/g,mapv.cc);
							sah.push( ' >~cc> '+rs );
						}
					}
				}
			}
		
			// handle one-off report suite names/
			var mr = s_matchList(rs,excepFrRSID,excepToRSID);
			if(mr!=rs) sah.push( ' >oof> '+mr );
			rs = mr;

			// remove secondary suites if present/
			if(rs.indexOf(',')>-1){
				rs=rs.replace(/,.*/,'');
				sah.push( ' >xse> '+rs );
			}

			// dev? 
			if(rs.length>=3&&rs.indexOf(devRSIDsfx)==rs.length-3) s_dev=true;
			if(s_dev){
				if(rs.length<3||rs.indexOf(devRSIDsfx)!=rs.length-3)rs+=devRSIDsfx; //add 'dev' to end of RSID if not already present
				sah.push( ' >dev> '+rs );
				if( !isActiveRS( rs ) && !isInactiveRS( rs ) ){
					rs='lenovoglobaldev';
					sah.push( ' >idv> '+rs );
				}
			}

			// in a load test visit?
			if(onLoadTest(rs)){ 
				rs=ldtRSID;
				sah.push( ' >LTV> '+rs );
			}

			if(rs=='lenovohkpub') if(mapv.lc=='zh') rs='lenovohkzhpub';

			// valid rsid?
			if( rs && isInactiveRS( rs ) ){    //if RSID on discard list
				rs='ignore'; //invalid RSID
				mapv.noT=true; //set no t call flag
				sah.push( ' >DEL> '+rs );
			}else if(rs=="lenovononepub"){
				rs="lenovoglobaldev";
				sah.push( ' >DEVNOCC> '+rs );
			} else if( !rs || !isActiveRS( rs ) ){   //else if RSID empty or not on valid RSID list
				rs=errRSID;
				sah.push( ' >INV> '+rs );
			}
	
			try{
				s_clog(er,{'mapv':mapv},'\n'+er,'s_account'+sah.join(''))
			}catch(e){ s_clog(e.msg) }

			return rs;
		};

		var map = [];

		try{

			/* RSID selection map */
			var	errRSID='lenovoglobalerrors', //Error page RSID
				devRSID='lenovoglobaldev', //Default DEV RSID
				ldtRSID='lenovouspubgomez', //load test RSID

				pathJS='//shop.lenovo.com/ISS_Static/WW/omniture/', //JS directory

				dotcHN='lenovo\\.com', //Main domain

				/* 4 level domains */
				out4RE='^outlet([a-zA-Z]{2})?\\.[a-zA-Z]{2}\\.'+dotcHN,

				/* 3 level domains */
				bet3RE='^([^/]*)beta\\.lenovo\\.com/',
				drv3RE='^([^/]*)checkout\\.lenovo\\.com/',
				lpneRE='^([^/]*)partnerinfo\\.lenovo\\.com/',
				newsRE='^([^/]*)news\\.lenovo\\.com/',
				offsRE='^([^/]*)(googleusercontent|translate|viewster)\\.',
				out3RE='^([^/]*)outlet([a-zA-Z]{2})?\\.'+dotcHN,
				shopRE='^shop(ap)?\\.lenovo\\.com',
				suppRE='^([^/]*)support\\.lenovo\\.com/',
				mobsuppRE='^([^/]*)mobilesupport\\.lenovo\\.com/',
				blesRE='^([^/]*)nova\\.lenovo\\.com/',
				appsRE='^([^/]*)apps\\.lenovo\\.com/',
				tablRE='^t\\.lenovo\\.com/',
				starRE='^([^/]*)startpage\\.lenovo\\.com',
				taidRE='^([^/]*)tabletindirect\\.lenovo\\.com',
	
				/* 2 level domains */
				bet2RE='^([^/]*)lenovo\\.com([^/]*)/betaweb/',
				smb2RE='^([^/]*)lenovo\\.com([^/]*)/smb/',
				devsRE='^([^/]*)(leni2\\.|10\\.96\\.13|131\\.253\\.14|localhost|pdwec)',
				dotcRE='^([^/]*)'+dotcHN,
				drv2RE='^([^/]*)digitalriver\\.com/',
				opldRE='^([^/]*)len[a-zA-Z0-9]+\\.com/[^?]*.*[?&]cid=ops_load',
				ovp2RE='^([^/]*)ovp\\.lenovo\\.com/',
				tdscRE='^([^/]*)thedostore\\.com/',
				emcRE='^([^/]*)lenovoemc\\.com([^/]*)/datarecovery/';				

			map=[

				/* Default entry */
				{ defaults:true,
					desc:'Defaults|',
					ljs:pathJS+'s_code_lenovo.js',
					Ljs:pathJS+'s_code_lisa.js',
					sjs:'',
					acc:'lenovo~pub',  
					aFO:true,
					sec:'corporate'},

				/* start of 4 level domains */
				{	desc:'Outlet-4|outlet[ap].cc.lenovo.com/*',
					urls:out4RE,
					sjs:pathJS+'s_code_section_shop.js',
					acc:'lenovo~outlet',
					sec:'outlet'},

				{	desc:'VAR|*stg.thebestyes.lenovo.com*',
					urls:'stg\\.thebestyes\\.lenovo\\.com'+'*',
					sec:'thebestyes.lenovo.com',
					acc:'lenovoglobaldev',
					cc:'us'},

				/* start of 3 level domains */

				{	desc:'OpsLoad|*len*.com*?cid=ops_load',
					urls:opldRE+'',
					acc:ldtRSID,
					sec:'loadtest'},

				{	desc:'LEOS Dev|*nova.lenovo.com',
					urls:blesRE+'',
					acc:devRSID,
					sec:'dev'},

				{	desc:'Offsite|googleusercontent|translate|viewster',
					urls:offsRE+'',
					acc:devRSID,
					sec:'offsite'},

				{	desc:'OneWeb Beta|*beta.lenovo.com*',
					urls:bet3RE+'',
					sjs:pathJS+'s_code_section_beta.js',
					sec:'beta'},

				{	desc:'Products-2|shop[ap].lenovo.com/cc/products/*',
					urls:shopRE+'/([a-zA-Z]{2})/products/',
					sjs:pathJS+'s_code_section_learnshop.js',
					sec:'shop'},

				{	desc:'Products-3|shop[ap].lenovo.com/?????/cc/lc[/learn]/products*',
					urls:shopRE+'/[a-zA-Z]{5}/([a-zA-Z]{2})(/[a-zA-Z]{2})/(learn/|)products/',
					sjs:pathJS+'s_code_section_learnshop.js',
					sec:'shop'},

				{	desc:'Products-4|shop[ap].lenovo.com/cc/lc/products/*',
					urls:shopRE+'/([a-zA-Z]{2})(/[a-zA-Z]{2})/products/',
					sjs:pathJS+'s_code_section_learnshop.js',
					sec:'shop'},

				{	desc:'OVP-1|*ovp.lenovo.com/',
					urls:ovp2RE,
					sjs:pathJS+'s_code_section_ovp.js',
					acc:'lenovo~pub',
					sec:'ovp'},

				{	desc:'Shop-1|shop[ap].lenovo.com/?????/cc/lc/*',
					urls:shopRE+'/[a-zA-Z]{5}/([a-zA-Z]{2})(/[a-zA-Z]{2})/',
					sjs:pathJS+'s_code_section_shop.js',
					sec:'shop'},

				{	desc:'Shop-2|shop[ap].lenovo.com/cc/*',
					urls:shopRE+'/([a-zA-Z]{2})/',
					sjs:pathJS+'s_code_section_shop.js',
					sec:'shop'},

					// added in ver. 131002
				{	desc:'Shop-3|shop[ap].lenovo.com/SEUILibrary/controller/e/outlet_us/LenovoPortal/en_US/*',
					urls:shopRE+'/SEUILibrary/controller/e/outlet_us/LenovoPortal/en_US/*',
					sjs:pathJS+'s_code_section_shop.js',
					acc:'lenovousoutlet',
					sec:'outlet'},

					// added in ver. 140312
				{	desc:'Shop-4|shop[ap].lenovo.com/SEUILibrary/controller/e/auoutlet/LenovoPortal/en_AU/*',
					urls:shopRE+'/SEUILibrary/controller/e/auoutlet/LenovoPortal/en_AU/*',
					sjs:pathJS+'s_code_section_shop.js',
					acc:'lenovoauoutlet',
					sec:'outlet'},
			
					// added in ver. 140312
				{	desc:'Shop-5|shop[ap].lenovo.com/au-outlet/*',
					urls:shopRE+'/au-outlet/*',
					sjs:pathJS+'s_code_section_shop.js',
					acc:'lenovoauoutlet',
					sec:'outlet'},

				{	desc:'Shop-6|shop[ap].lenovo.com/SEUILibrary/controller/e/*/*Portal/lc_CC/*',
					urls:shopRE+'/SEUILibrary/controller/e/[^/]+/[a-zA-Z]+Portal/([a-zA-Z]{2})_([a-zA-Z]{2})/',
					sjs:pathJS+'s_code_section_shop.js',
					sec:'shop'},
			
				 // added in ver. 131002
				{	desc:'leshop.lenovo.com/leos/*',
					urls:'leshop\\.lenovo\\.com'+'/leos/*',
					acc:'lenovole', 
					sec:'LE'},
			
				{	desc:'Support-1|*support.lenovo.com/',
					urls:suppRE,
					sec:'support'},
		
				{	desc:'MobSupport-1|*mobilesupport.lenovo.com/',
					urls:mobsuppRE,
					sec:'mobilesupport'},				
			
				{	desc:'News|*news.lenovo.com/',
					urls:newsRE,
					sjs:pathJS+'s_code_section_news.js',
					sec:'corporate'},
			
				{	desc:'Apps|*apps.lenovo.com/',
					urls:appsRE,
					acc:'lenovoglobal',
					sec:'apps'},

				{	desc:'T|*t.lenovo.com/',
					urls:tablRE,
					acc: 'lenovo~pub',
					sec:'tablet'},

				{	desc:'LPN|*partnerinfo.lenovo.com/',
					urls:lpneRE,
					sjs:pathJS+'s_code_section_lpn.js',
					sec:'partner'},

				{	desc:'VAR|*thebestyes.lenovo.com*',
					urls:'thebestyes\\.lenovo\\.com'+'*',
					sec:'thebestyes.lenovo.com',
					acc:'lenovoglobal',
					cc:'us'},
			
				{	desc:'challengeyourdo|*challengeyourdo.lenovo.com*',
					urls:'challengeyourdo\\.lenovo\\.com'+'*',
					sec:'challengeyourdo.lenovo.com',
					acc:'lenovoglobal',
					cc:'us'},

				{	desc:'LPN2|*lenovoquickpick.com/',
					urls:lpneRE,
					sjs:pathJS+'s_code_section_lpn.js',
					sec:'partner'},

				{	desc:'LPN3|*lenovosolutionscentre.com/',
					urls:lpneRE,
					sjs:pathJS+'s_code_section_lpn.js',
					sec:'partner'},

				{	desc:'Outlet-3|outlet[ap].lenovo.com/*',
					urls:out3RE,
					sjs:pathJS+'s_code_section_shop.js',
					acc:'lenovo~outlet',
					sec:'outlet'},

				{	desc:'DRiver3|*digitalriver.com*',
					urls:drv3RE+'',
					sec:'shop'},
			
				// added in version '140122 DTM'
				{	desc: 'start.lenovo.com',
					urls: '^start\\.lenovo\\.com/',
					acc: 'lenovoglobal'},
			
				// added in version '140127 DTM'
				{	desc: 'lenovocentral.lenovo.com',
					urls: '^lenovocentral\\.lenovo\\.com/',
					acc: 'lenovow3'},
		

				/* start of 2 level domains */
				{	desc:'Dev|leni2|10.96.13|131.253.14|local|pdwec',
					urls:devsRE+'',
					acc:devRSID,
					sec:'dev'},

				{	desc:'BetaWeb|*lenovo.com/betaweb/',
					urls:bet2RE+'',
					sjs:pathJS+'s_code_section_beta.js',
					sec:'oneweb'},
			
				{	desc:'SMB|*lenovo.com/smb/',
					urls:smb2RE+'',
					sec:'smb',
					acc:'lenovo~smb'},
			

				{	desc:'Outlet-2|*lenovo.com/outlet_cc/*',
					urls:'^([^/]*\\.)?'+dotcRE+'[^?]*/outlet_([a-zA-Z]{2})/',
					sjs:pathJS+'s_code_section_shop.js',
					acc:'lenovo~outlet',
					cc:'$2',
					sec:'outlet'},

				{	desc:'DRiver2|*digitalriver.com*',
					urls:'^([^/]*\\.)?'+drv2RE+'',
					sec:'shop'},

				{	desc:'Shop-4|*lenovo.com/SEUILibrary/controller/e/*/*Portal/lc_CC/*',
					urls:'^([^/]*\\.)?'+dotcRE+'/SEUILibrary/controller/e/[^/]+/[^/]+/([a-zA-Z]{2})_([a-zA-Z]{2})/',
					sjs:pathJS+'s_code_section_shop.js',
					sec:'shop'},

				{	desc:'Products-1|*lenovo.com/products/cc/*',
					urls:'^([^/]*\\.)?'+dotcRE+'/products/([a-zA-Z]{2})/', 
					sec:'shop'},

				{	desc:'Outlet-1|*lenovo.com/cc/outlet/*',
					urls:'^([^/]*\\.)?'+dotcRE+'/([a-zA-Z]{2})outlet/',
					sjs:pathJS+'s_code_section_shop.js',
					acc:'lenovo~outlet',
					cc:'$2',
					sec:'outlet'},

				{	desc:'Services-1|*lenovo.com[/lc]/services_warranty/',
					urls:'^([^/]*\\.)?'+dotcRE+'(/[a-zA-Z]{2})?/services_warranty/',
					sjs:pathJS+'s_code_section_services.js',
					sec:'services'},

				{	desc:'Services-2|*lenovo.com[/lc]/PremiumSupport/',
					urls:'^([^/]*\\.)?'+dotcRE+'(/[a-zA-Z]{2})?/PremiumSupport/',
					sjs:pathJS+'s_code_section_services.js',
					sec:'services'},	

				// Added in version 140508
				{	desc:'startpage.lenovo.com*',
					urls:starRE+'',
					acc:'lenovoglobal',
					sec:'startpage'},
			
				// Added in version 140508
				{	desc:'tabletindirect.lenovo.com*',
					urls:taidRE+'',
					acc:'lenovoglobal',
					sec:'tabletindirect'},

				{	desc:'Dotcom-1|*lenovo.com*',
					urls:dotcRE+'',
					sec:'corporate'},

				{	desc:'thedostore|*thedostore.com*',
					urls:tdscRE+'',
					sjs:pathJS+'s_code_section_tds.js',
					acc:'lenovoinpub',
					sec:'thedostore'},

				{	desc:'lenovo.subs-maint.com/',
					urls:'lenovo.subs-maint.com/*',
					acc: 'lenovo~pub',
					sec:'microsite'},
			
				{	desc:'lenovoemc.com|lenovoemc.com/datarecovery/',
					urls:emcRE+'',
					sec:'lenoemc:data recovery'},
					
				/* everything else (must be non-Lenovo) */
				{	desc:'Microsite-1|(non-lenovo.com)',
					urls:'',
					Ljs:'',
					acc:'lenovoglobaldev',
					sec:'microsite',
					msf:true}
			];

		}catch(e){
			map = [
				{
					defaults:true,
					desc:'Defaults|*',
					ljs:pathJS+'s_code_lenovo.js',
					Ljs:pathJS+'s_code_lisa.js',
					sjs:'',
					acc:'lenovoglobalerrors',
					aFO:true,
					sec:'unknown'},

				{
					desc:'Unknown|*lenovo.com*',
					urls:'^([^/]*)lenovo\\.com'}
			];
		};

		/**************** call the above logic to populate the "mapv" object ****************/
		var cclc, mapv = s_mapURLs(map,s_url);
	
		// get the protocol of the current page
		mapv.Protocol=s_parseUri(s_url).protocol;

		/* Get cc and lc */
		cclc = getCCLC( lmd, s_renFrCC, s_renToCC );
		mapv.cc = cclc.cc;
		mapv.lc = cclc.lc;

		/* set the report suite ID based on the page URL */
		mapv.rs = getAccount( mapv, lmd, ldtRSID, errRSID );

		return mapv;
	},
	utils: {
		/*
		 * urlToPath - Convert url to path (replace "/" with ":", remove "index.html", etc.)
		 */
		urlToPath: function(u){
			var p='';
			if(u.indexOf('//')<0) u=(u.indexOf('/')==0?'/':'//')+u;
			if(u) p=decodeURI(s_LC(s_parseUri(u).pathname.replace(/\.html$/,'').replace(/\/index$/,'').replace(/\/$/,'').replace(/^\//,'').replace(/\//g,':')));
			return p;
		},
		/*
		 * scrubPath - Clean up path (remove spaces, empty fields, etc.)
		 */
		scrubPath: function(path){
			return path?s_LC(path.replace(/\s+/g,' ').replace(/\s*:+\s*/g,':').replace(/^[\s:]+/,'').replace(/[\s:]+$/,'').replace(/^home:/,'').replace(/home$/,'')):'';
		},
		/*
		 * pullLocaleFromPath - Remove country code and locale from the path; set country code, language code, locale if needed
		 */
		pullLocaleFromPath: function(P){
			/* Create P object if needed */
			var u = window.s_url || window.location.href, t=typeof P;
			if(t != 'object'){
				var P={};
				P.path = au.scrubPath(au.urlToPath(u))
			}

			/* Set cc and lc from path if unknown; remove from path */
			var pathSp = s_split(P.path,':'), i=0, k;
			for(; i<pathSp.length; i++){
				var j = -1, k = -1, cc='', lc='', sc='', p1, p2;
				cc = s_findCC(pathSp[i]);
				if(cc){ // look for cc:lc or lc:cc or cc
					cc = pathSp[i] = s_matchList(cc,s_renFrCC,s_renToCC); //map cc if needed
					lc = ((i+1)<pathSp.length)? s_findLC(pathSp[i+1]): '';
					if(lc){ //if we found cc:lc
						j = i; k=i+2;
					}else{
						lc = (i>0)?s_findLC(pathSp[i-1]):'';
						if(lc){ //if we found lc:cc
							j = i-1; k=i+1;
						}else{ //we just have cc (or just lc)
							j = i; k=i+1;
							sc=cc;
						}
					}
				}else if(pathSp[i].length==5&&pathSp[i][2]=='_'){ //if this could be cc_lc
					p1 = pathSp[i].substring(0,2), //split into p1 and p2
					p2 = pathSp[i].substring(3,5);
					/* Try to determine if we have cc_lc or lc_cc */
					if(s_findCC(p1)&&s_findLC(p2)){//if we have cc_lc...
						cc = s_matchList(p1,s_renFrCC,s_renToCC);
						pathSp[i] = cc+'_'+p2;
						lc = p2;
						j = i;
						k = i+1;
					}else if(s_findLC(p1)&&s_findCC(p2)){//if we have lc_cc...
						cc = s_matchList(p2,s_renFrCC,s_renToCC);
						pathSp[i] = p1+'web';
						lc = p1;
						j = i;
						k = i+1;
					}
				}else if(pathSp[i].length==5&&pathSp[i].substring(2,5)=='web'){ //if this could be CCweb
					p1 = pathSp[i].substring(0,2);
					if(s_findCC(p1)){
						cc = s_matchList(p1,s_renFrCC,s_renToCC);
						pathSp[i] = cc+'_'+p2;
						lc = p2;
						j = i;
						k = i+1;
					}
				}
				if(cc||lc){ //if we found cc and/or lc
					if(!P.cc) P.cc = cc; //set cc if unknown
					if(!P.lc) P.lc = lc; //set lc if unknown
					for(var l=j;k<pathSp.length;k++,l++) //shift path values over cc and/or lc
						pathSp[l] = pathSp[k];
					pathSp.length = l;
					for(;l<pathSp.length;l++) //backwards compatibility
						pathSp[l] = '';
					i=j-1;
				}
			}

			/* if no cc, look in hostname */
			if(!P.cc){
				var uSp = s_split(s_parseUri(u).hostname,'.');
				for(i=0;!P.cc&&i<uSp.length;i++) P.cc = s_findCC(uSp[i]);
				P.cc = s_matchList(P.cc,s_renFrCC,s_renToCC);
			}

			/* Rebuild path string */
			P.path = '';
			for(i=0;i<pathSp.length;i++)
				P.path += (i>0?':':'')+pathSp[i];

			/* Set cc, lc, locale */
			if(!P.cc) P.cc = 'none'; //default to U.S.
			if(!P.lc) P.lc = 'en'; //default to English
			P.locale = P.cc+'_'+P.lc; // Locale
			return P;
		},
		/*
		 * bcToPath - Convert breadcrumb to path (replace ">" with ":", etc.)
		 */
		bcToPath: function(bc){
			if(!bc)return '';
			var t = document.createElement('DIV');
			t.innerHTML = bc;
			bc = t.textContent||t.innerText;
			delete t;
			return bc.replace(/:/g,' -').replace(/(\s*[>õ]\s*)/g,':');
		}
	}
},
aa = adobeAnalytics, au = aa.utils;  //shortcuts

/************************** CRITICAL UTILITY FUNCTIONS SECTION **************************/

/* Helper functions utilized in Report Suite Determination 141021 */
function s_getQueryStr(n,u){var g,h,i,a='&',q=u||window.location.search,p=q.toLowerCase().replace(/\?/g,a)+a;n=a+n.toLowerCase();g=n+'=';h=p.indexOf(g);if(h>-1){i=h+g.length;return decodeURIComponent(q.substring(i,p.indexOf(a,i)).replace(/\+/g,' '))}g=n+a;return p.indexOf(g)>-1?' ':''}
function s_c_w(n,v,e,p,d){if(n){v+='';var t=v?'':-60,e;if(e&&t){e=new Date;e.setTime(e.getTime()+(t*1000))}document.cookie=n+'='+escape(v)+';'+' path='+(p||'/')+';'+(e?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s_c_r(n)==v}}
function s_c_r(n){var c=' '+document.cookie,i=c.indexOf(' '+n+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':unescape(c.substring(i+2+n.length,e<0?c.length:e));return v}
function s_c_d(n,p,d,s){document.cookie=n+'=;'+' expires=Thu, 01 Jan 1970 00:00:01 GMT;'+' path='+(p||'/')+(d?' domain='+d+';':'')+(s?' secure':'')}

window.s_checkCustomRS = function() {
	/* Check for the resetCustomRS flag. If present, delete the s_custom_rs cookie */
	try{
		if( s_getQueryStr('resetCustomRS') !== "" ){
			var delDate = new Date();
			delDate.setTime(delDate.getTime()); /* Set Cookie to Expire Now */
			s_c_w( "s_custom_rs", "" , delDate, "/", ".lenovo.com" );
		}
	} catch(e){
	}
	
	/* Check for the setCustomRS flag. If present, set the s_custom_rs cookie with the given parameters */
	try{
	if( s_getQueryStr('setCustomRS') !== "" ){
		var queryCC = s_getQueryStr('cc'), queryBU = s_getQueryStr('bu'), queryStore = s_getQueryStr('store');
		if( queryCC !== "" && queryBU !== "" ){
			var date = new Date();
			date.setTime(date.getTime()+(2592000000)); /* Set Cookie to Expire in 30 Days 30x24*60*60*1000 */
			/* Sets cookie. Note: Cookie format is cc|bu or cc|bu|store */
			s_c_w( "s_custom_rs", queryCC + "|" + queryBU + ( queryStore !== "" ? "|" + queryStore : ''  ), date, "/", ".lenovo.com" );
		}
	}
	} catch(e){
	}

	/* Read the s_custom_rs cookie to determine if an alternate report suite should be used */
	try{
		var cookieArray = s_c_r( "s_custom_rs" ).split("|");
		if( cookieArray.length >= 2 ){
			if( typeof window.lmd === "undefined" ){
				window.lmd = {};
			}
			window.lmd.cc = cookieArray[0];
			window.lmd.bu = cookieArray[1];	
			/* Only attempt to read storeID if cookieArray contains three elements */
			if( cookieArray.length === 3 ){
				window.lmd.storeID = cookieArray[2];
			}
		}
	} catch(e){
	}
};

/************************** CONFIG SECTION **************************/

/* Duplicate s_code load? */
var s_duplicateLoad=!!window.s_code_setup_ver&&window.s_urlsave&&window.s_urlsave==window.s_url;

if(!s_duplicateLoad){

	var temp=s_getLoadTime(); //used to calculate page load time (calculate it now for later reference)

	/* JS info */
	try{var s_code_setup_ver=s_jsFileInfo('s_code_setup')||'s_code_setup';s_clog('---\n'+window.location.href+'\ns_code_setup '+s_code_setup_ver.ver+' '+s_code_setup_ver.url);}catch(e){}

	/* Lenovo Meta Data */
	if(!s_isO(window.lmd))var lmd={};

	/* error page flags */
	if( typeof lmd.pageType !== "undefined" && lmd.pageType.match("error") ){
		s_def(lmd.pageType,'s_errorPage');
		s_def(lmd.errorReferrer,'s_errorRef');
	} else {
		s_def("",'s_errorPage');
	}

	/* Assigned page URL */
	s_def(lmd.xDomainURL||lmd.URL||window.s_url||window.location.href,'s_url'); //nominal URL
	var s_urlsave=s_url; //used to detect duplicate loads of this file

	/* Default s_dev and s_account */
	s_def(false,'s_dev');
	s_def('','s_account');
	s_def('lenovosbb','SBBs_account');

	/* Default Link Internal Filters */
	var lif = '131.ibm.com,133.ibm.com,306.ibm.com/common/ssi/,604.ibm.com,605.ibm.com/webapp/wcs/stores,'
	         +'606.ibm.com/products/hardware/configurator/,9.179.20.57/lenovoinfo,900.ibm.com,903.ibm.com/kr/support/pc,'
	         +'ahe.sagamino.ibm.com,caipsgws001.can.ibm.com,cardinalcommerce.com,experiencelenovo.com,fm365.com,'
	         +'franklin-lenovo.staging,gc.digitalriver.com,i2.com,ibm.com/lenovoinfo,ibm.com/pc,'
	         +'ibm.com/products/hardware/configurator,icm1.teleweb.ca.ibm.com,insidelenovo.com,javascript:,kelkoo.,'
	         +'lenovo.cn,lenovo.co,lenovo.com,lenovo2008.com,lenovoideas.com,lenovojp.com,lenovosocial.com,'
	         +'lenovotorch.com,lenovovision.com,opinionlab.com,pc.ibm.com,phoenix1.br.ibm.com,service.pageshare.com,'
	         +'www-06.ibm.com,www-1.ibm.com/products/hardware/configurator,www-8.ibm.com,zoomerang.com';
	s_def(lif,'s_linkInternalFilters');

	/* Country code mapping settings */
	var s_findCCadd='uk,mp', //non ISO-standard country codes
		s_renFrCC='uk', //Map from
		s_renToCC='gb', //Map to

	/* Determine report suite ID based on the page URL (legacy) */
	s_mapv = aa.setAcc();
	s_account = s_mapv.rs;
	if( typeof s_account !== "undefined" && s_account !== "" && !s_account.match(/dev/) && !s_account.match(/global/) ){
		s_account += ",lenovoglobal";
	}
	
	s_saveAcc();
	
	/* Temporary workaround for This is Thinkpad */
	if( document.location.href.match('thisisthinkpad') ){
		if( typeof window.lmd === "undefined" ){
			window.lmd = {};
		}
		if( typeof lmd.bu === "undefined" ){
			window.lmd.bu = "thisisthinkpad";
		}
		if( typeof lmd.cc === "undefined" ){
			window.lmd.cc = "ww";
		}
	}
	
	/* Temporary workaround for Non-Production Environment */
	if( document.location.hostname.match( /^[0-9\.]+$/ ) || document.location.hostname.match( "localhost" ) ){
		
		if( typeof window.lmd === "undefined" ){
			window.lmd = {};
		}
		
		if( typeof window.lmd.cc !== "undefined" ){
			window.lmd.ccOrig = window.lmd.cc;
		}
		if( typeof window.lmd.bu !== "undefined" ){
			window.lmd.buOrig = window.lmd.bu;
		}
		
		window.lmd.cc = "ww";
		window.lmd.bu = "dev";
	}
	
	/* Determine if all current traffic should not be included */
	if( typeof s_checkCustomRS === "function" ){
		s_checkCustomRS();
	}
		
	/* Determine the report suite ID based on lmd.cc & lmd.bu */
	var rsid, rsDeter = 'URL', msg = '   The lmd.cc and/or lmd.bu values are not present on the page. Reverting to legacy report suite determination logic';
	try{
		if( lmd.cc.length==2 && lmd.bu.length>0 ){
			s_clog( '   Page-code lmd.cc="' + lmd.cc + '", lmd.bu="' + lmd.bu + '"' );
			rsid = aa.getObj( lmd ).rs;
			if( rsid == aa.defObj.rs ) {			// 140917
				s_clog( '   The lmd.cc & lmd.bu values are not in the lookup object in s_code_setup.js. Reverting to the legacy URL based report suite determination logic')
			} else {
				s_account = rsid;
				rsDeter = 'LMD';
				/* Clean up mapv noT settings from URL based RS logic 140929 */
				try{
					if( typeof s_mapv === "object" ){
						s_mapv.noT = false;
					}
				} catch(e){
				}
				s_clog( '	The lmd.cc & lmd.bu values are in the lookup object in s_code.setup.js. Using the new LMD based report suite determination logic')
			}
		} else s_clog( msg )
	} catch(er){ s_clog( msg ) }
		
	s_clog( 'Report Suite ID in use = "' + s_account + '"' );

	/* Invoke associated s_code JS files */
	/*try{if(s_mapv.Ljs&&!window.s_code_lisa_ver)s_loadJS(s_mapv.Ljs)}catch(e){}*/
	try{
		if( s_mapv.sjs === "//shop.lenovo.com/ISS_Static/WW/omniture/s_code_section_shop.js" ){
		
			// s_code_section_shop.js
			// Copyright 1996-2012 Adobe Systems, Inc. All Rights Reserved.
			// More info available at http://www.omniture.com
			// UPDATED: 02-Jul-2012
			var s_fileVer='140702';

			/* JS info */
			try{s_code_section_ver=s_jsFileInfo('s_code_section');s_clog('s_code_section_shop '+s_code_section_ver.ver+' '+s_code_section_ver.url)}catch(e){}

			/*
			 * Page-specific logic: Shop pages
			 */
			window.s_code_sectionSpecific = function(s,P){

				/* Shop visit event */
				var cT=s.callType();
				if(cT=='t')s.events=s.apl(s.events,'event36',',',2); //Shop visit

				/* get the shop breadcrumb */
				if(!P.breadcrumb){
					for(var i=0;i<12;i++){
						var str=s_scrubWS(s_getHTMLtag('span','id','crumb'+i,'text')||'');
						if(str)P.breadcrumb+=(P.breadcrumb?'>':'')+str;
					}
					if(s_LC(s_P.breadcrumb)=='home')s_P.breadcrumb='';
				}

				var u=window.location.href,um=u.replace(/\.com\/SEUILibrary\/controller\/e\/web\/LenovoPortal\//,'');
				if(um&&u!=um)s_P.URL=um;

				P=setPathAndLocale(P);

				/* make path standard form */
				P.path=':'+P.path+':';
				P.path=P.path.replace(/:portals/,'').replace(/:products/,'');
				P.path=P.path.replace(/:[a-z][a-z]ind:/,'');
				if(P.path.indexOf(':shop:')!=0)P.path=':shop'+P.path.replace(/^:home:/,':');
				P.path = adobeAnalytics.utils.scrubPath(P.path);

				return P;
			};

		} else if(s_mapv.sjs === "//shop.lenovo.com/ISS_Static/WW/omniture/s_code_section_services.js"){

			// s_code_section_services.js
			// Copyright 1996-2012 Adobe Systems, Inc. All Rights Reserved.
			// More info available at http://www.omniture.com
			// UPDATED: 02-Jul-2012
			var s_fileVer='140702';

			/* JS info */
			try{s_code_section_ver=s_jsFileInfo('s_code_section');s_clog('s_code_section_services '+s_code_section_ver.ver+' '+s_code_section_ver.url)}catch(e){}

			/*
			 * Page-specific logic: Shop pages
			 */
			window.s_code_sectionSpecific = function(s,P){

				P=setPathAndLocale(P);

				/* make path standard form */
				P.path=':'+P.path+':';
				P.path=P.path.replace(/:services_warranty/,'');
				if(P.path.indexOf(':services:')!=0)P.path=':services'+P.path.replace(/^:home:/,':');
				P.path = adobeAnalytics.utils.scrubPath(P.path);

				return P;
			};

		} else if(s_mapv.sjs === "//shop.lenovo.com/ISS_Static/WW/omniture/s_code_section_beta.js"){
			// s_code_section_shop.js
			// Copyright 1996-2013 Adobe Systems, Inc. All Rights Reserved.
			// More info available at http://www.omniture.com
			// UPDATED: 12-Feb-2013
			var s_fileVer='130201b';

			/* JS info */
			try{s_code_section_ver=s_jsFileInfo('s_code_section');s_clog('s_code_section_beta '+s_code_section_ver.ver+' '+s_code_section_ver.url)}catch(e){}

			/*
			 * Page-specific logic: Shop pages
			 */
			window.s_code_sectionSpecific = function(s,P){

					/* get the beta breadcrumb */
					if(!P.breadcrumb){
						var str=s_scrubWS(s_getHTMLtag('nav','id','breadcrumbs','text')||'');
						if(s_LC(str).indexOf('home > ')==0)str=str.substring(7,999);
						if(s_LC(str).indexOf('home>')==0)str=str.substring(5,999);
						if(s_LC(str).indexOf('home')==0)str=str.substring(4,999);
						if(str)P.breadcrumb+=(P.breadcrumb?'>':'')+str;
					}
				P=setPathAndLocale(P);
				return P;
			};

		} else if(s_mapv.sjs === "//shop.lenovo.com/ISS_Static/WW/omniture/s_code_section_learnshop.js"){
			// s_code_section_learnshop.js
			// Copyright 1996-2012 Adobe Systems, Inc. All Rights Reserved.
			// More info available at http://www.omniture.com
			// UPDATED: 02-Jul-2012
			var s_fileVer='140702';

			/* JS info */
			try{s_code_section_ver=s_jsFileInfo('s_code_section');s_clog('s_code_section_learn '+s_code_section_ver.ver+' '+s_code_section_ver.url)}catch(e){}

			/*
			 * Page-specific logic: Shop pages
			 */
			window.s_code_sectionSpecific = function(s,P){

				/* get the 'shop' breadcrumb */
				if(!P.breadcrumb){
					for(var i=0;i<12;i++){
						var str=s_scrubWS(s_getHTMLtag('span','id','crumb'+i)||'');
						if(str)P.breadcrumb+=(P.breadcrumb?'>':'')+str;
					}
				}

				P=setPathAndLocale(P);

				/* make path standard form */
				P.path=':'+P.path+':';
				P.path=P.path.replace(/:learn/,'');
				P.path=P.path.replace(/:[a-z][a-z]ind:/,'');
				if(P.path.indexOf(':products:')!=0)P.path=':products'+P.path.replace(/^:home:/,':');
				P.path = adobeAnalytics.utils.scrubPath(P.path);

				return P;
			};

		} else if(s_mapv.sjs === "//shop.lenovo.com/ISS_Static/WW/omniture/s_code_section_lpn.js"){

			// s_code_section_lpn.js
			// Copyright 1996-2012 Adobe Systems, Inc. All Rights Reserved.
			// More info available at http://www.omniture.com
			// UPDATED: 14-Nov-2012
			var s_fileVer='121017c';

			/* JS info */
			try{s_code_section_ver=s_jsFileInfo('s_code_section');s_clog('s_code_section_lpn '+s_code_section_ver.ver+' '+s_code_section_ver.url)}catch(e){}

			/*
			 * Page-specific logic: Shop pages
			 */
			window.s_code_sectionSpecific = function(s,P){

				s.pageType=''; //disable incorrect use of s.pageType by page-level code

				/* get the LPN breadcrumb */
				if(!s_P.breadcrumb){
					var str=s_scrubWS(s_getHTMLtag('div','class','breadCumbCnt','text')).replace(/^home[^a-z]*/i,'').replace(/›/g,'>');
					str='LPN'+(str?' > ':'')+str;
					s_P.breadcrumb=str;
				}

				P=setPathAndLocale(P);

				return P;
			};

		} else if(s_mapv.sjs === "//shop.lenovo.com/ISS_Static/WW/omniture/s_code_section_news.js"){
			// s_code_section_news.js
			// Copyright 1996-2012 Adobe Systems, Inc. All Rights Reserved.
			// More info available at http://www.omniture.com
			/// UPDATED: 25-Sep-2012
			var s_fileVer='120925';

			/* JS info */
			try{s_code_section_ver=s_jsFileInfo('s_code_section');s_clog('s_code_section_news '+s_code_section_ver.ver+' '+s_code_section_ver.url)}catch(e){}

			/*
			 * Page-specific logic: News
			 */
			window.s_code_sectionSpecific = function(s,P){

				/* get the breadcrumb */
				if(!P.breadcrumb){
					var bc=s_scrubWS(s_getHTMLtag('ul','class','breadcrumbs','text')||'').replace(/^Home>About Us>/,'');
					s_setIf(bc,P,'breadcrumb');
				}

				P=setPathAndLocale(P);

				/* add content ID if found */
				var aID=s.getQueryParam('article_id')||s.getQueryParam('photo_id')||s.getQueryParam('video_id')||'';
				if(aID&&P.path)P.path=P.path+':'+aID;

				return P;
			};
		} else if(s_mapv.sjs === "//shop.lenovo.com/ISS_Static/WW/omniture/s_code_section_ovp.js"){
			// s_code_section_ovp.js
			// Copyright 1996-2012 Adobe Systems, Inc. All Rights Reserved.
			// More info available at http://www.omniture.com
			// UPDATED: 02-Jul-2012
			var s_fileVer='140702';

			/* JS info */
			try{s_code_section_ver=s_jsFileInfo('s_code_section');s_clog('s_code_section_learn '+s_code_section_ver.ver+' '+s_code_section_ver.url)}catch(e){}

			/*
			 * Page-specific logic: OVP
			 */
			window.s_code_sectionSpecific = function(s,P){

				/* get the breadcrumb */
				if(!P.breadcrumb)s_setIf(s_scrubWS(s_getHTMLtag('div','class','box','text')||''),P,'breadcrumb');

				P=setPathAndLocale(P);

				/* make path standard form */
				P.path=':'+P.path+':';
				if(P.path.indexOf(':ovp:')!=0)P.path=':ovp'+P.path.replace(/^:home:/,':');
				P.path = adobeAnalytics.utils.scrubPath(P.path);

				/* get order number */
				s_setIf(s.getQueryParam('orderNumber'),P,'purchaseID');

				return P;
			};
		} else if(s_mapv.sjs&&!window.s_code_section_ver)s_loadJS(s_mapv.sjs,true)
	}catch(e){}
	/*try{if(s_mapv.ljs&&!window.s_code_ver)s_loadJS(s_mapv.ljs,true)}catch(e){s_loadJS('//shop.lenovo.com/ISS_Static/WW/omniture/s_code_lenovo.js',true)}*/

}
/***************************** NON-CRITICAL UTILITIES FUNCTIONS SECTION ****************************/

/*************************** preSlib v1.45 **************************/

// preSlib enabler functions
function s_is(x){var t=x===null?'null':typeof x;if(t=='object'&&typeof x.length=='number')t='array';return t}
function s_isNU(x){return s_is(x)=='null'}
function s_isU(x){return s_is(x)=='undefined'}
function s_isN(x){return s_is(x)=='number'}
function s_isS(x){return s_is(x)=='string'}
function s_isB(x){return s_is(x)=='boolean'}
function s_isO(x){return s_is(x)=='object'}
function s_isAO(x){return s_isA(x)||s_isO(x)}
function s_isA(x){return s_is(x)=='array'}
function s_isF(x){return s_is(x)=='function'}
function s_MC(a,c){try{if(s_isS(c))c=c=='lc'?-1:c=='uc'?1:0;if(!s_isN(c))c=c?1:0;a+='';a=c<0?a.toLowerCase(a):c>0?a.toUpperCase(a):a}catch(e){}return a}
function s_LC(a){return s_MC(a,'lc')}
function s_UC(a){return s_MC(a,'uc')}
function s_scrubWS(t){try{if(t==null)t='';t=t.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ')}catch(e){}return t}
function s_split(l,d){var i,x=0,a=new Array;if(!d)d=',';while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length)}return a}
function s_getHTMLtag(y){var a='',v='',g='',t='',f='',c='lc',p=arguments,l=p.length,i;if(!y)return f;if(l>1){i=s_LC(p[l-1]);if(i=='uc'||i=='lc'||i=='mc'){c=i;l--}}y=s_LC(y);if(l==2)g=s_LC(p[1]);else if(l>=3){a=s_LC(p[1]);v=s_MC(p[2],c);if(l>=4)g=s_MC(p[3],c)}if(document.getElementsByTagName)t=document.getElementsByTagName(y);if(typeof t!='object')return f;for(i=0;!f&&i<t.length;i++){f=t[i];if(a&&v&&s_MC(f.getAttribute(a),c)!=v)f=''}if(!f||typeof f!='object'||!g)return f;if(g!='text')return f.getAttribute(g);f=f.innerText||f.textContent||'';f=f.replace(/\s*>\s*/g,'>').replace(/^>+/,'').replace(/>+$/,'');return f}
function s_parseUri(){var u=arguments.length==0?window.location.href:arguments[0],e,a=document.createElement('a'),p='',r={};a.setAttribute('href',u+'');for(e in a)if(typeof a[e]=='string')r[e]=a[e];delete a;a=null;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathname='/'+p;return r}

// preSlib utilities
function s_setIf(){var O='object',L=null,a=arguments,al=a.length,S='',i,z=0,n,o=window,l=0,c=0,d=0;try{if(typeof a[al-1]=='number'){n=a[--al];l=n&1;c=n&2;d=n&4}if(al>=2&&(typeof a[0]!=O||typeof a[1]==O))S=a[z++];if(!S&&!d)return L;if(S&&(l||c)){try{if(l)S=s_LC(S);if(c)S=s_scrubWS(S)}catch(e){}}if(typeof a[z]==O)o=a[z++];for(i=z;i<al;i++){n=a[i];if(typeof n=='string'&&((!d&&S)||(d&&!o[n]))){try{o[n]=S;L=S}catch(e){}}}}catch(e){}return L}
function s_def(){var a=arguments,b=new Array,i;for(i=0;i<a.length;i++)b.push.apply(b,[a[i]]);if(typeof b[i-1]=='number')b[i]|=4;else b.push.apply(b,[4]);return s_setIf.apply(this,b)}
function s_toNum(t,f,l){var v=NaN,k=1,i=0,c,o,D='0123456789',d=0,u=typeof t,m=f?1e306:1e14;if(u=='number')return t;if(u=='object')t+='';if(u!='string'||!t)return NaN;for(;l&&i<t.length;i++){c=t.substring(i,i+1);if(c>' ')break}c=t.substring(i,i+1);if(!d&&c=='+')i++;if(!d&&c=='-'){k=-1;i++}if(f&&!d&&c=='.'){d=1;i++}for(;i<t.length;i++){c=t.substring(i,i+1);o=D.indexOf(c);if(f&&c=='.'&&!d)d=1;else{if(o<0)return l?k*v:NaN;if(v>m)return NaN;if(isNaN(v))v=0;if(d){d=d/10;v=v+o*d}else v=10*v+o}}return k*v}
function s_toInt(t){var l=arguments.length>1&&!!arguments[1];return s_toNum(t,0,l)}
function s_toFloat(t){var l=arguments.length>1&&!!arguments[1];return s_toNum(t,1,l)}
function s_round(v,p,d,b){var N='number';if(typeof d!=N)d=NaN;if(typeof v!=N)v=s_toFloat(v);if(isNaN(v))return d;if(typeof p!=N||p<0)p=0;if(!b||typeof b!=N||b<2)b=10;p=Math.pow(b,isNaN(p)?0:p);return Math.floor(v*p+0.5)/p}
function s_getCharSet(){var v=s_getHTMLtag('meta','http-equiv','content-type','content'),i;if(!v)return'';i=v.indexOf('charset=');if(i==-1)return'';return s_UC(v.substring(i+8,99).replace(/[\'\";, ].*/,''))}
/*function s_getQueryStr(n,u){var g,h,i,a='&',q=u||window.location.search,p=q.toLowerCase().replace(/\?/g,a)+a;n=a+n.toLowerCase();g=n+'=';h=p.indexOf(g);if(h>-1){i=h+g.length;return decodeURIComponent(q.substring(i,p.indexOf(a,i)).replace(/\+/g,' '))}g=n+a;return p.indexOf(g)>-1?' ':''}*/ //Moved to critical
function s_apl(l,v,d,u){var m=0;if(!l)l='';if(u){var i,n,a=s_split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(s_LC(n)==s_LC(v)))}}if(!m)l=l?l+d+v:v;return l}
function s_getShortHn(){return s_LC(s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname.replace(/^www-?[0-9]*\./i,''))}
function s_getOwnerHn(){return s_LC(s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname.replace(/^www[0-9]*\./i,'').replace(/\.(gov|edu|com|mil|org|net|int).*/,'').replace(/\.[a-z][a-z]$/,'').replace(/.*\./,''))}
function s_getTLDlevels(){var h=s_parseUri(arguments.length>0?arguments[0]:window.location.href).hostname;return h.match(RegExp("\\.co\\..{2}$","i"))||h.match(RegExp("\\.(gov|edu|com|mil|org|net|int)\\..{2}$","i"))?3:2}
function s_getCookieDomain(){var h=s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname,n=s_getTLDlevels(),a=s_split(h,'.'),i=a.length-n;for(h='';i<a.length;i++)h+='.'+a[i];return h}
/*function s_c_w(n,v,e,p,d){if(n){v+='';var t=v?'':-60,e;if(e&&t){e=new Date;e.setTime(e.getTime()+(t*1000))}document.cookie=n+'='+escape(v)+';'+' path='+(p||'/')+';'+(e?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s_c_r(n)==v}} */ //Moved to critical
/*function s_c_r(n){var c=' '+document.cookie,i=c.indexOf(' '+n+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':unescape(c.substring(i+2+n.length,e<0?c.length:e));return v} */ //Moved to critical
/*function s_c_d(n,p,d,s){document.cookie=n+'=;'+' expires=Thu, 01 Jan 1970 00:00:01 GMT;'+' path='+(p||'/')+(d?' domain='+d+';':'')+(s?' secure':'')} */ //Moved to critical
function s_findCode(a,c){var i=0,j;if(typeof a!='string')return'';for(a=s_LC(a);i<c.length;i+=2){j=c.substring(i,i+2);if(a==j)return j}return''}
function s_findCC(a){var c='adaeafagaialamanaoaqarasatauawaxazbabbbdbebfbgbhbibjblbmbnbobrbsbtbvbwbybzcacccdcfcgchcickclcmcncocrcucvcxcyczdedjdkdmdodzeceeegeheresetfifjfkfmfofrgagbgdgegfggghgiglgmgngpgqgrgsgtgugwgyhkhmhnhrhthuidieiliminioiqirisitjejmjojpkekgkhkikmknkpkrkwkykzlalblclilklrlsltlulvlymamcmdmemfmgmhmkmlmmmnmompmqmrmsmtmumvmwmxmymznancnenfngninlnonpnrnunzompapepfpgphpkplpmpnprpsptpwpyqarerorsrurwsasbscsdsesgshsisjskslsmsnsosrstsvsysztctdtftgthtjtktltmtntotrtttvtwtzuaugumusuyuzvavcvevgvivnvuwfwsyeytzazmzw';if(typeof s_findCCadd=='string')c+=s_findCCadd.replace(/,/g,'');return s_findCode(a,c)}
function s_findLC(a){var l='abaaaeafakamanarasavayazbabebgbhbibmbnbobrbscacechcocrcscucvcydadedvdzeeeleneoeseteufafffifjfofrfygagdglgngugvhahehihohrhthuhyhziaidieigiiikioisitiujajvkakgkikjkkklkmknkokrkskukvkwkylalblglilnloltlulvmgmhmimkmlmnmrmsmtmynanbndnengnlnnnonrnvnyocojomorospapiplpsptqurmrnrorurwsascsdsesgsiskslsmsnsosqsrssstsusvswtatetgthtitktltntotrtstttwtyugukuruzvevivowawoxhyiyozazhzu';return s_findCode(a,l)}
function s_matchList(v,l,m,d,c){if(s_isS(m)&&m.length==1){c=d;d=m;m=0}if(s_isN(m)){c=m;m=d=0}if(s_isN(d)){c=d;d=0}if(!d)d=',';if(s_isS(l))l=s_split(l,d);if(s_isS(m))m=s_split(m,d);if(!s_isAO(m))m=0;if(s_isS(v)){v=s_MC(v,c);for(var i=0,n=m.length;i<l.length;i++)if(v==s_MC(l[i],c))return!m?true:i<n?m[i]:n>0?m[n-1]:v}return m?v:false}
function s_mapURLs(l){var O='object',U='undefined',S='string',g=function(p,t,v){var i,e,r,x,m,j=0,a,d=typeof v!=O,m,z,q;if(d)var v={Match:0};for(i in t){q=null;r=typeof t[i]==O?t[i]:{};if(typeof r.defaults==U)r.defaults=0;x=typeof r.urls==S?r.urls:'~';m=d?r.defaults:!r.defaults&&x=='';if(!m&&!d){try{q=new RegExp(x,'');m=q.test(p)}catch(z){}}if(m){if(!d)v.Match=j;for(e in r){if(e!='urls'&&e!='defaults'){z=r[e];if(!d&&x&&typeof z==S&&z.indexOf('$')>-1&&q){m=q.exec(p);if(m.length>1)z=m[0].replace(q,z);z=z.replace(/\$[0-9]/g,'')}v[e]=z}}return v}j++}return v},v=null,u=s_parseUri(arguments.length>1?arguments[1]:window.location.href),p=u.hostname+u.pathname+u.search;try{if(typeof l==O){v=g(p,l,0);v=g(p,l,v)}}catch(e){}if(typeof v!=O)v={Match:0};if(typeof v.Match!='number')v.Match=0;return v}
function s_intercept(f,n,c){var F='function',T='typeof ',O='object',o=c||'window',g='',r='';f=o+'.'+f;var r=f+'_orig';try{if(eval(T+o)==O&&eval(T+r)!=F&&eval(T+f)==F&&eval(T+n)==F){eval(r+'='+f+';'+f+'='+n);g=r}}catch(e){}return g}
function s_deintercept(f,c){var F='function',T='typeof ',O='object',o=c||'window',g='',r='';f=o+'.'+f;r=f+'_orig';try{if(eval(T+o)==O&&eval(T+r)==F&&eval(T+f)==F){eval(f+'='+r+';'+r+'=null');g=f}}catch(e){}return g}
function s_loadJS(p,a){try{if(p)if(a){var e=document.createElement('script');e.type='text/javascript';e.language='JavaScript';e.async=true;e.src=p;var j=document.getElementsByTagName('script')[0];j.parentNode.insertBefore(e,j)}else{document.write('<scr'+'ipt type="text/javascript" language="JavaScript" src="'+p+'"></sc'+'ript>')}}catch(e){}}
function s_clt(n){try{var o=0,r=true,a=arguments,l=a.length,t='o',i=1,v;if(typeof window.s=='object'){o={linkTrackVars:s.linkTrackVars||'',linkTrackEvents:s.linkTrackEvents||'',events:s.events||''}}else{s=s_gi(s_account)}if(!s.events||typeof s.events!='string'||s.events.toLowerCase=='none')s.events='';if(typeof s!='object')return r;if(l>1&&a[1].length==1){t=a[1];i=2}while(i<l){v=a[i++].replace(/^v([0-9])$/,'eVar$1').replace(/^c([0-9])$/,'prop$1').replace(/^e([0-9])/,'event$1');if(v.indexOf('event')==0){s.linkTrackEvents=s.apl(s.linkTrackEvents,v,',',1);s.events=s.apl(s.events,v,',',1);v='events'}else if(i<l){if(o)o[v]=s[v]||'';s[v]=a[i++]}s.linkTrackVars=s.apl(s.linkTrackVars,v,',',1)}r=s.tl(1,t,n);if(o)for(i in o)s[i]=o[i]}catch(e){}return r}
function s_ta(){try{var i,b=('campaign,channel,events,hier1,hier2,hier3,hier4,hier5,list1,list2,list3,pageName,pageType,pageURL,pev2,products,purchaseID,referrer,server,state,transactionID,visitorID,zip').split(','),c=function(n,i){eval('if(s.'+n+i+")s."+n+i+'=\'\'')},m=function(n){if(window['s_'+n]){s[n]=window['s_'+n]}};if(typeof window.s=='object'){for(i=1;i<=75;i++){c('prop',i);c('eVar',i)}for(i=0;i<b.length;i++)c(b[i],'')}else{s=s_gi(s_account)}if(typeof s=='object'){m('linkInternalFilters');m('linkTrackVars');m('linkTrackEvents');return s.t()}}catch(e){}return''}
function s_saveAcc(){if(window.s_account&&!window.s_errorPage){s_c_w('s_gpv_acc',s_account);s_c_w('s_gpv_url',window.location.href)}}
function s_restoreAcc(){if(typeof s=='undefined'){s_account='';var a=s_c_r('s_gpv_acc');if(a)s_account=a}if(!s_errorRef)s_errorRef=s_c_r('s_gpv_url')}
function s_jsFileInfo(m){if(!m)m='';var u,f,c,v,d,l,t,i,j,e,o;try{throw new RangeError('')}catch(z){e=z}u=f=c=v=d=l='';if(!m&&e&&e.fileName)u=e.fileName;else{t=document.getElementsByTagName('script');if(t){for(i=t.length;--i>=0;){u=t[i].src;if(u&&(m&&u.indexOf(m)>-1)||u.match(/\.js$/))break}if(!m&&i<0)i=t.length-1;u=i>=0?t[i].src:''}}f=typeof window.s_fileVer=='string'?s_fileVer:'';c=typeof window.s=='object'&&s.version?s.version:'';v=f+(c&&f?' ':'')+c;l=u+(u&&v?' ':'')+v;d=l.replace(/.*\//,'').replace(/\.js/,'');o={url:u,fver:f,cver:c,ver:v,desc:d,ldesc:l};return o}
function s_getLoadTime(){if(!window.s_loadT){var o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round(((o.domInteractive||new Date().getTime())-a)/100):''}return s_loadT}
function s_clog(){try{var A='array',O='object',U='undefined',F='function',a=arguments,al=a.length,i,j,v,l='',o=l,e=l,c=l,x=0,d=0,z=0,p,q,f0=1,f1=1,f3=1,m=1<<16,W=function(o){try{c+=o+'\n';if(window.s_Debug){if(typeof s_debugW!=O)s_debugW=window.open('','_debugWin','height=600,width=900,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');if(typeof s_debugW==O){if(typeof s_debugD!=O)s_debugD=s_debugW.document;if(typeof s_debugD==O){if(typeof s_debugD.write==F)s_debugD.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html><head><title>debugWin</title><style>* {font-family:Andale Mono,OCR A Extended,Consolas,monospace,serif;font-size:9pt;word-wrap:break-word;padding:0px} p {display:block;clear:both;margin:1px;width:100%;border:none;border-bottom:1px solid #dddddd;}</style></head><body>');if(typeof s_debugD.write==F)s_debugD.write('<p>'+o.replace(/[ \t]/g,'&nbsp;').replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;').replace(/\n$/,'').replace(/\n/gi,'<br/>')+'</p>');if(typeof s_debugW.scrollBy==F)s_debugW.scrollBy(0,100)}}}else if(typeof console.log==F||typeof console.log==O){console.log('%s',o)}}catch(e){}},B=function(v){v=v+'';var j,b,r,w,c,f=1;for(j=0;j<v.length;j++){b=v.substr(j,1);r=b=='\n';w=b<=' ';c=b<'A';if(r||(f&&c&&l.length>140)||(f&&l.length+v.substring(j).replace(/\n.*/,'').length>140)){o+=l;z+=o.length;if(o.length>2048){W(o);o=''}else o+='\n';l=r?'':'  ';x=!r;f=0}if(!r&&(!x||!w)){l+=b;x=f=0}}},P=function(v){var d=0,i,err=0,T=function(z){var t=z===null?'null':typeof z;if(t=='array')t='object';return t},u=function(z){var t=T(z);if(t=='string')B("'"+z+"'");else if(t=='boolean')B(z?'true':'false');else if(t=='function')B('function(){...}');else if(t=='null')B('null');else if(t=='undefined')B('undefined');else B(z+'')},b=function(v){if(++d>99){d--;B('/* ERROR! TRUNCATED: TOO DEEP */');return}var o=typeof v=='object'&&typeof v.length!='number',p,x,f=1,j=0;B(o?'{':'[');for(p in v){j++;B(f?'':',');if(o){B('\n');for(i=0;i<d;i++)B(' ')}if(j>1000){B('/* ERROR! TRUNCATED: TOO LARGE */');err=1}if(!err){if(o)B(p+': ');x=v[p];if(T(x)!='object')u(x);else b(x)}f=0}d--;if(o){B('\n');for(i=0;i<d;i++)B(' ');B('}')}else B(']')};if(T(v)!='object')u(v);else b(v)},FN=function(c){var n='',v,j;try{if(c){c=c+'';if(!c.indexOf('function '))c=c.substring(9);j=c.indexOf('(');if(j>-1)c=c.substring(0,j);if(!c)c='anonymous';n=c}}catch(e){}return n};var dp=s_getQueryStr('s_debug');if(dp>''){dp=dp==' '?1:parseInt(dp)||0;s_c_w('s_debug',String(dp))}dp=s_c_r('s_debug');s_Debug=dp>''?parseInt(dp):window.s_Debug||0;for(i=0;i<al;i++){v=a[i];if(typeof v==O){for(p in v){if(z<m&&z>=0){if(isNaN(p))B(p+'=');P(v[p])}}}else if(v=='-f'){f0=0}else if(v=='+f'){f0=1}else if(v=='-u'){f1=0}else if(v=='+u'){f1=1}else if(v=='+n'){f2=1}else if(v=='+n'){f2=1}else if(v=='arguments'){v=arguments.callee.caller;for(j=v;j;j=j.caller)q=FN(j)+(q?'>'+q:'');B(q);P(v.arguments)}else if(v=='function'){B(FN(arguments.callee.caller))}else if(v=='stack'){B(st())}else B(v);B(' ')}o+=l;o=o.replace(/^[ \t]*\n/,'').replace(/[ \t\n]*$/,'');if(o)W(o)}catch(e){}return c}
function s_getVisitStart(c){d=s_getVisitDuration();return d<.1}
function s_getVisitDuration(c){if(!c)c='s_dur';var M=60000,V=1800000,a=new Date(),t=a.getTime(),v=s_toInt(s_c_r(c)),d=0;if(isNaN(v)||(t-v)>V)v=t;d=t-v;a.setTime(t+1800000);s_c_w(c,v+'',a);c=s_c_r(c);return d/M}
function s_getVisitNum(p,a,b){var D=new Date,P,V,T=D.getTime(),d,i,t=0,k,o,y,H=1800000,s_dimo=function(m,y){var d=new Date(y,m+1,0);return d.getDate()},s_endof=function(x){var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=='m')d=s_dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;else if(x=='w')d=7-t.getDay();else d=1;t.setDate(t.getDate()+d);return t};if(!p)p='m';if(p=='m'||p=='w'||p=='d'){o=s_endof(p);y=o.getTime();D.setTime(y)}else{d=p*86400000;D.setTime(T+d)}if(!a)a='s_vnum';if(!b)b='s_invisit';P=s_c_r(a);if(P){i=P.indexOf('&vn=');t=s_toInt(P.substring(i+4,P.length));if(isNaN(t)||t<0)t=0}V=s_c_r(b);if(V){if(t){D.setTime(T+H);s_c_w(b,'Y',D)}return t}else{if(t){t++;k=P.substring(0,i);D.setTime(k);s_c_w(a,k+'&vn='+t,D);D.setTime(T+H);s_c_w(b,'true',D);return t}else{s_c_w(a,D.getTime()+'&vn=1',D);D.setTime(T+H);s_c_w(b,'Y',D);return 1}}return 1}
function s_getDaysSinceLastVisit(k,f){if(typeof k!='string'||!k){f=k?k:1;k=''}k=k||'s_lv';f=!!f;var M=60000,V=30*M,D=48*V,a=new Date(),t=a.getTime(),l=k+'_s',u=s_c_r(k),v=s_c_r(l),c=new Date(t+V),d=new Date(t+999*D),x=0;u=u&&!isNaN(u)?parseInt(u):0;if(u&&v&&!isNaN(v)){x=parseInt(v)}else{x=u?Math.floor((t-u)/D+0.5):-1;if(x>999)x=999;if(x<0)x=-1;a=new Date(a.getFullYear(),a.getMonth(),a.getDate());t=a.getTime();s_c_w(k,t,d)}s_c_w(l,x+'',c);if(!f)x=x<0?'New':(x<7?'Less than '+(x<1?'1 day':'7 days'):('More than '+(x<30?'7':'30')+' days'));return x}
// END preSlib

// s_code_lenovo.js
// SiteCatalyst code version: H.27.4
// Copyright 1996-2013 Adobe, Inc. All Rights Reserved
// More info available at http://www.omniture.com
// UPDATED: 23-Sep-2014
var s_fileVer='140923';

/************************** CONFIG SECTION **************************/

/* custom s_code vars */
if(!s_isO(window.lmd))var lmd={}; //Page-level meta data object
if(!s_isO(window.s_mapv))var s_mapv={}; //URL map object
if(!s_isO(window.s_P))var s_P={}; //Internal meta data object
if(!s_url)var s_url=lmd.xDomainURL||lmd.URL||window.location.href; //effective page URL
var s_DN=s_getShortHn(s_url); //abbreviated domain name

/* Create the s object */
if(!window.s_account) s_account = 'lenovoglobalerrors';
if(!window.s_duplicateLoad) s=s_gi(s_account);
if(s_url!=window.location.href) s.pageURL = s_url;

/* JS info */
try{
	s_code_ver=s_jsFileInfo('s_code_section');
	s_clog('s_code_lenovo'+(window.s_duplicateLoad?'DUP ':''),s_code_ver.ver,s_code_ver.url)
}catch(e){}

/* Cookie Domain Periods (Top Level Domain Levels) */
s.cookieDomainPeriods = s_getTLDlevels();

/* Char Set Config */
s.charSet=s_getCharSet()||'UTF-8';

/* Link Tracking Config */
s.trackDownloadLinks=true;
s.trackExternalLinks=true;
s.trackInlineStats=true;
s.linkDownloadFileTypes='avi,doc,docx,exe,iso,mov,mp3,mpg,pdf,ppsx,ppt,pptm,pptx,psd,rar,rpm,txt,wav,wmv,wrf,xls,xlsm,xlsx,xps,zip';
s.linkInternalFilters=s_isS(window.s_linkInternalFilters)?s_linkInternalFilters: '131.ibm.com,133.ibm.com,306.ibm.com/common/ssi/,604.ibm.com,605.ibm.com/webapp/wcs/stores,606.ibm.com/products/hardware/configurator/,9.179.20.57/lenovoinfo,900.ibm.com,903.ibm.com/kr/support/pc,ahe.sagamino.ibm.com,caipsgws001.can.ibm.com,cardinalcommerce.com,experiencelenovo.com,fm365.com,franklin-lenovo.staging,gc.digitalriver.com,i2.com,ibm.com/lenovoinfo,ibm.com/pc/,ibm.com/products/hardware/configurator,icm1.teleweb.ca.ibm.com,insidelenovo.com,javascript:,kelkoo.,lenovo.cn,lenovo.co,lenovo.com,lenovo2008.com,lenovoideas.com,lenovojp.com,lenovosocial.com,lenovotorch.com,lenovovision.com,opinionlab.com,pc.ibm.com,phoenix1.br.ibm.com,service.pageshare.com,www-06.ibm.com,www-1.ibm.com/products/hardware/configurator,www-8.ibm.com,zoomerang.com';
s.linkLeaveQueryString=false;
s.linkTrackVars=s_isS(window.s_linkTrackVars)?s_linkTrackVars: 'channel,events,server,eVar3,eVar5,eVar15,eVar27,eVar33,eVar42,eVar43,eVar44,eVar47,eVar53,eVar58,eVar68,eVar75,prop3,prop4,prop5,prop6,prop7,prop10,prop20,prop29,prop33,prop36,prop40,prop47,prop55,prop61,prop62,prop63,prop64,prop64,prop65';
s.linkTrackEvents=s_isS(window.s_linkTrackEvents)?s_linkTrackEvents:'';
if(s.linkInternalFilters.indexOf(s_DN)<0)s.linkInternalFilters+=','+s_DN;

/* Page Name Plugin Config */
s.siteID=s_DN.replace(/\.?lenovo\.com$/,'');
s.defaultPage='';
s.queryVarsList='';
s.pathExcludeList='index,default,default.page,landing.page';
s.pathExcludeDelim='.';
s.pathConcatDelim=':';

/* Form Analysis Config */
s.formList=
s.eventList='';
s.trackFormList=
s.trackPageName=true;
s.useCommerce=false;
s.varUsed='prop30';

/* DFA Config */
var dfaConfig={
	CSID: '1515899',
	SPOTID: '1847082',
	tEvar: 'eVar60',
	errorEvar: 'eVar61',
	timeoutEvent: 'event37',
	requestURL: 'http://fls.doubleclick.net/json?spot=[SPOTID]&src=[CSID]&var=[VAR]&host=integrate.112.2o7.net%2Fdfa_echo%3Fvar%3D[VAR]%26AQE%3D1%26A2S%3D1&ord=[RAND]',
	maxDelay: '9999',
	visitCookie: 's_dfa',
	clickThroughParam: 'dfaid=1',
	searchCenterParam: undefined,
	newRsidsProp: s_account
}
s.maxDelay=dfaConfig.maxDelay;
s.loadModule('Integrate');

/* Media Module Config */
s.loadModule('Media');
s.Media.onLoad=function(s,m){
	s.Media.playerName='Media Player';
	s.Media.trackMilestones='50,100';
	s.Media.autoTrack=
	s.Media.segmentByMilestones=
	s.Media.trackUsingContextData=true;
	s.Media.contextDataMapping={
		'a.contentType':'eVar68',
		'a.media.name':'eVar66,prop60',
		'a.media.segment':'eVar67',
		'a.media.view':'event63',
		'a.media.segmentView':'event65',
		'a.media.timePlayed':'event62',
		'a.media.milestones':{
			50:'event66',
			100:'event67'
		}
	}
	s.Media.trackVars='events,eVar66,eVar68,eVar67,prop60,prop22';
	s.Media.trackEvents='event63,event65,event62,event66,event67';
};

/* Adobe Audience Mgr integration */
if (typeof demdex_seg != "undefined" && demdex_seg != "") {
    for (var i = 0; i < demdex_seg.length; i++) {
        if (demdex_seg[i].cn == "aam_sc") {
            if (demdex_seg[i].cv.split(",")) {
                var _i = demdex_seg[i].cv.replace('aam=','');
                if(_i) s.list1 = _i;
             }
         }
     }
}

/* Plugin Config */
s.usePlugins=true;

/************************* DOPLUGINS FUNCTION ***********************/

function s_doPlugins(s){
	
	/* Initialize */
	s_getLoadTime();
	s_url = lmd.xDomainURL || lmd.URL || window.location.href;
	if(s_url!=window.location.href) s.pageURL=s_url;
	if(!s.events || !s_isS(s.events) || s.events.toLowerCase()=='none') s.events=''; //Initialize s.events
	var cT = s.callType(); //Get type of call ('t', 'd', 'e', 'o', '+')
		
	if(cT!='+'){ //if s.t or s.tl call...
		
		if(document.URL.indexOf("challengeyourdo.lenovo.com")>-1 || document.URL.indexOf("thebestyes.lenovo.com")>-1 || document.URL.indexOf("apps.lenovo.com")>-1){
			s.prop73=s.eVar65="Indirect"
		}
		/* Page view event, Page URL, domain, referring domain, referring URL */
		if(cT=='t') s.setEvent(59); //Page View
		s.prop3 = s.eVar75 = s_url;
		s.tlAdd('prop3'); //Page URL
		s_setIf(s_DN,s,'server'); //s.server

		// Referring
		var dREF = s.getQueryParam('refurl') || document.referrer || s.referrer || ''; //effective referrer
		s_setIf(dREF,s,'referrer'); //original referrer for redirects
		s.prop46 = s_getShortHn(dREF) || 'None'; //Referring Domain
		s.prop51 = dREF || 'None'; //Referring URL

		/* Page load time */
		if(cT=='t'){
			var pLT = s_getLoadTime(); //Page load time in 1/10 seconds
			if(pLT>0) s.setEvent(99,pLT);
		}

		/*========== Visit Metrics ==========*/

		s.prop22 = s.c_r('s_vi'); //SiteCatalyst VisitorID

		/* Days since last visit, new/repeat */
		var pDSLV = s_getDaysSinceLastVisit(),
			pLV = s_round(pDSLV,0,-1);
			pNew = pLV<0;
		s.prop10 = pNew? 'New': 'Repeat'; //New vs. Return Visits
		s.setEvent(pLV>0?100:0,pLV); //event100: Days Since Last Visit
		s.prop69 = pNew? 'New': pLV; //Days Since Last Visit

		/* Visit number */
		var vN = s_round(s_getVisitNum(),0,0); //Visit number
		if(vN>0) s.setEvent(97,vN); //event97: Visit Number
		s.prop71 = vN>0?vN:''; //Visit Number

		/* Visit start, duration */
		var vDUf = s_getVisitDuration(),
			vDU = s_isN(vDUf)? s_round(vDUf+0.50001,0,0): 0; //Visit Duration (min)
		s.setEvent(96,vDU); //event96: Visit Duration (min)
		var vS = s_getVisitStart();
		s.setEvent(53,vS?1:0); //event53: Visit Starts

		/* Visit depth */
		s.eVar10 = s.prop49 = ( cT=='t'? s.getActionDepth('s_depth'): '' ); //Visit Depth

		/*========== Page name, locale, path ==========*/

		/* Init path object, get meta data */
		s_P = getMetaData( null, s_mapv ); //Get meta data from html meta tags, mapping table, lmd object

		/* Set path and locale */
		var spal = 0;
		if(s_isF(window.s_code_sectionSpecific))try{
			s_code_sectionSpecific(s,s_P);
			if(s_P.locale) spal = 1
		}catch(e){
			spal=0;
			s_clog('  RTE ',s_mapv.sjs)
		}
		if(!spal||!s_P.locale) s_P = setPathAndLocale(s_P); //Set path and locale using default logic
		s_setIf(!s_P.canonical && !s_P.analyticsName?s_url:'',s,'prop2'); //No Canonical

		/* Set CC, LC */
		s.prop36 = s.eVar5 = s_UC( s_P.cc );
		s.tlAdd('prop36','eVar5'); //Country code
		s.prop29 = s_UC( s_P.lc ); //Language code

		/* Preload page? */
		var Pre = s.getQueryParam('cid');
		if(s_LC(Pre).indexOf('pre')!=0) Pre=false;
		if(Pre){
			s.referrer = 'http://lenovo.com/'+s_P.cc+'/';
			Pre = s_LC(Pre).replace(/^pre(load(ed)?)?-?/,'');
			s_P.section = 'preload';
			if(s_P.path.indexOf('preload')<0){
				s_P.path = 'preload'+(s_P.path?':':'')+s_P.path+(Pre?':':'')+Pre;
				s_P.pnl += ' >pre> '+s_P.path;
			}
			Pre = true;
		}

		/* Error page? */
		if(s_errorPage || s.pageType){ //if we're on an error page...
			if(!s_errorPage) s_errorPage = 'unknown';
			s.pageType = 'errorPage';
			if(s_errorRef) s.referrer = s_errorRef;
			else s_errorRef = dREF || 'None';
			s.prop27 = s_errorRef; //Error Referrer
			s_P.section = 'error';
			s_P.path = ['error',s_LC(s_errorPage),s_url].join(':');
			s_P.pnl += ' >err> '+s_P.path;
		}

		/* Set path to 'home' if at top */
		s_P.path = au.scrubPath(s_P.path);
		if(s_P.path.length==0){
			s_P.path = 'home';
			s_P.pnl += ' >top> '+s_P.path;
		}

		/* FINAL pageName */
		if( lmd.bu !== "support" && lmd.buOrig !== "support" ){
		if(lmd.xDomainPN && cT=='o'){
			s.pageName = lmd.xDomainPN;
			s_P.pnl += ' >xd> '+s.pageName;
		}else{
			s.pageName = s_P.locale+':'+s_P.path.replace('.shtml',''); //pageName
			s_P.pnl += ' >loc> '+s.pageName;
		}
		}
		
		if( typeof s.customPageName !== "undefined" && s.customPageName !== "" ){
			s.pageName = s.customPageName;
			s.customPageName = "";
		}
		
		/* eSupport Specific Modification */
		/*if( location.hostname.match( "support.lenovo.com" ) ){
			s.pageName = _satellite.getVar( "Support Page Name" );
		}*/
		
		/* Propagate pageName into Custom Page Name Variables prop12 and eVar58 */
		s.prop12 = s.eVar58 = s.pageName;
		if( lmd.bu !== "support" && lmd.buOrig !== "support" ){
		/* Hierarchy-related variables (based on the path) */
		var pathSp = s_split(s_P.path,':'),
			pathL = s_P.locale;
		for(var i=0;i<6;i++) //assign prop61-prop66 hierarchy values
			eval("pathL+=pathSp.length>"+(i)+"?':'+pathSp["+(i)+"]:'';s.prop6"+(i+1)+"=pathL");
		s.hier1 = s_P.path.replace(/:/g,'/'); //Full hierarchy
		s.channel = s.eVar27 = s.prop61; //Top-level hierarchy (Site Section L1)
		}
		/* Detailed page name, Page Title, breadcrumb */
		s.prop50 = s.pageName+(s_P.analyticsNameDetail? ':'+s_P.analyticsNameDetail: ''); //Detailed Page Name
		s.prop56 = s_P.title || '' //Page Title
		s.prop57 = s_scrubWS(s_P.breadcrumb||'').replace(/\s*>\s*/g,' > '); //Breadcrumb

		/* RSID, business unit, page type */
		try{
			s_setIf(s_account.split(",")[0],s,'prop58','eVar63'); //RSID New Method for Multi-Suite Tagging 141120
		} catch(e){
			s_setIf(s_account,s,'prop58','eVar63'); //RSID
		}
		
		if(cT=='t'){
			if(!s_P.section || s_P.section=='unknown') s_P.section = pathSp.length>0? 'legacy:' + pathSp[0]: (s_P.microsite?'microsite':'unknown');
			s.eVar15 = s.prop7 = s_P.section; //Page Type (NOT s.pageType)
			s.eVar16 = s.prop1 = s.prop7 + (s_P.sectionDetail? ':'+s_P.sectionDetail: ''); //Site Sub Sections
		}else{
			s.eVar16 = s.prop1 = '';
		}
		s.eVar32 = s_P.bu || 'n/a';		// 140623 - lmd.bu
		s.tlAdd('prop58','eVar63','prop1','prop7','eVar15','eVar16');

		/*========== Previous Page Metrics ==========*/

		/* Previous page */
		var pPN = s.getPreviousValue(s.pageName,'s_ppn','',cT=='t');
		if(!pPN || pPN == 'no value') pPN = '';
		s.eVar70 = s.prop45 = pPN; //Previous Page
		if(pPN&&cT=='t') s.events = s.apl(s.events,'event23',',',1); //Previous page view

		/* Percent page viewed */
		if(cT=='t' || cT=='e'){
			var pPV = s.getPercentPageViewed(s.pageName); //get previous page percent viewed array
			if(s_isA(pPV) && pPV[0]!='' && pPN==pPV[0] && pPV.length>=3) s.prop43 = pPV[1]+'|'+pPV[2]; //percent page viewed, total|initial
		}

		/* Active page view time */
		s.prop68 = '';
		var pVT = s.activeViewTime(s.pageName);
		if(pVT&&pVT[0]==pPN){
			s.prop68 = pVT[2];
			if(!isNaN(pVT[1])) s.setEvent(22,pVT[1]);
		}

		/*========== Lenovo Page Metrics ==========*/

		/* Lead form abandonment */
		s.setupFormAnalysis();

		/* Enhanced exit tracking */
		s.elh = s.exitLinkHandler();
		if( s.elh.indexOf( 'bit.ly' )>-1 ) {
			s.linkType = 'd';
			s.url = s.elh;
		} else {
			s.url = s.downloadLinkHandler();
		}
		
		if(s_isS(s.prop35) && s.prop35.indexOf('.pdf') == s.prop35.length-4){
			s.url = s.prop35; //reassign old prop35 ("PDF Filename") to download url
			s.prop35 = '';
		}
		if(s_isS(s.eVar57) && s.eVar57.indexOf('.pdf') == s.eVar57.length-4){
			if(!s.url)s.url = s.eVar57; //reassign old eVar57 ("PDF Filename") to download url
			s.eVar33 = '';
		}
		if(s.url){
			s.eVar33 = s.prop33 = s.url.substring(s.url.lastIndexOf('/')+1,s.url.length); //Download Filename
			s.prop20 = s.pageName; //Download Origin
			s.linkTrackVars = s.apl(s.linkTrackVars,'eVar33,prop20,prop33,events',',',1);
			s.setEvent(44); //File Downloads
			s.linkTrackEvents = s.apl(s.linkTrackEvents,'event44',',',1);
		}

		/* Add Meta data event and product values */
		if(s_P.events)s.setEvent(s_P.events);
		if(s_P.products){
			//s.products = s_P.products;
			try{
			var individualProducts = s_split(s_P.products,',');
			var cleanProductStringArray = [];
			for(i=0;i<individualProducts.length;i++)
			{ 
				var temp = individualProducts[i];
				var singleCleanProduct = temp.match(/([^;]*;[\w\-]*)[^;]*(.*)/);
				if( singleCleanProduct !== "undefined" && singleCleanProduct !== "" ){
					if( singleCleanProduct.length > 2 ){
					cleanProductStringArray.push(singleCleanProduct[1] + singleCleanProduct[2]); // use only the pre and post to rebuild the product string
					} else {
						cleanProductStringArray.push(singleCleanProduct[1]);
					}
				} else{
					cleanProductStringArray.push(temp);
				}
			}
			s.products = cleanProductStringArray.join(',');
			} catch(e){
				s.products = s_P.products;
				_satellite.notify( "Error Processing Products String", 1 );
			}
		}

		/* Brand, series, subseries */
		if(s_P.brand&&(!s_P.series||!s_P.subseries)){ //if we're missing s_P.series or s_P.subseries...
			for(var i = 0;i<(pathSp.length-1);i++){ //try to find s_P.series and/or s_P.subseries in the s_P.path
				if(s_P.brand&&!s_P.series&&pathSp[i]==s_P.brand)s_P.series = pathSp[i+1]; //s_P.series found?
				if(s_P.series&&!s_P.subseries&&pathSp[i]==s_P.series)s_P.subseries = pathSp[i+1]; //s_P.subseries found?
			}
		}
		if(s_P.brand)s_P.brand = s_P.brand.replace(/:/i,';');
		if(s_P.series)s_P.series = s_P.series.replace(/:/i,';');
		if(s_P.subseries){
			s_P.subseries = s_P.subseries.replace(/:/i,';').replace(/ ?new ?!?/gi,'');
			if(s_P.subseries.indexOf(',')>0)s_P.subseries = s_P.series?s_P.series:'multiple subseries';
		}
		s.eVar42 = s.prop4 = s_P.brand?s_P.brand:'no brand'; //Product Brand
		s.eVar43 = s.prop5 = (s_P.brand&&s_P.series)?(s_P.brand+(s_P.brand?':':'')+s_P.series):'no series'; //Product Series
		s.eVar44 = s.prop6 = (s_P.brand&&s_P.subseries)?(s_P.brand+(s_P.brand?':':'')+s_P.subseries):'no subseries'; //Product Subseries

		/* Populate eVars and props set by the page */
		s_setIf(s_P.actualBoxNum,s,'prop28',3);
		s_setIf(s_P.audienceSegment,s,'prop8','eVar11',3);
		s_setIf(s_P.customerID,s,'prop54',3);
		s_setIf(s_P.discountCode,s,'eVar29',3);
		s_setIf(s_P.eCoupon,s,'eVar13',3);
		if( s.eVar13 ) s.eVar13 = s.eVar13.split(',')[0];  // only use the first eCoupon for tracking purposes
		s_setIf(s_P.eDealCode,s,'eVar26',3);
		s_setIf(s_P.EPPserial,s,'eVar35');
		s_setIf(s_P.errorReferrer,s,'prop27',3);
		s_setIf(s_P.lenovoserver,s,'prop59');
		s_setIf(s_P.pageNameSearchTerms,s,'prop16',3);
		s_setIf(s_P.paymentMethod,s,'eVar18',3);
		s_setIf(s_P.purchaseID,s,'purchaseID',3);
		s_setIf(s_P.registrationSrc,s,'eVar17',3);
		s_setIf(s_P.repID,s,'eVar19',3);
		s_setIf(s_P.shippingType,s,'eVar20',3);
		s_setIf(s_P.state,s,'state',3);
		s_setIf(s_P.storeID,s,'eVar12',3);
		s_setIf(s_P.wishlistID,s,'prop14','eVar49',3);
		s_setIf(s_P.wishlistPageName,s,'prop15',3);
		s_setIf(s_P.zip,s,'zip',3);
		s_setIf(s_P.userStatus,s,'eVar47');
		s_setIf(s_P.lenovoID,s,'eVar53');
		s_setIf(s_P.registrationSource,s,'eVar17');
		s_setIf(s_P.leadType,s,'eVar8');
		s_setIf(s_P.leadInteractionDetail,s,'prop44');
		s_setIf(s_P.eSupportDeviceInfoSerialNumber,s,'eVar3');

		/* Order and order status */
		checkOVP();

		// set purchaseID/eVar24/prop53 to the same value for a purchase
		if(s.isEventSet('purchase')) s.purchaseID = s.eVar24 = s.prop53 = s.purchaseID||s.prop53||s.eVar24||''; 
		else s.purchaseID = '';  // clear purchaseID for non-purchases
		
		s.eVar21 = s.prop54||'';
		// For AU and NZ, 
		try{
			if( 'au,nz'.indexOf( s_mapv.cc )>-1 ){
				if( typeof s_P !== "undefined" && typeof s_P.storeID !== "undefined" && s_P.storeID.toLowerCase() === "share lenovo" && typeof s_P.loginDomain === "string" ){
					s.eVar12 += "-" + s_P.loginDomain;
				}
			}
		} catch( e ){
		}
		if(s.isEventSet('purchase')||s.isEventSet('event46')){ //if this is a purchase or order view, set unassigned values to 'Unknown'
			s_def('Unknown',s,'prop53'); //Order Number
			s_def('Unknown',s,'eVar24'); //Order Number
			s_def('Unknown',s,'prop54'); //Cust ID
			s_def('Unknown',s,'eVar21'); //Cust ID
		}
		s.currencyCode = s_P.currencyCode||'';
		if(!s.currencyCode&&s_DN=='checkout.lenovo.com'&&s_P.cc){ //Digital River currency code fix hack
			var currCC = 'uk,gb,de,fr,nl,dk,ch,se,at',
				currCU = 'GBP,GBP,EUR,EUR,EUR,DKK,CHF,SEK,EUR';
			s.currencyCode = s_matchList(s_P.cc,currCC,currCU,1);
		}
		
		/* 
		 * Check if currency code is not set through lmd object. If currency code is not set,
		 * before defaulting to USD, check if the "checkoutData" object exists and contains a currency
		 * code that could be used. This temporary fix was added to due an issue where the local currency
		 * was unexpectedly used in the products string instead of the USD version previously utilized.
		 */
		if(!s.currencyCode){
			if( typeof checkoutData !== "undefined" && typeof checkoutData._currencyCode !== "undefined" && checkoutData._currencyCode !== "" ){
				s.currencyCode = checkoutData._currencyCode;
			} else {
				s.currencyCode = 'USD';
			}
		}
		
		/* Attach Status */
		s.eVar71 = s.isEventSet('purchase')? s_P.attachStatus||'Unknown': '';

		/* menu/ref ids - SR 10/11 */
		s.prop40 = s.getQueryParam('menu-id,ref-id',':'); //Masthead

		if( lmd.bu === "support" || lmd.buOrig === "support" ){
			if( _satellite.textMatch(_satellite.getVar("internalSearch:event"),"valid search event") ){
				s.prop31 = s.eVar2 = _satellite.getVar("internalSearch:searchTerms");
				s.prop23 = _satellite.getVar("internalSearch:resultsCount");
				s.prop52 = _satellite.getVar("internalSearch:facetedBrowse");
			}
		} else {
			/* Internal Search */
			s.eVar2 = s.prop31 = s.prop23 = s.prop24 = s.prop70 = '';
			s.setEvent(6,0);
			s.setEvent(43,0);
			s.setEvent(94,0);
			if(document.location.href==dREF)s_P.intSearchTerms = '';
			if(s_P.intSearchTerms){
				var sdnum = s.getQueryParam( 'startingDocNum');
				if( sdnum=='' ){
					s.eVar2 = s.prop31 = s.getValOnce(s_P.intSearchTerms,'s_prop_31',0); //Internal Search Terms
					if(s.eVar2) {
						s.setEvent(6); //Internal Searches
						s.prop24 = pPN||'Unknown'; //Internal Search Origination Page
						if(s_P.intSearchCount)s.prop23 = s_P.intSearchCount; //Internal Search Results Count
						if( parseInt( s.prop23 ) == 0 ) s.prop23 = 'zero';
					}
					if(s_P.intSearchCount==='0'||s_P.intSearchCount===0)s.setEvent(94); //Internal Searches - No Results
				} else {
					sdnum = new Number( sdnum );
					if( sdnum != 'NaN' ) {
						if( sdnum > 0 ) {
							s.prop23 = s_P.intSearchCount;
							s.eVar2 = s.prop31 = s_P.intSearchTerms;
						}
					}
				}
			}else{
				s.prop70 = s_P.intSearchClickRank?s.pageName:''; //Internal Search Destination
				if(s.prop70)s.setEvent(43);
			}
		}

		/* Login/Logout */
		if(!s_LC(s.eVar31).indexOf('log'))s.eVar31 = ''; //Clear Login eVar if it's not set to 'login' or 'logout'

		/* Remap faceted browse value from eVar72 to prop52 */
		s.prop52 = s.eVar72||''; //Faceted browse value
		if(s.prop52){
			s.prop52 = (s.pageName||s_url)+'|'+s.prop52;
			s.tlAdd('prop52');
		}

		/* Popup Tracking */
		s.eVar38 = prop21 = s.eVar30 = '';
		if((s_isS(s_P.popupAction)&&s_P.popupAction)||(s_isS(s_P.popupName)&&s_P.popupName)){
			if(!s_P.popupName)s_P.popupName = s.pageName;
			if(!s_P.popupAction)s_P.popupAction = 'view';
			s.eVar38 = s_P.popupName;
			s.prop21 = s_P.popupName+'|'+s_P.popupAction;
			s.setEvent(80); //Popup Action (all)
			var mapFrPa = 'offer,request,accept,decline,view,convert', //Map from
				mapToPa = 'event24,event81,event25,event26,event82,event83', //Map to
				Pa = s_matchList(s_P.popupAction,mapFrPa,mapToPa,1);
			s.setEvent(Pa?Pa:'event82');
			if(s_P.popupConversion&&Pa=='convert')s.eVar30 = s_P.popupConversion;
			s.tlAdd('eVar38','prop21','eVar30');
		}

		/* SBB Metrics */
		if( s_P.configPrice || s_P.configOID || s.getEvent(50) || s.getEvent(51) || s.getEvent(55) ){
			if(s.getEvent(51)){
				s.setEvent(54,s_P.configPrice);
			}else if(s.getEvent(50)){
				s.setEvent(52,s_P.configPrice);
				s.setEvent(1);
			}
			s.eVar25 = s.prop35 = s_P.configOID||'';
		}

		/*========== Integration Calls ==========*/

		/* OpinionLab */
		s.eVar7 = s_P.OL_ID||'';
		if(s.eVar7)s.tlAdd('eVar7');
		var OLrp = !s_isU(s_P.OL_ratePage)?s_round(s_P.OL_ratePage,1,0):0,
				OLrs=!s_isU(s_P.OL_rateSite)?s_round(s_P.OL_rateSite,1,0):0;
		if(isNaN(OLrp)||OLrp<1||OLrp>5)OLrp=0;
		if(isNaN(OLrs)||OLrs<0||OLrs>10)OLrs=0;
		s.setEvent(38,OLrp); //Page Rating
		s.setEvent(34,OLrs); //Site Rating
		if(OLrp){
			s.setEvent(32); //Page Rated
			s.tlAdd('event32','event38');
		}
		if(OLrs){
			s.setEvent(33); //Site Rated
			s.tlAdd('event33','event34');
		}

		/* TnT Session ID and PCID */
		s.tnt=s.trackTNT();
		s.prop72=s_isO(window.mboxFactoryDefault)&&s_isF(mboxFactoryDefault.getPCId)?mboxFactoryDefault.getPCId().getId():'';
		if(s.c_r('s_tntref')){
			s.referrer=s.c_r('s_tntref')
			s.c_w('s_tntref','');
		}

		/* socialPlatforms v1.0 - used for SocialAnalytics */
		s.socialPlatforms('eVar73');

		/* Social Segmentation Plugin */
		s.eVar74='';
		var vv=s.smSeg('s_seg',1);
		if(vv){
			s.eVar74=vv.getMostRecent()||''; //last social touchpoint
			if(s.eVar74)s.linkTrackVars=s.apl(s.linkTrackVars,"eVar74",",",1);
		}

		/*========== Lenovo Affiliate Metrics ==========*/

		/* Covario AdId - Paid Search */
		s.eVar41=s.getQueryParam('adid'); //Covario AdId

		/* US Affinity */
		s.eVar26=s.getQueryParam('nxjid'); //eValue Code
		
		/* store ID */
		if(!s.eVar12) s.eVar12=s.getQueryParam('affinity');

		/* Internal campaigns */
		s.eVar1=s.getValOnce(s.getQueryParam('ipromoID'),'s_var_1',0); //Internal Promotions

		/* Demand Base */
		if(window.db_company) {
			var dbc = window.db_company;
			s.eVar52 = dbc.demandbase_sid || 'DBID not set';       
			s.eVar41 = dbc.audience || 'DB Audience not set';
		}

		/* Eloqua */
		s.eVar40=s.getQueryParam('elq_cid'); //Eloqua ID

		/*========== Lenovo Campaign Metrics ==========*/

		/* External campaign tracking (parameters PID, cid, kbid) */
		s.channelManager('PID'+(Pre?'':',cid')+',kbid,AID,PUBNAME','','','1','','');  //Take out preloads, i.e. ?cid=Pre
		if(s._campaignID!=''){ //Address multiple sets of pid, cid, kbid
			var qp=s.getQueryParam('pid'),qc=Pre?'':s.getQueryParam('cid'),qk=s.getQueryParam('kbid'),qa=s.getQueryParam('AID'),qpn=s.getQueryParam('PUBNAME'),qn=s.getQueryParam('nid');
			if(qa||qpn){
				if(!qn)qn='cj';
				if(!qc)qc=(s_LC(s_P.cc)||'??')+':affiliate'+':'+qa;
				s._campaign=qc+':'+qn+'|'+qa+'|'+qp+'|'+qpn;
			}
			else if(qp)s._campaign=qp;
			else if(qc)s._campaign=qc;
			else if(qk)s._campaign=qk;
		}

		/* Search keywords: eVar45 (organic/paid), prop34 (organic only) */
		s.campaign=(s._channel=='Natural Search')?('SEO '+s._campaign):((s._channel=='Referrers')?(''):(s._campaign)); //Tracking Code
		s.eVar45=((s._channel=='Natural Search')||(s._channel=='Paid Search'))?s_LC(s._keywords):''; //External Keywords (VISTA)
		s.prop34=(s._channel=='Natural Search')?s_LC(s._keywords):'';

		/* Email campaigns */
		if(!s.campaign)s.campaign=s.getQueryParam('rmid'); //Tracking Code
		if(!s.eVar9)s.eVar9=s.getQueryParam('rrid')||s.getQueryParam('elq_cid'); //Responsys RRID
		if(!s.eVar17)s.eVar17=s.getQueryParam('esrc'); //Registration Source

		/* Social referral campaign code? */
		if(!s.campaign){
			if(s.eVar74&&s.eVar74.indexOf(':')>0&&!(s.eVar74.indexOf('Facebook:App Interaction')>-1))s.campaign=s_LC('ww:social:'+s.eVar74);
		}
		
		/* Populate campaign code into eVar22, eVar4, prop47, eVar37 */
		if(s.campaign){
			s.eVar22=s.eVar4=s.campaign; //Tracking Code (visit)
			s.prop47='D=v0+":"+s.pageName'; //Campaign pathing
		}else{
			s.prop47=s.pageName; //Campaign pathing
		}
		s.eVar37=s.crossVisitParticipation(s.campaign,'s_ct','60','10','>',''); //Campaign Stacking

		/*========== Engagement Score ==========*/
		/*
		var L=-1,Lr=-1,Lb=-1,Ld='',LdE=[30,45,70,72,85],Ls,Lsv;
		s.setEvent(98,0);
		s.setEvent(88,0);
		for(var i=0;i<LdE.length;i++)
			s.setEvent(LdE[i],0);
		s.eVar57=s.prop74='';
		try{
			L=s_isF(window.s_evalLISA)?s_evalLISA():-1;
			if(!s_isN(L))L=-1;
			Lb=s_isF(window.s_getLISAbeta)?s_getLISAbeta():-1;
			if(!s_isN(Lb))Lb=-1;
			Ld=s_isF(window.s_getLISAterms)?s_getLISAterms():'';
			if(!s_isS(Ld)||Ld.indexOf('|')<0)Ld='';
		}catch(e){L=Lb=-1;Ld='';s_clog('  LISA ERROR')}
		s.prop74=Lb+''; //LISA Beta Score
		Lr=s_round(L,0,-1);
		if(Lr>=0){
			s.setEvent(98,Lr); //event98: LISA Score
			s.setEvent(88); //event88: LISA Score Set
			s.eVar57=Lr+''; //LISA Score
			for(var i=1,Ls=s_split(Ld,'|');i<6;i++){ //LISA Score terms
				Lsv=i<Ls.length?s_round(Ls[i],0,-1):0;
				if(Lsv>0)s.setEvent(LdE[i-1],Lsv);
			}
		}
		*/
		/*========== Wrap-up ==========*/

		/* s_code version */
		s.prop67='|'+(window.s_code_setup_ver?s_code_setup_ver.fver:'')
				+'|'+(window.s_code_ver?s_code_ver.fver:'')
				+'|'+(window.s_code_lisa_ver?s_code_lisa_ver.fver:'')
				+'|'+(window.s_code_section_ver?s_code_section_ver.fver:'')
				+'|'+s.version
				+'|'+rsDeter;														// 140908
		try{ s.prop67 += s_isO( _satellite )? '|DTM|': '|LEN|' }
		catch(er){ s.prop67 += '|LEN|' }
		
		/* remove "purchase" event from all custom/download/exit link tracking calls (workaround for ticket ADB-22) */
		if( cT == 'o' || cT == 'd' || cT == 'e' ) s.events = s.removeEvent( 'purchase' );

		/* console log */
		try{
			var pnl=s_P.pnl||'';
			s_P.pnl='';
			delete s_P.pnl;
			if(lmd)s_clog('  ',{'lmd':lmd});
			if(s_P)s_clog('  ',{'s_P':s_P});
			s_clog('s.t'+(cT!='t'?'l('+cT+') ':'()'),s_account+' '+s.pageName+
				'\n  ',pnl,
				'\n  ',{'CC':s.prop36},{'LC':s.prop29},{'Type':s.prop7},{'BU':s.eVar32},
				(s.events?	'\n  ':''),		(s.events?{'events':s.events}:''),
				(s.products?'\n  ':''),		(s.products?{'products':s.products}:''),
				(s.purchaseID?'\n  ':''),	(s.purchaseID?{'purchaseID':s.purchaseID}:''),
				(s.campaign?'\n  ':''),		(s.campaign?{'campaign':s.campaign}:''),
				(s.referrer&&document.referrer!=s.referrer?'\n  ':''),(s.referrer&&document.referrer!=s.referrer?{'s_referrer':s.referrer}:''),
				(document.referrer?'\n  ':''),(document.referrer?{'doc_referrer':document.referrer}:''),
				('\n   s_codes: ' + s.prop67)
				);
		}catch(e){}
		
				
		//User status tracking & user ID tracking
		if((typeof one_id !='undefined'&& one_id!=''&& one_id !='undefined')||s.eVar53){
			var dt=new Date
			dt.setTime(dt.getTime()+315360000000)
			if(typeof one_id !='undefined'&& one_id!=''&& one_id !='undefined')s.c_w('s_one_id',one_id,dt);
			if(s.eVar53)s.c_w('s_one_id',s.eVar53,dt);
		}
		
		if(s.c_r('s_one_id')) s.eVar53=s.prop48=s.c_r('s_one_id');
				
		if(s.eVar47=='loggedout')s.c_w('s_status','0');
		if(s.eVar47=='loggedin')s.c_w('s_status','1');
			
		if(s.c_r('LPSState')||s.c_r('s_status')){
			if(s.c_r('LPSState')=='0'||s.c_r('s_status')=='0') s.eVar47=s.prop42="loggedout"
			if(s.c_r('LPSState')=='1'||s.c_r('s_status')=='1') s.eVar47=s.prop42="loggedin"
		}
		else if(s.eVar53) s.eVar47=s.prop42="registered/not logged in"
		else s.eVar47=s.prop42="anonymous"

		/* Responsive Design */
		if( s.isRDsupported() ){
			if( !s.eVar36 ) s.eVar36 = s.c_r( 's_rd' ).split(':').slice(0,5).join(':'); // only 1st 5 elements
			document.onReady = s.responsiveDesign()
		}
		
		/* Setting Custom Events */
		if(s.isEventSet('prodView')){
			s.events=s.apl(s.events,'event101',',',1);
		}
		if(typeof s.campaign !== "undefined" && s.campaign !== ""){
			s.events=s.apl(s.events,'event102',',',1);
		}
			
		s.plugins = '';
			
	} //end of if(cT!='+'){...}

}
s.doPlugins=s_doPlugins;

/************************* CUSTOM FUNCTION **************************/
/*
 * s_varActive(n) - determine if variable will be used (based on type of call in progress)
 */
function s_varActive(n){ 
	if(typeof window.s!='object')return 0;
	if(!s.linkType||!s.linkTrackVars||typeof s.linkTrackVars!=T)return 1; //return TRUE unless tl call in progress and linkTrackVars is defined
	return (','+(s.linkTrackVars||'')+',pageURL,pageName,').indexOf(','+n+',')>=0 //return TRUE if built-in var or name in link track vars
}

function checkOVP(){
	try{
		var saveP = s.products || '', 
			saveE = s.events || '';
		/* Process Order Status Data */
		s.eVar14=''; //clear the order status merchandising eVar
		if(s_P.orderStatus){ //if there's order status data
			var OVPs = s_P.orderStatus.split(','), //seperate the SKUs in the order status metric
				OVPv = 'evar14', //name of merchandising eVar
				OVPp = 0; //flag indicates if s.products was already set (assume false)
			if(s.products){ //if s.products is already set
				OVPp = 1;
			}else{ //s.products didn't already exist
				s.products = ''; //clear s.products and set the scView event
				s.setEvent('scView'); //set view cart event
				s.setEvent(46); //set order status event;
			}
			for(var OVPi=0;OVPi<OVPs.length;OVPi++){ //loop through each sku in the order status field
				var OVPm=OVPs[OVPi].split(';'), //separate the current order status metrics for the current sku
					OVPsku = OVPm.length>0? OVPm[0]: '',
					OVPest = OVPm.length>1? OVPm[1]: '',
					OVPact = OVPm.length>2? OVPm[2]: '',
					OVPsta = OVPm.length>3? OVPm[3]: '', //name metrics
					OVPmer = OVPv+'='+OVPest+':'+OVPact+':'+OVPsta; //determine the merchandising eVar value for this sku
				if(OVPsku){ //only apply if the sku has been set
					if(OVPp){ //if s.products is already assigned, insert merchandising eVar into it
						var Ps = s.products.split(','); //seperate the SKUs in s.products
						for(var Pi=0;Pi<Ps.length;Pi++){ //loop through each sku in s.products
							var Pm = Ps[Pi].split(';'),  //seperate the fields in the current s.products sku
								Px = Pm.length, //number of fields in the current s.products sku
								Py = Px>=6 && Pm[5] && Pm[5].indexOf('=')>-1; //flag true if merchandising variables already exist in the current s.products sku
							if(Px>1 && Pm[1] && Pm[1]==OVPsku){ //if the current s.products sku is valid and matches the current order status sku
								for(;Px<5;Px++) Ps[Pi] += ';'; //add required sku field seperators
								Pm = Ps[Pi].split;
								Ps[Pi] += (Py?'|':';')+OVPmer; //add order status merchandising eVar, using appropriate separator
							}
						}
						s.products = Ps.join(','); //update s.products
					}else{ //s.products wasn't already set
						s.products += (s.products?',':'')+';'+OVPsku+';;;;'+OVPmer; //add the sku and merchandising data to s.products
					}
				}
			}
		}
	}catch(e){s.products=saveP;s.events=saveE}
}


/*
 * Set variables using Meta tags, the lmd JSON object and/or a query string parameter
 */
function getMetaData(P,mv){
	var
		mapFrEvents='orderstatus,orderdetail,configstart,configend,wishlistadd', //Map from
		mapToEvents='event46,event81,event50,event51,event55'; //Map to

	if(!s_isO(P))P = window.s_P || {};

	/* Data from s_code_setup */
	P.cc = mv.cc || '';
	P.lc = mv.lc || '';

	/* Data from URL */
	P.intSearchTerms=s_LC(s.getQueryParam('q')||'');

	/* Data from HTML tags */
	P.lenovoserver = s_scrubWS(s_getHTMLtag('meta','name','Host','content'));

	P.analyticsName = s_scrubWS(s_getHTMLtag('meta','name','analyticsname','content'));
	P.analyticsNameDetail = s_scrubWS(s_getHTMLtag('meta','name','analyticsnamedetail','content'));

	P.canonical = s_scrubWS(s_getHTMLtag('link','rel','canonical','href','mc'));

	P.section = s_LC(s_scrubWS(s_getHTMLtag('meta','name','siteflow','content'))||(mv.sec? 'legacy:' + mv.sec: '')); // 140715
	P.sectionDetail = s_LC(s_scrubWS(s_getHTMLtag('meta','name','taxonomytype','content'))||'');  // 140715

	P.brand = s_scrubWS(s_getHTMLtag('meta','name','productname','content'))||'';
	P.series = s_scrubWS(s_getHTMLtag('meta','name','modelname','content'));
	P.subseries = s_scrubWS(s_getHTMLtag('meta','name','modelnumber','content'));

	P.breadcrumb = s_scrubWS(s_getHTMLtag('div','id','breadcrumbs','text'));

	P.title = s_getHTMLtag('title','text','mc')||'';

	P.chatInvite = (
		s_getHTMLtag('div','id','chat-button')
		||s_getHTMLtag('div','id','chat')
		||s_getHTMLtag('div','id','chat_invite'))
		?'InstantService Chat':'';

	P.microsite = s_scrubWS(s_getHTMLtag('meta','name','microsite','content'))
		||(mv.msf? s_getOwnerHn(s.server): '');

	/* Data from lmd JSON object - events */
	var lmde = lmd.events||'';
	if( lmde && typeof lmde=='string' ){
		lmdes = s_split( lmde );
		for( var i=0; i<lmdes.length; i++)
			lmdes[i] = s_matchList( lmdes[i], mapFrEvents, mapToEvents, 0 );	// 140908
		lmde = '';
		for( i=0; i<lmdes.length; i++)
			lmde += (i>0?',':'')+lmdes[i];
		P.events = lmde;
	}

	/* Data from lmd JSON object - eVars and props */
	s_setIf(lmd.leadType,P,'leadType');
	s_setIf(lmd.leadInteractionDetail,P,'leadInteractionDetail');
	s_setIf(lmd.actualBoxNum,P,'actualBoxNum');
	s_setIf(lmd.analyticsName,P,'analyticsName',3);
	s_setIf(lmd.analyticsNameDetail,P,'analyticsNameDetail',3);
	s_setIf(lmd.attachStatus,P,'attachStatus');
	s_setIf(lmd.audienceSegment,P,'audienceSegment');
	s_setIf(lmd.breadcrumbs,P,'breadcrumb',3);
	s_setIf(lmd.bu,P,'bu');							// 140623
	s_setIf(lmd.canonical,P,'canonical',3);
	s_setIf(lmd.country,P,'cc',1);
	s_setIf(lmd.configPrice,P,'configPrice'); 
	s_setIf(lmd.configOID,P,'configOID');
	s_setIf(lmd.configItems,P,'configItems');
	s_setIf(lmd.currencyCode,P,'currencyCode');
	s_setIf(lmd.customerID,P,'customerID');
	s_setIf(lmd.discountCode,P,'discountCode');
	s_setIf(lmd.eCoupon,P,'eCoupon');
	s_setIf(lmd.EPPserial,P,'EPPserial');
	s_setIf(lmd.eDealCode,P,'eDealCode');
	s_setIf(lmd.host,P,'lenovoserver',3);
	s_setIf(lmd.intSearchTerms,P,'intSearchTerms');
	s_setIf(lmd.intSearchCount,P,'intSearchCount');
	s_setIf(lmd.intSearchClickRank,P,'intSearchClickRank');
	s_setIf(lmd.language,P,'lc',1);
	s_setIf(lmd.lenovoserver,P,'lenovoserver');
	s_setIf(lmd.loginDomain,P,'loginDomain');
	s_setIf(lmd.microsite,P,'microsite',3);
	s_setIf(lmd.modelName,P,'series',3);
	s_setIf(lmd.modelNumber,P,'subseries',3);
	s_setIf(lmd.OL_ID,P,'OL_ID');
	s_setIf(lmd.OL_ratePage,P,'OL_ratePage');
	s_setIf(lmd.OL_rateSite,P,'OL_rateSite');
	s_setIf(lmd.orderStatus,P,'orderStatus');
	s_setIf(lmd.pageNameSearchTerms,P,'pageNameSearchTerms');
	s_setIf(lmd.paymentMethod,P,'paymentMethod');
	s_setIf(lmd.productName,P,'brand',3);
	s_setIf(lmd.products,P,'products');
	s_setIf(lmd.popupAction,P,'popupAction');
	s_setIf(lmd.popupName,P,'popupName');
	s_setIf(lmd.purchaseID,P,'purchaseID');
	s_setIf(lmd.registrationSrc,P,'registrationSrc');
	s_setIf(lmd.repID,P,'repID');
	s_setIf(lmd.sbbID,P,'sbbID');
	s_setIf(lmd.shippingType,P,'shippingType');
	s_setIf(lmd.siteFlow,P,'section',3);
	s_setIf(lmd.state,P,'state');
	s_setIf(lmd.storeID,P,'storeID');
	//s_setIf(lmd.taxonomyType,P,'sectionDetail',3);  // 140715
	s_setIf(lmd.title,P,'title',3);
	s_setIf(lmd.wishlistID,P,'wishlistID');
	s_setIf(lmd.wishlistPageName,P,'wishlistPageName');
	s_setIf(lmd.zip,P,'zip');
	s_setIf(lmd.userStatus,P,'userStatus');
	s_setIf(lmd.lenovoID,P,'lenovoID');
	s_setIf(lmd.registrationSource,P,'registrationSource');
	try{
		if( (typeof lmd.eSupportDeviceInfo !== "undefined") && (typeof lmd.eSupportDeviceInfo.serialNumber !== "undefined") ){
			if( typeof lmd.eSupportDeviceInfo.machineTypeModel !== "undefined" && lmd.eSupportDeviceInfo.machineTypeModel !== "" ){
				s_setIf(lmd.eSupportDeviceInfo.serialNumber.toUpperCase() + "|" + lmd.eSupportDeviceInfo.machineTypeModel.toUpperCase(),P,'eSupportDeviceInfoSerialNumber');
			} else{
				/* Check if SerialNumber in Cookie matches Serial Number entered. 
				If yes, use the full cookie based information already set through the data element */
				var cookieSN = _satellite.getVar("Support Serial Number");
				if( typeof cookieSN !== "undefined" && cookieSN !== "" && cookieSN !== lmd.eSupportDeviceInfo.serialNumber.toUpperCase()){
					s_setIf(lmd.eSupportDeviceInfo.serialNumber.toUpperCase(),P,'eSupportDeviceInfoSerialNumber');
				}
			}
		}
	} catch(e){
	}

	return P;
}

/*
 * Set path using the precedence shown below, removing locale
 *	1. Value of analyticsname meta tag
 *	2. Parsed value of canonical tag
 *	3. Parsed contents of breadcrumb
 *	4. Value set by s_code_section file
 *	5. Parsed value of URL, based on getPageName()
 */
function setPathAndLocale(P){
	if(!s_isO(P)) var P = window.s_P || {};
	P.path = '';
	P.pnl = 'pageName: ';
	if(P.analyticsName){
		P.path = P.analyticsName;
		P.pnl+='>aN>';
	}else if(P.canonical && !location.hostname.match( "support.lenovo.com" )){
		P.path = au.urlToPath(P.canonical);
		P.pnl+='>can>';
	}else if(!P.path && P.breadcrumb){
		P.path = au.bcToPath(P.breadcrumb);
		P.pnl+='>bc>';
	}else if(!P.path){
		if(P.URL){
			P.path=s.getPageName(P.URL);
			P.pnl+='>pURL>';
		}else{
			P.path=s.getPageName(s_url);
			P.pnl+='>url>';
		}
	}
	P.pnl += ' '+(P.path||"''");
	if( s_LC(P.path).indexOf( 's wish list' )>-1 ){
		var wl = P.path.split(':').reverse();
		wl.shift();
		wl = wl.reverse();
		wl.push('wish list');
		P.path = wl.join(':');
		P.pnl += ' >wish> '+P.path;
	}
	var sp = P.path;
	P.path = au.scrubPath(P.path);
	if(P.path!=sp) P.pnl += ' >scrub> '+(P.path||"''");
	sp = P.path;
	P = au.pullLocaleFromPath(P);
	if(P.path!=sp) P.pnl+=' >pLoc> '+(P.path||"''");
	return P;
}

var s_lastErrorMsg='';
/*
 * Intercept function for calls to setErrorMessage(txt)
 */
function s_setErrorMessage(){
	var ret=0;
	try{
		if(s_isF(window.setErrorMessage_orig)) ret = eval('setErrorMessage_orig'+'.apply(this,arguments)');
		var txt=arguments.length>0?arguments[0]:'';
		if(!s_isS(txt)||!txt||txt==s_lastErrorMsg)return r;
		s_lastErrorMsg=txt;
		var t=document.createElement("DIV");
		t.innerHTML = txt;
		txt=t.innerText||t.textContent||txt;
		delete t;
		txt=txt.replace(/(<\/?([^>]+)>)/ig,''); //remove html
		txt=txt.replace(/^\((.*)\)$/,'$1'); //remove enclosing parans
		mn=txt.match(/[0-9]+\.?[0-9]+[^\d\w]?$/); //look for an error code
		if(mn){
			en=mn[0].replace(/[^\d\w]?$/,''); //truncate at error code
			if(!en)en=mn[0]; //if nothing left, restore
		}else{
			en=s_LC(txt).replace(/\..*/,''); //truncate everything after period.
		}
		if(!en)en=txt; //restore if nothing left
		s_clt('error','prop55',en);
	}catch(e){}
	return ret;
}
if(!window.s_duplicateLoad)s_intercept('setErrorMessage','s_setErrorMessage');

/*
 * s_logButtonClick(name,placement[,event|varName,varValue,...]) - Generate tl() call for a custom button click
 */
function s_logButtonClick(n,p){

	try{
		var isVar=function(v){ //determine if v is an event or variable name. returns type: 1=variable, 2=event, 0=neither
				var b=',pageURL,referrer,campaign,channel,hier1,hier2,hier3,hier4,hier5,visitorID,zip,state,server,pageName,pageType,products,purchaseID,transactionID,events,';
				if(b.indexOf(','+v+',')>-1 || v.match(/^eVar([0-9]+)$/) || v.match(/^prop([0-9]+)$/)) return 1; //variable: built-in, eVar, or prop
				if(v.match(/^event([0-9]+)$/)) return 2; //event
				return 0 //neither
			},
			Ia=0, //incoming argument index
			Ib=0, //outgoing argument index
			a=arguments, //incoming arguments
			b=[], //outgoing arguments
			p=''; //placement
		if(a.length<1)return false; //if no incoming args, there's nothing to do
		b[Ib++]=a[Ia++]; //out arg 1: button name (becomes the custom link track call name)
		b[Ib++]='event29'; //out arg 2: button click event
		b[Ib++]='prop25'; //out arg 3: prop25 (button name)
		b[Ib++]=b[0]; //out arg 4: prop25=button_click_name
		b[Ib++]='eVar23'; //out arg 3: eVar23 (button name)
		b[Ib++]=b[0]; //out arg 4: eVar23=button_click_name
		if(a.length>Ia&&!isVar(a[Ia]))p=a[Ia++]; //if the next arg is not a variable name or is an empty string, it's the placement name value
		b[Ib++]='prop26'; //out arg: prop26 (placement)
		b[Ib++]=p; //out arg: prop25=button_click_name
		b[Ib++]='eVar28'; //out arg: eVar28 (placement)
		b[Ib++]=p; //out arg 4: eVar23=button_click_name
		while(Ia<a.length) //copy remaining input args out output args
			b[Ib++]=a[Ia++];
		s_clt.apply(this,b);
	}catch(e){}
	return false;
}

/*
 * Integrate module callback
 */
s.Integrate.onLoad=function(s,m){

	/* Social Authors */
	s.socialAuthors();

	/* DFA */
	var dfaCheck=s.partnerDFACheck(dfaConfig);
	if(dfaCheck){
		s.Integrate.add('DFA');
		s.Integrate.DFA.tEvar=dfaConfig.tEvar;
		s.Integrate.DFA.errorEvar=dfaConfig.errorEvar;
		s.Integrate.DFA.timeoutEvent=dfaConfig.timeoutEvent;
		s.Integrate.DFA.CSID=dfaConfig.CSID;
		s.Integrate.DFA.SPOTID=dfaConfig.SPOTID;
		s.Integrate.DFA.get(dfaConfig.requestURL);
		s.Integrate.DFA.setVars=function(s,p){
			if(window[p.VAR]){ //got a response
				if(!p.ec){ //no errors
					s[p.tEvar]='DFA-'+(p.lis?p.lis:0)+'-'+(p.lip?p.lip:0)+'-'+(p.lastimp?p.lastimp:0)+'-'+(p.lastimptime?p.lastimptime:0)+'-'+(p.lcs?p.lcs:0)+'-'+(p.lcp?p.lcp:0)+'-'+(p.lastclk?p.lastclk:0)+'-'+(p.lastclktime?p.lastclktime:0)
				}else if(p.errorEvar){ //got an error response, track
					s[p.errorEvar]=p.ec;
				}
			}else{ //empty response or timeout
				s.setEvent(p.timeoutEvent); //timeout event
			}
		}
	}

}

/*
 * s_tlInject() - Hack to remove redundant tl calls from chat and other sources
 */
function s_tlInject(d,t,c){
	try{
		var i,n,s_tlData='?';
		if(!window.s)return 0;
		if(!window.s_tlDataPrev)window.s_tlDataPrev='';

		/* Place SC variable values into s_tlData in order to see if this tl call is identical to the last one */	s_tlData='s_account="'+(s_toStr(window.s_account)||'undefined')+'";pev2="'+escape(s_toStr(c))+'";pe="'+escape(s_toStr(t))+'";g="'+document.location.href+(window.s.pageName?';pageName='+escape(window.s.pageName)+'"':'')+';';
		for(i=1;i<76;i++){
			if(i!=7&&i!=49&&i!=68&&i!=45){
				n='prop'+i;
				if(s_varActive(n)&&s_toStr(window.s[n]))s_tlData+='c'+i+'="'+escape(s_toStr(window.s[n]))+'";';
			}
			if(i!=10&&i!=15&&i!=30&&i!=70){
				n='eVar'+i;
				if(s_varActive(n)&&s_toStr(window.s[n]))s_tlData+='v'+i+'="'+escape(s_toStr(window.s[n]))+'";';
			}
		}
		if(window.s.campaign)s_tlData+='v0="'+escape(s_toStr(window.s.campaign)+'')+'";';
		if(window.s.events)s_tlData+='events="'+escape(s_toStr(window.s.events)+'')+'";';
		if(window.s.products)s_tlData+='products="'+escape(s_toStr(window.s.products)+'')+'";';

		/* Supress s.tl() call if SC variables are identical to last call */
		if(s_tlData==window.s_tlDataPrev){
			s_clog('redundant server call discarded: s.tl('+(!!d||'false')+',"'+(s_toStr(t))+'","'+(s_toStr(c))+'")');
			return 0;
		}
		window.s_tlDataPrev=s_tlData;
	}catch(e){window.s_tlDataPrev='?'}
	return window.s.tl_orig.apply(window.s,arguments);
}
try{s_intercept('tl','s_tlInject','window.s')}catch(e){}
/*
 * s_toStr(v) - try to convert value to string
 */
function s_toStr(v){
	if(!v&&this&&typeof this=='string')v=this;
	if(typeof v=='undefined')v='';
	try{v+=''}catch(e){v=''}return v
}

/*********************** PLUGINS AND UTILITIES **********************/
/*========== Utilities ==========*/
/*
 * Utility Functions: apl, p_c, p_gh, split, replace, join
 */
s.apl=new Function("l","v","d","u",""
+"var m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");
s.p_c=new Function("v","c",""
+"var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le"
+"ngth:x).toLowerCase()?v:0");
/*
 * Utility Function: p_gh v0.8
 */
s.p_gh=new Function("",""
+"var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o"
+"),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o"
+"=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");
s.join=new Function("v","p",""
+"var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
/*
 * Utility: escp 0.1 - ensures decodeURI will be used to decode URL parameters if it exists
 */
s.escp=new Function("x",""
+"var s=this;if(typeof(decodeURI)=='function'&&x)return decodeURI(s.r"
+"ep(''+x,'+',' '));else return unescape(s.rep(''+x,'+',' '));");
/*
 * Utility Function: vpr - set the variable vs with value v
 */
s.vpr=new Function("vs","v",
"try{if(typeof v!='undefined'){var s=this;eval('s.'+vs+'=\"'+v+'\"')}"
+"}catch(e){}");
/*
 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
 */
s.setOIDs=new Function("e",""
+"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
+",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
+"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
+"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
+"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
+"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
+"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
+")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
+"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
+"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");
s.setupDynamicObjectIDs=new Function(""
+"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
+">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
+" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
+"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
+"re=1}");

/*========== Plugins ==========*/
/*
 * Custom Plugin: determine if "e" argument is in the "s.events" string (case-insensitive)
 */
s.isEventSet = function(e){
	var r = false, bAnda = function(t,c){ return [c, t, c].join('') };
	try{
		var c = bAnda( this.events.toLowerCase(), ',' );
		r = c.indexOf( bAnda( e.toLowerCase(), ',' ) )>-1
	} catch(er){ r = false }
	return r;
}
/*
 * Custom Plugin: remove "e" argument from "s.events" string (case-insensitive)
 */
s.removeEvent = function(es){
	var ea = es.split(','), r = this.events;
	for( var i=0; i<ea.length; i++) r = r.replace( new RegExp( ea[i], 'gi') , '' );
	return r.replace( ',,', ',', 'g' );
}
/* Custom Plugin: Sets the "pageType" variables (eVar15/prop7)
 * and should be called from the page.
 */
s.setPageType = function(pt,bl,bo){
	pt = pt? pt: s_P.section;
	s_logButtonClick( bl?bl:'pageType', bo?bo:'', 'eVar15', pt, 'prop7', pt );
	s.tlRemove( 'eVar15', 'prop7' );
}
/*
 * Custom plugin: is Responsive Design supported on this page?
 */
s.isRDsupported = function(){
 	try{ var a = LENOVO.MAIN.activeBreakPoints }
	catch(e){ return false }
	return true
}
/*
 * Custom plugin: responsiveDesign - writes a cookie with the 
 * device orientation as well as the Responsive Design breakpoints.
 * Example: "portrait|mini|false|false|false"
 */
s.responsiveDesign = function(b){
	var a, s = this, bd = ['mini','small','medium','large'],
	setMyInterval = function( callback, delay, reps ) {
		var i = 0;
		s.intID = window.setInterval(function () {
			callback();
			if(++i === reps) window.clearInterval( s.intID );
		}, delay);
	},
	rd = function(){
		// don't do anything if readyState isn't right
		if( ! (document.readyState == 'interactive' || document.readyState == 'complete') ) return;
		// don't do anything if the page doesn't support Responsive Design
		try{ a = LENOVO.MAIN.activeBreakPoints }
		catch(e){ window.clearInterval( s.intID ); return }
		var r = [];
		r.push( document.documentElement.clientWidth < document.documentElement.clientHeight? 'portrait': 'landscape' );
	
		// "designBreakPoints"
		if( !a.exposeBar1Labels ) r.push ( b[0] );
		else if( a.smallExpandable ) r.push( b[1] );
		else if( !a.onCanvas ) r.push( b[2] );
		else r.push( b[3] );

		// Lenovo Responsive Design activeBreakPoints ("devBreakPoints")
		r = r.concat( [a.exposeBar1Labels, a.smallExpandable, a.onCanvas] );
	
		s.c_w( 's_rd', r.join(':') );
		
		window.clearInterval( s.intID );
	};
	try { b = b.split(',') }
	catch( er ) { b = bd }
	b = b.length==4? b: bd;
	
	setMyInterval( rd, 1000, 5 );
}
/*
 * Plugin: callType v2.1 - determine the type of call in progress
 */
s.callType=new Function("var s=this,l=s.eo||s.linkObject||0,h=l?l.hre"
+"f||l.download||'':'';return h?typeof s.lt=='function'?s.lt(h):'':s."
+"linkType||(l?h?'o':'+':'t')");
/*
 * Plugin: getValOnce_v1.0
 */
s.getValOnce=new Function("v","c","e",""
+"var a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+" v==k?'':v");
/*
 * Plugin: getPreviousValue v1.1 - return previous value
 * (Requires split utility)
 * (With passive mod)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var t=new Date,i,j,r='',u=arguments.length<4||!!arguments[3];"
+"t.setTime(t.getTime()+1800000);if(el){if(s.events){i=s.split(el,','"
+");j=s.split(s.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if"
+"(s.c_r(c))r=s.c_r(c);if(u)v?s.c_w(c,v,t):s.c_w(c,'no value',t);retu"
+"rn r}}}}}else{if(s.c_r(c)) r=s.c_r(c);if(u)v?s.c_w(c,v,t):s.c_w(c,'"
+"no value',t);return r}");
/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");
/*
 * Plugin: manageQueryParam v1.2 - correct parameters in query string
 */
s.manageQueryParam=new Function("p","w","e","u",""
+"var x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
+"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
+"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
+"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
+"(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
+"ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
+",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
+"bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
+"{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"
+";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"
+";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"
+"p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}i"
+"f(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='"
+"?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if"
+"(qp)qs='?'+qp;return u+qs;");
/*
 * Plugin: exitLinkHandler 0.8 - identify and report exit links
 */
s.exitLinkHandler=new Function("p","e",""
+"var s=this,o=s.p_gh(),h=o.href,n='linkInternalFilters',i,t;if(!h||("
+"s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');t=s[n];s[n]="
+"p?p:t;h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=="
+"'e')s.linkType='e';else h='';s[n]=t;return e?o:h;");
/*
 * Plugin: downloadLinkHandler 0.8 - identify and report download links
 */
s.downloadLinkHandler=new Function("p","e",""
+"var s=this,o=s.p_gh(),h=o.href,n='linkDownloadFileTypes',i,t;if(!h|"
+"|(s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');t=s[n];s[n"
+"]=p?p:t;if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return e?o:"
+"h;");
/*
 * Plugin: clickPast v1.0
 */
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");
s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");
/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat = new Function("d", "cn", ""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");
/*
 * Plugin: getVisitNum - version 3.0
 */
s.getVisitNum=new Function("tp","c","c2",""
+"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
+"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
+"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
+"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
+"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
+";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
s.dimo=new Function("m","y",""
+"var d=new Date(y,m+1,0);return d.getDate();");
s.endof=new Function("x",""
+"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+"t;");
/*
 * Plugin: Days since last Visit v2.0 - save & return days since last visit
 */
s.getDaysSinceLastVisit=new Function("k","f",""
+"if(typeof k!='string'){f=k?k:1;k=''}k=k||'s_lv';f=!!f;var s=this,M="
+"60000,H=60*M,V=H/2,D=24*H,l=k+'_s',v=s.c_r(l),a=new Date(),t=a.getT"
+"ime(),c=new Date(t+V),d=new Date(t+999*D),b=0,u=s.c_r(k),x=0,y='New"
+"';u=u&&!isNaN(u)?parseInt(u):'';if(!isNaN(u)){if(u>t)u=t;b=new Date"
+"(u)}s.c_w(k,t,d);if(u){if(t-u>V){a=new Date(a.getFullYear(),a.getMo"
+"nth(),a.getDate());t=a.getTime();b=new Date(b.getFullYear(),b.getMo"
+"nth(),b.getDate());u=b.getTime();x=Math.floor((t-u+M)/D);y=f?x:(x<7"
+"?'Less than '+(x<1?'1 day':'7 days'):'More than '+(x<30?'7':'30')+'"
+"days')}else{y=v?v:(f?-1:'Unknown')}}else{y=f?-1:'First Visit'}s.c_w"
+"(l,y,c);return y");
/*
 * plugin: eventLib 1.34
 */
s.setEvent=new Function("a","x","y",""
+"var s=this;var S='string',N='number',e=s.events,t,u,n,m,k,v,i,j,q,r"
+";if(typeof a!=S&&typeof a!=N)return e;if(arguments.length==2&&typeo"
+"f x==S){y=x;x=1}if(arguments.length<2)x=1;if(typeof x!=N||x<0||x>1e"
+"5)return e;y=y||'';if(!e||typeof e!=S||e.toLowerCase()=='none')e=''"
+";u=(a+'').split(',');for(k=0;k<u.length;k++){n=u[k];m=Number(n);if("
+"!isNaN(m))n=m;if(typeof n==S){i=n.indexOf(':');if(i>-1){y=n.substri"
+"ng(i+1);n=n.substring(0,i)}i=n.indexOf('=');if(i>-1){x=n.substring("
+"i+1);n=n.substring(0,i)}}else{n=String(n);if(n)n='event'+n}if(n){v="
+"x>0?n+(x!=1?'='+x:''):'';if(typeof e!=S||e.toLowerCase=='none')e=''"
+";if(e){t=e.split(',');e='';for(i=0;i<t.length;i++){q=t[i];j=q.index"
+"Of(':');if(j>-1){r=q.substring(j);q=q.substring(0,j)}else{r=''}if(y"
+")r=y;j=q.indexOf('=');if(j>-1)q=q.substring(0,j);if(q==n){t[i]=v;if"
+"(r)q+=':'+r;v=''}if(t[i])e+=(e?',':'')+t[i]}}}if(v){e=(e?e+',':'')+"
+"v;if(y)e+=':'+y}x=1;y=''}s.events=e;return e");
s.getEvent=new Function("n",""
+"var s=this,e=s.events||'',S='string';if(typeof e!=S||e.toLowerCase="
+"='none')e='';n=typeof n==S?n.substring(n.indexOf('.')+1):typeof n=="
+"'number'?'event'+n:'';if(!n||!e)return 0;var t=e.split(',');if(t&&("
+"typeof t=='object'||typeof t=='array')&&t.length>0){for(var i=0;i<t"
+".length;i++){var u=t[i].indexOf(':');if(u>-1)t[i]=t[i].substring(0,"
+"u);var q=t[i].indexOf('='),m=q>-1?t[i].substring(0,q):t[i];if(m==n)"
+"{if(q>-1){var v=t[i].substring(q+1);return v&&!isNaN(v)?parseFloat("
+"v):1}return 1}}}return 0");
s.tlAdd=new Function(""
+"var s=this,k,a=arguments,n,q,e;for(k=0;k<a.length;k++){n=a[k];n=n.r"
+"eplace(/^([^=:;,]+\\.)/,'');n=n.replace(/^v([0-9])$/,'eVar$1').repl"
+"ace(/^c([0-9])$/,'prop$1').replace(/^e([0-9])/,'event$1');q=n.index"
+"Of('=');if(q<0)q=n.indexOf(':');if(q>=0)n=n.substring(0,q);if(!n.in"
+"dexOf('event')){e=s.linkTrackEvents;if(e.toLowerCase()=='none')e=''"
+";e=s.apl(e,n,',',1);s.linkTrackEvents=e;n='events'}e=s.linkTrackVar"
+"s;if(e.toLowerCase()=='none')e='';e=s.apl(e,n,',',1);s.linkTrackVar"
+"s=e}");
s.tlRemove=new Function("",""
+"var k,n,r;for(k=0;k<arguments.length;k++){n=arguments[k];n=n.replac"
+"e(/^([^=:;,]+\\.)/,'');n=n.replace(/^v([0-9])$/,'eVar$1').replace(/"
+"^c([0-9])$/,'prop$1').replace(/^e([0-9])/,'event$1');if(n.indexOf('"
+"event')==0)this.linkTrackEvents=this.linkTrackEvents.replace(n,'')."
+"replace(',,',',');else this.linkTrackVars=this.linkTrackVars.replac"
+"e(n,'').replace(',,',',');}");
/*
 * Plugin: getActionDepth v1.0
 */
s.getActionDepth=new Function("c",""
+"var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(!s.c_r("
+"c))v=1;if(s.c_r(c)){v=s.c_r(c);v++}if(!s.c_w(c,v,t)){s.c_w(c,v,0)}r"
+"eturn v");
/*
 * Plugin: useGetValOnce v1.0
 */
s.startDate = new Date(2014, 2, 25, 0, 0);
s.useGetValOnce=new Function("wks","sd","td",""
+"var getDaysDiff=function(d1,d2){return(d1.getTime()-d2.getTime())/("
+"1000*60*60*24);},getWeekNum=function(w,d){for(var i=1;i<w;i++)if(d<"
+"(7*i))return i;return w;},wkNum=getWeekNum(wks,getDaysDiff(td,sd)),"
+"i,randomNum=Math.random();if(wkNum>wks-1)return false;for(i=1;i<wks"
+";i++)if(wkNum==i){if(randomNum<i/wks)return false;else return true;"
+"}return true;");
/*
 * channelManager v2.45 - Tracking External Traffic
 * Modified for Lenovo: pulled out the getValOnce for the X variable.
 */
s.channelManager=new Function("a","b","c","d","e","f",""
+"var A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,X,Y,W,n"
+"=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r(e))v=0;"
+"if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer?s.refe"
+"rrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.indexOf('?')"
+">-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInternalFilt"
+"ers.toLowerCase();k=s.split(k,',');l=k.length;for(m=0;m<l;m++){B=j."
+"indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf('//');q"
+"=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;t=g.substring(q,r);t=t.to"
+"LowerCase();u=t;P='Referrers';S=s.seList+'>'+s._extraSearchEngines;"
+"if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');g=s.repl(g,"
+"'as_q','*');}A=s.split(S,'>');T=A.length;for(i=0;i<A.length;i++){D="
+"A[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length;G++){H"
+"=j.indexOf(E[G]);if(H>-1){if(D[2])N=u=D[2];else N=t;if(d==1){N=s.re"
+"pl(N,'#',' - ');g=s.repl(g,'*','as_q');N=s.repl(N,'^','ahoo');N=s.r"
+"epl(N,'%','oogle');}i=s.split(D[1],',');for(k=0;k<i.length;k++){M=s"
+".getQueryParam(i[k],'',g).toLowerCase();if(M)break;}}}}}if(!O||f!='"
+"1'){O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';else P='P"
+"aid Non-Search';}if(!O&&N){u=N;P='Natural Search'}}if(h==1&&!O&&v=="
+"1)u=P=t=p='Direct Load';X=M+u+t;c=c?c:'c_m';if(c!='0'){if(s_P.cc.to"
+"LowerCase()!='kr'){if(s.useGetValOnce(8,this.startDate,new Date()))"
+"X=s.getValOnce(X,c,0);}}g=s._channelDomain;if(g&&X){k=s.split(g,'>'"
+");l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',"
+"');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.indexOf"
+"(Y);if(i>-1)P=q[0];}}}g=s._channelParameter;if(g&&X){k=s.split(g,'>"
+"');l=k.length;for(m=0;m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],'"
+",');S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0]"
+"}}}g=s._channelPattern;if(g&&X){k=s.split(g,'>');l=k.length;for(m=0"
+";m<l;m++){q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T="
+"0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y"
+");if(H==0)P=q[0];}}}if(X)M=M?M:N?'Keyword Unavailable':'n/a';p=X&&p"
+"?p:'';t=X&&t?t:'';N=X&&N?N:'';O=X&&O?O:'';u=X&&u?u:'';M=X&&M?M:'';P"
+"=X&&P?P:'';s._referrer=p;s._referringDomain=t;s._partner=N;s._campa"
+"ignID=O;s._campaign=u;s._keywords=M;s._channel=P;");
/* Top 130 - Compressed */
s.seList="altavista.co|q,r|AltaVista>aol.co.uk,search.aol.co.uk|query"
+"|AOL#United Kingdom>search.aol`,search.aol.ca|query,q|AOL.com Searc"
+"h>ask`,ask.co.uk|ask,q|Ask Jeeves>www.baidu`|wd|Baidu>daum.net,sear"
+"ch.daum.net|q|Daum>g%.co,g%syndication`|q,*|G%>g%`.ar|q,*|G%#Argent"
+"ina>g%`.au|q,*|G%#Australia>g%.at|q,*|G%#Austria>g%`.bh|q,*|G%#Bahr"
+"ain>g%`.bd|q,*|G%#Bangladesh>g%.be|q,*|G%#Belgium>g%`.bo|q,*|G%#Bol"
+"ivia>g%.ba|q,*|G%#Bosnia-Hercegovina>g%`.br|q,*|G%#Brasil>g%.bg|q,*"
+"|G%#Bulgaria>g%.ca|q,*|G%#Canada>g%.cl|q,*|G%#Chile>g%.cn|q,*|G%#Ch"
+"ina>g%`.co|q,*|G%#Colombia>g%.co.cr|q,*|G%#Costa Rica>g%.hr|q,*|G%#"
+"Croatia>g%.cz|q,*|G%#Czech Republic>g%.dk|q,*|G%#Denmark>g%`.do|q,*"
+"|G%#Dominican Republic>g%`.ec|q,*|G%#Ecuador>g%`.eg|q,*|G%#Egypt>g%"
+"`.sv|q,*|G%#El Salvador>g%.ee|q,*|G%#Estonia>g%.fi|q,*|G%#Finland>g"
+"%.fr|q,*|G%#France>g%.de|q,*|G%#Germany>g%.gr|q,*|G%#Greece>g%`.gt|"
+"q,*|G%#Guatemala>g%.hn|q,*|G%#Honduras>g%`.hk|q,*|G%#Hong Kong>g%.h"
+"u|q,*|G%#Hungary>g%.co.in|q,*|G%#India>g%.co.id|q,*|G%#Indonesia>g%"
+".ie|q,*|G%#Ireland>g%.is|q,*|G%#Island>g%.co.il|q,*|G%#Israel>g%.it"
+"|q,*|G%#Italy>g%`.jm|q,*|G%#Jamaica>g%.co.jp|q,*|G%#Japan>g%.jo|q,*"
+"|G%#Jordan>g%.co.ke|q,*|G%#Kenya>g%.co.kr|q,*|G%#Korea>g%.lv|q,*|G%"
+"#Latvia>g%.lt|q,*|G%#Lithuania>g%`.my|q,*|G%#Malaysia>g%`.mt|q,*|G%"
+"#Malta>g%.mu|q,*|G%#Mauritius>g%`.mx|q,*|G%#Mexico>g%.co.ma|q,*|G%#"
+"Morocco>g%.nl|q,*|G%#Netherlands>g%.co.nz|q,*|G%#New Zealand>g%`.ni"
+"|q,*|G%#Nicaragua>g%`.ng|q,*|G%#Nigeria>g%.no|q,*|G%#Norway>g%`.pk|"
+"q,*|G%#Pakistan>g%`.py|q,*|G%#Paraguay>g%`.pe|q,*|G%#Peru>g%`.ph|q,"
+"*|G%#Philippines>g%.pl|q,*|G%#Poland>g%.pt|q,*|G%#Portugal>g%`.pr|q"
+",*|G%#Puerto Rico>g%`.qa|q,*|G%#Qatar>g%.ro|q,*|G%#Romania>g%.ru|q,"
+"*|G%#Russia>g%.st|q,*|G%#Sao Tome and Principe>g%`.sa|q,*|G%#Saudi "
+"Arabia>g%`.sg|q,*|G%#Singapore>g%.sk|q,*|G%#Slovakia>g%.si|q,*|G%#S"
+"lovenia>g%.co.za|q,*|G%#South Africa>g%.es|q,*|G%#Spain>g%.lk|q,*|G"
+"%#Sri Lanka>g%.se|q,*|G%#Sweden>g%.ch|q,*|G%#Switzerland>g%`.tw|q,*"
+"|G%#Taiwan>g%.co.th|q,*|G%#Thailand>g%.bs|q,*|G%#The Bahamas>g%.tt|"
+"q,*|G%#Trinidad and Tobago>g%`.tr|q,*|G%#Turkey>g%`.ua|q,*|G%#Ukrai"
+"ne>g%.ae|q,*|G%#United Arab Emirates>g%.co.uk|q,*|G%#United Kingdom"
+">g%`.uy|q,*|G%#Uruguay>g%.co.ve|q,*|G%#Venezuela>g%`.vn|q,*|G%#Viet"
+" Nam>g%.co.vi|q,*|G%#Virgin Islands>icqit`|q|icq>bing`|q|Microsoft "
+"Bing>myway`|searchfor|MyWay.com>naver`,search.naver`|query|Naver>ne"
+"tscape`|query,search|Netscape Search>reference`|q|Reference.com>sez"
+"nam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it|key|Tiscali>virgi"
+"lio.it|qs|Virgilio>y^`,search.y^`|p|Y^!>ar.y^`,ar.search.y^`|p|Y^!#"
+"Argentina>au.y^`,au.search.y^`|p|Y^!#Australia>ca.y^`,ca.search.y^`"
+"|p|Y^!#Canada>fr.y^`,fr.search.y^`|p|Y^!#France>de.y^`,de.search.y^"
+"`|p|Y^!#Germany>hk.y^`,hk.search.y^`|p|Y^!#Hong Kong>in.y^`,in.sear"
+"ch.y^`|p|Y^!#India>y^.co.jp,search.y^.co.jp|p,va|Y^!#Japan>kr.y^`,k"
+"r.search.y^`|p|Y^!#Korea>mx.y^`,mx.search.y^`|p|Y^!#Mexico>ph.y^`,p"
+"h.search.y^`|p|Y^!#Philippines>sg.y^`,sg.search.y^`|p|Y^!#Singapore"
+">es.y^`,es.search.y^`|p|Y^!#Spain>telemundo.y^`,espanol.search.y^`|"
+"p|Y^!#Spanish (US : Telemundo)>tw.y^`,tw.search.y^`|p|Y^!#Taiwan>uk"
+".y^`,uk.search.y^`|p|Y^!#UK and Ireland>yandex|text|Yandex.ru>searc"
+"h.cnn.com|query|CNN Web Search>search.earthlink.net|q|Earthlink Sea"
+"rch>search.comcast.net|q|Comcast Search>search.rr.com|qs|RoadRunner"
+" Search>optimum.net|q|Optimum Search";
/*
 *  Plug-in: crossVisitParticipation v1.7 - stacks values from
 *  specified variable in cookie and returns value
 */
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
+"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+"m:dl});if(ce)s.c_w(cn,'');return r;");
/*
 * Plugin: DFA Check 1.0
 */
s.partnerDFACheck=new Function("cfg",""
+"var c=cfg.visitCookie,src=cfg.clickThroughParam,scp=cfg.sear"
+"chCenterParam,p=cfg.newRsidsProp,tv=cfg.tEvar,dl=',',cr,nc,q,g,gs,i"
+",j,k,fnd,v=1,t=new Date,cn=0,ca=new Array,aa=new Array,cs=new Array"
+";t.setTime(t.getTime()+1800000);cr=s.c_r(c);if(cr){v=0;}ca=s.split("
+"cr,dl);aa=s.split(s.un,dl);for(i=0;i<aa.length;i++){fnd=0;for(j=0;j"
+"<ca.length;j++){if(aa[i]== ca[j]){fnd=1;}}if(!fnd){cs[cn]=aa[i];cn+"
+"+;}}if(cs.length){for(k=0;k<cs.length;k++){nc=(nc?nc+dl:'')+cs[k];}"
+"cr=(cr?cr+dl:'')+nc;s.vpr(p,nc);v=1;}q=s.wd.location.search.toLower"
+"Case();q=s.repl(q,'?','&');g=q.indexOf('&'+src.toLowerCase()+'=');g"
+"s=(scp)?q.indexOf('&'+scp.toLowerCase()+'='):-1;if(g>-1){s.vpr(p,cr"
+");v=1;}else if(gs>-1){v=0;s.vpr(tv,'SearchCenter Visitors');}if(!s."
+"c_w(c,cr,t)){s.c_w(c,cr,0);}if(!s.c_r(c)){v=0;}return v>=1;");
/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */
s.setupFormAnalysis=new Function(""
+"var s=this;if(!s.fa){s.fa=new Object;var f=s.fa;f.ol=s.wd.onload;s."
+"wd.onload=s.faol;f.uc=s.useCommerce;f.vu=s.varUsed;f.vl=f.uc?s.even"
+"tList:'';f.tfl=s.trackFormList;f.fl=s.formList;f.va=new Array('',''"
+",'','')}");
s.sendFormEvent=new Function("t","pn","fn","en",""
+"var f=s.fa;t=t=='s'?t:'e';f.va[0]=pn;f.va[1]=fn;f.va[3]=t=='"
+"s'?'Success':en;s.fasl(t);f.va[1]='';f.va[3]='';");
s.faol=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,r=true,fo,fn,i,en,t,tf;if(!e)e=s.wd."
+"event;f.os=new Array;if(f.ol)r=f.ol(e);if(s.d.forms&&s.d.forms.leng"
+"th>0){for(i=s.d.forms.length-1;i>=0;i--){fo=s.d.forms[i];fn=fo.name"
+";tf=f.tfl&&s.pt(f.fl,',','ee',fn)||!f.tfl&&!s.pt(f.fl,',','ee',fn);"
+"if(tf){f.os[fn]=fo.onsubmit;fo.onsubmit=s.faos;f.va[1]=fn;f.va[3]='"
+"No Data Entered';for(en=0;en<fo.elements.length;en++){el=fo.element"
+"s[en];t=el.type;if(t&&t.toUpperCase){t=t.toUpperCase();var md=el.on"
+"mousedown,kd=el.onkeydown,omd=md?md.toString():'',okd=kd?kd.toStrin"
+"g():'';if(omd.indexOf('.fam(')<0&&okd.indexOf('.fam(')<0){el.s_famd"
+"=md;el.s_fakd=kd;el.onmousedown=s.fam;el.onkeydown=s.fam}}}}}f.ul=s"
+".wd.onunload;s.wd.onunload=s.fasl;}return r;");
s.faos=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,su;if(!e)e=s.wd.event;if(f.vu){s[f.v"
+"u]='';f.va[1]='';f.va[3]='';}su=f.os[this.name];return su?su(e):tru"
+"e;");
s.fasl=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa,a=f.va,l=s.wd.location,ip=s.trackPag"
+"eName,p=s.pageName;if(a[1]!=''&&a[3]!=''){a[0]=!p&&ip?l.host+l.path"
+"name:a[0]?a[0]:p;if(!f.uc&&a[3]!='No Data Entered'){if(e=='e')a[2]="
+"'Error';else if(e=='s')a[2]='Success';else a[2]='Abandon'}else a[2]"
+"='';var tp=ip?a[0]+':':'',t3=e!='s'?':('+a[3]+')':'',ym=!f.uc&&a[3]"
+"!='No Data Entered'?tp+a[1]+':'+a[2]+t3:tp+a[1]+t3,ltv=s.linkTrackV"
+"ars,lte=s.linkTrackEvents,up=s.usePlugins;if(f.uc){s.linkTrackVars="
+"ltv=='None'?f.vu+',events':ltv+',events,'+f.vu;s.linkTrackEvents=lt"
+"e=='None'?f.vl:lte+','+f.vl;f.cnt=-1;if(e=='e')s.events=s.pt(f.vl,'"
+",','fage',2);else if(e=='s')s.events=s.pt(f.vl,',','fage',1);else s"
+".events=s.pt(f.vl,',','fage',0)}else{s.linkTrackVars=ltv=='None'?f."
+"vu:ltv+','+f.vu}s[f.vu]=ym;s.usePlugins=false;var faLink=new Object"
+"();faLink.href='#';s.tl(faLink,'o','Form Analysis');s[f.vu]='';s.us"
+"ePlugins=up}return f.ul&&e!='e'&&e!='s'?f.ul(e):true;");
s.fam=new Function("e",""
+"var s=s_c_il["+s._in+"],f=s.fa;if(!e) e=s.wd.event;var o=s.trackLas"
+"tChanged,et=e.type.toUpperCase(),t=this.type.toUpperCase(),fn=this."
+"form.name,en=this.name,sc=false;if(document.layers){kp=e.which;b=e."
+"which}else{kp=e.keyCode;b=e.button}et=et=='MOUSEDOWN'?1:et=='KEYDOW"
+"N'?2:et;if(f.ce!=en||f.cf!=fn){if(et==1&&b!=2&&'BUTTONSUBMITRESETIM"
+"AGERADIOCHECKBOXSELECT-ONEFILE'.indexOf(t)>-1){f.va[1]=fn;f.va[3]=e"
+"n;sc=true}else if(et==1&&b==2&&'TEXTAREAPASSWORDFILE'.indexOf(t)>-1"
+"){f.va[1]=fn;f.va[3]=en;sc=true}else if(et==2&&kp!=9&&kp!=13){f.va["
+"1]=fn;f.va[3]=en;sc=true}if(sc){nface=en;nfacf=fn}}if(et==1&&this.s"
+"_famd)return this.s_famd(e);if(et==2&&this.s_fakd)return this.s_fak"
+"d(e);");
s.ee=new Function("e","n",""
+"return n&&n.toLowerCase?e.toLowerCase()==n.toLowerCase():false;");
s.fage=new Function("e","a",""
+"var f=s.fa,x=f.cnt;x=x?x+1:1;f.cnt=x;return x==a?e:'';");
/*
 * Plugin: getPageName v2.1 - parse URL and return page name
 */
s.getPageName=new Function("u",""
+"var v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/',"
+"x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s."
+"queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub"
+"string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i"
+"ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d"
+"efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;"
+"z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p."
+"substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x"
+";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s"
+"ubstring(x+1)}return n");
/*
 * Plugin: getPercentPageViewed v1.70
 */
s.getPercentPageViewed=new Function("n",""
+"var s=this,w=window,L=w.addEventListener||0,A=w.attachEvent||0,E=['"
+"load','unload','scroll','resize','zoom','keyup','mouseup','touchend"
+"','orientationchange','pan'];w.s_Obj=s;s_PPVid=(n=='-'?s.pageName:n"
+")||s.pageName||location.href;if(!w.s_PPVevent){s.s_PPVg=function(n,"
+"r){var k='s_ppv',p=k+'l',c=s.c_r(n||r?k:p),a=c.indexOf(',')>-1?c.sp"
+"lit(',',10):[''],L=a.length,i=0;a[0]=unescape(a[0]);r=r||(n&&n!=a[0"
+"])||0;while(++i<9)a[i]=!r&&i<L?parseInt(a[i])||0:0;if(L<10)a[9]='';"
+"if(r){s.c_w(p,c);s.c_w(k,'?')}return a};w.s_PPVevent=function(e){va"
+"r w=window,s=w.s_Obj||w.s||0;e=e&&typeof e=='object'?e.type||'':'';"
+"if(!e.indexOf('on'))e=e.substring(2);s_PPVi=w.s_PPVi||0;if(w.s_PPVt"
+"&&!e){clearTimeout(s_PPVt);s_PPVt=0;if(s_PPVi<2)s_PPVi++}if(typeof "
+"s=='object'){var D=document,B=D.body,E=D.documentElement||B,G=D.get"
+"ElementsByTagName('body')[0],H='clientHeight',T='scrollTop',C=100,h"
+"=Math.max(E[H]||0,G[H]||0,B[H]||0),X=E.clientWidth||w.innerWidth||0"
+",Y=E[H]||w.innerHeight||0,x=w.screen?screen.width:0,y=w.screen?scre"
+"en.height:0,r=Math.round(C*(w.devicePixelRatio||1))/C,b=(D.pageYOff"
+"set||E[T]||G[T]||0)+Y,p=h>0&&b>0?Math.round(C*b/h):0,l=e=='load'||s"
+"_PPVi<1,O=w.orientation,o=typeof O=='number'?Math.abs(o)%180:(y>x?0"
+":90),a=s.s_PPVg(s_PPVid,l),V=function(i,v,f,n){i=parseInt(typeof a="
+"='object'&&a.length>i?a[i]:'0')||0;v=typeof v!='number'?i:v;v=f||v>"
+"i?v:i;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iPod|iPad|iPhone)')"
+".exec(navigator.userAgent||'')&&o){O=x;x=y;y=O}o=o?'P':'L';a[9]=l?'"
+"':a[9].substring(0,1);s.c_w('s_ppv',escape(w.s_PPVid)+','+V(1,p,l)+"
+"','+(l||!V(2)?p:V(2))+','+V(3,b,l,1)+','+X+','+Y+','+x+','+y+','+r+"
+"','+a[9]+(a[9]==o?'':o))}if(!w.s_PPVt&&e!='unload')w.s_PPVt=setTime"
+"out(w.s_PPVevent,333)};for(var f=w.s_PPVevent,i=0;i<E.length;i++)if"
+"(L)L(E[i],f,false);else if(A)A('on'+E[i],f);f()};var a=s.s_PPVg();r"
+"eturn!a[0]?'':n==''||n=='-'?a[1]:a");
/*
 * Plugin: TNT Integration v1.0
 */
s.trackTNT=new Function("v","p","b",""
+"var s=this,n='s_tnt',p=p?p:n,v=v?v:n,r='',pm=false,b=b?b:true;if(s."
+"getQueryParam){pm=s.getQueryParam(p);}if(pm){r+=(pm+',');}if(s.wd[v"
+"]!=undefined){r+=s.wd[v];}if(b){s.wd[v]='';}return r;");
/*
 * Plugin: activeViewTime v1.3 - Determine active view time for page
 */
var s_AVT={id:'',ty:'',st:0,to:0,n:0,e:0,r:0};
s.AVTOn=new Function(""
+"var s=this,A=s_AVT;if(typeof s=='object'){if(A.to){clearTimeout(A.t"
+"o);A.to=0}if(!A.n){var d=new Date();A.n=d.getTime()}A.to=typeof s.A"
+"VTTo=='function'?setTimeout(s.AVTTo,10000):0}");
s.AVTOff=new Function(""
+"var s=this,A=s_AVT;if(typeof s=='object'){if(A.to){clearTimeout(A.t"
+"o);A.to=0}if(A.n){var d=new Date(),x=d.getTime()-A.n;A.e+=d.getTime"
+"()-A.n;A.n=0;var k=escape(A.id)+','+A.e;s.c_w('s_AVT',k)}}");
s.AVTTo=new Function(""
+"var s=this,A=s_AVT;if(typeof s=='object'){A.to=0;if(typeof s.AVTOff"
+"=='function')s.AVTOff()}");
s.AVTEh=new Function("e",""
+"var s=this,A=s_AVT,ls=A.st,lt=A.ty;if(typeof s=='object'){if(typeof"
+" s.AVTOff=='function')s.AVTOff();if(!e)var e=window.event;A.ty=e.ty"
+"pe;A.st=A.ty=='unload'?0:1;if(A.st&&typeof s.AVTOn=='function')s.AV"
+"TOn()}");
s.activeViewTime=new Function(""
+"var s=this,A=s_AVT,w=window,d=document,ev=[[d,'click'],[d,'mousemov"
+"e'],[d,'keypress'],[w,'ready'],[w,'focus'],[w,'load'],[w,'resize'],"
+"[w,'scroll'],[w,'unload'],[d,'mousemove']],j,k=null,c,t,e,a,r;if(ty"
+"peof s=='object'){c=s.linkType;c=(typeof c=='undefined')?'t':((!c||"
+"c=='t')?'+':((c!='d'&&c!='e')?'o':c));if(c=='t'||c=='e'||!A.id){if("
+"c=='e'&&typeof s.AVTOff=='function')s.AVTOff();j=s.c_r('s_AVT');if("
+"j&&j.indexOf(',')>-1){j=j.split(',');j[0]=unescape(j[0]);j[1]=parse"
+"Int(j[1]);if(!isNaN(j[1])){k=[j[0],Math.floor((j[1]+499)/1000)||1,'"
+"'];k[2]=(new Date(1000*k[1])).toUTCString().substring(17,25);e=argu"
+"ments.length>1?arguments[1]:''}}s.c_w('s_AVT','');A.id=arguments.le"
+"ngth?arguments[0]:(s.pageName||document.location.href);if(!A.r){for"
+"(var i=0;i<ev.length;i++){try{var eo=ev[i],o=eo[0],e=eo[1];if(o.add"
+"EventListener)o.addEventListener(e,s.AVTEh,false);else if(o.attachE"
+"vent)o.attachEvent('on'+e,s.AVTEh);else o['on'+e]=s.AVTEh}catch(x){"
+"}}A.r=1}if(c!='e'&&typeof s.AVTOn=='function')s.AVTOn()}}return k");
/*
 * Plugin: dynComp v2.01
 */
var s_Obj=window.s; //right-hand side must be the SiteCatalyst 's' object
s.dynComp=new Function("H",""
+"try{var s=this,T='string',O='object',F='function',N='number',Y='D=',Q='\"',Z="
+"s.dynCompS,i,j,k,m,n,v,d,t,u,w='pageURL,referrer,campaign,channel,hier1,hier2"
+",hier3,hier4,hier5,visitorID,zip,state,server,pageName,pageType,products,purc"
+"haseID,transactionID,events,linkURL,linkName',x='g,r,v0,ch,h1,h2,h3,h4,h5,vid"
+",zip,state,server,pageName,pageType,products,purchaseID,xact,events,pev1,pev2"
+"',y=w.split(','),z=x.split(','),l=0,p=[],q=[],K={},L=[],W=function(v,t){retur"
+"n typeof v==t},E=function(v){v=escape(v||'');return v.length},X=function(v){v"
+"ar r='';if(W(v,N)||v)try{r=v+''}catch(e){r=''}return r},A=function(n,t){if(n="
+"='pageURL'&&!s[n])s[n]=document.location.href;if(n=='referrer'&&!s[n])s[n]=do"
+"cument.referrer||'';v=X(s[n]);var w=window,a=s.linkType||s.lnk||s.linkName||s"
+".linkURL|w.s_linkName||w.s_linkType,b=s.eo||s.pe,d=s.pe||s.pev1||s.pev2||s.pe"
+"v3;if(v){if(!(a||b||d)||!W(s.linkTrackVars,T)||(','+s.linkTrackVars+',').inde"
+"xOf(','+n+',')>=0){p[l]=n;q[l++]=t}}},R=function(i){var P='+',o=P+q[i]+P;x;fo"
+"r(k=0;k<l;k++){x=X(s[p[k]]);if(!x.indexOf(Y)){x=P+x.substring(2)+P;if(x.index"
+"Of(o)>-1){return 1}}}return 0},P=function(D){var V=function(v){var a,b,c,f,t,"
+"u,z,d='',r=v!=s[p[i]];D++;if(D<5){for(j=D?l-1:0;!d&&(D?j>=0:j<l);D?j--:j++){t"
+"=q[j];u=X(s[p[j]]);z=u.length;if(n!=p[j]&&u.indexOf(Y)!=0){if(D&&v!=u&&v.inde"
+"xOf(Q)<0){if(v.indexOf(u)==0){c=v.substring(z);d=(D==1?Y:'')+t+'+';d=E(d+Q+c+"
+"Q)<E(v)?d+V(c):''}if(!d){a=v.length-z;b=v.indexOf(u,a);if(b>0){f=v.substring("
+"0,a);d=D==1?Y:'';d=E(d+Q+f+Q+'+'+t)<E(v)?d+V(f)+'+'+t:''}}if(!d){a=v.indexOf("
+"u);if(a>0){c=v.substring(0,a);b=a+z;f=v.substring(b);d=D==1?Y:'';d=E(d+Q+c+Q+"
+"'+'+t+'+'+Q+f+Q)<E(v)?d+V(c)+'+'+t+'+'+V(f):''}}}if(!d&&v==u){d=(r?'':Y)+t;if"
+"(E(d)>=E(v))d=''}}}}if(!d&&r)d=Q+v+Q;D--;return"
+" d},o=function(n,v){var a=E(n),b=E(X(v));return a/1000+b};for(i=0;i<l;i++){fo"
+"r(j=0;j<l-i-1;j++){k=j+1;if(o(q[j],s[p[j]])>o(q[k],s[p[k]])){t=p[k];p[k]=p[j]"
+";p[j]=t;t=q[k];q[k]=q[j];q[j]=t}}}for(i=0;i<L.length;i++){for(j=0;j<L.length-"
+"i-1;j++){k=j+1;if(o(L[j],K[L[j]])>o(L[k],K[L[k]])){t=L[k];L[k]=L[j];L[j]=t}}}"
+"for(i=l-1;i>=0;i--){n=p[i];v=X(s[n]);if(v.indexOf(Y)!=0&&!R(i)){d=V(v);if(d&&"
+"E(d)<E(v)){Z.s[n]=s[n];s[n]=d}}}},C=function(){if(Z.a){Z.a=0;for(i=1;i<76;i++"
+"){A('prop'+i,'c'+i);A('eVar'+i,'v'+i)}for(i=0;i<y.length;i++)A(y[i],z[i]);k=d"
+"ocument.cookie.split('; ');if(K){delete K;K={}}if(L)L.length=0;for(i=0,j=0;i<"
+"k.length;i++){t=k[i].split('=');n=t[0];if(n.match('^[a-zA-Z][a-zA-Z_0-9]*$')&"
+"&!n.match('^[cv][0-9][0-9]?$')&&(','+x+',').indexOf(','+n+',')<0){K[n]=t[1];L"
+"[j++]=n}}if(Z.s)delete Z.s;Z.s={};P(-1);P(0)}},U=function(){try{if(W(Z,O)&&W("
+"Z.s,O)){for(i in Z.s)s[i]=Z.s[i];delete Z.s;Z.s={}}}catch(e){}},I=function(){"
+"if(!W(Z.a,N))Z.a=0;if(!W(Z.s,O))Z.s={};if(!W(s.t_O,F))s.t_O=s.t;if(!W(s.t_W,F"
+")){s.t_W=function(){var s=this,a=arguments,r;s.dynCompS.a=1;if(!s.usePlugins)"
+"s.dynComp(101);r=typeof s.t_O==F?s.t_O.apply(s,a):s.t!=s.t_W?s.t.apply(s,a):-"
+"1;s.dynComp(102);return r}}if(s.t!=s.t_W)s.t=s.t_W;if(!W(s.dp_O,F)&&typeof s."
+"doPlugins==F)s.dp_O=s.doPlugins;if(!W(s.dp_W,F)){s.dp_W=function(){var s=this"
+",a=arguments,r;r=typeof s.dp_O==F?s.dp_O.apply(s,a):s.doPlugins!=s.dp_W?s.doP"
+"lugins.apply(s,a):-1;if(s.dynCompS.a)s.dynComp(101);return r}}if(s.doPlugins!"
+"=s.dp_W)s.doPlugins=s.dp_W};if(!W(s.dynCompS,O))Z=s.dynCompS={};if(H==100)I()"
+";if(H==101)C();if(H==102)U()}catch(e){U()}");
s_dynCompI=function(){var w=window,F='function',s=s_Obj;if(typeof s=='object')
s.dynComp(100);if(typeof w.s_gi_O!=F)s_gi_O=s_gi;if(typeof w.s_gi_W!=F){s_gi_W=
function(){var w=window,a=arguments,s=w.s_Obj;if(typeof s=='object')s.dynComp(102);
s.dynComp(100);w.s_Obj=s=typeof w.s_gi_O==F?w.s_gi_O.apply(w,a):w.s_gi!=w.s_gi_W
?w.s_gi.apply(w,a):-1;return s}}if(w.s_gi!=w.s_gi_W)s_gi=s_gi_W}
s_dynCompI();
/*
 * Plugin: googleSocialPlugins v1.0
 */
s.googleSocialPlugins=new Function("a","b","c","d",""
+"if(b&&d.state=='on'){b=s.split(b,'>');track(b[0],b[1]);}if(c&&d.sta"
+"te=='off'){c=s.split(c,'>');track(c[0],c[1]);}function track(m,n){s"
+".ltVT=s.linkTrackVars;s.ltET=s.linkTrackEvents;s.etE=s.events;s.lin"
+"kTrackVars=a?(a+',events'):'events';s.linkTrackEvents=n;s.events=n;"
+"if(a){s[a]=m;}s.tl(this,'o',m);s.linkTrackVars=s.ltVT;s.linkTrackEv"
+"ents=s.ltET;s.events=s.etE;}");
gSP=function(o){
	if(typeof window.s=='object'&&typeof s.googleSocialPlugins=='function')s.googleSocialPlugins('socPlug','google:plusone>event39','',o);
}
/*
 * Plugin: facebookSocialPlugins v1.1
 */
s.facebookSocialPlugins=new Function("a","b","c","d","e","f","g","h",""
+"var s=this;s.fbICount++;if(s.fbICount>=5){clearInterval(socialInter"
+"val);}if(typeof(FB)!='undefined'){clearInterval(socialInterval);fun"
+"ction re(a,b){a=s.split(a,'>'),FB.Event.subscribe(b,function(){trac"
+"k(a[0],a[1]);});}if(b){re(b,'edge.create');}if(c){re(c,'edge.remove"
+"');}if(d){re(d,'comment.create');}if(e){re(e,'comment.remove');}if("
+"f){re(f,'auth.login');}if(g){re(g,'auth.logout');}if(h){re(h,'messa"
+"ge.send');}}function track(m,n){s.ltVT=s.linkTrackVars;s.ltET=s.lin"
+"kTrackEvents;s.etE=s.events;s.linkTrackVars=a?(a+',events'):'events"
+"';s.linkTrackEvents=n;s.events=n;if(a){s[a]=m;}s.tl(this,'o',m);s.l"
+"inkTrackVars=s.ltVT;s.linkTrackEvents=s.ltET;s.events=s.etE;}");
s.fbICount=0;
var fbSocialInt=function(){
	if(typeof window.s=='object'&&typeof s.facebookSocialPlugins=='function')s.facebookSocialPlugins('socPlug','fb:like>event39','','','','','','fb:send>event39');
}
var socialInterval=setInterval(fbSocialInt,1000);
/*
 * Plugin: twitterSocialPlugins v1.1  "Tweet", "Follow", "Web Intents"
 */
s.twitterSocialPlugins=new Function("a","b","c","d","e","f",""
+"try{var s=this;s.twICount++;if(s.twICount>=5){clearInterval(twttrInterv"
+"al);}if(typeof(twttr)!='undefined'){clearInterval(twttrInterval);fu"
+"nction re(a,b){a=s.split(a,'>'),twttr.events.bind(b,function(){trac"
+"k(a[0],a[1]);});}if(b){re(b,'click');}if(c){re(c,'tweet');}if(d){re"
+"(d,'retweet');}if(e){re(e,'favorite');}if(f){re(f,'follow');}}funct"
+"ion track(m,n){s.ltVT=s.linkTrackVars;s.ltET=s.linkTrackEvents;s.et"
+"E=s.events;s.linkTrackVars=a?(a+',events'):'events';s.linkTrackEven"
+"ts=n;s.events=n;if(a){s[a]=m;}s.tl(this,'o',m);s.linkTrackVars=s.lt"
+"VT;s.linkTrackEvents=s.ltET;s.events=s.etE;}}catch(e){}");
s.twICount=0;
var fbTwitterInt=function(){
	if(typeof window.s=='object'&&typeof s.twitterSocialPlugins=='function')s.twitterSocialPlugins('socPlug','','tw:tweet>event39','','','');
}
var twttrInterval=setInterval(fbTwitterInt,1000);
/*
 * Plugin: socialPlatforms v1.0
 */
s.socialPlatforms=new Function("a",""
+"var s=this,g,K,D,E,F;g=s.referrer?s.referrer:document.referrer;g=g."
+"toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){"
+"D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");
s.socPlatList="facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter"
+"|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion"
+"|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr"
+"|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed"
+"|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz"
+"|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca"
+"|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace"
+"|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk"
+"|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon"
+"|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga"
+"|metacafe.com>Metacafe|pinterest.com>Pinterest";
/*
 * Plugin: socialAuthors v1.3
 */
s.socialAuthors=new Function("",""
+"var s=this,g,tco;g=s.referrer?s.referrer:document.referrer;if(g.ind"
+"exOf('t.co/')!=-1){s.tco=escape(s.split(g,'/')[3]);s.Integrate.add("
+"'SocialAuthor');s.Integrate.SocialAuthor.tEvar='eVar69';s.Integrate"
+".SocialAuthor.get('search.twitter.com/search.json?var=[VAR]&"
+"callback=s.twitterSearch&q=http%3A%2F%2Ft.co%2F'+s.tco);s.Integrate"
+".SocialAuthor.delay();s.Integrate.SocialAuthor.setVars=function(s,p"
+"){s[p.tEvar]=s.user;}}");
s.twitterSearch=new Function("obj",""
+"var s=this,txt,txtRT,txtEnd,txtAuthor;txt=obj.results[0].text;txtRT"
+"=txt.indexOf('RT @');if(txtRT!=-1){txtEnd=txt.indexOf(' ',txtRT+4);"
+"txtAuthor=txt.substring(txtRT+4,txtEnd);s.user=txtAuthor.replace(':"
+"','');}else{s.user=obj.results[0].from_user;}s.Integrate.SocialAuth"
+"or.ready();");
/*
 * Plugin: socialSegmentationv1.2
 */
s.smSegConfig={
	fbsh:	['Facebook',['socPlug','fb:like']],
	fbse:	['Facebook',['socPlug','fb:send']],
	twsh:	['Twitter',['socPlug','tw:tweet']],
	ggsh:	['Google+',['socPlug','google:plusone']],
	fbl:	['Facebook',['fb_ref=','fb%3Alike']],
	twl:	['Twitter',['tw_ref=','tw%3Atweet']],
	gpl:	['Google+',['gp_ref=','g+%3Aplusone']],
	gppo:	['Google+',['plus.url.google.com','|soc']],
	fbpo:	['Facebook',['facebook.com','|soc']],
	twpo:	['Twitter',['t.co','|soc']],
	fb:		['Facebook','facebook.com'],
	yt:		['YouTube','youtube.com'],
	tw:		['Twitter','t.co/'],
	gp:		['Google+','plus.url.google.com'],
	pp:		['Pinterest','pinterest.com']
};
s.smSegRules={v:[function(u,y){if(typeof u!='string'&&typeof(s[u[0]])!='undefined'){if(s[u[0]].indexOf(u[1])!=-1){s.linkTrackVars=s.apl(s.linkTrackVars,'events',',',2);s.linkTrackEvents=s.apl(s.linkTrackVars,'event39',',',2);s.events=s.apl(s.events,'event39',',',2);return 1}}},'SocialShare'],d:[function(u,y){if(typeof u!='string')return;if(window!=window.top){var h=s.referrer?s.referrer:document.referrer;s.events=s.apl(s.events,'event39',',',2);s.referrer=='';return 1}},'App Interaction'],c:[function(u,y){if(typeof u=='string')return;if(window==window.top){var h=window.location.toString();if(h.indexOf(u[0])!=-1&&h.indexOf(u[1])!=-1){s.events=s.apl(s.events,'event39',',',2);return 1}}},'SocialShare Clickthrough'],x:[function(u,y){if(typeof u=='string')return;if(window==window.top){var h=s.referrer?s.referrer:document.referrer;var j=window.location.toString();if(h.indexOf(u[0])!=-1&&j.indexOf(u[1])!=-1){s.events=s.apl(s.events,'event39',',',2);return 1}}},'SocialPost Clickthrough'],r:[function(u,y){if(typeof u!='string')return;if(window==window.top){var h=s.referrer?s.referrer:document.referrer;if(h.toString().indexOf(u)!=-1){s.events=s.apl(s.events,'event39',',',2);return 1}}},'Referrer']};
//modified for implicit call of dt method
//added try...catch
s.smSeg = new Function("cn","cl",""
+"try{var s=this;var cn=cn;var e=new Date();e.setFullYear(e.getFullYear()+"
+"5);var o=new Object;var b=new Object();var p=false;var dt=new Functi"
+"on(\"return \"+'{' + s.c_r(cn)+'}');dt();for(var i in s.smSegRules){"
+"for(var y in s.smSegConfig){if(s.smSegRules[i][0](s.smSegConfig[y][1"
+"],s.smSegConfig[y][0])>-1){if(dt[y]){dt[y][i]=new Date().getTime();}"
+"else{o[i]=new Date().getTime();dt[y]=o;}p=true;}if(p) break;}if(p)br"
+"eak;}for(var f in dt){if(dt[f].length==0)delete dt[f];}var vv=new Ob"
+"ject();for(var f in dt){for(var v in dt[f])if(s.smSegConfig[f][0].in"
+"dexOf(':')!= -1){vv[dt[f][v]]=s.smSegConfig[f][0];}else{vv[dt[f][v]]"
+"=s.smSegConfig[f][0]+':'+s.smSegRules[v][1];}}vv=s._sa(vv);var j=0,k"
+"=0;var _r=new Array;for(var h in vv){j++;if(j>cl)_r[k++] = h;}for(va"
+"r j in dt){for(var k in _r)if(dt[j].v==_r[k])delete dt[j];}var c=s._"
+"serialize(dt);s.c_w(cn,c,e);vv['getMostRecent']=function(){return vv"
+"[_v()[0]];};vv['getOldest']=function(){var a=_v();return vv[a[a.leng"
+"th-1]];};vv['getAsStack']=function(d,x){var a=new Array;var n=0;for("
+"var i in vv){if(typeof vv[i]!='function')a[n++]=vv[i];}if(x){a.sort("
+");}return a.join(d);};var _v=function(){var a=new Array;var n=0;for("
+"var i in vv){if(typeof vv[i]!='function')a[n++]=i;}a.sort(function(x"
+",y){y-x;});return a;};return vv;}catch(e){return ''}");
s._sa = new Function("ai",""
+"var at=new Array();for(var k in ai)at.push([k, ai[k]]);at.sort(funct"
+"ion(){return arguments[0][0]<arguments[1][0]});var rt=new Object();f"
+"or(var k in at)rt[at[k][0]]=at[k][1];return rt;");
s._serialize = new Function("o",""
+"var s=this;var r='';for(var i in o){r+=i+':{';for(var y in o[i]){r+="
+"\"'\" + y + \"':'\" + o[i][y] + \"',\";}r=r.substring(0,r.length-1);"
+"r+='},';}return r.substring(0,r.length-1);");
/*
 * Plugin browserInfo v1.0
 */
s.browserInfo=new Function(""
+"var N=window.navigator?navigator:0;if(N){var v=N.appVersion||'',a=N"
+".userAgent||'',n=N.appName||'',v='',l=['Opera','MSIE','Chrome','Saf"
+"ari','Firefox'],f=[6,5,7,7,8],h,i,j,k;for(h=0;h<l.length;h++){j=a.i"
+"ndexOf(l[h]);if(j>-1){n=l[h];v=a.substring(j+f[h]);break}}if(h==0||"
+"h==3){if((j=a.indexOf('Version'))!=-1)v=a.substring(j+8)}else if(h>"
+"=l.length&&((i=a.lastIndexOf(' ')+1)<(j=a.lastIndexOf('/')))){n=a.s"
+"ubstring(i,j);v=a.substring(j+1);if(n.toLowerCase()==n.toUpperCase("
+"))n=N.appName}if((k=v.indexOf(';'))!=-1)v=v.substring(0,k);if((k=v."
+"indexOf(' '))!=-1)v=v.substring(0,k);if(isNaN(parseInt(N.appVersion"
+",10)))v=''+parseFloat(navigator.appVersion)}return[n,v]");
/*
 * Plugin: YouTube plugin v1.5
 */
function s_aE(o,e,f){if(arguments.length<3){f=e;e=o;o=window}if(o.attachEvent){o['e'+e+f]=f;o[e+f]=function(){o['e'+e+f](window.event)};o.attachEvent('on'+e,o[e+f])}else o.addEventListener(e,f,false)}
function s_YTi(){if(typeof window.s_YTO!='object')s_YTO={};if(typeof s_YTO.v!='object')s_YTO.v={};s_YTO.ya=s_YTisa()?2:0;s_YTO.ut=s_YTO.uf=0;s_YTO.vp='YouTube Player';s_YTp()}s_aE('load',s_YTi);
function onYouTubePlayerReady(id){if(id&&document.getElementById(id)&&!s_YTO.v[id])s_YTO.v[id]=new s_YTv(id,1)}
function s_YTp(){try{var D=document,f=D.getElementsByTagName('iframe'),k,id,t,i,j;if(s_YTisa())s_YTO.ya=2;for(i=0;i<f.length;i++){k=s_YTgk(f[i].src);id=f[i].id;if(k){if(!id){id='YouTubeV';for(j=1;j<99;j++)if(!D.getElementById(id+j))break;id=j<99?id+j:'';f[i].id=id}if(id)if(!s_YTO.ya){s_YTO.ya=1;t=D.createElement('script'),f;t.src='//www.youtube.com/player_api';f=D.getElementsByTagName('script')[0];f.parentNode.insertBefore(t,f)}else if(s_YTO.ya==2&&!s_YTO.v[id])s_YTO.v[id]=new s_YTv(id)}}}catch(e){};s_YTO.ut=setTimeout('s_YTp()',1000)}
function s_YTisa(){return typeof window.YT=='object'&&YT.Player}
function s_YTism(){return typeof window.s=='object'&&typeof s.Media=='object'&&s.Media.open}
function s_YTgk(u){var r='',a,f='',v=u.toLowerCase();if(v.indexOf('//www.youtube.com')>-1){if(v.indexOf('/watch')>-1)f='v';if(!f&&v.indexOf('/apiplayer')>-1)f='video_id';if(!f&&v.indexOf('/v/')>-1)f='/v/';if(!f&&v.indexOf('/embed/')>-1)f='/embed/';if(f>'A'){a=v.indexOf('?'+f+'=');if(a<0)a=v.indexOf('&'+f+'=');if(a>-1)r=u.substring(a+f.length+2)}else if(f){a=v.indexOf(f);r=u.substring(a+f.length)}if(r){a=r.indexOf('?');if(a<0)a=r.indexOf('&');if(a<0)a=r.indexOf('#');if(a>-1)r=r.substring(0,a)}}return r}
function onYouTubePlayerAPIReady(){try{s_YTO.ya=2;if(s_YTO.ut)clearTimeout(s_YTO.ut);s_YTp()}catch(e){}}
function s_YTdi(){if(!s_YTism())return;if(typeof s.Media.trackWhilePlaying!='undefined'){s_YTO.twp=s.Media.trackWhilePlaying;s.Media.trackWhilePlaying=false}if(typeof s.Media.trackSeconds!='undefined'){s_YTO.ts=s.Media.trackSeconds;delete s.Media.trackSeconds}}
function s_YTei(){if(!s_YTism())return;if(typeof s_YTO.twp!='undefined'){s.Media.trackWhilePlaying=s_YTO.twp;delete s_YTO.twp}if(typeof s_YTO.ts!='undefined'){s.Media.trackSeconds=s_YTO.ts;delete s_YTO.ts}}
function s_YTut(){s_YTO.uf=0;s_YTei()}
function s_YTdv(id){try{if(!id)return;var v=s_YTO.v[id]||0;if(v){if(v.ss){if(s.Media)s.Media.close(v.sv);v.ss=0}}v.vc()}catch(e){}}
function s_YTv(id){var t=this;t.vc=function(){var t=this;t.id=t.sn=t.sl=t.yt=t.yk=t.kl='';t.yd=t.yp=t.ys=t.pt=t.ss=t.ts=t.qs=t.ql=0};t.vg=function(yp){var t=this,D=document,N='number',u='',a,b,c,i,x=0,y;if(yp){if(yp.getVideoUrl)u=yp.getVideoUrl();if(!u)u=yp.a.src||'';if(yp.getVideoData)x=yp.getVideoData();if(x&&x.title)t.yt=x.title;y=x&&x.video_id?x.video_id:s_YTgk(u);if(y&&y!=t.yk){t.kl=t.yk;t.yk=y;t.ts=t.qs=t.ys=0;if(t.yd){delete t.yd;t.yd=0}t.yt='';a='s_YTdata_'+t.id+'_'+t.yk;b=D.getElementById(a);if(b)b.parentNode.removeChild(b);b=D.createElement('script');b.id=a;b.src='http://gdata.youtube.com/feeds/api/videos/'+t.yk+'?v=2&alt=json-in-script&callback=window.s_YTO.v.'+t.id+'.fc';a=D.getElementsByTagName('script')[0];a.parentNode.insertBefore(b,a)}if(yp.getDuration){x=yp.getDuration();t.ts=typeof x==N?Math.round(x):0}t.qs=0;if(yp.getCurrentTime){x=yp.getCurrentTime();t.qs=typeof x==N?Math.round(x):0}if(yp.getPlayerState){x=yp.getPlayerState();t.ys=x||0}}};t.ve=function(){var t=this,d,O=function(){t.sl=t.sn;t.sn='YouTube|'+(t.yk||t.id||'')+'|'+(t.yt||'');s.Media.open(t.sn,t.ts,s_YTO.vp);t.ss=1},P=function(){s.Media.play(t.sn,t.qs);t.ql=t.qs;t.ss=2},S=function(n,q){s.Media.stop(n||t.sn,q||t.qs);t.ss=1;t.ql=t.qs},C=function(n){s.Media.close(n||t.sn);t.ss=t.qs=t.ql=0};t.vg(t.yp);if(!s_YTism())return;if(t.sk&&t.sk!=t.kl){if(t.ss){if(t.ss==2)S(t.sl,t.ql);C(t.sl)}}switch(t.ys){case 1:if(t.ss==2){d=Math.abs(t.qs-t.ql);if(d>1)S(t.sn,t.ql)}if(!t.ss){O();t.qs=t.ql=0}P();break;case 0:if(t.ss){if(t.ss!=1){if(Math.abs(t.qs-t.ts)<=1)t.qs=t.ts;S()}C()}break;case 2:if(!t.ss)O();if(t.ss!=1)S();break;case 3:if(s_YTO.uf)clearTimeout(s_YTO.uf);else s_YTdi();s_YTO.uf=setTimeout('s_YTut()',3000);break;case-1:case 5:default:break}};t.fsc=function(ye){try{t.ys=ye;t.vg(t.yp);setTimeout('s_YTO.v["'+t.id+'"].ve()',10)}catch(e){}};t.isc=function(ye){try{t.ys=ye.data;t.vg(ye.target);setTimeout('s_YTO.v["'+t.id+'"].ve()',10)}catch(e){}};t.fc=function(d){try{t.yd=d;var T=d.entry&&d.entry.title?t.sn=d.entry.title.$t:'';if(T)t.yt=T}catch(e){}};try{var o=id&&typeof id=='string'?document.getElementById(id):'';if(!o)return null;t.vc();t.id=id;var W=window,ar=arguments;if(ar.length>1&&ar[1]==1){t.pt=1;t.yp=o;if(W.addEventListener)t.yp.addEventListener('onStateChange','s_YTO.v.'+id+'.fsc',false);else if(W.attachEvent)W.attachEvent('onStateChange','s_YTO.v.'+id+'.fsc')}else{t.pt=2;var a=new Object();if(ar.length>1)a.videoId=ar[1];if(ar.length>3){a.width=w;a.height=h}a.events=new Object();a.events.onStateChange=t.isc;t.yp=new YT.Player(id,a);t.vg(t.yp)}}catch(e){s_YTdv(id);t=null}return t}
/************************ TRACKING VARIABLES ************************/

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace='lenovo'
s.trackingServer='o.lenovo.com'
s.trackingServerSecure='s.lenovo.com'
s.dc='112'
s.vmk='4989C002'

/****************************** MODULES *****************************/
/* Module: Media */
s.m_Media_c="var m=s.m_i('Media');if(m.completeByCloseOffset==undefined)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==undefined)m.completeCloseOffsetThreshold=1;m.cn=function(n){var m="
+"this;return m.s.rep(m.s.rep(m.s.rep(n,\"\\n\",''),\"\\r\",''),'--**--','')};m.open=function(n,l,p,b){var m=this,i=new Object,tm=new Date,a='',x;n=m.cn(n);if(!l)l=-1;if(n&&p){if(!m.l)m.l=new Object;"
+"if(m.l[n])m.close(n);if(b&&b.id)a=b.id;if(a)for (x in m.l)if(m.l[x]&&m.l[x].a==a)m.close(m.l[x].n);i.n=n;i.l=l;i.o=0;i.x=0;i.p=m.cn(m.playerName?m.playerName:p);i.a=a;i.t=0;i.ts=0;i.s=Math.floor(tm"
+".getTime()/1000);i.lx=0;i.lt=i.s;i.lo=0;i.e='';i.to=-1;i.tc=0;i.fel=new Object;i.vt=0;i.sn=0;i.sx=\"\";i.sl=0;i.sg=0;i.sc=0;i.us=0;i.ad=0;i.adpn;i.adpp;i.adppp;i.clk;i.CPM;i.co=0;i.cot=0;i.lm=0;i.l"
+"om=0;m.l[n]=i}};m.openAd=function(n,l,p,pn,pp,ppp,CPM,b){var m=this,i=new Object;n=m.cn(n);m.open(n,l,p,b);i=m.l[n];if(i){i.ad=1;i.adpn=m.cn(pn);i.adpp=pp;i.adppp=ppp;i.CPM=CPM}};m._delete=function"
+"(n){var m=this,i;n=m.cn(n);i=m.l[n];m.l[n]=0;if(i&&i.m)clearTimeout(i.m.i)};m.close=function(n){this.e(n,0,-1)};m.play=function(n,o,sn,sx,sl){var m=this,i;i=m.e(n,1,o,sn,sx,sl);if(i&&!i.m){i.m=new "
+"Object;i.m.m=new Function('var m=s_c_il['+m._in+'],i;if(m.l){i=m.l[\"'+m.s.rep(i.n,'\"','\\\\\"')+'\"];if(i){if(i.lx==1)m.e(i.n,3,-1);i.m.i=setTimeout(i.m.m,1000)}}');i.m.m()}};m.click=function(n,o"
+"){this.e(n,7,o)};m.complete=function(n,o){this.e(n,5,o)};m.stop=function(n,o){this.e(n,2,o)};m.track=function(n){this.e(n,4,-1)};m.bcd=function(vo,i){var m=this,ns='a.media.',v=vo.linkTrackVars,e=v"
+"o.linkTrackEvents,pe='m_i',pev3,c=vo.contextData,x;if(i.ad){ns+='ad.';if(i.adpn){c['a.media.name']=i.adpn;c[ns+'pod']=i.adpp;c[ns+'podPosition']=i.adppp;}if(!i.vt)c[ns+'CPM']=i.CPM;}if (i.clk) {c[n"
+"s+'clicked']=true;i.clk=0}c['a.contentType']='video'+(i.ad?'Ad':'');c['a.media.channel']=m.channel;c[ns+'name']=i.n;c[ns+'playerName']=i.p;if(i.l>0)c[ns+'length']=i.l;if(Math.floor(i.ts)>0)c[ns+'ti"
+"mePlayed']=Math.floor(i.ts);if(!i.vt){c[ns+'view']=true;pe='m_s';i.vt=1}if(i.sx){c[ns+'segmentNum']=i.sn;c[ns+'segment']=i.sx;if(i.sl>0)c[ns+'segmentLength']=i.sl;if(i.sc&&i.ts>0)c[ns+'segmentView'"
+"]=true}if(!i.cot&&i.co){c[ns+\"complete\"]=true;i.cot=1}if(i.lm>0)c[ns+'milestone']=i.lm;if(i.lom>0)c[ns+'offsetMilestone']=i.lom;if(v)for(x in c)v+=',contextData.'+x;pev3=c['a.contentType'];vo.pe="
+"pe;vo.pev3=pev3;var d=m.contextDataMapping,y,a,l,n;if(d){vo.events2='';if(v)v+=',events';for(x in d){if(x.substring(0,ns.length)==ns)y=x.substring(ns.length);else y=\"\";a=d[x];if(typeof(a)=='strin"
+"g'){l=m.s.sp(a,',');for(n=0;n<l.length;n++){a=l[n];if(x==\"a.contentType\"){if(v)v+=','+a;vo[a]=c[x]}else if(y=='view'||y=='segmentView'||y=='clicked'||y=='complete'||y=='timePlayed'||y=='CPM'){if("
+"e)e+=','+a;if(y=='timePlayed'||y=='CPM'){if(c[x])vo.events2+=(vo.events2?',':'')+a+'='+c[x];}else if(c[x])vo.events2+=(vo.events2?',':'')+a}else if(y=='segment'&&c[x+'Num']){if(v)v+=','+a;vo[a]=c[x"
+"+'Num']+':'+c[x]}else{if(v)v+=','+a;vo[a]=c[x]}}}else if(y=='milestones'||y=='offsetMilestones'){x=x.substring(0,x.length-1);if(c[x]&&d[x+'s'][c[x]]){if(e)e+=','+d[x+'s'][c[x]];vo.events2+=(vo.even"
+"ts2?',':'')+d[x+'s'][c[x]]}}if(c[x])c[x]=undefined;if(y=='segment'&&c[x+'Num'])c[x+\"Num\"]=undefined}}vo.linkTrackVars=v;vo.linkTrackEvents=e};m.bpe=function(vo,i,x,o){var m=this,pe='m_o',pev3,d='"
+"--**--';pe='m_o';if(!i.vt){pe='m_s';i.vt=1}else if(x==4)pe='m_i';pev3=m.s.ape(i.n)+d+Math.floor(i.l>0?i.l:1)+d+m.s.ape(i.p)+d+Math.floor(i.t)+d+i.s+d+(i.to>=0?'L'+Math.floor(i.to):'')+i.e+(x!=0&&x!"
+"=2?'L'+Math.floor(o):'');vo.pe=pe;vo.pev3=pev3};m.e=function(n,x,o,sn,sx,sl,pd){var m=this,i,tm=new Date,ts=Math.floor(tm.getTime()/1000),c,l,v=m.trackVars,e=m.trackEvents,ti=m.trackSeconds,tp=m.tr"
+"ackMilestones,to=m.trackOffsetMilestones,sm=m.segmentByMilestones,so=m.segmentByOffsetMilestones,z=new Array,j,t=1,w=new Object,x,ek,tc,vo=new Object;if(!m.channel)m.channel=m.s.wd.location.hostnam"
+"e;n=m.cn(n);i=n&&m.l&&m.l[n]?m.l[n]:0;if(i){if(i.ad){ti=m.adTrackSeconds;tp=m.adTrackMilestones;to=m.adTrackOffsetMilestones;sm=m.adSegmentByMilestones;so=m.adSegmentByOffsetMilestones}if(o<0){if(i"
+".lx==1&&i.lt>0)o=(ts-i.lt)+i.lo;else o=i.lo}if(i.l>0)o=o<i.l?o:i.l;if(o<0)o=0;i.o=o;if(i.l>0){i.x=(i.o/i.l)*100;i.x=i.x>100?100:i.x}if(i.lo<0)i.lo=o;tc=i.tc;w.name=n;w.ad=i.ad;w.length=i.l;w.openTi"
+"me=new Date;w.openTime.setTime(i.s*1000);w.offset=i.o;w.percent=i.x;w.playerName=i.p;if(i.to<0)w.mediaEvent=w.event='OPEN';else w.mediaEvent=w.event=(x==1?'PLAY':(x==2?'STOP':(x==3?'MONITOR':(x==4?"
+"'TRACK':(x==5?'COMPLETE':(x==7?'CLICK':('CLOSE')))))));if(!pd){if(i.pd)pd=i.pd}else i.pd=pd;w.player=pd;if(x>2||(x!=i.lx&&(x!=2||i.lx==1))) {if(!sx){sn=i.sn;sx=i.sx;sl=i.sl}if(x){if(x==1)i.lo=o;if("
+"(x<=3||x>=5)&&i.to>=0){t=0;v=e=\"None\";if(i.to!=o){l=i.to;if(l>o){l=i.lo;if(l>o)l=o}z=tp?m.s.sp(tp,','):0;if(i.l>0&&z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&(l/i.l)*100<c"
+"&&i.x>=c){t=1;j=z.length;w.mediaEvent=w.event='MILESTONE';i.lm=w.milestone=c}}z=to?m.s.sp(to,','):0;if(z&&o>=l)for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c&&l<c&&o>=c){t=1;j=z.length;w"
+".mediaEvent=w.event='OFFSET_MILESTONE';i.lom=w.offsetMilestone=c}}}}if(i.sg||!sx){if(sm&&tp&&i.l>0){z=m.s.sp(tp,',');if(z){z[z.length]='100';l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0"
+";if(c){if(i.x<c){sn=j+1;sx='M:'+l+'-'+c;j=z.length}l=c}}}}else if(so&&to){z=m.s.sp(to,',');if(z){z[z.length]=''+(i.l>0?i.l:'E');l=0;for(j=0;j<z.length;j++){c=z[j]?parseFloat(''+z[j]):0;if(c||z[j]=="
+"'E'){if(o<c||z[j]=='E'){sn=j+1;sx='O:'+l+'-'+c;j=z.length}l=c}}}}if(sx)i.sg=1}if((sx||i.sx)&&sx!=i.sx){i.us=1;if(!i.sx){i.sn=sn;i.sx=sx}if(i.to>=0)t=1}if((x>=2||i.x>=100)&&i.lo<o){i.t+=o-i.lo;i.ts+"
+"=o-i.lo}if(x<=2||(x==3&&!i.lx)){i.e+=(x==1||x==3?'S':'E')+Math.floor(o);i.lx=(x==3?1:x)}if(!t&&i.to>=0&&x<=3){ti=ti?ti:0;if(ti&&i.ts>=ti){t=1;w.mediaEvent=w.event='SECONDS'}}i.lt=ts;i.lo=o}if(!x||("
+"x<=3&&i.x>=100)){if(i.lx!=2)i.e+='E'+Math.floor(o);x=0;v=e=\"None\";w.mediaEvent=w.event=\"CLOSE\"}if(x==7){w.clicked=i.clk=1;t=1}if(x==5||(m.completeByCloseOffset&&(!x||i.x>=100)&&i.l>0&&o>=i.l-m."
+"completeCloseOffsetThreshold)){w.complete=i.co=1;t=1}ek=w.mediaEvent;if(ek=='MILESTONE')ek+='_'+w.milestone;else if(ek=='OFFSET_MILESTONE')ek+='_'+w.offsetMilestone;if(!i.fel[ek]) {w.eventFirstTime"
+"=true;i.fel[ek]=1}else w.eventFirstTime=false;w.timePlayed=i.t;w.segmentNum=i.sn;w.segment=i.sx;w.segmentLength=i.sl;if(m.monitor&&x!=4)m.monitor(m.s,w);if(x==0)m._delete(n);if(t&&i.tc==tc){vo=new "
+"Object;vo.contextData=new Object;vo.linkTrackVars=v;vo.linkTrackEvents=e;if(!vo.linkTrackVars)vo.linkTrackVars='';if(!vo.linkTrackEvents)vo.linkTrackEvents='';if(m.trackUsingContextData)m.bcd(vo,i)"
+";else m.bpe(vo,i,x,o);m.s.t(vo);if(i.us){i.sn=sn;i.sx=sx;i.sc=1;i.us=0}else if(i.ts>0)i.sc=0;i.e=\"\";i.lm=i.lom=0;i.ts-=Math.floor(i.ts);i.to=o;i.tc++}}}return i};m.ae=function(n,l,p,x,o,sn,sx,sl,"
+"pd,b){var m=this,r=0;if(n&&(!m.autoTrackMediaLengthRequired||(length&&length>0)) &&p){if(!m.l||!m.l[n]){if(x==1||x==3){m.open(n,l,p,b);r=1}}else r=1;if(r)m.e(n,x,o,sn,sx,sl,pd)}};m.a=function(o,t){"
+"var m=this,i=o.id?o.id:o.name,n=o.name,p=0,v,c,c1,c2,xc=m.s.h,x,e,f1,f2='s_media_'+m._in+'_oc',f3='s_media_'+m._in+'_t',f4='s_media_'+m._in+'_s',f5='s_media_'+m._in+'_l',f6='s_media_'+m._in+'_m',f7"
+"='s_media_'+m._in+'_c',tcf,w;if(!i){if(!m.c)m.c=0;i='s_media_'+m._in+'_'+m.c;m.c++}if(!o.id)o.id=i;if(!o.name)o.name=n=i;if(!m.ol)m.ol=new Object;if(m.ol[i])return;m.ol[i]=o;if(!xc)xc=m.s.b;tcf=new"
+" Function('o','var e,p=0;try{if(o.versionInfo&&o.currentMedia&&o.controls)p=1}catch(e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetQuickTimeVersion();if(t)p=2}catch("
+"e){p=0}return p');p=tcf(o);if(!p){tcf=new Function('o','var e,p=0,t;try{t=o.GetVersionInfo();if(t)p=3}catch(e){p=0}return p');p=tcf(o)}}v=\"var m=s_c_il[\"+m._in+\"],o=m.ol['\"+i+\"']\";if(p==1){p="
+"'Windows Media Player '+o.versionInfo;c1=v+',n,p,l,x=-1,cm,c,mn;if(o){cm=o.currentMedia;c=o.controls;if(cm&&c){mn=cm.name?cm.name:c.URL;l=cm.duration;p=c.currentPosition;n=o.playState;if(n){if(n==8"
+")x=0;if(n==3)x=1;if(n==1||n==2||n==4||n==5||n==6)x=2;}';c2='if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}}';c=c1+c2;if(m.s.isie&&xc){x=m.s.d.createElement('script');x.language='jscript';x."
+"type='text/javascript';x.htmlFor=i;x.event='PlayStateChange(NewState)';x.defer=true;x.text=c;xc.appendChild(x);o[f6]=new Function(c1+'if(n==3){x=3;'+c2+'}setTimeout(o.'+f6+',5000)');o[f6]()}}if(p=="
+"2){p='QuickTime Player '+(o.GetIsQuickTimeRegistered()?'Pro ':'')+o.GetQuickTimeVersion();f1=f2;c=v+',n,x,t,l,p,p2,mn;if(o){mn=o.GetMovieName()?o.GetMovieName():o.GetURL();n=o.GetRate();t=o.GetTime"
+"Scale();l=o.GetDuration()/t;p=o.GetTime()/t;p2=o.'+f5+';if(n!=o.'+f4+'||p<p2||p-p2>5){x=2;if(n!=0)x=1;else if(p>=l)x=0;if(p<p2||p-p2>5)m.ae(mn,l,\"'+p+'\",2,p2,0,\"\",0,0,o);m.ae(mn,l,\"'+p+'\",x,x"
+"!=2?p:-1,0,\"\",0,0,o)}if(n>0&&o.'+f7+'>=10){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;o.'+f5+'=p;setTimeout(\"'+v+';o.'+f2+'(0,0)\",500)}';o[f1]=new Function('a','b',c"
+");o[f4]=-1;o[f7]=0;o[f1](0,0)}if(p==3){p='RealPlayer '+o.GetVersionInfo();f1=n+'_OnPlayStateChange';c1=v+',n,x=-1,l,p,mn;if(o){mn=o.GetTitle()?o.GetTitle():o.GetSource();n=o.GetPlayState();l=o.GetL"
+"ength()/1000;p=o.GetPosition()/1000;if(n!=o.'+f4+'){if(n==3)x=1;if(n==0||n==2||n==4||n==5)x=2;if(n==0&&(p>=l||p==0))x=0;if(x>=0)m.ae(mn,l,\"'+p+'\",x,x!=2?p:-1,0,\"\",0,0,o)}if(n==3&&(o.'+f7+'>=10|"
+"|!o.'+f3+')){m.ae(mn,l,\"'+p+'\",3,p,0,\"\",0,0,o);o.'+f7+'=0}o.'+f7+'++;o.'+f4+'=n;';c2='if(o.'+f2+')o.'+f2+'(o,n)}';if(m.s.wd[f1])o[f2]=m.s.wd[f1];m.s.wd[f1]=new Function('a','b',c1+c2);o[f1]=new"
+" Function('a','b',c1+'setTimeout(\"'+v+';o.'+f1+'(0,0)\",o.'+f3+'?500:5000);'+c2);o[f4]=-1;if(m.s.isie)o[f3]=1;o[f7]=0;o[f1](0,0)}};m.as=new Function('e','var m=s_c_il['+m._in+'],l,n;if(m.autoTrack"
+"&&m.s.d.getElementsByTagName){l=m.s.d.getElementsByTagName(m.s.isie?\"OBJECT\":\"EMBED\");if(l)for(n=0;n<l.length;n++)m.a(l[n]);}');if(s.wd.attachEvent)s.wd.attachEvent('onload',m.as);else if(s.wd."
+"addEventListener)s.wd.addEventListener('load',m.as,false);if(m.onLoad)m.onLoad(s,m)";s.m_i("Media");

/* Module: Survey */
s.m_Survey_c="s_sv_globals~=function(~.length~var m=this,~_root\",(e?e+\".\":\"\")+d+\".2o7.net/survey/~`e[\"~g.triggerRequested~execute~return~suites~;if(~g.commonRevi`p~};m._~rl=location.protocol+"
+"\"//\"+c.~=window~.match(/~g.pending~=navigator.~||`l.prototype~g.pageImpres`ps~\"]||\"\";~g.manualTriggers~g.incomingLists~&&i.constructor~){this._boot();~.toLowerCase()~gather~m._blocked())~=1;m."
+"_script(~.module._load~setTimeout(\"~.url+\"/~;for(~r.requested~g.commonUrl~.replace(/\\~){var ~);m.~<b[1]:n==\"~param(c,\"~impr~m.onLoad~else if(~Name~||{},~_booted~typeof ~!Object~\",\"~=\"s_sv_~"
+"s.va_t~sion~\"]=~=[];~~var m=s.m_i(\"Survey\"`blaunch`1i,e,c,o,f`O`3g`E.`0`il,j`Ag.unloaded||`R`8 0;i=i`N&&i.constructor==Array?i:[i];l=`L`Wj=0;j<i`2;++j)l[l`2]={l:m._`9,i:i[j],e:e||0,c:c||0,o:o||0"
+",f:f||0`C`7();`8 1;};m.ver`p = 10001;m._t`1`O`3s=m.s,g`E.`0`il,`e,i,k,`e={}`A`R`8`Wi=0;i<`o`2;i++){k=`o[i]`As[k]) `e[k]=s[k];}`5l`qm._`9;`5n`q`5page`h`K`5u`q`5pageURL`K`5c`q`5campaign`K`5r`q`5refer"
+"rer`Kl=`J`Al`2 > 4) l[l`2 - 4]=null;l[l`2]=`e;m._`7();`Crr`1`ag`E.`0`if=g.onScQueueEmpty||0`Af)f();`Cblocked`1){`3g`E.`0||{};`8 !m.`j||g.stop||!`G&&!`6;`C`7`1){if(`0.`7)`U`0.`7();\",0);`Cboot`1){`3"
+"s=m.s,w`E,g,c,d=s.dc,e=s.visitor`hspace,n`Happ`h`P,a`HuserAgent,v`HappVer`p,h,i,j,k,l,b`Aw.`0)`8`A!((b=v`FAppleWebKit\\/([0-9]+)/))?521`cnetscape\"?a`Fgecko\\//i):(b=a`Fopera[ \\/]?([0-9]+).[0-9]+/"
+"i))?7`cmicrosoft internet explorer\"&&!v`Fmacintosh/i)&&(b=v`Fmsie ([0-9]+).([0-9]+)/i))&&(5<b[1]||b[1]==5&&4<b[2])))`8;g=w.`0={};g.module=m;`G=0;`M`r`J`r`L`re=\"survey\";c=g.config={`C`ddynamic`4d"
+"ynamic\"`b_`d`Q`4`Q\");g.u`Ddynamic_root;g.`QU`D`Q_root;g.dataCenter=d;g.onListLoaded=new Function(\"r`mb`md`mi`ml`m`0`Ted(r,b,d,i,l);\"`b_`9=(m.`9||s.un)`P.split(`m);l=m._`9;b={}`Wj=0;j<l`2;++j){i"
+"=l[j]`Ai&&!b[i]){h=i`2`Wk=0;k<i`2;++k)h=(h&0x03ffffff)<<5^ h>>26^ i.charCodeAt(k);b[i]={url:g`V`9/\"+(h%251+100)+\"/\"+encodeURIComponent(i`Z|/,\"||\")`Z//,\"|-\"))};++`G;}}g.`9=b;`U`0`T();\",0`b`j"
+"=1;`Cparam`1c,n,v`ap`n\",w`E,u=\"undefined\"`A`kc[n]==u)c[n]=`kw[p+n]==u?v:w[p+n];`Cload`1){`3g=`0,q=g.`9,r,i,n`nsid\",b=m.s.c_r(n)`A!b){b=parseInt((new Date()).getTime()*Math.random()`bs.c_w(n,b);"
+"}for(i in q){r=q[i]`A(`l`I||`l.prototype[i]) && !`X){`X`Sr`Vlist.js?\"+b);}}`Cloaded`1r,b,d,i,l){`3g=`0,n=`M;--`G`A!`B){g.bulkRevi`p=b;`B=r;`Y=g`Vcommon/\"+b;}`g`B!=r)`8`A!l`2)`8;n[n`2]={r:i,l:l}`A"
+"g.`7)g.`7();`g!`6){`6`S`Y+\"/trigger.js\");}`Cscript`1u`ad=document,e=d.createElement(\"script\");e.type=\"text/javascript\";e.src=u;d.getElementsByTag`h(\"head\")[0].appendChild(e);}`A`f)`f(s,m)";
s.m_i("Survey");
/* Module: Integrate */
s.m_Integrate_c="=function(~`M,m=p._m~p.disable~.substring(~;i<m.l`D;i++){p=m[m.l[i]]`6p&&!~){var m=this,~;if(~Integrate~&&(!s.isopera||`J7)~};m.~||!`F.prototype~m._fu(p,u)~=new ~.length~m.s.loadModu"
+"le(~Object~p._d~_'+p._~return ~s.apv>=~tm.getTime()~=u.indexOf('~){var p=this~'http~Math.~_'+m._in+'_~beacon~script~p[f](s,p)}~m.s.wd[o]~delay~ready~m.onLoad~p._c++;~;for(i=~;p.RAND~else~random~flo"
+"or(~s.rep(~!v)v='~~var m=s.m_i('`7');m.add`0n,o`5p`6!o)o='s_`7_'+n`6!`T)`T`C`F;m[n]`C`F;p=m[n];p._n=n;p._m=m;p._c=0;`G=0;`2=0;p.get=m.get;p.`U=m.`U;p.`V=m.`V;p.`Q=m.`Q;p.`R=m.`R;m.l[m.l`D]=n`9_g`0t"
+"`5s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf`Y0`4`2&&p[f]){if(`J5`8){tcf`CFunction('s','p','f','var e;try{`Scatch(e){}');tcf(s,p,f)}`a `S}`9_t`0){this._g(1)`9_fu`0p,u`5s=m.s,v,x,y,z,tm`CDate`6u.toLower"
+"Case()`30,4) != `N')u=`N://'+u`6s.ssl)u=`du,`N:',`Ns:')`Z=Math&&`O`b?`O`c`O`b()*10000000000000):`K`Z+=`O`c`K/10800000)%10;x=0;while(x>=0){x`L[',x)`6x>=0){y`L]',x)`6y>x){z=u`3x+1,y)`6z`D>2&&z`30,2)="
+"='s.'){v=s[z`32)]`6`e'}`a{v=''+p[z]`6!(v==p[z]||parseFloat(v)==p[z]))z=0}if(z) {u=u`30,x)+`descape(v),'+','%2B')+u`3y+1);x=y-(z`D-v`D+1)} `a {x=y}}}}`Iu`9get`0u,v`1`6!`2){if(`es`P`7`Hn+'_get`Hc;`Xp"
+".VAR=v;`G++;`E'`7:'+v,`B,0,1,p._n)}`9`U`0`M`6`G<=0)`G=1`9`V`0`1;`G=0`6!`2)m.s.dlt()`9_d`0`5i,p`Y0`4`2&&`G>0)`I1}`I0`9_x`0d,n`M[n],x`6!`2){for(x in d)if(x&&(!`F`A||!`F.prototype[x]))p[x]=d[x];`G--}`"
+"9`Q`0u`1,s=m.s,imn='s_i`P`7`Hn+'`Hc,im`6!`2&&s.d.images&&`J3`8&&(s.ns6<0||`J6.1)){`Xim=s.wd[imn]`CImage;im.src=`B}`9`R`0u`1`6!`2)`E0,`B,0,1)`9l`CArray`6`W)`W(s,m)";
s.m_i("Integrate");

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27.4';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\"
+"\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}retur"
+"n y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;ret"
+"urn 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent("
+"x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.su"
+"bstring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+"
+"','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00"
+"'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unesc"
+"ape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r"
+";z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring("
+"0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf'"
+",f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visi"
+"bilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){whil"
+"e(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\")"
+";s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.li"
+"nkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostnam"
+"e,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'"
+".','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<"
+"0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-6"
+"0);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':''"
+");return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i"
+";l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tc"
+"f=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s"
+".wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0"
+";return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return "
+"s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)fo"
+"r(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.tagContainerMarker='';s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingS"
+"erverSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net"
+"';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobi"
+"le?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+(s.tagContainerMarker?\"-\"+s.tagContainerMarker:\"\")+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv"
+">=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+"
+"'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;fo"
+"r(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=windo"
+"w,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s."
+"forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_"
+"top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'"
+"};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v)"
+"{var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLo"
+"werCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google'"
+")>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(',"
+"'+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf"
+",vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',"
+"')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk]"
+";if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(ty"
+"peof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else "
+"if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.subs"
+"tring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv="
+"','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[m"
+"n].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x"
+"=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q"
+"='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocatio"
+"nHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='authState')q='as';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k"
+"=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=functi"
+"on(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFi"
+"lters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.inde"
+"xOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.ln"
+"k=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct."
+"href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForce"
+"dLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcEl"
+"ement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a"
+".parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent"
+"\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var"
+" x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n"
+"=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=t"
+"his,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.p"
+"rotocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagN"
+"ame;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t"
+"=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toL"
+"owerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if"
+"(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.inde"
+"xOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=funct"
+"ion(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s"
+".epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s"
+".sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]"
+"]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var "
+"s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf("
+"\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclic"
+"k',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTrackin"
+"g=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s"
+"_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m)"
+"{if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}retu"
+"rn 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m"
+";l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s"
+".un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl"
+"=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e'"
+",'_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m["
+"l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))r"
+"eturn;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).ind"
+"exOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s."
+"m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).i"
+"ndexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.l"
+"oadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}"
+"else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._i"
+"n+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250"
+";if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/"
+"javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,"
+"u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){v"
+"ar s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=fu"
+"nction(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i"
+"=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s"
+".maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.d"
+"lt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloud"
+"VisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID "
+"= false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck("
+");};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s."
+"audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWa"
+"itingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;"
+"s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisito"
+"rID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marke"
+"tingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnaly"
+"ticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalytics"
+"VisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;"
+"s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint ="
+" true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudience"
+"ManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarke"
+"tingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingF"
+"orAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceMa"
+"nagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToT"
+"rack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;i"
+"f (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWh"
+"enReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack())"
+" {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._call"
+"backWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrac"
+"k=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {}"
+";for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s"
+".callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexO"
+"f('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));"
+"if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),s"
+"ess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '"
+"+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if (s.visitor) {if (s.visitor.getAuthState) {s.authState = s.visitor.getAuthState();}if ((!s.supplementalDataID) && ("
+"s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}}if(s.mpc('t',arguments))return;s.g"
+"l(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='"
+"',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.to"
+"Precision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';"
+"if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv"
+">=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.of"
+"fsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return h"
+"p');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30)"
+"{ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectio"
+"nType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);"
+"if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s"
+".eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}i"
+"f(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLea"
+"veQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else "
+"trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-"
+"object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx"
+";if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt"
+"(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s',"
+"'var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+"
+"(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m("
+"'t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.e"
+"o=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=t"
+"his;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagC"
+"ontainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];"
+"y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='functi"
+"on'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply"
+"(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagNa"
+"me){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('"
+"Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parse"
+"Float(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;"
+"if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDat"
+"aID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,"
+"ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteL"
+"ightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIn"
+"crementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,authState,linkName,linkType';var n;for(n="
+"1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,re"
+"solution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trac"
+"kingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccoun"
+"tMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,light"
+"TrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=functi"
+"on(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()


//audience manager code
if( !location.hostname.match( "support.lenovo.com" ) ){ 
if("function"!=typeof DIL)DIL=function(a,b){var d=[],c,e;a!==Object(a)&&(a={});var f,h,i,q,o,p,k,t,u,D,y;f=a.partner;h=a.containerNSID;i=a.iframeAttachmentDelay;q=!!a.disableDestinationPublishingIframe;o=a.iframeAkamaiHTTPS;p=a.mappings;k=a.uuidCookie;t=!0===a.enableErrorReporting;u=a.visitorService;D=a.declaredId;y=!0===a.removeFinishedScriptsAndCallbacks;var E,F,A;E=!0===a.disableScriptAttachment;F=!0===a.disableDefaultRequest;A=a.afterResultForDefaultRequest;t&&DIL.errorModule.activate();var G=
!0===window._dil_unit_tests;(c=b)&&d.push(c+"");if(!f||"string"!=typeof f)return c="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:c,filename:"dil.js"}),Error(c);c="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"==typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(c="");c&&(h=0,d.push(c),c="");e=DIL.getDil(f,h);if(e instanceof DIL&&e.api.getPartner()==f&&e.api.getContainerNSID()==h)return e;if(this instanceof
DIL)DIL.registerDil(this,f,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+f+" and containerNSID = "+h);var v={IS_HTTPS:"https:"==document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},B={stuffed:{}},j={},l={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",
firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,uuid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(g){try{if(!this.admsProcessingStarted){var a=this,n,s,c,b,d;if("function"==typeof g&&"function"==typeof g.getInstance){if(u===Object(u)&&(n=u.namespace)&&
"string"==typeof n)s=g.getInstance(n);else{this.releaseType="no namespace";this.releaseRequests();return}if(s===Object(s)&&"function"==typeof s.isAllowed&&"function"==typeof s.getGlobalVisitorID){if(!s.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=s;this.admsProcessingStarted=!0;c=function(g){if("VisitorAPI"!=a.releaseType)a.uuid=g,a.releaseType="VisitorAPI",a.releaseRequests()};if(G&&(b=u.server)&&"string"==typeof b)s.server=b;d=s.getGlobalVisitorID(c);
if("string"==typeof d&&d.length){c(d);return}setTimeout(function(){if("VisitorAPI"!=a.releaseType)a.releaseType="timeout",a.releaseRequests()},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(f){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;l.registerRequest()},getGlobalVisitorID:function(){return this.instance?this.instance.getGlobalVisitorID():null}},declaredId:{uuid:null,declaredId:{init:null,
request:null},declaredIdCombos:{},dIdAlwaysOn:!1,dIdInRequest:!1,setDeclaredId:function(g,a){var n=r.isPopulatedString,c=encodeURIComponent;if(g===Object(g)&&n(a)){var b=g.dpid,d=g.dpuuid,f=null;if(n(b)&&n(d)){f=c(b)+"$"+c(d);if(!0===this.declaredIdCombos[f])return"setDeclaredId: combo exists for type '"+a+"'";this.declaredIdCombos[f]=!0;this.declaredId[a]={dpid:b,dpuuid:d};if("init"==a)this.dIdAlwaysOn=!0;else if("request"==a)this.dIdInRequest=!0;return"setDeclaredId: succeeded for type '"+a+"'"}}return"setDeclaredId: failed for type '"+
a+"'"},getDeclaredIdQueryString:function(){var g=this.declaredId.request,a=this.declaredId.init,n="";null!==g?n="&d_dpid="+g.dpid+"&d_dpuuid="+g.dpuuid:null!==a&&(n="&d_dpid="+a.dpid+"&d_dpuuid="+a.dpuuid);return n},getUUIDQueryString:function(){var g=l.adms,a=r.isPopulatedString,n=!1,c=l.adms.getGlobalVisitorID();if(a(this.uuid)){if(a(c)&&this.uuid!=c)this.uuid=c}else this.uuid=c||g.uuid;if(this.dIdAlwaysOn||this.dIdInRequest)n=!0,this.dIdInRequest=!1;return a(this.uuid)&&n?"d_uuid="+this.uuid+"&":
""}},registerRequest:function(g){var a=this.firingQueue;g===Object(g)&&a.push(g);if(!this.firing&&a.length)if(this.adms.calledBack){if(g=a.shift(),g.src=g.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.declaredId.getUUIDQueryString()+"d_nsid="),w.fireRequest(g),!this.firstRequestHasFired&&"script"==g.tag)this.firstRequestHasFired=!0}else this.processVisitorAPI()},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(g){if(!y)return"removeFinishedScriptsAndCallbacks is not boolean true";
var a=this.toRemove,c,b;if(g===Object(g))c=g.script,b=g.callbackName,(c===Object(c)&&"SCRIPT"==c.nodeName||"no script created"==c)&&"string"==typeof b&&b.length&&a.push(g);if(this.readyToRemove&&a.length){b=a.shift();c=b.script;b=b.callbackName;"no script created"!=c?(g=c.src,c.parentNode.removeChild(c)):g=c;window[b]=null;try{delete window[b]}catch(d){}this.removed.push({scriptSrc:g,callbackName:b});DIL.variables.scriptsRemoved.push(g);DIL.variables.callbacksRemoved.push(b);return this.requestRemoval()}return"requestRemoval() processed"}};
e=function(){var g="http://fast.";v.IS_HTTPS&&(g=!0===o?"https://fast.":"https://");return g+f+".demdex.net/dest4.html?d_nsid="+h+"#"+encodeURIComponent(document.location.href)};var x={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+f+"_"+h,url:e(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:v.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var g=this,a=document.createElement("iframe");a.id=
this.id;a.style.cssText="display: none; width: 0; height: 0;";a.src=this.url;m.addListener(a,"load",function(){g.iframeHasLoaded=!0;g.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(g,a){var c=this;g&&!r.isEmptyObject(g)&&this.process(g,a);if(this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages){if(!this.throttleTimerSet)this.throttleTimerSet=!0,setTimeout(function(){c.messageSendingInterval=v.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START);
this.sendingMessages=!0;this.sendMessages()}},process:function(g,a){var c=encodeURIComponent,b,d,f,e,h,k;a===Object(a)&&(k=m.encodeAndBuildRequest([l.declaredId.uuid||"",a.dpid||"",a.dpuuid||""],","));if((b=g.dests)&&b instanceof Array&&(d=b.length))for(f=0;f<d;f++)e=b[f],e=[c("dests"),c(e.id||""),c(e.y||""),c(e.c||"")],this.addMessage(e.join("|"));if((b=g.ibs)&&b instanceof Array&&(d=b.length))for(f=0;f<d;f++)e=b[f],e=[c("ibs"),c(e.id||""),c(e.tag||""),m.encodeAndBuildRequest(e.url||[],","),c(e.ttl||
""),"",k],this.addMessage(e.join("|"));if((b=g.dpcalls)&&b instanceof Array&&(d=b.length))for(f=0;f<d;f++)e=b[f],h=e.callback||{},h=[h.obj||"",h.fn||"",h.key||"",h.tag||"",h.url||""],e=[c("dpm"),c(e.id||""),c(e.tag||""),m.encodeAndBuildRequest(e.url||[],","),c(e.ttl||""),m.encodeAndBuildRequest(h,","),k],this.addMessage(e.join("|"));this.jsonProcessed.push(g)},addMessage:function(g){var a=encodeURIComponent;this.messages.push((t?a("---destpub-debug---"):a("---destpub---"))+g)},sendMessages:function(){var g=
this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){g.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},C={traits:function(g){if(r.isValidPdata(g)){if(!(j.sids instanceof Array))j.sids=[];m.extendArray(j.sids,g)}return this},pixels:function(g){if(r.isValidPdata(g)){if(!(j.pdata instanceof Array))j.pdata=[];m.extendArray(j.pdata,g)}return this},logs:function(g){if(r.isValidLogdata(g)){if(j.logdata!==
Object(j.logdata))j.logdata={};m.extendObject(j.logdata,g)}return this},customQueryParams:function(g){r.isEmptyObject(g)||m.extendObject(j,g,l.reservedKeys);return this},signals:function(g,a){var c,b=g;if(!r.isEmptyObject(b)){if(a&&"string"==typeof a)for(c in b={},g)g.hasOwnProperty(c)&&(b[a+c]=g[c]);m.extendObject(j,b,l.reservedKeys)}return this},declaredId:function(g){l.declaredId.setDeclaredId(g,"request");return this},result:function(g){if("function"==typeof g)j.callback=g;return this},afterResult:function(g){if("function"==
typeof g)j.postCallbackFn=g;return this},useImageRequest:function(){j.useImageRequest=!0;return this},clearData:function(){j={};return this},submit:function(g){w.submitRequest(j,g);j={};return this},getPartner:function(){return f},getContainerNSID:function(){return h},getEventLog:function(){return d},getState:function(){var g={},a={};m.extendObject(g,l,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});m.extendObject(a,x,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:j,
otherRequestInfo:g,destinationPublishingInfo:a}},idSync:function(g){if(g!==Object(g)||"string"!=typeof g.dpid||!g.dpid.length)return"Error: config or config.dpid is empty";if("string"!=typeof g.url||!g.url.length)return"Error: config.url is empty";var a=g.url,c=g.minutesToLive,b=encodeURIComponent,d=l.declaredId,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"==typeof c)c=20160;else if(c=parseInt(c,10),isNaN(c)||0>=c)return"Error: config.minutesToLive needs to be a positive number";d=
m.encodeAndBuildRequest([l.adms.getGlobalVisitorID()||d.uuid||"",g.dpid,g.dpuuid||""],",");g=["ibs",b(g.dpid),"img",b(a),c,"",d];x.addMessage(g.join("|"));l.firstRequestHasFired&&x.requestToProcess();return"Successfully queued"},aamIdSync:function(a){if(a!==Object(a)||"string"!=typeof a.dpuuid||!a.dpuuid.length)return"Error: config or config.dpuuid is empty";a.url="//dpm.demdex.net/ibs:dpid="+a.dpid+"&dpuuid="+a.dpuuid;return this.idSync(a)},passData:function(a){if(r.isEmptyObject(a))return"Error: json is empty or not an object";
w.defaultCallback(a);return"json submitted for processing"}},w={submitRequest:function(a,c){l.registerRequest(w.createQueuedRequest(a,c));return!0},createQueuedRequest:function(a,c){var b=l,d,e=a.callback,H="img";if(!r.isEmptyObject(p)){var k,i,q;for(k in p)if(p.hasOwnProperty(k)&&(i=p[k],!(null==i||""===i)&&k in a&&!(i in a)&&!(i in l.reservedKeys)))q=a[k],null==q||""===q||(a[i]=q)}if(!r.isValidPdata(a.sids))a.sids=[];if(!r.isValidPdata(a.pdata))a.pdata=[];if(!r.isValidLogdata(a.logdata))a.logdata=
{};a.logdataArray=m.convertObjectToKeyValuePairs(a.logdata,"=",!0);a.logdataArray.push("_ts="+(new Date).getTime());if("function"!=typeof e)e=this.defaultCallback;if(b.useJSONP=!a.useImageRequest||"boolean"!=typeof a.useImageRequest)H="script",d=b.callbackPrefix+"_"+f+"_"+h+"_"+(new Date).getTime();return{tag:H,src:w.makeRequestSrc(a,d),internalCallbackName:d,callbackFn:e,postCallbackFn:a.postCallbackFn,useImageRequest:a.useImageRequest,requestData:a,useDocWrite:c===Object(c)&&!0===c.useDocumentWrite}},
defaultCallback:function(a,c){var b,d,e,f,h,i,o,j,p;if((b=a.stuff)&&b instanceof Array&&(d=b.length))for(e=0;e<d;e++)if((f=b[e])&&f===Object(f)){h=f.cn;i=f.cv;o=f.ttl;if("undefined"==typeof o||""===o)o=Math.floor(m.getMaxCookieExpiresInMinutes()/60/24);j=f.dmn||"."+document.domain.replace(/^www\./,"");p=f.type;if(h&&(i||"number"==typeof i))"var"!=p&&(o=parseInt(o,10))&&!isNaN(o)&&m.setCookie(h,i,1440*o,"/",j,!1),B.stuffed[h]=i}b=a.uuid;d=l.declaredId;e=r.isPopulatedString;if(e(b)){if(!e(d.uuid))d.uuid=
b;if(!r.isEmptyObject(k)){d=k.path;if("string"!=typeof d||!d.length)d="/";e=parseInt(k.days,10);isNaN(e)&&(e=100);m.setCookie(k.name||"aam_did",b,1440*e,d,k.domain||"."+document.domain.replace(/^www\./,""),!0===k.secure)}}!q&&!l.abortRequests&&x.requestToProcess(a,c)},makeRequestSrc:function(a,c){a.sids=r.removeEmptyArrayValues(a.sids||[]);a.pdata=r.removeEmptyArrayValues(a.pdata||[]);var b=l,d=m.encodeAndBuildRequest(a.sids,","),e=m.encodeAndBuildRequest(a.pdata,","),k=(a.logdataArray||[]).join("&");
delete a.logdataArray;var i=v.IS_HTTPS?"https://":"http://",q=b.declaredId.getDeclaredIdQueryString(),o;o=[];var j,p,t,u;for(j in a)if(!(j in b.reservedKeys)&&a.hasOwnProperty(j))if(p=a[j],j=encodeURIComponent(j),p instanceof Array)for(t=0,u=p.length;t<u;t++)o.push(j+"="+encodeURIComponent(p[t]));else o.push(j+"="+encodeURIComponent(p));o=o.length?"&"+o.join("&"):"";return i+f+".demdex.net/event?d_nsid="+h+q+(d.length?"&d_sid="+d:"")+(e.length?"&d_px="+e:"")+(k.length?"&d_ld="+encodeURIComponent(k):
"")+o+(b.useJSONP?"&d_rtbd=json&d_jsonv="+DIL.jsonVersion+"&d_dst=1&d_cts=1&d_cb="+(c||""):"")},fireRequest:function(a){if("img"==a.tag)this.fireImage(a);else if("script"==a.tag){var c=l.declaredId,c=c.declaredId.request||c.declaredId.init||{};this.fireScript(a,{dpid:c.dpid||"",dpuuid:c.dpuuid||""})}},fireImage:function(a){var b=l,e,f;if(!b.abortRequests)b.firing=!0,e=new Image(0,0),b.sent.push(a),e.onload=function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},f=function(e){c=
"imgAbortOrErrorHandler received the event of type "+e.type;d.push(c);b.abortRequests=!0;b.firing=!1;b.errored.push(a);b.num_of_img_errors++;b.registerRequest()},e.addEventListener?(e.addEventListener("error",f,!1),e.addEventListener("abort",f,!1)):e.attachEvent&&(e.attachEvent("onerror",f),e.attachEvent("onabort",f)),e.src=a.src},fireScript:function(a,b){var e=this,h=l,k,i,o=a.src,q=a.postCallbackFn,j="function"==typeof q,p=a.internalCallbackName;k=a.useDocWrite;if(!h.abortRequests){h.firing=!0;
window[p]=function(e){try{e!==Object(e)&&(e={});var k=a.callbackFn;h.firing=!1;h.fired.push(a);h.num_of_jsonp_responses++;k(e,b);j&&q(e,b)}catch(n){n.message="DIL jsonp callback caught error with message "+n.message;c=n.message;d.push(c);n.filename=n.filename||"dil.js";n.partner=f;DIL.errorModule.handleError(n);try{k({error:n.name+"|"+n.message}),j&&q({error:n.name+"|"+n.message})}catch(o){}}finally{h.requestRemoval({script:i,callbackName:p}),h.registerRequest()}};var m=function(){h.firing=!1;h.requestRemoval({script:"no script created",
callbackName:p})};E?m():k?DIL.windowLoaded||"complete"==document.readyState||"loaded"==document.readyState?(a.useDocWriteSuccessful=!1,m()):(document.write('<script type="text/javascript" src="'+o+'" id="'+p+'"><\/script>'),i=document.getElementById(p),a.useDocWriteSuccessful=!0):(i=document.createElement("script"),i.addEventListener&&i.addEventListener("error",function(b){h.requestRemoval({script:i,callbackName:p});c="jsonp script tag error listener received the event of type "+b.type+" with src "+
o;e.handleScriptError(c,a)},!1),i.type="text/javascript",i.src=o,k=DIL.variables.scriptNodeList[0],k.parentNode.insertBefore(i,k));h.sent.push(a);h.declaredId.declaredId.request=null}},handleScriptError:function(a,b){var c=l;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.num_of_jsonp_errors++;c.registerRequest()}},r={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==
Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,e=[],b=0;b<c;b++)d=a[b],"undefined"!=typeof d&&null!=d&&e.push(d);return e},isPopulatedString:function(a){return"string"==typeof a&&a.length}},m={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"==typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"==
typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,b,c){var d=[],b=b||"=",e,f;for(e in a)f=a[e],"undefined"!=typeof f&&null!=f&&d.push(e+b+(c?encodeURIComponent(f):f));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=Array(d),f=0;f<d;f++)f in
c&&(e[f]=b.call(b,c[f],f,c));return e},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=[],f=0;f<d;f++)if(f in c){var h=c[f];b.call(b,h,f,c)&&e.push(h)}return e}return a.filter(b)},getCookie:function(a){var a=a+"=",b=document.cookie.split(";"),c,d,e;for(c=0,d=b.length;c<d;c++){for(e=b[c];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return decodeURIComponent(e.substring(a.length,
e.length))}return null},setCookie:function(a,b,c,d,e,f){var h=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)if(b.hasOwnProperty(d)&&(r.isEmptyObject(c)||!(d in c)))a[d]=b[d];return!0}return!1},
getMaxCookieExpiresInMinutes:function(){return((new Date(v.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60}};"error"==f&&0==h&&m.addListener(window,"load",function(){DIL.windowLoaded=!0});var z=function(){J();!q&&!l.abortRequests&&x.attachIframe();l.readyToRemove=!0;l.requestRemoval()},J=function(){q||setTimeout(function(){!F&&!l.firstRequestHasFired&&!l.adms.admsProcessingStarted&&!l.adms.calledBack&&("function"==typeof A?C.afterResult(A).submit():C.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},
I=document;"error"!=f&&(DIL.windowLoaded?z():"complete"!=I.readyState&&"loaded"!=I.readyState?m.addListener(window,"load",z):DIL.isAddedPostWindowLoadWasCalled?m.addListener(window,"load",z):(i="number"==typeof i?parseInt(i,10):0,0>i&&(i=0),setTimeout(z,i||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));l.declaredId.setDeclaredId(D,"init");this.api=C;this.getStuffedVariable=function(a){var b=B.stuffed[a];!b&&"number"!=typeof b&&(b=m.getCookie(a),!b&&"number"!=typeof b&&(b=""));return b};this.validators=
r;this.helpers=m;this.constants=v;this.log=d;if(G)this.pendingRequest=j,this.requestController=l,this.setDestinationPublishingUrl=e,this.destinationPublishing=x,this.requestProcs=w,this.variables=B},function(){var a=document,b;if(null==a.readyState&&a.addEventListener)a.readyState="loading",a.addEventListener("DOMContentLoaded",b=function(){a.removeEventListener("DOMContentLoaded",b,!1);a.readyState="complete"},!1)}(),DIL.extendStaticPropertiesAndMethods=function(a){var b;if(a===Object(a))for(b in a)a.hasOwnProperty(b)&&
(this[b]=a[b])},DIL.extendStaticPropertiesAndMethods({version:"4.3",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=!0;this.windowLoaded="function"==typeof a?!!a():"boolean"==typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(b){return(new Image(0,
0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,b,d){b=b+"$"+d;b in this.dils||(this.dils[b]=a)},getDil:function(a,b){var d;"string"!=typeof a&&(a="");b||(b=0);d=a+"$"+b;return d in this.dils?this.dils[d]:
Error("The DIL instance with partner = "+a+" and containerNSID = "+b+" was not found")},dexGetQSVars:function(a,b,d){b=this.getDil(b,d);return b instanceof this?b.getStuffedVariable(a):""},xd:{postMessage:function(a,b,d){var c=1;if(b)if(window.postMessage)d.postMessage(a,b.replace(/([^:]+:\/\/[^\/]+).*/,"$1"));else if(b)d.location=b.replace(/#.*$/,"")+"#"+ +new Date+c++ +"&"+a}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),
b={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(c){if(!d)return"DIL error module has not been activated";c!==Object(c)&&(c={});var e=c.name?(new String(c.name)).toLowerCase():"",f=[],c={name:e,filename:c.filename?c.filename+"":"",partner:c.partner?c.partner+"":"no_partner",site:c.site?c.site+
"":document.location.href,message:c.message?c.message+"":""};f.push(e in b?b[e]:b.noerrortypedefined);a.api.pixels(f).logs(c).useImageRequest().submit();return"DIL error report sent"},pixelMap:b}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,b,d){var c="",b=b||"Error caught in DIL module/submodule: ";a===Object(a)?c=b+(a.message||"err has no message"):(c=b+"err is not a valid object",a={});a.message=c;if(d instanceof DIL)a.partner=d.api.getPartner();DIL.errorModule.handleError(a);
return this.errorMessage=c}}};
DIL.tools.getSearchReferrer=function(a,b){var d=DIL.getDil("error"),c=DIL.tools.decomposeURI(a||document.referrer),e="",f="",h={queryParam:"q"},e=d.helpers.filter([b===Object(b)?b:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!c.hostname.match(a.hostPattern))}).shift();return!e?{valid:!1,name:"",keywords:""}:{valid:!0,name:c.hostname,keywords:(d.helpers.extendObject(h,
e),f=h.queryPattern?(e=(""+c.search).match(h.queryPattern))?e[1]:"":c.uriParams[h.queryParam],decodeURIComponent(f||"").replace(/\+|%20/g," "))}};
DIL.tools.decomposeURI=function(a){var b=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){b.helpers.map(d.split("&"),function(b){b=b.split("=");a[b.shift()]=b.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},b=document.getElementsByTagName("meta"),d,c,e,f,h;for(d=0,e=arguments.length;d<e;d++)if(f=arguments[d],null!==f)for(c=0;c<b.length;c++)if(h=b[c],h.name==f){a[f]=h.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{var c=this,e={name:"DIL Site Catalyst Module Error"},f=function(a){e.message=a;DIL.errorModule.handleError(e);return a};this.dil=null;if(b instanceof DIL)this.dil=b;else return f("dilInstance is not a valid instance of DIL");e.partner=b.api.getPartner();if(a!==Object(a))return f("siteCatalystReportingSuite is not an object");if("function"!=typeof a.m_i||"function"!=typeof a.loadModule)return f("s.m_i is not a function or s.loadModule is not a function");
a.m_DIL=function(a){a=a.m_i("DIL");if(a!==Object(a))return f("m is not an object");a.trackVars=c.constructTrackVars(d);a.d=0;a._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,e,h=[];e=[];var i={},y=!1;if(d!==Object(d)||!(d.va_t instanceof Array))return f("Error in m._t function: s is not an object or s.va_t is not an array");if(this.d){if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType){a=d.linkTrackVars;if(d.pe&&(b=d.pe.substring(0,1).toUpperCase()+
d.pe.substring(1),d[b]))a=d[b].trackVars;a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",")}if(a){for(b=0,h=a.split(",");b<h.length;b++)0<=c.indexOf(","+h[b]+",")&&e.push(h[b]);e.length&&(c=","+e.join(",")+",")}for(e=0,b=d.va_t.length;e<b;e++)a=d.va_t[e],0<=c.indexOf(","+a+",")&&null!=d[a]&&""!==d[a]&&(i[a]=d[a],y=!0);y&&this.d.api.signals(i,"c_").submit()}};a.setup=function(){this.d=b}};a.loadModule("DIL");if(a.DIL!==Object(a.DIL)||"function"!=typeof a.DIL.setup)return f("s.DIL is not an object or s.DIL.setup is not a function");
a.DIL.setup();if(e.message)return e.message}catch(h){return this.handle(h,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var b=[],d,c,e,f,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(e=d.length))for(c=0;c<e;c++)f=d[c],"string"==typeof f&&f.length&&b.push(f);a=a.iteratedNames;if(a instanceof Array&&(e=a.length))for(c=0;c<e;c++)if(d=a[c],d===Object(d)&&(f=d.name,h=parseInt(d.maxIndex,10),"string"==typeof f&&f.length&&!isNaN(h)&&0<=h))for(d=
0;d<=h;d++)b.push(f+d);if(b.length)return b.join(",")}return this.constructTrackVars({names:"pageName,channel,campaign,products,events,pe,pev1,pev2,pev3".split(","),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:75}]})}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var c={name:"DIL GA Module Error"},e="";b instanceof DIL?(this.dil=b,c.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",
c.message=e,DIL.errorModule.handleError(c));!(a instanceof Array)||!a.length?(e="gaArray is not an array or is empty",c.message=e,DIL.errorModule.handleError(c)):this.arr=a;this.tv=this.constructTrackVars(d);this.errorMessage=e}catch(f){this.handle(f,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var b=[],d,c,e,f;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){e=this.defaultTrackVars;f={};for(d=0,c=e.length;d<c;d++)f[e[d]]=
!0;this.defaultTrackVarsObj=f}else f=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(c=a.length))for(d=0;d<c;d++)e=a[d],"string"==typeof e&&e.length&&e in f&&b.push(e);if(b.length)return b}return this.defaultTrackVars},constructGAObj:function(a){var b={},a=a instanceof Array?a:this.arr,d,c,e,f;for(d=0,c=a.length;d<c;d++)e=a[d],e instanceof Array&&e.length&&(f=e.shift(),"string"==typeof f&&f.length&&(b[f]instanceof Array||(b[f]=[]),b[f].push(e)));return b},addToSignals:function(a,
b){if("string"!=typeof a||""===a||null==b||""===b)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(b);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),b={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c){"string"==typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,e,f){this.addToSignals("c_itemOrderId",a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",
c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",f)},_addTrans:function(a,b,c,d,e,f,h,i){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",f);this.addToSignals("c_transState",h);this.addToSignals("c_transCountry",i)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",
a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,c,e,f,h,i,q;for(c=0,e=d.length;c<e;c++)if(f=d[c],a.hasOwnProperty(f)&&b.hasOwnProperty(f)&&(q=a[f],q instanceof Array))for(h=0,i=q.length;h<i;h++)b[f].apply(this,q[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();return this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,
"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,b,d){try{this.callback=this.dil=null,this.errorMessage="",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(b)?b:"aam_ga",this.delimiter=this.v(d)?
d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(c){this.handle(c,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var b,d,c,e,f,h;h=!1;var i=1;if(a===Object(a)&&(b=a.stuff)&&b instanceof Array&&(d=b.length))for(a=0;a<d;a++)if((c=b[a])&&c===Object(c))if(e=c.cn,f=c.cv,e==this.cookieName&&this.v(f)){h=!0;break}if(h){b=f.split(this.delimiter);if("undefined"==typeof window._gaq)window._gaq=
[];c=window._gaq;for(a=0,d=b.length;a<d&&!(h=b[a].split("="),f=h[0],h=h[1],this.v(f)&&this.v(h)&&c.push(["_setCustomVar",i++,f,h,1]),i>this.LIMIT);a++);this.errorMessage=1<i?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;this.dil.api.afterResult(function(b){a.process(b)}).submit();
return"DIL.modules.GA.Stuffer.submit() successful"}catch(b){return this.handle(b,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,b,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};var d={name:"DIL Peer39 Module Error"},c=[],e="";if(this.isSecurePageButNotEnabled(document.location.protocol))e="Module has not been enabled for a secure page",c.push(e),d.message=e,DIL.errorModule.handleError(d);b instanceof
DIL?(this.dil=b,d.partner=this.dil.api.getPartner()):(e="dilInstance is not a valid instance of DIL",c.push(e),d.message=e,DIL.errorModule.handleError(d));"string"!=typeof a||!a.length?(e="aid is not a string or is empty",c.push(e),d.message=e,DIL.errorModule.handleError(d)):this.aid=a;this.errorMessage=c.join("\n")}catch(f){this.handle(f,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"==a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,b=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(d){}finally{a.calledBack=!0,"function"==typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(b,d);this.scriptsSent.push(b);return"Request sent to Peer39"},processData:function(a){var b,d,c,e,f={},h=!1;
this.returnedData.push(a);if(a instanceof Array)for(b=0,d=a.length;b<d;b++)c=a[b].split("="),e=c[0],c=c[1],e&&isFinite(c)&&!isNaN(parseInt(c,10))&&(f[e]instanceof Array||(f[e]=[]),f[e].push(c),h=!0);return{hasSignals:h,signals:f}},constructScript:function(){var a=document.createElement("script"),b=this.optionals,d=b.scriptId,c=b.scriptSrc,b=b.scriptParams;a.id="string"==typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"==typeof c&&c.length?a.src=c:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"==typeof b&&b.length&&(a.src+="?"+b));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};
//4.3
var _scDilObj = s_gi(s_account);
var lDil = DIL.create({
    partner: 'lenovo',
    uuidCookie: {
        name: 'aam_uuid',
        days: 30
    }
});
DIL.modules.siteCatalyst.init(_scDilObj, lDil, {
        names: ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
        iteratedNames: [{
               name: 'eVar',
               maxIndex: 75
        }, {
               name: 'prop',
               maxIndex: 75
        }, {
               name: 'pev',
               maxIndex: 3
        }, {
               name: 'hier',
               maxIndex: 4
        }]
});
var b = lDil.helpers.getCookie("s_vi");
if(b){
	b = b.split("|")[1].split("[")[0];
	lDil.api.aamIdSync({
		dpid: "929",
		dpuuid: b,
		minutesToLive: 20160
	});
};
var c = lDil.helpers.getCookie("s_one_id");
if(c)
{
      lDil.api.aamIdSync({
            dpid: "1170", 
            dpuuid: c, 
            minutesToLive: 20160
      });
};
}

// s_code_lisa.js
// Copyright 1996-2013 Adobe Systems, Inc. All Rights Reserved.
// More info available at http://www.omniture.com
// UPDATED: 16-Dec-2014
var s_fileVer='141216'; 

/* JS info */
try{s_code_lisa_ver=s_jsFileInfo('s_code_lisa');s_clog('s_code_lisa '+s_code_lisa_ver.ver+' '+s_code_lisa_ver.url)}catch(t){}
