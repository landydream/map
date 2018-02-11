class Vo_Hero extends Vo_Player {
	public constructor() {
		super();
	}

	/**元宝 */
	public gold: number;
	/**绑定元宝 */
	public bindGold: number;
	/**银两 */
	public silver: number;
	public currencyInfo = {}; //其他货币数据

	public parseDetail(bytes: BaseBytes) {
		var self = this;
		self.id = bytes.readLong();
		self.name = bytes.readUTF();
		self.level = bytes.readShort();
		self.exp = bytes.readLong();
		self.job = bytes.readByte();
		self.sex = bytes.readByte();
		self.gold = bytes.readLong();
		self.bindGold = bytes.readLong();
		self.silver = bytes.readLong();
		self.viplv = bytes.readByte();
		self.str = bytes.readLong();
		self.monthCard = bytes.readByte();
		var len = bytes.readShort();
		for (var i = 0; i < len; i++) {
			var type = bytes.readByte();
			var val = bytes.readInt();
			self.partsData[type] = val;
		}
	}

	public createTestData():void{
		var self = this;
		self.id = 111;
		self.name = '测试2';
		self.level = 10;
		self.exp = 0;
		self.job = 1;
		self.sex = 1;
		self.gold = 0;
		self.bindGold = 0;
		self.silver = 0;
		self.viplv = 0;
		self.str = 0;
		self.monthCard = 0;
	}



	/**根据类型获取货币数量 */
	public getMoney(type: number): number {
		var num = 0;
		if (type == Enum_Attr.yuanBao) {
			num = this.gold;
		} else if (type == Enum_Attr.bindYuanBao) {
			num = this.gold + this.bindGold;
		} else if (type == Enum_Attr.yinLiang) {
			num = this.silver;
		} else {
			if (this.currencyInfo[type]) {
				num = this.currencyInfo[type];
			}
		}

		return num;
	}

}