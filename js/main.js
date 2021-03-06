var team_id = localStorage.getItem("team_id");
var workshop_id = 9;
var participant_id = localStorage.getItem("participant_id");
var number_of_team = 4;

var quarter = 1;
var year = 1;
var initialData;



// var socket = io('http://loc alhost:3006/');
var socket = io('http://54.198.46.240:3006');

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
    // updateFinishedGoods();
    // showAssemblyBeltUpgrade(initialData);
	//initialOutbound(initialData);
	initialAssemblySetup(initialData);
	initialWorkerSetup(initialData);
    initialSetupResearchDevelopment(initialData);
	// startAssembly(initialData);
	initiate_Inbound_Logistics(initialData); // by OM KUMAR YAADAV
	// updateNewProduction(initialData);
    initialAssemblyBelt(initialData);
    initialWorkerDactive(initialData);
    initialAdvertising(initialData);
    initialMarketing(initialData);
    initialOutbound(initialData);

    


    document.getElementById("decreaseShortTermLoan_fun").removeAttribute("onclick");
    document.getElementById("increaseShortTermLoan_fun").removeAttribute("onclick");

    document.getElementById("decreaseShareCapital_fun").removeAttribute("onclick");
    document.getElementById("increaseShareCapital_fun").removeAttribute("onclick");

    document.getElementById("decreaseLongTermLoan_fun").removeAttribute("onclick");
    document.getElementById("increaseLongTermLoan_fun").removeAttribute("onclick");



	document.getElementById("cash_value").innerHTML = initialData.Cash;
	document.getElementById("trade_receivable_value").innerHTML = initialData.Trade_receivables;
	document.getElementById("material_inventory").innerHTML = initialData.Materials;
	document.getElementById("material_inventory").innerHTML = initialData.Materials;
	document.getElementById("Property_Plant_and_Equipment_Plant_value").innerHTML =  parseInt(initialData.Property_Plant_and_Equipment_Plant_value) + parseInt(initialData.Property_Plant_and_Equipment_Assembly_belts_value);
	document.getElementById("Intangible_assets_Goodwill").innerHTML = initialData.Intangible_assets_Goodwill;
	document.getElementById("Short_term_liabilities").innerHTML = initialData.Short_term_liabilities;
    document.getElementById("Long_term_liabilities").innerHTML = initialData.Long_term_liabilities;

    document.getElementById("Shareholder_loans").innerHTML = initialData.share_holder_loan;
	


	document.getElementById("Other_liabilities").innerHTML = initialData.Other_liabilities;
	document.getElementById("Share_Capital").innerHTML = initialData.Share_Capital;
	document.getElementById("showShareCapitalValue").innerHTML = 0; //initialData.share_holder_loan;
	document.getElementById("shareCapitalValue").innerHTML = initialData.Share_Capital;
    document.getElementById("Reserves").innerHTML = initialData.Reserves;

	
	document.getElementById("financial_short_term_libabilities_value").innerHTML = initialData.Short_term_liabilities;
	document.getElementById("showShortTermLoan").innerHTML = 0; //initialData.Short_term_liabilities;
	document.getElementById("shortTermLoanValue").value = initialData.Short_term_liabilities;
	document.getElementById("financial_short_term_libabilities_percent").innerHTML = initialData.Short_term_loan_interest_rate+'%';
	document.getElementById("financial_long_term_libabilities_value").innerHTML = initialData.Long_term_liabilities;
	document.getElementById("showLongTermLoan").innerHTML = initialData.Long_term_liabilities_3_Year;
	document.getElementById("longTermLoanValue").value = initialData.Long_term_liabilities_3_Year;
	document.getElementById("financial_long_term_libabilities_percent").innerHTML = initialData.Long_term_loan_interest_rate+'%';
	document.getElementById("Share_Capital_financial").innerHTML = initialData.share_holder_loan;
	document.getElementById("Interest").innerHTML = parseInt(initialData.long_term_loans_interest) + parseInt(initialData.short_term_loans_interest);

    document.getElementById("marketingprod").innerHTML = initialData.ADVERTISING;
    document.getElementById("marketingval").innerHTML = initialData.ADVERTISING;

    document.getElementById("Goods_in_assembly").innerHTML = initialData.Goods_in_assembly; 
    document.getElementById("Finished_goods_store").innerHTML = initialData.Finished_goods_store; 
    document.getElementById("total_assets_count").innerHTML = parseInt(initialData.Cash) + parseInt(initialData.Trade_receivables) + parseInt(initialData.Materials) + parseInt(initialData.Goods_in_assembly) + parseInt(initialData.Finished_goods_store) + parseInt(initialData.Property_Plant_and_Equipment_Plant_value) + parseInt(initialData.Property_Plant_and_Equipment_Assembly_belts_value) + parseInt(initialData.Intangible_assets_Goodwill); 

    document.getElementById("Net_sales_value").innerHTML = initialData.Net_sales;

    document.getElementById("Total_Liabilities_Equity").innerHTML = parseInt(initialData.Short_term_liabilities) + parseInt(initialData.Long_term_liabilities) + parseInt(initialData.share_holder_loan) + parseInt(initialData.Other_liabilities) + parseInt(initialData.Share_Capital)  + parseInt(initialData.Reserves) ;  
    console.log('Total_Liabilities_Equity');
    console.log(parseInt(initialData.Short_term_liabilities) + parseInt(initialData.Long_term_liabilities) + parseInt(initialData.share_holder_loan) + parseInt(initialData.Other_liabilities) + parseInt(initialData.Share_Capital)  + parseInt(initialData.Reserves));
 console.log('Total_Liabilities_Equity');
    document.getElementById("white_truck_out").innerHTML = initialData.Finished_Goods_Store_in_Units;
    document.getElementById("yellow_truck_out").innerHTML = parseInt(initialData.Finished_Goods_Store_in_Units)*3;
    

    // Calculation of marketing power
    /**
    *  check the board, (1 = 1GP, 4 = 2GP, 7 = 3GP, 10 = 4 GP, 13 = 5 GP, 16 = 6GP)
    *  GP means green points
    *  MArketing power = R+D GP + Sales GP + Advertising GP
    *
    **/
    var rd_gp = 0;
    if(initialData.R_D_Quality_Index > 0){
        rd_gp = 1;
    }
    if(initialData.R_D_Quality_Index > 3){
        rd_gp = 2;
    }
    if(initialData.R_D_Quality_Index > 5){
        rd_gp = 3;
    }
    if(initialData.R_D_Quality_Index > 9){
        rd_gp = 4;
    }
    if(initialData.R_D_Quality_Index > 12){
        rd_gp = 5;
    }
    if(initialData.R_D_Quality_Index > 15){
        rd_gp = 6;
    }
    console.log("rd_gp", rd_gp);
    console.log("initialData.Sales", initialData.Sales);
    console.log("initialData.ADVERTISING", initialData.ADVERTISING);
    var total_power = parseInt(rd_gp) + parseInt(initialData.Sales) + parseInt(initialData.ADVERTISING);
    document.getElementById("marketing_power").innerHTML = total_power;

    initiate_Inbound_Logistics(initialData); // by OM KUMAR YAADAV
    initiate_ADMINISTRATION_IT_AND_FINANCE(initialData); // by OM KUMAR YAADAV
    initiate_SALES(initialData); // by OM KUMAR YAADAV
    initiate_OUTBOUND_LOGISTICS(initialData); // by OM KUMAR YAADAV
    initiate_SALES_EXPENSSES(initialData); // by OM KUMAR YAADAV
    initiate_MARKETING_EXPENSSES(initialData); // by OM KUMAR YAADAV
    initiate_Administration_Information_services_expenses(initialData); // by OM KUMAR YAADAV
    initiate_R_AND_D_expenses(initialData); // by OM KUMAR YAADAV
    initiate_Taxes(initialData); // by OM KUMAR YAADAV
    initiate_EBT(initialData); // by OM KUMAR YAADAV


}


/**
* Game start function 
**/
function startGame(){

    socket.emit('initialConditionBySocket', team_id, data);
    socket.on('receive_initialConditionBySocket', function(initialData){
        var data = JSON.stringify(initialData);
        document.getElementById("trade_receivable_click").innerHTML = "<a class='color_change' href='javascript:void(0);' onclick='tradeUpdateToCash("+data+")' id='trade_receivable'>1</a>Trade receivables";
    });
	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">TRADE RECEIVABLES</div>';

}

function tradeUpdateToCash(initialData){
	var data = {
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year, 
        'action': 'Update_trade_receivables', 
        'Update_trade_receivables': initialData.Trade_receivables,
        'workshop_id': workshop_id
    }
    socket.emit('game_page_data', team_id, data);

    socket.on('receive_game_page_data', function(responseData){
    	////console.log("Response Data", responseData);
    	setInitialConditionToAll(responseData);
    	initialData = responseData;
        var trade_receivable = document.getElementById("trade_receivable");
        trade_receivable.classList.remove("color_change");
        document.getElementById("trade_receivable").removeAttribute("onclick");
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showPayInterest()">CONFIRM</div>';
    });

    
}


function showPayInterest(){
	// var trade_receivable = document.getElementById("payInterest");
	// trade_receivable.classList.add("color_change");

    socket.emit('initialConditionBySocket', team_id, data);
    socket.on('receive_initialConditionBySocket', function(initialData){
        var data = JSON.stringify(initialData);
        var trade_receivable = document.getElementById("trade_receivable");
        trade_receivable.classList.remove("color_change");
        document.getElementById("interestPay").innerHTML = "<a class='color_change' id='payInterest' href='javascript:void(0);' onclick='payInterest("+data+")'>1</a>Interest";
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">PAY INTEREST</div>';
    });

	
}	

