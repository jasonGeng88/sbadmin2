angular.module('app', [], function($compileProvider){
    $compileProvider.directive("dynamicFormInput", ['$http', '$templateCache',
        function($http, $templateCache) {
            return {
                restrict : 'E',
                scope : {
                    model : '=',
                    section : '='
                },
                template : '<ng:include src="tpl"></ng:include>',
                link : function(scope, iElement, iAttrs) {
                    switch(scope.section.sectionTypeId) {
                        case 1:
                            $http.get('partials/survey/textInput.html', {
                                cache : $templateCache
                            });
                            scope.tpl = "partials/survey/textInput.html";
                            break;
                        case 2:
                            $http.get('partials/survey/selectOneOption.html', {
                                cache : $templateCache
                            });
                            scope.tpl = "partials/survey/selectOneOption.html";
                            break;
                        case 3:
                            $http.get('partials/survey/multiSelectOption.html', {
                                cache : $templateCache
                            });
                            scope.tpl = "partials/survey/multiSelectOption.html";
                            break;
                        case 4:
                            $http.get('partials/survey/boolean.html', {
                                cache : $templateCache
                            });
                            scope.tpl = "partials/survey/boolean.html";
                            break;
                        case 5:
                            $http.get('partials/survey/multiSelectOption.html', {
                                cache : $templateCache
                            });
                            scope.tpl = "partials/survey/multiSelectOption.html";
                            break;
                        case 6:
                            if (scope.section.sectionId == 19) {
                                $http.get('partials/survey/addressSelection.html', {
                                    cache : $templateCache
                                });
                                scope.tpl = "partials/survey/addressSelection.html";
                            }
                            break;
                    }
                }
            }
        }]);