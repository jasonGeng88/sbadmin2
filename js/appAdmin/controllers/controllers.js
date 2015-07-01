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
            console.log(data.info);
            if (data.info.roleid==41) {
              var infostr=JSON.stringify(data.info);
              $location.path("/station/index").search({uname:$scope.uname,mlist:infostr});
            };
            if (data.info.roleid==42) {
              var infostr=JSON.stringify(data.info);
              $location.path("/finance/index").search({uname:$scope.uname,mlist:infostr});
            };
          };
        }).
        error(function(data, status, headers, config) {
          console.log('error!');
          $scope.error='操作失败！';
        });
    };
    // var entraPro=clickEvent.getAttribute('_entrancepro');
    // var entraPro=$(this).attr('_entrancepro');
    // alert(entraPro);
  }
});
//网点index
app.controller('StationIndexCtrl',function($scope,$http,$location,userInfoService) {
  console.log(userInfoService.mlist);
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  $scope.entrance=function(e){
    var category=e.target.getAttribute('_categoryDetail');
    console.log(category);
    $location.path("/station/"+category).search({uname:$scope.uname,mlist:$scope.mliststr});
  }
});
//网点today
app.controller('StationTodayCtrl',function($scope,$http,$location,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  console.log($scope.mlist.stationId);
  var data={stationid:$scope.mlist.stationId};
  $http.post(apiIp+'/GetXiaogeInfo',data).
    success(function(data, status, headers, config) {
      console.log(data);
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.xgsummary=data.info;
      };
    }).
    error(function(data, status, headers, config) {
      console.log('error');
      $scope.error='操作失败！';
    });
});
//网点小哥明细
// app.controller('StationDetailCtrl',function($scope,$http,$location,userInfoService){
//   $scope.mlist=userInfoService.mlist;
//   $scope.mliststr=userInfoService.mliststr;
//   $scope.uname=userInfoService.uname;
// });
app.controller('StationDetailCtrl',function($scope,$http,$location,$routeParams,$timeout,userInfoService){
  console.log($routeParams);
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
  //获取小哥订单所有订单
  var data={
          userId:$routeParams.userid,
          stationId:userInfoService.mlist.stationId,
      };
  console.log(data);
  $http.post(apiIp+'/GetOrderInfo',data).
    success(function(data){
      console.log(data);
      if (data.status==0) {
        $scope.error=data.info;
      } else if (data.status==1) {
        $scope.orderInfo=data.info;
      };
    }).
    error(function(data){
      console.log('error');
      $scope.error='操作失败！';
    });
  //日历
  $scope.datetimepicker=function(){
    $('.form_date').datetimepicker({
      format:  'yyyy-MM-dd',
      language:  'fr',
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      minView: 2,
      forceParse: 0
    });
  }
  //纸质代金券提交
  $scope.paperSubmit=function(index){
    var orderid=$("input[name='orderid']")[index].value;
    var ctime=document.getElementsByName('ctime')[index].innerHTML;
    console.log(ctime);
    var amount=$("input[name='amount']")[index].value;
    var realamount=$("input[name='realamount']")[index].value;
    var startvaltime=$("input[name='startvaltime']")[index].value;
    var endvaltime=$("input[name='endvaltime']")[index].value;
    var data={
            'orderid': orderid,
            'stationid': userInfoService.mlist.stationId,
            'amount': amount,
            'realamount': realamount,
            'starttime': startvaltime,
            'createtime': ctime,
            'endtime': endvaltime,
            'operatorid': $routeParams.userid,
        };
    console.log(data);
    
    $http.post(apiIp+'/InputPaperCoupon',data).
      success(function(data){
        console.log(data);
        if (data.status==0) {
          $scope.pinfo=data.info;
          $scope.notify='danger';
        } else if (data.status==1) {
          $scope.pinfo=data.info.info;
          $scope.notify='success';
          $scope.pcoupon=data.info.price;
          $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 //enter key
            $('.modal').trigger(e);
          },500);
        };
      }).
      error(function(data){
        console.log('error');
        $scope.notify='danger';
        $scope.pinfo='操作失败！';
      });
  }
  //质疑
  $scope.problemSubmit=function(index){
    var orderid=$("input[name='orderid']")[index].value;
    var problemDescribe=$("textarea[name='problemDescribe']")[index].value;
    var data={
            'orderid' : orderid,
            'stationid' : userInfoService.mlist.stationId,
            'operatorid': $routeParams.userid,
            'mark' : problemDescribe,
            'roleid' : userInfoService.mlist.roleid,
          };
    console.log(data);
    $http.post(apiIp+'/InputProblemBill',data).
      success(function(data){
        console.log(data);
        if (data.status==0) {
          console.log(data.info);
          $scope.qinfo=data.info;
          $scope.notify='danger';
        } else if (data.status==1) {
          console.log(data.info);
          $scope.qinfo=data.info;
          $scope.infosbt='已提交';
          $scope.notify='success';
          $timeout(function(){
            //keydown事件可以模拟
            e = jQuery.Event("keydown");
            e.which = 27 //enter key
            $('.modal').trigger(e);
          },500);
        };
      }).
      error(function(data){
        console.log('error');
        $scope.notify='danger';
        $scope.qinfo='操作失败！';
      });
    }
});
//网点history
app.controller('StationHistoryCtrl',function($scope,$http,$location,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
});
//财务index
app.controller('FinanceIndexCtrl',function($scope,$http,$location,userInfoService){
  $scope.mlist=userInfoService.mlist;
  $scope.mliststr=userInfoService.mliststr;
  $scope.uname=userInfoService.uname;
});




