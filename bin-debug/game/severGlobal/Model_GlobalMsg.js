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
var Model_GlobalMsg = (function (_super) {
    __extends(Model_GlobalMsg, _super);
    function Model_GlobalMsg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**获取是否有红点提示 id=NoticeConst红点表id */
    Model_GlobalMsg.getNotice = function (id) {
        if (this.noticeMap[id] > 0) {
            return true;
        }
        return false;
    };
    //协议处理
    Model_GlobalMsg.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(252, this.GC_GLOBAL_SERVER_TIME, this);
        mgr.regHand(254, this.GC_GLOBAL_SERVER_NOTICE, this);
        mgr.regHand(256, this.GC_GLOBAL_SERVER_MSG, this);
        mgr.regHand(258, this.GC_GLOBAL_KAI_FU_TIME_MSG, this);
        mgr.regHand(260, this.GC_GLOBAL_SERVER_PROMPT, this);
        mgr.regHand(270, this.GC_RED_NOTICE, this);
        mgr.regHand(272, this.GC_Global_isred_272, this);
    };
    /**251 CG申请同步服务器时间**/
    Model_GlobalMsg.prototype.CG_GLOBAL_SERVER_TIME = function () {
        var bates = this.getBytes();
        this.sendSocket(251, bates);
    };
    //252 L-U GC发送服务器当前时间 L:当前服务器时间戳U:当前服务器时区
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_TIME = function (self, data) {
        Model_GlobalMsg.updateTime = egret.getTimer();
        Model_GlobalMsg.serverTime = data.readLong();
        var str = data.readUTF();
        var time = str.substr(3, 3);
        Model_GlobalMsg.serverTimeZone = parseInt(time);
        // var str = model_
        //var c = DateHelp.getYMDHMS(Model_GlobalMsg.serverTime/1000);
        GameGlobal.control.notify(Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE);
    };
    /**
     * 服务器时间 毫秒
     */
    Model_GlobalMsg.getServerTime = function () {
        var time = egret.getTimer() + Model_GlobalMsg.serverTime - Model_GlobalMsg.updateTime;
        return time;
    };
    //254 B-I-I-I GC个人事件提示 B:0 使用 1 获得 I:属性类型I:物品系统IDI:提示数量或角色id
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_NOTICE = function (self, data) {
        var oper = data.readByte();
        var type = data.readInt();
        var id = data.readInt();
        var hidOrNum = data.readLong();
        var msg = null;
        if (oper == 1) {
            //msg = ConfigHelp.getAttrName(type) + "  +" + hidOrNum;
            //var color: number = Color.QUALITYCOLOR[Config.Atrr_LIB[type].color];
            // ViewCommonWarn.textItem(type, id, hidOrNum);
        }
        else {
            msg = "未知个人事件提示：" + oper;
        }
    };
    /**256 S-I GC全局消息和提示 S:消息类型 1等级不够进行此操作2系统已屏蔽I:标识 消息标识(功能id)*/
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_MSG = function (self, data) {
        var type = data.readShort();
        var funID = data.readInt();
        var msg = null;
        if (type == 1) {
            if (SystemHelp.isOpen(funID, true) == false) {
                msg = "等级不够进行此操作"; //进入此处可能是系统开启表没有同步
            }
        }
        else if (type == 2) {
            msg = "系统已屏蔽";
        }
        else if (type == 3) {
            View_Alert.show("充值暂时关闭，请稍后再试", null, View_Alert.OK);
            return;
        }
        else {
            msg = "未知个全局消息和提示：type = " + type;
        }
        // if (msg) {
        // 	ViewCommonWarn.text(msg);
        // }
    };
    /**258 L 开服时间*/
    Model_GlobalMsg.prototype.GC_GLOBAL_KAI_FU_TIME_MSG = function (self, data) {
        var arg1 = data.readLong();
        Model_GlobalMsg.kaiFuTime = arg1 * 1000;
    };
    /**
     * 260 B-U GC后端返回提示字符串 B:1系统提示2GM热更U:内容
     */
    Model_GlobalMsg.prototype.GC_GLOBAL_SERVER_PROMPT = function (self, data) {
        var type = data.readByte();
        var content = data.readUTF();
        if (type == 1) {
            // ViewCommonWarn.text(content);
        }
        else if (type == 2) {
            // ViewCommonWarn.text(content);
        }
        else if (type == 3) {
            Model_GlobalMsg.serverVersion = content;
        }
    };
    /**
     * 270	[I-B] GC通知红点状态 [I:图标类型idB:0没红点1红点]图标红点状态
     */
    Model_GlobalMsg.prototype.GC_RED_NOTICE = function (self, data) {
        var list = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var k = data.readInt();
            var b = data.readByte();
            if (Model_GlobalMsg.noticeMap[k] != b) {
                list.push(k);
            }
            Model_GlobalMsg.noticeMap[k] = b;
        }
        GameGlobal.control.notify(Model_GlobalMsg.MSG_NOTICE_UPDATE, list);
    };
    /**271 I 某个系统是否红点 I:系统红点类型type*/
    Model_GlobalMsg.prototype.CG_Global_isred_271 = function (arg1) {
        var bates = this.getBytes();
        bates.writeInt(arg1);
        this.sendSocket(271, bates);
    };
    /**272 I-B 个别特殊系统是否显示红点 I:系统红点类型typeB:1：有红点red*/
    Model_GlobalMsg.prototype.GC_Global_isred_272 = function (self, data) {
        var arg1 = data.readInt();
        var arg2 = data.readByte();
        Model_GlobalMsg.noticeMap[arg1] = arg2;
        GameGlobal.control.notify(Model_GlobalMsg.MSG_SPECIAL_NOTICE_UPDATE, arg1);
    };
    Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE = "MSG_GLOBAL_SERVER_TIME_UPDATE";
    /**有红点更新 参数[图标类型]*/
    Model_GlobalMsg.MSG_NOTICE_UPDATE = "MSG_NOTICE_UPDATE";
    /**特殊红点更新 参数[图标类型]*/
    Model_GlobalMsg.MSG_SPECIAL_NOTICE_UPDATE = "MSG_SPECIAL_NOTICE_UPDATE";
    /**有活动图标更新 参数[活动界面id,活动子界面id,红点id,活动剩余时间:大于0-活动倒计时 等于0-活动结束 小于0-无倒计时] */
    Model_GlobalMsg.MSG_ACTIVITY_UPDATE = "MSG_ACTIVITY_UPDATE";
    /**界面红点 */
    Model_GlobalMsg.noticeMap = {};
    return Model_GlobalMsg;
}(BaseModel));
__reflect(Model_GlobalMsg.prototype, "Model_GlobalMsg");
//# sourceMappingURL=Model_GlobalMsg.js.map