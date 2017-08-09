(function ( window, document, $, undefined ) {
	window.Model = function () {
		this.slides = [];
		// desktop용 slide 정보를 저장하는 변수
		this.desktopSlides = [];
		// mobile용 slide 정보를 저장하는 변수
		this.mobileSlides = [];

		// **deprecated
		this.options = {};
		// screenMode를 저장하는 변수
		this.screenMode = '';
		// mobile device인지 판단을 위한 변수
		this.isMobileDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

		// event 객체 생성
		this.eSlidesLoaded = new Event( this );
		this.eSlidesUpdate = new Event( this );
		this.eScreenModeChanged = new Event( this );
	};

	// mobile device를 판단하여 변수에 저장
	Model.prototype.setIsMobileDevice = function () {
		this.isMobileDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	};

	// 현재 mobile device인지 정보를 전달
	Model.prototype.getIsMobileDevice = function () {
		return this.isMobileDevice;
	};

	// mobile screen인지 desktop screen인지 판단하여 변수에 저장
	Model.prototype.setScreenMode = function ( screenMode ) {
		// 처음으로 screenMode를 설정하는지 판단
		var isFirst = this.screenMode === '';
		// 전달받은 screenMode를 저장
		this.screenMode = screenMode;
		// screenMode가 변경되었음을 알림
		this.eScreenModeChanged.notify();
		// 처음으로 screenMode를 설정한것이 아니라면 즉 이미 slide가 로딩이 된 상태라면 slide를 update하도록 전달
		if( !isFirst ) {
			this.setSlides( 'update' );
		}
	};

	// 현재 screenMode를 전달
	Model.prototype.getScreenMode = function ( screenMode ) {
		return this.screenMode;
	};

	// mobile 전용 slide 정보를 설정
	Model.prototype.setMobileSlides = function ( data ) {
		this.mobileSlides = data;
	};

	// desktop 전용 slide 정보를 설정
	Model.prototype.setDesktopSlides = function ( data ) {
		this.desktopSlides = data;
	};

	// mobile 전용 slide 정보를 전달
	Model.prototype.getMobileSlides = function () {
		return this.mobileSlides;
	};

	// desktop 전용 slide 정보를 전달
	Model.prototype.getDesktopSlides = function () {
		return this.desktopSlides;
	};

	// 실제 화면에 보이는 slide 정보를 설정
	Model.prototype.setSlides = function ( status ) {

		// screenMode에 따라 slide값을 변경
		this.slides = ( this.screenMode === 'mobile' ) ? this.mobileSlides : this.desktopSlides;

		// status가 update인 경우 즉 orientationchange이벤트가 발생한 경우는 eSlideUpdate 이벤트를 발생
		if( status === 'update' ) {
			this.eSlidesUpdate.notify();

		// status가 update가 아닌 경우 즉 새로 slide를 로딩한 경우 eSlideLoaded 이벤트를 발생
		} else {
			this.eSlidesLoaded.notify();
		}
	};

	// 현재 화면에 보이는 slide 정보를 전달
	Model.prototype.getSlides = function () {
		return this.slides;
	};

})( window, document, jQuery );