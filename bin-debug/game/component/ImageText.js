var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ImageText = (function () {
    function ImageText() {
        this.images = [];
        this.fx = 0;
        this.fy = 0;
        this.totalWid = 0;
    }
    ImageText.create = function (parent, charFunc, layoutFunc) {
        var img = new ImageText();
        img.container = parent;
        img.charFunc = charFunc;
        img.layoutFunc = layoutFunc;
        return img;
    };
    ImageText.prototype.makeContainer = function () {
        this.container = new egret.DisplayObjectContainer();
    };
    ImageText.prototype.setText = function (text) {
        if (this._text != text) {
            this._text = text;
            this.redraw();
        }
    };
    /**居中显示时调用 */
    ImageText.prototype.drawTextHCenter = function (text) {
        if (this._text != text) {
            this._text = text;
            this.redraw();
            this.fx = (this.container.width - this.totalWid) / 2; //设置居中
            this.redraw();
        }
    };
    ImageText.prototype.redraw = function () {
        var text = this._text;
        var totalWid = 0;
        for (var i = 0, len = text.length; i < len; i++) {
            this.by = 0;
            var img = this.images[i];
            if (!img) {
                img = this.images[i] = ImageText.getImage();
                this.container.addChild(img);
            }
            this.charFunc(this, text.charAt(i));
            img.source = this.bs;
            img.touchEnabled = false;
            if (this.layoutFunc) {
                this.layoutFunc(this, img, i);
            }
            else {
                img.x = this.fx + totalWid;
                img.y = this.fy;
                if (this.by) {
                    img.y += this.by;
                }
                totalWid += this.bw;
            }
        }
        for (; i < this.images.length; i++) {
            this.images[i].scaleX = this.images[i].scaleY = 1;
            ImageText.POOL.push(this.images[i]);
            if (this.images[i].parent) {
                this.images[i].parent.removeChild(this.images[i]);
            }
        }
        if (len < this.images.length) {
            this.images.length = len;
        }
        this.totalWid = totalWid;
    };
    ImageText.getImage = function () {
        return ImageText.POOL.length ? ImageText.POOL.pop() : new eui.Image();
    };
    /**主UI战斗力文字 */
    ImageText.HEADPOWERFUNC = function (text, char) {
        text.bs = "MAINUI_json.BM_Text_Z" + char;
        text.bw = 15;
    };
    ImageText.VIPFUNC = function (text, char) {
        if (char == "v") {
            text.bs = "MAINUI_json.BM_Texta";
            text.bw = 40;
        }
        else {
            text.bs = "MAINUI_json.BM_Texta" + char;
            text.bw = 15;
        }
    };
    ImageText.VIPFUNC2 = function (text, char) {
        if (char == "v") {
            text.bs = "VIP_json.Bm_viptext";
            text.bw = 72;
        }
        else {
            text.bs = "VIP_json.Bm_" + char;
            text.bw = 23;
            text.by = 4;
        }
    };
    ImageText.DMGFUNC1 = function (text, char) {
        text.bs = "num1_json.No_Attack00" + char;
        text.bw = 18;
    };
    ImageText.BIGNUMFUN1 = function (text, char) {
        text.bs = "num2_json.numHS_" + char;
        text.bw = 36;
    };
    ImageText.ROUNDFUN = function (text, char) {
        if (char == "/") {
            text.bs = "num5_json.battlexg";
            text.bw = 20;
        }
        else {
            text.bs = "num5_json.battle_" + char;
            text.bw = 25;
        }
    };
    ImageText.DMGFUNC1CRIT = function (text, char) {
        if (char == "c") {
            text.bs = "num1_json.No_Crittext";
            text.bw = 70;
            text.by = -10;
        }
        else {
            text.bs = "num1_json.No_Crit00" + char;
            text.bw = 18;
        }
    };
    ImageText.CUREFUN = function (text, char) {
        if (char == "+") {
            text.bs = "num1_json.SGA";
            text.bw = 14;
        }
        else {
            text.bs = "num1_json.SG" + char;
            text.bw = 15;
        }
    };
    ImageText.RANKFUN = function (text, char) {
        text.bs = "num2_json.numHS_" + char;
        text.bw = 1;
        text.by = 55;
    };
    ImageText.GUANQIAFUN = function (text, char) {
        if (char == "l") {
            //qwxdt_json.NO_GQ000
            text.bs = "qwxdt_json.Bm_text001";
            text.bw = 24;
        }
        else if (char == "/") {
            text.bs = "qwxdt_json.Bm_text002";
            text.bw = 13;
        }
        else {
            text.bs = "qwxdt_json.NO_GQ00" + char;
            text.bw = 13;
        }
    };
    ImageText.YUANBAOFUN = function (text, char) {
        text.bs = "Bm_yb" + char;
        text.bw = 18;
    };
    ImageText.VIPFUN3 = function (text, char) {
        text.bs = "Bm_Vip" + char;
        text.bw = 23;
    };
    ImageText.ADDFUNC = function (text, char) {
        if (char == "+") {
            text.bs = "num6_json.LS_jia";
            text.bw = 16;
        }
        else if (char == "-") {
            text.bs = "num6_json.LS_jian";
            text.bw = 17;
        }
        else if (char == "%") {
            text.bs = "num6_json.LS_bf";
            text.bw = 23;
        }
        else if (char == "a") {
            text.bs = "num6_json.attack";
            text.bw = 31;
            text.by = -5;
        }
        else if (char == "d") {
            text.bs = "num6_json.defance";
            text.bw = 31;
            text.by = -5;
        }
        else if (char == "c") {
            text.bs = "num6_json.cure";
            text.bw = 31;
            text.by = -5;
        }
        else {
            text.bs = "num6_json.LS_" + char;
            text.bw = 17;
        }
    };
    /**价值文字 */
    ImageText.YUANBAOFUNC = function (text, char) {
        text.bs = "num7_json.No_00" + char;
        text.bw = 10;
    };
    /**价值文字 */
    ImageText.YUANBAOFUNC2 = function (text, char) {
        text.bs = "num7_json.No_00" + char;
        text.bw = 25;
    };
    /**排名 第1-2名*/
    ImageText.RANKFUN2 = function (text, char) {
        if (char == "第") {
            text.bs = "JJPH_json.NO_DI";
            text.bw = 30;
        }
        else if (char == "名") {
            text.bs = "JJPH_json.NO_Ming";
            text.bw = 28;
        }
        else if (char == "-") {
            text.bs = "JJPH_json.NO_Zhi";
            text.bw = 17;
        }
        else {
            text.bs = "JJPH_json.NO_00" + char;
            text.bw = 17;
        }
    };
    ImageText.POOL = [];
    return ImageText;
}());
__reflect(ImageText.prototype, "ImageText");
//# sourceMappingURL=ImageText.js.map