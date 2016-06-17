module.exports = (app) => {
  app.factory('balanceResource', () => {
    var factory = {};
    factory.sum = function(payer, user, portion, personPaid, owers) {
      if (payer == user.name) {
        user.balance += personPaid;
        return user;
      }
      else {
        user.balance += owers;
        return user;
      }
    };
    return factory;
  });
};
