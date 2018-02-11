class Formula {
	public constructor() {
	}

	public static caculateDmg(role,tar,skillPower):number {
		var fixed:number = Formula.getRestritionNumber(role.attackType,role.armorType);
		var rnd = Math.random() * 0.2 + 0.8;
		var ret = Math.ceil( ((role.level*0.4 + 2) * skillPower) / (tar.armor * 0.02 + 2) * fixed * rnd);
		return ret;
	}

	public static getRestritionNumber(attackType:number, armorType):number {
		var ret = 1;
		if(attackType == 1) {
			ret = 2;
		}else{
			ret = 1;
		}
		return ret;
	}
}