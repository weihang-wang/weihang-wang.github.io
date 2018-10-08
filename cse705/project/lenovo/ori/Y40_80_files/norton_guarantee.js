(function(){
    var n=0,t=setInterval( function() {
        if(n++>30) clearInterval(t);
        if(window._GUARANTEE && _GUARANTEE.Loaded) {
            clearInterval(t);
           _GUARANTEE.Hash = "AqpSECEuOE%2B7%2BllAONnAymgFKTO3E6vIUMxxnr0cZzaW2MPTljwN4SOIBM7uqzl3FLMRDxUHe5B8B2ex%2Bqriag%3D%3D";

                _GUARANTEE.Responsive  = {    Kickers : { widths: [ 768 ], ids: {  } },
                                                                                Seal    : { width :   768,   id:  '_GUARANTEE_SealSpan' } };
                
bs_R.onEvent(window, 'resize', function() { bs_R.Responsive(); } );


                   _GUARANTEE.Callback  = function(flag) {
                     if(flag)
                      {
                                  // Tracking code goes here.  Guarantee signals were VISIBLE
                      }
                     else
                      {
                                 // Tracking code goes here.  Guarantee signals were HIDDEN
                      }
                    };
                   _GUARANTEE.WriteSeal("_GUARANTEE_SealSpan", "GuaranteedSeal");

        }
    }, 500);
})();

