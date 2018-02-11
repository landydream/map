class Vo_XianLv {
	public battle = [0, 0];
	public xianLv = {};

	public getVo(id: number): Vo_XianLvCulture {
		return this.xianLv[id]
	}
}

class Vo_XianLvCulture {
	public id: number;
	public lev: number = 1000;
	public star: number = 1;
	public exp: number = 0;
	public extExp: number = 0;

	public constructor(id: number) {
		this.id = id;
	}

	public getExp() {
		return this.exp + this.extExp;
	}
}