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

		// mobile과 desktop 배너 정보를 모두 받은 후 model에 설정
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

})( window, document, $ );