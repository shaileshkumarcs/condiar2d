
function initiate_Inbound_Logistics(initialConditionData){
	var Inbound_Logistics = parseInt(initialConditionData.Materials);
    document.getElementById("inboundprod_MINUS_BTN").removeAttribute("onclick");
    document.getElementById("inboundprod_PLUS_BTN").removeAttribute("onclick");
    var bal = 1; 
    var html = '<div class="tabs_wrapp">';
	for(var i=1; i<Inbound_Logistics+1; i++){
		html = html + '<div class="tabs_box"> <div class="tab_circle">1</div> <div class="tab_circle_yellow">'+bal+'</div> </div>';
		if(i%4 == 0 && i!=0){
			
         html = html + '</div><div class="tabs_wrapp">';
		}

		if(initialConditionData.action_type == 'Receive_ordered_material'){
         bal = 0;
		}
	}
	html = html + '</div>';
	document.getElementById("js_INBOUND_LOGISTICS").innerHTML = html;
	document.getElementById("Ordered_Materials").innerHTML = initialConditionData.Ordered_Materials;
	
}



function start_Inbound_Logistics(){
    document.getElementById("action_count_num").innerHTML = '2';
	//document.getElementById("INBOUND_LOGISTICS_number").style.backgroundColor = '#f39b4a';
    
    var Ordered_Materials = document.getElementById("Ordered_Materials").innerHTML;

    document.getElementById("Ordered_Materials_HEAD").innerHTML = '<div onclick="Receive_ordered_material()" class="white_truck_line" id="Ordered_Materials">'+Ordered_Materials+'</div>';


	document.getElementById("Ordered_Materials").style.backgroundColor = '#f39b4a';

    //document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Receive_ordered_material()" id="startGame">RECIEVED ORDER METERIAL</div>';
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">RECIEVED METERIALS</div>';
}

function Receive_ordered_material(){
	var data = {
		'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,



        'action': 'Receive_ordered_material', 
        'Receive_ordered_material':5,
        
    }

    
   	socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    	
    	setInitialConditionToAll(responseData);
    	initialData = responseData;
    	document.getElementById("Ordered_Materials").style.backgroundColor = '#ffffff';
        //document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Pay_for_materials_received()" id="startGame">PAY FOR ORDER METERIAL</div>';


 document.getElementById("Ordered_Materials_HEAD").innerHTML = '<div class="white_truck_line" id="Ordered_Materials">0</div>';

    	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="go_to_meterial_inventory()" id="startGame">CONFIRM</div>';
	    
    });
}


function go_to_meterial_inventory(){

    document.getElementById("Material_inventory_span").style.backgroundColor = '#F59C33';
    document.getElementById("Material_inventory_heading").innerHTML = '<span onclick="Pay_for_materials_received()" id="Material_inventory_span">2</span>Material inventory';

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">PAY SUPLIER</div>';

    document.getElementById("Material_inventory_span").style.backgroundColor = '#F59C33';


}


function Pay_for_materials_received(){

		var data = {
		'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,


         
        'action': 'Pay_for_materials_received', 
        'Pay_for_materials_received':5,
        
    }

       	socket.emit('game_page_data', team_id, data);
        socket.on('receive_game_page_data', function(responseData){
    
    	setInitialConditionToAll(responseData);
    	initialData = responseData;

        document.getElementById("material_inventory").innerHTML = initialData.Materials;



    	//document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" id="startGame">SELECT ORDER METERIAL</div>';

        document.getElementById("Material_inventory_span").style.backgroundColor = '#0d65a8';
        document.getElementById("Material_inventory_heading").innerHTML = '<span id="Material_inventory_span">2</span>Material inventory';

        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="ordered_meterial_activate()" id="startGame">CONFIRM</div>';


	    
    });


}


function ordered_meterial_activate(){
        document.getElementById("bluew_for_container").style.backgroundColor = '#f39b4a';
        document.getElementById("blue_updon").style.backgroundColor = '#f39b4a'; 

     document.getElementById("inboundprod_MINUS_BTN").setAttribute('onclick','decreaseinbound()')
    document.getElementById("inboundprod_PLUS_BTN").setAttribute('onclick','increaseinbound()')

          document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">ORDER METERIAL</div>';

}


