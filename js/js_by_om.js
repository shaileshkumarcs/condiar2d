
function initiate_Inbound_Logistics(initialConditionData){
	var Inbound_Logistics = parseInt(initialConditionData.Materials);
    
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
	document.getElementById("INBOUND_LOGISTICS_number").style.backgroundColor = '#f39b4a';
	document.getElementById("Ordered_Materials").style.backgroundColor = '#f39b4a';
	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Receive_ordered_material()" id="startGame">RECIEVED ORDER METERIAL</div>';
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
    	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Pay_for_materials_received()" id="startGame">PAY FOR ORDER METERIAL</div>';
	    
    });
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
    	document.getElementById("bluew_for_container").style.backgroundColor = '#f39b4a';
    	document.getElementById("blue_updon").style.backgroundColor = '#f39b4a';
    	document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" id="startGame">SELECT ORDER METERIAL</div>';
	    
    });


}


function decreaseinbound(){
    var val = parseInt(document.getElementById("inboundprod").innerHTML); //inboundval

    if(val>5){
      val = val-5;
    }else{
        val = 5;
    }
    document.getElementById("inboundprod").innerHTML = val;
    document.getElementById("inboundval").innerHTML = val;

    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Order_material()" id="startGame">ORDER METERIAL NOW</div>';

}


function increaseinbound(){
    var val = parseInt(document.getElementById("inboundprod").innerHTML); //inboundval
    if(val<20){
      val = val+5;
    }else{
        val = 20;
    }
    document.getElementById("inboundprod").innerHTML = val;
    document.getElementById("inboundval").innerHTML = val;
     document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white org_ns" onclick="Order_material()" id="startGame">ORDER METERIAL NOW</div>';
}


function Order_material(){
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
        console.log("Response Data", responseData);
        setInitialConditionToAll(responseData);
        initialData = responseData;
        document.getElementById("bluew_for_container").style.backgroundColor = '#cfe0f4';
        document.getElementById("blue_updon").style.backgroundColor = '#cfe0f4';
        //Shailesh code start
        var changecolor = document.getElementById("goods_in_progress");
        changecolor.classList.add("color_change");
        document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white">UPDATE PRODUCTION</div>';
        
    });

}


function initiate_ADMINISTRATION_IT_AND_FINANCE(initialConditionData){
    var Administration_IT = parseInt(initialConditionData.Administration_IT);
    var nulled = 4-Administration_IT;
    var html1 = '';
    var count = 1-Administration_IT;    
    for (var i = 1; i <=Administration_IT; i++) {
        html1 = html1 + ' <div class="admi_liblue" onclick="Adjust_administration_IT_resources('+count+')"><img src="images/white_man.svg" alt=""/></div>';
        count++;
                
    }
    for (var j = 1; j <=nulled; j++) {
        html1 = html1 + '<div class="admi_blue_light_cc" onclick="Adjust_administration_IT_resources('+count+')"><img src="images/white_man.svg" alt=""/></div>'; 
        count++; 

    }
    document.getElementById("ADMINISTRATION_IT_FINANCE").innerHTML = html1;
    start_ADMINISTRATION_IT_AND_FINANCE();  
}


function start_ADMINISTRATION_IT_AND_FINANCE(){
    document.getElementById("ADMINISTRATION_IT_FINANCE_heading").style.backgroundColor = '#f39b4a';
    document.getElementById("ADMINISTRATION_IT_FINANCE").style.backgroundColor = '#f39b4a';
    document.getElementById("gameConfirmButton").innerHTML = '<div class="aircon_white" id="startGame">ADJUST ADMINISTRATION & IT FINANCE</div>';
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
    });

}


function initiate_SALES(initialConditionData){
    console.log('initialConditionData', initialConditionData);
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
        html1 = html1 + '<div class="ver_tiw" onclick="Adjust_sales_force('+count+')"> <div class="admi_liblue bellow_line admi_blue_light_cc"><img src="images/white_man.svg" alt=""></div> <div class="alert_circle"><img src="images/alert_black.svg" alt=""></div> </div>'; 
        count++; 

    }
   document.getElementById("SALES_BACKGROUND").innerHTML = html1;
   
   start_SALES();

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
    });
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