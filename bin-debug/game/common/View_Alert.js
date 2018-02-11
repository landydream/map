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
var View_Alert = (function (_super) {
    __extends(View_Alert, _super);
    function View_Alert() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/gameSkin/common/SkinAlert.exml";
        return _this;
    }
    View_Alert.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKT, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelT, this);
        this.gpCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckBoxHandler, this);
    };
    View_Alert.prototype.onCheckBoxHandler = function (e) {
        this.checkBox.selected = !this.checkBox.selected;
        View_Alert.dicCheckBox[this.arg.checkBoxKey] = this.checkBox.selected == true ? 1 : 0;
    };
    View_Alert.prototype.onOKT = function (e) {
        var continueOpen;
        if (this.onOK) {
            continueOpen = this.onOK.call(this.thisObj, e);
        }
        if (!continueOpen) {
            this.closeHandler();
        }
    };
    View_Alert.prototype.onCancelT = function (e) {
        var continueOpen;
        if (this.onCancel) {
            continueOpen = this.onCancel.call(this.thisObj, e);
        }
        if (!continueOpen) {
            this.closeHandler();
        }
    };
    View_Alert.prototype.show = function (arg) {
        this.arg = arg;
        if (arg.option == View_Alert.OK) {
            this.currentState = "sure";
        }
        else if (arg.option == View_Alert.CANCEL) {
            this.currentState = "cancel";
        }
        else if (arg.option == View_Alert.OKANDCANCEL) {
            this.currentState = "all";
        }
        this.thisObj = arg.thisObj;
        this.onOK = arg.onOK;
        this.onCancel = arg.onCancel;
        this.onCloseFun = arg.onClose;
        if (arg.title) {
            this.uiBack.text = arg.title;
        }
        else {
            this.uiBack.text = "提  示";
        }
        if (arg.oktext) {
            this.btnSure.text = arg.oktext;
        }
        else {
            this.btnSure.text = "确认";
        }
        if (arg.canceltext) {
            this.btnCancel.text = arg.canceltext;
        }
        else {
            this.btnCancel.text = "取消";
        }
        if (HtmlUtil.isHtml(arg.text)) {
            this.lb.textFlow = HtmlUtil.HTMLPARSER.parser(arg.text);
        }
        else {
            this.lb.text = arg.text;
        }
        this.gpCheckBox.visible = arg.onCheckBox;
        if (arg.onCheckBox == true) {
            this.checkBox.selected = false;
            View_Alert.dicCheckBox[arg.checkBoxKey] = 0;
        }
    };
    View_Alert.prototype.timeChange = function () {
        if (this.arg.time > 0) {
            var time = this.arg.time - Model_GlobalMsg.getServerTime();
            time = Math.ceil(time / 1000);
            if (time <= 0) {
                this.closeHandler();
                return;
            }
            if (this.arg.timeType == 1) {
                this.btnSure.text = this.arg.oktext + "(" + time + ")";
            }
            else {
                this.btnCancel.text = this.arg.canceltext + "(" + time + ")";
            }
        }
    };
    View_Alert.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.addCloseListen(this.rect);
        this.addCloseListen(this.uiBack.btnClose);
        this.show(arg);
        if (arg && arg.time) {
            this.timeChange();
            Timer.instance.listen(this.timeChange, this, 1000, egret.getTimer());
        }
    };
    View_Alert.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        this.removeCloseListen(this.rect);
        this.removeCloseListen(this.uiBack.btnClose);
        if (this.onCloseFun) {
            this.onCloseFun.call(this.thisObj);
        }
        Timer.instance.listen(this.timeChange, this);
    };
    /**
     * 显示弹框
     * @param text:提示内容
     * @param onOK:确认按钮回调方法
     * @param option:显示按钮的类型
     * @param thisObj:回调的对象
     * @param title:弹框标题
     * @param oktext:确认按钮文本
     * @param canceltext:取消按钮文本
     * @param cancel:取消按钮回调
     * @param close:关闭弹框的回调
     * @param onCheckBox:是否显示checkbox
     * @param checkBoxKey:用作记录checkbox状态的key
     */
    View_Alert.show = function (text, onOK, option, thisObj, title, oktext, canceltext, cancel, close, onCheckBox, checkBoxKey, time, timeType) {
        if (onOK === void 0) { onOK = null; }
        if (option === void 0) { option = 1 | 2; }
        if (thisObj === void 0) { thisObj = null; }
        if (title === void 0) { title = null; }
        if (oktext === void 0) { oktext = null; }
        if (canceltext === void 0) { canceltext = null; }
        if (cancel === void 0) { cancel = null; }
        if (close === void 0) { close = null; }
        if (onCheckBox === void 0) { onCheckBox = false; }
        if (checkBoxKey === void 0) { checkBoxKey = ""; }
        if (time === void 0) { time = -1; }
        if (timeType === void 0) { timeType = 1; }
        if (onCheckBox == true && View_Alert.dicCheckBox[checkBoxKey] != null && View_Alert.dicCheckBox[checkBoxKey] == 1) {
            onOK.call(thisObj);
        }
        else {
            var arg = {
                text: text, title: title, onOK: onOK, option: option, thisObj: thisObj, onCancel: cancel, oktext: oktext, canceltext: canceltext,
                onClose: close, onCheckBox: onCheckBox, checkBoxKey: checkBoxKey, time: time, timeType: timeType
            };
            GameGlobal.layerMgr.open(UIConst.ALERT, arg);
        }
    };
    View_Alert.OK = 1;
    View_Alert.CANCEL = 2;
    View_Alert.OKANDCANCEL = 3;
    View_Alert.dicCheckBox = {};
    return View_Alert;
}(BaseEUIView));
__reflect(View_Alert.prototype, "View_Alert");
//# sourceMappingURL=View_Alert.js.map