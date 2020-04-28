/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below

const _ = require('underscore');
const User = require('../api/user/user.model');
const Role = require('../api/role/role.model');

const activityService = require('../api/activity/activity.service');

// Insert seed data below
let userSeed = require('../api/user/user.seed.json');
let roleSeed = require('../api/role/role.seed.json');

roleSeed = _.map(roleSeed, function (roleObj) {
  roleObj.activities = activityService.default(roleObj.roleName);
  return roleObj;
});

// Insert seed inserts below
async function run() {
  await User.find({}).remove();
  await User.create(userSeed);

  await Role.find({}).remove();
  await Role.create(roleSeed);
}

run().catch(error => console.error(error.stack));