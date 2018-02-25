
app.factory('SocialData', function(){
    var data = {};

    data.items = [
        {
            title: 'Facebook',
            icon: 'ion-social-facebook',
                url: 'http://www.facebook.com/weblogtemplates'
        },
        {
            title: 'Twitter',
            icon: 'ion-social-twitter',
                url: 'http://twitter.com/weblogtemplates'
        },
        {
            title: 'Pinterest',
            icon: 'ion-social-pinterest',
                url: 'http://twitter.com/weblogtemplates'
        },
        {
            title: 'Linkedin',
            icon: 'ion-social-linkedin',
                url: 'http://twitter.com/weblogtemplates'
        },
        {
            title: 'Github',
            icon: 'ion-social-github',
                url: 'http://twitter.com/weblogtemplates'
        },
        {
            title: 'Google +',
            icon: 'ion-social-googleplus',
                url: 'http://twitter.com/weblogtemplates'
        }
    ];

    return data;
})
// Home Data: Home page configuration
app.factory('VideoData', function(){
    var data = {};
    data.feed = "https://www.youtube.com/feeds/videos.xml?channel_id=UCYVLTQtdpevObfW8T23yhrA";
    data.items = [
        {
            title: 'Justin Bieber - All That Matters',
            video: 'https://www.youtube.com/embed/JC2yu2a9sHk',
        },
        {
            title: 'Justin Bieber - Confident ft. Chance The Rapper',
            video: 'https://www.youtube.com/embed/47YClVMlthI',
        },
        {
            title: 'Tori Kelly - Dear No One',
            video: 'https://www.youtube.com/embed/njmCUJ94lUM',
        },
        {
            title: 'Katty Perry Roar',
            video: 'https://www.youtube.com/embed/CevxZvSJLk8',
        }
    ];



    return data;
})
// Home Data: Home page configuration
app.factory('PostData', function(){
    var postMain = "";
        postMain += "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>";
    postMain += "<ul><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Vestibulum auctor dapibus neque.</li></ul>";
        postMain += "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>";
        postMain += "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>";

   return postMain;
})
// feeds
app.factory('Blog', ['$http', 'Config', function($http, Config) {
    var data = {};
    data.getPosts = function () {
        return $http(
            {
                method: 'GET', url:Config.ApiUrl
            }
            
        );
    }
    return data;
}]);
// posts from a demo url
app.factory('Photos',['$http', 'Config', function($http, Config) {
    var data = {};
    data.feed = 'http://photos.googleapis.com/data/feed/api/user/101877598714056160754/albumid/6161150888092463969?alt=rss';
    data.getPosts = function () {
        return $http(
            {
                method: 'GET', url:Config.PhotoUrl
            }
        );
    }
    return data;
}]);
// comments factory -- fetching comments from an api -- just sample api
//
app.factory('Comments',['$http', 'Config', function($http, Config) {
    var data = {};
    data.getComments = function () {
        return $http(
            {
                method: 'GET', url:Config.CommentUrl
            }
        );
    }
    return data;
}]);
// friends factory
app.factory('Friends',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};
    data.getFriends = function (userid, page, order) {
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/member/getmember/"+userid + "?page="+page + "&order="+order,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    }
    return data;
}]);

app.factory('ProfilFriends',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};
    data.getData = function (userid) {

        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/users/"+userid ,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    }
    return data;
}]);

// friends factory
app.factory('Bonus',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};
    data.getBonus = function (userid, page) {
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/bonus/getdata/"+userid + "?page="+page,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    }
    return data;
}]);

// friends factory
app.factory('Resi',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};
    data.getResi = function (userid, page) {
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/resi/getdata/"+userid + "?page="+page,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    }
    return data;
}]);

// friends factory
app.factory('Hobbi',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};
    data.getHobbi = function (userid, page) {
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/profil/get_hobbi",
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    }
    data.saveHobbi = function (userid, bh) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.URL + "/profil/save_hobbi",
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
                data : {'userid' : userid, "hobbi" : bh.id},
            }
        );
    }
    return data;
}]);

// friends factory
app.factory('Contact',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};
    data.sendContact = function (postData) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.URL + "/contact",
                headers: {'Content-Type': 'application/json'},
                data : postData,
            }
        );
    }
    return data;
}]);

// friends factory
app.factory('Stockist',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};
    data.getConfig = function (iduser) {
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/stockist/order/"+iduser,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    };
    data.saveOrder = function (iduser, postData) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.URL + "/stockist/order_save/"+iduser,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
                data : {"user" : postData},
            }
        );
    };
    data.getMember = function (iduser, status, page, order) {
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/stockist/"+iduser+'/'+status + '?&page='+page + '&order='+order,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    };
    data.getExecMember = function (iduser, status, idstock) {
        // console.log(APISERVER.URL + "/stockist/"+status+'/'+iduser + '/'+idstock);
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/stockist/"+status+'/'+iduser + '/'+idstock,
                headers: {'Content-Type': 'application/json', 'X-Access-Token' : localStorage.tokepapp},
            }
        );
    };
    return data;
}]);



