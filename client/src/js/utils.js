var Utils = (function () {

	var sendAjax = function ( options ) {
			return $.ajax( options );
		},
		setVendorPrefix = function ( attr, val ) {
			var vendor = '-webkit- -moz- -ms- -o-'.split( ' ' ),
				returnObj = {};

			returnObj[ attr ] = val;

			vendor.forEach( function( v, i ) {
				returnObj[ v + attr ] = val;
			});
			return returnObj;
		};

	return {
		sendAjax: sendAjax,
		setVendorPrefix: setVendorPrefix
	}
})();