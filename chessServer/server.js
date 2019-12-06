var wss = require("websocket").server;
var http = require("http");
var server = http.createServer(function(request,response){});
server.listen(9999,function(){});
wsServer = new wss({
	httpServer:server
});
wsServer.on("request",function(request){
	var connection = request.accept(null, request.origin);
	var length = connections.length;
	if(length<2)
	{
		var index = connections.push(connection)-1;
		connections[index].on("message",function(message){
			console.log("message recived!");
			if(message.type=="utf8"){
				var data = JSON.parse(message.utf8Data);
				if(data.text==2)
				{
					this.close();
					console.log("run");
					var returnMsg = message.utf8Data;
					for(var i=0;i<connections.length;i++)
					{
						if (i!=index)
							connections[i].sendUTF(returnMsg);
					
					}
					connections.length=0;

				}
				var returnMsg = message.utf8Data;
				for(var i=0;i<connections.length;i++)
				{
					if (i!=index)
						connections[i].sendUTF(returnMsg);
				
				}
				console.log(connections.length);
				console.log(index);
			}
		});
	}
	else{
		var obj={text:3};
		var obj1=JSON.stringify(obj);
		connection.sendUTF(obj1);
		console.log("full");
	}
	connection.on("colse",function(connection){
			console.log("close");
	});
});
console.log("server start");

var connections = [];
