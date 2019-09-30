var AppParametros = (function(){

    var _body = {
        "operation": undefined,
        "tableName": undefined,
        "payload": {}
    };
    var _endpoint = 'https://0rbxqajfj7.execute-api.us-east-1.amazonaws.com/development';
    var clave = 'Sq4Tkkksb16cRlUtNUvom3shMPgrR57b2hJgtuli';


    var _config = {
        accessKey: '',
        secretKey: '',
        sessionToken: '',
        region: 'us-east-1',
        apiKey: clave,
        defaultContentType: 'application/json',
        defaultAcceptType: 'application/json',
        Authorizer:''
    };


    var _estatusUsuario = {
        Activos: "Activos",
        Inactivos: "Inactivos",
        Todos: "Todos"
    };

    var _fnRequest = function(res, requestMethod, token, jsonData, then, _fail){
        $.ajax(
            _endpoint + res,
            {
                method : requestMethod,
                headers : {
                            'Authorization' : token,
                            'x-api-key' : _config.apiKey,
                          },
                data: jsonData,
                contentType :'application/json',
                timeout:300000,
                beforeSend : function(xhr) {
                    $('#content').css('filter','blur(0px)');
                    $('.content-modal').hide();
                    $(".custLoader").show();
                    xhr.setRequestHeader('Authorization', token);
                    xhr.setRequestHeader('x-api-key', _config.apiKey);
                }
        }).then(function(data) {
            then(data);
        }).fail(function( jqXHR, textStatus, errorThrown){
            _fail( jqXHR, textStatus, errorThrown);
        });
    };

    return {
        body: _body,
        config: _config,
        endpoint : _endpoint,
        fnRequest : _fnRequest,
        awsGetDataUser: "/get-data",
        awsSaveMoney:"/save-money",
        awsGetTransactions:"/get-transactions",
        awsGetMoney:"/get-money"
    };
})();
