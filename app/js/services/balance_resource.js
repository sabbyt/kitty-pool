module.exports = function(app) {
  app.factory('balanceResource', function() {
    var factory = {};
    factory.sum = function(payer, user, portion, personPaid, owers) {
      if (payer == user.name) {
        user.balance += personPaid;
        // console.log(user.name + ' ' + user.balance);
        return user;
      }
      else {
        user.balance += owers;
        // console.log(user.name + ' ' + user.balance);
        return user;
      }
    };
    return factory;
  });
};
