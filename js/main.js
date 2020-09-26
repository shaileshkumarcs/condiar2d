var team_id = 11;
var workshop_id = 9;
var participant_id = 181;
var number_of_team = 4;

var quarter = 1;
var year = 1;
var initialData;


var socket = io('http://54.198.46.240:3006/');
socket.emit('team', team_id);

const data = {
    'team_id': team_id,
    'workshop_id': workshop_id,
}
socket.emit('initialConditionBySocket', team_id, data);

socket.on('receive_initialConditionBySocket', function(initialData){
	setInitialConditionToAll(initialData)
});


function setInitialConditionToAll(initialData){
	initiate_Inbound_Logistics(initialData); // by OM KUMAR YAADAV
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
	document.getElementById("showShareCapitalValue").innerHTML = initialData.Share_Capital;
	document.getElementById("shareCapitalValue").innerHTML = initialData.Share_Capital;
	document.getElementById("Reserves").innerHTML = initialData.Reserves;

	document.getElementById("financial_short_term_libabilities_value").innerHTML = initialData.Short_term_liabilities;
	document.getElementById("showShortTermLoan").innerHTML = initialData.Short_term_liabilities;
	document.getElementById("shortTermLoanValue").value = initialData.Short_term_liabilities;
	document.getElementById("financial_short_term_libabilities_percent").innerHTML = initialData.Short_term_loan_interest_rate+'%';
	document.getElementById("financial_long_term_libabilities_value").innerHTML = initialData.Long_term_liabilities_3_Year;
	document.getElementById("showLongTermLoan").innerHTML = initialData.Long_term_liabilities_3_Year;
	document.getElementById("longTermLoanValue").value = initialData.Long_term_liabilities_3_Year;
	document.getElementById("financial_long_term_libabilities_percent").innerHTML = initialData.Long_term_loan_interest_rate+'%';
	document.getElementById("Share_Capital_financial").innerHTML = initialData.Share_Capital;
	document.getElementById("Interest").innerHTML = parseInt(initialData.long_term_loans_interest) + parseInt(initialData.short_term_loans_interest);
	// document.getElementById("").innerHTML = initialData.

}


/**
* Game start function 
**/
function startGame(){
	console.log("startGame");
	var trade_receivable = document.getElementById("trade_receivable");
	trade_receivable.classList.add("color_change");
	// trade_receivable.style.pointerEvents = "";
	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">TRADE RECEIVABLES</div>';

}

function tradeUpdateToCash(){
	console.log("tradeUpdateToCash");
	var data = {
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year, 
        'action': 'Update_trade_receivables', 
        'Update_trade_receivables':25,
        'workshop_id': workshop_id
    }
    socket.emit('game_page_data', team_id, data);

    socket.on('receive_game_page_data', function(responseData){
    	console.log("Response Data", responseData);
    	setInitialConditionToAll(responseData);
    	initialData = responseData;
    });

    document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showPayInterest()">CONFIRM</div>';
	var trade_receivable = document.getElementById("trade_receivable");
	trade_receivable.classList.remove("color_change");
}


function showPayInterest(){
	var trade_receivable = document.getElementById("payInterest");
	trade_receivable.classList.add("color_change");

	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">PAY INTEREST</div>';
}	

