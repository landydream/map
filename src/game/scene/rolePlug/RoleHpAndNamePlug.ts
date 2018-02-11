class RoleHpAndNamePlug {
	public tag = "RoleHpAndNamePlug";
	
	public static POOL = [];
	public static isSelf: boolean;
	public static create(isSelf: boolean = true): RoleHpAndNamePlug {
		RoleHpAndNamePlug.isSelf = isSelf;
		return RoleHpAndNamePlug.POOL.length ? RoleHpAndNamePlug.POOL.pop() : new RoleHpAndNamePlug();
	}

	public constructor() {
		this.lbName = new eui.Label();
		this.lbName.size = 14;
		this.lbName.stroke = 1;
		this.lbName.textColor = 0xdddddd;
		this.hpbg = new eui.Image();
		this.hpbar = new eui.Image();
	}
	
	public role: SceneCharRole;

	public lbName: eui.Label;

	public hpbg: eui.Image;
	public hpbar: eui.Image;

	public hptype = 0;

	/**显示选项掩码
	 * &1 显示气血
	 * &2 显示名称
	 */
	public optionbit = 1;

	public update() {
	}

	public onAdd() {
		var self = this;
		if (self.optionbit & 1) {
			if (self.hptype == 0) {
				if (RoleHpAndNamePlug.isSelf)
					self.hpbar.source = "COMMON1_json.SBM_LoadingBG1";
				else
					self.hpbar.source = "COMMON1_json.SBM_LoadingBG2";
				self.hpbg.source = "COMMON1_json.SBM_LoadingBG";
				self.hpbar.width = 80;
				self.hpbar.height = 5;
				self.hpbar.x = -40;
				self.hpbar.y = -10;
				self.hpbar.scale9Grid = new egret.Rectangle(1, 1, 6, 9);
				self.hpbg.width = 84;
				self.hpbg.height = 10;
				self.hpbg.x = -42.5;
				self.hpbg.y = -13;
				self.hpbg.scale9Grid = new egret.Rectangle(2, 2, 15, 13);
			}
			self.role.headGroup.addChild(self.hpbg);
			self.role.headGroup.addChild(self.hpbar);
			//self.hpbar.scaleX = self.role.curhp / self.role.maxhp;

			self.role.headGroup.addChild(self.lbName);
		}
		if (self.optionbit & 2) {
			self.lbName.text = self.role.name;
			self.lbName.x = - ((self.lbName.textWidth / 2) >> 0);
			self.lbName.y = -30;
		}
	}

	public onRemove() {
		var self = this;
		if (self.optionbit & 1) {
			self.role.headGroup.removeChild(self.hpbg);
			self.role.headGroup.removeChild(self.hpbar);
		}
		if(self.optionbit & 2) {
			self.role.headGroup.removeChild(self.lbName);
		}
	}

	public onEvent(evt, arg) {
		var self = this;
		// if (self.optionbit & 1 && evt == EVT_SC.EVT_HURT) {
		// 	self.hpbar.scaleX = self.role.curhp / self.role.maxhp;
		// }
	}
}