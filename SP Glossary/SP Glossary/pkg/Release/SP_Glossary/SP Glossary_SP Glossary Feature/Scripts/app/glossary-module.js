(function (angular) {
    var oppModule = angular.module('app', []);
}(angular = angular || window.angular));

$(document).ready(function () {
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});