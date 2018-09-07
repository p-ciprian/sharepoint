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

                            var appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

                            var linkString0 = "<li class='ms-core-suiteLink'> \
                               <a class='ms-core-suiteLink-a' href='" + appweburl + "/Pages/Instructions.aspx' >Instructions</a> \
                            </li>";                          

                            var linkString1 = "<li class='ms-core-suiteLink'> \
                               <a class='ms-core-suiteLink-a' href='" + appweburl + "/Lists/Settings/AllItems.aspx' >Settings</a> \
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