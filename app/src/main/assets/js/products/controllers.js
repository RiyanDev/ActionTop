angular.module('mobsocial.products')
// all products controller
.controller('ProductsController', [
	'$scope', '$state', '$ionicModal', '$ionicLoading', 'Products', 'AuthService', 'APISERVER', function(
	$scope, $state, $ionicModal, $ionicLoading, Products, AuthService, APISERVER) {
		$scope.items = [];
		$scope.times = 0 ;
		$scope.page = 1 ;
		$scope.postsCompleted = false;
		$scope.hideupload = 'hide';
		$scope.picData = 'img/photo.png';
		$scope.katalog = {};
		$scope.base_url = APISERVER.BASE_URL;
		$scope.base_url_image = APISERVER.BASE_URL+'webstorage/produk/';
		$scope.search = '';
		// console.log(localStorage.authlogin);
		
		
		var auth = AuthService.isAuthenticated(); 
		if(auth != false){
			$scope.hideupload = 'show';
		}
		
		$scope.searchFilter = function(){
			$scope.items = [];
			$scope.page = 1 ;
			$scope.times = 0;
			$scope.postsCompleted = false;
			$scope.getPosts();
		}
		

		// load more content function
		$scope.getPosts = function(){
			Products.getPosts($scope.page, $scope.search)
			.success(function (posts) {
				if(posts.kode == "200"){
					$scope.items = $scope.items.concat(posts.data);
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.times = $scope.times + 1;
					$scope.page = $scope.page + 1;
					$scope.postsCompleted = false;
				}else{
					$scope.postsCompleted = true;
				}
			})
			.error(function (error) {
				$scope.items = [];
			});
		}
		// pull to refresh buttons
		$scope.doRefresh = function(){
			$scope.times = 0 ;
			$scope.page = 1 ;
			$scope.items = [];
			$scope.postsCompleted = false;
			$scope.getPosts();
			$scope.$broadcast('scroll.refreshComplete');
		}
		

	}

])
/*   product controller  */
.controller('ProductController', [
	'$rootScope', '$scope', '$stateParams', '$ionicNavBarDelegate', 'Products', 'APISERVER', function(
	$rootScope, $scope, $stateParams, $ionicNavBarDelegate, Products, APISERVER) {	
		var product_id = $stateParams.productId;
		$scope.selected_ = {};
		$scope.items = [];
		$scope.details = true;
		$scope.base_url = APISERVER.BASE_URL;
		$scope.base_url_image = APISERVER.BASE_URL+'webstorage/produk/';
		$scope.baynow = "BUY NOW";
		$scope.titleview = "Detail Product";
		// looping though all data and get particular product

		$rootScope.mainmenu = "noshow";
	  	// $rootScope.backmenu = "show";
	  	$ionicNavBarDelegate.showBackButton(true);
		
		// get all posts // try some function to get a single produt from server
		$scope.getPosts = function(){
			Products.getPostsDetail(product_id)
			.success(function (post) {
				if(post.kode == "200"){
			    	$scope.selected_ = post.data;
			    	
			    	$scope.baynow = $scope.selected_.status == "T" ? $scope.baynow : "PRE ORDER";
			    	$scope.titleview = post.data.nama;
			    }else{

			    }
			})
			.error(function (error) {
				$scope.selected_ = [];
			});
		}
		$scope.getPosts();
		
		$scope.changeRev = function(){
			if($scope.details == true){
				$scope.details = false;
			} else {
				$scope.details = true;
			}
		}
	}

])