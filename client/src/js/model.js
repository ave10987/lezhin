(function ( window, document, $, undefined ) {
	window.Model = function () {
		this.slides = [];
		this.options = {};
		this.screenMode = '';

		this.eSlidesLoaded = new Event( this );
		this.eScreenModeLoaded = new Event( this );
	};

	Model.prototype.setScreenMode = function ( screenMode ) {
		this.screenMode = screenMode;
		this.eScreenModeLoaded.emit();
	};

	Model.prototype.getScreenMode = function ( screenMode ) {
		return this.screenMode;
	};

	Model.prototype.setSlides = function ( data, options ) {

		// 전달된 options값 validation check
		options.height = ( options && options.height ) ? options.height : 'auto';
		options.autoPlay = ( options && options.autoPlay ) ? options.autoPlay : false;
		options.infinity = ( options && options.infinity ) ? options.infinity : false;
		options.autoPlayDuration = ( options && options.autoPlayDuration ) ? options.autoPlayDuration : 3000;

		this.slides = data;
		this.options = options;
		this.eSlidesLoaded.emit();
	};

	Model.prototype.getSlides = function () {
		return this.slides;
	};
	Model.prototype.getOptions = function () {
		return this.options;
	};
})( window, document, jQuery );