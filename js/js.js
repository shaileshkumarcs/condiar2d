var BASE_URL = 'http://54.198.46.240:3006/participant/';
var IMAGE_URL = 'http://54.198.46.240:3006/businessgame/condair/uploads/'; 
function do_login() {
	localStorage.setItem("participant_jwt", '');
    var user_id =  document.getElementById('user_id').value;
    var Password =  document.getElementById('password').value;
    var data = {user_id:user_id, password:Password};
    $.ajax({
        type: 'POST',
        url: BASE_URL+'login',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
			//var res = JSON.parse(response);
            console.log(response.success);
			if(response.success == 1){
				localStorage.setItem("participant_jwt", response.responceData.jsonToken);
				document.getElementById('err_msg').innerHTML='';
				localStorage.setItem("participant_id", response.responceData.id);
                localStorage.setItem("name", response.responceData.name);
                localStorage.setItem("team_id", response.responceData.team_id);
                localStorage.setItem("user_type", response.responceData.user_type);
				localStorage.setItem("workshop_id", response.responceData.workshop_id);
                window.location.replace("welcome.html");
			}else{
                    document.getElementById('err_msg').innerHTML='Wrong Credentials<br><br>';  
			}
           
        },
		error: function (textStatus, errorThrown) {
     
			document.getElementById('err_msg').innerHTML='Wrong Credentials<br><br>';  
        }		
    });
}