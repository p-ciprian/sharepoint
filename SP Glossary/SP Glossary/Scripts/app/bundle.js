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
(function (oppModule) {

    var serviceId = "glossaryDataService";

    var oppDataService = ['$http', '$q',
                        function ($http, $q) {

                            var _data = [];
                            var _isInit = false;

                            JSRequest.EnsureSetup();

                            var hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
                            var appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);
                            var listTitle = 'Terms';

                            var _isReady = function () {
                                return _isInit;
                            };

                            var _getContents = function () {

                                var deferred = $q.defer();

                                var restQueryUrl = appweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items?$select=Title,TermDescription&$top=10000";

                                var requestSettings = {
                                    method: 'GET',
                                    url: restQueryUrl,
                                    headers: { "Accept": "application/json; odata=verbose" }
                                };

                                $http(requestSettings)
                                  .then(function (result) {
                                      angular.copy(result.data.d.results, _data);
                                      _isInit = true;
                                      deferred.resolve(result.data.d.results);
                                  },
                                  function () {
                                      deferred.reject();
                                  });

                                return deferred.promise;
                            };

                            var _getSettings = function () {

                                var deferred = $q.defer();

                                var restQueryUrl = appweburl + "/_api/web/lists/getByTitle('Settings')/items?$select=Title,Val&$top=10000";

                                var requestSettings = {
                                    method: 'GET',
                                    url: restQueryUrl,
                                    headers: { "Accept": "application/json; odata=verbose" }
                                };

                                $http(requestSettings)
                                  .then(function (result) {
                                      deferred.resolve(result.data.d.results);
                                  },
                                  function () {
                                      deferred.reject();
                                  });

                                return deferred.promise;
                            };

                            var _getUserAcceess = function () {

                                var deferred = $q.defer();

                                var restQueryUrl = appweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/effectiveBasePermissions";

                                var requestSettings = {
                                    method: 'GET',
                                    url: restQueryUrl,
                                    headers: { "Accept": "application/json; odata=verbose" }
                                };

                                $http(requestSettings)
                                  .then(function (data) {
                                      var permissions = new SP.BasePermissions();
                                      permissions.fromJson(data.data.d.EffectiveBasePermissions);
                                      var hasPermission = permissions.has(SP.PermissionKind.manageLists);

                                      deferred.resolve(hasPermission);
                                  },
                                  function () {
                                      deferred.reject();
                                  });

                                return deferred.promise;
                            };

                            var svc = {
                                data: _data,
                                getContents: _getContents,
                                getSettings: _getSettings,
                                getUserAccess: _getUserAcceess,
                                isReady: _isReady
                            };

                            return svc;
                        }];

    oppModule.factory(serviceId, oppDataService);
}(oppModule = angular.module("app")));




