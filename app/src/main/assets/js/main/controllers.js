// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('YourApp', ['ionic', 'ionic-modal-select', 'ionic-datepicker', 'ngSanitize', 'ngCordova','ngIOS9UIWebViewPatch','mobsocial.products','pdf']);
// not necessary for a web based app // needed for cordova/ phonegap application
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});
//app run getting device id
app.run(function ($rootScope, myPushNotification, PopupSplash) {
	// app device ready
	document.addEventListener("deviceready", function(){
		myPushNotification.registerPush();
		if(!localStorage.device_token_syt || localStorage.device_token_syt == '-1'){
			myPushNotification.registerPush();
		}
		
		
	});

	$rootScope.get_image_splash = function () {
		PopupSplash.getData()
		.success(function(ret){
			
			if(ret.kode == "200"){
				localStorage.image_splash = ret.data.image;
			}
		}).error(function(){

		});
	}
		
   $rootScope.get_device_token = function () {
      if(localStorage.device_token_syt) {
         return localStorage.device_token_syt;
      } else {
         return '-1';
      }
   }
   $rootScope.set_device_token = function (token) {
      localStorage.device_token_syt = token;
      return localStorage.device_token_syt;
   }
   $rootScope.get_image_splash();
});
//myservice device registration id to localstorage
app.service('myService', ['$http', function($http) {
   this.registerID = function(regID, platform) {
   		//alert(regID);
		localStorage.device_token_syt = regID;
   }
}]);

// config to disable default ionic navbar back button text and setting a new icon
// logo in back button can be replaced from /templates/sidebar-menu.html file
app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back').previousTitleText(false);
})

// angular.module('starter')
app.directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
})

// intro controller //
app.controller('IntroCtrl', ['$rootScope','$scope', '$state', '$ionicSlideBoxDelegate', '$cordovaGeolocation', '$ionicSideMenuDelegate', '$ionicHistory', 'AuthService', function($rootScope, $scope, $state, $ionicSlideBoxDelegate, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicHistory, AuthService) {



  	$rootScope.showmenu = "noshow";
  	$rootScope.showstockist = "hide";
  	//$scope.profil.stockist = '';
  	$scope.profil = {};
	// localStorage.lat = 0;
	// localStorage.long = 0;

	var auth = AuthService.isAuthenticated();
	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.profil = authlogin;
		if($scope.profil.stockist != ''){
			$rootScope.showstockist = "show";
		}
	}else{
		$ionicHistory.currentView($ionicHistory.backView());
		$state.go('app.login', {location: 'replace'});
	}


	

	// Called to navigate to the main app
	$scope.next = function() {
	$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
	$ionicSlideBoxDelegate.previous();
	};

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
	$scope.slideIndex = index;
	};
	// discard and move to homepage
	$scope.discardIntroPage = function(){
		$state.go('app.login');
	}
	console.log($scope.profil.stockist);
}])
/* main controller function */
app.controller('MainCtrl', ['$rootScope', '$scope', '$state', '$ionicSideMenuDelegate', '$ionicHistory', '$cordovaGeolocation', 'AuthService', function($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicHistory, $cordovaGeolocation, AuthService) {

  	$rootScope.showmenu = "noshow";
  	$rootScope.showstockist = "hide";
  	localStorage.lat = 0;
	localStorage.long = 0;
	$rootScope.image_splash = localStorage.image_splash;
	if($rootScope.image_splash == undefined){
		
		$scope.get_image_splash();
		$rootScope.image_splash = localStorage.image_splash;
	}
	// console.log($rootScope.image_splash);
	
	

  	var auth = AuthService.isAuthenticated();
	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.profil = authlogin;
		if($scope.profil.stockist != ''){
			$rootScope.showstockist = "show";
		}
	}


	var posOptions = {timeout: 10000, enableHighAccuracy: false};
	$cordovaGeolocation
	.getCurrentPosition(posOptions)
	.then(function (position) {
		  var lat  = position.coords.latitude;
		  var long = position.coords.longitude;
		  
		  localStorage.lat = lat;
		  localStorage.long = long;
	}, function(err) {
	  // error
	});


	var watchOptions = {
	timeout : 3000,
	enableHighAccuracy: false // may cause errors if true
	};

	var watch = $cordovaGeolocation.watchPosition(watchOptions);
	watch.then(
	null,
	function(err) {
	  // error
	},
	function(position) {
	  var lat  = position.coords.latitude;
	  var long = position.coords.longitude;
	  if(localStorage.lat == 0 && localStorage.long == 0){
	  	localStorage.lat = lat;
	  	localStorage.long = long;
	  }

	});


	watch.clearWatch();

	$scope.goLogOut = function() {
		$rootScope.showmenu = "noshow";
		localStorage.authlogin = "-1";
        localStorage = false;
  		AuthService.logout();
    	// $state.transitionTo('app.login');
    	$ionicHistory.clearCache();
        $ionicHistory.clearHistory();

    	// $window.location.reload(true)
    	$ionicHistory.currentView($ionicHistory.backView());
		$state.go('app.mainmenu', {location: 'replace'});

    	// $state.go('app.login',{}, {reload : true});
  	};

  	// Toggle left function for app sidebar
  	$scope.toggleLeft = function() {
    	$ionicSideMenuDelegate.toggleLeft();
  	};
  	// go back to previous page
  	$scope.goBackOne = function(){
		$ionicHistory.goBack();
	}
	// sharing plugin
	$scope.shareMain = function(){
		var title = "Download Smove For Android";
		var url = "https://play.google.com/store/apps/details?id=com.myspecialgames.swipe";
		window.plugins.socialsharing.share(title, null, null, url)
	}
	$scope.shareArticle = function(title,url){
		window.plugins.socialsharing.share(title, null, null, url)
	}
	$scope.openLinkArticle = function(url){
		window.open(url, '_system');
	}
}])

// intro controller //
app.controller('SplashCtrl', ['$rootScope','$scope', '$state', '$ionicSlideBoxDelegate', '$cordovaGeolocation', '$ionicSideMenuDelegate', '$ionicHistory', '$ionicModal', 'AuthService', function($rootScope, $scope, $state, $ionicSlideBoxDelegate, $cordovaGeolocation, $ionicSideMenuDelegate, $ionicHistory, $ionicModal, AuthService) {

  	$rootScope.showmenu = "noshow";
  	$rootScope.showstockist = "hide";
  	//$scope.profil.stockist = '';
  	$scope.profil = {};
	

	var auth = AuthService.isAuthenticated();
	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.profil = authlogin;
		if($scope.profil.stockist != ''){
			$rootScope.showstockist = "show";
		}
		
	}

	// setTimeout(function(){ 
	// 	$ionicHistory.currentView($ionicHistory.backView());
	// 	$state.go('app.mainmenu', {location: 'replace'});
	// }, 3000);
	
}])