function payInterest(initialData){
	////console.log("TTTT");
	var trade_receivable = document.getElementById("payInterest");
	trade_receivable.classList.remove("color_change");
    var short_term_loans_interest = ((parseInt(initialData.Short_term_liabilities) * parseInt(initialData.Short_term_loan_interest_rate)))/100;
	var shortTermInterestData = {
        action: "Pay_short_term_loans_interest",
        participant_id: participant_id,
        quarter: quarter,
        short_term_loans_interest: short_term_loans_interest, 
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    socket.emit('game_page_data', team_id, shortTermInterestData);
    socket.on('receive_game_page_data', function(responseData){
        document.getElementById("payInterest").removeAttribute("onclick");
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showLoansUpdate()">CONFIRM </div>';
    })

 var Long_term_liabilities = ((parseInt(initialData.Long_term_liabilities) * parseInt(initialData.Long_term_loan_interest_rate)))/100;

    var longTermInterestData = {
        action: "Pay_long_term_loans_interest",
        long_term_loans_interest: Long_term_liabilities,
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, longTermInterestData);

    socket.on('receive_game_page_data', function(responseData){
        document.getElementById("payInterest").removeAttribute("onclick");
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showLoansUpdate()">CONFIRM </div>';


    })
    
}

function showLoansUpdate(){





    socket.emit('initialConditionBySocket', team_id, data);
    socket.on('receive_initialConditionBySocket', function(initialData){
        var data = JSON.stringify(initialData);
        document.getElementById("shortTermLoan").innerHTML = "<span class='color_change' id='updateShortLoanIncome' onclick='updateLoan("+data+")'>1</span>Short-term Financial liablity";

        var trade_receivable = document.getElementById("payInterest");
        trade_receivable.classList.remove("color_change");
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">UPDATE LOANS</div>';
    });
	// var updateShortLoan = document.getElementById("updateShortLoanIncome");
 //    // var updateLongLoan = document.getElementById("updateLongLoanIncome");
 //    updateShortLoan.classList.add("color_change");
 //    // updateLongLoan.classList.add("color_change");

	
}

function updateLoan(initialData){
	////console.log("Update loan",initialData);
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
    socket.on('receive_game_page_data', function(responseData){
        // var updateShortLoan = document.getElementById("updateShortLoanIncome");
        // updateShortLoan.classList.remove("color_change");

        document.getElementById("shortTermLoan").innerHTML = "<span id='updateShortLoanIncome'>1</span>Short-term Financial liablity";

        document.getElementById("gameConfirmButton").innerHTML = "";
    	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showTakoutLoan()">CONFIRM</div>';
    })
}

function showTakoutLoan(){
	////console.log("showTakoutLoan");
        document.getElementById("decreaseShortTermLoan_fun").setAttribute('onclick','decreaseShortTermLoan()');
    document.getElementById("increaseShortTermLoan_fun").setAttribute('onclick','increaseShortTermLoan()');

    document.getElementById("decreaseShareCapital_fun").setAttribute('onclick','decreaseShareCapital()');
    document.getElementById("increaseShareCapital_fun").setAttribute('onclick','increaseShareCapital()');

    document.getElementById("decreaseLongTermLoan_fun").setAttribute('onclick','decreaseLongTermLoan()');
    document.getElementById("increaseLongTermLoan_fun").setAttribute('onclick','increaseLongTermLoan()');

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
    var shortTermLoanValue = document.getElementById("showShortTermLoan").innerHTML;
    if(shortTermLoanValue < 40){
       
        console.log(shortTermLoanValue);
        shortTermLoanValue = parseInt(shortTermLoanValue) + 10;
        document.getElementById("shortTermLoanValue").value = shortTermLoanValue;
        document.getElementById("showShortTermLoan").innerHTML = shortTermLoanValue;
    }
}
function decreaseShortTermLoan(){

    var shortTermLoanValue = document.getElementById("shortTermLoanValue").value;
    ////console.log(shortTermLoanValue);
    document.getElementById("shortTermLoanValue").value = shortTermLoanValue;

    ////console.log("nnn", shortTermLoanValue);
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
        ////console.log("yyyyy", longTermLoanValue);
        document.getElementById("longTermLoanValue").value = longTermLoanValue;
        document.getElementById("showLongTermLoan").innerHTML = longTermLoanValue;
    }
    showApplyLoan();
}
function decreaseLongTermLoan(){

    var longTermLoanValue = document.getElementById("longTermLoanValue").value;
    ////console.log(longTermLoanValue);
    document.getElementById("longTermLoanValue").value = longTermLoanValue;

    ////console.log("nnn", longTermLoanValue);
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
        ////console.log("yyyyy", shareCapitalValue);
        document.getElementById("shareCapitalValue").value = shareCapitalValue;
        document.getElementById("showShareCapitalValue").innerHTML = shareCapitalValue;
    }
    showApplyLoan();
}
function decreaseShareCapital(){

    var shareCapitalValue = document.getElementById("shareCapitalValue").value;
    //console.log(shareCapitalValue);
    document.getElementById("shareCapitalValue").value = shareCapitalValue;

    //console.log("nnn", shareCapitalValue);
    if (shareCapitalValue > 0) {
        shareCapitalValue = parseInt(shareCapitalValue) -20;
        document.getElementById("shareCapitalValue").value = shareCapitalValue;
        document.getElementById("showShareCapitalValue").innerHTML = shareCapitalValue;
    }  
    showApplyLoan();
}


function showApplyLoan(){
	//console.log("showApplyLoan");

	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="applyLoans()">APPLY</div>';

}