function decreaseinbound(){
    var val = parseInt(document.getElementById("inboundprod").innerHTML); //inboundval

    if(val>1){
      val = val-1;
    }else{
        val = 1;
    }
    document.getElementById("inboundprod").innerHTML = val;
    document.getElementById("inboundval").innerHTML = val;

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Order_material()" id="startGame">CONFIRM</div>';

}


function increaseinbound(){
    var val = parseInt(document.getElementById("inboundprod").innerHTML); //inboundval
    if(val<20){
      val = val+1;
    }else{
        val = 20;
    }
    document.getElementById("inboundprod").innerHTML = val;
    document.getElementById("inboundval").innerHTML = val;
     document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Order_material()" id="startGame">CONFIRM</div>';
}


function decreaseoutbound(){
    var val = parseInt(document.getElementById("white_truck_out").innerHTML); //inboundval

    if(val>1){
      val = val-1;
    }else{
        val = 1;
    }
    document.getElementById("white_truck_out").innerHTML = val;
    document.getElementById("yellow_truck_out").innerHTML = val * 3;
    document.getElementById("white_truck_line_out").innerHTML = val * 3;

    

}


function increaseoutbound(){
    var val = parseInt(document.getElementById("white_truck_out").innerHTML); //inboundval
    if(val<8){
      val = val+1;
    }else{
        val = 8;
    }
    document.getElementById("white_truck_out").innerHTML = val;
    document.getElementById("yellow_truck_out").innerHTML = val * 3;
    document.getElementById("white_truck_line_out").innerHTML = val * 3;
     
}





function Order_material(){
    console.log("Order Materials Function called");
    var val = parseInt(document.getElementById("inboundprod").innerHTML); 

    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,


         
        'action': 'Order_material', 
        'Order_material':val,
    }

        socket.emit('game_page_data', team_id, data);
        socket.on('receive_game_page_data', function(responseData){
        //console.log("Response Data", responseData);
        setInitialConditionToAll(responseData);
        initialData = responseData;
        document.getElementById("bluew_for_container").style.backgroundColor = '#cfe0f4';
        document.getElementById("blue_updon").style.backgroundColor = '#cfe0f4';
        document.getElementById("INBOUND_LOGISTICS_number").style.backgroundColor = '#0d65a8';

        document.getElementById("inboundprod").innerHTML = 0;
        document.getElementById("inboundval").innerHTML = 0;

        
        

        document.getElementById("inboundprod_MINUS_BTN").removeAttribute("onclick");
        document.getElementById("inboundprod_PLUS_BTN").removeAttribute("onclick");

        //Shailesh code start
        var changecolor = document.getElementById("finished_goods");
        changecolor.classList.add("color_change");
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">UPDATE PRODUCTION</div>';
        document.getElementById("updateOutboud").innerHTML = "<a class='color_change' href='javascript:void(0);' onclick='updateFinishedGoods("+JSON.stringify(responseData)+")' id='finished_goods'>8</a>Finished goods inventory";
        document.getElementById("action_count_num").innerHTML = '3';
        
    });

}


function initiate_ADMINISTRATION_IT_AND_FINANCE(initialConditionData){
    var Administration_IT = parseInt(initialConditionData.Administration_IT);
    var nulled = 4-Administration_IT;
    var html1 = '';
    var count = 1-Administration_IT;    
    for (var i = 1; i <=Administration_IT; i++) {
        html1 = html1 + ' <div class="admi_liblue"><img src="images/white_man.svg" alt=""/></div>';
        count++;
                
    }
    for (var j = 1; j <=nulled; j++) {
        html1 = html1 + '<div class="admi_blue_light_cc"><img src="images/white_man.svg" alt=""/></div>'; 
        count++; 

    }
    document.getElementById("ADMINISTRATION_IT_FINANCE").innerHTML = html1;
    //start_ADMINISTRATION_IT_AND_FINANCE();  
}


