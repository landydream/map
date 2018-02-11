class Vo_JingMai {
	level = 1;
	star = 0;

	/**获取表里的序号 */
	public getId() {
		var id = this.level*1000 + this.star;
		return id;
	}
}