function applyLoans(){

    document.getElementById("decreaseShortTermLoan_fun").removeAttribute("onclick");
    document.getElementById("increaseShortTermLoan_fun").removeAttribute("onclick");

    document.getElementById("decreaseShareCapital_fun").removeAttribute("onclick");
    document.getElementById("increaseShareCapital_fun").removeAttribute("onclick");

    document.getElementById("decreaseLongTermLoan_fun").removeAttribute("onclick");
    document.getElementById("increaseLongTermLoan_fun").removeAttribute("onclick");


	var longTermLoanValue = document.getElementById("longTermLoanValue").value;
	var shareCapitalValue = document.getElementById("shareCapitalValue").value;
	var shortTermLoanValue = document.getElementById("shortTermLoanValue").value;

	//console.log("longTermLoanValue", longTermLoanValue);
	//console.log("shareCapitalValue", shareCapitalValue);
	//console.log("shortTermLoanValue", shortTermLoanValue);


	var short_term_financial = document.getElementById("short_term_financial");
    var share_capital_financial = document.getElementById("share_capital_financial");
    var long_term_financial = document.getElementById("long_term_financial");
    short_term_financial.classList.remove("color_change");
    share_capital_financial.classList.remove("color_change");
    long_term_financial.classList.remove("color_change");
/*
	var shortTermLoanApply = {
        Short_term_liabilities: shortTermLoanValue,
        action: "Prolong_take_out_new_short_term_loans",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    socket.emit('game_page_data', team_id, shortTermLoanApply);
    socket.on('receive_game_page_data', function(responseData){
        start_Inbound_Logistics();
    });


    var longTermLoanApply = {
        Long_term_liabilities_4_Year: longTermLoanValue,
        action: "Take_out_new_long_term_loans",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }


    
    socket.emit('game_page_data', team_id, longTermLoanApply);
    socket.on('receive_game_page_data', function(responseData){
        start_Inbound_Logistics();
    });



    var longTermLoanApply = {
        shareCapitalValue: shareCapitalValue,
        action: "shareCapitalValue",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    socket.emit('game_page_data', team_id, longTermLoanApply);
    socket.on('receive_game_page_data', function(responseData){
        start_Inbound_Logistics();
    }); 

    */


      var updateLoan = {
        Long_term_liabilities_4_Year: longTermLoanValue,
        Short_term_liabilities: shortTermLoanValue,
        shareCapitalValue: shareCapitalValue,
        action: "updateLoan",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    socket.emit('game_page_data', team_id, updateLoan);
    socket.on('receive_game_page_data', function(responseData){
        start_Inbound_Logistics();
    }); 


}



















// Action 3 code start here
/*
function initialOutbound(initialData){
	//console.log("Test", initialData);

	var finished_goods = parseInt(initialData.Finished_Goods_Store_in_Units);
	var finished_goods_mu = parseInt(initialData.Finished_goods_store);
    
  
    var html = '<div class="tabs_wrapp">';
	for(var i = 1; i < finished_goods+1; i++){
		html = html + '<div class="tabs_box"> <div class="tab_circle">1</div> <div class="tab_circle_yellow">'+finished_goods_mu+'</div> </div>';
		if(i%4 == 0 && i!=0){
			
         html = html + '</div><div class="tabs_wrapp">';
		}

		// if(initialData.action_type == "Update_ongoing_production"){
  //        finished_goods_mu = 0;
		// }
	}
	html = html + '</div>';
	document.getElementById("outbound_container").innerHTML = html;


}

*/


function updateFinishedGoods(initialData){
    console.log("updateFinishedGoods");
	var updateOngoingProduction = {
        Update_ongoing_production: initialData.Goods_in_Assembly_in_Units,
        action: "Update_ongoing_production",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        value_per_unit: 3,
        workshop_id: workshop_id,
        year: year,
    };
    socket.emit('game_page_data', team_id, updateOngoingProduction);

    socket.on('receive_game_page_data', function(responseData){

        setInitialConditionToAll(responseData);
        initialData = responseData;

        var changecolor = document.getElementById("finished_goods");
        changecolor.classList.remove("color_change");
            // document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">UPDATE PRODUCTION</div>';
        document.getElementById("updateOutboud").innerHTML = "<a href='javascript:void(0);' id='finished_goods'>8</a>Finished goods inventory";
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showAssemblyBeltUpgrade("+JSON.stringify(responseData)+")'>CONFIRM</div>";
     
    });

	
}

function initialAssemblyBelt(initialData){
    document.getElementById("assembltBeltSlotButton1").removeAttribute("onclick");
    document.getElementById("assembltBeltSlotButton2").removeAttribute("onclick");
    document.getElementById("assembltBeltSlotButton3").removeAttribute("onclick");
}

function showAssemblyBeltUpgrade(initialData){
    console.log("Initial data", initialData);

    // document.getElementById("assembltBeltSlotButton1").removeAttribute("onclick");
    // document.getElementById("assembltBeltSlotButton2").removeAttribute("onclick");
    // document.getElementById("assembltBeltSlotButton3").removeAttribute("onclick");
    // Change color 
    var changecolor = document.getElementById("upgradePointSlot1");
    changecolor.classList.add("color_change");
    var changecolor = document.getElementById("upgradePointSlot2");
    changecolor.classList.add("color_change");
    var changecolor = document.getElementById("upgradePointSlot3");
    changecolor.classList.add("color_change");
    // Activate click button

    if(initialData.Assembly_Belt_1 == "1")
    {
        console.log("Assembly_Belt_1");
        if(initialData.Assembly_Belt_1_color == "Yellow"){
            document.getElementById("assembltBeltSlotButton1").setAttribute('onclick','upgradeGreenBeltSlot1()');              
        }
        else if(initialData.Assembly_Belt_1_color == "Green"){
            document.getElementById("assembltBeltSlotButton1").setAttribute('onclick','upgradeBlackBeltSlot1()');                             
        }
        else if(initialData.Assembly_Belt_1_color == "Black"){
            document.getElementById("assembltBeltSlotButton1").setAttribute('onclick','upgradeBlankBeltSlot1()');                    
        }
        else{
            document.getElementById("assembltBeltSlotButton1").setAttribute('onclick','addYellowBeltSlot1()');                    
        }
    }

    if(initialData.Assembly_Belt_2 == "1")
    {
        console.log("Assembly_Belt_2");
        if(initialData.Assembly_Belt_2_color == "Yellow"){
            document.getElementById("assembltBeltSlotButton2").setAttribute('onclick','upgradeGreenBeltSlot2()');      
        }
        else if(initialData.Assembly_Belt_2_color == "Green"){
            document.getElementById("assembltBeltSlotButton2").setAttribute('onclick','upgradeBlackBeltSlot2()');                        
        }
        else if(initialData.Assembly_Belt_2_color == "Black"){
            document.getElementById("assembltBeltSlotButton2").setAttribute('onclick','upgradeBlankBeltSlot2()');           
        }
        else{
            document.getElementById("assembltBeltSlotButton2").setAttribute('onclick','addYellowBeltSlot2()');                    
        }
    }
    else{
        document.getElementById("assembltBeltSlotButton2").setAttribute('onclick','addYellowBeltSlot2()');                    
    }

    if(initialData.Assembly_Belt_3 == "1")
    {
        console.log("Assembly_Belt_3");
        if(initialData.Assembly_Belt_2_color == "Yellow"){
            document.getElementById("assembltBeltSlotButton3").setAttribute('onclick','upgradeGreenBeltSlot3()');      
        }
        else if(initialData.Assembly_Belt_2_color == "Green"){
            document.getElementById("assembltBeltSlotButton3").setAttribute('onclick','upgradeBlackBeltSlot3()');                        
        }
        else if(initialData.Assembly_Belt_2_color == "Black"){
            document.getElementById("assembltBeltSlotButton3").setAttribute('onclick','upgradeBlankBeltSlot3()');           
        }
        else{
            document.getElementById("assembltBeltSlotButton3").setAttribute('onclick','addYellowBeltSlot3()');                    
        }
    }
    else{
        document.getElementById("assembltBeltSlotButton3").setAttribute('onclick','addYellowBeltSlot2()');                    
    }

    // document.getElementById("assembltBeltSlotButton1").setAttribute('onclick','Adjust_administration_IT_resources('+arg+')')
    // document.getElementById("assembltBeltSlotButton2").setAttribute('onclick','Adjust_administration_IT_resources('+arg+')')
    // document.getElementById("assembltBeltSlotButton3").setAttribute('onclick','Adjust_administration_IT_resources('+arg+')')

    document.getElementById("gameConfirmButton").innerHTML = "";
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">ADJUST CAPACITY</div>';
}


function initialAssemblySetup(initialData){

	console.log("initialAssemblySetup", initialData);
    var beltPower = initialData.Goods_in_Assembly_in_Units;
	// Assembly Belt Slot 1 start
	var goodsHtmlSlot1 = '';
	var upgradePlaceSlot1 = '';
	if(initialData.Assembly_Belt_1 == "1"){
        var beltCapacity = 0;
		if(initialData.Assembly_Belt_1_color == "Yellow"){
            beltCapacity = 2;
            document.getElementById("assemblyBeltPriceValue1").value = 5;
            document.getElementById("assemblyBeltPrice1").innerHTML = "5";
			if(beltPower > 0){
				goodsHtmlSlot1 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
                }
                else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot1 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
				<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }

            upgradePlaceSlot1 += '<div onclick="upgradeGreenBeltSlot1()" id="assembltBeltSlotButton1">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
        }
        if(initialData.Assembly_Belt_1_color == "Green"){
            beltCapacity = 3;
            document.getElementById("assemblyBeltPriceValue1").value = 10;
            document.getElementById("assemblyBeltPrice1").innerHTML = "10";
			if(beltPower > 0){
				goodsHtmlSlot1 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
				<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot1 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 2){               
                goodsHtmlSlot1 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }

            upgradePlaceSlot1 += '<div onclick="upgradeBlackBeltSlot1()" id="assembltBeltSlotButton1">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Green Belt</h3>\
                                </div>';
            var removeClass = document.getElementById("goodsPlaceSlot1");   
            removeClass.classList.remove("last_art");


        }

        if(initialData.Assembly_Belt_1_color == "Black"){
            beltCapacity = 4;
            document.getElementById("assemblyBeltPriceValue1").value = 15;
            document.getElementById("assemblyBeltPrice1").innerHTML = "15";
			if(beltPower > 0){
				goodsHtmlSlot1 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot1 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 2){               
                goodsHtmlSlot1 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 3){               
                goodsHtmlSlot1 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }

            upgradePlaceSlot1 += '<div onclick="upgradeBlankBeltSlot1()" id="assembltBeltSlotButton1">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Black Belt</h3>\
                                </div>';
            var removeClass = document.getElementById("goodsPlaceSlot1");   
            removeClass.classList.remove("last_art");


        }
        if(initialData.Assembly_Belt_1_color == ""){
            document.getElementById("assemblyBeltPriceValue1").value = "";
            goodsHtmlSlot1 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
                            <div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';
            

            upgradePlaceSlot1 += '<div onclick="addYellowBeltSlot1()" id="assembltBeltSlotButton1">\
                                <h3>Add Belt</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                \
                            </div>';
        }
        beltPower = beltPower - beltCapacity;
	}
	else{

    	goodsHtmlSlot1 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';
            

        upgradePlaceSlot1 += '<div onclick="addYellowBeltSlot1()" id="assembltBeltSlotButton1">\
                                <h3>Upgrade</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                <h3>Yellow Belt</h3>\
                            </div>';
	}
	document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtmlSlot1;
	document.getElementById("upgradePointSlot1").innerHTML = upgradePlaceSlot1;

	// Assembly Belt Slot 2 start
	var goodsHtmlSlot2 = '';
	var upgradePlaceSlot2 = '';
	if(initialData.Assembly_Belt_2 == "1"){
        var beltCapacity = 0;
  		if(initialData.Assembly_Belt_2_color == "Yellow"){
            beltCapacity = 2;
            document.getElementById("assemblyBeltPriceValue2").value = 5;
            document.getElementById("assemblyBeltPrice2").innerHTML = "5";
			if(beltPower > 0){
				goodsHtmlSlot2 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
                }
                else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot2 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }

            upgradePlaceSlot2 += '<div onclick="upgradeGreenBeltSlot2()" id="assembltBeltSlotButton2">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
        }
        if(initialData.Assembly_Belt_2_color == "Green"){
            beltCapacity = 3;
            document.getElementById("assemblyBeltPriceValue2").value = 10;
            document.getElementById("assemblyBeltPrice2").innerHTML = "10";
			if(beltPower > 0){
				goodsHtmlSlot2 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot2 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 2){               
                goodsHtmlSlot2 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }

            upgradePlaceSlot2 += '<div onclick="upgradeBlackBeltSlot2()" id="assembltBeltSlotButton2">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Green Belt</h3>\
                                </div>';
            var removeClass = document.getElementById("goodsPlaceSlot2");   
            removeClass.classList.remove("last_art");


        }

        if(initialData.Assembly_Belt_2_color == "Black"){
            beltCapacity = 4;
            document.getElementById("assemblyBeltPriceValue2").value = 15;
            document.getElementById("assemblyBeltPrice2").innerHTML = "15";
			if(beltPower > 0){
				goodsHtmlSlot2 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot2 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 2){               
                goodsHtmlSlot2 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }
            if(beltPower > 3){               
                goodsHtmlSlot2 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
            	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
	                        <div class="tab_circle"></div>\
	                        <div class="tab_circle_yellow"></div>\
	                    </div>\
	                </div>';
            }

            upgradePlaceSlot2 += '<div onclick="upgradeBlankBeltSlot2()" id="assembltBeltSlotButton2">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Black Belt</h3>\
                                </div>';
            var removeClass = document.getElementById("goodsPlaceSlot2");   
            removeClass.classList.remove("last_art");


        }

        if(initialData.Assembly_Belt_2_color == ""){
            document.getElementById("assemblyBeltPriceValue2").value = "";
            goodsHtmlSlot2 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
                            <div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';
            

            upgradePlaceSlot2 += '<div onclick="addYellowBeltSlot2()" id="assembltBeltSlotButton2">\
                                <h3>Add Belt</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                \
                            </div>';
        }

        beltPower = beltPower - beltCapacity;
	}
	else{
    	goodsHtmlSlot2 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';
            

        upgradePlaceSlot2 += '<div onclick="addYellowBeltSlot2()" id="assembltBeltSlotButton2">\
                                <h3>Add Belt</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                \
                            </div>';
	}
	document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtmlSlot2;
	document.getElementById("upgradePointSlot2").innerHTML = upgradePlaceSlot2;


	// Assembly Belt Slot 3 start
	var goodsHtmlSlot3 = '';
	var upgradePlaceSlot3 = '';
	if(initialData.Assembly_Belt_3 == "1"){
        var beltCapacity = 0;
		if(initialData.Assembly_Belt_3_color == "Yellow"){
            beltCapacity = 2;
            document.getElementById("assemblyBeltPriceValue3").value = 5;
            document.getElementById("assemblyBeltPrice3").innerHTML = "5";
			if(beltPower > 0){
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                            <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
                }
                else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }



            upgradePlaceSlot3 += '<div onclick="upgradeGreenBeltSlot3()" id="assembltBeltSlotButton3">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
        }
    if(initialData.Assembly_Belt_3_color == "Green"){
            beltCapacity = 3;
            document.getElementById("assemblyBeltPriceValue3").value = 10;
            document.getElementById("assemblyBeltPrice3").innerHTML = "10";
            if(beltPower > 0){
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                            <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }
            if(beltPower > 2){               
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }

            upgradePlaceSlot3 += '<div onclick="upgradeBlackBeltSlot3()" id="assembltBeltSlotButton3">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Green Belt</h3>\
                                </div>';
            var removeClass = document.getElementById("goodsPlaceSlot3");   
            removeClass.classList.remove("last_art");


        }

        if(initialData.Assembly_Belt_3_color == "Black"){
            beltCapacity = 4;
            document.getElementById("assemblyBeltPriceValue3").value = 15;
            document.getElementById("assemblyBeltPrice3").innerHTML = "15";
            if(beltPower > 0){
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                            <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }
            if(beltPower > 1){               
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }
            if(beltPower > 2){               
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }
            if(beltPower > 3){               
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';
            }
            else{
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                            <div class="tab_circle"></div>\
                            <div class="tab_circle_yellow"></div>\
                        </div>\
                    </div>';
            }

            upgradePlaceSlot3 += '<div onclick="upgradeBlankBeltSlot3()" id="assembltBeltSlotButton3">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Black Belt</h3>\
                                </div>';
            var removeClass = document.getElementById("goodsPlaceSlot3");   
            removeClass.classList.remove("last_art");


        }
        if(initialData.Assembly_Belt_3_color == ""){
            document.getElementById("assemblyBeltPriceValue3").value = "";
            goodsHtmlSlot3 += '<div class="chane_box line_down">\
                    <div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
                            <div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';
            

            upgradePlaceSlot3 += '<div onclick="addYellowBeltSlot3()" id="assembltBeltSlotButton3">\
                                <h3>Add Belt</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                \
                            </div>';
        }
        beltPower = beltPower - beltCapacity;
    }
	else{

    	goodsHtmlSlot3 += '<div class="chane_box line_down">\
					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';
            

        upgradePlaceSlot3 += '<div onclick="addYellowBeltSlot3()" id="assembltBeltSlotButton3">\
                                <h3>Add Belt</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                \
                            </div>';
	}

	document.getElementById("goodsPlaceSlot3").innerHTML = goodsHtmlSlot3;
	document.getElementById("upgradePointSlot3").innerHTML = upgradePlaceSlot3;


	

}

function addYellowBeltSlot1(){
    var investUpgradeAssemblyBelt1 = {
        Assembly_Belt_color: "Yellow",
        Invest_upgrade_assembly_belt_1: 1,
        action: "Invest_upgrade_assembly_belt_1",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt1);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response data", responseData);
        document.getElementById("assemblyBeltPrice1").innerHTML = "5";
        var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeGreenBeltSlot1()" id="assembltBeltSlotButton1">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Yellow Belt</h3>\
                        </div>';

        var removeClass = document.getElementById("goodsPlaceSlot1");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot1").innerHTML = upgradePlace; 

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+responseData+")'>CONFIRM</div>"; 
    });
}