function start_ADMINISTRATION_IT_AND_FINANCE(){


const data = {
    'team_id': team_id,
    'workshop_id': workshop_id,
}
socket.emit('initialConditionBySocket', team_id, data);

socket.on('receive_initialConditionBySocket', function(initialConditionData){
    var Administration_IT = parseInt(initialConditionData.Administration_IT);
    var nulled = 4-Administration_IT;
    var html1 = '';
    var count = 1-Administration_IT;    
    for (var i = 1; i <=Administration_IT; i++) {
        //html1 = html1 + ' <div class="admi_liblue" onclick="Adjust_administration_IT_resources('+count+')"><img src="images/white_man.svg" alt=""/></div>';
        html1 = html1 + ' <div class="admi_liblue"><img src="images/white_man.svg" alt=""/></div>';
        count++;
                
    }
    for (var j = 1; j <=nulled; j++) {
        //html1 = html1 + '<div class="admi_blue_light_cc" onclick="Adjust_administration_IT_resources('+count+')"><img src="images/white_man.svg" alt=""/></div>'; 
        html1 = html1 + '<div class="admi_blue_light_cc"><img src="images/white_man.svg" alt=""/></div>'; 
        count++; 

    }

    var arg = 1;
    document.getElementById("ADMINISTRATION_IT_FINANCE").innerHTML = html1;
    document.getElementById("ADMINISTRATION_IT_FINANCE_heading").style.backgroundColor = '#f39b4a';
    document.getElementById("ADMINISTRATION_IT_FINANCE_heading").setAttribute('onclick','Adjust_administration_IT_resources('+arg+')')

    document.getElementById("shortTermLoan").innerHTML = "<span id='updateShortLoanIncome'>1</span>Short-term Financial liablity";
    document.getElementById("updateNewProductOnMachine").innerHTML = "<span href='javascript:void(0);' id='goods_in_progress'>3</span>Goods in progress inventory";
    
    //document.getElementById("ADMINISTRATION_IT_FINANCE").style.backgroundColor = '#f39b4a';
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">ADJUST ADMIN/IT</div>';
    document.getElementById("action_count_num").innerHTML = '4';
    
});


    

}

function Adjust_administration_IT_resources(val){
    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,

        
         
        'action': 'Adjust_administration_IT_resources', 
        'Adjust_administration_IT_resources':val,
    }
    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
        setInitialConditionToAll(responseData);
        initialData = responseData;
        document.getElementById("ADMINISTRATION_IT_FINANCE_heading").style.backgroundColor = '#0d65a8';
        document.getElementById("ADMINISTRATION_IT_FINANCE").style.backgroundColor = '#cfe0f4';
        document.getElementById("ADMINISTRATION_IT_FINANCE_heading").removeAttribute("onclick");
        document.getElementById("gameConfirmButton").innerHTML = '<div onclick="startResearchDevelopment();" class="aircon_white org_ns" id="startGame">CONFIRM</div>';
        document.getElementById("action_count_num").innerHTML = '4';
    });


    

    

}


function initiate_SALES(initialConditionData){
   
    var Sales = initialConditionData.Sales

      var Sales = parseInt(initialConditionData.Sales);
    var nulled = 5-Sales;
    var html1 = '';
    var count = 1-Sales;    
    for (var i = 1; i <=Sales; i++) {
        html1 = html1 + '<div class="ver_tiw" onclick="Adjust_sales_force('+count+')"> <div class="admi_liblue bellow_line"><img src="images/white_man.svg" alt=""></div> <div class="alert_circle"><img src="images/alert_black.svg" alt=""></div> </div>';
        count++;
                
    }
    for (var j = 1; j <=nulled; j++) {
        html1 = html1 + '<div class="ver_tiw" onclick="Adjust_sales_force('+count+')"> <div class="admi_liblue bellow_line admi_blue_light_cc"><img src="images/white_man.svg" alt=""></div> <div class="alert_circle light_blue"><img src="images/alert_black.svg" alt=""></div> </div>'; 
        count++; 

    }
   document.getElementById("SALES_BACKGROUND").innerHTML = html1;
   
  // start_SALES();

}

