app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('yesterday', function () {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        template : '<span>{{yesTime}}</span>',
        link : function(scope,element,attrs){
            var time = Date.parse(new Date().toLocaleDateString()); 
            var time = time-24*60*60*1000;
            var date = new Date(time); 
            var datetime = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
            scope.yesTime = datetime;    
            // var datetime = "Now: " + date.getDate() + "/"
            //     + (currentdate.getMonth()+1)  + "/" 
            //     + currentdate.getFullYear() + " @ "  
            //     + currentdate.getHours() + ":"  
            //     + currentdate.getMinutes() + ":" 
            //     + currentdate.getSeconds();
        }
    }
});