function upgradeGreenBeltSlot1(){
    console.log("upgradeGreenBeltSlot1");
	var investUpgradeAssemblyBelt1 = {
        Assembly_Belt_color: "Green",
        Invest_upgrade_assembly_belt_1: 1,
        action: "Invest_upgrade_assembly_belt_1",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt1);
    socket.on('receive_game_page_data', function(responseData){
    	//console.log("Response data", responseData);
    	initialAssemblySetup(responseData);
        document.getElementById("assemblyBeltPrice1").innerHTML = "10";
		var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeBlackBeltSlot1()" id="assembltBeltSlotButton1">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Green Belt</h3>\
                        </div>';

        var removeClass = document.getElementById("goodsPlaceSlot1");               
        removeClass.classList.remove("last_art");
        document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot1").innerHTML = upgradePlace; 

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    });


            
	// document.getElementById("assembltBeltSlot1").innerHTML='<div class="asm_belt_nsw">\
 //                        <div class="belt_one">\
 //                            <div class="tre_jc">\
 //                                <div class="tcs_box">\
 //                                    <img src="images/jcb.svg" alt=""/>\
 //                                </div>\
 //                                <div class="tcs_box">\
 //                                    <img src="images/refresh_cs.svg" alt=""/> \
 //                                </div>\
 //                                <div class="tcs_box man-b">\
 //                                    <img src="images/black_man.svg" alt=""/>\
 //                                </div>\
 //                            </div>\
 //                            <div class="tre_jc_two">\
 //                                <div class="ten_cds_red_sa">5</div>\
 //                                <div class="ten_cds_yellow">1</div>\
 //                                <div class="ten_cds_yellow">1</div>\
 //                            </div>\
 //                        </div>\
 //                        <div class=" mid_person">\
 //                            <div class="flex_wrap_center" id="goodsPlaceSlot1">\
 //                                <div class="chane_box line_down">\
 //                                    <div class="tabs_box">\
 //                                        <div class="tab_circle">1</div>\
 //                                        <div class="tab_circle_yellow">2</div>\
 //                                    </div>\
 //                                </div>\
 //                                <div class="chane_box line_down">\
 //                                    <div class="tabs_box">\
 //                                        <div class="tab_circle">1</div>\
 //                                        <div class="tab_circle_yellow">2</div>\
 //                                    </div>\
 //                                </div>\
 //                                <div class="chane_box line_down">\
 //                                    <div class="tabs_box">\
 //                                        <div class="tab_circle">1</div>\
 //                                        <div class="tab_circle_yellow">2</div>\
 //                                    </div>\
 //                                </div>\
 //                            </div>\
 //                            <div class="persons_ble_hand">\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                            </div>\
 //                        </div>\
 //                        <div class="black_built_drk">\
 //                            <div>\
 //                            	<div onclick="upgradeBlackBeltSlot1()">\
	//                                 <h3>Upgrade</h3>\
	//                                 <div class="jcb_smwr">\
	//                                     <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
	//                                     <div class="ten_cds_red_sa">5</div>\
	//                                 </div>\
	//                                 <h3>Green belt</h3>\
	//                             </div>\
 //                            </div>\
 //                        </div>\
 //                    </div>';
}


function upgradeBlackBeltSlot1(){
	var investUpgradeAssemblyBelt1 = {
        Assembly_Belt_color: "Black",
        Invest_upgrade_assembly_belt_1: 1,
        action: "Invest_upgrade_assembly_belt_1",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    console.log("upgradeBlackBeltSlot1", investUpgradeAssemblyBelt1);
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt1);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response data", responseData);
        initialAssemblySetup(responseData);
        document.getElementById("assemblyBeltPrice1").innerHTML = "15";
    	var goodsHtml ='<div class="chane_box line_down">\
                                        <div class="tabs_box">\
                                            <div class="tab_circle"></div>\
                                            <div class="tab_circle_yellow"></div>\
                                        </div>\
                                    </div>\
                                    <div class="chane_box line_down">\
                                        <div class="tabs_box">\
                                            <div class="tab_circle"></div>\
                                            <div class="tab_circle_yellow"></div>\
                                        </div>\
                                    </div>\
                                    <div class="chane_box line_down">\
                                        <div class="tabs_box">\
                                            <div class="tab_circle"></div>\
                                            <div class="tab_circle_yellow"></div>\
                                        </div>\
                                    </div>\
                                    <div class="chane_box line_down">\
                                        <div class="tabs_box">\
                                            <div class="tab_circle"></div>\
                                            <div class="tab_circle_yellow"></div>\
                                        </div>\
                                    </div>';

            var upgradePlace = '<div onclick="upgradeBlankBeltSlot1()" id="assembltBeltSlotButton1">\
                                <h3>Upgrade</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                <h3>Black Belt</h3>\
                            </div>';


            var removeClass = document.getElementById("goodsPlaceSlot1");               
            removeClass.classList.remove("last_art");
            document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
    		document.getElementById("upgradePointSlot1").innerHTML = upgradePlace; 

            document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    }); 
	// document.getElementById("assembltBeltSlot1").innerHTML='<div class="asm_belt_nsw">\
 //                        <div class="belt_one">\
 //                            <div class="tre_jc">\
 //                                <div class="tcs_box">\
 //                                    <img src="images/jcb.svg" alt=""/>\
 //                                </div>\
 //                                <div class="tcs_box">\
 //                                    <img src="images/refresh_cs.svg" alt=""/> \
 //                                </div>\
 //                                <div class="tcs_box man-b">\
 //                                    <img src="images/black_man.svg" alt=""/>\
 //                                </div>\
 //                            </div>\
 //                            <div class="tre_jc_two">\
 //                                <div class="ten_cds_red_sa">5</div>\
 //                                <div class="ten_cds_yellow">1</div>\
 //                                <div class="ten_cds_yellow">1</div>\
 //                            </div>\
 //                        </div>\
 //                        <div class=" mid_person">\
 //                            <div class="flex_wrap_center">\
                                // <div class="chane_box line_down">\
                                //     <div class="tabs_box">\
                                //         <div class="tab_circle">1</div>\
                                //         <div class="tab_circle_yellow">2</div>\
                                //     </div>\
                                // </div>\
                                // <div class="chane_box line_down">\
                                //     <div class="tabs_box">\
                                //         <div class="tab_circle">1</div>\
                                //         <div class="tab_circle_yellow">2</div>\
                                //     </div>\
                                // </div>\
                                // <div class="chane_box line_down">\
                                //     <div class="tabs_box">\
                                //         <div class="tab_circle">1</div>\
                                //         <div class="tab_circle_yellow">2</div>\
                                //     </div>\
                                // </div>\
                                // <div class="chane_box line_down">\
                                //     <div class="tabs_box">\
                                //         <div class="tab_circle">1</div>\
                                //         <div class="tab_circle_yellow">2</div>\
                                //     </div>\
                                // </div>\
 //                            </div>\
 //                            <div class="persons_ble_hand">\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                                <div class="admi_liblue"><img src="images/white_man.svg" alt=""></div>\
 //                            </div>\
 //                        </div>\
 //                        <div class="black_built_drk">\
 //                            <div>\
	//                                 <div class="jcb_smwr">\
	//                                     <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
	//                                     <div class="ten_cds_red_sa">5</div>\
	//                                 </div>\
	//                                 <h3>Black belt</h3>\
 //                        </div>\
 //                    </div>';
}

function upgradeBlankBeltSlot1(){
	var investUpgradeAssemblyBelt1 = {
        Assembly_Belt_color: "",
        Invest_upgrade_assembly_belt_1: "",
        action: "Invest_upgrade_assembly_belt_1",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt1);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response data", responseData);
        initialAssemblySetup(responseData);
        document.getElementById("assemblyBeltPrice1").innerHTML = "5";
        var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="addYellowBeltSlot1()" id="assembltBeltSlotButton1">\
                            <h3>Add Belt</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Blank Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot1");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot1").innerHTML = upgradePlace; 
        document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    });
}

// Assembly belt slot2
function addYellowBeltSlot2(){
	var investUpgradeAssemblyBelt2 = {
        Assembly_Belt_color: "Yellow",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_2",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt2);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response data", responseData);
        initialAssemblySetup(responseData);
        document.getElementById("assemblyBeltPrice2").innerHTML = "5";
    	var goodsHtmlSlot2 = '<div class="chane_box line_down">\
    					<div class="tabs_box">\
                                    <div class="tab_circle"></div>\
                                    <div class="tab_circle_yellow"></div>\
                                </div>\
                            </div>\
                            <div class="chane_box line_down">\
            					<div class="tabs_box">\
                                    <div class="tab_circle"></div>\
                                    <div class="tab_circle_yellow"></div>\
                                </div>\
                            </div>';
                

        var upgradePlaceSlot2 = '<div onclick="upgradeGreenBeltSlot2()" id="assembltBeltSlotButton2">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
    	document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtmlSlot2;
    	document.getElementById("upgradePointSlot2").innerHTML = upgradePlaceSlot2;

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    })
}
function upgradeGreenBeltSlot2(){
	var investUpgradeAssemblyBelt2 = {
        Assembly_Belt_color: "Green",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_2",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt2);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response data", responseData);
        document.getElementById("assemblyBeltPrice2").innerHTML = "10";
		var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeBlackBeltSlot2()" id="assembltBeltSlotButton2">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Green Belt</h3>\
                        </div>';

        var removeClass = document.getElementById("goodsPlaceSlot2");               
        removeClass.classList.remove("last_art");
        document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot2").innerHTML = upgradePlace;

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    })                
}


function upgradeBlackBeltSlot2(){
	var investUpgradeAssemblyBelt2 = {
        Assembly_Belt_color: "Black",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_2",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt2);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response data", responseData);
        document.getElementById("assemblyBeltPrice2").innerHTML = "15";
        var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="upgradeBlankBeltSlot2()" id="assembltBeltSlotButton2">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Black Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot2");               
        removeClass.classList.remove("last_art");
        document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot2").innerHTML = upgradePlace;

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    });  
}

function upgradeBlankBeltSlot2(){
	var investUpgradeAssemblyBelt2 = {
        Assembly_Belt_color: "",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_2",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt2);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response data", responseData);
        document.getElementById("assemblyBeltPrice2").innerHTML = "5";
        var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="addYellowBeltSlot2()" id="assembltBeltSlotButton2">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Blank Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot2");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot2").innerHTML = upgradePlace;

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayInvestment("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    })
}

// Assembly belt slot3
function addYellowBeltSlot3(){
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "Yellow",
        Invest_upgrade_assembly_belt_3: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    console.log("Add Yellow Belt ", investUpgradeAssemblyBelt3);

    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
    socket.on('receive_game_page_data', function(responseData){
    	var goodsHtmlSlot2 = '<div class="chane_box line_down">\
    					<div class="tabs_box">\
                                    <div class="tab_circle"></div>\
                                    <div class="tab_circle_yellow"></div>\
                                </div>\
                            </div>\
                            <div class="chane_box line_down">\
            					<div class="tabs_box">\
                                    <div class="tab_circle"></div>\
                                    <div class="tab_circle_yellow"></div>\
                                </div>\
                            </div>';
                

        var upgradePlaceSlot2 = '<div onclick="upgradeGreenBeltSlot3()" id="assembltBeltSlotButton3">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
    	document.getElementById("goodsPlaceSlot3").innerHTML = goodsHtmlSlot2;
    	document.getElementById("upgradePointSlot3").innerHTML = upgradePlaceSlot2;
    });
}
function upgradeGreenBeltSlot3(){
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "Green",
        Invest_upgrade_assembly_belt_3: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
    socket.on('receive_game_page_data', function(responseData){
		var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle"></div>\
                                <div class="tab_circle_yellow"></div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeBlackBeltSlot3()" id="assembltBeltSlotButton3">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Green Belt</h3>\
                        </div>';

        var removeClass = document.getElementById("goodsPlaceSlot3");               
        removeClass.classList.remove("last_art");
        document.getElementById("goodsPlaceSlot3").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot3").innerHTML = upgradePlace;   
    })            
}


function upgradeBlackBeltSlot3(){
	// //console.log("initialData", initialData);
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "Black",
        Invest_upgrade_assembly_belt_3: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
    socket.on('receive_game_page_data', function(responseData){
	   var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="upgradeBlankBeltSlot3()" id="assembltBeltSlotButton3">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Black Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot3");               
        removeClass.classList.remove("last_art");
        document.getElementById("goodsPlaceSlot3").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot3").innerHTML = upgradePlace;
    })  
}

