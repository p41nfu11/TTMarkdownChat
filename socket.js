// list that will contains all the connected users
var users = [];

// export function for listening to the socket on the connection
module.exports = function (socket) {	

    socket.on('disconnect', function () {
		socket.broadcast.emit('send:message', {message : new_user.name + ' left the conversation'});
		deleteUser(new_user);
        socket.broadcast.emit('user:exit', {list : users});        
    });

    var new_user = addUser();
    socket.emit('send:message', {message  : '*** Welcome ' + new_user.name + ' ! ***' });

	socket.broadcast.emit('send:message', {message : new_user.name + ' join the conversation'});

    socket.emit('user:join', {list : users, new_one : new_user});
    socket.broadcast.emit('user:join', {list : users});

	socket.on('send:message', function (data) {
    	socket.broadcast.emit('send:message', data);
    });

    socket.on('user:join', function (data) {
    	//nothing for now
    });
};


//Add user to list with unique username
function addUser() {
    var new_user = {name : getUniqueUsername(), lastConnexion : new Date()};
    users.push(new_user);
	return new_user;
}

function getUniqueUsername() {
    if(users.length == 0) {
        return "Guest 1";
    } else {
        var i = 0;
        var index = 0;
        var unique_name = "";
        do {
            i++;
            unique_name = "Guest " + i;
            index = findUser({name : unique_name});
        } while(index != -1);
        return unique_name;
    }
}

function deleteUser(user) {
    var index = findUser(user);
    if(index != -1) {
        users.splice(index, 1);   
    }
}

function findUser(user) {
    for(var i = 0; i < users.length; i++) {
        if (users[i].name == user.name) return i;
    }
    return -1;
}