var Store = (function () {
	var bannerData = {},
		setBannerData = function ( data ) {
			bannerData = data;
		},
		getBannerData = function () {
			return bannerData;
		};

	return {
		setBannerData: setBannerData,
		getBannerData: getBannerData
	}
})();