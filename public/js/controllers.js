'use strict';

/* Controllers */

function TchatCtrl($scope, socket, ) {

	$scope.messages = [];
	$scope.users = [];	
	$scope.local_user = {};

	socket.on('send:message', function (data) {
        $scope.messages.push(messageToDisplay(data));
    });

	socket.on('user:join', function (data) {
		if(data.list) {
			$scope.users = data.list;
		}
		if(data.new_one) {
			$scope.local_user = data.new_one;
		}
    });

	socket.on('user:exit', function (data) {
		$scope.users = data.list;
	});

	$scope.sendMessage = function() {		
		var data = {message: $scope.message, user : $scope.local_user};
        socket.emit('send:message', data);
        
        // add the message to the list of local client
	    $scope.messages.push(messageToDisplay(data));

	    // clear message box
	    $scope.message = '';
	}

	function messageToDisplay(data) {
		var message = "";
		if(data.user) {
			message = data.user.name + " : ";
		}
		message += data.message;		
		return message;
	}
}
