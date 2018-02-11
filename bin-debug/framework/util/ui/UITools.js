var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UITools = (function () {
    function UITools() {
    }
    /**imageBtn */
    UITools.addPopBtnStyle = function (obj) {
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startBtnPop, this);
    };
    UITools.removeBtnStyle = function (obj) {
        obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startBtnPop, this);
    };
    UITools.startBtnPop = function (e) {
        var obj = e.currentTarget;
        obj.anchorOffsetY = -5;
        obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRelese, this);
        obj.addEventListener(egret.TouchEvent.TOUCH_END, this.onRelese, this);
    };
    UITools.onRelese = function (e) {
        var obj = e.currentTarget;
        obj.anchorOffsetY = 0;
        obj.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRelese, this);
        obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRelese, this);
    };
    /**list填充数据*/
    UITools.replaceAll = function (canvas, dataAC, data, refresh) {
        if (refresh === void 0) { refresh = false; }
        var s = canvas.viewport.scrollV;
        var h = canvas.viewport.scrollH;
        canvas.viewport.scrollV = 0;
        canvas.viewport.scrollH = 0;
        dataAC.replaceAll(data);
        dataAC.refresh();
        canvas.validateNow();
        if (refresh == false) {
            canvas.viewport.scrollV = s;
            canvas.viewport.scrollH = h;
        }
        else {
            canvas.stopAnimation();
        }
    };
    /**清理列表回收 child 必须有clean函数*/
    UITools.cleanContiainer = function (list) {
        for (var i = 0, len = list.numChildren; i < len; i++) {
            list.getChildAt(i).clean();
        }
    };
    UITools.getFreeGrid = function () {
        var grid;
        var len = UITools.GRIDPOOL.length;
        if (UITools.GRIDPOOL.length) {
            grid = UITools.GRIDPOOL.pop();
        }
        else {
            grid = new ViewGrid();
            grid.skinName = ViewGridSkin;
        }
        return grid;
    };
    UITools.getFreeGrid2 = function () {
        var grid2;
        if (UITools.GRID2POOL.length) {
            grid2 = UITools.GRID2POOL.pop();
        }
        else {
            grid2 = new ViewGrid2();
            grid2.skinName = ViewGrid2Skin;
        }
        return grid2;
    };
    UITools.getFreeImg = function () {
        var img = UITools.IMGPOOL.length ? UITools.IMGPOOL.pop() : new eui.Image();
        img.touchEnabled = false;
        return img;
    };
    /**支持回收类型 ViewGrid ViewGrid2 eui.image */
    UITools.recycleItem = function (item) {
        if (!item)
            return;
        item.alpha = 1;
        item.scaleX = item.scaleY = 1;
        item.rotation = 0;
        item.x = item.y = 0;
        item.visible = true;
        if (item.parent)
            item.parent.removeChild(item);
        if (item instanceof ViewGrid) {
            item.width = item.height = 84;
            item.isTip = true;
            var len = UITools.GRIDPOOL.length;
            if (UITools.GRIDPOOL.indexOf(item) < 0) {
                UITools.GRIDPOOL.push(item);
            }
            else {
                if (true) {
                    throw ("ViewGrid 回收重复 该函数没有清理Grid");
                }
            }
        }
        else if (item instanceof ViewGrid2) {
            item.grid.isTip = true;
            item.width = 84;
            item.height = 108;
            if (UITools.GRID2POOL.indexOf(item) < 0) {
                UITools.GRID2POOL.push(item);
            }
            else {
                if (true) {
                    throw ("ViewGrid2 回收重复 该函数没有清理Grid2");
                }
            }
        }
        else if (item instanceof eui.Image) {
            ImageLoader.instance.reduceImgRes(item);
            if (UITools.IMGPOOL.indexOf(item) < 0) {
                UITools.IMGPOOL.push(item);
            }
            else {
                if (true) {
                    throw ("IMGPOOL 回收重复 该函数没有清理image");
                }
            }
        }
    };
    UITools.GRIDPOOL = [];
    UITools.GRID2POOL = [];
    UITools.IMGPOOL = [];
    return UITools;
}());
__reflect(UITools.prototype, "UITools");
//# sourceMappingURL=UITools.js.map