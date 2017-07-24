(function ( window, document, $, undefined ) {
	$( document ).ready( function () {

		var screenMode = $( window ).width() > 768 ? 'desktop' : 'mobile';

		Utils.sendAjax({
			url: 'http://localhost:8888/banner?device=' + screenMode + '&count=2'
		}).done( function ( data ) {
			Store.setBannerData( data );
			$( document ).trigger( 'bannerDataLoaded' );
		}).fail( function ( error ) {
			console.log( error );
		});


		$( document ).on( 'bannerDataLoaded', function ( e ) {
			var options = {
				autoPlay: false,
				infinity: true,
				height: 400,
				slides: Store.getBannerData()
			},
			swiper = new Swiper( 'lezhin-swiper', options );
		});

		$( document ).on( 'reloadBanner', function ( e ) {
			Utils.sendAjax({
				url: 'http://localhost:8888/banner?device=' + screenMode + '&count=2'
			}).done( function ( data ) {
				Store.setBannerData( data );
			}).fail( function ( error ) {
				console.log( error );
			});
		});

		$( window ).on ( 'resize', function ( e ) {
			if( $( window ).width() > 768 && screenMode === 'mobile' ) {
				screenMode = 'desktop';
				$( document ).trigger( 'reloadBanner' );
			} else if ( $( window ).width() <= 768 && screenMode === 'desktop' ) {
				screenMode = 'mobile';
				$( document ).trigger( 'reloadBanner' );
			}
		});
	});
})( window, document, $ );