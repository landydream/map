/**人物身上位置数据 */
class Vo_Pos {
	public constructor() {
	}
	/**位置 */
	public pos: number;
	/**位置装备数据 */
	public equip: Vo_Equip;
	/**强化表编号 */
	public strengthen: number = 0;
	/**精炼表编号 */
	public jingLian: number = 0;
	/**锻炼表编号 */
	public zhuLing: number = 0;
	/**宝石表编号 */
	public stone: number = 0;

	// public getPower():number {
	// 	var num = 0;
	// 	if(this.equip) {
	// 		num += this.equip.getPower(true);

	// 	}
	// 	return num;
	// }

	public static create(pos: number): Vo_Pos {
		var vo = new Vo_Pos();
		vo.pos = pos;
		return vo;
	}
}