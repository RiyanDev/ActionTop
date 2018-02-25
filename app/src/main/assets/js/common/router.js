app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    //sidebar
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/sidebar-menu.html"
    })
   //  login page
   .state('app.login', {
      url: "/login",
      cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/login.html",
          controller: "LoginCtrl"
        }
      }
    })
   // Sign up page
   .state('app.signup', {
      url: "/signup",
      views: {
        'menuContent' :{
            templateUrl: "templates/sign-up.html",
          controller: "SignUpCtrl"
        }
      }
    })
   // Sign up page
   .state('app.forgot', {
      url: "/forgot",
      views: {
        'menuContent' :{
            templateUrl: "templates/forgot.html",
          controller: "ForgotCtrl"
        }
      }
    })
   // ebook page
   .state('app.ebook', {
      url: "/ebook",
      // cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/ebook/ebook.html",
          controller: "EbookCtrl"
        }
      }
    })

  // ebook reader page
   .state('app.ebookread', {
      url: "/ebookread/:link",
      // cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/ebook/ebookread.html",
          controller: "EbookreadCtrl"
        }
      }
    })
   // Gallery page
   .state('app.gallery', {
      url: "/gallery",
    cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/gallery.html",
          controller: "GalleryCtrl"
        }
      }
    })
   // Gallery list page
   .state('app.gallerylist', {
      url: "/gallerylist",
    cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/gallery-list.html",
          controller: "GalleryCtrl"
        }
      }
    })
   // Gallery list page
   .state('app.videos', {
      url: "/videos",
    cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/videos.html",
          controller: "VideosCtrl"
        }
      }
    })
   // Blog page
   .state('app.blog', {
      url: "/blog",
    cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/blog.html",
          controller: "BlogCtrl"
        }
      }
    })
   // profile page
   .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
            templateUrl: "templates/profile.html",
          controller: "ProfileCtrl"
        }
      }
    })
   // user profile page
   .state('app.user', {
      url: "/user/:link",
      views: {
        'menuContent' :{
            templateUrl: "templates/profile.html",
          controller: "UserCtrl"
        }
      }
    })
   // profile page
   .state('app.news', {
      url: "/news",
      // cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/news.html",
          controller: "NewsCtrl"
        }
      }
    })
   // profile page
   .state('app.siba', {
      url: "/siba",
      views: {
        'menuContent' :{
            templateUrl: "templates/siba.html",
          controller: "SibaCtrl"
        }
      }
    })
   // friends page
   .state('app.bonus', {
      url: "/bonus",
      views: {
        'menuContent' :{
            templateUrl: "templates/bonus.html",
          controller: "BonusCtrl"
        }
      }
    })
   // friends page
   .state('app.resi', {
      url: "/resi",
      views: {
        'menuContent' :{
            templateUrl: "templates/resi.html",
          controller: "ResiCtrl"
        }
      }
    })
   // registrasi associate page
   .state('app.associate', {
      url: "/associate",
      views: {
        'menuContent' :{
            templateUrl: "templates/associate.html",
          controller: "AssociateCtrl"
        }
      }
    })
   // friends page
   .state('app.friends', {
      url: "/friends",
      views: {
        'menuContent' :{
            templateUrl: "templates/friends.html",
          controller: "FriendsCtrl"
        }
      }
    })
  .state('app.post', {
      url: "/post/:link",
      views: {
        'menuContent' :{
            templateUrl: "templates/post.html",
          controller: "PostCtrl"
        }
      }
    })
  .state('app.postsiba', {
      url: "/postsiba/:link",
      views: {
        'menuContent' :{
            templateUrl: "templates/post.html",
          controller: "PostsibaCtrl"
        }
      }
    })

  // stockist associate page
  .state('app.stockist', {
      url: "/stockist",
      views: {
        'menuContent' :{
            templateUrl: "templates/stockist/dashboard.html",
          controller: "StockistCtrl"
        }
      }
    })
  // stockist associate page
  .state('app.orderstockist', {
      url: "/orderstockist",
      views: {
        'menuContent' :{
            templateUrl: "templates/stockist/order.html",
          controller: "OrderStockistCtrl"
        }
      }
    })
  // stockist associate page
  .state('app.stockistmember', {
      url: "/stockistmember/:link",
      views: {
        'menuContent' :{
            templateUrl: "templates/stockist/member.html",
          controller: "MemberStockistCtrl"
        }
      }
    })

  // stockist associate page
  .state('app.stockistmemberagent', {
      url: "/stockistmemberagent",
      views: {
        'menuContent' :{
            templateUrl: "templates/stockist/order.html",
          controller: "AgentStockistCtrl"
        }
      }
    })

   .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
            templateUrl: "templates/settings.html",
          controller: "SettingsCtrl"
        }
      }
    })
   .state('app.features', {
      url: "/features",
      views: {
        'menuContent' :{
            templateUrl: "templates/features.html",
          controller: "FeaturesCtrl"
        }
      }
    })
  .state('app.contact', {
      url: "/contact",
      views: {
        'menuContent' :{
            templateUrl: "templates/contact.html",
          controller: "ContactCtrl"
        }
      }
    })
   .state('app.about', {
      url: "/about",
      views: {
        'menuContent' :{
            templateUrl: "templates/about.html",
          controller: "AboutCtrl"
        }
      }
    })
   .state('app.static', {
      url: "/static/:link",
      views: {
        'menuContent' :{
            templateUrl: "templates/static/halaman.html",
          controller: "StaticCtrl"
        }
      }
    })
   .state('app.intro', {
      url: "/intro",
      cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/intro.html",
          controller: "IntroCtrl"
        }
      }
    })
   .state('app.shownotif', {
      url: "/shownotif/:link",
      cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/static/halaman.html",
          controller: "ShownotifCtrl"
        }
      }
    })
   .state('app.splash', {
      url: "/splash",
      cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/splash.html",
          controller: "SplashCtrl"
        }
      }
    })
   .state('app.mainmenu', {
      url: "/mainmenu",
      cache : false,
      views: {
        'menuContent' :{
            templateUrl: "templates/mainmenu.html",
          controller: "MainmenuCtrl"
        }
      }
    })
    //E-Wallet
    .state('app.ewallet', {
        url: "/ewallet",
        views: {
           'menuContent' :{
             templateUrl: "templates/ewallet.html",
             controller: "EwalletCtrl"
           }
        }
    })
    .state('app.ewalletinfo', {
        url: "/ewallet/info",
        views: {
           'menuContent' :{
             templateUrl: "templates/ewallet/info.html",
             controller: "EwalletInfoCtrl"
           }
        }
    })
    .state('app.ewalletwithdraw', {
        url: "/ewallet/withdraw",
        views: {
           'menuContent' :{
             templateUrl: "templates/ewallet/withdraw.html",
             controller: "EwalletWithdrawCtrl"
           }
        }
    })
    .state('app.ewallettransfer', {
        url: "/ewallet/transfer",
        views: {
           'menuContent' :{
             templateUrl: "templates/ewallet/transfer.html",
             controller: "EwalletTransferCtrl"
           }
        }
    })
    .state('app.ewallettopup', {
        url: "/ewallet/topup",
        views: {
           'menuContent' :{
             templateUrl: "templates/ewallet/topup.html",
             controller: "EwalletTopupCtrl"
           }
        }
    })
    //Pembelian dan Pembayaran
     .state('app.payment', {
         url: "/payment",
         views: {
            'menuContent' :{
              templateUrl: "templates/payment.html",
              controller: "PaymentCtrl"
            }
         }
     })
     //Pembelian dan Pembayaran --> PPOB --> Tagihan PLN
      .state('app.pln', {
          url: "/payment/pln",
          views: {
             'menuContent' :{
                templateUrl: "templates/payment/pln.html",
                controller: "PaymentPLNCtrl"
             }
          }
      })
      .state('app.pdam', {
          url: "/payment/pdam",
          views: {
             'menuContent' :{
                templateUrl: "templates/payment/pdam.html",
                controller: "PaymentPDAMCtrl"
             }
          }
      })
      .state('app.speedy', {
          url: "/payment/speedy",
          views: {
             'menuContent' :{
                templateUrl: "templates/payment/speedy.html",
                controller: "PaymentSpeedyCtrl"
             }
          }
      })
      .state('app.telepon', {
          url: "/payment/telepon",
          views: {
             'menuContent' :{
                templateUrl: "templates/payment/telepon.html",
                controller: "PaymentTeleponCtrl"
             }
          }
      })
      .state('app.pulsapra', {
          url: "/payment/pulsa_prabayar",
          views: {
             'menuContent' :{
                templateUrl: "templates/payment/pulsa_prabayar.html",
                controller: "PaymentPulsaPraCtrl"
             }
          }
      })
      .state('app.pulsapasca', {
          url: "/payment/pulsa_pascabayar",
          views: {
             'menuContent' :{
                templateUrl: "templates/payment/pulsa_pascabayar.html",
                controller: "PaymentPulsaPascaCtrl"
             }
          }
      })
      .state('app.pesawat', {
          url: "/payment/tiket_pesawat",
          views: {
             'menuContent' :{
                templateUrl: "templates/payment/tiket_pesawat.html",
                controller: "PaymentPesawatCtrl"
             }
          }
      })
      .state('app.pesawat_step1', {
        url: "/payment/tiket_pesawat/step_1",
        views: {
          'menuContent' :{
            templateUrl: "templates/payment/pesawat/step_1.html",
            controller: "PaymentPesawatStepCtrl"
          }
        }
      })
      .state('app.pesawat_step2', {
        url: "/payment/tiket_pesawat/step_2",
        views: {
          'menuContent' :{
            templateUrl: "templates/payment/pesawat/step_2.html",
            controller: "PaymentPesawatCtrl"
          }
        }
      })
      .state('app.pesawat_step3', {
        url: "/payment/tiket_pesawat/step_3",
        views: {
          'menuContent' :{
            templateUrl: "templates/payment/pesawat/step_3.html",
            controller: "PaymentPesawatCtrl"
          }
        }
      })
   .state('app.socialprofile', {
      url: "/socialprofile",
      views: {
        'menuContent' :{
            templateUrl: "templates/social-profile.html",
          controller: "SocialProfileCtrl"
        }
      }
    })
   .state('app.push', {
      url: "/push",
      views: {
        'menuContent' :{
            templateUrl: "templates/push.html",
          controller: "PushCtrl"
        }
      }
    })
   .state('app.admob', {
      url: "/admob",
      views: {
        'menuContent' :{
            templateUrl: "templates/admob.html",
          controller: "AdmobCtrl"
        }
      }
    })
   .state('app.messages', {
      url: "/messages",
      views: {
        'menuContent' :{
            templateUrl: "templates/messages.html",
          controller: "MessagesCtrl"
        }
      }
    })
   .state('app.message', {
      url: "/message",
      views: {
        'menuContent' :{
            templateUrl: "templates/message.html",
          controller: "MessageCtrl"
        }
      }
    })
   .state('app.feedslist', {
      url: "/feedslist",
      views: {
        'menuContent' :{
            templateUrl: "templates/feeds-list.html",
          controller: "FeedsListCtrl"
        }
      }
    })
   .state('app.feed', {
      url: "/feed",
      views: {
        'menuContent' :{
            templateUrl: "templates/feed.html",
          controller: "FeedCtrl"
        }
      }
    })
   .state('app.feedsingle', {
      url: "/feedsingle",
      views: {
        'menuContent' :{
            templateUrl: "templates/feed-single.html",
          controller: "FeedSingleCtrl"
        }
      }
    })
   //sidebar
    .state('wordpress', {
      url: "/wordpress",
      abstract: true,
      templateUrl: "templates/wordpress/sidebar-menu.html"
    })
   // Blog page
   .state('wordpress.blog', {
      url: "/blog",
      views: {
        'menuWorPress' :{
            templateUrl: "templates/wordpress/blog.html",
          controller: "WordpressBlogCtrl"
        }
      }
    })
   .state('wordpress.tag', {
      url: "/tag/:type/:slug",
      views: {
        'menuWorPress' :{
            templateUrl: "templates/wordpress/blog.html",
          controller: "WordpressTagCtrl"
        }
      }
    })
   // articles page wordpress
   .state('wordpress.post', {
      url: "/post",
    cache : false,
      views: {
        'menuWorPress' :{
            templateUrl: "templates/wordpress/post.html",
          controller: "WordpressPostCtrl"
        }
      }
    })
   // categories page wordpress
   .state('wordpress.categories', {
      url: "/categories",
      views: {
        'menuWorPress' :{
            templateUrl: "templates/wordpress/categories.html",
          controller: "WordpressCategoriesCtrl"
        }
      }
    })
   // tags page wordpress
   .state('wordpress.tags', {
      url: "/tags",
      views: {
        'menuWorPress' :{
            templateUrl: "templates/wordpress/tags.html",
          controller: "WordpressTagsCtrl"
        }
      }
    })
   //  login page
    $urlRouterProvider.otherwise("/app/mainmenu");
})
