class Vo_Item implements IGridImpl {
	public constructor() {
	}

	sid: number;
    id: number;
    quality: number;
    count: number = 1;
    cfg: any;
    type: number;
    useType: number;
    name: string;
    gType: number;
    level: number;
    size:number;

    public initLib(id: number): void {
		this.gType = Enum_Attr.ITEM;
        this.cfg = Config.ITEM[id];
        if(DEBUG) {
            if(this.cfg == null) {
                throw("发财了！有可扫码了！没有道具" + id);
            }
        }
        this.id = this.cfg.id;
        this.quality = this.cfg.quality;
        this.name = this.cfg.name;
        this.type = this.cfg.leixing;
        this.useType = this.cfg.fangshi;
        this.level = this.cfg.level;
    }

    get canUse(): boolean {
        if (this.useType != 0) {
            return true;
        }
        return false;
    }

    get qColor(): number {
        return Color.QUALITYCOLOR[this.quality];
    }

    public static create(id: number): Vo_Item {
        var vo: Vo_Item = new Vo_Item();
        vo.initLib(id);
        return vo;
    }
}