(function (angular) {

    var filterId = "searchTerm";

    var filter =
        function ($filter) {
            return function (items, searchTerm) {

                if (searchTerm && searchTerm.length > 0) {

                    var filteredGroups = [];

                    angular.forEach(items, function (obj) {

                        var filteredTerms = [];

                        angular.forEach(obj.value, function (term) {

                            var termName = term.Title.toLowerCase();
                            var termDesc = term.TermDescription.toLowerCase();
                            var lowerCaseTerm = searchTerm.toLowerCase();

                            if (termName.indexOf(lowerCaseTerm) > -1 || termDesc.indexOf(lowerCaseTerm) > -1) {
                                filteredTerms.push(term);
                            }
                        });

                        obj.filtered = [];

                        if (filteredTerms.length > 0) {

                            obj.filtered = filteredTerms;

                            filteredGroups.push(obj);

                        }
                    });

                    return filteredGroups;
                }
                else {
                    var filteredGroups = [];

                    angular.forEach(items, function (obj) {
                        obj.filtered = obj.value;
                        filteredGroups.push(obj);
                    });

                    return filteredGroups;
                }
            };
        };

    angular.module("app").filter(filterId, filter);

}(angular = angular || window.angular));
(function (angular) {

    var controllerId = "GlossaryController";

    var oppController = [
        'glossaryDataService', '$sce', '$timeout', '$window',
        function (glossaryDataService, $sce, $timeout, $window) {
            var vm = this;

            vm.rawData = [];

            vm.settings = [];

            vm.groupedData = [];

            vm.userCanEdit = false;

            vm.groupData = function () {

                vm.groupedData = [];

                var i = "a".charCodeAt(0);
                var j = "z".charCodeAt(0);

                for (; i <= j; ++i) {
                    vm.groupedData.push({ name: String.fromCharCode(i).toUpperCase(), value: [] });
                }


                for (i = 0; i < vm.rawData.length; i++) {
                    var letter = vm.rawData[i].Title.charAt(0).toUpperCase();

                    var group = $.grep(vm.groupedData, function (n, i) {
                        return n.name == letter;
                    });

                    if (group.length > 0) {
                        group[0].value.push(vm.rawData[i]);
                    } else {

                        var unknownGroup = $.grep(vm.groupedData, function (n, i) {
                            return n.name == letter;
                        });

                        if (unknownGroup.length > 0) {
                            unknownGroup[0].value.push(vm.rawData[i]);
                        } else {
                            vm.groupedData.push({ name: letter, value: [vm.rawData[i]] });
                        }

                    }
                }
            };

            vm.highlight = function (text, search) {
                if (text) {
                    if (!search) {
                        return $sce.trustAsHtml(text);
                    }
                    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
                }
            };

            vm.init = function () {
                $timeout(function () {
                    if (!$("#glossaryTitle").is(":visible")) {
                        $("#glossaryTitle").show();
                        $(".glossary-main-container").show();
                    }
                }, 500);

                glossaryDataService.getSettings()
                      .then(function (data) {
                          angular.copy(data, vm.settings);

                          var colorValue, colorHover, title;

                          angular.forEach(vm.settings, function (pair) {
                              if (pair.Title.toUpperCase() == "TITLE") {
                                  title = pair.Val;
                              }

                              if (pair.Title.toUpperCase() == "COLOR") {
                                  colorValue = pair.Val;
                              }

                              if (pair.Title.toUpperCase() == "COLORHOVER") {
                                  colorHover = pair.Val;
                              }
                          });

                          $timeout(function () {
                              if (title) {
                                  $("#glossaryTitle").html(title);
                                  $("#glossaryTitle").show();
                              }

                              if (colorValue && colorHover) {

                                  $(".glossary-group-label,.glossary-link.active").css("background-color", colorValue);

                                  $(".glossary-link.active").hover(function (e) {
                                      $(this).css("background-color", e.type === "mouseenter" ? colorHover : colorValue);
                                  });
                              }
                              $(".glossary-main-container").show();
                          }, 100);
                      },
                          function () {
                              //on error
                          })
                      .then(function () {
                          vm.loading = false;
                      });

                if (glossaryDataService.isReady() == false) {
                    vm.loading = true;
                    glossaryDataService.getContents()
                        .then(function (data) {
                            angular.copy(data, vm.rawData);
                            vm.groupData();
                        },
                            function () {
                                //on error
                            })
                        .then(function () {
                            vm.loading = false;
                        });
                }
                glossaryDataService.getUserAccess().then(
                    function (hasPermission) {
                        if (hasPermission) {
                            vm.userCanEdit = true;
                        }
                    },
                    function () { });
            }

            vm.goToSettings = function () {


                var hostweburl = decodeURIComponent(JSRequest.QueryString["SPHostUrl"]);
                var appweburl = decodeURIComponent(JSRequest.QueryString["SPAppWebUrl"]);

                $window.location.href = 'Settings.aspx?SPHostUrl=' + hostweburl + '&SPLanguage=en%2DUS&SPClientTag=0&SPProductNumber=15%2E0%2E4787%2E1000&SPAppWebUrl=' + appweburl;
            }

            SP.SOD.executeOrDelayUntilScriptLoaded(vm.init, "SP.js");
        }
    ];

    angular.module("app").controller(controllerId, oppController);

}(angular = angular || window.angular));