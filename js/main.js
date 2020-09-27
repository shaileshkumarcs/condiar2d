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

	//initialOutbound(initialData);
	initialAssemblySetup(initialData);
	initialWorkerSetup(initialData);
	updateNewProduction(initialData);
	

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

    initiate_Inbound_Logistics(initialData); // by OM KUMAR YAADAV
    initiate_ADMINISTRATION_IT_AND_FINANCE(initialData); // by OM KUMAR YAADAV
    initiate_SALES(initialData); // by OM KUMAR YAADAV
    initiate_OUTBOUND_LOGISTICS(initialData); // by OM KUMAR YAADAV
    initiate_SALES_EXPENSSES(initialData); // by OM KUMAR YAADAV
    initiate_MARKETING_EXPENSSES(initialData); // by OM KUMAR YAADAV

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
    	initialOutbound(responseData);
    	initialAssemblySetup(responseData);
    	initialWorkerSetup(responseData);
    	updateNewProduction(responseData);
    	initialData = responseData;
    });

    document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showPayInterest()">CONFIRM</div>';
	var trade_receivable = document.getElementById("trade_receivable");
	trade_receivable.classList.remove("color_change");
	// Order_material();
}


function showPayInterest(){
	var trade_receivable = document.getElementById("payInterest");
	trade_receivable.classList.add("color_change");

	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">PAY INTEREST</div>';
}	

function payInterest(){
	console.log("TTTT");

	var trade_receivable = document.getElementById("payInterest");
	trade_receivable.classList.remove("color_change");

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

    // Action 2 called
    start_Inbound_Logistics();

    
}

