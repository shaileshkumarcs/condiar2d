var team_id = 11;
var workshop_id = 9;

var socket = io('http://54.198.46.240:3006/');
socket.emit('team', team_id);

const data = {
    'team_id': team_id,
    'workshop_id': workshop_id,
}
socket.emit('initialConditionBySocket', team_id, data);

socket.on('receive_initialConditionBySocket', function(msg){
	console.log("MSG", msg);
});