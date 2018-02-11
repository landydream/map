/**装备额外数据 */
class Vo_EquipEx {
	/**附加属性系数 */
	exRatio:number = 0;

	public static create():Vo_EquipEx {
		var vo = new Vo_EquipEx();
		return vo;
	}
}