function start_SALES(){
    document.getElementById("SALES_HEADING").style.backgroundColor = '#f39b4a';
    document.getElementById("SALES_BACKGROUND").style.backgroundColor = '#f39b4a';
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">MANAGE SALES PERSON</div>';
}

function Adjust_sales_force(val){
    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,
         
        'action': 'Adjust_sales_force', 
        'Adjust_sales_force':val,
    }
    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    setInitialConditionToAll(responseData);
    initialData = responseData;
     document.getElementById("SALES_HEADING").style.backgroundColor = '#0d65a8';
    document.getElementById("SALES_BACKGROUND").style.backgroundColor = '#cfe0f4';
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="startMarketing()">CONFIRM</div>';
    });


}


function initiate_OUTBOUND_LOGISTICS(initialConditionData){
  

    var OUTBOUND_LOGISTICS = parseInt(initialConditionData.Finished_Goods_Store_in_Units);
    var bal = 3; 
    var html = '<div class="tabs_wrapp">';
    for(var i=1; i<OUTBOUND_LOGISTICS+1; i++){
        html = html + '<div class="tabs_box"> <div class="tab_circle">1</div> <div class="tab_circle_yellow">'+bal+'</div> </div>';
        if(i%4 == 0 && i!=0){
            
         html = html + '</div><div class="tabs_wrapp">';
        }

        if(initialConditionData.action_type == 'Receive_ordered_material'){
         bal = 0;
        }
    }
    html = html + '</div>';
   document.getElementById("outbound_container").innerHTML = html;
   // document.getElementById("Ordered_Materials").innerHTML = initialConditionData.Ordered_Materials;
  //  start_OUTBOUND_LOGISTICS();

}

function start_OUTBOUND_LOGISTICS(){
    document.getElementById("OUTBOUND_LOGISTICS_heading").style.backgroundColor = '#f39b4a';
    document.getElementById("bluew_for_container_out").style.backgroundColor = '#f39b4a';
    document.getElementById("blue_updon_out").style.backgroundColor = '#f39b4a';
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="confirm_OUTBOUND_LOGISTICS()" id="startGame">CONFIRM</div>';
}

function confirm_OUTBOUND_LOGISTICS(){

    const data = {
     
      'team_id': team_id,
      'workshop_id': workshop_id,
      
    }

    socket.emit('initialConditionBySocket', team_id, data);
      socket.on('receive_initialConditionBySocket', function(msg){
         start_SALES_EXPENSSES(msg); 
    }); 
 
}





function initiate_SALES_EXPENSSES(initialConditionData){
    //console.log('initialConditionData', initialConditionData);
    document.getElementById("Sales_expenses").innerHTML = initialConditionData.Sales_expenses;
    //start_SALES_EXPENSSES(initialConditionData);
}

function start_SALES_EXPENSSES(initialConditionData){
   
    var dataInit = JSON.stringify(initialConditionData);
    document.getElementById("Sales_expenses_HEADING_p").innerHTML = "<span id='Sales_expenses_HEADING' onclick='call_SALES_EXPENSSES("+dataInit+")'>9</span>Sales expenses";

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">Sales Expenses</div>';
     document.getElementById("Sales_expenses_HEADING").style.backgroundColor = '#f39b4a';
}



function call_SALES_EXPENSSES(data){
    //console.log(data);

    var Sales_expenses = 0+ ((parseInt(data.Sales) + parseInt(data.Inbound_Logistics))*parseInt(data.Salaries)) + (parseInt(data.Sales))*(parseInt(data.Sales_T_L_costs));


        var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,
         
        'action': 'Sales_expenses', 
        'Sales_expenses':Sales_expenses,
    }
    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    setInitialConditionToAll(responseData);
    initialData = responseData;
     document.getElementById("Sales_expenses_HEADING_p").innerHTML = "<span id='Sales_expenses_HEADING'>9</span>Sales expenses";

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">Marketing Expenses</div>';
    document.getElementById("Sales_expenses_HEADING").style.backgroundColor = '#0d65a8';
    start_MARKETING_EXPENSSES(responseData);


    });

}

