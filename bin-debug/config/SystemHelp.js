var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// CFG_OpenSystem
var SystemHelp = (function () {
    function SystemHelp() {
    }
    /**功能是否开启
     * id 系统id
     * isMsg 未开启时是否提示
    */
    SystemHelp.isOpen = function (id, isMsg, arg) {
        if (isMsg === void 0) { isMsg = false; }
        var cfg = Config.SYSTEM[id];
        if (!SystemHelp.otherCondition(id, cfg, isMsg, arg))
            return;
        if (!cfg) {
            return true;
            // if (isMsg)
            // 	ViewCommonWarn.text(id + "在系统表里没有");
            // bo = false;
        }
        else {
            var page = cfg.page;
            if (page && page != "0" && arg != null) {
                if (typeof arg == "string" || typeof arg == "number") {
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
            if (cfg.vip && cfg.vip <= Model_player.voMine.viplv) {
                return true;
            }
            if (!this.isOpenByLev(id, isMsg)) {
                return false;
            }
        }
        return true;
    };
    /**判断是否开启 */
    SystemHelp.isOpenByLev = function (id, isMsg) {
        if (isMsg === void 0) { isMsg = false; }
        var cfg = Config.SYSTEM[id];
        if (!cfg) {
            return true;
        }
        return true;
    };
    //特殊判断
    SystemHelp.otherCondition = function (id, cfg, isMsg, arg) {
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
    };
    /**获取功能名称 */
    SystemHelp.getFunName = function (id) {
        if (Config.SYSTEM[id]) {
            return Config.SYSTEM[id].name;
        }
        return "";
    };
    SystemHelp.getOpenLevel = function (id) {
        var cfg = Config.SYSTEM[id];
        if (!cfg) {
            return 0;
        }
        return cfg.oplv;
    };
    /**打开某个连接 "类型,系统id,页码",例如1,1001,1
     * 打开活动界面 "类型,大活动类型,小活动类型,期数",例如：2,1,30,1
     * isMsg 默认true
    */
    SystemHelp.openView = function (link, isMsg) {
        if (isMsg === void 0) { isMsg = true; }
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
    };
    Object.defineProperty(SystemHelp, "browser", {
        /**浏览器信息 */
        get: function () {
            if (!this._browser) {
                var u = navigator.userAgent;
                var versions = {
                    ie: u.indexOf('Trident') > -1,
                    opera: u.indexOf('Presto') > -1,
                    chrome: u.indexOf('AppleWebKit') > -1,
                    firefox: u.indexOf('Firefox') > -1,
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    iPhone: u.indexOf('iPhone') > -1,
                    iPad: u.indexOf('iPad') > -1,
                    webApp: u.indexOf('Safari') > -1,
                    /**pc端 */
                    isPC: true
                };
                if (versions.mobile || versions.ios || versions.android || versions.iPhone || versions.iPad) {
                    versions.isPC = false;
                }
                this._browser = versions;
            }
            else {
                versions = this._browser;
            }
            return versions;
        },
        enumerable: true,
        configurable: true
    });
    return SystemHelp;
}());
__reflect(SystemHelp.prototype, "SystemHelp");
//# sourceMappingURL=SystemHelp.js.map