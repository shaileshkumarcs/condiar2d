var team_id = localStorage.getItem("team_id");
var workshop_id = 9;
var participant_id = localStorage.getItem("participant_id");
var number_of_team = 4;

var quarter = 1;
var year = 1;
var initialData;


var socket = io('http://54.198.46.240:3006/');
// var socket = io('http://localhost:3006');
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
    // showAssemblyBeltUpgrade();
	//initialOutbound(initialData);
	initialAssemblySetup(initialData);
	initialWorkerSetup(initialData);
    initialSetupResearchDevelopment(initialData);
	// updateNewProduction(initialData);
	initiate_Inbound_Logistics(initialData); // by OM KUMAR YAADAV
	// updateNewProduction(initialData);
    initialMarketing(initialData);
	

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

    document.getElementById("marketingprod").innerHTML = initialData.ADVERTISING;
    document.getElementById("marketingval").innerHTML = initialData.ADVERTISING;

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
	////console.log("startGame");
	var trade_receivable = document.getElementById("trade_receivable");
	trade_receivable.classList.add("color_change");
	// trade_receivable.style.pointerEvents = "";
	document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">TRADE RECEIVABLES</div>';

}

function tradeUpdateToCash(){
	////console.log("tradeUpdateToCash");
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
    	////console.log("Response Data", responseData);
    	setInitialConditionToAll(responseData);
    	//initialOutbound(responseData);
    	// initialAssemblySetup(responseData);
    	// initialWorkerSetup(responseData);
        // initialSetupResearchDevelopment(responseData);
    	// updateNewProduction(responseData);
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
	////console.log("TTTT");

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

function updateLoan(Short_term_liabilities){
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

    var updateShortLoan = document.getElementById("updateShortLoanIncome");
    updateShortLoan.classList.remove("color_change");

    document.getElementById("gameConfirmButton").innerHTML = "";
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showTakoutLoan()">CONFIRM</div>';
}

function showTakoutLoan(){
	////console.log("showTakoutLoan");

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
        ////console.log("yyyyy", shortTermLoanValue);
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
	var longTermLoanValue = document.getElementById("longTermLoanValue").value;
	// var shareCapitalValue = document.getElementById("shareCapitalValue").value;
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

    //console.log("shortTermLoanApply", shortTermLoanApply);
    //console.log("longTermLoanApply", longTermLoanApply);
    socket.emit('game_page_data', team_id, shortTermLoanApply);
    socket.emit('game_page_data', team_id, longTermLoanApply);

    // Action 2 called
    start_Inbound_Logistics();

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


function updateFinishedGoods(){
    // console.log("initialData", initialData);
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
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAssemblyBeltUpgrade()">CONFIRM</div>';
     
    });

	
}

function showAssemblyBeltUpgrade(){
    console.log("TTEST");
    var changecolor = document.getElementById("upgradePointSlot1");
    changecolor.classList.add("color_change");
    var changecolor = document.getElementById("upgradePointSlot2");
    changecolor.classList.add("color_change");
    var changecolor = document.getElementById("upgradePointSlot3");
    changecolor.classList.add("color_change");
    document.getElementById("gameConfirmButton").innerHTML = "";
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white>ADJUST CAPACITY</div>';
}


function initialAssemblySetup(initialData){

	//console.log("initialAssemblySetup", initialData);

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

            upgradePlaceSlot1 += '<div onclick="upgradeBlankBeltSlot1()">\
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

            upgradePlaceSlot2 += '<div onclick="upgradeGreenBeltSlot2()">\
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

            upgradePlaceSlot2 += '<div onclick="upgradeBlackBeltSlot2()">\
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

            upgradePlaceSlot2 += '<div onclick="upgradeBlankBeltSlot2()">\
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
                            <h3>Yellow Belt</h3>\
                        </div>';

        var removeClass = document.getElementById("goodsPlaceSlot1");               
        removeClass.classList.add("last_art");
        document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
		document.getElementById("upgradePointSlot1").innerHTML = upgradePlace; 

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>';
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

        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>'; 
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

            document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>';
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

        var upgradePlace = '<div onclick="addYellowBeltSlot1()">\
                            <h3>Upgrade</h3>\
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
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>';
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

        document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>';
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

        document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>';
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

        document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>';
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

        var upgradePlace = '<div onclick="addYellowBeltSlot2()">\
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
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="showAdjustWorker()">CONFIRM</div>'; 
    })
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
	// //console.log("initialData", initialData);
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
	// //console.log("initialData", initialData);
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
	//console.log("initialWorkerSetup", initialData.Workers_Assembly_1);
	//console.log("initialWorkerSetup", initialData.Workers_Assembly_2);
	//console.log("initialWorkerSetup", initialData.Workers_Assembly_3);

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