function upgradeBlankBeltSlot3(){
	// //console.log("initialData", initialData);
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "",
        Invest_upgrade_assembly_belt_3: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
    socket.on('receive_game_page_data', function(responseData){
	   var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle"></div>\
                                        <div class="tab_circle_yellow"></div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="upgradeGreenBeltSlot3()" id="assembltBeltSlotButton3">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Blank Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot3");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot3").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot3").innerHTML = upgradePlace; 
    })
}

function showPayInvestment(initialData){
    console.log("Initial data", initialData);

    var removeAddClass = document.getElementById("upgradePointSlot1");               
    removeAddClass.classList.remove("color_change");
    var removeAddClass = document.getElementById("upgradePointSlot2");               
    removeAddClass.classList.remove("color_change");
    var removeAddClass = document.getElementById("upgradePointSlot3");               
    removeAddClass.classList.remove("color_change");

    document.getElementById("assembltBeltSlotButton1").removeAttribute("onclick");
    document.getElementById("assembltBeltSlotButton2").removeAttribute("onclick");
    document.getElementById("assembltBeltSlotButton3").removeAttribute("onclick");

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">PAY INVESTMENT</div>'; 

    document.getElementById("plantInvestment").innerHTML = "<span class='color_change' href='javascript:void(0);' onclick='payInvestment("+JSON.stringify(initialData)+")' id='goods_in_progress'>3</span> Property, plant and equipment ";
}

function payInvestment(initialData){


    var machine1 = document.getElementById("assemblyBeltPriceValue1").value;
    var machine2 = document.getElementById("assemblyBeltPriceValue2").value;
    var machine3 = document.getElementById("assemblyBeltPriceValue3").value;

    console.log("Machine One value 1", machine1);
    console.log("Machine One value 2", machine2);
    console.log("Machine One value 3", machine3);

    var totalMachineValue = parseInt(machine1) + parseInt(machine2) + parseInt(machine3) - 5;

    var Invest_plant_and_property = {
        Invest_plant_and_property: 1,
        Property_Plant_and_Equipment_Plant_value: totalMachineValue,
        action: "Invest_plant_and_property",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    socket.emit('game_page_data', team_id, Invest_plant_and_property);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Pay investment");

        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showAdjustWorker("+JSON.stringify(initialData)+")'>CONFIRM</div>"; 

        document.getElementById("plantInvestment").innerHTML = "<span href='javascript:void(0);'>3</span> Property, plant and equipment ";

        document.getElementById("assembltBeltSlotButton1").removeAttribute("onclick");
        document.getElementById("assembltBeltSlotButton2").removeAttribute("onclick");
        document.getElementById("assembltBeltSlotButton3").removeAttribute("onclick");
    })
}

function initialWorkerDactive(initialData){
    var activeWorker = localStorage.getItem("activeMen");
    console.log("activeWorker", activeWorker);
    if(activeWorker == null){
        document.getElementById("aworker1").removeAttribute("onclick");
        document.getElementById("aworker2").removeAttribute("onclick");
        document.getElementById("aworker3").removeAttribute("onclick");
        document.getElementById("aworker4").removeAttribute("onclick");

        document.getElementById("aworker5").removeAttribute("onclick");
        document.getElementById("aworker6").removeAttribute("onclick");
        document.getElementById("aworker7").removeAttribute("onclick");
        document.getElementById("aworker8").removeAttribute("onclick");

        document.getElementById("aworker9").removeAttribute("onclick");
        document.getElementById("aworker10").removeAttribute("onclick");
        document.getElementById("aworker11").removeAttribute("onclick");
        document.getElementById("aworker12").removeAttribute("onclick");
    }
    
}

function initialWorkerSetup(initialData){
	//console.log("initialWorkerSetup", initialData.Workers_Assembly_1);
	// console.log("initialWorkerSetup 2 ", initialData.Workers_Assembly_2);
	//console.log("initialWorkerSetup", initialData.Workers_Assembly_3);

	var workerHtml1 = '';
	var workerHtml2 = '';
	var workerHtml3 = '';
	if(initialData.Workers_Assembly_1 > 0){
		workerHtml1 += '<div class="admi_liblue" id="aworker1" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" id="aworker1" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_1 > 1){
		workerHtml1 += '<div class="admi_liblue" id="aworker2" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" id="aworker2" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_1 > 2){
		workerHtml1 += '<div class="admi_liblue" id="aworker3" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" id="aworker3" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_1 > 3){
		workerHtml1 += '<div class="admi_liblue" id="aworker4" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" id="aworker4" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
                                

	if(parseInt(initialData.Workers_Assembly_2) > 0){
		workerHtml2 += '<div class="admi_liblue" id="aworker5" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue deactive_color" id="aworker5" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

	if(parseInt(initialData.Workers_Assembly_2) > 1){
		workerHtml2 += '<div class="admi_liblue" id="aworker6" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue deactive_color" id="aworker6" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

	if(parseInt(initialData.Workers_Assembly_2) > 2){
		workerHtml2 += '<div class="admi_liblue" id="aworker7" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue deactive_color" id="aworker7" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

	if(parseInt(initialData.Workers_Assembly_2) > 3){
		workerHtml2 += '<div class="admi_liblue" id="aworker8" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue deactive_color" id="aworker8" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

                                

	if(initialData.Workers_Assembly_3 > 0){
		workerHtml3 += '<div class="admi_liblue" id="aworker9" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" id="aworker9" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_3 > 1){
		workerHtml3 += '<div class="admi_liblue" id="aworker10" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" id="aworker10" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_3 > 2){
		workerHtml3 += '<div class="admi_liblue" id="aworker11" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" id="aworker11" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_3 > 3){
		workerHtml3 += '<div class="admi_liblue" id="aworker12" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" id="aworker12" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}


	document.getElementById("workerSlot1").innerHTML = workerHtml1;
	document.getElementById("workerSlot2").innerHTML = workerHtml2;
	document.getElementById("workerSlot3").innerHTML = workerHtml3;

}

function showAdjustWorker(){
    console.log("showAdjustWorker");
    // var removeAddClass = document.getElementById("upgradePointSlot1");               
    // removeAddClass.classList.remove("color_change");
    // var removeAddClass = document.getElementById("upgradePointSlot2");               
    // removeAddClass.classList.remove("color_change");
    // var removeAddClass = document.getElementById("upgradePointSlot3");               
    // removeAddClass.classList.remove("color_change");

    var removeAddClass = document.getElementById("assembltBeltSlot1");               
    removeAddClass.classList.add("color_change");

    var removeAddClass = document.getElementById("assembltBeltSlot2");               
    removeAddClass.classList.add("color_change");

    var removeAddClass = document.getElementById("assembltBeltSlot3");               
    removeAddClass.classList.add("color_change");

    //

    document.getElementById("aworker1").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker2").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker3").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker4").setAttribute("onclick", "changeColor(this)");

    document.getElementById("aworker5").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker6").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker7").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker8").setAttribute("onclick", "changeColor(this)");

    document.getElementById("aworker9").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker10").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker11").setAttribute("onclick", "changeColor(this)");
    document.getElementById("aworker12").setAttribute("onclick", "changeColor(this)");

    //

    document.getElementById("gameConfirmButton").innerHTML = "";
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">ADJUST WORKERS</div>'; 
}

function changeColor(e){
	//console.log("Change Color");
    localStorage.setItem("activeMen", 1);
	var belt_number = $(e).attr('belt_number');
	var add_worker = 0;
	if($(e).hasClass('deactive_color')){
		//console.log(true);
		$(e).removeClass("deactive_color");
		add_worker = 1;
	}
	else{
		//console.log(false);
		$(e).addClass("deactive_color");
		add_worker = -1;
	}

	if(parseInt(belt_number) == 1){
		var updateWorker1 = {
			Adjust_workers_on_assembly_belt_1: add_worker,
			action: "Adjust_workers_on_assembly_belt_1",
			participant_id: participant_id,
			quarter: quarter,
			team_id: team_id,
			workshop_id: workshop_id,
			year: year,
		}
		// //console.log("updateWorker1", updateWorker1);
		socket.emit('game_page_data', team_id, updateWorker1);
		socket.on('receive_game_page_data', function(responseData){

                document.getElementById("aworker1").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker2").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker3").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker4").setAttribute("onclick", "changeColor(this)");

                document.getElementById("aworker5").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker6").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker7").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker8").setAttribute("onclick", "changeColor(this)");

                document.getElementById("aworker9").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker10").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker11").setAttribute("onclick", "changeColor(this)");
                document.getElementById("aworker12").setAttribute("onclick", "changeColor(this)");

    	    	// console.log("Response Data", responseData);
    	    	// initialWorkerSetup(responseData);
                // setInitialConditionToAll(responseData);
                document.getElementById("gameConfirmButton").innerHTML = "";
                document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="startAssembly()">CONFIRM</div>'; 

    	    	
    	})
    }

	if(parseInt(belt_number) == 2){
		var updateWorker2 = {
			Adjust_workers_on_assembly_belt_2: add_worker,
			action: "Adjust_workers_on_assembly_belt_2",
			participant_id: participant_id,
			quarter: quarter,
			team_id: team_id,
			workshop_id: workshop_id,
			year: year,
		}
		// //console.log("updateWorker2", updateWorker2);
		socket.emit('game_page_data', team_id, updateWorker2);
		socket.on('receive_game_page_data', function(responseData){

	    	// console.log("Response Data", responseData);
	    	// initialWorkerSetup(responseData);
            // setInitialConditionToAll(responseData);
            document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="startAssembly()">CONFIRM</div>'; 
    });

	}

	if(parseInt(belt_number) == 3){
		var updateWorker3 = {
			Adjust_workers_on_assembly_belt_3: add_worker,
			action: "Adjust_workers_on_assembly_belt_3",
			participant_id: participant_id,
			quarter: quarter,
			team_id: team_id,
			workshop_id: workshop_id,
			year: year,
		}
		// //console.log("updateWorker3", updateWorker3);
		socket.emit('game_page_data', team_id, updateWorker3);
		socket.on('receive_game_page_data', function(responseData){

	    	// console.log("Response Data", responseData);
	    	// initialWorkerSetup(responseData);
            // setInitialConditionToAll(responseData);
            document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="startAssembly()">CONFIRM</div>'; 
	    });
	}


	
}


function startAssembly(){
    console.log("startAssembly");
    
    localStorage.removeItem("activeMen");
    

    socket.emit('initialConditionBySocket', team_id, data);

    socket.on('receive_initialConditionBySocket', function(initialData){
        // setInitialConditionToAll(initialData)
        var data = JSON.stringify(initialData);

        var removeAddClass = document.getElementById("assembltBeltSlot1");               
        removeAddClass.classList.remove("color_change");

        var removeAddClass = document.getElementById("assembltBeltSlot2");               
        removeAddClass.classList.remove("color_change");

        var removeAddClass = document.getElementById("assembltBeltSlot3");               
        removeAddClass.classList.remove("color_change");

        var removeAddClass = document.getElementById("goods_in_progress");               
        removeAddClass.classList.add("color_change");

        document.getElementById("shortTermLoan").innerHTML = "<span id='updateShortLoanIncome'>1</span>Short-term Financial liablity";

        document.getElementById("updateNewProductOnMachine").innerHTML = "<span class='color_change' href='javascript:void(0);' onclick='updateNewProduction("+data+")' id='goods_in_progress'>3</span>Goods in progress inventory";

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">START ASSEMBLY</div>'; 
    });

    
}

