var angular = require('angular');

module.exports = function(app) {
  app.controller('UserController', ['$scope', '$http', function($scope, $http) {
    $scope.users = [];

    $scope.matchUser = function(str) {
      var userArray = $scope.users;
      var idNum = str;

      var match = userArray.filter(function(arr, i) {
        if (idNum === userArray[i]._id) return userArray[i].name;
      });

      return match[0].name;
    };

    $scope.getUsers = function() {
      $http.get('http://localhost:3000/api/users')
        .then((res) => {
          console.log('success getting users!');
          $scope.users = res.data;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.addUser = (user) => {
      $http.post('http://localhost:3000/api/users', user)
        .then((res) => {
          console.log('success posting users!');
          $scope.users.push(res.data);
          $scope.newUser = null;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.selfDestructUser = () => {
      console.log('deleting all');
      $http.delete('http://localhost:3000/api/selfDestructUser/')
        .then((res) => {
          console.log('success deleting!');
          document.getElementById('user-destruct').innerHTML +=
            '<li>SUCCESSFULLY DESTROYED</li>';
          $scope.users = [];
          console.log($scope.users);
        }, (err) => {
          console.log(err);
        });
    };
  }]);
};
