var Utils = (function () {

	var sendAjax = function ( options ) {
		return $.ajax( options );
	};

	return {
		sendAjax: sendAjax
	}
})();