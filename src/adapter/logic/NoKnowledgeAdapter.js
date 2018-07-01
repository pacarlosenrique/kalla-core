module.exports = {
	fn: ['$scope', 'COMMONS-FILTER:filter', function($scope, $filter) {

		$scope.process = function(statement){
			return statement;
		}
		
	}]
};