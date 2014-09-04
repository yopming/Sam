var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var salt = 'tincoparmacalmaquesse';


// specific model
var userSchema = new Schema({
  workno   : {type: Number, unique: true},
  name     : String,
  username : {type: String, unique: true},
  email    : {type: String, unique: true},
  hash     : String,
  group    : {type: Schema.Types.ObjectId, ref: 'Group'},
  created  : {type: Date, default: Date.now}
});
mongoose.model('User', userSchema);


// task include: project, mail, topic, etc.
var taskSchema = new Schema ({
  category          : String,
  program           : {type: Schema.Types.ObjectId, ref: 'Program'},
  name              : {type: String, unique: true},
  status            : {type: Schema.Types.ObjectId, ref: 'ProjectStatus'},
  personnel_fe      : {type: Schema.Types.ObjectId, ref: 'Personnel'},
  personnel_ga      : {type: Schema.Types.ObjectId, ref: 'Personnel'},
  personnel_ia      : {type: Schema.Types.ObjectId, ref: 'Personnel'},
  personnel_pd      : {type: Schema.Types.ObjectId, ref: 'Personnel'},
  jira_uri          : String,
  ix_uri            : String,
  gandolf_uri       : String,
  topic_cover       : String,
  mail_cover        : String,
  topic_graphic_uri : String,
  mail_graphic_uri  : String,
  topic_deploy      : {type: Array, default: []},
  belong_to         : {type: Schema.Types.ObjectId, ref: 'ReleasePipe'},
  related_version   : String,
  head_image        : String,
  start_time        : String,
  end_time          : String,
  created           : {type: Date, default: Date.now}
});
mongoose.model('Task', taskSchema);


/* position,i.e. job type
 * @example: frontend, graphic, interactive...
 */
var positionSchema = new Schema({
  name  : {type: String, unique: true},
  valid : {type: Boolean, default: true}
});
mongoose.model('Position', positionSchema);


/* personnel list
 * @example: specific personnel
 */
var personnelSchema = new Schema({
  workno         : {type: Number, unique: true},
  name           : String,
  domain_account : {type: String, unique: true},
  position       : {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
  valid          : {type: Boolean, default: true}
});
mongoose.model('Personnel', personnelSchema);


/* program
 * @example: official, channel...
 */
var programSchema = new Schema({
  name  : {type: String, unique: true},
  valid : {type: Boolean, default: true}
});
mongoose.model('Program', programSchema);


/* task status
 * @example: in interactive action, designing, coding, released
 */
var projectStatusSchema = new Schema({
  name  : {type: String, unique: true},
  valid : {type: Boolean, default: true}
});
mongoose.model('ProjectStatus', projectStatusSchema);


/* project version
 * @example: 2013.48, 2014.08
 */
var projectVersionSchema = new Schema({
  name  : {type: String, unique: true},
  valid : {type: Boolean, default: true}
});
mongoose.model('ProjectVersion', projectVersionSchema);


/* release pipe
 * @example: CMS, version, CST
 */
var releasePipeSchema = new Schema({
  name  : {type: String, unique: true},
  valid : {type: Boolean, default: true}
});
mongoose.model('ReleasePipe', releasePipeSchema);


/*
 * user group
 * @example: root, user
 */
var groupSchema = new Schema({
  name: {type: String, unique: true},
  nice: {type: String, unique: true}
});
mongoose.model('Group', groupSchema);


// connect
mongoose.connect('mongodb://192.168.28.107/sam');

