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
		this.view.eOrientationChanged.attach( this.orientationChanged.bind( this ) );

		// set screen mode
		this.model.setScreenMode( screenMode );

		// get banner data
		this.getBannerData( count );
	};

	Controller.prototype.getBannerData = function ( count ) {
		var that = this;

		$.when( that.getMobileBanner(), that.getDesktopBaner() ).done( function ( mobileBannerData, desktopBannerData ) {
			that.model.setMobileSlides( mobileBannerData[ 0 ] );
			that.model.setDesktopSlides( desktopBannerData[ 0 ] );
			that.model.setSlides();
		});
	};

	Controller.prototype.getMobileBanner = function ( count ) {
		return Utils.sendAjax({
			url: 'http://localhost:8888/banner?device=mobile&count=' + count
		});
	};

	Controller.prototype.getDesktopBaner = function ( count ) {
		return Utils.sendAjax({
			url: 'http://localhost:8888/banner?device=desktop&count=' + count
		});
	};

	Controller.prototype.screenModeChanged = function ( sender, data ) {
		this.model.setScreenMode( data.screenMode );
	};
	Controller.prototype.orientationChanged = function () {
		this.model.setIsMobileDevice();
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