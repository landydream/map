class WebSocketMgr extends MsgCenter {
	public constructor() {
		super();
	}
	public webSocket: egret.WebSocket;

	public connectCallBack: Function;
	public errorCallBack: Function;
	public reqestMap: any = {};
	public handleMap: any = {};

	public requestID = 1;

	public socketCache: egret.ByteArray = new egret.ByteArray();

	public init() {
		if (!this.webSocket) {
			this.webSocket = new egret.WebSocket();
			this.webSocket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
			this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
			this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
			this.webSocket.addEventListener(egret.Event.CLOSE, this.onClose, this);
			this.webSocket.type = egret.WebSocket.TYPE_BINARY;

			this.bodyBytes = new BaseBytes();
		}
	}

	public delSocket(): void {
		// this.webSocket = new egret.WebSocket();
		
		if (this.webSocket) {
			this.webSocket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
			this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
			this.webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
			this.webSocket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
			this.webSocket = null;
		}
	}

	public connect(ip: string, port) {
		var httphead = document.location.protocol.indexOf("https");
		if (ip.indexOf("wss:") >= 0) {
			this.webSocket.connectByUrl(ip);
		} else if (httphead != -1) {
			var url = "wss://" + ip + ":" + port + "/";
			console.log("connectWSS:" + url);
			this.webSocket.connectByUrl(url);
		} else {
			this.webSocket.connect(ip, port);
		}
	}

	protected onConnect(e: egret.Event) {
		if (this.connectCallBack) {
			this.connectCallBack(this, e);
		}
	}

	protected onError(e: egret.Event) {
		if (this.errorCallBack) {
			this.errorCallBack(this, e);
		}
	}

	protected onClose(e: egret.Event) {
		this.notify(e.type);
	}

	protected onData(e: egret.ProgressEvent) {
		(e.target as egret.WebSocket).readBytes(this.socketCache);
		this.doMsg();
	}

	public bodyBytes: BaseBytes;
	public isDebug = 1;
	public doMsg() {
		var bodyBytes = this.bodyBytes;
		var cache = this.socketCache;
		while (cache.bytesAvailable >= 2) {
			var len = cache.readUnsignedShort();
			if (cache.bytesAvailable >= len - 2) {
				bodyBytes.clear();

				if (len - 2 > 0) {
					cache.readBytes(bodyBytes, 0, len - 2);
					bodyBytes.position = 0;
				}
				var cmd = bodyBytes.readUnsignedShort();

				//console.log("server cmd:" + cmd);

				var handler = this.handleMap[cmd];
				if (!handler) {
					console.error("unregister:CMD=" + cmd);
					if (!cache.bytesAvailable) {
						cache.clear();
					}
					continue;
				}
				if (DEBUG) {
					console.log("server cmd:" + cmd);
					handler.hand(handler.t, bodyBytes);//请注意第一个参数用self,为了提高性能才这样写
				}

				if (RELEASE) {
					handler.hand(handler.t, bodyBytes);//请注意第一个参数用self,为了提高性能才这样写
				}
				// var requestID;
				// var request = this.request[requestID];
				// if (request) {
				// 	try {
				// 		handler.hand(request.t, bodyBytes);
				// 	} catch (e) {
				// 		console.error("socketError:REQUEST=" + requestID);
				// 	}
				// }

				if (!cache.bytesAvailable) {
					cache.clear();
				}
			} else {
				cache.position -= 4;
				break;
			}
		}
	}

	public testData(cmd: number, list: Array<any>) {
		var ba: BaseBytes = new BaseBytes();
		for (var i = 0; i < list.length; i += 2) {
			var t = list[i];
			var content = list[i + 1];
			if (t == "B") {
				ba.writeByte(content);
			} else if (t == "S") {
				ba.writeShort(content);
			} else if (t == "I") {
				ba.writeInt(content);
			} else if (t == "L") {
				ba.writeDouble(content);
			} else if (t == "U") {
				ba.writeUTF(content);
			}
		}
		ba.position = 0;
		this.testRecive(cmd, ba);
	}

	public testRecive(cmd, bytes: BaseBytes) {
		var handler = this.handleMap[cmd];
		if (handler) {
			handler.hand(handler.t, bytes);
		}
	}

	/** 注册服务器调用 */
	public regHand(handid, hand: Function, thisObj) {
		if (this.handleMap[handid]) {
			console.debug("重复注册WEBSOCKET" + handid);
		}
		this.handleMap[handid] = { id: handid, hand: hand, t: thisObj };
	}

	public sendCmdMap:any = {};
	public ba: egret.ByteArray = new egret.ByteArray();
	/** 
	 * 推送数据到服务器
	 * isCheckWorld是否检测跨服
	 * @cmd 协议号 
	 * @data 具体内容 bytes
	 * */
	public sendCMDBytes(cmd: number, content: BaseBytes, isCheckWorld = true) {
		if (!this.webSocket.connected) {//服务器断开
			return;
		}
		if (DEBUG) {
			console.log("send cmd:" + cmd);
			this.sendCmdMap[cmd] = content;
		}
		if (RELEASE) {
			if ((window as any).DEBUGM) {
				console.log("send cmd:" + cmd);
				this.sendCmdMap[cmd] = content;
			}
		}

		var ba = this.ba;
		ba.clear();

		//write head
		ba.writeUnsignedShort(content.length + 4);
		//

		//content
		ba.writeUnsignedShort(cmd);
		ba.writeBytes(content);
		//

		this.webSocket.writeBytes(ba);
		this.webSocket.flush();
	}

	/** 发送数据 并且监听 返回 */
	public request(cmd, content: BaseBytes, callback: Function, thisObj = null) {
		var ba = this.ba;
		ba.clear();

		//write head
		ba.writeUnsignedShort(content.length + 4);
		//

		//content
		ba.writeUnsignedShort(cmd);
		ba.writeBytes(content);

		var request = { rid: this.requestID, cmd: cmd, t: thisObj, hand: callback };
		this.reqestMap[this.requestID] = request;
		//
		this.webSocket.writeBytes(ba);
		this.webSocket.flush();

		if (this.requestID > 65535) {
			this.requestID = 1;
		}
		this.requestID++;
	}

	public clear() {
		this.webSocket.readBytes(this.socketCache);
		this.socketCache.clear();
		this.bodyBytes.clear();
	}
}