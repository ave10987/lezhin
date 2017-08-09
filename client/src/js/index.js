(function ( window, document, $, undefined ) {
	$( document ).ready( function () {
		// swiper option 설정
		var options = {
			containerId: 'lezhin-swiper',
			autoPlay: false,
			infinity: true,
			autoPlayDuration : 3000
		};

		// model, swiper, controller 객체 생성
		var model = new Model(),
			swiper = new Swiper( model, options ),
			controller = new Controller( model, swiper );
	});
})( window, document, jQuery );