function initiate_MARKETING_EXPENSSES(initialConditionData){
    //console.log('initialConditionData', initialConditionData);
    document.getElementById("Marketing_expenses").innerHTML = initialConditionData.Marketing_expenses;
    //start_MARKETING_EXPENSSES();
}

function start_MARKETING_EXPENSSES(initialConditionData){

    var dataInit = JSON.stringify(initialConditionData);
    document.getElementById("Marketing_expenses_HEADING_p").innerHTML = "<span id='Marketing_expenses_HEADING' onclick='call_MARKETING_EXPENSSES("+dataInit+")'>9</span>Marketing expenses";

   // document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">Sales Expenses</div>';
    document.getElementById("Marketing_expenses_HEADING").style.backgroundColor = '#f39b4a';
}

function call_MARKETING_EXPENSSES(data){
    //console.log(data);
    var Marketing_expenses = data.ADVERTISING; // HERE WE NEED TO FIND EXACT FORMULA FOR MARKETING EXPENSES

    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,
         
        'action': 'Marketing_expenses', 
        'Marketing_expenses':Marketing_expenses,
    }

    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    setInitialConditionToAll(responseData);
    initialData = responseData;
     document.getElementById("Marketing_expenses_HEADING_p").innerHTML = "<span id='Marketing_expenses_HEADING'>9</span>Marketing expenses";

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">Administration & Information services expenses</div>';
    document.getElementById("Marketing_expenses_HEADING").style.backgroundColor = '#0d65a8';
    start_Administration_Information_services_expenses(responseData);

    });

}



function initiate_Administration_Information_services_expenses(initialConditionData){
    //console.log('initialConditionData', initialConditionData);
    document.getElementById("Administration_Information_services_expenses").innerHTML = initialConditionData.Administration_Information_services_expenses;
   //start_Administration_Information_services_expenses(initialConditionData);  // hello
}


function start_Administration_Information_services_expenses(initialConditionData){
    var dataInit = JSON.stringify(initialConditionData);
    document.getElementById("Administration_Information_services_expenses_p").innerHTML = "<span id='Administration_Information_services_expenses_HEADING' onclick='call_Administration_Information_services_expenses("+dataInit+")'>9</span>Administration & Information<br> services expenses";

   document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">Administration Information Expenses</div>';
    document.getElementById("Administration_Information_services_expenses_HEADING").style.backgroundColor = '#f39b4a';

}

function call_Administration_Information_services_expenses(data){
       //console.log(data);
    //var Administration_Information_services_expenses = 1; // HERE WE NEED TO FIND EXACT FORMULA FOR MARKETING EXPENSES
    var Administration_Information_services_expenses = 0 + 0 + (parseInt(data.Administration_IT)+0)*(parseInt(data.Salaries))
    
     //alert(Administration_Information_services_expenses);


    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,
         
        'action': 'Administration_Information_services_expenses', 
        'Administration_Information_services_expenses':Administration_Information_services_expenses,
    }
    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    setInitialConditionToAll(responseData);
    initialData = responseData;
     document.getElementById("Administration_Information_services_expenses_p").innerHTML = "<span id='Administration_Information_services_expenses_HEADING'>9</span>Administration & Information<br> services expenses";

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">R & D expenses </div>';
    document.getElementById("Administration_Information_services_expenses_HEADING").style.backgroundColor = '#0d65a8';
    start_initiate_R_AND_D_expenses(responseData);

    });


}


function initiate_R_AND_D_expenses(initialConditionData){
    //console.log('initialConditionData', initialConditionData);
    document.getElementById("R_AND_D_expenses").innerHTML = initialConditionData.R_AND_D_expenses;
    //start_initiate_R_AND_D_expenses(initialConditionData);
}



function start_initiate_R_AND_D_expenses(initialConditionData){
     var dataInit = JSON.stringify(initialConditionData);
    document.getElementById("R_AND_D_expenses_p").innerHTML = "<span id='R_AND_D_expenses_HEADING' onclick='call_R_AND_D_expenses("+dataInit+")'>9</span>R & D expenses";

   document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">Administration Information Expenses</div>';
    document.getElementById("R_AND_D_expenses_HEADING").style.backgroundColor = '#f39b4a';

}

