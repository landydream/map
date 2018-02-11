class UIGridList {
	public constructor() {
	}

	public static ALIGN_LEFT: string = "left";
	public static ALIGN_CENTER: string = "center";
	public static ALIGN_RIGHT: string = "right";

	/**格子类型  1: viewGrid 2: viewGrid2*/
	public type: number = 1;
	/**布局所占用的格子数量*/
	public size: number = 1;
	/**是否换行展示*/
	public gridWrap: boolean = false;
	/**格子水平间距*/
	public hGap: number = 0;
	/**格子垂直行距*/
	public vGap: number = 0;
	/**是否显示格子tips */
	public isTip: boolean = true;
	/**排列方式*/
	public align: string = "";
	/**缩放大小*/
	public scaleSize: number = 1;

	public px: number = 0;
	public py: number = 0;
	public container: egret.DisplayObjectContainer;
	public grids = [];

	/**type 1: viewGrid，2: viewGrid2，默认1 */
	public static create(sx, sy, parent, gap = 12, type = 1): UIGridList {
		var ret = new UIGridList();
		ret.px = sx;
		ret.py = sy;
		ret.container = parent;
		ret.hGap = gap;
		ret.type = type;
		return ret;
	}

	protected resize(): void {
		var slef = this;
		var gSize = 84 * slef.scaleSize;
		var totolW = slef.size * (gSize + slef.hGap) - slef.hGap;
		var len = slef.grids.length;
		var gridsW = slef.grids.length * (gSize + slef.hGap) - slef.hGap;

		var offX = 0;
		if (slef.align == UIGridList.ALIGN_CENTER) {
			offX = (totolW - gridsW) / 2 - 42;
		} else if (slef.align == UIGridList.ALIGN_RIGHT) {
			offX = totolW - gridsW;
		} else {
			offX = 0;
		}

		for (var i: number = 0; i < len; i++) {
			var grid = slef.grids[i];
			if (slef.gridWrap) {
				grid.$setX(slef.px + offX + (gSize + slef.hGap) * ((i % slef.size) >> 0));
				grid.$setY(slef.py + (gSize + slef.vGap) * ((i / slef.size) >> 0));
			} else {
				grid.$setX(slef.px + offX + i * (gSize + slef.hGap));
				grid.$setY(slef.py);
			}
		}
	}

	public data: any;
	public renderWidtCfgDate(v): void {
		if (this.data == v) return;
		var vos = ConfigHelp.makeItemList(v);
		this.renderWithVos(vos);
		this.data = v;
	}

	public renderWidtSevDate(v): void {
		if (this.data == v) return;
		var vos = ConfigHelp.makeServerItemList(v);
		this.renderWithVos(vos);
		this.data = v;
	}

	public renderWithVos(vos: Array<IGridImpl>): void {
		var self = this;
		self.clean();
		for (var i: number = 0, len: number = vos.length; i < len; i++) {
			var grid = self.createGrid();
			self.container.addChild(grid);

			grid.vo = vos[i];
			grid.isTip = self.isTip;
			grid.scaleX = grid.scaleY = self.scaleSize;
			self.grids.push(grid);
		}
		self.resize();
	}

	public createGrid(): any {
		if (this.type == 1) {
			return UITools.getFreeGrid();
		} else {
			return UITools.getFreeGrid2();
		}
	}

	public clean(): void {
		var self = this;
		for (var i: number = 0, len = self.grids.length; i < len; i++) {
			UITools.recycleItem(self.grids[i]);
			self.grids[i] = null;
		}
		self.grids.length = 0;
		self.data = null;
	}
}