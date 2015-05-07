var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// specific model
var domainSchema = new Schema({
    email: {type: String, unique: true},
    group: String,
    created: {type: Date, default: Date.now}
});
mongoose.model('Domain', domainSchema);


// task include: project, mail, topic, etc.
var taskSchema = new Schema({
    category: String,
    program: {type: Schema.Types.ObjectId, ref: 'Program'},
    name: {type: String, unique: true},
    status: {type: Schema.Types.ObjectId, ref: 'ProjectStatus'},
    personnel_fe: {type: Schema.Types.ObjectId, ref: 'Personnel'},
    personnel_ga: {type: Schema.Types.ObjectId, ref: 'Personnel'},
    personnel_ia: {type: Schema.Types.ObjectId, ref: 'Personnel'},
    personnel_pd: {type: Schema.Types.ObjectId, ref: 'Personnel'},
    jira_uri: String,
    ix_uri: String,
    gandolf_uri: String,
    mail_cover: String,
    mail_graphic_uri: String,
    topic_cover: String,
    topic_graphic_uri: String,
    topic_deploy_uri: String,
    topic_deploy_channel_official: Boolean,
    topic_deploy_channel_touch: Boolean,
    topic_deploy_channel_app: Boolean,
    topic_deploy_channel_union: Boolean,
    topic_deploy_channel_tmall: Boolean,
    belong_to: {type: Schema.Types.ObjectId, ref: 'ReleasePipe'},
    related_version: String,
    head_image: String,
    start_time: String,
    end_time: String,
    created: {type: Date, default: Date.now}
});
mongoose.model('Task', taskSchema);


// share model
var shareSchema = new Schema({
    name: String,
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'Domain'},
    time: String
});
mongoose.model('Share', shareSchema);


/* position,i.e. job type
 * @example: frontend, graphic, interactive...
 */
var positionSchema = new Schema({
    name: {type: String, unique: true},
    valid: {type: Boolean, default: true}
});
mongoose.model('Position', positionSchema);


/* personnel list
 * @example: specific personnel
 */
var personnelSchema = new Schema({
    workno: {type: Number, unique: true},
    name: String,
    domain_account: {type: String, unique: true},
    position: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    valid: {type: Boolean, default: true}
});
mongoose.model('Personnel', personnelSchema);


/* program
 * @example: official, channel...
 */
var programSchema = new Schema({
    name: {type: String, unique: true},
    valid: {type: Boolean, default: true}
});
mongoose.model('Program', programSchema);


/* task status
 * @example: in interactive action, designing, coding, released
 */
var projectStatusSchema = new Schema({
    name: {type: String, unique: true},
    valid: {type: Boolean, default: true}
});
mongoose.model('ProjectStatus', projectStatusSchema);


/* project version
 * @example: 2013.48, 2014.08
 */
var projectVersionSchema = new Schema({
    name: {type: String, unique: true},
    valid: {type: Boolean, default: true}
});
mongoose.model('ProjectVersion', projectVersionSchema);


/* release pipe
 * @example: CMS, version, CST
 */
var releasePipeSchema = new Schema({
    name: {type: String, unique: true},
    valid: {type: Boolean, default: true}
});
mongoose.model('ReleasePipe', releasePipeSchema);


// connect
mongoose.connect('mongodb://127.0.0.1/sam');
