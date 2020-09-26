
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

    console.log(data);
   	socket.emit('game_page_data', team_id, data);
    socket.on('receive_game_page_data', function(responseData){
    	console.log("Response Data", responseData);
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
    	console.log("Response Data", responseData);
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