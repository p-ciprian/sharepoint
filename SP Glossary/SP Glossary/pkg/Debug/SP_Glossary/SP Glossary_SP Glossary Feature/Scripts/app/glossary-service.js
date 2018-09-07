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



