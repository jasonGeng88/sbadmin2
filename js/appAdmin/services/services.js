app.factory('userInfoService', ['$location',function($location) {
  var mlist=JSON.parse($location.search().mlist);
  console.log(mlist);
  // $scope.mlist=JSON.parse($location.search().mlist);
  var mliststr=$location.search().mlist;
  console.log(mliststr);
  var uname=$location.search().uname;
  console.log(mliststr);
  
  // factory function body that constructs shinyNewServiceInstance
  return {
  	mlist : mlist,
  	mliststr : mliststr,
  	uname : uname
  };
}]);