// intro controller //
app.controller('MainmenuCtrl', ['$rootScope','$scope', '$state', '$ionicViewService',  '$ionicHistory', '$ionicModal','$ionicSlideBoxDelegate', 'Hobbi','AuthService', 'Halaman','Feeds','globalFactory','APISERVER', function($rootScope, $scope, $state, $ionicViewService, $ionicHistory, $ionicModal, $ionicSlideBoxDelegate, Hobbi, AuthService, Halaman, Feeds, globalFactory, APISERVER ) {

  	$rootScope.showmenu = "noshow";
  	$rootScope.showstockist = "hide";
  	$scope.hobbiOptions = [];
  	$scope.selectedOption = {};
  	$scope.dataSlide = [];
  	$scope.produk = [];
  	$scope.profil = {};
  	$scope.base_url_image = APISERVER.BASE_URL+'webstorage/produk/';

	$ionicViewService.clearHistory();	

	$scope.closeModal = function() {
	 	$scope.modal.hide();
	};

	$scope.showModalHobbi = function()
	{
		Hobbi.getHobbi()
		.success(function (posts) {
			if(posts.payload == "success"){
				$scope.hobbiOptions = posts.data;
				$scope.selectedOption = $scope.hobbiOptions[0];
				
			}
		})
		.error(function (error) {
			$scope.hobbiOptions = [];
		});

	}



	$scope.loadFeed = function() {
		// Feeds.getCoba();
   //    var feed = new google.feeds.Feed(Feeds.feed);
   //    feed.setNumEntries(6);
   //    var count = 1;
   //    feed.load(function(result) {
   //    	// console.log(result.feed.entries);
   //      if (!result.error) {
   //        	$scope.news = result.feed.entries;
   //        	log = [];
   //        	angular.forEach(result.feed.entries, function(value, key) {
			//   //console.log(key);
			//   img = globalFactory.getPostImageFeed(value.content);
			//   var arrlink = value.link.split("/");
			//   // console.log(arrlink[4]);
			//   $scope.news[key].image = img;
			//   $scope.news[key].link = arrlink[4];
			// }, log);
			// console.log($scope.news);
			// $scope.$apply();
			// $ionicSlideBoxDelegate.update();
   //      }
   //    });
    }

    


	$scope.getProduk = function(){
		Halaman.getProduk("1")
		.success(function (posts) {
			if(posts.kode == "200"){
				
				// console.log(posts.data);
				$scope.produk = posts.data;
				$ionicSlideBoxDelegate.update();
			}
		})
		.error(function (error) {
			
		});
	}

	$scope.Slider = function(){
		// $scope.dataSlide = [];
		Halaman.getSlide()
		.success(function (resp) {
			if(resp.kode == "200"){
				$scope.dataSlide = resp.data;
				$ionicSlideBoxDelegate.update();
			}
		})
		.error(function (error) {
				
		});
	}

	$scope.saveHobbi = function(){
		var id = $scope.profil.objectId;
		Hobbi.saveHobbi($scope.profil.objectId, $scope.selectedOption)
		.success(function (posts) {
			$scope.closeModal();
		})
		.error(function (error) {
				$scope.closeModal();
		});
	}

	$scope.changeOptionSelected = function(data)
	{
		$scope.selectedOption = data;
	}

	var auth = AuthService.isAuthenticated();
	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.profil = authlogin;
		if($scope.profil.stockist != ''){
			$rootScope.showstockist = "show";
		}
		// if($scope.profil.hobbi == null)
		// 	$scope.showModalHobbi();

	}else{
		// $ionicHistory.currentView($ionicHistory.backView());
		// $state.go('app.login', {location: 'replace'});
	}


	$scope.Slider();
	$scope.getProduk();
	$scope.loadFeed();
	
	
}])
// login page of app //
app.controller('LoginCtrl', ['$rootScope', '$state','$scope', '$ionicLoading', '$ionicHistory', 'AuthService', function($rootScope, $state, $scope, $ionicLoading, $ionicHistory, AuthService) {

	$scope.login = {};
	$rootScope.showstockist = "hide";

	var auth = AuthService.isAuthenticated();

	if(auth != false){
			$rootScope.showmenu = "show";
			$ionicHistory.currentView($ionicHistory.backView());
			$state.go('app.mainmenu', {location: 'replace'});
  	}
  	// console.log($ionicHistory);
  	// console.log($ionicHistory.currentView());


  	// $scope.login.token = localStorage.device_token_syt;
  	// $scope.login.lat = localStorage.lat;
  	// $scope.login.long = localStorage.long;
  	
	$scope.doLogin = function(){
		$ionicLoading.show({template: 'Login...'});
		
		AuthService.login($scope.login)
		.success(function(suc){
			if(suc.payload.error != "invalid login parameters"){
				$ionicLoading.show({template: 'Login success', duration:500});
				localStorage.authlogin = JSON.stringify(suc.payload.user);
        
				localStorage.tokepapp = suc.payload.token;
        		localStorage.tokenstu = suc.payload.token_stu;

				$rootScope.showmenu = "show";
				if(suc.payload.user.stockist != ''){
					$rootScope.showstockist = "show";
				}
				$ionicHistory.currentView($ionicHistory.backView());
				//console.log($ionicHistory.backView());
				$state.go('app.mainmenu',{}, {'reload':true});


			}else{
				$ionicLoading.show({template: 'Login failed', duration:500});
				localStorage.authlogin = false;
				$state.go('app.login');
			}

		})
		.error(function(err){
			// alert(JSON.stringify(err));
			$ionicLoading.show({template: 'Login error', duration:500});
			localStorage.authlogin = false;
			$state.go('app.login');
		});


	}

	// add your login logic here
	// $scope.doLogin = function(){
	// 	$state.go('app.features');
	// }
}])
// Sign up page of app //
app.controller('SignUpCtrl', ['$state','$scope', function($state, $scope) {
	// sign up logic here
	$scope.doRegister = function(){
		$state.go('app.features');
	}
}])
// Forgot password page of app //
app.controller('ForgotCtrl', ['$scope', function($scope) {
	// forgot password
}])
// Forgot password page of app //
app.controller('GalleryCtrl', ['$scope', 'Photos', '$ionicModal', function($scope, Photos, $ionicModal) {

	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	$scope.numPosts = 100;



	// load more content function
	$scope.getPosts = function(){
		var feed = new google.feeds.Feed(Photos.feed);
		feed.setNumEntries($scope.numPosts);
		var count = 1;
		feed.load(function(result) {
			// console.log(result.feed.entries);
			if (!result.error) {
			  	$scope.items = result.feed.entries;
			  	log = [];
			  	angular.forEach(result.feed.entries, function(value, key) {
				  // console.log(value.mediaGroups[0].contents[0].url);
				  //value.link = value.link.replace("watch?v=", "embed/");
				  $scope.items[key] =
				  	{
					    "_id": 1,
						 "title": value.title,
					    "image": value.mediaGroups[0].contents[0].url,
						 "image_full": value.mediaGroups[0].contents[0].url
					};

				}, log);
				// console.log($scope.items);
				$scope.$apply();
				console.log($scope.items);
			}
		});

		// Photos.getPosts()
		// .success(function (posts) {
		// 	$scope.items = $scope.items.concat(posts);
		// 	$scope.$broadcast('scroll.infiniteScrollComplete');
		// 	$scope.times = $scope.times + 1;
		// 	if($scope.times >= 4) {
		// 		$scope.postsCompleted = true;
		// 	}
		// })
		// .error(function (error) {
		// 	$scope.items = [];
		// });
	}
	$scope.getPosts();
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
	// modal to show image full screen
   $ionicModal.fromTemplateUrl('templates/image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function (modal) {
      $scope.modal = modal;
   });
   $scope.openModal = function () {
		$scope.showNav = true;
      $scope.modal.show();
   };

   $scope.closeModal = function () {
      $scope.modal.hide();
   };
	// show image in popup
   $scope.showImage = function (index) {
		$scope.imageIndex = index;
      $scope.imageSrc = $scope.items[index].image_full;
      $scope.openModal();
   }
	// image navigation // swiping and buttons will also work here
	$scope.imageNavigate = function(dir){
		if(dir == 'right'){
			$scope.imageIndex = $scope.imageIndex + 1;
		} else {
			$scope.imageIndex = $scope.imageIndex - 1;
		}
		//alert(dir);
		if($scope.items[$scope.imageIndex] === undefined){
			$scope.closeModal();
		} else {
			$scope.imageSrc = $scope.items[$scope.imageIndex].image_full;
		}
	}
	// cleaning modal
	$scope.$on('$stateChangeStart', function(){
	  $scope.modal.remove();
	});
}])
/*  Videos controller  */
app.controller('VideosCtrl', ['$scope', 'VideoData', '$sce', function($scope, VideoData, $sce) {
	$scope.items = {};//VideoData.items;
	$scope.numPosts = 50;

	$scope.loadVideo = function()
	{

		var feed = new google.feeds.Feed(VideoData.feed);
		feed.setNumEntries($scope.numPosts);
		var count = 1;
		feed.load(function(result) {
			// console.log(result.feed.entries);
			if (!result.error) {
			  	$scope.items = result.feed.entries;
			  	log = [];
			  	angular.forEach(result.feed.entries, function(value, key) {
				  // console.log(value);
				  value.link = value.link.replace("watch?v=", "embed/");

				}, log);
				// console.log($scope.items);
				$scope.$apply();
			}
		});

	}

	$scope.loadVideo();

	// to work embed in angularjs pages
	$scope.videoEmbed = function(video){
		return $sce.trustAsResourceUrl(video);
	}
}])
/* Blog controller */
app.controller('BlogCtrl', ['$scope', 'Blog', function($scope, Blog) {

	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Blog.getPosts()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.times = $scope.times + 1;
			if($scope.times >= 4) {
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
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])
/*  Profile page template */
app.controller('ProfileCtrl', ['$scope', '$cordovaCamera', '$ionicLoading', '$cordovaFileTransfer', '$ionicModal', 'APISERVER', function($scope, $cordovaCamera, $ionicLoading, $cordovaFileTransfer, $ionicModal, APISERVER) {
	// just demo profile page
	authlogin = JSON.parse(localStorage.authlogin);
	$scope.profil = authlogin;
	$scope.hideupload = "hide";

	$ionicModal.fromTemplateUrl('foto-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal_foto = modal;
	});

	$scope.openModalFoto = function() {
		$scope.modal_foto.show();
		$scope.picData = $scope.profil.avatar;
		$scope.hideupload = "hide";


	};
	$scope.closeModal = function() {
	 	$scope.modal_foto.hide();
	};

	document.addEventListener("deviceready", function () {
	    $scope.takePicture = function() {
		  var options = {
	        quality: 50,
	        destinationType: Camera.DestinationType.FILE_URL,
	        sourceType: Camera.PictureSourceType.CAMERA
	      };
		  $cordovaCamera.getPicture(options).then(
			function(imageData) {
				$scope.picData = imageData;
				$scope.hideupload = "show";
				// $localstorage.set('fotoUp', imageData);
				localStorage.fotoUp = imageData;
				$ionicLoading.show({template: 'Proses...', duration:500});
			},
			function(err){
				$ionicLoading.show({template: 'Error try again', duration:500});
				})
		  }

		  $scope.selectPicture = function() {
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			};
			// $ionicLoading.show({template: 'get ready to take foto from folder...', duration:500});
			$cordovaCamera.getPicture(options).then(
				function(imageURI) {
					window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
						$scope.picData = fileEntry.nativeURL;

						var image = document.getElementById('edit-profile-image');
						image.src = fileEntry.nativeURL;
		  			});
		  			$scope.hideupload = "show";
					// $ionicLoading.show({template: 'Foto acquisita...', duration:500});
				},
				function(err){
					// $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
				}
			)
		};

	    $scope.uploadfoto = function() {

			var fileURL = $scope.picData;
			// alert(JSON.stringify(fileURL));
			var options = new FileUploadOptions();
			options.fileKey = "file";
			options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
			options.mimeType = "image/jpeg";
			options.chunkedMode = false;

			// alert(JSON.stringify(options));
			var params = {};
			params.value1 = $scope.profil.objectId;
	        // params.value2 = "katalog";

			options.params = params;

			$cordovaFileTransfer.upload(APISERVER.URL + "/upload/profil", fileURL, options).then(function(result) {
	            // alert("SUCCESS: " + JSON.stringify(result.response));
	            $scope.profil.avatar = result.response;
	            $scope.closeModal();

	            localStorage.authlogin = JSON.stringify($scope.profil);
	        }, function(err) {
	            // alert("ERROR: " + JSON.stringify(err));
	        }, function (progress) {
	            $ionicLoading.show({template: 'Proses upload...', duration:500});
	        });


	    }
	});

}])

