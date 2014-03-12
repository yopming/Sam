var adminService = angular.module('adminService', []);

adminService.service('AdminUserIdService', function() {
    var user_id = undefined;
    return {
        get_user_id: function() {
            return user_id;
        },
        set_user_id: function(value) {
            user_id = value;
        }
    };
});