function fillBeltHtml(beltCapacity,leftMaterial,numbers)
{
    var goodsHtml = '';
    for(var i = 0;i<beltCapacity;i++)
    {
        if(leftMaterial > 0)
        {
            goodsHtml += '<div class="chane_box line_down">\
                            <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">1</div>\
                                    </div>\
                                </div>';
            leftMaterial--;
        }
        else
        {
            goodsHtml += '<div class="chane_box line_down">\
                            <div class="tabs_box">\
                                        <div class="tab_circle">0</div>\
                                        <div class="tab_circle_yellow">0</div>\
                                    </div>\
                                </div>';   
        }
    }
    return goodsHtml;
}

function updateNewProduction(initialData){
	console.log("Materials", initialData.Materials);
    console.log("initialData", initialData);

    var leftMaterial = initialData.Materials;
    var totalCapacity = 0;
    if(leftMaterial > 0)
    {
        var beltCapacity;
        if(initialData.Assembly_Belt_1_color == "Yellow"){
            beltCapacity = 2;  
            totalCapacity = totalCapacity+ 2;            
        }
        else if(initialData.Assembly_Belt_1_color == "Green"){
            beltCapacity = 3; 
            totalCapacity = totalCapacity+ 3;                             
        }
        else if(initialData.Assembly_Belt_1_color == "Black"){
            beltCapacity = 4;   
            totalCapacity = totalCapacity+ 4;           
        }
        // document.getElementById("goodsPlaceSlot1").innerHTML = fillBeltHtml(beltCapacity,leftMaterial);
        leftMaterial = leftMaterial - beltCapacity;
    }
    console.log("Total capacity", totalCapacity);
    if(leftMaterial > 0)
    {
        var beltCapacity;
        if(initialData.Assembly_Belt_2_color == "Yellow"){
            beltCapacity = 2; 
            totalCapacity = totalCapacity+ 2;            
        }
        else if(initialData.Assembly_Belt_2_color == "Green"){
            beltCapacity = 3;  
            totalCapacity = totalCapacity+ 3;                           
        }
        else if(initialData.Assembly_Belt_2_color == "Black"){
            beltCapacity = 4; 
            totalCapacity = totalCapacity+ 4;            
        }
        // document.getElementById("goodsPlaceSlot2").innerHTML = fillBeltHtml(beltCapacity,leftMaterial);
        leftMaterial = leftMaterial - beltCapacity;
    }

    if(leftMaterial > 0)
    {
        var beltCapacity;
        if(initialData.Assembly_Belt_3_color == "Yellow"){
            console.log("Yellow color");
            beltCapacity = 2; 
            totalCapacity = totalCapacity+ 2;            
        }
        else if(initialData.Assembly_Belt_3_color == "Green"){
            beltCapacity = 3;  
            totalCapacity = totalCapacity+ 3;                           
        }
        else if(initialData.Assembly_Belt_3_color == "Black"){
            beltCapacity = 4; 
            totalCapacity = totalCapacity+ 4;            
        }
        // document.getElementById("goodsPlaceSlot2").innerHTML = fillBeltHtml(beltCapacity,leftMaterial);
        leftMaterial = leftMaterial - beltCapacity;
    }

    console.log("Total capacity", totalCapacity);
    console.log("initial Materials", initialData.Materials);

    var updatedCapacity;
    if(initialData.Materials >= totalCapacity){
        updatedCapacity = totalCapacity;
    }
    else{
        updatedCapacity = initialData.Materials;
    }


    var Start_new_production = {
        Start_new_production: updatedCapacity,
        action: "Start_new_production",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }

    console.log("YY START NEW PRODUCTION", Start_new_production);
    socket.emit('game_page_data', team_id, Start_new_production);
    socket.on('receive_game_page_data', function(responseData){
        console.log("Response");
       // setInitialConditionToAll(responseData);
        
        var leftMaterial = initialData.Materials;
        var totalCapacity;
        if(leftMaterial > 0)
        {
            var beltCapacity;
            var numbers = [];
            if(initialData.Assembly_Belt_1_color == "Yellow"){
                beltCapacity = 2;  
                totalCapacity = 2;            
                numbers = [3,3];
            }
            else if(initialData.Assembly_Belt_1_color == "Green"){
                beltCapacity = 3; 
                totalCapacity = 3;                             
                numbers = [3,2,2];
            }
            else if(initialData.Assembly_Belt_1_color == "Black"){
                beltCapacity = 4;   
                totalCapacity = 4;           
                numbers = [2,2,2,2];
            }
            document.getElementById("goodsPlaceSlot1").innerHTML = fillBeltHtml(beltCapacity,leftMaterial,numbers);
            leftMaterial = leftMaterial - beltCapacity;
        }

        if(leftMaterial > 0)
        {
            var beltCapacity;
            var numbers = [];
            if(initialData.Assembly_Belt_2_color == "Yellow"){
                beltCapacity = 2; 
                totalCapacity = 2;            
                numbers = [3,3];
            }
            else if(initialData.Assembly_Belt_2_color == "Green"){
                beltCapacity = 3;  
                totalCapacity = 3;                           
                numbers = [3,2,2];
            }
            else if(initialData.Assembly_Belt_2_color == "Black"){
                beltCapacity = 4; 
                totalCapacity = 4;            
                numbers = [2,2,2,2];
            }
            document.getElementById("goodsPlaceSlot2").innerHTML = fillBeltHtml(beltCapacity,leftMaterial,numbers);
            leftMaterial = leftMaterial - beltCapacity;
        }
        if(leftMaterial > 0)
        {
            var beltCapacity;
            var numbers = [];
            if(initialData.Assembly_Belt_3_color == "Yellow"){
                beltCapacity = 2; 
                totalCapacity = 2;            
                numbers = [3,3];
            }
            else if(initialData.Assembly_Belt_3_color == "Green"){
                beltCapacity = 3;  
                totalCapacity = 3;                           
                numbers = [3,2,2];
            }
            else if(initialData.Assembly_Belt_3_color == "Black"){
                beltCapacity = 4; 
                totalCapacity = 4;            
                numbers = [2,2,2,2];
            }
            document.getElementById("goodsPlaceSlot3").innerHTML = fillBeltHtml(beltCapacity,leftMaterial,numbers);
            leftMaterial = leftMaterial - beltCapacity;
        }

        var data = JSON.stringify(initialData);
        document.getElementById("updateNewProductOnMachine").innerHTML = "<span href='javascript:void(0);' id='goods_in_progress'>3</span>Goods in progress inventory";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='showPayWrokers("+data+")'>CONFIRM</div>"; 

    })

    // start_ADMINISTRATION_IT_AND_FINANCE(initialData);

}

function showPayWrokers(initialData){
    console.log("Show pay worker");
    var data = JSON.stringify(initialData);
    document.getElementById("updateNewProductOnMachine").innerHTML = "<span class='color_change' href='javascript:void(0);' onclick='payWrokersOnMachine("+data+")' id='goods_in_progress'>3</span>Goods in progress inventory";

    document.getElementById("gameConfirmButton").innerHTML = "";
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">PAY WORKERS</div>'; 
}

function PayBeltWorkerHtml(beltCapacity,leftMaterial,numbers)
{
    var goodsHtml = '';
    for(var i = 0;i<beltCapacity;i++)
    {
        if(leftMaterial > 0)
        {
            goodsHtml += '<div class="chane_box line_down">\
                            <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">'+numbers[i]+'</div>\
                                    </div>\
                                </div>';
            leftMaterial--;
        }
        else
        {
            goodsHtml += '<div class="chane_box line_down">\
                            <div class="tabs_box">\
                                        <div class="tab_circle">0</div>\
                                        <div class="tab_circle_yellow">0</div>\
                                    </div>\
                                </div>';   
        }
    }
    return goodsHtml;
}

function payWrokersOnMachine(initialData){
    console.log("Show Pay Workers", initialData);

    // socket.emit('game_page_data', team_id, Start_new_production);
    // socket.on('receive_game_page_data', function(responseData){
        console.log("Response");
        // setInitialConditionToAll(responseData);
        
        var leftMaterial = initialData.Materials;
        var totalCapacity;
        if(leftMaterial > 0)
        {
            var beltCapacity;
            var numbers = [];
            if(initialData.Assembly_Belt_1_color == "Yellow"){
                beltCapacity = 2;  
                totalCapacity = 2;            
                numbers = [3,3];
            }
            else if(initialData.Assembly_Belt_1_color == "Green"){
                beltCapacity = 3; 
                totalCapacity = 3;                             
                numbers = [3,2,2];
            }
            else if(initialData.Assembly_Belt_1_color == "Black"){
                beltCapacity = 4;   
                totalCapacity = 4;           
                numbers = [2,2,2,2];
            }
            document.getElementById("goodsPlaceSlot1").innerHTML = PayBeltWorkerHtml(beltCapacity,leftMaterial,numbers);
            leftMaterial = leftMaterial - beltCapacity;
        }

        if(leftMaterial > 0)
        {
            var beltCapacity;
            var numbers = [];
            if(initialData.Assembly_Belt_2_color == "Yellow"){
                beltCapacity = 2; 
                totalCapacity = 2;            
                numbers = [3,3];
            }
            else if(initialData.Assembly_Belt_2_color == "Green"){
                beltCapacity = 3;  
                totalCapacity = 3;                           
                numbers = [3,2,2];
            }
            else if(initialData.Assembly_Belt_2_color == "Black"){
                beltCapacity = 4; 
                totalCapacity = 4;            
                numbers = [2,2,2,2];
            }
            document.getElementById("goodsPlaceSlot2").innerHTML = PayBeltWorkerHtml(beltCapacity,leftMaterial,numbers);
            leftMaterial = leftMaterial - beltCapacity;
        }

        if(leftMaterial > 0)
        {
            var beltCapacity;
            var numbers = [];
            if(initialData.Assembly_Belt_3_color == "Yellow"){
                beltCapacity = 2; 
                totalCapacity = 2;            
                numbers = [3,3];
            }
            else if(initialData.Assembly_Belt_3_color == "Green"){
                beltCapacity = 3;  
                totalCapacity = 3;                           
                numbers = [3,2,2];
            }
            else if(initialData.Assembly_Belt_3_color == "Black"){
                beltCapacity = 4; 
                totalCapacity = 4;            
                numbers = [2,2,2,2];
            }
            document.getElementById("goodsPlaceSlot3").innerHTML = PayBeltWorkerHtml(beltCapacity,leftMaterial,numbers);
            leftMaterial = leftMaterial - beltCapacity;
        }


        /*
          code added by OM KUMAR YADAV -- START
        */

        var payworkers = parseInt(initialData.Workers_Assembly_1) + parseInt(initialData.Workers_Assembly_2) + parseInt(initialData.Workers_Assembly_3) + parseInt(initialData.Workers_Assembly_4);

    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,
        'action': 'payworkers', 
        'payworkers':payworkers,
    }

    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){

        setInitialConditionToAll(responseData);
        initialData = responseData;
 document.getElementById("updateNewProductOnMachine").innerHTML = "<span href='javascript:void(0);' id='goods_in_progress'>3</span>Goods in progress inventory";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="start_ADMINISTRATION_IT_AND_FINANCE()">CONFIRM</div>'; 
    });



        /*
          code added by OM KUMAR YADAV -- END
        */

       

        //start_ADMINISTRATION_IT_AND_FINANCE(initialData);
    // })
}