// Action 3 code start here
/*
function initialOutbound(initialData){
	console.log("Test", initialData);

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

function updateProduction(){
	var updateOngoingProduction = {
        Update_ongoing_production: 4,
        action: "Update_ongoing_production",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        value_per_unit: 3,
        workshop_id: workshop_id,
        year: year,
    };
    socket.emit('game_page_data', team_id, updateOngoingProduction);
	console.log("updateProduction");
}


function initialAssemblySetup(initialData){

	console.log("initialAssemblySetup", initialData);

	// Assembly Belt Slot 1 start
	var goodsHtmlSlot1 = '';
	var upgradePlaceSlot1 = '';
	if(initialData.Assembly_Belt_1 == "1"){
		if(initialData.Assembly_Belt_1_color == "Yellow"){
			if(initialData.Goods_in_Assembly_in_Units > 0){
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
            if(initialData.Goods_in_Assembly_in_Units > 1){               
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

            upgradePlaceSlot1 += '<div onclick="upgradeGreenBeltSlot1()">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
        }
        if(initialData.Assembly_Belt_1_color == "Green"){
			if(initialData.Goods_in_Assembly_in_Units > 0){
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
            if(initialData.Goods_in_Assembly_in_Units > 1){               
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
            if(initialData.Goods_in_Assembly_in_Units > 2){               
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

            upgradePlaceSlot1 += '<div onclick="upgradeBlackBeltSlot1()">\
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
			if(initialData.Goods_in_Assembly_in_Units > 0){
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
            if(initialData.Goods_in_Assembly_in_Units > 1){               
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
            if(initialData.Goods_in_Assembly_in_Units > 2){               
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
            if(initialData.Goods_in_Assembly_in_Units > 3){               
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

            upgradePlaceSlot1 += '<div onclick="upgradeBlackBeltSlot1()">\
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
            

        upgradePlaceSlot1 += '<div onclick="addYellowBeltSlot1()">\
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
		// if(initialData.Assembly_Belt_2_color == "Yellow"){
		// 	if(initialData.Goods_in_Assembly_in_Units > 0){
		// 	goodsHtmlSlot2 += '<div class="chane_box line_down">\
		// 					<div class="tabs_box">\
  //                                       <div class="tab_circle">1</div>\
  //                                       <div class="tab_circle_yellow">3</div>\
  //                                   </div>\
  //                               </div>';
  //                           }
  //           if(initialData.Goods_in_Assembly_in_Units > 1){               
  //               goodsHtmlSlot2 += '<div class="chane_box line_down">\
  //               					<div class="tabs_box">\
  //                                       <div class="tab_circle">1</div>\
  //                                       <div class="tab_circle_yellow">3</div>\
  //                                   </div>\
  //                               </div>';
  //           }

  //           if(initialData.Goods_in_Assembly_in_Units == 0){
  //           	goodsHtmlSlot2 += '<div class="chane_box line_down">\
		// 					<div class="tabs_box">\
  //                                       <div class="tab_circle">1</div>\
  //                                       <div class="tab_circle_yellow">3</div>\
  //                                   </div>\
  //                               </div>\
  //                               <div class="chane_box line_down">\
  //               					<div class="tabs_box">\
  //                                       <div class="tab_circle">1</div>\
  //                                       <div class="tab_circle_yellow">3</div>\
  //                                   </div>\
  //                               </div>';
  //           }


  //           upgradePlaceSlot2 += '<div onclick="upgradeGreenBeltSlot2()">\
  //                                   <h3>Upgrade</h3>\
  //                                   <div class="jcb_smwr">\
  //                                       <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
  //                                       <div class="ten_cds_red_sa">5</div>\
  //                                   </div>\
  //                                   <h3>Yellow Belt</h3>\
  //                               </div>';
  //       }
  		if(initialData.Assembly_Belt_2_color == "Yellow"){
			if(initialData.Goods_in_Assembly_in_Units > 0){
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
            if(initialData.Goods_in_Assembly_in_Units > 1){               
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

            upgradePlaceSlot2 += '<div onclick="upgradeGreenBeltSlot1()">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
        }
        if(initialData.Assembly_Belt_2_color == "Green"){
			if(initialData.Goods_in_Assembly_in_Units > 0){
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
            if(initialData.Goods_in_Assembly_in_Units > 1){               
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
            if(initialData.Goods_in_Assembly_in_Units > 2){               
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

            upgradePlaceSlot2 += '<div onclick="upgradeBlackBeltSlot1()">\
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
			if(initialData.Goods_in_Assembly_in_Units > 0){
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
            if(initialData.Goods_in_Assembly_in_Units > 1){               
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
            if(initialData.Goods_in_Assembly_in_Units > 2){               
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
            if(initialData.Goods_in_Assembly_in_Units > 3){               
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

            upgradePlaceSlot2 += '<div onclick="upgradeBlackBeltSlot1()">\
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
            

        upgradePlaceSlot2 += '<div onclick="addYellowBeltSlot2()">\
                                <h3>Upgrade</h3>\
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
		if(initialData.Assembly_Belt_3_color == "Yellow"){
			if(initialData.Goods_in_Assembly_in_Units > 0){
				goodsHtmlSlot3 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
                            }
            if(initialData.Goods_in_Assembly_in_Units > 1){               
                goodsHtmlSlot3 += '<div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }

            if(initialData.Goods_in_Assembly_in_Units == 0){
            	goodsHtmlSlot3 += '<div class="chane_box line_down">\
							<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                					<div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">3</div>\
                                    </div>\
                                </div>';
            }


            upgradePlaceSlot3 += '<div onclick="upgradeGreenBeltSlot3()">\
                                    <h3>Upgrade</h3>\
                                    <div class="jcb_smwr">\
                                        <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                        <div class="ten_cds_red_sa">5</div>\
                                    </div>\
                                    <h3>Yellow Belt</h3>\
                                </div>';
        }
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
            

        upgradePlaceSlot3 += '<div onclick="addYellowBeltSlot3()">\
                                <h3>Upgrade</h3>\
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
	var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeGreenBeltSlot1()">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Green Belt</h3>\
                        </div>';

        var removeClass = document.getElementById("goodsPlaceSlot1");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot1").innerHTML = upgradePlace; 
}

function upgradeGreenBeltSlot1(){
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
    	console.log("Response data", responseData);
    	initialAssemblySetup(responseData);
    });

	console.log("Slot1");
		var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeBlackBeltSlot1()">\
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
        Invest_upgrade_assembly_belt_2: 5,
        action: "Invest_upgrade_assembly_belt_1",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt1);
	var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="upgradeBlankBeltSlot1()">\
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
        Invest_upgrade_assembly_belt_2: 5,
        action: "Invest_upgrade_assembly_belt_1",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt1);
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

        var upgradePlace = '<div onclick="upgradeGreenBeltSlot1()">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Black Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot1");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot1").innerHTML = upgradePlace; 
}

// Assembly belt slot2
function addYellowBeltSlot2(){
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
            

    var upgradePlaceSlot2 = '<div onclick="upgradeGreenBeltSlot2()">\
                                <h3>Upgrade</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                <h3>Yellow Belt</h3>\
                            </div>';
	document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtmlSlot2;
	document.getElementById("upgradePointSlot2").innerHTML = upgradePlaceSlot2;
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

		var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeBlackBeltSlot2()">\
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

	var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="upgradeBlankBeltSlot2()">\
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

        var upgradePlace = '<div onclick="upgradeGreenBeltSlot2()">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Black Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot2");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot2").innerHTML = upgradePlace; 
}

// Assembly belt slot3
function addYellowBeltSlot3(){
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "Yellow",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
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
            

    var upgradePlaceSlot2 = '<div onclick="upgradeGreenBeltSlot3()">\
                                <h3>Upgrade</h3>\
                                <div class="jcb_smwr">\
                                    <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                    <div class="ten_cds_red_sa">5</div>\
                                </div>\
                                <h3>Yellow Belt</h3>\
                            </div>';
	document.getElementById("goodsPlaceSlot3").innerHTML = goodsHtmlSlot2;
	document.getElementById("upgradePointSlot3").innerHTML = upgradePlaceSlot2;
}
function upgradeGreenBeltSlot3(){
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "Green",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
		var goodsHtml ='<div class="chane_box line_down">\
							<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>\
                        <div class="chane_box line_down">\
        					<div class="tabs_box">\
                                <div class="tab_circle">1</div>\
                                <div class="tab_circle_yellow">3</div>\
                            </div>\
                        </div>';

        var upgradePlace = '<div onclick="upgradeBlackBeltSlot3()">\
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
}


function upgradeBlackBeltSlot3(){
	// console.log("initialData", initialData);
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "Black",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
	var goodsHtml ='<div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>\
                                <div class="chane_box line_down">\
                                    <div class="tabs_box">\
                                        <div class="tab_circle">1</div>\
                                        <div class="tab_circle_yellow">2</div>\
                                    </div>\
                                </div>';

        var upgradePlace = '<div onclick="upgradeBlankBeltSlot3()">\
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
}

function upgradeBlankBeltSlot3(){
	// console.log("initialData", initialData);
	var investUpgradeAssemblyBelt3 = {
        Assembly_Belt_color: "",
        Invest_upgrade_assembly_belt_2: 1,
        action: "Invest_upgrade_assembly_belt_3",
        participant_id: participant_id,
        quarter: quarter,
        team_id: team_id,
        workshop_id: workshop_id,
        year: year,
    }
    socket.emit('game_page_data', team_id, investUpgradeAssemblyBelt3);
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

        var upgradePlace = '<div onclick="upgradeGreenBeltSlot3()">\
                            <h3>Upgrade</h3>\
                            <div class="jcb_smwr">\
                                <div class="tcs_box"><img src="images/jcb.svg" alt=""> </div>\
                                <div class="ten_cds_red_sa">5</div>\
                            </div>\
                            <h3>Black Belt</h3>\
                        </div>';


        var removeClass = document.getElementById("goodsPlaceSlot3");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot3").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot3").innerHTML = upgradePlace; 
}

function initialWorkerSetup(initialData){
	console.log("initialWorkerSetup", initialData.Workers_Assembly_1);
	console.log("initialWorkerSetup", initialData.Workers_Assembly_2);
	console.log("initialWorkerSetup", initialData.Workers_Assembly_3);

	var workerHtml1 = '';
	var workerHtml2 = '';
	var workerHtml3 = '';
	if(initialData.Workers_Assembly_1 > 0){
		workerHtml1 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_1 > 1){
		workerHtml1 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_1 > 2){
		workerHtml1 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_1 > 3){
		workerHtml1 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml1 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="1"><img src="images/white_man.svg" alt=""></div>';
	}
                                

	if(initialData.Workers_Assembly_2 > 0){
		workerHtml2 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

	if(initialData.Workers_Assembly_2 > 1){
		workerHtml2 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

	if(initialData.Workers_Assembly_2 > 2){
		workerHtml2 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

	if(initialData.Workers_Assembly_2 > 3){
		workerHtml2 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml2 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="2"><img src="images/white_man.svg" alt=""></div>';
	}

                                

	if(initialData.Workers_Assembly_3 > 0){
		workerHtml3 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_3 > 1){
		workerHtml3 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_3 > 2){
		workerHtml3 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	if(initialData.Workers_Assembly_3 > 3){
		workerHtml3 += '<div class="admi_liblue" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}
	else{
		workerHtml3 += '<div class="admi_liblue deactive_color" onclick="changeColor(this)" belt_number="3"><img src="images/white_man.svg" alt=""></div>';
	}


	document.getElementById("workerSlot1").innerHTML = workerHtml1;
	document.getElementById("workerSlot2").innerHTML = workerHtml2;
	document.getElementById("workerSlot3").innerHTML = workerHtml3;

}

function changeColor(e){
	console.log("Change Color");
	var belt_number = $(e).attr('belt_number');
	var add_worker = 0;
	if($(e).hasClass('deactive_color')){
		console.log(true);
		$(e).removeClass("deactive_color");
		add_worker = 1;
	}
	else{
		console.log(false);
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
		// console.log("updateWorker1", updateWorker1);
		socket.emit('game_page_data', team_id, updateWorker1);
		socket.on('receive_game_page_data', function(responseData){
	    	// console.log("Response Data", responseData);
	    	initialWorkerSetup(responseData);
	    });
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
		// console.log("updateWorker2", updateWorker2);
		socket.emit('game_page_data', team_id, updateWorker2);
		socket.on('receive_game_page_data', function(responseData){
	    	// console.log("Response Data", responseData);
	    	initialWorkerSetup(responseData);
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
		// console.log("updateWorker3", updateWorker3);
		socket.emit('game_page_data', team_id, updateWorker3);
		socket.on('receive_game_page_data', function(responseData){
	    	// console.log("Response Data", responseData);
	    	initialWorkerSetup(responseData);
	    });
	}
	
}

function updateNewProduction(initialData){
	console.log("updateNewProduction", initialData);
	var goodsHtmlBelt1 = '';
	var goodsHtmlBelt2 = '';
	var goodsHtmlBelt3 = '';

	console.log("initialData", initialData.Assembly_Belt_1);
	console.log("initialData", initialData.Assembly_Belt_1_color);
	console.log("initialData", initialData.Assembly_Belt_2);
	console.log("initialData", initialData.Assembly_Belt_2_color);
	console.log("initialData", initialData.Assembly_Belt_3);
	console.log("initialData", initialData.Assembly_Belt_3_color);

	var Assembly_Belt_1 = 1;//initialData.Assembly_Belt_1;
	var Assembly_Belt_2 = 1;//initialData.Assembly_Belt_2;
	var Assembly_Belt_3 = 0;//initialData.Assembly_Belt_3;
	
	var Assembly_Belt_1_color = "Green";//initialData.Assembly_Belt_1_color;
	var Assembly_Belt_2_color = "Yellow";//initialData.Assembly_Belt_2_color;
	var Assembly_Belt_3_color = initialData.Assembly_Belt_3_color;


	// var goodsHtml ='<div class="chane_box line_down">\
	//                     <div class="tabs_box">\
	//                         <div class="tab_circle">1</div>\
	//                         <div class="tab_circle_yellow">2</div>\
	//                     </div>\
	//                 </div>';

}