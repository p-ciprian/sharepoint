(function (angular) {

    var directiveId = "scrollTo";

    var directive =
        function () {
            return {
                restrict: 'A',
                scope: {
                    scrollTo: "@"
                },
                link: function (scope, $elm, attrs) {

                    var idToScroll = scope.scrollTo;
                    $elm.on('click', function () {
                        if (document.getElementById(idToScroll)) {
                            $("#s4-workspace").animate({ scrollTop: document.getElementById(idToScroll).offsetTop }, "slow", "swing", null);
                        }
                    });
                }
            }
        };

    angular.module("app").directive(directiveId, directive);

}(angular = angular || window.angular));