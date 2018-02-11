class Model_GlobalMsg extends BaseModel {

	public static MSG_GLOBAL_SERVER_TIME_UPDATE: string = "MSG_GLOBAL_SERVER_TIME_UPDATE";
	/**有红点更新 参数[图标类型]*/
	public static MSG_NOTICE_UPDATE = "MSG_NOTICE_UPDATE";
	/**特殊红点更新 参数[图标类型]*/
	public static MSG_SPECIAL_NOTICE_UPDATE = "MSG_SPECIAL_NOTICE_UPDATE";
	/**有活动图标更新 参数[活动界面id,活动子界面id,红点id,活动剩余时间:大于0-活动倒计时 等于0-活动结束 小于0-无倒计时] */
	public static MSG_ACTIVITY_UPDATE = "MSG_ACTIVITY_UPDATE";


	public static serverTime: number;
	public static serverTimeZone: number;
	public static updateTime: number;
	/**开服时间, 是毫秒 */
	public static kaiFuTime: number;
	public static serverVersion: string; //后端版本号

	/**界面红点 */
	public static noticeMap = {};

	/**获取是否有红点提示 id=NoticeConst红点表id */
	public static getNotice(id: number): boolean {
		if (this.noticeMap[id] > 0) {
			return true;
		}
		return false;
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(252, this.GC_GLOBAL_SERVER_TIME, this);
		mgr.regHand(254, this.GC_GLOBAL_SERVER_NOTICE, this);
		mgr.regHand(256, this.GC_GLOBAL_SERVER_MSG, this);
		mgr.regHand(258, this.GC_GLOBAL_KAI_FU_TIME_MSG, this);
		mgr.regHand(260, this.GC_GLOBAL_SERVER_PROMPT, this);
		mgr.regHand(270, this.GC_RED_NOTICE, this);
		mgr.regHand(272, this.GC_Global_isred_272, this);

	}

	/**251 CG申请同步服务器时间**/
	public CG_GLOBAL_SERVER_TIME(): void {
		var bates = this.getBytes();
		this.sendSocket(251, bates);
	}

	//252 L-U GC发送服务器当前时间 L:当前服务器时间戳U:当前服务器时区
	public GC_GLOBAL_SERVER_TIME(self: Model_GlobalMsg, data: BaseBytes): void {
		Model_GlobalMsg.updateTime = egret.getTimer();
		Model_GlobalMsg.serverTime = data.readLong();
		var str = data.readUTF();
		var time = str.substr(3, 3); 
		Model_GlobalMsg.serverTimeZone = parseInt(time);
		// var str = model_
		//var c = DateHelp.getYMDHMS(Model_GlobalMsg.serverTime/1000);
		GameGlobal.control.notify(Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE);
	}

	/**
	 * 服务器时间 毫秒
	 */
	public static getServerTime(): number {
		var time = egret.getTimer() + Model_GlobalMsg.serverTime - Model_GlobalMsg.updateTime;
		return time;
	}

	//254 B-I-I-I GC个人事件提示 B:0 使用 1 获得 I:属性类型I:物品系统IDI:提示数量或角色id
	public GC_GLOBAL_SERVER_NOTICE(self: Model_GlobalMsg, data: BaseBytes): void {
		var oper: number = data.readByte();
		var type: number = data.readInt();
		var id: number = data.readInt();
		var hidOrNum: number = data.readLong();

		var msg: string = null;
		if (oper == 1) {
			//msg = ConfigHelp.getAttrName(type) + "  +" + hidOrNum;
			//var color: number = Color.QUALITYCOLOR[Config.Atrr_LIB[type].color];
			// ViewCommonWarn.textItem(type, id, hidOrNum);
		} else {
			msg = "未知个人事件提示：" + oper;
		}
	}

	/**256 S-I GC全局消息和提示 S:消息类型 1等级不够进行此操作2系统已屏蔽I:标识 消息标识(功能id)*/
	public GC_GLOBAL_SERVER_MSG(self: Model_GlobalMsg, data: BaseBytes): void {
		var type: number = data.readShort();
		var funID: number = data.readInt();
		var msg: string = null;
		if (type == 1) {
			if (SystemHelp.isOpen(funID, true) == false) {
				msg = "等级不够进行此操作"; //进入此处可能是系统开启表没有同步
			}
		} else if (type == 2) {
			msg = "系统已屏蔽";
		} else if(type == 3) {
			View_Alert.show("充值暂时关闭，请稍后再试", null, View_Alert.OK);
			return;
		}else {
			msg = "未知个全局消息和提示：type = " + type;
		}

		// if (msg) {
		// 	ViewCommonWarn.text(msg);
		// }
	}

	/**258 L 开服时间*/
	public GC_GLOBAL_KAI_FU_TIME_MSG(self: Model_GlobalMsg, data: BaseBytes): void {
		var arg1 = data.readLong();
		Model_GlobalMsg.kaiFuTime = arg1 * 1000;
	}

	/**
	 * 260 B-U GC后端返回提示字符串 B:1系统提示2GM热更U:内容 
	 */
	public GC_GLOBAL_SERVER_PROMPT(self: Model_GlobalMsg, data: BaseBytes): void {
		var type = data.readByte();
		var content = data.readUTF();
		if (type == 1) {
			// ViewCommonWarn.text(content);
		} else if (type == 2) {
			// ViewCommonWarn.text(content);
		} else if (type == 3) {
			Model_GlobalMsg.serverVersion = content;
		}
	}
	/**
	 * 270	[I-B] GC通知红点状态 [I:图标类型idB:0没红点1红点]图标红点状态 
	 */
	public GC_RED_NOTICE(self: Model_GlobalMsg, data: BaseBytes): void {
		var list = [];
		let len = data.readShort();
		for (var i = 0; i < len; i++) {
			let k = data.readInt();
			let b = data.readByte();
			if (Model_GlobalMsg.noticeMap[k] != b) {
				list.push(k);
			}
			Model_GlobalMsg.noticeMap[k] = b;
		}
		GameGlobal.control.notify(Model_GlobalMsg.MSG_NOTICE_UPDATE, list);
	}
	/**271 I 某个系统是否红点 I:系统红点类型type*/
	public CG_Global_isred_271(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(271, bates);
	}
	
	/**272 I-B 个别特殊系统是否显示红点 I:系统红点类型typeB:1：有红点red*/
	public GC_Global_isred_272(self: Model_GlobalMsg, data: BaseBytes): void {
		let arg1 = data.readInt();
		let arg2 = data.readByte();
		
		Model_GlobalMsg.noticeMap[arg1] = arg2;
		GameGlobal.control.notify(Model_GlobalMsg.MSG_SPECIAL_NOTICE_UPDATE,arg1);
	}

	// public static getKaiFuDay(): number {
	// 	let time = DateHelp.getBetweenDays(Model_GlobalMsg.getServerTime(), Model_GlobalMsg.kaiFuTime);
	// 	time += 1;
	// 	return time;
	// }

}