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

	setInitialConditionToAll(initialData)
	console.log("MSG", initialData);
	console.log("Cash", initialData.Cash);

});


function setInitialConditionToAll(initialData){
	console.log('initialData');
	console.log(initialData);
	console.log("MSG", initialData);
	console.log("Cash", initialData.Cash);
	document.getElementById("cash_value").innerHTML = initialData.Cash;
	document.getElementById("trade_receivable_value").innerHTML = initialData.Trade_receivables;
	document.getElementById("material_inventory").innerHTML = initialData.Inventory_materials;
	document.getElementById("material_inventory").innerHTML = initialData.Inventory_materials;
	document.getElementById("Property_Plant_and_Equipment_Plant_value").innerHTML = initialData.Property_Plant_and_Equipment_Plant_value;
	document.getElementById("Intangible_assets_Goodwill").innerHTML = initialData.Intangible_assets_Goodwill;
	document.getElementById("Short_term_liabilities").innerHTML = initialData.Short_term_liabilities;
	document.getElementById("Long_term_liabilities").innerHTML = initialData.Long_term_liabilities_3_Year;
	document.getElementById("Other_liabilities").innerHTML = initialData.Other_liabilities;
	document.getElementById("Share_Capital").innerHTML = initialData.Share_Capital;
	document.getElementById("Reserves").innerHTML = initialData.Reserves;

	document.getElementById("financial_short_term_libabilities_value").innerHTML = initialData.Short_term_liabilities;
	document.getElementById("financial_short_term_libabilities_percent").innerHTML = initialData.Short_term_loan_interest_rate+'%';
	document.getElementById("financial_long_term_libabilities_value").innerHTML = initialData.Long_term_liabilities_3_Year;
	document.getElementById("financial_long_term_libabilities_percent").innerHTML = initialData.Long_term_loan_interest_rate+'%';
	// document.getElementById("Share_Capital_financial").innerHTML = initialData.
	// document.getElementById("").innerHTML = initialData.
	// document.getElementById("").innerHTML = initialData.

}


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