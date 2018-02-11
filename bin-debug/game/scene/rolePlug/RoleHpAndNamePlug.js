var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleHpAndNamePlug = (function () {
    function RoleHpAndNamePlug() {
        this.tag = "RoleHpAndNamePlug";
        this.hptype = 0;
        /**显示选项掩码
         * &1 显示气血
         * &2 显示名称
         */
        this.optionbit = 1;
        this.lbName = new eui.Label();
        this.lbName.size = 14;
        this.lbName.stroke = 1;
        this.lbName.textColor = 0xdddddd;
        this.hpbg = new eui.Image();
        this.hpbar = new eui.Image();
    }
    RoleHpAndNamePlug.create = function (isSelf) {
        if (isSelf === void 0) { isSelf = true; }
        RoleHpAndNamePlug.isSelf = isSelf;
        return RoleHpAndNamePlug.POOL.length ? RoleHpAndNamePlug.POOL.pop() : new RoleHpAndNamePlug();
    };
    RoleHpAndNamePlug.prototype.update = function () {
    };
    RoleHpAndNamePlug.prototype.onAdd = function () {
        var self = this;
        if (self.optionbit & 1) {
            if (self.hptype == 0) {
                if (RoleHpAndNamePlug.isSelf)
                    self.hpbar.source = "COMMON1_json.SBM_LoadingBG1";
                else
                    self.hpbar.source = "COMMON1_json.SBM_LoadingBG2";
                self.hpbg.source = "COMMON1_json.SBM_LoadingBG";
                self.hpbar.width = 80;
                self.hpbar.height = 5;
                self.hpbar.x = -40;
                self.hpbar.y = -10;
                self.hpbar.scale9Grid = new egret.Rectangle(1, 1, 6, 9);
                self.hpbg.width = 84;
                self.hpbg.height = 10;
                self.hpbg.x = -42.5;
                self.hpbg.y = -13;
                self.hpbg.scale9Grid = new egret.Rectangle(2, 2, 15, 13);
            }
            self.role.headGroup.addChild(self.hpbg);
            self.role.headGroup.addChild(self.hpbar);
            //self.hpbar.scaleX = self.role.curhp / self.role.maxhp;
            self.role.headGroup.addChild(self.lbName);
        }
        if (self.optionbit & 2) {
            self.lbName.text = self.role.name;
            self.lbName.x = -((self.lbName.textWidth / 2) >> 0);
            self.lbName.y = -30;
        }
    };
    RoleHpAndNamePlug.prototype.onRemove = function () {
        var self = this;
        if (self.optionbit & 1) {
            self.role.headGroup.removeChild(self.hpbg);
            self.role.headGroup.removeChild(self.hpbar);
        }
        if (self.optionbit & 2) {
            self.role.headGroup.removeChild(self.lbName);
        }
    };
    RoleHpAndNamePlug.prototype.onEvent = function (evt, arg) {
        var self = this;
        // if (self.optionbit & 1 && evt == EVT_SC.EVT_HURT) {
        // 	self.hpbar.scaleX = self.role.curhp / self.role.maxhp;
        // }
    };
    RoleHpAndNamePlug.POOL = [];
    return RoleHpAndNamePlug;
}());
__reflect(RoleHpAndNamePlug.prototype, "RoleHpAndNamePlug");
//# sourceMappingURL=RoleHpAndNamePlug.js.map