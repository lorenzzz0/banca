var AppSamTeSesion = (function(){
	
	var token;

	var _funcValidarSesion = function (funcCallBack){
		
		if(!ClienteAWSCognito.funcValidarSesionCognito()){
				
				window.location.replace("index.html");			
		}else{
			funcCallBack();
		}
		
	};	

	return {
		EsSessionActiva : _funcValidarSesion	
	};
}
)();