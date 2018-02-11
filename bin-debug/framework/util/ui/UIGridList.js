var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIGridList = (function () {
    function UIGridList() {
        /**格子类型  1: viewGrid 2: viewGrid2*/
        this.type = 1;
        /**布局所占用的格子数量*/
        this.size = 1;
        /**是否换行展示*/
        this.gridWrap = false;
        /**格子水平间距*/
        this.hGap = 0;
        /**格子垂直行距*/
        this.vGap = 0;
        /**是否显示格子tips */
        this.isTip = true;
        /**排列方式*/
        this.align = "";
        /**缩放大小*/
        this.scaleSize = 1;
        this.px = 0;
        this.py = 0;
        this.grids = [];
    }
    /**type 1: viewGrid，2: viewGrid2，默认1 */
    UIGridList.create = function (sx, sy, parent, gap, type) {
        if (gap === void 0) { gap = 12; }
        if (type === void 0) { type = 1; }
        var ret = new UIGridList();
        ret.px = sx;
        ret.py = sy;
        ret.container = parent;
        ret.hGap = gap;
        ret.type = type;
        return ret;
    };
    UIGridList.prototype.resize = function () {
        var slef = this;
        var gSize = 84 * slef.scaleSize;
        var totolW = slef.size * (gSize + slef.hGap) - slef.hGap;
        var len = slef.grids.length;
        var gridsW = slef.grids.length * (gSize + slef.hGap) - slef.hGap;
        var offX = 0;
        if (slef.align == UIGridList.ALIGN_CENTER) {
            offX = (totolW - gridsW) / 2 - 42;
        }
        else if (slef.align == UIGridList.ALIGN_RIGHT) {
            offX = totolW - gridsW;
        }
        else {
            offX = 0;
        }
        for (var i = 0; i < len; i++) {
            var grid = slef.grids[i];
            if (slef.gridWrap) {
                grid.$setX(slef.px + offX + (gSize + slef.hGap) * ((i % slef.size) >> 0));
                grid.$setY(slef.py + (gSize + slef.vGap) * ((i / slef.size) >> 0));
            }
            else {
                grid.$setX(slef.px + offX + i * (gSize + slef.hGap));
                grid.$setY(slef.py);
            }
        }
    };
    UIGridList.prototype.renderWidtCfgDate = function (v) {
        if (this.data == v)
            return;
        var vos = ConfigHelp.makeItemList(v);
        this.renderWithVos(vos);
        this.data = v;
    };
    UIGridList.prototype.renderWidtSevDate = function (v) {
        if (this.data == v)
            return;
        var vos = ConfigHelp.makeServerItemList(v);
        this.renderWithVos(vos);
        this.data = v;
    };
    UIGridList.prototype.renderWithVos = function (vos) {
        var self = this;
        self.clean();
        for (var i = 0, len = vos.length; i < len; i++) {
            var grid = self.createGrid();
            self.container.addChild(grid);
            grid.vo = vos[i];
            grid.isTip = self.isTip;
            grid.scaleX = grid.scaleY = self.scaleSize;
            self.grids.push(grid);
        }
        self.resize();
    };
    UIGridList.prototype.createGrid = function () {
        if (this.type == 1) {
            return UITools.getFreeGrid();
        }
        else {
            return UITools.getFreeGrid2();
        }
    };
    UIGridList.prototype.clean = function () {
        var self = this;
        for (var i = 0, len = self.grids.length; i < len; i++) {
            UITools.recycleItem(self.grids[i]);
            self.grids[i] = null;
        }
        self.grids.length = 0;
        self.data = null;
    };
    UIGridList.ALIGN_LEFT = "left";
    UIGridList.ALIGN_CENTER = "center";
    UIGridList.ALIGN_RIGHT = "right";
    return UIGridList;
}());
__reflect(UIGridList.prototype, "UIGridList");
//# sourceMappingURL=UIGridList.js.map