app.factory('Features', function(){
    var data = {};

    data.items = [
        {
            title: 'Profile',
            icon: 'ion-person',
            url: '#/app/profile'
        },
          {
            title: 'Friends',
            icon: 'ion-ios-people',
            url: '#/app/friends'
        },
          {
            title: 'WordPress Blog',
            icon: 'ion-social-wordpress',
            url: '#/wordpress/blog'
        },
        {
            title: 'Products',
            icon: 'ion-bag',
            url: '#/app/products'
        },
          {
            title: 'Messages',
            icon: 'ion-chatboxes',
            url: '#/app/messages'
        },
          {
            title: 'Message',
            icon: 'ion-chatbox',
            url: '#/app/message'
        },
        {
            title: 'Gallery',
            icon: 'ion-images',
            url: '#/app/gallery'
        },
        {
            title: 'Pembelian/Pembayaran',
            icon: 'ion-cash',
            url: '#/app/payment'
        },
        {
            title: 'E-Wallet',
            icon: 'ion-cube',
            url: '#/app/ewallet'
        },
        {
            title: 'Videos',
            icon: 'ion-ios-videocam',
            url: '#/app/videos'
        },
        {
            title: 'Blog',
            icon: 'ion-ios-calendar',
            url: '#/app/blog'
        },
          {
            title: 'Article',
            icon: 'ion-ios-paper',
            url: '#/app/post'
        },
        {
            title: 'Contact',
            icon: 'ion-email',
            url: '#/app/contact'
        }
          ,
        {
            title: 'News',
            icon: 'ion-ios-paper',
            url: '#/app/news'
        },
          {
            title: 'Feeds',
            icon: 'ion-social-rss',
            url: '#/app/feedslist'
        },
        {
            title: 'Settings',
            icon: 'ion-ios-gear',
            url: '#/app/settings'
        },
        {
            title: 'About us',
            icon: 'ion-ios-people',
            url: '#/app/about'
        },
          {
            title: 'Admob',
            icon: 'ion-cash',
            url: '#/app/admob'
        },
        {
            title: 'Push Notification',
            icon: 'ion-paper-airplane',
            url: '#/app/push'
        },
        {
            title: 'Intro Template',
            icon: 'ion-ios-help',
            url: '#/app/intro'
        },
          {
            title: 'Social',
            icon: 'ion-heart',
            url: '#/app/socialprofile'
        },
          {
            title: 'Login',
            icon: 'ion-ios-locked',
            url: '#/app/login'
        },
          {
            title: 'Register',
            icon: 'ion-lock-combination',
            url: '#/app/signup'
        }
    ];

    return data;
})
app.factory('PopupSplash', ['$http', 'Config', 'APISERVER', function ($http, Config, APISERVER) {
    var data = {};
    data.getData = function () {
        return $http(
            {
                method: 'GET',
                url: APISERVER.URL + "/home/get_popup/",
                headers: {'Content-Type': 'application/json'},
            }
        );
    };
    
    return data;
}]);
app.factory('myPushNotification', ['$http', 'PushNoti', function ($http, PushNoti) {
  return {
        registerPush: function(fn) { //alert('2');
            var myPushNotification = window.plugins.pushNotification,
            successHandler = function(result) {
                 //alert('result = ' + result);
            },
            errorHandler = function(error) {
                 //alert('error = ' + error);
            };
            if (device.platform == 'android' || device.platform == 'Android') { //alert('asdasd');
                // myPushNotification.unregister(successHandler, errorHandler);
                myPushNotification.register(successHandler, errorHandler, {
                     'senderID': PushNoti.senderID, // **ENTER YOUR SENDER ID HERE**
                     'ecb': 'onNotificationGCM'
                });
          }
        }
  };
}]);
// push notification push to server
app.factory('SendPush',['$http', 'Config', function($http, Config) {
    var SendPush = {};
    SendPush.android = function(token) {
        return  $http({method: "post", url: 'http://www.skyafar.com/tools/push/push.php',
            data: {
                token: token,
            }
        });
    }
    return SendPush;
}]);
// friends factory
app.factory('Messages',['$http', 'Config', function($http, Config) {
    var data = {};
    data.getMesages = function () {
        return $http(
            {
                method: 'GET', url:Config.MessagesUrl
            }
        );
    }
    data.getMessage = function () {
        return $http(
            {
                method: 'GET', url:Config.MessageUrl
            }
        );
    }
    return data;
}]);
// blog feeds
app.factory('Feeds', function($http){
    var data = {};
    data.feed = "http://www.myazaria.com/berita/category/berita/feed";
    data.siba = "http://www.myazaria.com/berita/category/siba/feed";
    data.items = [
        {
            title: 'Huffingtonpost',
            feed: 'http://www.huffingtonpost.com/feeds/index.xml',
        },
        {
            title: 'CNN.com News',
            feed: 'http://rss.cnn.com/rss/cnn_topstories.rss',
        },
        {
            title: 'New York Times Home Page',
            feed: 'http://feeds.nytimes.com/nyt/rss/HomePage',
        },
        {
            title: 'Washington Post: Today\'s Highlights',
            feed: 'http://www.washingtonpost.com/rss/',
        }
    ];

    data.getCoba = function(){
        return $http(
          {
            url: "http://ajax.googleapis.com/ajax/services/feed/load",
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
            data: { params: { "v": "1.0", "q": '"http://www.myazaria.com/berita/category/berita/feed"' } }
          }
        );
        // $http.get("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": '"http://www.myazaria.com/berita/category/berita/feed"' } })
        // .success(function(data) {
        //     console.log(data);
        //     $scope.rssTitle = data.responseData.feed.title;
        //     $scope.rssUrl = data.responseData.feed.feedUrl;
        //     $scope.rssSiteUrl = data.responseData.feed.link;
        //     $scope.entries = data.responseData.feed.entries;
            
        // })
        // .error(function(data) {
        //     console.log("ERROR: " + data);
            
        // });
    }

    return data;
})
//Ewallet factory
app.factory('Ewallet',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
  var data = {};

  serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  data.getData = function (options) {
    return $http(
      {
        method: 'POST',
        url: APISERVER.API_EWALLET + "/get_data",
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
        data: serialize(options)
      }
    );
  }

  data.saveData = function (options) {
    return $http(
      {
        method: 'POST',
        url: APISERVER.API_EWALLET + "/save_data",
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
        data: serialize(options)
      }
    );
  }

  data.findID = function (options) {
    return $http(
      {
        method: 'POST',
        url: APISERVER.API_EWALLET + "/cekmember",
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
        data: serialize(options)
      }
    );
  }

  return data;
}]);

