(function (angular) {

    var controllerId = "GlossaryController";

    var oppController = [
        'glossaryDataService', '$sce', '$timeout',
        function (glossaryDataService, $sce, $timeout) {
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

            SP.SOD.executeOrDelayUntilScriptLoaded(vm.init, "SP.js");
        }
    ];

    angular.module("app").controller(controllerId, oppController);

}(angular = angular || window.angular));