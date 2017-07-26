(function ( window, document, $, undefined ) {
	window.Swiper = function ( model, options ) {

		this.model = model;
		this.options = options;

		this.eScreenModeChanged = new Event( this );

		// API를 통해 banner 정보를 받아온 후 slidesLoaded handler수행
		this.model.eSlidesLoaded.attach( this.slidesLoaded.bind( this ) );
		this.model.eScreenModeLoaded.attach( this.screenModeLoaded.bind( this ) );
	};

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

		this.$container.addClass( 'swiper-container' );
		this.$container.append( this.$wrapper );

		this.drawSlides();

		// pagination 생성
		this.$pagination = this.createPagination( this.slideData.length );

		if( this.slideData.length > 1 ) {
			// navButton 생성
			this.$navButton = this.createNavButton();
			this.$navButton.css( { 'top': ( this.options.height / 2 ) - ( this.$navButton.height() / 2 ) } );
		}
		// this.$container.css( 'height', this.options.height );
		this.setEvent();


		// TBD : known issue : window resize 발생 후 slide를 새로 생성하는데, touchMoveHandler에서 touchStartX값이 늦게 전달됨

		// this.$container.css( 'display', 'none');
		// var that = this;
		// setTimeout( function () {
		// 	that.$container.css( 'display', 'block');
		// 	that.setEvent();
		// }, 800 );

	};

	Swiper.prototype.screenModeLoaded = function () {
		this.screenMode = this.model.getScreenMode();
	};

	Swiper.prototype.slidesLoaded = function () {

		this.slideData = this.model.getSlides();

		this.initSwiper();
	};

	Swiper.prototype.setContainerHeight = function ( e ) {
		e.data.containerHeight = e.data.containerHeight > $( this ).height() ? e.data.containerHeight : $( this ) .height();
		e.data.$container.height( e.data.containerHeight );
	};

	Swiper.prototype.drawSlides = function () {

		var that = this,
			$slider = $( '<div class="swiper-slider"></div>' ),
			$link = $( '<a href=""></a>'),
			$image = $( '<img src="" alt="">' ),
			slideNumber = 0,
			slides = [];

		// options이 없거나 options.slides가 배열이 아니거나, slides에 값이 없는 경우 return
		if( !this.options || !Array.isArray( this.slideData ) || this.slideData.length === 0 ) {
			return;
		}

		// slide 생성
		if( this.slideData.length === 1 ) {
			$link.append( $image );
			$slider.append( $link );
			this.$wrapper.append( $slider );

			return slides.push( $slider );
		} else {
			for( i = 0; i < 3; i++ ) {
				slideNumber = i === 0 ? this.slideData.length -1 : i - 1;
				$slider = $( '<div class="swiper-slider" data-order="' + i + '" data-transform="' + ( ( i - 1 ) * 100 ) + '"></div>' );
				$link = $( '<a href="' + this.slideData[slideNumber].link + '"></a>');
				$image = $( '<img src="' + this.slideData[slideNumber].image + '" alt="">' );
				$image.one( 'load', that, that.setContainerHeight );
				$slider.css( {
					'transform': 'translate3d( ' + ( 100 * ( i -1 ) ) + '%, 0, 0 )',
					'-webkit-transform': 'translate3d( ' + ( 100 * ( i -1 ) ) + '%, 0, 0 )',
					'-ms-transform': 'translate3d( ' + ( 100 * ( i -1 ) ) + '%, 0, 0 )',
					'-o-transform': 'translate3d( ' + ( 100 * ( i -1 ) ) + '%, 0, 0 )'
				});

				$link.append( $image );
				$slider.append( $link );
				this.$wrapper.append( $slider );

				slides.push( $slider );
			}

			this.$prevSlideElement = slides[ 0 ];
			this.$currentSlideElement = slides[ 1 ];
			this.$nextSlideElement = slides[ 2 ];

			this.setAutoPlay();

			return slides;
		}
	};

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

	Swiper.prototype.createNavButton = function () {
		var $navButton = $( '<button type="button" class="prev"></button>' +
							'<button type="button" class="next"></button>');

		this.$container.append( $navButton );
		return $navButton;
	};

	Swiper.prototype.setAutoPlay = function () {
		var that = this;

		if( this.options.autoPlay ) {
			setInterval( function () {
				that.moveNext();
			}, this.options.autoPlayDuration );
		}
	};

	Swiper.prototype.setPagination = function () {
		if( this.$pagination.find( '.selected' ).index() !== this.currentIndex ) {
			this.$pagination.find( '.selected' ).removeClass( 'selected' );
			this.$pagination.children().eq( this.currentIndex ).addClass( 'selected' );
		}
	};

	Swiper.prototype.setEvent = function () {
		var that = this;

		that.$container.off( 'mousedown touchstart' ).on( 'mousedown touchstart', that, that.touchStartHandler);
		// that.$container.off( 'click', 'a' ).on( 'click touchend', 'a', that, that.preventLink );

		$( window ).off( 'resize' ).on ( 'resize', function ( e ) {
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

		$( window ).off( 'orientationchange' ).on( 'orientationchange', function ( e ) {
			console.log( 'orientationchange' );
		});
	};

	Swiper.prototype.preventLink = function ( e ) {
		console.log( 'preventLink' );
		if( e.data.sliding ) {
			e.preventDefault();
			return;
		}
	};

	Swiper.prototype.touchStartHandler = function ( e ) {
		var that = e.data,
			touch = ( e.type === 'mousedown' ) ? e : e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

		that.sliding = false;

		that.touchStartX = touch.pageX;

		that.$wrapper.css( {
			'transition-timing-function': 'initial',
			'transition-duration': '0s'
		});

		that.$container.off( 'mousemove touchmove' ).on( 'mousemove touchmove', that, that.touchMoveHandler);
		that.$container.off( 'mouseup touchend' ).on( 'mouseup touchend', that, that.touchEndHandler);
	};

	Swiper.prototype.touchMoveHandler = function ( e ) {
		e.preventDefault();
		e.stopPropagation();

		var that = e.data,
			touch = ( e.type === 'mousemove' ) ? e : e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
			$wrapper = {},
			wrapperMoveX = 0,
			wrapperTransform = 0;

		that.sliding = true;

		if( that.touchStartX !== null ) {
			if( ( ( !that.options.infinity && that.currentIndex === 0 ) && that.touchStartX - touch.pageX < 0 ) ||
				( ( !that.options.infinity && that.currentIndex === that.slideData.length - 1 ) && that.touchStartX - touch.pageX > 0 ) ) {
				return;
			} else {
				$wrapper = that.$wrapper;
				wrapperTransform = parseInt( $wrapper.attr( 'data-transform' ), 10 );
				wrapperMoveX = ( ( ( touch.pageX - that.touchStartX ) * 100 / $wrapper.width() ) + wrapperTransform );
				$wrapper.css( {
					'transform': 'translate3d( ' + wrapperMoveX + '%, 0, 0 )',
					'-webkit-transform': 'translate3d( ' + wrapperMoveX + '%, 0, 0 )',
					'-ms-transform': 'translate3d( ' + wrapperMoveX + '%, 0, 0 )',
					'-o-transform': 'translate3d( ' + wrapperMoveX + '%, 0, 0 )'
				});
			}
		}
	};

	Swiper.prototype.touchEndHandler = function ( e ) {
		// e.preventDefault();
		var that = e.data,
			touch = ( e.type === 'mouseup' ) ? e : e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

		that.touchEndX = touch.pageX;
		that.$wrapper.css( {
			'transition-timing-function': 'ease-out',
			'transition-duration': '.5s'
		});

		if( that.touchStartX - that.touchEndX > 50 ) {
			// swipe right to left
			that.moveNext();
		} else if ( that.touchStartX - that.touchEndX < -50 ) {
			// swipe left to right
			that.movePrev();
		} else {
			that.$wrapper.css( {
				'transform': 'translate3d( ' + that.$wrapper.attr( 'data-transform' ) + '%, 0, 0 )',
				'-webkit-transform': 'translate3d( ' + that.$wrapper.attr( 'data-transform' ) + '%, 0, 0 )',
				'-ms-transform': 'translate3d( ' + that.$wrapper.attr( 'data-transform' ) + '%, 0, 0 )',
				'-o-transform': 'translate3d( ' + that.$wrapper.attr( 'data-transform' ) + '%, 0, 0 )'
			});
		}

		if( !that.sliding ) {
			var $target = $( e.target );
			if ( $target.hasClass( 'swiper-bullet') ) {
				// pagination event fire
				that.moveTo( $target.index() );
				console.log( 'moveTo' );
			} else if ( $target.hasClass( 'next' ) || $target.hasClass( 'prev' )) {
				// next, prev event fire
				$target.hasClass( 'next' ) ? that.moveNext() : that.movePrev();
			}
		}

		that.touchStartX = null;
	};

	Swiper.prototype.moveNext = function () {
		var $tempElement = {},
			moveX = parseInt( this.$prevSlideElement.attr('data-transform'), 10 ) + 300;

		if( this.options.infinity || this.currentIndex !== this.slideData.length - 1 ) {

			this.$prevSlideElement.css( {
				'transform': 'translate3d( ' + moveX + '%, 0, 0 )',
				'-webkit-transform': 'translate3d( ' + moveX + '%, 0, 0 )',
				'-ms-transform': 'translate3d( ' + moveX + '%, 0, 0 )',
				'-o-transform': 'translate3d( ' + moveX + '%, 0, 0 )'
			});
			this.$prevSlideElement.attr( 'data-transform', moveX );

			this.currentIndex = ++this.currentIndex % this.slideData.length;
				this.wrapperIndex++;

			$tempElement = this.$prevSlideElement;
			this.$prevSlideElement = this.$currentSlideElement;
			this.$currentSlideElement = this.$nextSlideElement;
			this.$nextSlideElement = $tempElement;
			this.$nextSlideElement.find( 'img' ).attr( 'src', this.slideData[ ( this.currentIndex + 1 ) % this.slideData.length ].image );
			this.$nextSlideElement.find( 'a' ).attr( 'href', this.slideData[ ( this.currentIndex + 1 ) % this.slideData.length ].link );

			this.setPagination();

			this.$wrapper.attr( 'data-transform', this.wrapperIndex * -100 );
			this.$wrapper.css( {
				'transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )' ,
				'-webkit-transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )' ,
				'-ms-transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )' ,
				'-o-transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )'
			});
		}
	};

	Swiper.prototype.movePrev = function () {
		var $tempElement = {},
			prevIndex = 0,
			moveX = parseInt( this.$nextSlideElement.attr('data-transform'), 10 ) - 300;

		if( this.options.infinity || this.currentIndex !== 0 ) {
			this.$nextSlideElement.css( {
				'transform': 'translate3d( ' + moveX + '%, 0, 0 )',
				'-webkit-transform': 'translate3d( ' + moveX + '%, 0, 0 )',
				'-ms-transform': 'translate3d( ' + moveX + '%, 0, 0 )',
				'-o-transform': 'translate3d( ' + moveX + '%, 0, 0 )'
			});
			this.$nextSlideElement.attr( 'data-transform', moveX );

			this.currentIndex = ( this.currentIndex - 1 < 0 ) ? --this.currentIndex + this.slideData.length : this.currentIndex - 1;
			this.wrapperIndex--;

			$tempElement = this.$nextSlideElement;
			this.$nextSlideElement = this.$currentSlideElement;
			this.$currentSlideElement = this.$prevSlideElement;
			this.$prevSlideElement = $tempElement;

			prevIndex = ( this.currentIndex - 1 < 0 ) ? this.currentIndex - 1 + this.slideData.length : this.currentIndex - 1;
			this.$prevSlideElement.find( 'img' ).attr( 'src', this.slideData[ prevIndex ].image );
			this.$prevSlideElement.find( 'a' ).attr( 'href', this.slideData[ prevIndex ].link );

			this.setPagination();

			this.$wrapper.attr( 'data-transform', this.wrapperIndex * -100 );
			this.$wrapper.css( {
				'transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )',
				'-webkit-transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )',
				'-ms-transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )',
				'-o-transform': 'translate3d( ' + ( this.wrapperIndex * -100 ) + '%, 0, 0 )'
			});
		}
	};

	Swiper.prototype.moveTo = function ( index ) {
		var that = this,
			gap = Math.abs( index - that.currentIndex ),
			duration = ( 500 / gap ),
			direction = index - that.currentIndex < 0 ? 'rl' : 'lr',
			i = 0;

		that.$wrapper.css( {
			'transition-timing-function': 'linear',
			'transition-duration': duration + 'ms'
		});
		for( i = 0; i < gap; i++ ) {
			setTimeout( function () {
				that[ direction === 'lr' ? 'moveNext' : 'movePrev' ]();
			}, i * duration );
		}

		setTimeout( function () {
			that.$wrapper.css( {
				'transition-timing-function': 'ease',
				'transition-duration': '.5s'
			});
		}, i * duration );
	};

})(window, document, jQuery);