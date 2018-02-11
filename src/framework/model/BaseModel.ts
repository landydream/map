/** 负责与服务端通信 和 存储模块数据*/
class BaseModel {
	public socket:WebSocketMgr;
	public bytes:BaseBytes;
	
	public constructor() {
	}
	
	/** 获取BYTEBUFF*/
	public getBytes() {
		if(this.bytes) {
			this.bytes.clear();
		}else{
			this.bytes = new BaseBytes();
		}
		return this.bytes;
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm:WebSocketMgr) {
		this.socket = wsm;
	}

	/** 发送数据 */
	public sendSocket(cmd, ba:BaseBytes) {
		if(!this.socket.webSocket.connect) {
			return;
		}
		this.socket.sendCMDBytes(cmd, ba);
	}

}