function payInterest(){
	console.log("TTTT");

	var shortTermInterestData = {
        action: "Pay_short_term_loans_interest",
        participant_id: participant_id,
        quarter: quarter,
        short_term_loans_interest: 3,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    var longTermInterestData = {
        action: "Pay_long_term_loans_interest",
        long_term_loans_interest: 2,
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    socket.emit('game_page_data', team_id, shortTermInterestData);
    socket.emit('game_page_data', team_id, longTermInterestData);

    document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showLoansUpdate()">CONFIRM</div>';

}

function showLoansUpdate(){
	var trade_receivable = document.getElementById("payInterest");
	trade_receivable.classList.remove("color_change");

	var updateShortLoan = document.getElementById("updateShortLoanIncome");
    // var updateLongLoan = document.getElementById("updateLongLoanIncome");
    updateShortLoan.classList.add("color_change");
    // updateLongLoan.classList.add("color_change");

	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">UPDATE LOANS</div>';
}

function updateLoan(){
	console.log("Update loan",initialData);
	var data = {
        Short_term_liabilities: initialData.Short_term_liabilities,
        action: "Update_short_term_loans",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, data);

    var updateShortLoan = document.getElementById("updateShortLoanIncome");
    updateShortLoan.classList.remove("color_change");

    document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showTakoutLoan()">CONFIRM</div>';
}

function showTakoutLoan(){
	console.log("showTakoutLoan");

    var short_term_financial = document.getElementById("short_term_financial");
    var share_capital_financial = document.getElementById("share_capital_financial");
    var long_term_financial = document.getElementById("long_term_financial");
    short_term_financial.classList.add("color_change");
    share_capital_financial.classList.add("color_change");
    long_term_financial.classList.add("color_change");

    document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">RAISE LOANS</div>';

}

// For increment and decrement function for short term loan
function increaseShortTermLoan(){
	showApplyLoan();
    var shortTermLoanValue = document.getElementById("shortTermLoanValue").value;
    if(shortTermLoanValue < 40){
        shortTermLoanValue = parseInt(shortTermLoanValue) + 10;
        console.log("yyyyy", shortTermLoanValue);
        document.getElementById("shortTermLoanValue").value = shortTermLoanValue;
        document.getElementById("showShortTermLoan").innerHTML = shortTermLoanValue;
    }
}
function decreaseShortTermLoan(){

    var shortTermLoanValue = document.getElementById("shortTermLoanValue").value;
    console.log(shortTermLoanValue);
    document.getElementById("shortTermLoanValue").value = shortTermLoanValue;

    console.log("nnn", shortTermLoanValue);
    if (shortTermLoanValue > 0) {
        shortTermLoanValue = parseInt(shortTermLoanValue) -10;
        document.getElementById("shortTermLoanValue").value = shortTermLoanValue;
        document.getElementById("showShortTermLoan").innerHTML = shortTermLoanValue;
    }  
    showApplyLoan();
}

// For increment and decrement function for long term loan
function increaseLongTermLoan(){

    var longTermLoanValue = document.getElementById("longTermLoanValue").value;
    if(longTermLoanValue < 60){
        longTermLoanValue = parseInt(longTermLoanValue) + 20;
        console.log("yyyyy", longTermLoanValue);
        document.getElementById("longTermLoanValue").value = longTermLoanValue;
        document.getElementById("showLongTermLoan").innerHTML = longTermLoanValue;
    }
    showApplyLoan();
}
function decreaseLongTermLoan(){

    var longTermLoanValue = document.getElementById("longTermLoanValue").value;
    console.log(longTermLoanValue);
    document.getElementById("longTermLoanValue").value = longTermLoanValue;

    console.log("nnn", longTermLoanValue);
    if (longTermLoanValue > 0) {
        longTermLoanValue = parseInt(longTermLoanValue) -20;
        document.getElementById("longTermLoanValue").value = longTermLoanValue;
        document.getElementById("showLongTermLoan").innerHTML = longTermLoanValue;
    }  
    showApplyLoan();
}

// For increment and decrement function for long term loan
function increaseShareCapital(){

    var shareCapitalValue = document.getElementById("shareCapitalValue").value;
    if(shareCapitalValue < 60){
        shareCapitalValue = parseInt(shareCapitalValue) + 20;
        console.log("yyyyy", shareCapitalValue);
        document.getElementById("shareCapitalValue").value = shareCapitalValue;
        document.getElementById("showShareCapitalValue").innerHTML = shareCapitalValue;
    }
    showApplyLoan();
}
function decreaseShareCapital(){

    var shareCapitalValue = document.getElementById("shareCapitalValue").value;
    console.log(shareCapitalValue);
    document.getElementById("shareCapitalValue").value = shareCapitalValue;

    console.log("nnn", shareCapitalValue);
    if (shareCapitalValue > 0) {
        shareCapitalValue = parseInt(shareCapitalValue) -20;
        document.getElementById("shareCapitalValue").value = shareCapitalValue;
        document.getElementById("showShareCapitalValue").innerHTML = shareCapitalValue;
    }  
    showApplyLoan();
}


function showApplyLoan(){
	console.log("showApplyLoan");

	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="applyLoans()">APPLY</div>';

}


function applyLoans(){
	var longTermLoanValue = document.getElementById("longTermLoanValue").value;
	// var shareCapitalValue = document.getElementById("shareCapitalValue").value;
	var shortTermLoanValue = document.getElementById("shortTermLoanValue").value;

	console.log("longTermLoanValue", longTermLoanValue);
	console.log("shareCapitalValue", shareCapitalValue);
	console.log("shortTermLoanValue", shortTermLoanValue);


	var short_term_financial = document.getElementById("short_term_financial");
    var share_capital_financial = document.getElementById("share_capital_financial");
    var long_term_financial = document.getElementById("long_term_financial");
    short_term_financial.classList.remove("color_change");
    share_capital_financial.classList.remove("color_change");
    long_term_financial.classList.remove("color_change");

	var shortTermLoanApply = {
        Short_term_liabilities: shortTermLoanValue,
        action: "Prolong_take_out_new_short_term_loans",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    var longTermLoanApply = {
        Long_term_liabilities_4_Year: longTermLoanValue,
        action: "Take_out_new_long_term_loans",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    console.log("shortTermLoanApply", shortTermLoanApply);
    console.log("longTermLoanApply", longTermLoanApply);
    socket.emit('game_page_data', team_id, shortTermLoanApply);
    socket.emit('game_page_data', team_id, longTermLoanApply);

    start_Inbound_Logistics();

    
}
