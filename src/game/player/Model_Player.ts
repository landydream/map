class Model_player extends BaseModel {

	public static voMine: Vo_Hero = new Vo_Hero();
	public playerDetailDic: any = {};

	/**登录初始化 */
	public static MSG_INIT_HERO: string = "MSG_INIT_HERO";
	/**角色属性更新包过所有属性 */
	public static MSG_UPDATE: string = "MSG_UPDATE";
	/**角色等级更新 */
	public static MSG_HERO_LEVEL: string = "MSG_HERO_LEVEL";
	/**角色货币更新，元宝、银两等货币类更新 */
	public static MSG_MONERY_UPDATE: string = "MSG_MONERY_UPDATE";
	/**部件外观更新 */
	public static MSG_PART_UPDATE: string = "MSG_PART_UPDATE";
	/**跟随变化 */
	public static MSG_SCENE_FOLLOW_UPDATE: string = "MSG_SCENE_FOLLOW_UPDATE";

	/**职业名称 */
	public static JobName = ["通用", "人族", "妖族", "仙族"];
	/**最大等级 */
	public static MAX_LEVEL = 300;

	public static playerDic = {};

	public constructor() {
		super();
		GameGlobal.control.listen(Model_player.MSG_SCENE_FOLLOW_UPDATE, this.updateFollow, this);
	}


	/**某个部件更新 */
	public setRolePart(vo: Vo_Player, type: number, val) { 
		vo.setParts(type, val);
		if (type == UnitConst.KEY_PET_ID || type == UnitConst.KEY_XIANLV_ID || type == UnitConst.KEY_PETFLY) {//跟随
			this.updateFollow(vo);
		} else if (type > UnitConst.KEY_TIANXIAN_ID) {//宠物或仙侣上的部件
			var key = [UnitConst.KEY_TONGLING, UnitConst.KEY_SOUL, UnitConst.KEY_FAZHEN, UnitConst.KEY_XIANWEI];
			var index = key.indexOf(type);
			if (index >= 0) {
				var role = vo.getCharRole(Math.floor(index / 2) + 1);
				if (role) {
					role.setPart(type, CultureHelp.getModel(0, val, vo.job, type));
					// role.setPart(type, CultureHelp.getPetModel(petID,val));
				}
			}
			
		}
	}

	public updateFollow(vo: Vo_Player = null): void {
		var key = [[UnitConst.KEY_PET_ID, UnitConst.KEY_TONGLING, UnitConst.KEY_SOUL,UnitConst.KEY_PETFLY], 
					[UnitConst.KEY_XIANLV_ID, UnitConst.KEY_FAZHEN, UnitConst.KEY_XIANWEI]];//部件id
					
		var type = [UnitConst.PET, UnitConst.TIANNV];//场景元素类型
		var pos = [UnitConst.POS_PET, UnitConst.POS_XIANNV];//保存的位置

		var voMine = vo;
		if (!vo) {
			voMine = Model_player.voMine;
		}
		var isHero = false;
		if (voMine.id == Model_player.voMine.id) {
			isHero = true;
		}

		var followRole: SceneCharRole[] = [voMine.getCharRole(UnitConst.POS_PALYER)];
		var mapScene: MapScene = GameGlobal.mapscene;

		for (var i = 0, len = key.length; i < len; i++) {
			var val = voMine.getPart(key[i][0]);
			var role: SceneCharRole = voMine.getCharRole(pos[i]);
			if (val) {//有跟随
				let fowP: FollowPathAccording;
				if (!role) {
					role = UnitManager.instance.createCharRole(type[i]);
					voMine.sceneChars[pos[i]] = role;
					role.setDir(2);
					role.forceType = isHero ? 1 : 2;
				} else {
					fowP = role.getPlugByTag("FollowPathAccording");
				}
				role.setCharVis(!followRole[0].pauseRender);
				mapScene.addUnit(role);
				var petID; 
				if(i==0){
					petID= voMine.getPart(UnitConst.KEY_PETFLY);	
					role.setBody(CultureHelp.getPetModel(petID>0?petID:val,  petID>0?1:0));
				}
				else
					role.setBody(CultureHelp.getModel(0, val, voMine.job, key[i][0]));
				if (!fowP) {
					fowP = new FollowPathAccording();
					// fowP.ftar = followRole[followRole.length - 1];
				} else {
					role.removPlugByTag("FollowPathAccording");
				}
				role.addPlugOnly(fowP);
				fowP.tar = role;
				fowP.ftar = followRole[followRole.length - 1];
				followRole.push(role);
				for (var j = 1, len1 = key[i].length; j < len1; j++) {
					val = voMine.getPart(key[i][j]);
					if (val) {
						role.setPart(key[i][j], CultureHelp.getModel(0, val, voMine.job, key[i][j]));
					} else {
						role.setPart(key[i][j], 0);
					}
				}
			} else {//下阵
				if (role) {
					mapScene.removeUnit(role);
					delete voMine.sceneChars[pos[i]];
				}
			}
		}
	}

	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(108, this.scPlayerDetail, this);
		wsm.regHand(110, this.GC_HeroAttr, this);
		wsm.regHand(120, this.scHeroAttrUpdate, this);
		wsm.regHand(122, this.GC_Hero_getNewPart_122, this);
		wsm.regHand(124, this.GC_Hero_putOnPart_124, this);
		wsm.regHand(132, this.GC_Hero_askSceneHeros_132, this);
		wsm.regHand(136, this.GC_Hero_viewHero_136, this);
		wsm.regHand(146, this.GC_Hero_levelUp_146, this);
	}

	/**登录首先初始化 108 */
	public scPlayerDetail(self: Model_player, bytes: BaseBytes): void {
		//hero基础信息
		var vo = Model_player.voMine;
		// vo.parseDetail(bytes);
		vo.createTestData();

		//军团id
		vo.gangId = bytes.readLong();
		vo.gangName = bytes.readUTF();

		//系统设置信息
		let len = bytes.readShort();
		for (let i = 0; i < len; i++) {
			let arg17 = bytes.readByte();
			let arg18 = bytes.readByte();
		}
		var arg19 = bytes.readByte();

		vo.isMarry = bytes.readByte();

		var mapScene: MapScene = GameGlobal.mapscene;
		var hero: SceneCharRole = vo.getCharRole(0);
		if (!hero) {
			hero = SceneCharRole.create();
			hero.charType = UnitConst.PLAYER;
			hero.forceType = 1;
			hero.scene = mapScene;
			mapScene.hero = hero;
			mapScene.addUnit(hero);
		}

		self.updateRoleInfoByVo(hero, vo);
		GameGlobal.control.notify(Model_player.MSG_INIT_HERO);
	}


	/**初始战斗属性 110 */
	public GC_HeroAttr(self: Model_player, bytes: BaseBytes): void {
		var vo = Model_player.voMine;
		vo.parseAttr(bytes);
		GameGlobal.control.notify(Model_player.MSG_UPDATE);
	}

	public GC_DEL_NPC(self: Model_player, bytes: BaseBytes): void {

	}

	public GC_ADD_NPC(self: Model_player, bytes: BaseBytes): void {
		//UnitManager.instance.createNPC({ id: 123 });
	}

	/**CMD120协议 玩家属性更新*/
	public scHeroAttrUpdate(self: Model_player, bytes: BaseBytes) {
		var jsonstr = bytes.readUTF();
		var content = JSON.parse(jsonstr);
		var isImportChange: number = 0;
		var vomine = Model_player.voMine;

		for (var k in content) {
			switch (k) {
				case Enum_Attr.yinLiang.toString()://银两
					vomine.silver = content[k];
					isImportChange |= 1;
					break;
				case Enum_Attr.yuanBao.toString()://元宝
					vomine.gold = content[k];
					isImportChange |= 1;
					break;
				case Enum_Attr.bindYuanBao.toString()://绑定元宝
					vomine.bindGold = content[k];
					isImportChange |= 1;
					break;
				case Enum_Attr.LEVEL.toString()://等级
					if (vomine.level != content[k]) {
						isImportChange |= 2;
					}
					vomine.level = content[k];
					break;
				case Enum_Attr.EXP.toString()://经验
					vomine.exp = content[k];
					isImportChange |= 1;
					break;
				case Enum_Attr.POWER.toString():
					vomine.str = content[k];
					isImportChange |= 4;
					break;
				case Enum_Attr.JINGITE.toString():
				case Enum_Attr.XUANTIE.toString():
				case Enum_Attr.SHENTIE.toString():
				case Enum_Attr.ZHUGUO.toString():
				case Enum_Attr.PANTAO.toString():
				case Enum_Attr.RENSHENGUO.toString():
					vomine.currencyInfo[k] = content[k]; //其他货币更新
					isImportChange |= 1;
					break;
				case Enum_Attr.GONGXUN.toString():  //功勋
					vomine.currencyInfo[k] = content[k]; //其他货币更新
					isImportChange |= 1;
					break;
				case Enum_Attr.WEIWANG.toString():  //威望
					vomine.currencyInfo[k] = content[k]; //其他货币更新
					isImportChange |= 1;
					break;
				default://战斗属性
					vomine.voAttr.setAttr(parseInt(k), parseInt(content[k]));
					isImportChange |= 8;
					break;
			}
		}
		if (isImportChange) {
			GameGlobal.control.notify(Model_player.MSG_UPDATE);
		}
		if (isImportChange & 1) {
			GameGlobal.control.notify(Model_player.MSG_MONERY_UPDATE);
		}
		if (isImportChange & 2) {
			GameGlobal.control.notify(Model_player.MSG_HERO_LEVEL);
		}
		if (isImportChange & 4) {//战力更新

		}
	}
	/**122 B-I GC 提示获得新的部件外观 B:部件外观类型typeI:外观对于值value*/
	public GC_Hero_getNewPart_122(self: Model_player, data: BaseBytes): void {
		let arg1 = data.readByte();
		let arg2 = data.readInt();
		self.setRolePart(Model_player.voMine, arg1, arg2);
		GameGlobal.control.notify(Model_player.MSG_PART_UPDATE);

		var funId = CultureHelp.getPartFunId(arg1);

	}
	/**123 B-I CG 幻化部件外观 B:外观部件类型typeI:对于的值value*/
	public CG_Hero_putOnPart_123(arg1, arg2): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		bates.writeInt(arg2);
		this.sendSocket(123, bates);
	}

	/**124 B-B-I GC 幻化返回 B:成功失败标识resultB:部件类型typeI:对于部件值value*/
	public GC_Hero_putOnPart_124(self: Model_player, data: BaseBytes): void {
		let arg1 = data.readByte();
		let arg2 = data.readByte();
		let arg3 = data.readInt();
		if (arg1 == 0) {
			self.setRolePart(Model_player.voMine, arg2, arg3);
			GameGlobal.control.notify(Model_player.MSG_PART_UPDATE);
		}
	}

	/**135 L CG查看角色 L:角色idid*/
	public CG_Hero_viewHero_135(arg1): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(135, bates);
	}

	/**131  请求附近玩家数据 */
	public CG_Hero_askSceneHeros_131(): void {
		var bates = this.getBytes();
		this.sendSocket(131, bates);
	}

	/**132 [L-U-B-B-U-[B-I]]-B 请求场景附近玩家数据 [L:玩家idU:名字B:职业B:性别U:帮会名字[B:keyI:对应外观id]外观数据]玩家数据data*/
	public GC_Hero_askSceneHeros_132(self: Model_player, data: BaseBytes): void {
		let len = data.readShort();
		var pList = [];
		for (let i = 0; i < len; i++) {
			var vo: Vo_Player = new Vo_Player();
			vo.id = data.readLong();
			vo.name = data.readUTF();
			vo.job = data.readByte();
			vo.sex = data.readByte();
			vo.gangName = data.readUTF();
			vo.partsData = {};
			let len1 = data.readShort();
			for (let i = 0; i < len1; i++) {
				let arg6 = data.readByte();
				let arg7 = data.readInt();
				vo.partsData[arg6] = arg7;
			}

			pList.push(vo);
		}

		var type = data.readByte();

		if (type == 1) {
			GameGlobal.control.notify(Enum_MsgType.MSG_PLAYER_LIST, pList);
		} else {
			GameGlobal.control.notify(Enum_MsgType.MSG_PLAYER_LIST, pList);
		}
	}

	/**136 L-U-U-B-B-S-L-B-B-B-B-[B-I] GC返回角色数据 L:角色ididU:角色名nameU:帮会名gnameB:职业jobB:性别sexS:等级levelL:战力strengthB:vip等级vipB:月卡状态cardB:是否关注gzB:是否拉黑bad[B:外观类型I:外观id]外显模型show*/
	public GC_Hero_viewHero_136(self: Model_player, data: BaseBytes): void {
		var vo = new Vo_OtherPlayer();
		vo.time = Model_GlobalMsg.getServerTime();
		let arg1 = data.readLong();
		let arg2 = data.readUTF();
		let arg3 = data.readUTF();
		let arg4 = data.readByte();
		let arg5 = data.readByte();
		let arg6 = data.readShort();
		let arg7 = data.readLong();
		let arg8 = data.readByte();
		let arg9 = data.readByte();
		let arg10 = data.readByte();
		let arg11 = data.readByte();
		let name = data.readUTF();
		let isWife = data.readByte();
		vo.id = arg1;
		vo.name = arg2;
		vo.gangName = arg3;
		vo.job = arg4;
		vo.sex = arg5;
		vo.level = arg6;
		vo.str = arg7;
		vo.viplv = arg8;
		vo.monthCard = arg9;
		vo.isFrend = arg10;
		vo.isBlack = arg11;
		vo.fereName = name;
		vo.isWife = isWife;
		vo.partsData = {};
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg12 = data.readByte();
			let arg13 = data.readInt();
			vo.partsData[arg12] = arg13;
		}

		Model_player.playerDic[vo.id] = vo;
		GameGlobal.layerMgr.open(UIConst.ROLE_DETAIL, vo);
	}

	/**145  GC 提升等级 */
	public CG_Hero_levelUp_145(): void {
		var bates = this.getBytes();
		this.sendSocket(145, bates);
	}

	/**146 B GC 提升等级结果 B:0成功 1失败result*/
	public GC_Hero_levelUp_146(self: Model_player, data: BaseBytes): void {
		let arg1 = data.readByte();
		if (arg1 == 0) {

		} else {

		}
	}

	public updateRoleInfoByVo(p: SceneCharRole, vo: Vo_Player): void {
		p.id = vo.id;
		var rideing = vo.getParts(UnitConst.KEY_HORSE) > 0;
		// p.setBody(GameGlobal.modelFashion.getFashionModel(vo.getParts(UnitConst.KEY_BODY), vo.sex, vo.job, rideing));
		p.setBody(1000);
		p.setHorse(CultureHelp.getModel(UIConst.RIDE, vo.getParts(UnitConst.KEY_HORSE)));
		p.setWing(CultureHelp.getModel(UIConst.WING, vo.getParts(UnitConst.KEY_WING)));
		if (rideing) p.setWeapon(CultureHelp.getModel(UIConst.SHENBING, vo.getParts(UnitConst.KEY_WEAPON), vo.job, -1, vo.sex));
		p.setTianXian(CultureHelp.getModel(UIConst.TIANXIAN, vo.getParts(UnitConst.KEY_TIANXIAN_ID), vo.job));
		p.setTitle(CultureHelp.getTitleSource(vo.getParts(UnitConst.KEY_TITLE)));
		p.setName(vo.name);
		p.setDir(3);
		p.updateWay();
		vo.sceneChars[0] = p;
		GameGlobal.modelPlayer.updateFollow(vo);
	}
	/**
	 * 只显示人物 坐骑 称号 武器
	 */
	public updateRoleSomeInfoByVo(p: SceneCharRole, vo: Vo_Player) {
		var rideing = vo.getParts(UnitConst.KEY_HORSE) > 0;
		// p.setBody(GameGlobal.modelFashion.getFashionModel(vo.getParts(UnitConst.KEY_BODY), vo.sex, vo.job, rideing));
		p.setBody(1000);
		if (rideing) p.setWeapon(CultureHelp.getModel(UIConst.SHENBING, vo.getParts(UnitConst.KEY_WEAPON), vo.job, -1, vo.sex));
		p.setHorse(CultureHelp.getModel(UIConst.RIDE, vo.getParts(UnitConst.KEY_HORSE)));
		p.setName(vo.name);
		p.updateWay();
	}

	/**根据商店类型更新玩家单个货币 */
	public updateOtherCoin(shopType: number, value: number): void {
		let vomine = Model_player.voMine;
		let type = 0;
		switch (shopType) {

		}

		if (type != 0) {
			if (vomine.currencyInfo[type] == null || vomine.currencyInfo[type] != value) {
				vomine.currencyInfo[type] = value; //其他货币更新
				GameGlobal.control.notify(Model_player.MSG_MONERY_UPDATE);
			}
		}
	}


}