function startResearchDevelopment(initialData){
    var removeClass = document.getElementById("researchDevelopemtWorker");               
    removeClass.classList.add("color_change");

    // document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">ADJUST R&D</div>'; 
    document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='start_SALES("+JSON.stringify(initialData)+")'>CONFIRM</div>"; 

    var rd_quantity = parseInt(initialData.R_D_Quality_Development);
    var researchDevelopmet = '';

    if(rd_quantity > 0){
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line" onclick="changeRDColor(this)"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div>';
    }
    else{
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line light_blue" onclick="changeRDColor(this)"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div>';
    }

    if(rd_quantity > 1){
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line" onclick="changeRDColorSecond(this)"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div></div><div class="plus_all_gra">';

    }
    else{
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line light_blue" onclick="changeRDColorSecond(this)"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div></div><div class="plus_all_gra">';
    }

    if(rd_quantity > 2){
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line" onclick="changeRDColor(this)"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div>';

    }
    else{
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line light_blue" onclick="changeRDColor(this)"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div>';
    }

    if(rd_quantity > 3){
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line" onclick="changeRDColor(this)"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div></div><div class="plus_all_gra">';

    }
    else{
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line light_blue" onclick="changeRDColor(this)"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div></div><div class="plus_all_gra">';
    }
    
    document.getElementById("researchDevelopemtWorker").innerHTML = researchDevelopmet;

    document.getElementById("action_count_num").innerHTML = '5';
}


// Code for Action 5
function initialSetupResearchDevelopment(initialData){
    //console.log("initialSetupResearchDevelopment", initialData);
    // light_blue
    var rd_quantity = parseInt(initialData.R_D_Quality_Development);
    var researchDevelopmet = '';

    if(rd_quantity > 0){
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div>';
    }
    else{
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line light_blue"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div>';
    }

    if(rd_quantity > 1){
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div></div><div class="plus_all_gra">';

    }
    else{
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line light_blue"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div></div><div class="plus_all_gra">';
    }

    if(rd_quantity > 2){
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div>';

    }
    else{
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line light_blue"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div>';
    }

    if(rd_quantity > 3){
        researchDevelopmet += '<div class="plus_all_gra">\
                                    <div class="ver_tiw">\
                                        <div class="admi_liblue bellow_line"><img src="images/white_man.svg" alt=""></div>\
                                        <div class="numbs_small">+1</div>\
                                    </div></div><div class="plus_all_gra">';

    }
    else{
        researchDevelopmet += '<div class="ver_tiw">\
                                    <div class="admi_liblue bellow_line light_blue"><img src="images/white_man.svg" alt=""></div>\
                                    <div class="numbs_small">+1</div>\
                                </div></div><div class="plus_all_gra">';
    }
    
    document.getElementById("researchDevelopemtWorker").innerHTML = researchDevelopmet;

    // document.getElementById("gameConfirmButton").innerHTML = "";
    // document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">ADJUST R&D</div>'; 
}

function adjustRDFirst(responseData){
    var Adjust_R_D_quality_development_resources = {
        R_D_Quality_Development: 0,
        R_D_Quality_Index: 1,
        action: "Adjust_R_D_quality_development_resources_second",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    
    socket.emit('game_page_data', team_id, Adjust_R_D_quality_development_resources);
    socket.on('receive_game_page_data', function(responseData){
        // console.log("Response Data", responseData);
        // initialWorkerSetup(responseData);
        setInitialConditionToAll(responseData);
        startResearchDevelopment(responseData);
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='start_SALES("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    });
}

function changeRDColorSecond(e){
    console.log("changeRDColor");

    var rd_worker = 0;
    if($(e).hasClass('light_blue')){
        console.log(true);
        $(e).removeClass("light_blue");
        rd_worker = 2;
    }
    else{
        console.log(false);
        $(e).addClass("light_blue");
        rd_worker = -1;
    }

    var Adjust_R_D_quality_development_resources = {
        R_D_Quality_Development: 1,
        R_D_Quality_Index: rd_worker,
        action: "Adjust_R_D_quality_development_resources_second",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    
    socket.emit('game_page_data', team_id, Adjust_R_D_quality_development_resources);
    socket.on('receive_game_page_data', function(responseData){
        // console.log("Response Data", responseData);
        // initialWorkerSetup(responseData);
        setInitialConditionToAll(responseData);
        startResearchDevelopment(responseData);
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='start_SALES("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    });
}

function changeRDColor(e){
    console.log("changeRDColor");

    var rd_worker = 0;
    if($(e).hasClass('light_blue')){
        console.log(true);
        $(e).removeClass("light_blue");
        rd_worker = 1;
    }
    else{
        console.log(false);
        $(e).addClass("light_blue");
        rd_worker = -1;
    }

    // var changeColor = {
    //     Adjust_sales_force: add_worker,
    //     action: "Adjust_sales_force",
    //     participant_id: participant_id,
    //     quarter: quarter,
    //     team_id: team_id,
    //     workshop_id: workshop_id,
    //     year: year,
    // }
    var Adjust_R_D_quality_development_resources = {
        R_D_Quality_Development: rd_worker,
        R_D_Quality_Index: rd_worker,
        action: "Adjust_R_D_quality_development_resources_second",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    
    socket.emit('game_page_data', team_id, Adjust_R_D_quality_development_resources);
    socket.on('receive_game_page_data', function(responseData){
        // console.log("Response Data", responseData);
        // initialWorkerSetup(responseData);
        setInitialConditionToAll(responseData);
        startResearchDevelopment(responseData);
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = "<div class='aircon_white org_ns' onclick='start_SALES("+JSON.stringify(responseData)+")'>CONFIRM</div>"; 
    });
}

function initialAdvertising(initialData){
    document.getElementById("decreaseMarketing").removeAttribute("onclick");
    document.getElementById("increaseMarketing").removeAttribute("onclick");
}

function startMarketing(){
    document.getElementById("action_count_num").innerHTML = '7';
    var removeAddClass = document.getElementById("marketingCounter");               
    removeAddClass.classList.add("color_change");

    document.getElementById("SALES_BACKGROUND").style.backgroundColor = '#cfe0f4';

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">MARKETING</div>'; 

    document.getElementById("decreaseMarketing").setAttribute("onclick","decreaseMarketing()");
    document.getElementById("increaseMarketing").setAttribute("onclick", "increaseMarketing()");
}

function initialMarketing(initialData){
    console.log("initialMarketing", initialData);
    var removeAddClass = document.getElementById("marketingCounter");               
    removeAddClass.classList.remove("color_change");

    var researchDevelopmetIndex = '';

    researchDevelopmetIndex += '<div class="man_hole">\
                                    <div class="admi_liblue two_cokka"><img src="images/white_man.svg" alt=""></div><div class="alert_twoRow">';


    if(initialData.R_D_Quality_Index > 0){
        researchDevelopmetIndex += '<div class="alert_circle"><img src="images/alert_black.svg" alt=""/></div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_circle light_blue"><img src="images/alert_black.svg" alt=""/></div>';
    }

    if(initialData.R_D_Quality_Index > 3){
        researchDevelopmetIndex += '<div class="alert_circle"><img src="images/alert_black.svg" alt=""/></div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_circle light_blue"><img src="images/alert_black.svg" alt=""/></div>';
    }
    
    researchDevelopmetIndex +=   '</div>\
                                    <div class="alert_twoRow">';

    if(initialData.R_D_Quality_Index > 0){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">1</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">1</div>';   
    }
    if(initialData.R_D_Quality_Index > 3){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">4</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">4</div>';
    }
    researchDevelopmetIndex +=  '</div>\
                                    <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 1){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">2</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">2</div>';   
    }
    if(initialData.R_D_Quality_Index > 4){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">5</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">5</div>';
    }
    researchDevelopmetIndex +=  '</div>\
                                    <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 2){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">3</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">3</div>';   
    }
    if(initialData.R_D_Quality_Index > 5){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">6</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">6</div>';
    }
    researchDevelopmetIndex += '</div>\
                                </div>\
                                <div class="man_hole">';

    if(initialData.R_D_Quality_Management > 1){
        researchDevelopmetIndex += '<div class="admi_liblue two_cokka light_blue"><img src="images/white_man.svg" alt=""></div>';    
    }
    else{
        researchDevelopmetIndex += '<div class="admi_liblue two_cokka light_blue"><img src="images/white_man.svg" alt=""></div>';
    }
        researchDevelopmetIndex += '<div class="alert_twoRow">';

    if(initialData.R_D_Quality_Index > 6){
        researchDevelopmetIndex += '<div class="alert_circle"><img src="images/alert_black.svg" alt=""/></div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_circle light_blue"><img src="images/alert_black.svg" alt=""/></div>';
    }

    if(initialData.R_D_Quality_Index > 9){
        researchDevelopmetIndex += '<div class="alert_circle"><img src="images/alert_black.svg" alt=""/></div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_circle light_blue"><img src="images/alert_black.svg" alt=""/></div>';
    }
                                    
    researchDevelopmetIndex += '</div>\
                                <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 6){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">7</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">7</div>';   
    }
    if(initialData.R_D_Quality_Index > 9){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">10</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">10</div>';
    }
    researchDevelopmetIndex += '</div>\
                                <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 7){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">8</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">8</div>';   
    }
    if(initialData.R_D_Quality_Index > 10){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">11</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">11</div>';
    }
    researchDevelopmetIndex += '</div>\
                                <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 8){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">9</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">9</div>';   
    }
    if(initialData.R_D_Quality_Index > 11){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">12</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">12</div>';
    }
    researchDevelopmetIndex += '</div>\
                            </div>\
                            <div class="man_hole">';
    if(initialData.R_D_Quality_Management > 2){
        researchDevelopmetIndex += '<div class="admi_liblue two_cokka light_blue"><img src="images/white_man.svg" alt=""></div>';    
    }
    else{
        researchDevelopmetIndex += '<div class="admi_liblue two_cokka light_blue"><img src="images/white_man.svg" alt=""></div>';
    }
        researchDevelopmetIndex += '<div class="alert_twoRow">';
    
    if(initialData.R_D_Quality_Index > 12){
        researchDevelopmetIndex += '<div class="alert_circle"><img src="images/alert_black.svg" alt=""/></div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_circle light_blue"><img src="images/alert_black.svg" alt=""/></div>';
    }

    if(initialData.R_D_Quality_Index > 15){
        researchDevelopmetIndex += '<div class="alert_circle"><img src="images/alert_black.svg" alt=""/></div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_circle light_blue"><img src="images/alert_black.svg" alt=""/></div>';
    }
                                    
    researchDevelopmetIndex += '</div>\
                                    <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 12){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">13</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">13</div>';   
    }
    if(initialData.R_D_Quality_Index > 15){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">16</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">16</div>';
    }
    researchDevelopmetIndex += '</div>\
                                    <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 13){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle" style="margin-left:5px">14</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle"  style="margin-left:5px">14</div>';   
    }
    researchDevelopmetIndex += '</div>\
                                    <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 14){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle"  style="margin-left:5px">15</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle"  style="margin-left:5px">15</div>';   
    }
    researchDevelopmetIndex += '</div>\
                                    </div>\
                                </div>';

    document.getElementById("researchDevelopemtManagement").innerHTML = researchDevelopmetIndex;

    // document.getElementById("gameConfirmButton").innerHTML = "";
    // document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" onclick="">MARKETING</div>'; 
}

