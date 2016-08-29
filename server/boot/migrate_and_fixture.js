module.exports = function (server) {

  server.datasources.db.automigrate(['author','book', 'User', 'ACL'], function(err) {
    if (err) return console.log(err)
    server.setupFixtures(function(err) {
      if (err) console.log(err)
    })
  });
};
