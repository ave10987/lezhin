(function ( window, document, $, undefined ) {
	$( document ).ready( function () {
		var options = {
			containerId: 'lezhin-swiper',
			autoPlay: false,
			infinity: true,
			autoPlayDuration : 1000,
			height: 400
		};

		var model = new Model(),
			swiper = new Swiper( model, options ),
			controller = new Controller( model, swiper );
	});
})( window, document, jQuery );