function decreaseMarketing(){
    var val = parseInt(document.getElementById("marketingprod").innerHTML); //marketingval

    if(val>1){
      val = val-1;
    }else{
        val = 1;
    }
    document.getElementById("marketingprod").innerHTML = val;
    document.getElementById("marketingval").innerHTML = val;
    var mpower = document.getElementById("marketing_power").textContent;

    var Update_marketing_board_sales_strategy = {
        ADVERTISING: -1,
        marketing_power: parseInt(mpower) - 1,
        action: "ADVERTISING",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    console.log("Update_marketing_board_sales_strategy", Update_marketing_board_sales_strategy);
    socket.emit('game_page_data', team_id, Update_marketing_board_sales_strategy);
    socket.on('receive_game_page_data', function(responseData){
        console.log("receive_game_page_data", responseData);
        setInitialConditionToAll(responseData);
        document.getElementById("SALES_BACKGROUND").style.backgroundColor = '#cfe0f4';
        document.getElementById("action_count_num").innerHTML = '7';

        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="confirmMarketing()" id="startGame">CONFIRM</div>';

        var removeAddClass = document.getElementById("marketingCounter");               
        removeAddClass.classList.add("color_change");
        document.getElementById("decreaseMarketing").setAttribute("onclick","decreaseMarketing()");
        document.getElementById("increaseMarketing").setAttribute("onclick", "increaseMarketing()");

    });
        
}


function increaseMarketing(){
    var val = parseInt(document.getElementById("marketingprod").innerHTML); //marketingval
    if(val<20){
      val = val+1;
    }else{
        val = 1;
    }
    document.getElementById("marketingprod").innerHTML = val;
    document.getElementById("marketingval").innerHTML = val;
    var mpower = document.getElementById("marketing_power").textContent;

    var Update_marketing_board_sales_strategy = {
        ADVERTISING: 1,
        marketing_power: parseInt(mpower) + 1,
        action: "ADVERTISING",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    console.log("Update_marketing_board_sales_strategy", Update_marketing_board_sales_strategy);
    socket.emit('game_page_data', team_id, Update_marketing_board_sales_strategy);
    socket.on('receive_game_page_data', function(responseData){
        console.log("receive_game_page_data", responseData);
        setInitialConditionToAll(responseData);
        document.getElementById("SALES_BACKGROUND").style.backgroundColor = '#cfe0f4';
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="confirmMarketing()" id="startGame">CONFIRM</div>';
        var removeAddClass = document.getElementById("marketingCounter");               
        removeAddClass.classList.add("color_change");
        document.getElementById("action_count_num").innerHTML = '7';

        document.getElementById("decreaseMarketing").setAttribute("onclick","decreaseMarketing()");
        document.getElementById("increaseMarketing").setAttribute("onclick", "increaseMarketing()");
    });

}

function confirmMarketing(){
    console.log("confirmMarketingValue");
    document.getElementById("decreaseMarketing").removeAttribute("onclick");
    document.getElementById("increaseMarketing").removeAttribute("onclick");
    var removeAddClass = document.getElementById("marketingCounter");               
    removeAddClass.classList.remove("color_change");

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" id="startGame">GO TO MARKET</div>';

    var participant_jwt = "Bearer "+localStorage.getItem("participant_jwt");
    var data = {workshop_id:workshop_id};
    $.ajax({
        type: 'POST',
        url: 'http://54.198.46.240:3006/participant/code/getTeam',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: {
            Authorization: participant_jwt
        },
        success: function(response) {
            if(response.success == 1){
                console.log("Response data 12333", response.responceData);
                teamData = response.responceData;
                // var teamData.forEach(function(data, index){
                renderMarketBoard(teamData);
                // })
            }else{
                alert(response.message);
                window.location.replace("index.html");
            }
        },
        error: function (textStatus, errorThrown) {
            alert('Unable tp proccess');  
        }   
    });
    setTimeout(function(){
        allOrderCards();
    },3000)
    
}

function allOrderCards(){
    var orderMarketCard = {
        No_of_teams: 5,
        team_id: team_id,
        workshop_id: workshop_id,
        Year: year,
    }
    console.log("Change Color ", orderMarketCard);
    var local_team_id = localStorage.getItem("team_id");
    socket.emit('getTeamOrderCard', team_id, orderMarketCard);
    socket.on('getTeamOrderCard_recieve', function(msg){
        console.log("Message ", msg); 
        console.log("Message ", msg.enable_team_id);  
        console.log("Message local ", local_team_id);  
        var orderCard = '';
        msg.results.forEach(function (data, index) { 
            var cardData = JSON.stringify(data);
            if(data.selected){
                orderCard += "<div class='order_blue_box' onclick='selectOrderCard("+cardData+")' style='opacity: 0.5;'>\
                        <div class='oder_head'>\
                            <h4>Order</h4>\
                            <h2>"+data.Order_No+"</h2>\
                        </div>\
                        <div class='secBg_head'>\
                            <div class='oder_unit_box'>\
                                <h4>Unites</h4>\
                                <div class='circle_green_stor'>\
                                    <h2>"+data.Units+"</h2>\
                                </div>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Price</h4>\
                                <h5 class='cash_ri'>"+data.Price+"</h5>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Net Sales</h4>\
                                <div class='circle_green_stor yellow'>\
                                    <h2>"+data.Net_sales+"</h2>\
                                </div>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Payment <br> terms</h4>\
                                <h5 class='cash_ri'>"+data.Payment_terms+"</h5>\
                            </div>\
                        </div>\
                    </div>";
            }
            else if(parseInt(msg.enable_team_id) == parseInt(local_team_id)){
                orderCard += "<div class='order_blue_box' onclick='selectOrderCard("+cardData+")'>\
                        <div class='oder_head'>\
                            <h4>Order</h4>\
                            <h2>"+data.Order_No+"</h2>\
                        </div>\
                        <div class='secBg_head'>\
                            <div class='oder_unit_box'>\
                                <h4>Unites</h4>\
                                <div class='circle_green_stor'>\
                                    <h2>"+data.Units+"</h2>\
                                </div>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Price</h4>\
                                <h5 class='cash_ri'>"+data.Price+"</h5>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Net Sales</h4>\
                                <div class='circle_green_stor yellow'>\
                                    <h2>"+data.Net_sales+"</h2>\
                                </div>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Payment <br> terms</h4>\
                                <h5 class='cash_ri'>"+data.Payment_terms+"</h5>\
                            </div>\
                        </div>\
                    </div>";
            }
            else {
                orderCard += "<div class='order_blue_box' style='opacity: 0.5;'>\
                        <div class='oder_head'>\
                            <h4>Order</h4>\
                            <h2>"+data.Order_No+"</h2>\
                        </div>\
                        <div class='secBg_head'>\
                            <div class='oder_unit_box'>\
                                <h4>Unites</h4>\
                                <div class='circle_green_stor'>\
                                    <h2>"+data.Units+"</h2>\
                                </div>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Price</h4>\
                                <h5 class='cash_ri'>"+data.Price+"</h5>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Net Sales</h4>\
                                <div class='circle_green_stor yellow'>\
                                    <h2>"+data.Net_sales+"</h2>\
                                </div>\
                            </div>\
                            <div class='oder_unit_box'>\
                                <h4>Payment <br> terms</h4>\
                                <h5 class='cash_ri'>"+data.Payment_terms+"</h5>\
                            </div>\
                        </div>\
                    </div>";
            }
            
        });

        console.log('waiting'+msg.enable_team_id);
       // document.getElementById('waiting'+msg.enable_team_id).innerHTML = "<div class='aircon_light_blues' style='background:#F59C33;'>CONFIRM</div>";

        document.getElementById("orderCards").innerHTML = orderCard;

        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="start_OUTBOUND_LOGISTICS()" id="startGame">Start Outbound</div>';
    }); 
}

// For generating HEX

var alpha = "abcdefghijklmnopqrstuvwxyz";

function hex(a) {
    // First figure out how many digits there are.
    a += 1; // This line is funky
    c = 0;
    var x = 1;      
    while (a >= x) {
        c++;
        a -= x;
        x *= 26;
    }

    // Now you can do normal base conversion.
    var s = "";
    for (var i = 0; i < c; i++) {
        s = alpha.charAt(a % 26) + s;
        a = Math.floor(a/26);
    }

    return s;
}

function renderMarketBoard(teamData){
    console.log("Team data", teamData);
    var companyList = '';
    var i = 0;
    teamData.forEach(function(data, index){
        console.log("Data", data);
        companyList += '<div class="company_long_box">\
                    <h3 class="sub_heading_ns">COMPANY</h3>\
                    <div class="aircon_wrap">\
                        <div class="blue_mark_lab">'+hex(i).toUpperCase()+'</div>\
                        <div class="aircon_white">'+data.virtual_company_name+'</div>\
                    </div>\
                    <h4 class="marketing_pw">MARKETING POWER <span>RANK</span></h4>\
                    <div class="allert_main_one">\
                        <div class="alert_green_sy_left">\
                            <div class="alet_big"><img src="images/alert_black.svg" alt=""></div>\
                            <div class="big_circle_green_ms">'+data.marketing_power+'</div>\
                        </div>\
                        <div class="alert_right_blue_mark_lab">'+(i+1)+'</div>\
                    </div>\
                    <div class="allert_main_one">\
                        <h2 class="marketing_pw">ORDERS</h2>\
                        <div class="order_right_white">5</div>\
                    </div>\
                    <div class="order_for_by_two" id="company'+data.id+'">\
                        \
                    </div>\
                    <h5 class="marketing_pw">ACTION (DECISION)</h5>\
                    <div class="aircon_wrap">\
                        <div class="blue_mark_lab">7</div>\
                        <div class="" id="waiting'+data.id+'">\
                            <div class="aircon_light_blues">WAITING</div>\
                        </div>\
                    </div>\
                </div>';
                i++;
    });
    document.getElementById("companyList").innerHTML = companyList;
}

function selectOrderCard(data){
    console.log("selectOrderCard", data);
    socket.emit('joinWorshop', workshop_id);

    var orderCardRequest = {
        Letter_ref: data.Letter_ref, 
        Net_sales: data.Net_sales, 
        No_of_teams: data.No_of_teams, 
        Order_No: data.Order_No, 
        Payment_terms: data.Payment_terms, 
        Price: data.Price, 
        Units: data.Unites, 
        Year: year, 
        id: data.card_id,
        participant_id: participant_id,
        team_id: team_id,
        workshop_id: workshop_id,
    }

    socket.emit('card_selection', workshop_id, orderCardRequest);
    var cardHtml = '';
    var oldHtml = "";
    oldHtml = document.getElementById("company"+team_id).innerHTML;
    console.log("old html ",oldHtml);
    socket.on('card_selection_recieve', function(responseData){
        console.log("Response data after card selection ",responseData);  
        allOrderCards(responseData);
        console.log("Response data-------",responseData.team_id);  
        var team_id = localStorage.getItem("team_id");
        console.log("Team id--------", team_id);
        if(responseData.team_id == team_id){

            cardHtml += '<div class="order_light_box">\
                            <div class="order_blue_box">\
                                <div class="oder_head">\
                                    <h4>Order</h4>\
                                    <h2>'+data.Order_No+'</h2>\
                                </div>\
                                <div class="secBg_head">\
                                    <div class="oder_unit_box">\
                                        <h4>Unites</h4>\
                                        <div class="circle_green_stor">\
                                            <h2>'+data.Units+'</h2>\
                                        </div>\
                                    </div>\
                                    <div class="oder_unit_box">\
                                        <h4>Price</h4>\
                                        <h5 class="cash_ri">'+data.Price+'</h5>\
                                    </div>\
                                    <div class="oder_unit_box">\
                                        <h4>Net Sales</h4>\
                                        <div class="circle_green_stor yellow">\
                                            <h2>'+data.Net_sales+'</h2>\
                                        </div>\
                                    </div>\
                                    <div class="oder_unit_box">\
                                        <h4>Payment <br> terms</h4>\
                                        <h5 class="cash_ri">'+data.Payment_terms+'</h5>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';
        }        
        oldHtml = oldHtml + cardHtml;
        document.getElementById('company'+responseData.team_id).innerHTML = oldHtml;
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="start_OUTBOUND_LOGISTICS()" id="startGame">Start Outbound</div>';

    }); 
    

}
