var Conversation = require('../../../model/conversation');
module.exports = ['$scope', function($scope) {

  $scope.createConversation = function() {
    console.log(Conversation);
  }

}];
