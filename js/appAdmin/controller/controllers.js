//登录
app.controller('LoginCtrl',function($scope,$http,$location) {
  $scope.src=apiIp+'/GetCode?'+Math.random();
  $scope.changeCode=function(){
    $scope.src=apiIp+'/GetCode?'+Math.random();
  };
  //记住密码
  $http.get(apiIp+'/RememberMe').
  success(function(data){
    if (data.status==1) {
      $scope.username=data.info.username;
      $scope.passwd=data.info.passwd;
      $scope.remember=data.info.remember;
    };
  });
  $scope.submit=function(){
    var data={
              username:$scope.username,
              passwd:$scope.password,
              code:$scope.code,
              remember:$scope.remember
    }
    $http.post(apiIp+'/GetLogin',data).
    success(function(data, status, headers, config) {
      console.log(data);
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.name=data.info.name;
        console.log(data.info.res);
        console.log(data.info.name);
        var infostr=JSON.stringify(data.info.res);
        // $location.path("/category").search({info: [111,222],name: 333});
        $location.path("/category").search({info: infostr,name: data.info.name});
      };
      
    }).
    error(function(data, status, headers, config) {
      $scope.error='登录失败！';
    });
  };
});
//目录
app.controller('CategoryCtrl',function($scope,$http,$location) {
  console.log($location.search().name);
  $scope.roleids=JSON.parse($location.search().info);
  $scope.uname=$location.search().name;
  $scope.entrance=function(e){
    var roleid=e.target.getAttribute('_entrancepro');
    console.log(roleid);
    if (roleid==45) {
      $http.post(apiIp+'/GetFinance').
        success(function(data, status, headers, config) {
          console.log(data);
          if (data.status==0) {
            $scope.error=data.info;
          } else if (data.status==1) {
            if (data.info.roleid==41) {
              var infostr=JSON.stringify(data.info);
              $location.path("/station/index").search({mlist: infostr,uname:$scope.uname});
            };
          };
        }).
        error(function(data, status, headers, config) {
          console.log(data);
          $scope.error='操作失败！';
        });
    };
    // var entraPro=clickEvent.getAttribute('_entrancepro');
    // var entraPro=$(this).attr('_entrancepro');
    // alert(entraPro);
  }
});
//网点index
app.controller('StationIndexCtrl',function($scope,$http,$location) {
  $scope.mlist=JSON.parse($location.search().mlist);
  $scope.mliststr=$location.search().mlist;
  console.log($scope.mlist);
  $scope.uname=$location.search().uname;
  $scope.entrance=function(e){
    var category=e.target.getAttribute('_categoryDetail');
    console.log(category);
    $location.path("/station/"+category).search({uname:$scope.uname,mlist:$scope.mliststr});
  }
});
//网点today
app.controller('StationTodayCtrl',function($scope,$http,$location){
  $scope.mlist=JSON.parse($location.search().mlist);
  $scope.mliststr=$location.search().mlist;
  console.log($scope.mliststr);
  $scope.uname=$location.search().uname;
  console.log($scope.mlist.stationId);
  var data={stationid:$scope.mlist.stationId};
  $http.post(apiIp+'/GetXiaogeInfo',data).
    success(function(data, status, headers, config) {
      console.log(data);
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.xgsummary=data.info;
        $scope.ss=JSON.stringify(data.info);
      };
    }).
    error(function(data, status, headers, config) {
      console.log('error');
      $scope.error='操作失败！';
    });
  $scope.dataTableSort=function(){
    console.log($scope.xgsummary);
  }
});
//网点history
app.controller('StationHistoryCtrl',function($scope,$http,$location){
  $scope.mlist=JSON.parse($location.search().mlist);
  $scope.mliststr=$location.search().mlist;
  console.log($scope.mlist);
  $scope.uname=$location.search().uname;
});




