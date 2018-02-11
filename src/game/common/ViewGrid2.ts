class ViewGrid2 extends eui.ItemRenderer {

	public static create() {
		return new ViewGrid2();
	}

	public constructor() {
		super();

		// this.skinName = "resource/gameSkin/grid/ViewGrid2.exml";
	}

	public grid: ViewGrid;
	public lbName: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.lbName.textColor = Color.TEXTINT;
	}

	protected dataChanged(): void {
		super.dataChanged();
		var v: IGridImpl = this.data;
		this.grid.data = v;
		// if (v) {
		// 	if (v.gType == Enum_Attr.EQUIP) {
		// 		if (Model_Equip.isEquip((v as Vo_Equip).type)) {
		// 			this.lbName.text = "Lv." + (v as Vo_Equip).level;
		// 		}else{
		// 			this.lbName.text = Math.floor((v as Vo_Equip).level/1000) + "阶";
		// 		}
		// 	} else {
		// 		this.lbName.textFlow = HtmlUtil.HTMLPARSER.parse(ConfigHelp.getTextByQuality(v.name, v.quality));
		// 		// this.lbName.textColor = v.qColor;
		// 	}
		// } else {
		// 	this.lbName.text = "";
		// }
	}

	public set vo(v: IGridImpl) {
		this.data = v;
	}

	public get vo(): IGridImpl {
		if (this.grid) {
			return this.grid.vo;
		}
		return this.data;
	}

}