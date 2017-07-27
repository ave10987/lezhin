(function ( window, document, $, undefined ) {
	window.Model = function () {
		this.slides = [];
		this.desktopSlides = [];
		this.mobileSlides = [];
		this.options = {};
		this.screenMode = '';
		this.isMobileDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

		this.eSlidesLoaded = new Event( this );
		this.eSlidesUpdate = new Event( this );
		this.eScreenModeChanged = new Event( this );
	};

	Model.prototype.setIsMobileDevice = function () {
		this.isMobileDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	};

	Model.prototype.getIsMobileDevice = function () {
		return this.isMobileDevice;
	};

	Model.prototype.setScreenMode = function ( screenMode ) {
		var isFirst = this.screenMode === '';
		this.screenMode = screenMode;
		this.eScreenModeChanged.emit();
		if( !isFirst ) {
			this.setSlides( 'update' );
		}
	};

	Model.prototype.getScreenMode = function ( screenMode ) {
		return this.screenMode;
	};

	Model.prototype.setMobileSlides = function ( data ) {
		this.mobileSlides = data;
	};

	Model.prototype.setDesktopSlides = function ( data ) {
		this.desktopSlides = data;
	};

	Model.prototype.getMobileSlides = function () {
		return this.mobileSlides;
	};

	Model.prototype.getDesktopSlides = function () {
		return this.desktopSlides;
	};

	Model.prototype.setSlides = function ( status ) {
		this.slides = ( this.screenMode === 'mobile' ) ? this.mobileSlides : this.desktopSlides;
		if( status === 'update' ) {
			this.eSlidesUpdate.emit();
		} else {
			this.eSlidesLoaded.emit();
		}
	};

	Model.prototype.getSlides = function () {
		return this.slides;
	};

})( window, document, jQuery );