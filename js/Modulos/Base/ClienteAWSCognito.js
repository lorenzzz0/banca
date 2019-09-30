var ClienteAWSCognito = (function(){
	var _nombreUsuario;
	var cognitoUser;
	var token;
	var usrId;

	var region = 'us-east-1';
	var ipaYek = 'ivWCEPkXsG63eFNlRJYpv81wlwAzSaoc75FXVCRx';


	var userPoolId 	= 'us-east-1_Rx4cqyywX';
	var clientId 	= '7g8afjhvj70ij2ifv13krrg0p2';
	var url 		= 'cognito-idp.us-east-1.amazonaws.com/us-east-1_Rx4cqyywX';


	var _modoAutenticar = {
			 Actulizar : { value: 0, name: "Actulizar", code: "A" },
			 Normal : { value: 1, name: "Normal", code: "N" }
	}

	var poolData = {
			'UserPoolId' : userPoolId,
			'ClientId' : clientId
		};

	var _funAutenticarUsuario = function (correo, pss, nuevoPss, modo){

		switch (modo){
			case _modoAutenticar.Actulizar:
				if(nuevoPss == null || nuevoPss == undefined || nuevoPss.length <= 0)
				{
					alert("Favor de proporcionar nueva contraseña.");
					return;
				}

			break;
			case _modoAutenticar.Normal:
				if(correo == null || correo == undefined || pss == null || pss == undefined || correo.length <= 0 || pss.length <= 0)
				{
					alert("Favor de proporcionar usuario o contraseña.");
					return;
				}
			break;
		}


		var esSesionValida = false;

		AWSCognito.config.region = region;

		var datosAutenticacion = {
			Username : correo,
			Password : pss
		};

		var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(datosAutenticacion);


		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

		var userData = {
			Username : correo,
			Pool : userPool
		};

		var attributeList = [];
		var dataName = {
			Name : 'name',
			Value : correo
		};

		var attributeName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName);

		attributeList.push(attributeName);

		cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

		cognitoUser.authenticateUser(authenticationDetails,
		{
			onSuccess: function (result)
			{
				console.log('access token + ' + result.getAccessToken().getJwtToken());

				token = result.getIdToken().getJwtToken();
				_nombreUsuario = cognitoUser.getUsername();


				sessionStorage.setItem('Token', token);

				AWS.config.region = region;

				AWS.config.credentials = new AWS.CognitoIdentityCredentials(
				{
					'IdentityPoolId' : userPoolId,
					'Logins' : {
						url : result.getIdToken().getJwtToken()
					}
				});


				if(_funcValidarSesionCognito()){
					window.location.replace("panel.html");
				}


			},
        	onFailure: function(err)
        	{
				alert("Usuario o contraseña no validos. Favor de rectificar.");
			},
			newPasswordRequired: function(userAttributes, requiredAttributes)
			{

				if(nuevoPss)
				{
					delete userAttributes.email_verified;
					cognitoUser.completeNewPasswordChallenge(nuevoPss, userAttributes, this);
				}
				else
				{
					_funcActualizaPassword();
				}
			}
		});
	};
	var _getIdUser = function(){
		var esSesionValida = false;
		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
		window.nombreUsuario;
	    cognitoUser = userPool.getCurrentUser();
	    cognitoUser.getSession(function(err, session){});
	    return cognitoUser;
	};
	var _funcValidarSesionCognito = function(){
		var esSesionValida = false;
		var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

	    cognitoUser = userPool.getCurrentUser();

	      
	    if (cognitoUser != null)
	    {
	        cognitoUser.getSession(
	        	function(err, session)
				{
					if (err)
					{
						alert("La sesión ha terminado. Favor de firmarse nuevamente.");
						return;
					}

					esSesionValida = session.isValid();

					console.log('session validity: ' + session.isValid());

					// NOTE: getSession must be called to authenticate user before calling getUserAttributes
					cognitoUser.getUserAttributes(
						function(err, attributes)
						{
							if (err)
							{
								// Handle error
							}
							else
							{
							// Do something with attributes
							
							}
						});

					AWS.config.credentials = new AWS.CognitoIdentityCredentials({
						IdentityPoolId : userPoolId,
						Logins : {
							url : session.getIdToken().getJwtToken()
						}
					});

					token = session.getIdToken().getJwtToken();
					_nombreUsuario = cognitoUser.getUsername();
					sessionStorage.setItem('Token', token);


				});

	        return esSesionValida;
		}
		else
		{

			window.location.replace("index.html");
		}
	};

	var _funcActualizaPassword = function () {

		$(".contenedorLogin").hide();
        $(".contenedorConfirmaionLogin").show();
     };

	 var _funcCerrarSesion = function()
     {
		cognitoUser.signOut();

		window.location.replace("index.html");
     }

	return {
			funcObtenerNombreUsuario : function () { return _nombreUsuario; },
			modoAutenticar : _modoAutenticar,
			funAutenticarUsuario : _funAutenticarUsuario,
			funcObtenerToken : function(){ return token; },
			funcValidarSesionCognito : _funcValidarSesionCognito,
			funcCerrarSesion: _funcCerrarSesion,
			funcObtenerIpaYek : function(){ return ipaYek; },
			funcObtenerRegion : function(){ return region; },
			funcObtenerUserId : _getIdUser
	};
})();
