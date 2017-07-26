(function ( window, document, $, undefined ) {
	$( document ).ready( function () {
		var options = {
			containerId: 'lezhin-swiper',
			autoPlay: false,
			infinity: true,
			autoPlayDuration : 3000
		};

		var model = new Model(),
			swiper = new Swiper( model, options ),
			controller = new Controller( model, swiper );
	});
})( window, document, jQuery );
