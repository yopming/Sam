var samOperationFilters = angular.module('samOperationFilters', []);

/*
 * Mail
 */
samOperationFilters.filter('SamOperationMailFilter', [
    function() {
        return function(mails, selected_atom) {
            if (!angular.isUndefined(mails) && !angular.isUndefined(selected_atom)) {
                var _mails = mails;
                angular.forEach(selected_atom, function(atom) {
                    tempMails = [];
                    angular.forEach(_mails, function(mail) {
                        if (
                            angular.equals(mail.personnel_ga._id, atom) ||
                            angular.equals(mail.personnel_fe._id, atom) 
                            ) {
                            tempMails.push(mail);
                        } 
                    });
                    _mails = tempMails;
                });
                return _mails;
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
        return function(topics, selected_atom) {
            if (!angular.isUndefined(topics) && !angular.isUndefined(selected_atom)) {
                var _topics = topics;
                angular.forEach(selected_atom, function(atom) {
                    tempTopics = [];
                    angular.forEach(_topics, function(topic) {
                        if (
                            angular.equals(topic.personnel_ga._id, atom) ||
                            angular.equals(topic.personnel_fe._id, atom) ||
                            angular.equals(topic.belong_to._id, atom)
                            ) {
                            tempTopics.push(topic);
                        }
                    });
                    _topics = tempTopics;
                });
                return _topics;
            } else {
                return false;
            }
        }
    }
]);
