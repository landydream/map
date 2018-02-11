class Parts extends egret.Sprite {

	public list: Array<Part> = [];
	public dic: any = {};
	public len: number = 0;

	public _needSort: boolean = false;

	public static P_SHADOW: number = -3;
	public static P_GH: number = -2;
	public static P_WEAPON_DOWN = 1;
	public static P_BODY: number = 2;
	public static P_WEAPON: number = 3;
	public static P_WING: number = 4;
	public static P_HORSE: number = 5;
	public static P_HORSE_HEAD: number = 6;
	public static P_TX:number = 9;
	public static P_TITLE: number = 10;
	public static P_BUFF: number = 11;

	public static D_PART_LIST = [Parts.P_HORSE, Parts.P_WING, Parts.P_BODY, Parts.P_WEAPON, Parts.P_HORSE_HEAD];
	public static U_PART_LIST = [Parts.P_HORSE, Parts.P_WEAPON_DOWN, Parts.P_BODY, Parts.P_WEAPON, Parts.P_WING];

	public static DIS_REAPEAT: number = 0;
	public static DIS_ONCE: number = 1;

	public ptype: number = 0;

	public constructor() {
		super();
	}

	public _perc: number = 0;
	public set perc(v: number) {
		this._perc = v;
		var list = this.list;
		var len = list.length;

		if (this.ptype == Parts.DIS_REAPEAT) {
			if (v >= 1) {
				v = v - (v >> 0);
				if (v >= 1) {
					v = 0.999;
				}
			}
		} else {
			if (v >= 1) {
				v = 0.999;
			}
		}

		for (var i = 0; i < len; i++) {
			var p: Part = list[i];
			p.setPec(v);
		}
	}

	public get perc(): number {
		return this._perc;
	}

	public addPart(p: Part) {
		if (p.parts != this) {
			p.parts = this;
			this.list.push(p);
			this._needSort = true;
			this.len++;

			this.dic[p.type] = p;
			this.addChild(p.view);
		}
	}

	public removePart(p: Part) {
		var index = this.list.indexOf(p);
		if (index != -1) {
			this.list.splice(index, 1);
			delete this.dic[p.type];
			this.removeChild(p.view);
			p.dispose();
		}
	}

	public removePartByType(type) {
		var part = this.dic[type];
		if (part) {
			this.removePart(part);
		}
	}

	public isPartByType(type) {
		if (this.dic[type]) {
			return true;
		}
		return false;
	}

	public setPart(type: number, arg: any) {
		var p: Part = this.dic[type];
		if (p) {
			p.setVal(arg);
		}
	}

	public sort() {
		var list = this.list;
		var len = list.length;
		list.sort(this.dSortFunc);
		for (var i = 0; i < len; i++) {
			var p: Part = list[i];
			var oldindex = this.getChildIndex(p.view);
			if (oldindex != -1 && oldindex != i) {
				this.setChildIndex(p.view, i);
			}
		}
	}

	protected dSortFunc(a: Part, b: Part): number {
		var ret: number = a.dep - b.dep;
		return ret;
	}

	public setVal(v: any) {
		var list = this.list;
		for (var i = list.length - 1; i >= 0; i--) {
			var p = list[i];
			p.setAct(v);
		}
	}

}