
app.service('AuthService', ['$http','APISERVER', function($http,  APISERVER) {
  var LOCAL_TOKEN_KEY = '4Luu3i330';
  var LOCAL_TOKEN_ID = '4Luu3i330ID';
  var username = '';
  var id = '';
  // var isAuthenticated = false;
  var role = '';
  var authToken;

  var login = function(userData) {
    userData.token = localStorage.device_token_syt;
    userData.lat = localStorage.lat;
    userData.long = localStorage.long;

    serialize = function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      
      return str.join("&");
    }
    return $http(
          {
              method: 'POST',
              url: APISERVER.URL + "/login/loginandroid",
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data : serialize(userData),
          }
    );
  };

  var logout = function(){
      return localStorage.authlogin = false;
  };

  var isAuthenticated = function(){
    if( localStorage.authlogin != undefined ){
      // console.log(localStorage.authlogin);
      // alert(localStorage.authlogin);
      auth = JSON.parse(localStorage.authlogin);
      // console.log(auth.username);
      if(auth.username != undefined){
        if(auth.username.length > 0){
          return auth.username;
        }else{
          return false;
        }
      }else{
          return false;
        }


    }
    else
    {
      return false;
    }


  }


  return {
    login: login,
    // savesetting: savesetting,
    logout: logout,
    // isAuthorized: isAuthorized,
    isAuthenticated: isAuthenticated,
    username: function() {return username;},
    role: function() {return role;},
    id: function() {return id;},
    // getBlog : getBlog,
  };

}]);



app.service('NewService', ['$http','APISERVER', function($http,  APISERVER) {


  var getNews = function(page) {

    return $http(
          {
              method: 'GET',
              url: APISERVER.URL + "/blog?page="+page,
              headers: {'Content-Type': 'application/json'},
          }
    );
  };

  var getNewsDetail = function(id) {

    return $http(
          {
              method: 'GET',
              url: APISERVER.URL + "/blog/detail/" + id,
              headers: {'Content-Type': 'application/json'},
          }
    );
  };

  var saveNews = function(){
      return $http(
          {
              method: 'POST',
              url: APISERVER.URL + "/login",
              headers: {'Content-Type': 'application/json'},
              data : userData,
          }
      );
  };




  return {
    getNews: getNews,
    saveNews: saveNews,
    getNewsDetail : getNewsDetail,
  };

}]);
