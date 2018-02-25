angular.module('mobsocial.products')
.factory('Products', ['$http', 'APISERVER', function($http, APISERVER) {
	var data = {};
	data.getPosts = function (page, search) {
		return $http(
			{
				method: 'GET', 
				url:APISERVER.URL + "/product/index/?page="+page+"&search="+search,
                headers: {'Content-Type': 'application/json'},
			}
		);
	}
	data.getPostsDetail = function (id) {
		return $http(
			{
				method: 'GET', 
				url:APISERVER.URL + "/product/detail/"+id,
                headers: {'Content-Type': 'application/json'},
			}
		);
	}
  	return data;
}]);