/*  User Profile page template */
app.controller('UserCtrl', ['$scope', '$state', '$ionicLoading', 'ProfilFriends', function($scope, $state, $ionicLoading, ProfilFriends) {

	$scope.profil = {};
	$ionicLoading.show({template: 'loading data ...', duration:500});
	var iduser = $state.params.link;

	ProfilFriends.getData(iduser)
		.success(function(suc){
			//console.log(suc.data);

			if(suc.payload != "failed"){
				$scope.profil = suc.payload;

			}else{
				$ionicLoading.show({template: 'loading failed', duration:500});

			}

		})
		.error(function(err){

			$ionicLoading.show({template: 'loading failed', duration:500});

		});
}])

/* Blog controller */
app.controller('NewsCtrl', ['$rootScope', '$scope', '$state', '$ionicNavBarDelegate', '$ionicHistory', 'NewService', 'AuthService', 'Feeds', 'globalFactory', function($rootScope, $scope, $state, $ionicNavBarDelegate, $ionicHistory, NewService, AuthService, Feeds, globalFactory) {
	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	$scope.page = 1;
	$scope.numPosts = 50;

	$rootScope.mainmenu = "show";

	var auth = AuthService.isAuthenticated();
	if(auth != false){
		$rootScope.showmenu = "show";
	}


    $scope.loadFeed = function() {
      var feed = new google.feeds.Feed(Feeds.feed);
      feed.setNumEntries($scope.numPosts);
      var count = 1;
      feed.load(function(result) {
      	// console.log(result.feed.entries);
        if (!result.error) {
          	$scope.items = result.feed.entries;
          	log = [];
          	angular.forEach(result.feed.entries, function(value, key) {
			  //console.log(key);
			  img = globalFactory.getPostImageFeed(value.content);
			  var arrlink = value.link.split("/");
			  // console.log(arrlink[4]);
			  $scope.items[key].image = img;
			  $scope.items[key].link = arrlink[4];
			}, log);
			// console.log($scope.items);
			$scope.$apply();
        }
      });
    }

    $scope.loadFeed();


	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.page = 1;
		$scope.postsCompleted = false;
		$scope.loadFeed();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])

/* Blog controller */
app.controller('SibaCtrl', ['$rootScope', '$scope', '$ionicNavBarDelegate', 'NewService', 'AuthService', 'Feeds', 'globalFactory', function($rootScope, $scope, $ionicNavBarDelegate, NewService, AuthService, Feeds, globalFactory) {
	$scope.items = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	$scope.page = 1;
	$scope.numPosts = 50;

	$rootScope.mainmenu = "show";
	// $ionicNavBarDelegate.showBackButton(false);

	var auth = AuthService.isAuthenticated();
	if(auth != false){
		$rootScope.showmenu = "show";
	}


    $scope.loadFeed = function() {
      var feed = new google.feeds.Feed(Feeds.siba);
      feed.setNumEntries($scope.numPosts);
      var count = 1;
      feed.load(function(result) {
      	// console.log(result.feed.entries);
        if (!result.error) {
          	$scope.items = result.feed.entries;
          	log = [];
          	angular.forEach(result.feed.entries, function(value, key) {
			  //console.log(key);
			  img = globalFactory.getPostImageFeed(value.content);
			  var arrlink = value.link.split("/");
			  // console.log(arrlink[4]);
			  $scope.items[key].image = img;
			  $scope.items[key].link = arrlink[4];
			}, log);
			// console.log($scope.items);
			$scope.$apply();
        }
      });
    }

    $scope.loadFeed();


	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.page = 1;
		$scope.postsCompleted = false;
		$scope.loadFeed();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])

/* Friends controller */
app.controller('FriendsCtrl', ['$rootScope', '$scope', 'Friends', 'APISERVER', function($rootScope, $scope, Friends, APISERVER) {
	$scope.items = [];
	$scope.times = 0 ;
	$scope.page = 1;
	$scope.postsCompleted = false;
	$scope.base_url = APISERVER.BASE_URL;
	$scope.typeorder = 'Baru';


  	$rootScope.mainmenu = "show";

	authlogin = JSON.parse(localStorage.authlogin);
	// console.log(authlogin);
	$scope.userid = authlogin.objectId;

	// load more content function
	$scope.getPosts = function(order){
		Friends.getFriends($scope.userid, $scope.page, order)
		.success(function (posts) {
			if(posts.kode == "200"){
				$scope.items = $scope.items.concat(posts.data);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.times = $scope.times + 1;
				$scope.page = $scope.page + 1;
				$scope.typeorder = order;

				$scope.postsCompleted = false;

			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
	}

	$scope.doSort = function(){
		$scope.doRefresh($scope.typeorder);
	}

	// pull to refresh buttons
	$scope.doRefresh = function(order){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.page = 1;
		$scope.postsCompleted = false;
		$scope.getPosts(order);
		$scope.$broadcast('scroll.refreshComplete');
	}
}])

/* Bonus controller */
app.controller('BonusCtrl', ['$rootScope', '$scope', 'Bonus', 'APISERVER', function($rootScope, $scope, Bonus, APISERVER) {
	$scope.items = [];
	$scope.times = 0 ;
	$scope.page = 1;
	$scope.postsCompleted = false;
	$scope.base_url = APISERVER.BASE_URL;


  	$rootScope.mainmenu = "show";

	authlogin = JSON.parse(localStorage.authlogin);
	// console.log(authlogin);
	$scope.userid = authlogin.objectId;

	// load more content function
	$scope.getPosts = function(){
		Bonus.getBonus($scope.userid, $scope.page)
		.success(function (posts) {
			if(posts.kode == "200"){
				$scope.items = $scope.items.concat(posts.data);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.times = $scope.times + 1;
				$scope.page = $scope.page + 1;

				$scope.postsCompleted = false;

			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
	}

	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.page = 1;
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])

/* Resi controller */
app.controller('ResiCtrl', ['$rootScope', '$scope', 'Resi', 'APISERVER', function($rootScope, $scope, Resi, APISERVER) {
	$scope.items = [];
	$scope.times = 0 ;
	$scope.page = 1;
	$scope.postsCompleted = false;
	$scope.base_url = APISERVER.BASE_URL;


  	$rootScope.mainmenu = "show";

	authlogin = JSON.parse(localStorage.authlogin);
	// console.log(authlogin);
	$scope.userid = authlogin.objectId;

	// load more content function
	$scope.getPosts = function(){
		Resi.getResi($scope.userid, $scope.page)
		.success(function (posts) {
			if(posts.kode == "200"){
				$scope.items = $scope.items.concat(posts.data);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.times = $scope.times + 1;
				$scope.page = $scope.page + 1;

				$scope.postsCompleted = false;

			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
	}

	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.page = 1;
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}])

/*   Articles controller  */
app.controller('PostCtrl', ['$rootScope', '$scope', '$state', 'Comments', '$ionicModal', 'Feeds', 'globalFactory', function($rootScope, $scope, $state, Comments, $ionicModal, Feeds, globalFactory) {
	$scope.items = [];
	$scope.post = {};
	$scope.postDataMain = '';

	$rootScope.mainmenu = "noshow";



	$scope.loadFeed = function() {
      var feed = new google.feeds.Feed(Feeds.feed);
      feed.setNumEntries(50);
      var count = 1;
      feed.load(function(result) {
      	// console.log(result.feed.entries);
        if (!result.error) {
          	$scope.post = result.feed.entries;
          	var  log = [];
          	angular.forEach(result.feed.entries, function(value, key) {
			  //console.log(key);
			  img = globalFactory.getPostImageFeed(value.content);
			  var arrlink = value.link.split("/");
			  // console.log(arrlink[4]);
			  $scope.post[key].image = img;
			  // $scope.post[key].link = arrlink[4];
			  if(arrlink[4] == $state.params.link ){
			  	$scope.items = $scope.post[key];
			  	$scope.postDataMain = value.content;
			  }


			}, log);
			// console.log($scope.post);
			$scope.$apply();
        }
      });
    }

    $scope.loadFeed();

	// load more content function
	$scope.getPosts = function(){
		Comments.getComments()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	$scope.getPosts();
	// comment modal
	$ionicModal.fromTemplateUrl('comment-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
	 	$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	 	$scope.modal.remove();
	});
}])

/*   Articles controller  */
app.controller('PostsibaCtrl', ['$rootScope', '$scope', '$state', 'Comments', '$ionicModal', 'Feeds', 'globalFactory', function($rootScope, $scope, $state, Comments, $ionicModal, Feeds, globalFactory) {
	$scope.items = [];
	$scope.post = {};
	$scope.postDataMain = '';

	$rootScope.mainmenu = "noshow";



	$scope.loadFeed = function() {
      var feed = new google.feeds.Feed(Feeds.siba);
      feed.setNumEntries(50);
      var count = 1;
      feed.load(function(result) {
      	// console.log(result.feed.entries);
        if (!result.error) {
          	$scope.post = result.feed.entries;
          	var  log = [];
          	angular.forEach(result.feed.entries, function(value, key) {
			  //console.log(key);
			  img = globalFactory.getPostImageFeed(value.content);
			  var arrlink = value.link.split("/");
			  // console.log(arrlink[4]);
			  $scope.post[key].image = img;
			  // $scope.post[key].link = arrlink[4];
			  if(arrlink[4] == $state.params.link ){
			  	$scope.items = $scope.post[key];
			  	$scope.postDataMain = value.content;
			  }


			}, log);
			// console.log($scope.post);
			$scope.$apply();
        }
      });
    }

    $scope.loadFeed();

	// load more content function
	$scope.getPosts = function(){
		Comments.getComments()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	$scope.getPosts();
	// comment modal
	$ionicModal.fromTemplateUrl('comment-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
	 	$scope.modal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	 	$scope.modal.remove();
	});
}])

/*  Settings Controller */
app.controller('SettingsCtrl',['$scope', function($scope) {
}])
/*  Settings Controller */
app.controller('SocialProfileCtrl',['$scope','SocialData', function($scope,SocialData) {
	$scope.socials = SocialData.items;
}])
/* Features Controller */
app.controller('FeaturesCtrl', ['$scope', 'Features', function($scope, Features) {
	$scope.items = Features.items;
}])
/* About us Controller */
app.controller('AboutCtrl', ['$scope', function($scope) {
}])

app.controller('StaticCtrl', ['$scope', '$state','Halaman', function($scope, $state, Halaman) {
	$scope.content = '';
	$scope.postDataMain = '';
	// console.log($state);
	$scope.param = $state.params.link;
	Halaman.getDetail($scope.param)
	.success(function(resp){
		if(resp.kode == "200"){
			$scope.content = resp.data.content;
			$scope.postDataMain = resp.data.content;
			// console.log($scope.content);
		}
	})
	.error(function(){

	});
}])

app.controller('ShownotifCtrl', ['$scope', '$state','Halaman', function($scope, $state, Halaman) {
	$scope.content = '';
	$scope.postDataMain = '';
	// console.log($state);
	$scope.param = $state.params.link;
	// alert($scope.param);
	Halaman.getNotif($scope.param)
	.success(function(resp){
		if(resp.kode == "200"){
			$scope.content = resp.data.push_content;
			$scope.title = resp.data.push_title;
			$scope.postDataMain = resp.data.push_content;
			// console.log($scope.content);
		}
	})
	.error(function(){

	});
}])

/* About us Controller */
app.controller('AssociateCtrl', ['$rootScope', '$scope', '$state', '$sce', 'AuthService', 'APISERVER', function($rootScope, $scope, $state, $sce, AuthService, APISERVER) {
	var auth = AuthService.isAuthenticated();
	$scope.userid = '';
	$scope.url = APISERVER.BASE_URL + "/registrasi";
	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.userid = authlogin.objectId;
		$scope.url = $scope.url +'/'+ authlogin.objectId
	}



	// to work embed in angularjs pages
	$scope.videoEmbed = function(video){
		// console.log(video);
		return $sce.trustAsResourceUrl(video);
	}
}])

/* Contact us form page */
app.controller('ContactCtrl', ['$scope', '$ionicLoading', 'Contact', function($scope, $ionicLoading, Contact) {
	//setting heading here
	$scope.user = {};
	// contact form submit event
	$scope.submitForm = function(isValid) {
		if (isValid) {
			$ionicLoading.show({template: 'send data'});

			Contact.sendContact($scope.user)
			.success(function (posts) {
				if(posts.kode == "200"){
					//$scope.user = [];
					$ionicLoading.show({template: 'send success', duration:500});

				}else{
					$ionicLoading.show({template: 'send failed', duration:500});
				}

			})
			.error(function (error) {
				$ionicLoading.show({template: 'send failed', duration:500});
			});
		}
	}
}])

/* stockist us Controller */
app.controller('StockistCtrl', ['$rootScope', '$scope', '$state', '$sce', 'AuthService', 'APISERVER', function($rootScope, $scope, $state, $sce, AuthService, APISERVER) {

	var auth = AuthService.isAuthenticated();
	$scope.profil = '';

	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.profil = authlogin;

	}else{
		$state.go("app.login");
	}

	if($scope.profil.stockist == ''){
		$state.go("app.intro");
	}
}])

/* order stockist us Controller */
app.controller('OrderStockistCtrl', ['$rootScope', '$scope', '$state', '$ionicLoading', '$ionicHistory', 'AuthService', 'Stockist', function($rootScope, $scope, $state, $ionicLoading, $ionicHistory, AuthService, Stockist) {

	var auth = AuthService.isAuthenticated();
	$scope.profil = '';
	$scope.orders_conf = {};
	$scope.order = {
		'gold' : 10,
		'diamond' : 2,
		'distributor' : '',
	};

	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.profil = authlogin;


		$scope.order.nama = $scope.profil.username;
		$scope.order.telp = $scope.profil.telp;
		$scope.order.alamat = $scope.profil.alamat;


	}else{
		$state.go("app.login");
	}

	if($scope.profil.stockist == ''){
		$state.go("app.intro");
	}

	Stockist.getConfig($scope.profil.objectId)
	.success(function (posts) {

		if(posts.kode == "200"){
			$scope.orders_conf = posts.order;
			$scope.order.gold = parseInt(posts.order.gold);
			$scope.order.diamond = parseInt(posts.order.diamond);
			$scope.order.distributor = posts.order.distributor;
		}else{
			$ionicLoading.show({template: 'System error', duration:1000});
		}

	})
	.error(function (error) {
		$ionicLoading.show({template: 'System error', duration:1000});
	});


	$scope.submitForm = function(isValid) {

		if (isValid) {
			console.log($scope);
			if(parseInt($scope.orders_conf.gold) > parseInt($scope.order.gold)){

		      $ionicLoading.show({template: 'Order Gold harus >= '+$scope.orders_conf.gold, duration:1000});

		    }
		    else if(parseInt($scope.orders_conf.diamond) > parseInt($scope.order.diamond)){


		      $ionicLoading.show({template: 'Order Diamond harus >= '+$scope.orders_conf.diamond, duration:1000});

		    } else {

		    	Stockist.saveOrder($scope.profil.objectId, $scope.order)
				.success(function (posts) {
					//console.log(posts);
					if(posts.kode == "200"){
						$ionicLoading.show({template: 'order success', duration:1000});
						$ionicHistory.goBack();
					}else{
						$ionicLoading.show({template: 'order failed', duration:1000});
					}

				})
				.error(function (error) {
					$ionicLoading.show({template: 'System error', duration:1000});
				});

		    }


		}
	}

}])

/* member stockist us Controller */
app.controller('MemberStockistCtrl', ['$rootScope', '$scope', '$state', '$sce', 'AuthService', 'Stockist', function($rootScope, $scope, $state, $sce, AuthService, Stockist) {

	var auth = AuthService.isAuthenticated();
	$scope.profil = '';
	$scope.titlemember = $state.params.link == "order" ? "Member Order" : "Member Aktif";
	$scope.status = $state.params.link == "order" ? "member_order" : "member_active";

	if(auth != false){
		$rootScope.showmenu = "show";
		authlogin = JSON.parse(localStorage.authlogin);
		$scope.profil = authlogin;

	}else{
		$state.go("app.login");
	}

	if($scope.profil.stockist == ''){
		$state.go("app.intro");
	}

	$scope.times = 0 ;
	$scope.typeorder = 'baru' ;
	$scope.items = [];
	$scope.page = 1;
	$scope.postsCompleted = false;



	// load more content function
	$scope.getPosts = function(order){
		Stockist.getMember($scope.profil.objectId, $scope.status, $scope.page, order)
		.success(function (posts) {
			if(posts.kode == "200"){
				$scope.items = $scope.items.concat(posts.payload);
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.times = $scope.times + 1;
				$scope.page = $scope.page + 1;

				$scope.postsCompleted = false;
				$scope.typeorder = order;

			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
	}

	// pull to refresh buttons
	$scope.doRefresh = function(order){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.page = 1;
		$scope.postsCompleted = false;
		$scope.getPosts(order);
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.doSort = function(){
		$scope.doRefresh($scope.typeorder);
	}

	$scope.executeMember = function(stock, status){

		Stockist.getExecMember($scope.profil.objectId, status, stock.idkode)
		.success(function (posts) {
			if(posts == "success"){

				for (var j=0;j<$scope.items.length; j++) {
					//console.log($scope.items);
			        if($scope.items[j].idkode === stock.idkode) {
			              $scope.items.splice(j, 1);
			        }
			    }

			}else{

			}

		})
		.error(function (error) {

		});
	}


}])






// push controller
app.controller('PushCtrl', ['$scope', 'SendPush', function($scope, SendPush){
	$scope.device_token = $scope.get_device_token();
	$scope.sendNotification = function(){
		SendPush.android($scope.device_token)
		.success(function () {
		})
		.error(function (error) {
		});
	}
}]);
// show ad mob here in this page
app.controller('AdmobCtrl', ['$scope', 'ConfigAdmob', function($scope, ConfigAdmob){
	$scope.showInterstitial = function(){
		if(AdMob) AdMob.showInterstitial();
	}
	document.addEventListener("deviceready", function(){
		if(AdMob) {
			// show admob banner
			if(ConfigAdmob.banner) {
				AdMob.createBanner( {
					adId: ConfigAdmob.banner,
					position: AdMob.AD_POSITION.BOTTOM_CENTER,
					autoShow: true
				} );
			}
			// preparing admob interstitial ad
			if(ConfigAdmob.interstitial) {
				AdMob.prepareInterstitial( {
					adId:ConfigAdmob.interstitial,
					autoShow:false
				} );
			}
		}
		if(ConfigAdmob.interstitial) {
			$scope.showInterstitial();
		}
	});
}]);
// new items v2.0
// messages list
app.controller('MessagesCtrl', ['$scope', 'Messages', function($scope, Messages){
	$scope.items = [];
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Messages.getMesages()
		.success(function (posts) {
			$scope.items = $scope.items.concat(posts);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.postsCompleted = true;
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.items = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
}]);
// single message
app.controller('MessageCtrl', ['$scope', 'Messages', '$ionicScrollDelegate', function($scope, Messages, $ionicScrollDelegate ){
	$scope.messages = [];
	$scope.postsCompleted = false;
	// load more content function
	$scope.getPosts = function(){
		Messages.getMessage()
		.success(function (posts) {
			$scope.messages = $scope.messages.concat(posts);
			//console.log($scope.messages);
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$ionicScrollDelegate.scrollBottom();
			$scope.postsCompleted = true;
		})
		.error(function (error) {
			$scope.items = [];
		});
	}
	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.messages = [];
		$scope.postsCompleted = false;
		$scope.getPosts();
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.addMesage = function(){
		var newMessage = new function() {
			this.message = $scope.datamessage;
			this.from = '2';
			this._id	= '12';
			this.title	= 'sample';
			this.image	= 'http://3.bp.blogspot.com/-bTWNRjookMQ/VYGjnv5nKtI/AAAAAAAAA08/wXshQ9sNDeU/s100-c/blank-792125_1280.jpg';
		}
		$scope.messages = $scope.messages.concat(newMessage);
		$scope.datamessage = "";
		$ionicScrollDelegate.scrollBottom();
    }
}]);
// feed list data sample
app.controller('FeedsListCtrl', ['$scope', '$state', 'Feeds', function($scope, $state, Feeds ){
	$scope.feeds = Feeds.items;
	$scope.showNews = function(index){
		Feeds.selectedFeed = $scope.feeds[index];
		$state.go('app.feed');
	}
}]);
// single feed posts
app.controller('FeedCtrl', ['$scope', '$state', 'Feeds', function($scope, $state, Feeds ){

	$scope.numPosts = 20;
	$scope.stories = [];
	$scope.feed = Feeds.selectedFeed;
	$scope.showNews = function(index){
		Feeds.selectedFeed = $scope.feeds[index];
	}
	$scope.loadFeed = function() {
      var feed = new google.feeds.Feed(Feeds.selectedFeed.feed);
      feed.setNumEntries($scope.numPosts);
      var count = 1;
      feed.load(function(result) {
        if (!result.error) {
          $scope.feed = result.feed;
			 $scope.$apply();
        }
      });
    }
    $scope.loadFeed();
	 $scope.getImage = function(index) {
		var selectedItem = $scope.feed.entries[index];
		var content = selectedItem.content;
		var imgthumb = "";
		a = content.indexOf("<img");
		b = content.indexOf("src=\"",a);
		c = content.indexOf("\"",b+5);
		d = content.substr(b+5,c-b-5);
		if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")) {
			imgthumb = d;
		}
		if(imgthumb) {
			return imgthumb;
		} else {
			return 'img/photo.png';
		}
    }
	 $scope.showFullFeed = function(indexFeed){
	 	Feeds.selectedNews = $scope.feed.entries[indexFeed];
		$state.go('app.feedsingle');
	 }
}]);
app.controller('FeedSingleCtrl', ['$scope', '$state', 'Feeds', '$sce', function($scope, $state, Feeds, $sce ){
	$scope.feedContent = Feeds.selectedNews;
	$scope.content = $sce.trustAsHtml($scope.feedContent.content);

}]);

app.controller('EwalletCtrl', ['$rootScope','$scope', 'APISERVER', function($rootScope, $scope, APISERVER) {
  $scope.items = [];
  $scope.times = 0 ;
  $scope.page = 1;
  $scope.postsCompleted = false;
  $scope.base_url = APISERVER.BASE_URL;


    $rootScope.mainmenu = "show";

  authlogin = JSON.parse(localStorage.authlogin);
  //console.log(authlogin);
  $scope.userid = authlogin.objectId;
}])

app.controller('EwalletInfoCtrl', ['$rootScope','$scope', '$ionicModal', 'Ewallet', 'APISERVER', function($rootScope, $scope, $ionicModal, Ewallet, APISERVER) {
  $scope.data = [];
	$scope.postsCompleted = false;
	$scope.base_url = APISERVER.BASE_URL;

  $ionicModal.fromTemplateUrl('templates/info.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });

   $scope.openModal = function(data) {
     $scope.detail = $scope.data[data];
     console.log(data);
      $scope.modal.show();
   };

   $scope.closeModal = function() {
      $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });


  	$rootScope.mainmenu = "show";

	authlogin = JSON.parse(localStorage.authlogin);
	// console.log(authlogin);
  $scope.param = [];
  $scope.param.idm = authlogin.idm;
  $scope.param.datatype = 'info';
  $scope.param.limit = 5;
  $scope.page = 1;
  $scope.param.offset = ($scope.page - 1) * $scope.param.limit;

  console.log($scope.param);
  // load more content function
  $scope.getData = function(){
  Ewallet.getData($scope.param)
    .success(function (posts) {
      if(posts.code == "200"){
        $scope.info = posts.info;
        $scope.data =  $scope.data.concat(posts.payload);
        console.log($scope.data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.page = $scope.page + 1;
        $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
  };

  $scope.doRefresh = function(){
    $scope.param.limit = 5;
    $scope.page = 1;
    $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
    $scope.data = [];
		$scope.getData();
    $scope.page = 1;
		$scope.$broadcast('scroll.refreshComplete');
    $scope.postsCompleted = false;
	};
}])

app.controller('EwalletWithdrawCtrl', ['$rootScope','$scope','Ewallet', 'APISERVER', '$ionicModal', '$ionicPopup', '$timeout', function($rootScope, $scope, Ewallet, APISERVER, $ionicModal, $ionicPopup, $timeout) {
  $scope.data = [];
	$scope.postsCompleted = false;
	$scope.base_url = APISERVER.BASE_URL;
  $scope.withdrawbtn = true;
  $scope.withdrawtext = 'Withdraw';

  $ionicModal.fromTemplateUrl('templates/withdraw.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });

   $scope.openModal = function(data) {
     $scope.detail = $scope.data[data];
     console.log(data);
      $scope.modal.show();
   };

   $scope.closeModal = function() {
      $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });

  $rootScope.mainmenu = "show";

	authlogin = JSON.parse(localStorage.authlogin);
	// console.log(authlogin);
  $scope.datawithdraw = $scope.param = [];
  $scope.datawithdraw.idm = $scope.param.idm = authlogin.idm;
  $scope.param.limit = 5;
  $scope.page = 1;
  $scope.param.offset = ($scope.page - 1) * $scope.param.limit;

  // load more content function
  $scope.getData = function(){
  $scope.param.datatype = 'withdraw';
  Ewallet.getData($scope.param)
    .success(function (posts) {
      if(posts.code == "200"){
        console.log(posts);
        $scope.info = posts.info;
        $scope.data = $scope.data.concat(posts.payload);
        $scope.optionwithdraw = posts.option;
        console.log($scope.data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.page = $scope.page + 1;
        $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
  };

  $scope.optionchange = function(){
    $scope.withdrawbtn = false;
  }

  $scope.doWithdraw = function(){
    $scope.datawithdraw.datatype = 'savewithdraw';
    $scope.withdrawbtn = true;
    $scope.withdrawtext = 'Memproses...'
    console.log($scope.datawithdraw);
    Ewallet.saveData($scope.datawithdraw)
    .success(function (suc){
      if(suc.status == false){
        console.log(suc);
        $ionicPopup.alert({
            title: 'Error',
            content: suc.msg,
            okType: 'button-royal'
        });
        $scope.withdrawbtn = false;
        $scope.withdrawtext = 'Withdraw';
      } else {
        console.log(suc);
        $ionicPopup.alert({
            title: 'Success',
            content: suc.msg,
            okType: 'button-royal'
        });
        $scope.withdrawbtn = false;
        $scope.withdrawtext = 'Withdraw';
      }
    })
  }
  $scope.doRefresh = function(){
    $scope.param.limit = 5;
    $scope.page = 1;
    $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
    $scope.data = [];
		$scope.getData();
    $scope.page = 1;
		$scope.$broadcast('scroll.refreshComplete');
    $scope.postsCompleted = false;
	};
}])

app.controller('EwalletTransferCtrl', ['$rootScope','$scope', '$ionicModal','$ionicPopup','$timeout', 'Ewallet', 'APISERVER', function($rootScope, $scope, $ionicModal, $ionicPopup, $timeout, Ewallet, APISERVER) {
  $scope.data = [];
	$scope.times = 0 ;
	$scope.page = 1;
	$scope.postsCompleted = false;
	$scope.base_url = APISERVER.BASE_URL;

  $scope.cekmember = 'Cek Kode Member';
  $scope.transferbtn = $scope.cekbutton = false;
  $scope.transferstr = 'Transfer';

  $ionicModal.fromTemplateUrl('templates/transfer.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });

   $scope.openModal = function(data) {
     $scope.modalindex = data;
     $scope.detail = $scope.data[data];
     console.log(data);
      $scope.modal.show();
   };

   $scope.closeModal = function() {
      $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });

  	$rootScope.mainmenu = "show";

	authlogin = JSON.parse(localStorage.authlogin);
	// console.log(authlogin);
  $scope.datatransfer = $scope.param = [];
  $scope.datatransfer.idm = $scope.param.idm = authlogin.idm;
  $scope.param.limit = 5;
  $scope.page = 1;
  $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
  // load more content function
  $scope.getData = function(){
  $scope.param.datatype = 'transfer';
  Ewallet.getData($scope.param)
    .success(function (posts) {
      if(posts.code == "200"){
        $scope.info = posts.info;
        $scope.data = $scope.data.concat(posts.payload);
        //$scope.broadcast('scroll.infiniteScrollComplete');
        console.log($scope.data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.page = $scope.page + 1;
        $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
  };
  $scope.findMember = function(){
    $scope.cekmember = 'Mencari....';
    $scope.cekbutton = true;
    console.log($scope.datatransfer);
    Ewallet.findID($scope.datatransfer)
    .success(function (suc){
      if(suc.status == false){
        console.log(suc);
        $ionicPopup.alert({
            title: 'Error',
            content: suc.msg,
            okType: 'button-royal'
        });
        $scope.cekmember = 'Cek Kode Member';
        $scope.cekbutton = false;
      } else {
        console.log(suc);
        $scope.datatransfer.idmember = suc.data.id;
        $ionicPopup.alert({
            title: 'Berhasil',
            subTitle: suc.msg,
            content: '<span>Nama : '+suc.data.nama_depan+'</span><br><span>Kota : '+suc.data.kota+'</span>',
            okType: 'button-royal'
        });
        console.log(suc);
        $scope.cekmember = 'Cek Kode Member';
        $scope.cekbutton = false;
      }
    })
    .error(function (error){
      console.log(error);
    })
  }

  $scope.doTransfer = function(){
    $scope.datatransfer.datatype = 'savetransfer';
    $scope.transferstr = "Memproses.....";
    $scope.transferbtn = true;
    console.log($scope.datatransfer);
    Ewallet.saveData($scope.datatransfer)
    .success(function (suc){
      if (suc.status == false){
        $ionicPopup.alert({
            title: 'Error',
            content: suc.msg,
            okType: 'button-royal'
        });
        $scope.transferstr = 'Transfer';
        $scope.transferbtn = false;
      } else {
        $ionicPopup.alert({
            title: 'Berhasil',
            content: suc.msg,
            okType: 'button-royal'
        });
        $scope.datatransfer.idmember = null;
        $scope.datatransfer.jumlah = null;
        $scope.datatransfer.kode = null;
        $scope.transferstr = 'Transfer';
        $scope.transferbtn = false;
        $state.go($state.current, {}, {reload: true});
      }
    })
    .error(function (error){
      console.log(error);
    })
  }

  $scope.showPopup = function(idtrans) {
   $scope.datatransfer.idtrans = idtrans;
   $scope.datatransfer.kodekonfirmasi = '';

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="datatransfer.kodekonfirmasi">',
     title: 'Masukkan Kode Konfirmasi',
     subTitle: 'Kode Konfirmasi didapatkan dari SMS',
     scope: $scope,
     buttons: [
       { text: 'Batalkan' },
       {
         text: '<b>Konfirmasi</b>',
         type: 'button-royal',
         onTap: function(e) {
           if (!$scope.datatransfer.kodekonfirmasi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             $scope.datatransfer.datatype = 'konfirmasitransfer';
             console.log($scope.datatransfer);
             Ewallet.saveData($scope.datatransfer)
             .success(function (suc){
               if (suc.status == false){
                 $ionicPopup.show({
                   title: 'Error',
                   template: suc.msg,
                   buttons: [
                     { text: 'Batalkan',
                       onTap: function(e) {
                         $scope.doRefresh();
                       }
                     },
                     { text: '<b>Coba Lagi</b>',
                       type: 'button-royal',
                       onTap: function(e) {
                         $scope.showPopup($scope.datatransfer.idtrans);
                       }
                     }
                   ]
                 });
               } else {
                 $ionicPopup.alert({
                   title: 'Success',
                   content: suc.msg,
                   okType: 'button-royal'
                 });
                 $scope.datatransfer.idtransfer = '';
                 $scope.datatransfer.kodekonfirmasi = '';
                 $scope.doRefresh();
               }
             })
             .error(function (err){
               $ionicPopup.alert({
                 title: 'Error',
                 content: err.msg,
                 okType: 'button-royal'
               });
             })
             //return $scope.datatransfer.kodekonfirmasi;
           }
         }
       },
     ]
   });
  };

  $scope.doRefresh = function(){
    $scope.param.limit = 5;
    $scope.page = 1;
    $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
    $scope.data = [];
		$scope.getData();
    $scope.page = 1;
		$scope.$broadcast('scroll.refreshComplete');
    $scope.postsCompleted = false;
	};
}])

app.controller('EwalletTopupCtrl', ['$rootScope','$scope', '$ionicModal', '$ionicPopup', '$timeout','Ewallet', 'APISERVER', function($rootScope, $scope, $ionicModal, $ionicPopup, $timeout, Ewallet, APISERVER) {
  $scope.data = [];
  $scope.topuptxt = 'Topup';
  $scope.topupselect = $scope.topupbtn = true;

	$scope.postsCompleted = false;
	$scope.base_url = APISERVER.BASE_URL;

  $ionicModal.fromTemplateUrl('templates/topup.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });

   $scope.openModal = function(data) {
     $scope.detail = $scope.data[data];
     console.log(data);
      $scope.modal.show();
   };

   $scope.closeModal = function() {
      $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });


  	$rootScope.mainmenu = "show";

	authlogin = JSON.parse(localStorage.authlogin);
	// console.log(authlogin);
  $scope.datatopup = $scope.param = [];
  $scope.datatopup.idm = $scope.param.idm = authlogin.idm;
  $scope.param.limit = 5;
  $scope.page = 1;
  $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
  // load more content function
  $scope.getData = function(){
  $scope.param.datatype = 'topup';
  Ewallet.getData($scope.param)
    .success(function (posts) {
      if(posts.code == "200"){
        $scope.info = posts.info;
        $scope.data = $scope.data.concat(posts.payload);
        $scope.optiontopup = posts.option;
        console.log($scope.optiontopup);
        console.log($scope.data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.page = $scope.page + 1;
        $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
			}else{
				$scope.postsCompleted = true;
				//$scope.items = [];
			}

		})
		.error(function (error) {
			$scope.items = [];
		});
  };

  $scope.topupchange = function(){
    $scope.topupselect = false;
  }
  $scope.topupby = function(){
    $scope.topupbtn = false;
  }

  $scope.doTopup = function(){
    $scope.datatopup.datatype = 'savetopup';
    $scope.topupbtn = true;
    $scope.topuptxt = 'Memproses...';
    console.log($scope.datatopup);
    Ewallet.saveData($scope.datatopup)
      .success(function (suc){
        if (suc.status == false){
          $ionicPopup.alert({
            title: 'Error',
            content: suc.msg,
            okType: 'button-royal'
          });
        } else {
          $ionicPopup.alert({
            title: 'Success',
            content: suc.msg,
            okType: 'button-royal'
          });
          $scope.topupbtn = true;
          $scope.topuptxt = 'Topup';
          $scope.datatopup.jml = $scope.datatopup.by = '';
          $scope.doRefresh();
        }
      })
      .error(function (err){
        $ionicPopup.alert({
          title: 'Error',
          content: suc.msg,
          okType: 'button-royal'
        })

      });
  };

  $scope.doRefresh = function(){
    $scope.param.limit = 5;
    $scope.page = 1;
    $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
    $scope.data = [];
		$scope.getData();
    $scope.page = 1;
		$scope.$broadcast('scroll.refreshComplete');
    $scope.postsCompleted = false;
	};
}])

app.controller('PaymentCtrl', ['$rootScope','$scope', 'APISERVER', function($rootScope, $scope, APISERVER) {
  $scope.items = [];
  $scope.times = 0 ;
  $scope.page = 1;
  $scope.postsCompleted = false;
  $scope.base_url = APISERVER.BASE_URL;


    $rootScope.mainmenu = "show";

  authlogin = JSON.parse(localStorage.authlogin);
  //console.log(authlogin);
  $scope.userid = authlogin.objectId;
  $scope.profil = authlogin;
}])

app.controller('PaymentPLNCtrl', ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {
  authlogin = JSON.parse(localStorage.authlogin);
  $scope.data = {};
  $scope.data.ref2 = '';
  $scope.data.idm = authlogin.idm;
  $scope.data.key = localStorage.tokenstu;

  $scope.buttonCheck = 'Periksa';
  $scope.buttonPay = 'Bayar';
  $scope.disableNominal = true;
  $scope.disablePayment = true;
  $scope.disableInquiry = false;
  $scope.changePLN = function(value){
    console.log(value);
    if(value == 'PLNPRAY'){
      $scope.disableNominal = false;
    } else {
      $scope.disableNominal = true;
    }
  }

  $scope.doInquiry = function(){
    $scope.buttonCheck = 'Memeriksa...';
    $scope.disableInquiry = true;
    console.log($scope.data);
    Payment.doInquiry($scope.data)
      .success(function(suc){
        if(suc.status == false){
          $ionicPopup.alert({
              title: 'Error',
              content: suc.msg,
              okType: 'button-royal'
          });

          $scope.buttonCheck = 'Periksa';
          $scope.disableInquiry = false;

          //console.log(suc); //return data for debug
        } else {
          $scope.data.namapel = suc.data.namapelanggan;
          $scope.data.nominal = suc.data.nominal;
          $scope.data.biayaadmin = suc.data.biayaadmin;
          $scope.data.periode = suc.data.periodetagihan;
          $scope.data.keterangan = suc.data.msg;
          $scope.data.ref2 = suc.data.ref2;

          $scope.buttonCheck = 'Periksa';
          $scope.disablePayment = false;
          //console.log(suc); //return data for debug
        }
      })
      .error(function(err){
        $scope.buttonCheck = 'Periksa';
        $scope.disableInquiry = false;
        //console.log('error'); //return data for debug
      })
  }

  $scope.doPayment = function(){
    $scope.buttonPay = 'Memproses...';
    $scope.disablePayment = true;
    //console.log($scope.data);
    Payment.doPayment($scope.data)
    .success(function(suc){
      if(suc.status == false){
        $ionicPopup.alert({
          title: 'Error',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.buttonPay = 'Bayar';
        $scope.disablePayment = false;
        //console.log(suc); //return data for debug
      } else {
        $ionicPopup.alert({
          title: 'Success',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.buttonPay = 'Pembayaran Berhasil';
        //console.log(suc); //return data for debug
      }
    })
    .error(function(err){
      $scope.disablePayment = false;
      $scope.buttonPay = 'Bayar';
      console.log('error'); //return data for debug
    })
  }
  $scope.doRefresh = function(){
    $scope.param.limit = 5;
    $scope.page = 1;
    $scope.param.offset = ($scope.page - 1) * $scope.param.limit;
    $scope.data = [];
		$scope.getData();
    $scope.page = 1;
		$scope.$broadcast('scroll.refreshComplete');
    $scope.postsCompleted = false;
	};
}])

app.controller('PaymentPDAMCtrl',  ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {
  $scope.pdam = {};
  $scope.options = {
    kategori: 'pdam',
    jenis: 'ppob'
  };
  $scope.wilayahPDAM = {
    nama_produk: 'Pilih'
  };
  Payment.getProduct($scope.options)
		.success(function(suc){

			if(suc.kode = "1"){
				$scope.pdam = suc.data;

			}else{
				console.log('failed');

			}

		})
		.error(function(err){

			console.log('error');

		});

    authlogin = JSON.parse(localStorage.authlogin);
    $scope.data = {};

    $scope.data.ref2 = '';
    $scope.data.idm = authlogin.idm;
    $scope.data.key = localStorage.tokenstu;

    $scope.buttonCheck = 'Periksa';
    $scope.buttonPay = 'Bayar';
    $scope.disablePayment = true;
    $scope.disableInquiry = false;

    $scope.setproduk = function(newValue){
      $scope.data.produk = newValue.kode_produk;
    }

    $scope.doInquiry = function(){
      $scope.buttonCheck = 'Memeriksa...';
      $scope.disableInquiry = true;
      console.log($scope.data);
      Payment.doInquiry($scope.data)
        .success(function(suc){
          if(suc.status == false){
            $ionicPopup.alert({
                title: 'Error',
                content: suc.msg,
                okType: 'button-royal'
            });

            $scope.buttonCheck = 'Periksa';
            $scope.disableInquiry = false;

            //console.log(suc); //return data for debug
          } else {
            $scope.data.namapel = suc.data.namapelanggan;
            $scope.data.nominal = suc.data.nominal;
            $scope.data.biayaadmin = suc.data.biayaadmin;
            $scope.data.periode = suc.data.periodetagihan;
            $scope.data.keterangan = suc.data.msg;
            $scope.data.ref2 = suc.data.ref2;

            $scope.buttonCheck = 'Periksa';
            $scope.disablePayment = false;
            //console.log(suc); //return data for debug
          }
        })
        .error(function(err){
          $scope.buttonCheck = 'Periksa';
          $scope.disableInquiry = false;
          //console.log('error'); //return data for debug
        })
    }

    $scope.doPayment = function(){
      $scope.buttonPay = 'Memproses...';
      $scope.disablePayment = true;
      //console.log($scope.data);
      Payment.doPayment($scope.data)
      .success(function(suc){
        if(suc.status == false){
          $ionicPopup.alert({
            title: 'Error',
            content: suc.msg,
            okType: 'button-royal'
          });
          $scope.buttonPay = 'Bayar';
          $scope.disablePayment = false;
          //console.log(suc); //return data for debug
        } else {
          $ionicPopup.alert({
            title: 'Success',
            content: suc.msg,
            okType: 'button-royal'
          });
          $scope.buttonPay = 'Pembayaran Berhasil';
          //console.log(suc); //return data for debug
        }
      })
      .error(function(err){
        $scope.disablePayment = false;
        $scope.buttonPay = 'Bayar';
        console.log('error'); //return data for debug
      })
    }

}])

app.controller('PaymentSpeedyCtrl', ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {
  authlogin = JSON.parse(localStorage.authlogin);
  $scope.data = {};
  $scope.data.produk = 'SPEEDY';
  $scope.data.ref2 = '';
  $scope.data.idm = authlogin.idm;
  $scope.data.key = localStorage.tokenstu;

  $scope.buttonCheck = 'Periksa';
  $scope.buttonPay = 'Bayar';
  $scope.disablePayment = true;
  $scope.disableInquiry = false;

  $scope.doInquiry = function(){
    $scope.buttonCheck = 'Memeriksa...';
    $scope.disableInquiry = true;
    //console.log($scope.data);
    Payment.doInquiry($scope.data)
      .success(function(suc){
        if(suc.status == false){
          $ionicPopup.alert({
              title: 'Error',
              content: suc.msg,
              okType: 'button-royal'
          });

          $scope.buttonCheck = 'Periksa';
          $scope.disableInquiry = false;

          //console.log(suc); //return data for debug
        } else {
          $scope.data.namapel = suc.data.namapelanggan;
          $scope.data.nominal = suc.data.nominal;
          $scope.data.biayaadmin = suc.data.biayaadmin;
          $scope.data.periode = suc.data.periodetagihan;
          $scope.data.keterangan = suc.data.msg;
          $scope.data.ref2 = suc.data.ref2;

          $scope.buttonCheck = 'Periksa';
          $scope.disablePayment = false;
          //console.log(suc); //return data for debug
        }
      })
      .error(function(err){
        $scope.buttonCheck = 'Periksa';
        $scope.disableInquiry = false;
        //console.log('error'); //return data for debug
      })
  }

  $scope.doPayment = function(){
    $scope.buttonPay = 'Memproses...';
    $scope.disablePayment = true;
    //console.log($scope.data);
    Payment.doPayment($scope.data)
    .success(function(suc){
      if(suc.status == false){
        $ionicPopup.alert({
          title: 'Error',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.buttonPay = 'Bayar';
        $scope.disablePayment = false;
        //console.log(suc); //return data for debug
      } else {
        $ionicPopup.alert({
          title: 'Success',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.buttonPay = 'Pembayaran Berhasil';
        //console.log(suc); //return data for debug
      }
    })
    .error(function(err){
      $scope.disablePayment = false;
      $scope.buttonPay = 'Bayar';
      console.log('error'); //return data for debug
    })
  }

}])

app.controller('PaymentTeleponCtrl', ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {

  authlogin = JSON.parse(localStorage.authlogin);
  $scope.data = {};
  $scope.data.produk = 'TELEPON';
  $scope.data.ref2 = '';
  $scope.data.idm = authlogin.idm;
  $scope.data.key = localStorage.tokenstu;

  $scope.buttonCheck = 'Periksa';
  $scope.buttonPay = 'Bayar';
  $scope.disablePayment = true;
  $scope.disableInquiry = false;

  $scope.doInquiry = function(){
    $scope.buttonCheck = 'Memeriksa...';
    $scope.disableInquiry = true;
    //console.log($scope.data);
    Payment.doInquiry($scope.data)
      .success(function(suc){
        if(suc.status == false){
          $ionicPopup.alert({
              title: 'Error',
              content: suc.msg,
              okType: 'button-royal'
          });

          $scope.buttonCheck = 'Periksa';
          $scope.disableInquiry = false;

          //console.log(suc); //return data for debug
        } else {
          $scope.data.namapel = suc.data.namapelanggan;
          $scope.data.nominal = suc.data.nominal;
          $scope.data.biayaadmin = suc.data.biayaadmin;
          $scope.data.periode = suc.data.periodetagihan;
          $scope.data.keterangan = suc.data.msg;
          $scope.data.ref2 = suc.data.ref2;

          $scope.buttonCheck = 'Periksa';
          $scope.disablePayment = false;
          //console.log(suc); //return data for debug
        }
      })
      .error(function(err){
        $scope.buttonCheck = 'Periksa';
        $scope.disableInquiry = false;
        //console.log('error'); //return data for debug
      })
  }

  $scope.doPayment = function(){
    $scope.buttonPay = 'Memproses...';
    $scope.disablePayment = true;
    //console.log($scope.data);
    Payment.doPayment($scope.data)
    .success(function(suc){
      if(suc.status == false){
        $ionicPopup.alert({
          title: 'Error',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.buttonPay = 'Bayar';
        $scope.disablePayment = false;
        //console.log(suc); //return data for debug
      } else {
        $ionicPopup.alert({
          title: 'Success',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.buttonPay = 'Pembayaran Berhasil';
        //console.log(suc); //return data for debug
      }
    })
    .error(function(err){
      $scope.disablePayment = false;
      $scope.buttonPay = 'Bayar';
      console.log('error'); //return data for debug
    })
  }
}])

/*  User Profile page template */
app.controller('PaymentPulsaPraCtrl', ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {

	$scope.pulsa = [];
  $scope.nominalPulsa = {
    nama_produk: 'Pilih'
  };


	$scope.doData = function(filter){
    $scope.options = {
      kategori: filter,
      jenis: 'pulsa'
    };
    Payment.getProduct($scope.options)
		  .success(function(suc){
        console.log(suc);

			  if(suc.kode = "1"){
			    $scope.pulsa = suc.data;
          console.log($scope.pulsa);
        }else{
          console.log('failed');
        }
      })
      .error(function(err){
        console.log('error');
      });
  }

  authlogin = JSON.parse(localStorage.authlogin);
  $scope.data = {};
  $scope.data.nohp = '';
  $scope.data.idm = authlogin.idm;
  $scope.data.key = localStorage.tokenstu;

  $scope.buttonCheck = 'Beli';

  $scope.setproduk = function(newValue){
    $scope.data.produk = newValue.kode_produk;
  }

  $scope.doTopup = function(){
    $scope.buttonCheck = 'Memproses...';
    $scope.disableButton = true;
    console.log($scope.data);
    Payment.doTopup($scope.data)
    .success(function(suc){
      if(suc.status == false){
        $ionicPopup.alert({
          title: 'Error',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.buttonCheck = 'Beli';
        $scope.disableButton = false;
        console.log(suc); //return data for debug
      } else {
        $ionicPopup.alert({
          title: 'Success',
          content: suc.msg,
          okType: 'button-royal'
        });
        $scope.data.nohp = null;
        $scope.data.produk = null;
        $scope.buttonCheck = 'Beli';
        $scope.disableButton = false;
        //console.log(suc); //return data for debug
      }
    })
    .error(function(err){
      $scope.button = 'Bayar';
      $scope.isDisabled = false;
      //console.log('error'); //return data for debug
    })
  }
}])

app.controller('PaymentPulsaPascaCtrl', ['$rootScope','$scope', 'APISERVER', function($rootScope, $scope, APISERVER) {
  $scope.items = [];
  $scope.times = 0 ;
  $scope.page = 1;
  $scope.postsCompleted = false;
  $scope.base_url = APISERVER.BASE_URL;


    $rootScope.mainmenu = "show";

  authlogin = JSON.parse(localStorage.authlogin);
  //console.log(authlogin);
  $scope.userid = authlogin.objectId;
}])

app.controller('PaymentPesawatCtrl',  ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {
  $scope.data = '';
  $scope.clickedValueModel = "";
  $scope.removedValueModel = "";
  Payment.getAirportList()
  .success(function(suc){
    listitems = suc.data;
  })
  .error(function(err){
    console.log(err);
  })
  $scope.getList = function(query){
    return listitems;
    var returnValue = {};
    listitems.forEach(function(item){
        console.log(item);
        if (item.m_airport_nama.indexOf(query) > -1 ){
            returnValue.push(item);
        }
        else if (item.m_airport_code.indexOf(query) > -1 ){
            returnValue.push(item);
        }
    });
    console.log(returnValue);
    return returnValue;
    /*listitems.forEach(function(item){

    })
    console.log(listitems);*/
  }

  $scope.itemsClicked = function (callback) {
    $scope.clickedValueModel = callback;
  };
  $scope.itemsRemoved = function (callback) {
    $scope.removedValueModel = callback;
  };
}])

app.controller('PaymentPesawatStepCtrl',  ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', 'ionicDatePicker', function($rootScope, $scope, Payment, $ionicPopup, $timeout, ionicDatePicker) {
  $scope.step_1 = [];
  $scope.searchProperties = ['m_airport_code', 'm_airport_nama'];

  Payment.getAirportList()
  .success(function(suc){
    $scope.airport = suc.data;
    console.log(suc);
    console.log(  $scope.airport);
  })
  .error(function(error){
    console.log(error);
  })

  $scope.setberangkat = function(newValue){
    $scope.step_1.dari = newValue.m_airport_code;
  }
  $scope.setdatang = function(newValue){
    $scope.step_1.tujuan = newValue.m_airport_code;
  }

  var now = new Date();
  var twoYr = new Date();
  twoYr.setYear(now.getFullYear() + 2);
  var future = twoYr.toString();


  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      weeksList: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
      monthsList: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      inputDate: new Date(),      //Optional
      from: new Date(),
      to: future,
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'modal'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

}])

app.controller('PaymentKeretaCtrl',  ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {

  $scope.itemsClicked = function (callback) {
    $scope.clickedValueModel = callback;
  };
  $scope.itemsRemoved = function (callback) {
    $scope.removedValueModel = callback;
  };
}])

app.controller('PaymentKeretaCtrl',  ['$rootScope', '$scope', 'Payment', '$ionicPopup', '$timeout', function($rootScope, $scope, Payment, $ionicPopup, $timeout) {

}])



/* ebook controller */
app.controller('EbookCtrl', ['$rootScope', '$scope', '$ionicLoading', '$ionicSlideBoxDelegate', '$cordovaFile', 'Ebooks', 'AuthService', function($rootScope, $scope, $ionicLoading, $ionicSlideBoxDelegate, $cordovaFile, Ebooks, AuthService) {	
	$scope.items = [];
	$scope.xf = [];
	$scope.times = 0 ;
	$scope.postsCompleted = false;
	$scope.page = 1;
	$scope.numPosts = 50;

	$rootScope.mainmenu = "show";
	// $ionicNavBarDelegate.showBackButton(false);

	var auth = AuthService.isAuthenticated(); 
	if(auth != false){
		$rootScope.showmenu = "show";
	}


	// Called to navigate to the main app
	$scope.next = function() {
	$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
	$ionicSlideBoxDelegate.previous();
	};

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
	$scope.slideIndex = index;
	};

	$scope.downloadpdf = function(urlpath, filename)
	{
		var url = urlpath;
	    var targetPath = cordova.file.dataDirectory + filename +".pdf";
	    var trustHosts = true;
	    var options = {};

	    $ionicLoading.show({template: "start download pdf", duration:500});
	    
	    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
	      .then(function(result) {
	        $ionicLoading.show({template: "Download Ebook Success", duration:2000});
	        // $scope.pdfUrl = cordova.file.dataDirectory + filename + '.pdf';
	        

	      }, function(err) {
	        $ionicLoading.show({template: "Download Ebook Error", duration:2000});

	      }, function (progress) {
	        $timeout(function () {

	          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
	          $ionicLoading.show({template: "Download Ebook "+ Math.floor($scope.downloadProgress) + " %"});
	          //console.log($scope.downloadProgress);
	        });
	      });
	}
	

	

    
	// load more content function
	$scope.loadData = function(){

		Ebooks.getlist($scope.page)
		.success(function(posts){
			console.log(posts.data);

			if(posts.kode == "200"){
				// $scope.blogs = suc.data;
				
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.times = $scope.times + 1;
				$scope.page = $scope.page + 1;
				$ionicSlideBoxDelegate.update();
				
				$scope.items =  $scope.items.concat(posts.data);

				if($scope.times >= 4) {
					$scope.postsCompleted = true;
				}
			}else{
				$scope.postsCompleted = true;
			}
			
		})
		.error(function(err){
			
		});

	}

	

	$scope.loadData();

	// pull to refresh buttons
	$scope.doRefresh = function(){
		$scope.times = 0 ;
		$scope.items = [];
		$scope.page = 1;
		$scope.postsCompleted = false;
		$scope.loadData();
		$scope.$broadcast('scroll.refreshComplete');
	}
}]);


/* ebook detail controller */
app.controller('EbookreadCtrl', ['$rootScope', '$scope', '$ionicHistory', '$state', '$timeout','$cordovaFileTransfer','$ionicLoading', '$cordovaFile', 'Ebooks', 'AuthService',  function($rootScope, $scope, $ionicHistory, $state, $timeout, $cordovaFileTransfer, $ionicLoading, $cordovaFile, Ebooks, AuthService) {	
	
	
	$scope.items = [];
	$scope.headertitle = 'Read Ebook';
	$rootScope.mainmenu = "show";
	$scope.scroll = 0;
  	$scope.loading = 'loading';
	// $ionicNavBarDelegate.showBackButton(false);

	var auth = AuthService.isAuthenticated(); 
	if(auth != false){
		$rootScope.showmenu = "show";
	}

	
	// $scope.pdfUrl =  'data/BUKU PANDUAN AZARIA-OKE.pdf';
	$scope.httpHeaders = { Authorization: 'Bearer some-aleatory-token' };
	// $scope.pdfUrl = cordova.file.dataDirectory + $state.params.link + '.pdf';

	
	$scope.getNavStyle = function(scroll) {
    	if(scroll > 100) return 'pdf-controls fixed';
	    else return 'pdf-controls';
	}

	$scope.onError = function(error) {
	    //alert(JSON.stringify(error));
	    $ionicLoading.show({template: "Error Load Ebook", duration:2000});
	}

	$scope.onLoad = function() {
	    $scope.loading = '';
	    $ionicLoading.show({template: "Load Ebook", duration:2000});
	}

	$scope.onProgress = function(progress) {
		// console.log(progress);
	    $ionicLoading.show({template: "Load Ebook"});
	}	
	
	
	$scope.downloadpdf = function(urlpath, filename)
	{
		var url = urlpath;
	    var targetPath = cordova.file.dataDirectory + filename +".pdf";
	    var trustHosts = true;
	    var options = {};
	    
	    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
	      .then(function(result) {
	        $ionicLoading.show({template: "Download Ebook Success", duration:2000});
	        $scope.pdfUrl = cordova.file.dataDirectory + filename + '.pdf';
	        

	      }, function(err) {
	        $ionicLoading.show({template: "Download Ebook Error", duration:2000});

	      }, function (progress) {
	        $timeout(function () {

	          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
	          $ionicLoading.show({template: "Download Ebook "+ Math.floor($scope.downloadProgress) + " %"});
	          //console.log($scope.downloadProgress);
	        });
	      });
	}

	
   

    // console.log($state.params.link);
	// load more content function
	$scope.loadData = function(){
		$ionicLoading.show({template: "Load Data Ebook"});
		Ebooks.getDetail($state.params.link)
		.success(function(posts){
			$ionicLoading.show({template: "Load Data Ebook Success", duration:3000});
			if(posts.kode == "200"){
				// $scope.blogs = suc.data;
				$scope.items =  posts.data;
				$scope.headertitle = posts.data.title;
				// $scope.pdfUrl =  'data/BUKU PANDUAN AZARIA-OKE.pdf';
				$cordovaFile.checkFile(cordova.file.dataDirectory, $state.params.link + '.pdf')
				.then(function (success) {
					
				    $scope.pdfUrl = cordova.file.dataDirectory + $state.params.link + '.pdf';
				}, function (error) {
					
				    $scope.downloadpdf( $scope.items.file, $state.params.link);
				});
				
			}
			
		})
		.error(function(err){
			
		});

	}

	$scope.loadData();	

	
	
}]);