var team_id = 11;
var workshop_id = 9;
var participant_id = 181;
var number_of_team = 4;

var socket = io('http://54.198.46.240:3006/');
socket.emit('team', team_id);

const data = {
    'team_id': team_id,
    'workshop_id': workshop_id,
}
socket.emit('initialConditionBySocket', team_id, data);

socket.on('receive_initialConditionBySocket', function(initialData){
	console.log("MSG", initialData);
	console.log("Cash", initialData.Cash);
	document.getElementById("cash_value").innerHTML = initialData.Cash;
	document.getElementById("trade_receivable_value").innerHTML = initialData.Trade_receivables;

});


/**
* Game start function 
**/
function startGame(){
	console.log("startGame");
	var trade_receivable = document.getElementById("trade_receivable");
	trade_receivable.classList.add("org_ns");

}

function tradeUpdateToCash(){
	console.log("tradeUpdateToCash");
}