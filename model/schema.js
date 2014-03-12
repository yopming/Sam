var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// specific model
var userSchema = new Schema({
    workno   : {type: Number, unique: true},
    name     : String,
    username : {type: String, unique: true},
    email    : {type: String, unique: true},
    password : String,
    created  : {type: Date, default: Date.now}
});
mongoose.model('User', userSchema);


var projectSchema = new Schema ({
    name            : {type: String, unique: true},
    status          : {type: Schema.Types.ObjectId, ref: 'ProjectStatus'},
    personnel_fe    : {type: Schema.Types.ObjectId, ref: 'Personnel'},
    personnel_ga    : {type: Schema.Types.ObjectId, ref: 'Personnel'},
    personnel_ia    : {type: Schema.Types.ObjectId, ref: 'Personnel'},
    start_time      : String,
    end_time        : String,
    jira_uri        : String,
    gandolf_uri     : String,
    related_version : {type: Schema.Types.ObjectId, ref: 'ProjectVersion'},
    created         : {type: Date, default: Date.now}
});
mongoose.model('Project', projectSchema);


var mailSchema = new Schema({
    name         : {type: String, unique: true},
    personnel_fe : {type: Schema.Types.ObjectId, ref: 'Personnel'},
    personnel_ga : {type: Schema.Types.ObjectId, ref: 'Personnel'},
    release_time : String,
    head_image   : String,
    created      : {type: Date, default: Date.now}
});
mongoose.model('Mail', mailSchema);


var topicSchema = new Schema({
    name         : {type: String, unique: true},
    personnel_fe : {type: Schema.Types.ObjectId, ref: 'Personnel'},
    personnel_ga : {type: Schema.Types.ObjectId, ref: 'Personnel'},
    release_time : String,
    head_image   : String,
    belong_to    : {type: Schema.Types.ObjectId, ref: 'ReleasePipe'},
    created      : {type: Date, default: Date.now}
});
mongoose.model('Topic', topicSchema);


/* position,i.e. job type
 * @example: frontend, graphic, interactive...
 */
var positionSchema = new Schema({
    name: {type: String, unique: true}
});
mongoose.model('Position', positionSchema);


/* personnel list
 * @example: specific personnel
 */
var personnelSchema = new Schema({
    workno         : {type: Number, unique: true},
    name           : String,
    domain_account : {type: String, unique: true},
    position       : {type: mongoose.Schema.Types.ObjectId, ref: 'Position'}
});
mongoose.model('Personnel', personnelSchema);


/* task status
 * @example: in interactive action, designing, coding, released
 */
var projectStatusSchema = new Schema({
    name: {type: String, unique: true}
});
mongoose.model('ProjectStatus', projectStatusSchema);


/* project version
 * @example: 2013.48, 2014.08
 */
var projectVersionSchema = new Schema({
    name: {type: String, unique: true}
});
mongoose.model('ProjectVersion', projectVersionSchema);


/* release pipe
 * @example: CMS, version, CST
 */
var releasePipeSchema = new Schema({
    name: {type: String, unique: true}
});
mongoose.model('ReleasePipe', releasePipeSchema);


// connect
mongoose.connect('mongodb://localhost/sam');