// PulsaPrabayar factory
app.factory('Payment',['$http', 'Config', 'APISERVER', function($http, Config, APISERVER) {
    var data = {};

    serialize = function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    }

    data.getProduct = function (options) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.API_STU + "/get_produk",
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
                data: serialize(options)
            }
        );
    }

    data.doInquiry = function (data) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.API_STU + "/inquiry",
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
                data: serialize(data)
            }
        );
    }

    data.doPayment = function (data) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.API_STU + "/bayar_tagihan",
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
                data: serialize(data)
            }
        );
    }

    data.doTopup = function (data) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.API_STU + "/beli_pulsa",
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
                data: serialize(data)
            }
        );
    }

    data.getAirportList = function (data) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.API_STU + "/get_ListAirport",
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
                data: serialize(data)
            }
        );
    }

    data.getKeretaList = function (data) {
        return $http(
            {
                method: 'POST',
                url: APISERVER.API_STU + "/get_ListStation",
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-Access-Token' : localStorage.tokepapp},
                data: serialize(data)
            }
        );
    }
    return data;
}]);

// Model ebook
app.factory('Ebooks', ['$http', 'APISERVER', function($http, APISERVER) {
    var data = {};
    
    data.getDetail = function (id) {
        return $http(
            {
                method: 'GET', 
                url: APISERVER.URL + "/ebook/detail/"+id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }
        );
    };
    data.getlist = function (page) {
        return $http(
            {
                method: 'GET', 
                url: APISERVER.URL + "/ebook/index/"+page,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }
        );
    };
    return data;
}]);

app.factory('Halaman', ['$http', 'APISERVER', function($http, APISERVER) {
    var data = {};
    
    data.getDetail = function (page) {
        return $http(
            {
                method: 'GET', 
                url: APISERVER.URL + "/home/page/"+page,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }
        );
    };

    data.getNotif = function (id) {
        return $http(
            {
                method: 'GET', 
                url: APISERVER.URL + "/home/notif/"+id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }
        );
    };

    data.getSlide = function () {
        return $http(
            {
                method: 'GET', 
                url: APISERVER.URL + "/home/slide/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }
        );
    };

    data.getProduk = function () {
        return $http(
            {
                method: 'GET', 
                url: APISERVER.URL + "/home/produk/",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            }
        );
    };
    
    return data;
}]);