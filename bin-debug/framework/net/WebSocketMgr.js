var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var WebSocketMgr = (function (_super) {
    __extends(WebSocketMgr, _super);
    function WebSocketMgr() {
        var _this = _super.call(this) || this;
        _this.reqestMap = {};
        _this.handleMap = {};
        _this.requestID = 1;
        _this.socketCache = new egret.ByteArray();
        _this.isDebug = 1;
        _this.sendCmdMap = {};
        _this.ba = new egret.ByteArray();
        return _this;
    }
    WebSocketMgr.prototype.init = function () {
        if (!this.webSocket) {
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
            this.webSocket.addEventListener(egret.Event.CLOSE, this.onClose, this);
            this.webSocket.type = egret.WebSocket.TYPE_BINARY;
            this.bodyBytes = new BaseBytes();
        }
    };
    WebSocketMgr.prototype.delSocket = function () {
        // this.webSocket = new egret.WebSocket();
        if (this.webSocket) {
            this.webSocket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
            this.webSocket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
            this.webSocket = null;
        }
    };
    WebSocketMgr.prototype.connect = function (ip, port) {
        var httphead = document.location.protocol.indexOf("https");
        if (ip.indexOf("wss:") >= 0) {
            this.webSocket.connectByUrl(ip);
        }
        else if (httphead != -1) {
            var url = "wss://" + ip + ":" + port + "/";
            console.log("connectWSS:" + url);
            this.webSocket.connectByUrl(url);
        }
        else {
            this.webSocket.connect(ip, port);
        }
    };
    WebSocketMgr.prototype.onConnect = function (e) {
        if (this.connectCallBack) {
            this.connectCallBack(this, e);
        }
    };
    WebSocketMgr.prototype.onError = function (e) {
        if (this.errorCallBack) {
            this.errorCallBack(this, e);
        }
    };
    WebSocketMgr.prototype.onClose = function (e) {
        this.notify(e.type);
    };
    WebSocketMgr.prototype.onData = function (e) {
        e.target.readBytes(this.socketCache);
        this.doMsg();
    };
    WebSocketMgr.prototype.doMsg = function () {
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
                if (true) {
                    console.log("server cmd:" + cmd);
                    handler.hand(handler.t, bodyBytes); //请注意第一个参数用self,为了提高性能才这样写
                }
                if (false) {
                    handler.hand(handler.t, bodyBytes); //请注意第一个参数用self,为了提高性能才这样写
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
            }
            else {
                cache.position -= 4;
                break;
            }
        }
    };
    WebSocketMgr.prototype.testData = function (cmd, list) {
        var ba = new BaseBytes();
        for (var i = 0; i < list.length; i += 2) {
            var t = list[i];
            var content = list[i + 1];
            if (t == "B") {
                ba.writeByte(content);
            }
            else if (t == "S") {
                ba.writeShort(content);
            }
            else if (t == "I") {
                ba.writeInt(content);
            }
            else if (t == "L") {
                ba.writeDouble(content);
            }
            else if (t == "U") {
                ba.writeUTF(content);
            }
        }
        ba.position = 0;
        this.testRecive(cmd, ba);
    };
    WebSocketMgr.prototype.testRecive = function (cmd, bytes) {
        var handler = this.handleMap[cmd];
        if (handler) {
            handler.hand(handler.t, bytes);
        }
    };
    /** 注册服务器调用 */
    WebSocketMgr.prototype.regHand = function (handid, hand, thisObj) {
        if (this.handleMap[handid]) {
            console.debug("重复注册WEBSOCKET" + handid);
        }
        this.handleMap[handid] = { id: handid, hand: hand, t: thisObj };
    };
    /**
     * 推送数据到服务器
     * isCheckWorld是否检测跨服
     * @cmd 协议号
     * @data 具体内容 bytes
     * */
    WebSocketMgr.prototype.sendCMDBytes = function (cmd, content, isCheckWorld) {
        if (isCheckWorld === void 0) { isCheckWorld = true; }
        if (!this.webSocket.connected) {
            return;
        }
        if (true) {
            console.log("send cmd:" + cmd);
            this.sendCmdMap[cmd] = content;
        }
        if (false) {
            if (window.DEBUGM) {
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
    };
    /** 发送数据 并且监听 返回 */
    WebSocketMgr.prototype.request = function (cmd, content, callback, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
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
    };
    WebSocketMgr.prototype.clear = function () {
        this.webSocket.readBytes(this.socketCache);
        this.socketCache.clear();
        this.bodyBytes.clear();
    };
    return WebSocketMgr;
}(MsgCenter));
__reflect(WebSocketMgr.prototype, "WebSocketMgr");
//# sourceMappingURL=WebSocketMgr.js.map