var samProjectFilters = angular.module('samProjectFilters', []);

/*
 * Project
 */
samProjectFilters.filter('SamProjectFilter', [
  function() {
    return function(projects, selected_atom) {

      if (!angular.isUndefined(projects) && !angular.isUndefined(selected_atom)) {
        var _projects = projects;
        angular.forEach(selected_atom, function(atom) {
          tempProjects = [];
          angular.forEach(_projects, function(proj) {
            if (
              angular.equals(proj.program._id, atom) ||
              angular.equals(proj.status._id, atom) ||
              angular.equals(proj.personnel_ia._id, atom) ||
              angular.equals(proj.personnel_ga._id, atom) ||
              angular.equals(proj.personnel_fe._id, atom) ||
              angular.equals(proj.related_version._id, atom)
              ) {
              tempProjects.push(proj);
            } 
          });
          _projects = tempProjects;
        });
        return _projects;
      } else {
        return false;
      }
    }
  }
]);