function showAdjustWorker(){
    console.log("showAdjustWorker");
    var removeAddClass = document.getElementById("assembltBeltSlot1");               
    removeAddClass.classList.add("color_change");

    var removeAddClass = document.getElementById("assembltBeltSlot2");               
    removeAddClass.classList.add("color_change");

    document.getElementById("gameConfirmButton").innerHTML = "";
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">ADJUST WORKERS</div>'; 
}

function changeColor(e){
	//console.log("Change Color");
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

    	    	// console.log("Response Data", responseData);
    	    	// initialWorkerSetup(responseData);
                setInitialConditionToAll(responseData);
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
            setInitialConditionToAll(responseData);
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
            setInitialConditionToAll(responseData);
            document.getElementById("gameConfirmButton").innerHTML = "";
            document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="startAssembly()">CONFIRM</div>'; 
	    });
	}


	
}


function startAssembly(){
    console.log("startAssembly");
    var removeAddClass = document.getElementById("assembltBeltSlot1");               
    removeAddClass.classList.remove("color_change");

    var removeAddClass = document.getElementById("assembltBeltSlot2");               
    removeAddClass.classList.remove("color_change");

    var removeAddClass = document.getElementById("goods_in_progress");               
    removeAddClass.classList.add("color_change");

    document.getElementById("gameConfirmButton").innerHTML = "";
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">START ASSEMBLY</div>'; 
}


function updateNewProduction(){
	console.log("updateNewProduction", initialData);
    var totalCapacity = 0;
    if(initialData.Assembly_Belt_1_color == "Yellow"){
        totalCapacity = totalCapacity + 2;

        // var goodsHtml ='<div class="chane_box line_down">\
        //                     <div class="tabs_box">\
        //                         <div class="tab_circle">1</div>\
        //                         <div class="tab_circle_yellow">2</div>\
        //                     </div>\
        //                 </div>';

        // var goodsHtml ='<div class="chane_box line_down">\
        //                     <div class="tabs_box">\
        //                         <div class="tab_circle">1</div>\
        //                         <div class="tab_circle_yellow">2</div>\
        //                     </div>\
        //                 </div>';

        // document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
    }

    if(initialData.Assembly_Belt_1_color == "Green"){
        totalCapacity = totalCapacity + 3;
       // document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
    }

    if(initialData.Assembly_Belt_1_color == "Black"){
        totalCapacity = totalCapacity + 4;
       // document.getElementById("goodsPlaceSlot1").innerHTML = goodsHtml;
    }

    if(initialData.Assembly_Belt_2_color == "Yellow"){
        totalCapacity = totalCapacity + 2;
       // document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtml;
    }

    if(initialData.Assembly_Belt_2_color == "Green"){
        totalCapacity = totalCapacity + 3;
      //  document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtml;
    }

    if(initialData.Assembly_Belt_2_color == "Black"){
        totalCapacity = totalCapacity + 4;
        // document.getElementById("goodsPlaceSlot2").innerHTML = goodsHtml;
    }

    console.log("Total capacity", totalCapacity);


	// var goodsHtmlBelt1 = '';
	// var goodsHtmlBelt2 = '';
	// var goodsHtmlBelt3 = '';

	// //console.log("initialData", initialData.Assembly_Belt_1);
	// //console.log("initialData", initialData.Assembly_Belt_1_color);
	// //console.log("initialData", initialData.Assembly_Belt_2);
	// //console.log("initialData", initialData.Assembly_Belt_2_color);
	// //console.log("initialData", initialData.Assembly_Belt_3);
	// //console.log("initialData", initialData.Assembly_Belt_3_color);

	// var Assembly_Belt_1 = 1;//initialData.Assembly_Belt_1;
	// var Assembly_Belt_2 = 1;//initialData.Assembly_Belt_2;
	// var Assembly_Belt_3 = 0;//initialData.Assembly_Belt_3;
	
	// var Assembly_Belt_1_color = "Green";//initialData.Assembly_Belt_1_color;
	// var Assembly_Belt_2_color = "Yellow";//initialData.Assembly_Belt_2_color;
	// var Assembly_Belt_3_color = initialData.Assembly_Belt_3_color;


	// var goodsHtml ='<div class="chane_box line_down">\
	//                     <div class="tabs_box">\
	//                         <div class="tab_circle">1</div>\
	//                         <div class="tab_circle_yellow">2</div>\
	//                     </div>\
	//                 </div>';

}


