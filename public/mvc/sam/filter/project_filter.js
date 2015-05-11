var samProjectFilters = angular.module('samProjectFilters', []);

/*
 * Project
 */
samProjectFilters.filter('SamProjectSideFilter', [
    function () {

        // package the original equal evaluation
        packagedAngularEquals = function (a, b) {
            // judgement of whether b is blank should be regarded as the urgentest!
            if (b == '') {
                return true;
            } else if (angular.isUndefined(a) || a === null) {
                return false;
            } else {
                return angular.equals(a, b);
            }
        };

        // package the original get value, incase the element is null or undefined
        packagedGetAttr = function (el, node) {
            if (el === null) {
                return null;
            } else {
                return el[node];
            }
        };

        return function (projects, selected_atom) {

            if (!angular.isUndefined(projects) && !angular.isUndefined(selected_atom)) {
                var _projects = projects;
                tempProjects = [];

                // each creteria doesn't exists
                if (
                    selected_atom.program.id == '' &&
                    selected_atom.ia.id == '' &&
                    selected_atom.ga.id == '' &&
                    selected_atom.fe.id == '' &&
                    selected_atom.pd.id == '' &&
                    selected_atom.version.id == ''
                ) {
                    return _projects;
                }

                // meaningful creteria exists
                angular.forEach(_projects, function (proj) {
                    if (
                        packagedAngularEquals(packagedGetAttr(proj.program, '_id'), selected_atom.program.id) &&
                        packagedAngularEquals(packagedGetAttr(proj.personnel_ia, '_id'), selected_atom.ia.id) &&
                        packagedAngularEquals(packagedGetAttr(proj.personnel_ga, '_id'), selected_atom.ga.id) &&
                        packagedAngularEquals(packagedGetAttr(proj.personnel_fe, '_id'), selected_atom.fe.id) &&
                        packagedAngularEquals(packagedGetAttr(proj.personnel_pd, '_id'), selected_atom.pd.id) &&
                        packagedAngularEquals(proj.related_version, selected_atom.version.id) // related_version is string instead of object
                    ) {
                        tempProjects.push(proj);
                    }
                });
                return tempProjects;
            } else {
                return false;
            }
        };
    }
]);

