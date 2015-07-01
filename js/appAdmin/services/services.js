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
app.factory('expression', function() {
  var addExpression=function(a,b){
    if (!a) {a=0};
    if (typeof b == 'undefined') {b=0}else{b=1};
    var num=parseInt(a)+parseInt(b);
    return num;
  };
  return {
    specialadd : addExpression
  };
  
});