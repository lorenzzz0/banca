var ClienteAWSLambda = (function(){
	var apigClientFactory = {};

	apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://09346be5lg.execute-api.us-east-1.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    apigClient.funcObtenerSemana = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var obtenerParticipantesRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsObtenerSemana).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(obtenerParticipantesRequest, authType, additionalParams, config.apiKey);
    };    


    apigClient.funcObtenerSemana = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var obtenerSemanaRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsObtenerSemana).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(obtenerSemanaRequest, authType, additionalParams, config.apiKey);
    };    

    apigClient.funcObtenerParticipantes = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var obtenerParticipantesRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsObtenerParticipantes).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(obtenerParticipantesRequest, authType, additionalParams, config.apiKey);
    }; 

    apigClient.funcObtenerSemanaParticipantes  = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var obtenerSemanaParticipantesRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsObtenerSemanaParticipantes).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(obtenerSemanaParticipantesRequest, authType, additionalParams, config.apiKey);
    };  

    /***********************************************************************************************/
    /*  De aquí para abajo es SAMTE                                                                */
    /***********************************************************************************************/
    
    apigClient.funcObtenerMenu = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var obtenerMenuPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsLambdaObtenerMenu).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(obtenerMenuPostRequest, authType, additionalParams, config.apiKey);
    };    
    
    apigClient.funcaCrearUsuarioPaperPlane = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var crearUsuarioPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsCrearUsuarioPaperPlane).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(crearUsuarioPostRequest, authType, additionalParams, config.apiKey);
    };

    apigClient.funcObtenerCatalogo = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var obtenerCatalogoPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsObtenerCatalogo).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(obtenerCatalogoPostRequest, authType, additionalParams, config.apiKey);
    };

    apigClient.funcObtenerUsuariosPaperPlane = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var obtenerUsuariosPaperPlanePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsObtenerUsuariosPaperPlane).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(obtenerUsuariosPaperPlanePostRequest, authType, additionalParams, config.apiKey);
    };

    apigClient.funcObtenerContactosPaperPlane = function (params, body, additionalParams) {
        if (additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var obtenerContactosPaperPlanePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsObtenerContactosPaperPlane).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(obtenerContactosPaperPlanePostRequest, authType, additionalParams, config.apiKey);
    };

    apigClient.funcActualizarContactoPaperPlane = function (params, body, additionalParams) {
        if (additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var actualizarContactoPaperPlanePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsActualizarContactoPaperPlane).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(actualizarContactoPaperPlanePostRequest, authType, additionalParams, config.apiKey);
    };

    apigClient.funcInsertarMensajePaperPlane = function (params, body, additionalParams) {
        if (additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var insertarMensajePaperPlanePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate(AppParametros.awsInsertarmensajepaperplane).expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };

        return apiGatewayClient.makeRequest(insertarMensajePaperPlanePostRequest, authType, additionalParams, config.apiKey);
    };

    return apigClient;    
};


return {
 crearClienteAWS : apigClientFactory
};
	
})();