// CFG_OpenSystem
class SystemHelp {
	public constructor() {
	}
	/**功能是否开启 
	 * id 系统id
	 * isMsg 未开启时是否提示
	*/
	public static isOpen(id: number, isMsg: boolean = false, arg?: any): boolean {
		let cfg = Config.SYSTEM[id];
		if (!SystemHelp.otherCondition(id, cfg, isMsg, arg))
			return;
		if (!cfg) {
			return true;
			// if (isMsg)
			// 	ViewCommonWarn.text(id + "在系统表里没有");
			// bo = false;
		} else {
			var page = cfg.page;
			if (page && page != "0" && arg != null) {
				if (typeof arg == "string" || typeof arg == "number") {//判断子系统
					if (Number(arg) > 1000) {
						return this.isOpen(Number(arg), isMsg);
					}
					var list = page.split(",");
					if (list[arg]) {
						return this.isOpen(parseInt(list[arg]), isMsg);
					}
				}
			}
			//有些系统是VIP或者等级达到条件就可以开启
			if (cfg.vip && cfg.vip <= Model_player.voMine.viplv) {//vip等级开启
				return true;
			}
			if (!this.isOpenByLev(id, isMsg)) {
				return false;
			}
		}
		return true;
	}

	/**判断是否开启 */
	public static isOpenByLev(id: number, isMsg = false) {
		let cfg = Config.SYSTEM[id];
		if (!cfg) {
			return true;
		}
		return true;
	}
	//特殊判断
	public static otherCondition(id: number, cfg: any, isMsg: boolean, arg): boolean {


		// if (id == UIConst.DAYANTA_SHOP_MAIN || id == UIConst.DAYANTA_EQUIP_SHOP || id == UIConst.DAYANTA_FULI_SHOP) {  //雷音寺商店 
		// 	if (!Model_Gang.vo || Model_Gang.vo.gangID == 0) {
		// 		return SystemHelp.isOpen(UIConst.DAYANTA, isMsg);
		// 	}
		// }

		// if (id == UIConst.GANGSHOP_1 || id == UIConst.GANGSHOP_2) {  //兼容 帮会商店 帮会福利
		// 	if (!Model_Gang.vo || Model_Gang.vo.gangID == 0) {
		// 		if (isMsg)
		// 			ViewCommonWarn.text("请先加入帮会");
		// 		return false;
		// 	}
		// }

		// if (id == UIConst.SYSTEM_SHOP) {
		// 	if (arg == Model_SysShop.TYPE_GANGSHOP || arg == Model_SysShop.TYPE_GANGWELF) {  //帮会商店 帮会福利
		// 		if (!Model_Gang.vo || Model_Gang.vo.gangID == 0) {
		// 			if (isMsg)
		// 				ViewCommonWarn.text("请先加入帮会");
		// 			return false;
		// 		}
		// 	}

		// 	if (arg == Model_SysShop.TYPE_PAOBIAO) {
		// 		return SystemHelp.isOpen(UIConst.PAOBIAO, isMsg);
		// 	}

		// 	if (arg == Model_SysShop.TYPE_KEJU) {
		// 		return SystemHelp.isOpen(UIConst.ACTIVITY_HOME, isMsg);
		// 	}

		// 	if (arg == Model_SysShop.TYPE_ARENA_WELF || arg == Model_SysShop.TYPE_ARENA_SHOP) {
		// 		return SystemHelp.isOpen(UIConst.ARENA, isMsg);
		// 	}
		// }

		return true;
	}

	/**获取功能名称 */
	public static getFunName(id): string {
		if (Config.SYSTEM[id]) {
			return Config.SYSTEM[id].name;
		}
		return "";
	}

	public static getOpenLevel(id) {
		let cfg = Config.SYSTEM[id];
		if (!cfg) {
			return 0;
		}
		return cfg.oplv;
	}

	/**打开某个连接 "类型,系统id,页码",例如1,1001,1
	 * 打开活动界面 "类型,大活动类型,小活动类型,期数",例如：2,1,30,1
	 * isMsg 默认true
	*/
	public static openView(link: string, isMsg: boolean = true): boolean {
		if (typeof link != "string" || link == "0") {
			return false;
		}
		var str = link.split(",");
		var id = parseInt(str[1]);
		if (str[2]) {
			var type = parseInt(str[2]);
		}
		var bo = false;
		if (str[0] == "1") {
			bo = this.isOpen(id, isMsg, type);
			if (bo) {
				GameGlobal.layerMgr.open(id, type);
			}
		} 
		// else if (str[0] == "2") {
		// 	var vo = ActManager.getVO(id, type);
		// 	if (!vo) {
		// 		if (isMsg) {
		// 			ViewCommonWarn.text("活动暂未开启");
		// 		}
		// 		return false;
		// 	} else {
		// 		var cfg = vo.getCFG();
		// 		var level = Model_player.voMine.level;
		// 		if (cfg.dj > level) {
		// 			if (isMsg) {
		// 				ViewCommonWarn.text("需" + cfg.dj + "级才开启此活动");
		// 			}
		// 			return false;
		// 		}
		// 		// if(index != null) {
		// 		// }
		// 	}
		// 	Model_Activity.openAct(vo.id, vo.type);
		// }
		return bo;
	}

	protected static _browser;
	/**浏览器信息 */
	public static get browser() {
		if (!this._browser) {
			var u = navigator.userAgent;
			var versions = {
				ie: u.indexOf('Trident') > -1, //IE内核
				opera: u.indexOf('Presto') > -1, //opera内核
				chrome: u.indexOf('AppleWebKit') > -1, //谷歌内核
				firefox: u.indexOf('Firefox') > -1, //火狐内核Gecko
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android
				iPhone: u.indexOf('iPhone') > -1, //iPhone
				iPad: u.indexOf('iPad') > -1, //iPad
				webApp: u.indexOf('Safari') > -1, //Safari
				/**pc端 */
				isPC: true
			}
			if (versions.mobile || versions.ios || versions.android || versions.iPhone || versions.iPad) {
				versions.isPC = false;
			}
			this._browser = versions;
		} else {
			versions = this._browser;
		}
		return versions;
	}

}