function call_R_AND_D_expenses(data){

    // var R_AND_D_expenses = 1; // HERE WE NEED TO FIND EXACT FORMULA FOR MARKETING EXPENSES
    var R_AND_D_expenses = 0+ ((parseInt(data.R_D_Quality_Development)) + (parseInt(data.R_D_Quality_Management)) + 0) * ((parseInt(data.Salaries)) + (parseInt(data.R_D_Consumables_Materials)));
   
    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,
         
        'action': 'R_AND_D_expenses', 
        'R_AND_D_expenses':R_AND_D_expenses,
    }
    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    setInitialConditionToAll(responseData);
    initialData = responseData;
     document.getElementById("R_AND_D_expenses_p").innerHTML = "<span id='R_AND_D_expenses_HEADING'>9</span>Administration & Information<br> services expenses";

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">Interest</div>';
    document.getElementById("R_AND_D_expenses_HEADING").style.backgroundColor = '#0d65a8';
   // start_initiate_R_AND_D_expenses(responseData);

   var EBT = getEbtCalculation(responseData);
    if(EBT>0){
       start_initiate_Taxes(responseData);
    } 

    });


}

function initiate_Taxes(initialConditionData){
    //console.log('initialConditionData', initialConditionData);
    document.getElementById("initiate_Taxes").innerHTML = initialConditionData.taxes;
    var EBT = getEbtCalculation(initialConditionData);
    if(EBT>0){
      // start_initiate_Taxes(initialConditionData);
    } 
}


function start_initiate_Taxes(initialConditionData){
     var dataInit = JSON.stringify(initialConditionData);
     document.getElementById("TAXES_p").innerHTML = "<span id='TAXES_p_HEADING' onclick='call_Taxes("+dataInit+")'>10</span>Taxes";
     document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">UPDATE TAX INFORMATION</div>';
     document.getElementById("TAXES_p_HEADING").style.backgroundColor = '#f39b4a';

}

function call_Taxes(data){
    var ebt = getEbtCalculation(data);
    var Tax_rate = data.Tax_rate;

    var taxes = (ebt*parseInt(Tax_rate))/100;
    //alert(taxes);

    
    var data = {
        'workshop_id': workshop_id,
        'quarter': quarter, 
        'team_id': team_id, 
        'participant_id': participant_id, 
        'year': year,
        'action': 'taxes', 
        'taxes':taxes,
    }

    socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    setInitialConditionToAll(responseData);
    initialData = responseData;


     document.getElementById("TAXES_p").innerHTML = "<span id='TAXES_p_HEADING'>10</span>Taxes";

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">START YEAR 2</div>';
    document.getElementById("TAXES_p_HEADING").style.backgroundColor = '#0d65a8';
   // start_initiate_R_AND_D_expenses(responseData);

    });

}


function initiateCostOfGoodSold(initialConditionData){
    document.getElementById("cogs_count").innerHTML = 10;
}


function initiate_EBT(initialConditionData){

    var EBT = getEbtCalculation(initialConditionData);
    document.getElementById("Earnings_before_taxes").innerHTML = EBT;
    var EAT = EBT - parseInt(initialConditionData.taxes);
    document.getElementById("Earnings_after_taxes").innerHTML = EAT;
}