// Code for Action 5
function initialSetupResearchDevelopment(initialData){
    //console.log("initialSetupResearchDevelopment", initialData);

    var removeClass = document.getElementById("researchDevelopemtWorker");               
    removeClass.classList.add("color_change");
    // light_blue
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

    document.getElementById("gameConfirmButton").innerHTML = "";
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">ADJUST R&D</div>'; 
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
        Adjust_R_D_quality_development_resources: rd_worker,
        action: "Adjust_R_D_quality_development_resources",
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
        document.getElementById("gameConfirmButton").innerHTML = "";
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="">CONFIRM</div>'; 
    });
}

function initialMarketing(initialData){
    console.log("initialMarketing", initialData);

    var removeAddClass = document.getElementById("marketingCounter");               
    removeAddClass.classList.add("color_change");


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
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">14</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">14</div>';   
    }
    researchDevelopmetIndex += '</div>\
                                    <div class="alert_twoRow">';
    if(initialData.R_D_Quality_Index > 14){
        researchDevelopmetIndex += '<div class="alert_Darck_blue_circle">15</div>';
    }
    else{
        researchDevelopmetIndex += '<div class="alert_blue_circle">15</div>';   
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

    var Update_marketing_board_sales_strategy = {
        ADVERTISING: -1,
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
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="confirmMarketing()" id="startGame">CONFIRM</div>';
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

    var Update_marketing_board_sales_strategy = {
        ADVERTISING: 1,
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
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="confirmMarketing()" id="startGame">CONFIRM</div>';
    });

}

function confirmMarketing(){
    console.log("confirmMarketingValue");




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
    allOrderCards();
}

function allOrderCards(){
    var orderMarketCard = {
        No_of_teams: 5,
        team_id: "11",
        workshop_id: workshop_id,
        Year: year,
    }
    console.log("Change Color ", orderMarketCard);
    socket.emit('getTeamOrderCard', team_id, orderMarketCard);
    socket.on('getTeamOrderCard_recieve', function(msg){
        console.log("Message ", msg.results);  
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
            else{
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
            
        });

        document.getElementById("orderCards").innerHTML = orderCard;
    }); 
}

function renderMarketBoard(teamData){
    console.log("Team data", teamData);
    var companyList = '';
    teamData.forEach(function(data, index){
        console.log("Data", data);
        companyList += '<div class="company_long_box">\
                    <h3 class="sub_heading_ns">COMPANY</h3>\
                    <div class="aircon_wrap">\
                        <div class="blue_mark_lab">B</div>\
                        <div class="aircon_white">'+data.virtual_company_name+'</div>\
                    </div>\
                    <h4 class="marketing_pw">MARKETING POWER <span>RANK</span></h4>\
                    <div class="allert_main_one">\
                        <div class="alert_green_sy_left">\
                            <div class="alet_big"><img src="images/alert_black.svg" alt=""></div>\
                            <div class="big_circle_green_ms">'+data.number_of_green+'</div>\
                        </div>\
                        <div class="alert_right_blue_mark_lab">'+data.rank+'</div>\
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
                        <div class="aircon_light_blues">WAITING</div>\
                    </div>\
                </div>';
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
    socket.on('card_selection_recieve', function(responseData){
        console.log("Response data ",responseData);  
        allOrderCards(responseData);
        console.log("Response data-------",responseData.team_id);  
        var team_id = localStorage.getItem("team_id");
        console.log("Team id--------", team_id);
        if(responseData.team_id == team_id){

            cardHtml += '<div class="order_light_box">\
                            <div class="order_blue_box">\
                                <div class="oder_head">\
                                    <h4>Order</h4>\
                                    <h2>1a</h2>\
                                </div>\
                                <div class="secBg_head">\
                                    <div class="oder_unit_box">\
                                        <h4>Unites</h4>\
                                        <div class="circle_green_stor">\
                                            <h2>1</h2>\
                                        </div>\
                                    </div>\
                                    <div class="oder_unit_box">\
                                        <h4>Price</h4>\
                                        <h5 class="cash_ri">10</h5>\
                                    </div>\
                                    <div class="oder_unit_box">\
                                        <h4>Net Sales</h4>\
                                        <div class="circle_green_stor yellow">\
                                            <h2>10</h2>\
                                        </div>\
                                    </div>\
                                    <div class="oder_unit_box">\
                                        <h4>Payment <br> terms</h4>\
                                        <h5 class="cash_ri">Cash</h5>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';
        }
        var oldHtml = "";
        oldHtml = document.getElementById("company"+responseData.team_id).innerHTML;
        console.log("old html ",oldHtml);
        oldHtml = oldHtml + cardHtml;
        document.getElementById('company'+responseData.team_id).innerHTML = oldHtml;

    }); 
}
