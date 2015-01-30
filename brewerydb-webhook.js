var crypto, qs;

crypto = require('crypto');

qs = require('querystring');

module.exports = function(robot) {
  return robot.router.post("/hubot/brewerydb/webhooks/:type", function(req, res) {
    var action, attribute, attribute_id, key, message, nonce, payload, query, sub_action, sub_attribute_id, url, user, _ref;
    user = {
      room: process.env.BREWERYDB_WEBOOK_ROOM
    };
    if (process.env.BREWERYDB_API_KEY == null) {
      robot.send(user, "We got an update from BreweryDB, but BREWERYDB_API_KEY isn't set!");
    }
    query = qs.parse(req._parsedUrl.query);
    nonce = query.nonce;
    key = query.key;
    if (key === crypto.createHash('sha1').update(process.env.BREWERYDB_API_KEY + nonce)) {
      payload = qs.parse(req.body.payload);
      attribute = payload.attribute;
      attribute_id = payload.attributeId;
      action = payload.action.replace(/(\w+)e?$/, "$1ed");
      if (payload.subAction) {
        sub_action = payload.subAction;
      }
      if (payload.subAttributeId) {
        sub_attribute_id = payload.subAttributeId;
      }
      url = "http://www.brewerydb.com/" + attribute + "/" + attribute_id;
      message = "We just got an update from BreweryDB! A";
      if (attribute === "event") {
        message += "n";
      }
      message += "" + attribute + " was " + action + ". See " + url + " for more info";
      message += " (specifically, this was a " + sub_action + ")";
      message += ".";
      robot.send(user, message);
      if (((_ref = robot.adapter.bot) != null ? _ref.Room : void 0) != null) {
        robot.adapter.bot.Room(user.room).sound("trombone", (function(_this) {
          return function(err, data) {
            if (err) {
              return console.log("IRC error: " + err);
            }
          };
        })(this));
      }
      return res.end("Webhook notification sent");
    } else {
      return res.end("Bad key/nonce pair sent.");
    }
  });
};
RunLink