function getEbtCalculation(initialConditionData){
   // console.log('START EBT CALCULATION');
   
    //var EBT = NET_SALES - (F58 + F60 + F61 + F62 + F63) - (parseInt(initialConditionData.Sales_expenses) + parseInt(initialConditionData.Marketing_expenses) +  parseInt(initialConditionData.Administration_Information_services_expenses) +  parseInt(initialConditionData.R_AND_D_expenses));
    
    //var COGS = F58 + F60 + F61 + F62 + F63;

    // var F58 =  (STD40 + STD38) - (STD7+STD8);
       var F58 = (parseInt(initialConditionData.Goods_in_Assembly_in_MU) + parseInt(initialConditionData.Finished_Goods_Store_in_MU)) - (parseInt(initialConditionData.Goods_in_assembly) + parseInt(initialConditionData.Finished_goods_store)) 

    // var F60 =  STD31*STD54;

       var F60 = (parseInt(initialConditionData.Inbound_Logistics) * parseInt(initialConditionData.Finished_Goods_Store_in_MU));

     // var F61 =  Pay manufacturing costs;

      

       var Workers_Assembly_1 = parseInt(initialConditionData.Workers_Assembly_1); 
       var Workers_Assembly_2 = parseInt(initialConditionData.Workers_Assembly_2);
       var Workers_Assembly_3 = parseInt(initialConditionData.Workers_Assembly_3);
       var Workers_Assembly_4 = parseInt(initialConditionData.Workers_Assembly_4);

       var count = 0;
       if(Workers_Assembly_1 == 0){
           count++;
       }

       if(Workers_Assembly_2 == 0){
           count++;
       }

        if(Workers_Assembly_3 == 0){
           count++;
       }

        if(Workers_Assembly_4 == 0){
           count++;
       }

     var F61 =  (4-count)*parseInt(initialConditionData.Assembly_Operating_Costs);
       

    // var F62 =  Pay inventory costs

    // var F62 =  R49*STD59 + R76*STD62;

    //var F62 =  (Materials inventory in units)*STD59 + (Finished goods store in units)*STD62
    //var F62 =  (Materials inventory in units)*STD59 + (initialConditionData.Finished_Goods_Store_in_Units)*STD62
    //var F62 =  (initialConditionData.Materials+initialConditionData.Ordered_Materials-(initialConditionData.Production_capacity_assembly_belt_1 + initialConditionData.Production_capacity_assembly_belt_2 + initialConditionData.Production_capacity_assembly_belt_3 + initialConditionData.Production_capacity_assembly_belt_4))*STD59 + (initialConditionData.Finished_Goods_Store_in_Units)*STD62
     

     var F62 =  (parseInt(initialConditionData.Materials)+parseInt(initialConditionData.Ordered_Materials)-(parseInt(initialConditionData.Production_capacity_assembly_belt_1) + parseInt(initialConditionData.Production_capacity_assembly_belt_2) + parseInt(initialConditionData.Production_capacity_assembly_belt_3) + parseInt(initialConditionData.Production_capacity_assembly_belt_4)))*parseInt(initialConditionData.Inbound_Logistics_Storage_Cost) + (parseInt(initialConditionData.Finished_Goods_Store_in_Units))*parseInt(initialConditionData.Finished_goods_store_storage_cost);


    // var F63 =  Pay rent 
     var F63 =  0;

    // console.clear();
    // console.log('F58 - ', F58);
    // console.log('F60 - ', F60);
    // console.log('F61 - ', F61);
    // console.log('F62 - ', F62);
    // console.log('F63 - ', F63);
    

   

    var COGS = F58 + F60 + F61 + F62 + F63;


    document.getElementById("cogs_count").innerHTML = 0;

    var EBT = parseInt(initialConditionData.Net_sales) - (parseInt(COGS)) - (parseInt(initialConditionData.Sales_expenses) + parseInt(initialConditionData.Marketing_expenses) +  parseInt(initialConditionData.Administration_Information_services_expenses) +  parseInt(initialConditionData.R_AND_D_expenses));
    EBT = 0;
    EBT = EBT - parseInt(initialConditionData.short_term_loans_interest) - parseInt(initialConditionData.long_term_loans_interest);

    
   document.getElementById("Reserves").innerHTML = EBT;

   var Total_Liabilities_Equity = document.getElementById("Total_Liabilities_Equity").innerHTML;

   document.getElementById("Total_Liabilities_Equity").innerHTML = parseInt(Total_Liabilities_Equity) + EBT;
   
    return EBT;
}



















                          
                       /*     <div class="tabs_box">
                                <div class="tab_circle">1</div>
                                <div class="tab_circle_yellow">1</div>
                            </div>
                            <div class="tabs_box">
                                <div class="tab_circle">1</div>
                                <div class="tab_circle_yellow">1</div>
                            </div>
                            <div class="tabs_box">
                                <div class="tab_circle">1</div>
                                <div class="tab_circle_yellow">1</div>
                            </div>
                    </div>

                    */