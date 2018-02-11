class UITools {
	public constructor() {
	}

	/**imageBtn */
	public static addPopBtnStyle(obj: egret.DisplayObject): void {
		obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startBtnPop, this);
	}

	public static removeBtnStyle(obj: egret.DisplayObject): void {
		obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startBtnPop, this);
	}

	public static startBtnPop(e: egret.TouchEvent) {
		var obj: egret.DisplayObject = e.currentTarget;
		obj.anchorOffsetY = -5;

		obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRelese, this);
		obj.addEventListener(egret.TouchEvent.TOUCH_END, this.onRelese, this);
	}

	public static onRelese(e: egret.TouchEvent) {
		var obj: egret.DisplayObject = e.currentTarget;
		obj.anchorOffsetY = 0;

		obj.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onRelese, this);
		obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.onRelese, this);
	}

	/**list填充数据*/
	public static replaceAll(canvas: eui.Scroller, dataAC: eui.ArrayCollection, data, refresh: boolean = false): void {
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
		} else {
			canvas.stopAnimation();
		}
	}

	/**清理列表回收 child 必须有clean函数*/
	public static cleanContiainer(list: egret.DisplayObjectContainer): void {
		for (var i = 0, len = list.numChildren; i < len; i++) {
			(list.getChildAt(i) as any).clean();
		}
	}

	public static GRIDPOOL: Array<ViewGrid> = [];
	public static GRID2POOL: Array<ViewGrid2> = [];
	public static IMGPOOL: Array<eui.Image> = [];

	public static getFreeGrid(): ViewGrid {
		var grid: ViewGrid;
		var len = UITools.GRIDPOOL.length;
		if (UITools.GRIDPOOL.length) {
			grid = UITools.GRIDPOOL.pop();
		} else {
			grid = new ViewGrid();
			grid.skinName = ViewGridSkin;
		}
		return grid;
	}

	public static getFreeGrid2(): ViewGrid2 {
		var grid2: ViewGrid2;
		if (UITools.GRID2POOL.length) {
			grid2 = UITools.GRID2POOL.pop();
		} else {
			grid2 = new ViewGrid2();
			grid2.skinName = ViewGrid2Skin;
		}
		return grid2;
	}

	public static getFreeImg(): eui.Image {
		var img: eui.Image = UITools.IMGPOOL.length ? UITools.IMGPOOL.pop() : new eui.Image();
		img.touchEnabled = false;
		return img;
	}

	/**支持回收类型 ViewGrid ViewGrid2 eui.image */
	public static recycleItem(item): void {
		if (!item) return;

		item.alpha = 1;
		item.scaleX = item.scaleY = 1;
		item.rotation = 0;
		item.x = item.y = 0;
		item.visible = true;
		if (item.parent) item.parent.removeChild(item);

		if (item instanceof ViewGrid) {
			item.width = item.height = 84;
			item.isTip = true;
			var len = UITools.GRIDPOOL.length;
			if (UITools.GRIDPOOL.indexOf(item) < 0) {
				UITools.GRIDPOOL.push(item);
			} else {
				if (DEBUG) { throw ("ViewGrid 回收重复 该函数没有清理Grid"); }
			}
		} else if (item instanceof ViewGrid2) {
			item.grid.isTip = true;
			item.width = 84;
			item.height = 108;
			if (UITools.GRID2POOL.indexOf(item) < 0) {
				UITools.GRID2POOL.push(item);
			} else {
				if (DEBUG) { throw ("ViewGrid2 回收重复 该函数没有清理Grid2"); }
			}
		} else if (item instanceof eui.Image) {
			ImageLoader.instance.reduceImgRes(item);
			if (UITools.IMGPOOL.indexOf(item) < 0) {
				UITools.IMGPOOL.push(item);
			} else {
				if (DEBUG) { throw ("IMGPOOL 回收重复 该函数没有清理image") }
			}
		}
	}
}