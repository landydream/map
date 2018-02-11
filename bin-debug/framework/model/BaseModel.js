var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 负责与服务端通信 和 存储模块数据*/
var BaseModel = (function () {
    function BaseModel() {
    }
    /** 获取BYTEBUFF*/
    BaseModel.prototype.getBytes = function () {
        if (this.bytes) {
            this.bytes.clear();
        }
        else {
            this.bytes = new BaseBytes();
        }
        return this.bytes;
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    BaseModel.prototype.listenServ = function (wsm) {
        this.socket = wsm;
    };
    /** 发送数据 */
    BaseModel.prototype.sendSocket = function (cmd, ba) {
        if (!this.socket.webSocket.connect) {
            return;
        }
        this.socket.sendCMDBytes(cmd, ba);
    };
    return BaseModel;
}());
__reflect(BaseModel.prototype, "BaseModel");
//# sourceMappingURL=BaseModel.js.map