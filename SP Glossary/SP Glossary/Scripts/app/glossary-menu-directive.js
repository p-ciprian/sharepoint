(function (angular) {

    var directiveId = "userCanEdit";

    var directive =
        function () {
            return {
                restrict: 'A',
                scope: {
                    userCanEdit: "="
                },
                link: function (scope, $elm, attrs) {
                    scope.$watch("userCanEdit", function (newValue, oldValue) {
                        if (newValue !== oldValue && newValue) {

                            var hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
                            var appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
                        
                            var linkString0 = "<li class='ms-core-suiteLink'> \
                               <a class='ms-core-suiteLink-a' href='" + appweburl + "/Pages/Instructions.aspx' >Instructions</a> \
                            </li>";                          

                            var linkString1 = "<li class='ms-core-suiteLink'> \
                               <a class='ms-core-suiteLink-a' href='Settings.aspx?SPHostUrl=" + hostweburl + "&SPLanguage=en%2DUS&SPClientTag=0&SPProductNumber=15%2E0%2E4787%2E1000&SPAppWebUrl=" + appweburl +"'>Settings</a> \
                            </li>";

                            var linkString2 = "<li class='ms-core-suiteLink'> \
                               <a class='ms-core-suiteLink-a' href='" + appweburl + "/Lists/Terms/AllItems.aspx' >Edit Terms</a> \
                            </li>";


                            $('.ms-core-suiteLinkList').prepend(linkString0);

                            $('.ms-core-suiteLinkList').prepend(linkString1);

                            $('.ms-core-suiteLinkList').prepend(linkString2);
                        }
                    });
                }
            }
        };

    angular.module("app").directive(directiveId, directive);

}(angular = angular || window.angular));