(function ( window, document, $, undefined ) {
	window.Controller = function ( model, view ) {
		this.model = model;
		this.view = view;

		this.init();
	};

	Controller.prototype.init = function () {
		var screenMode = $( window ).width() > 768 ? 'desktop' : 'mobile',
			count = 4;

		this.view.eScreenModeChanged.attach( this.screenModeChanged.bind( this ) );

		// set screen mode
		this.model.setScreenMode( screenMode );

		// get banner data
		this.getBannerData( screenMode, count );
	};

	Controller.prototype.getBannerData = function ( screenMode, count ) {
		var that = this;

		Utils.sendAjax({
			url: 'http://localhost:8888/banner?device=' + screenMode + '&count=' + count
		}).done( function ( data ) {

			// set banner data
			that.model.setSlides( data, that.view.options );
		}).fail( function ( error ) {
			console.log( error );
		});
	};

	Controller.prototype.screenModeChanged = function ( sender, data ) {
		this.model.setScreenMode( data.screenMode );
		this.getBannerData( data.screenMode );
	};

	$( document ).ready( function () {






		// $( document ).on( 'bannerDataLoaded', function ( e ) {
		// 	var options = {
		// 		autoPlay: false,
		// 		infinity: true,
		// 		height: 400,
		// 		slides: Model.getBannerData()
		// 	},
		// 	swiper = new Swiper( 'lezhin-swiper', options );
		// });

		// $( document ).on( 'reloadBanner', function ( e ) {
		// 	Utils.sendAjax({
		// 		url: 'http://localhost:8888/banner?device=' + screenMode + '&count=2'
		// 	}).done( function ( data ) {
		// 		Store.setBannerData( data );
		// 	}).fail( function ( error ) {
		// 		console.log( error );
		// 	});
		// });

		// $( window ).on ( 'resize', function ( e ) {
		// 	if( $( window ).width() > 768 && screenMode === 'mobile' ) {
		// 		screenMode = 'desktop';
		// 		$( document ).trigger( 'reloadBanner' );
		// 	} else if ( $( window ).width() <= 768 && screenMode === 'desktop' ) {
		// 		screenMode = 'mobile';
		// 		$( document ).trigger( 'reloadBanner' );
		// 	}
		// });
	});
})( window, document, $ );