var angular = require('angular');

module.exports = function(app) {
  app.controller('KittyController', ['$scope', '$http', 'balanceResource', function($scope, $http, balanceResource) {
    $scope.kitty = [];
    $scope.count = 0;
    $scope.last = 0;
    $scope.update = [];
    $scope.send = [];

    $scope.convertDate = (str) => {
      if (str == undefined || str == null) return '';
      var splitArr = str.split('T');
      return splitArr[0];
    };

    $scope.splitzies = (val, payer, user, users, kitty) => {
      $scope.count++;
      $scope.last = ((kitty.length * users.length) * 2);
      var portion = val / users.length;
      var personPaid = val - portion;
      var owers = -(portion);
      if ($scope.count > ($scope.last/2)) $scope.update.push(balanceResource.sum(payer, user, portion, personPaid, owers));
      if ($scope.count === $scope.last) {
        for (var i=0; i<users.length; i++) {
          $scope.send.push($scope.update[i]);
          $scope.sum(i);
        }
        console.log($scope.send);
      }
      if (payer == user.name) {
        return personPaid;
      }
      else {
        return owers;
      }
    };

    $scope.sum = (i) => {
      document.getElementById('sum').innerHTML +=
        $scope.send[i].name + ' ' + $scope.send[i].balance + '<br/>';
    };

    $scope.getAll = () => {
      $http.get('http://localhost:3000/api/total')
        .then((res) => {
          console.log('success getting tallies!');
          $scope.kitty = res.data;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.addTally = (amount) => {
      $http.post('http://localhost:3000/api/total', amount)
        .then((res) => {
          console.log('success posting!');
          $scope.kitty.push(res.data);
          $scope.newPost = null;
        }, (err) => {
          console.log(err);
        });
    };

    $scope.deleteTally = (tally) => {
      $http.delete('http://localhost:3000/api/tally/' + tally._id)
        .then((res) => {
          console.log('success deleting!');
          $scope.kitty.splice($scope.kitty.indexOf(tally), 1);
          console.log($scope.kitty);
        }, (err) => {
          console.log(err);
        });
    };

    $scope.toggleEdit = (tally) => {
      if (tally.backup) {
        var temp = tally.backup;
        $scope.kitty.splice($scope.kitty.indexOf(tally), 1, temp);
      } else {
        tally.backup = angular.copy(tally);
        tally.editing = true;
      }
    };

    $scope.selfDestructTally = () => {
      console.log('deleting all');
      $http.delete('http://localhost:3000/api/selfDestructTally/')
        .then((res) => {
          console.log('success deleting!');
          document.getElementById('tally-destruct').innerHTML +=
            '<li>SUCCESSFULLY DESTROYED</li>';
          $scope.kitty = [];
          console.log($scope.kitty);
        }, (err) => {
          console.log(err);
        });
    };
  }]);
};
