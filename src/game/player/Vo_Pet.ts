class Vo_Pet {
	/**出战数据，第一位是出战，其他是备战 */
	public battle = [0, 0, 0];
	/**激活的宠物数据 */
	public list = {};

	public getVo(id: number): Vo_OnePet {
		return this.list[id];
	}
}

class Vo_OnePet {
	public id: number;
	/**名称 */
	public name: string;
	/**等级 */
	public level: number = 1;
	/**经验 */
	public exp: number = 0;
	/**资质等级 */
	public zizhi: number = 0;
	/**五行 [[五行类型, 五行等级]]*/
	public wuxing: any[] = [];
	/**洗练次数 */
	public refreshNum: number = 0;
	/**技能数据 [S:当前的技能id,S:洗练的技能id,B:是否锁定，1锁定] */
	public skill: any[];

	/**飞升等阶 */
	public flyLevel:number = 0;
	/**飞升经验 */
	public flyExp:number = 0;
	/***幻化状态 */
	public flyState:number = 0;

	public init(id: number) {
		this.id = id;
		var cfg = Config.PET_ACTIVE[id];
		this.name = cfg.mz;
		this.wuxing = ConfigHelp.splitIntArr(cfg.wx);
		this.skill = [];
		var list: string[] = cfg.jn.split(",");
		for (var i = 0, len = list.length; i < len; i++) {
			this.skill.push([parseInt(list[i]), 0, 0]);
		}
	}
}