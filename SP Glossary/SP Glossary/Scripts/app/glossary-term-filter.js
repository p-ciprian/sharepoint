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