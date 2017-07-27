(function ( window, document, $, undefined ) {
	window.Swiper = function ( model, options ) {

		this.model = model;

		// options 기본값 설정
		options.autoPlay = ( options && options.autoPlay ) ? options.autoPlay : false;
		options.infinity = ( options && options.infinity ) ? options.infinity : false;
		options.autoPlayDuration = ( options && options.autoPlayDuration ) ? options.autoPlayDuration : 3000;
		this.options = options;

		// event등록
		this.eScreenModeChanged = new Event( this );
		this.eOrientationChanged = new Event( this );

		// event handler등록
		this.model.eSlidesLoaded.attach( this.slidesLoaded.bind( this ) );
		this.model.eSlidesUpdate.attach( this.slidesUpdate.bind( this ) );
		this.model.eScreenModeChanged.attach( this.screenModeChanged.bind( this ) );
	};

	// screen크기가 변경되어 mobile > desktop, desktop > mobile 크기로 변경되었을 때 수행
	Swiper.prototype.screenModeChanged = function () {
		this.screenMode = this.model.getScreenMode();
	};

	// Ajax를 통해 slide를 구성할 모든 데이터를 받아왔을 때 수행
	Swiper.prototype.slidesLoaded = function () {
		this.slideData = this.model.getSlides();
		this.initSwiper();
	};

	// swiper 초기화
	Swiper.prototype.initSwiper = function () {

		// domObject
		this.$container = $( '#' + this.options.containerId );
		this.$container.empty();

		this.$wrapper = $( '<div class="swiper-wrapper" data-transform="0"></div>' );
		this.$currentSlideElement = {};
		this.$prevSlideElement = {};
		this.$nextSlideElement = {};
		this.$pagination = {};
		this.$navButton = {};

		// swiperData
		this.currentIndex = 0;
		this.wrapperIndex = 0;
		this.touchStartX = null;
		this.touchEndX = 0;
		this.containerHeight = 0;

		// swiper 초기화 단계에서 autoPlay를 위한 interval이 존재하면 clearInterval
		if( !!this.autoPlayInterval ) {
			window.clearInterval( this.autoPlayInterval );
		} else {
			this.autoPlayInterval = {};
		}

		// set swiper container
		this.$container.addClass( 'swiper-container' );
		this.$container.append( this.$wrapper );
		this.setContainerHeight();

		// slide 생성
		this.drawSlides();

		// pagination 생성
		this.$pagination = this.createPagination( this.slideData.length );

		if( this.slideData.length > 1 ) {
			// navButton 생성
			this.$navButton = this.createNavButton();
			this.$navButton.css( { 'top': ( this.options.height / 2 ) - ( this.$navButton.height() / 2 ) } );
		}

		// swiper event 설정
		this.setEvent();
	};

	// screenMode가 변경된 경우 slide 업데이트 ( screen size 변경된 경우 )
	Swiper.prototype.slidesUpdate = function () {
		var that = this;

		this.slideData = this.model.getSlides();

		// slide의 이미지와 링크를 교체 ( desktop -> mobile || mobile -> desktop )
		this.$wrapper.find( '.swiper-slider' ).each( function ( i, v ) {
			var $image = $( v ).find ( 'img' ),
				$link = $( v ).find ( 'a ' );
			$image.attr( {
				'src': ( that.screenMode === 'mobile' ) ? $image.attr( 'data-mobile' ) : $image.attr( 'data-desktop' )
			});
			$link.attr( {
				'href': ( that.screenMode === 'mobile' ) ? $link.attr( 'data-mobile' ) : $link.attr( 'data-desktop' )
			});
		});
	};

	// swiper container height 설정
	Swiper.prototype.setContainerHeight = function () {
		// mobile >  width : height = 1 : 1.075
		// desktop >  width : height = 1 : 0.32
		// www.lezhin.com banner 비율
		if( this.screenMode === 'mobile' ) {
			this.$container.height( ( $( window ).width() * 1.075 ) );
		} else if ( this.screenMode === 'desktop' ) {
			this.$container.height( ( $( window ).width() * 0.32 ) );
		}

	};

	// slide element 설정
	Swiper.prototype.drawSlides = function () {

		var that = this,
			$slider = $( '<div class="swiper-slider"></div>' ),
			$link = $( '<a href=""></a>'),
			$image = $( '<img src="" alt="bannerSlide">' ),
			slideNumber = 0,
			slides = [];

		// options이 없거나 options.slides가 배열이 아니거나, slides에 값이 없는 경우 return
		if( !this.options || !Array.isArray( this.slideData ) || this.slideData.length === 0 ) {
			return;
		}

		// slide 생성
		// banner가 1개밖에 없는 경우
		if( this.slideData.length === 1 ) {

			// image 속성 설정
			$image.attr( {
				'src': this.slideData[ 0 ].image,
				'data-desktop': this.model.getDesktopSlides()[ 0 ].image,
				'data-mobile': this.model.getMobileSlides()[ 0 ].image
			});

			// link 속성 설정
			$link.attr( {
				'href': this.slideData[ 0 ].link,
				'data-desktop': this.getDesktopSlides()[ 0 ].link,
				'data-mobile': this.getMobileSlides()[ 0 ].link
			});
			$link.append( $image );
			$slider.append( $link );
			this.$wrapper.append( $slider );

		} else {

			// banner가 2개 이상인 경우 slide를 3개만 생성
			for( i = 0; i < 3; i++ ) {
				slideNumber = i === 0 ? this.slideData.length -1 : i - 1;
				$slider = $( '<div class="swiper-slider" data-order="' + i + '" data-transform="' + ( ( i - 1 ) * 100 ) + '"></div>' );
				$link = $( '<a href="' + this.slideData[ slideNumber ].link + '"' +
							' data-desktop="' + this.model.getDesktopSlides()[ slideNumber ].link + '"' +
							' data-mobile="' + this.model.getMobileSlides()[ slideNumber ].link + '"></a>');
				$image = $( '<img src="' + this.slideData[ slideNumber ].image + '" alt="bannerSlide"' +
								' data-desktop="' + this.model.getDesktopSlides()[ slideNumber ].image + '"' +
								' data-mobile="' + this.model.getMobileSlides()[ slideNumber ].image + '">' );

				$slider.css( Utils.setVendorPrefix( 'transform', 'translate3d( ' + ( 100 * ( i - 1 ) ) + '%, 0, 0 )' ) );

				$link.append( $image );
				$slider.append( $link );
				this.$wrapper.append( $slider );

				slides.push( $slider );
			}

			// 이전, 현재, 다음 slideElement설정
			this.$prevSlideElement = slides[ 0 ];
			this.$currentSlideElement = slides[ 1 ];
			this.$nextSlideElement = slides[ 2 ];

			// autoPlay 설정
			this.setAutoPlay();
		}
	};

	// pagination 생성
	Swiper.prototype.createPagination = function ( slidesLength ) {

		var $pagination = $( '<div class="swiper-pagination"></div>' ),
			$bullet = $( '<span class="swiper-bullet"></span>' );

		for( i = 0; i < slidesLength; i++ ) {
			$bullet = $( '<span class="swiper-bullet' + ( i === 0 ? ' selected' : '' ) + '"></span>' );
			$pagination.append( $bullet );
		}

		this.$container.append( $pagination );
		return $pagination;
	};

	// navigation button 생성
	Swiper.prototype.createNavButton = function () {

		var $navButton = $( '<button type="button" class="prev"></button>' +
							'<button type="button" class="next"></button>');

		this.$container.append( $navButton );
		return $navButton;
	};

	// autoPlay 설정
	Swiper.prototype.setAutoPlay = function () {
		var that = this;

		if( that.options.autoPlay ) {
			that.autoPlayInterval = setInterval( that.moveNext.bind( that ), this.options.autoPlayDuration );
		}
	};

	// pagenation 갱신
	Swiper.prototype.updatePagination = function () {
		if( this.$pagination.find( '.selected' ).index() !== this.currentIndex ) {
			this.$pagination.find( '.selected' ).removeClass( 'selected' );
			this.$pagination.children().eq( this.currentIndex ).addClass( 'selected' );
		}
	};

	// swiper event 설정
	Swiper.prototype.setEvent = function () {

		var that = this,
			touchstart = that.model.getIsMobileDevice() ? 'touchstart' : 'mousedown';

		// touchstart 또는 mousedown handler설정
		that.$container.off( 'touchstart mousedown' ).on( touchstart, that, that.touchStartHandler);

		// pc환경에서 swipe 수행시 a tag가 click되는 것을 방지
		that.$container.off( 'click', 'a' ).on( 'click', 'a', that, that.preventLink );

		// resize, orientationchange handler 설정
		$( window ).off( 'resize orientationchange' ).on ( 'resize orientationchange', function ( e ) {

			// orientationchange이벤트 발생 시 event 초기화
			if( e.type === 'orientationchange' ) {
				that.eOrientationChanged.emit();
				that.setEvent();
			}

			// swiper container 높이 다시 계산
			that.setContainerHeight();

			// screenMode 감지
			if( $( window ).width() > 768 && that.screenMode === 'mobile' ) {
				that.eScreenModeChanged.emit( {
					screenMode: 'desktop'
				});
			} else if ( $( window ).width() <= 768 && that.screenMode === 'desktop' ) {
				that.eScreenModeChanged.emit( {
					screenMode: 'mobile'
				});
			}
		});
	};

	// swipe animation 동작 중 link 이동 방지
	Swiper.prototype.preventLink = function ( e ) {
		if( e.data.sliding ) {
			e.preventDefault();
			return;
		}
	};

	// touchstart || mousedown handler
	Swiper.prototype.touchStartHandler = function ( e ) {
		var that = e.data,
			touch = ( e.type === 'mousedown' ) ? e : e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
			touchmove = that.model.getIsMobileDevice() ? 'touchmove' : 'mousemove',
			touchend = that.model.getIsMobileDevice() ? 'touchend' : 'mouseup';

		// mouse event의 경우 drag이벤트와 중복되어 이미지가 선택되는 것을 방지
		if( e.type === 'mousedown' ) {
			e.preventDefault();
		}

		// autoPlay 도중 event발생 시 autoPlay 중지
		// touchEnd에서 재설정
		if( that.options.autoPlay && !!that.autoPlayInterval ) {
			window.clearInterval( that.autoPlayInterval );
		}

		// swipe상태 아님 설정
		that.sliding = false;

		// touchstart x position 설정
		that.touchStartX = touch.pageX;

		// swipe 동작을 위한 wrapper css 일시적 변경
		that.$wrapper.css( {
			'transition-timing-function': 'initial',
			'transition-duration': '0s'
		});

		// move, end event handler설정
		that.$container.off( 'touchmove mousemove' ).on( touchmove, that, that.touchMoveHandler);
		that.$container.off( 'touchend mouseup' ).on( touchend, that, that.touchEndHandler);
	};

	// touchmove || mousemove handler
	Swiper.prototype.touchMoveHandler = function ( e ) {
		e.preventDefault();
		e.stopPropagation();

		var that = e.data,
			touch = ( e.type === 'mousemove' ) ? e : e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
			$wrapper = {},
			wrapperMoveX = 0,
			wrapperTransform = 0;

		// touchstart 발생 후 move 동작은 swipe상태라고 판단
		that.sliding = true;

		if( that.touchStartX !== null ) {
			// banner가 1개밖에 없는 경우 swipe방지
			// infinity설정이 off인 상태에서 가장 처음 또는 가장 마지막 페이지인 경우 swipe방지
			if( that.slideData.length < 2|| ( ( !that.options.infinity && that.currentIndex === 0 ) && that.touchStartX - touch.pageX < 0 ) ||
				( ( !that.options.infinity && that.currentIndex === that.slideData.length - 1 ) && that.touchStartX - touch.pageX > 0 ) ) {
				return;
			} else {

				// swipe
				$wrapper = that.$wrapper;
				wrapperTransform = parseInt( $wrapper.attr( 'data-transform' ), 10 );
				wrapperMoveX = ( ( ( touch.pageX - that.touchStartX ) * 100 / $wrapper.width() ) + wrapperTransform );
				$wrapper.css( Utils.setVendorPrefix( 'transform', 'translate3d( ' + wrapperMoveX + '%, 0, 0 )' ) );
			}
		}
	};

	// touchend || mouseup handler
	Swiper.prototype.touchEndHandler = function ( e ) {
		var that = e.data,
			touch = ( e.type === 'mouseup' ) ? e : e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
			throttle = 50,
			$target = $( e.target );

		// swipe상태에서 touchend 기본 동작 방지
		if( that.sliding ) {
			e.preventDefault();
		}

		that.touchEndX = touch.pageX;

		// wrapper transition 속성 복구
		that.$wrapper.css( {
			'transition-timing-function': 'ease-out',
			'transition-duration': '.3s'
		});

		// banner이미지가 2개 이상인 경우
		if( that.slideData.length > 2 ) {

			// swipe거리가 throttle보다 크면 swipe동작으로 인식
			if( that.touchStartX - that.touchEndX > throttle ) {

				// swipe right to left
				that.moveNext();
			} else if ( that.touchStartX - that.touchEndX < -throttle ) {

				// swipe left to right
				that.movePrev();
			} else {

				// swipe동작으로 인식하기에 충분하지 않은 거리를 움직였다면 slide 원래 위치로 복구
				that.$wrapper.css( Utils.setVendorPrefix( 'transform', 'translate3d( ' + that.$wrapper.attr( 'data-transform' ) + '%, 0, 0 )' ) );
			}
		}

		// swipe동작이 아닌 touchend가 발생한 경우
		if( !that.sliding ) {

			// target이 pagination 버튼인 경우
			if ( $target.hasClass( 'swiper-bullet') ) {

				// pagination event fire
				that.moveTo( $target.index() );

			// target이 navigation 버튼인 경우
			} else if ( $target.hasClass( 'next' ) || $target.hasClass( 'prev' )) {

				// next, prev event fire
				$target.hasClass( 'next' ) ? that.moveNext() : that.movePrev();
			}
		}

		// touchstart x position 초기화
		that.touchStartX = null;

		// autoPlay 정상화
		if( that.options.autoPlay ) {
			that.setAutoPlay();
		}
	};

	// slide next
	Swiper.prototype.moveNext = function () {
		var $tempElement = {},
			nextIndex = 0,
			moveX = parseInt( this.$prevSlideElement.attr( 'data-transform' ), 10 ) + 300;

		// infinity 설정이 true이거나
		// infinity 설정이 false이지만 마지막 slide가 아닌 경우 move next가능
		if( this.options.infinity || this.currentIndex !== this.slideData.length - 1 ) {

			// prevSlide 이동
			this.$prevSlideElement.css( Utils.setVendorPrefix( 'transform', 'translate3d( ' + moveX + '%, 0, 0 )' ) );
			this.$prevSlideElement.attr( 'data-transform', moveX );

			// index 변경
			this.currentIndex = ++this.currentIndex % this.slideData.length;
			nextIndex = ( this.currentIndex + 1 ) % this.slideData.length
			this.wrapperIndex++;

			// prev, current, next element변경
			$tempElement = this.$prevSlideElement;
			this.$prevSlideElement = this.$currentSlideElement;
			this.$currentSlideElement = this.$nextSlideElement;
			this.$nextSlideElement = $tempElement;

			// slide
			this.move( this.$nextSlideElement, nextIndex );
		}
	};

	// slide prev
	Swiper.prototype.movePrev = function () {
		var $tempElement = {},
			prevIndex = 0,
			moveX = parseInt( this.$nextSlideElement.attr('data-transform'), 10 ) - 300;

		// infinity 설정이 true이거나
		// infinity 설정이 false이지만 첫번째 slide가 아닌 경우 move prev가능
		if( this.options.infinity || this.currentIndex !== 0 ) {

			// nextSlide 이동
			this.$nextSlideElement.css( Utils.setVendorPrefix( 'transform', 'translate3d( ' + moveX + '%, 0, 0 )' ) );
			this.$nextSlideElement.attr( 'data-transform', moveX );

			// index 변경
			this.currentIndex = ( this.currentIndex - 1 < 0 ) ? --this.currentIndex + this.slideData.length : this.currentIndex - 1;
			prevIndex = ( this.currentIndex - 1 < 0 ) ? this.currentIndex - 1 + this.slideData.length : this.currentIndex - 1;
			this.wrapperIndex--;

			// prev, current, next element 변경
			$tempElement = this.$nextSlideElement;
			this.$nextSlideElement = this.$currentSlideElement;
			this.$currentSlideElement = this.$prevSlideElement;
			this.$prevSlideElement = $tempElement;

			// slide
			this.move( this.$prevSlideElement, prevIndex);
		}
	};

	// slide ( moveNext, movePrev 공통 )
	Swiper.prototype.move = function ( $element, index ) {

		// $element = moveNext인 경우 nextSlide, movePrev인 경우 prevSlide
		// img, a 속성 변경
		$element.find( 'img' ).attr( {
			'src': this.slideData[ index ].image,
			'data-desktop': this.model.getDesktopSlides()[ index ].image,
			'data-mobile': this.model.getMobileSlides()[ index ].image
		});
		$element.find( 'a' ).attr( {
			'href': this.slideData[ index ].link,
			'data-desktop': this.model.getDesktopSlides()[ index ].link,
			'data-mobile': this.model.getMobileSlides()[ index ].link
		});

		// pagination update
		this.updatePagination();

		// wrapper translate animation
		this.$wrapper.attr( 'data-transform', this.wrapperIndex * -100 );
		this.$wrapper.css( Utils.setVendorPrefix( 'transform', 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )' ) );
	};

	// 특정 index로 이동하는 경우
	Swiper.prototype.moveTo = function ( index ) {
		var that = this,
			gap = Math.abs( index - that.currentIndex ),
			duration = ( 300 / gap ),
			// 이동하려하는 index가 현재 index보다 작은 경우 right > light 이동
			// 이동하려하는 index가 현재 index보다 큰 경우 left > right 이동
			direction = index - that.currentIndex < 0 ? 'rl' : 'lr',
			i = 0;

		// 이동을 위한 wrapper transition 설정 변경
		that.$wrapper.css( {
			'transition-timing-function': 'linear',
			'transition-duration': duration + 'ms'
		});

		// 이동 거리만큼 시간차를 두고 moveNext또는 movePrev 수행
		for( i = 0; i < gap; i++ ) {
			setTimeout( function () {
				that[ direction === 'lr' ? 'moveNext' : 'movePrev' ]();
			}, i * duration );
		}

		// 모든 이동이 끝난 후 wrapper transition 속성 복구
		setTimeout( function () {
			that.$wrapper.css( {
				'transition-timing-function': 'ease',
				'transition-duration': '.3s'
			});
		}, i * duration );
	};

})(window, document, jQuery);