var Utils = (function () {

		// ajax 전송
	var sendAjax = function ( options ) {
			return $.ajax( options );
		},

		// css vendor prerix 적용
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