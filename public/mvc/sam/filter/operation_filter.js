var samOperationFilters = angular.module('samOperationFilters', []);

/*
 * Mail
 */
samOperationFilters.filter('SamOperationMailFilter', [
  function() {
    // package the original equal evaluation
    packagedAngularEquals = function(a, b) {
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
    packagedGetAttr = function(el, node) {
      if (el === null) {
        return null;
      } else {
        return el[node];
      }
    };
    packagedCut = function(el, s, e) {
      if (el === null || el == undefined) {
        return null;
      } else {
        return el.substring(s,e);
      }
    }

    return function(mails, selected_atom) {

      if (!angular.isUndefined(mails) && !angular.isUndefined(selected_atom)) {
        var _mails = mails;
        tempMails = [];
        
        // each creteria doesn't exists
        if (
          selected_atom.ga.id == '' &&
          selected_atom.fe.id == '' &&
          selected_atom.year.id == '' &&
          selected_atom.month.id == ''
        ) {
          return _mails;
        }

        // meaningful creteria exists
        angular.forEach(_mails, function(mail) {
          if (
            packagedAngularEquals(packagedGetAttr(mail.personnel_ga, '_id'), selected_atom.ga.id) &&
            packagedAngularEquals(packagedGetAttr(mail.personnel_fe, '_id'), selected_atom.fe.id) &&
            packagedAngularEquals(packagedCut(mail.end_time, 0, 4), selected_atom.year.id) &&
            packagedAngularEquals(packagedCut(mail.end_time, 5, 7), selected_atom.month.id)
            ) {
            tempMails.push(mail);
          } 
        });
        return tempMails;
      } else {
        return false;
      }
    }
  }
]);


/*
 * Topic
 */
samOperationFilters.filter('SamOperationTopicFilter', [
  function() {
    // package the original equal evaluation
    packagedAngularEquals = function(a, b) {
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
    packagedGetAttr = function(el, node) {
      if (el === null) {
        return null;
      } else {
        return el[node];
      }
    };
    packagedCut = function(el, s, e) {
      if (el === null || el == undefined) {
        return null;
      } else {
        return el.substring(s,e);
      }
    }

    return function(topics, selected_atom) {

      if (!angular.isUndefined(topics) && !angular.isUndefined(selected_atom)) {
        var _topics = topics;
        tempTopics = [];
        
        // each creteria doesn't exists
        if (
          selected_atom.pipe.id == '' &&
          selected_atom.ga.id == '' &&
          selected_atom.fe.id == '' &&
          selected_atom.year.id == '' &&
          selected_atom.month.id == ''
        ) {
          return _topics;
        }

        // meaningful creteria exists
        angular.forEach(_topics, function(topic) {
          if (
            packagedAngularEquals(packagedGetAttr(topic.belong_to, '_id'), selected_atom.pipe.id) &&
            packagedAngularEquals(packagedGetAttr(topic.personnel_ga, '_id'), selected_atom.ga.id) &&
            packagedAngularEquals(packagedGetAttr(topic.personnel_fe, '_id'), selected_atom.fe.id) &&
            packagedAngularEquals(packagedCut(topic.end_time, 0, 4), selected_atom.year.id) &&
            packagedAngularEquals(packagedCut(topic.end_time, 5, 7), selected_atom.month.id)
            ) {
            tempTopics.push(topic);
          } 
        });
        return tempTopics;
      } else {
        return false;
      }
    }
  }
]);
