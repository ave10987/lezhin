(function ( window, document, $, undefined ) {
    window.Controller = function ( model, view ) {
        // model, view 객체 생성
        this.model = model;
        this.view = view;

        // controller 초기화
        this.init();
    };

    Controller.prototype.init = function () {
        // screenMode 설정
        var screenMode = $( window ).width() > 768 ? 'desktop' : 'mobile',
            // 가져올 banner의 수
            count = 4;

        this.view.eScreenModeChanged.observe( this.screenModeChanged.bind( this ) );
        this.view.eOrientationChanged.observe( this.orientationChanged.bind( this ) );

        // set screen mode
        this.model.setScreenMode( screenMode );

        // get banner data
        this.getBannerData( count );
    };

    Controller.prototype.getBannerData = function ( count ) {
        var that = this;

        // mobile과 desktop 배너 정보를 모두 받은 후 model에 설정
        // !FIXME : parameter로 count를 전달해야 함
        $.when( that.getMobileBanner(), that.getDesktopBaner() ).done( function ( mobileBannerData, desktopBannerData ) {
            that.model.setMobileSlides( mobileBannerData[ 0 ] );
            that.model.setDesktopSlides( desktopBannerData[ 0 ] );
            that.model.setSlides();
        });
    };

    Controller.prototype.getMobileBanner = function ( count ) {
        // ajax 호출
        return window.Utils.sendAjax({
            url: window.location.origin + '/banner?device=mobile&count=' + count
        });
    };

    Controller.prototype.getDesktopBaner = function ( count ) {
        // ajax 호출
        return window.Utils.sendAjax({
            url: window.location.origin + '/banner?device=desktop&count=' + count
        });
    };

    // view에서 screenMode가 변경되었음을 전달받으면 model객체의 screenMode를 설정
    Controller.prototype.screenModeChanged = function ( sender, data ) {
        this.model.setScreenMode( data.screenMode );
    };

    // view에서 orientationchange 이벤트가 발생했음을 전달받으면 model객체의 isMobileDevice값을 설정
    Controller.prototype.orientationChanged = function () {
        this.model.setIsMobileDevice();
    };

})( window, document, $ );