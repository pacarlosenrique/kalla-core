module.exports = {
	fn: ['$scope', function($scope) {
		$scope.process = function(statement) {
			if (statement != null && statement.text != null) {
				statement.text = statement.text.replace('\n', " ").replace('\r', " ").replace('\t', " ");
				statement.text = statement.text.trim();
				statement.text = statement.text.replace(/\s+/g, ' ').replace(/^\s+|\s+$/, '');
			}
			return statement;
		}
	}]
};