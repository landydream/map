class Config {
	public constructor() {
	}


	public static mapCFG: Object = {};
	public static initMapping(): void {
		var mapping = this.mapCFG;
		//key是表名 value是自己定义的属性名称
		mapping["xitongkaiqi_100"] = "SYSTEM";
		mapping["vip_604"] = "VIP";
		mapping["zhandou_100"] = "BATTLE_CFG";

		mapping["shuxing_101"] = "Atrr_LIB";
		mapping["jingyan_101"] = "ROLE_EXP";
		mapping["daoju_601"] = "ITEM";
		mapping["zhuangbei_602"] = "EQUIP";
		mapping["zhuangbeijiancheng_602"] = "EQUIP_TYPE_NAME";
		mapping["fujiashuxing_client_602"] = "EQUIP_EXT";
		mapping["taozhuang_602"] = "EQUIP_SUIT";
		mapping["guangbo_002"] = "NOTICE";
		mapping["youjianbiao_001"] = "MAIL";
		mapping["guaiqia_105"] = "GUANQIABOSS";
		mapping["gqditu_105"] = "MAP";
		mapping["NPC_105"] = "NPC";
		mapping["monster_105"] = "MOSTER";
		mapping["gaodu_605"] = "RIDE_HEIGHT";
		mapping["zuoqipifujihuo_605"] = "RIDE_SKIN";
		mapping["zuoqijinjie_605"] = "RIDE_CULTURE";
		mapping["zuoqijinengjihuo_605"] = "RIDE_SKILL_ACTIVE";
		mapping["zuoqijinengshegnji_605"] = "RIDE_SKILL";
		mapping["jineng_102"] = "SKILL";
		mapping["xiaohao_103"] = "SKILLCOST";

		mapping["qianghua_104"] = "QIANGHUA";
		mapping["baoshi_104"] = "BAOSHI";
		mapping["jinglian_104"] = "JINGLIAN";
		mapping["duanlian_104"] = "ZHULING";
		mapping["qhtz_104"] = "QHMASTER";
		mapping["bstz_104"] = "BSMASTER";
		mapping["jltz_104"] = "JLMASTER";
		mapping["dltz_104"] = "ZLMASTER";
		mapping["chibangbgjinjie_617"] = "WING_CULTURE";
		mapping["chibangpifu_617"] = "WING_SKIN";
		mapping["chibangjinengjihuo_617"] = "WING_SKILL_ACTIVE";
		mapping["chibangjinengshegnji_617"] = "WING_SKILL";
		mapping["shenbingjinjie_615"] = "SHENBING_CULTURE";
		mapping["shenbingpifujihuo_615"] = "SHENBING_SKIN";
		mapping["shenbingjinengjihuo_615"] = "SHENBING_SKILL_ACTIVE";
		mapping["shenbingjinengshegnji_605"] = "SHENBING_SKILL";
		mapping["shenbingmoxing_615"] = "SHENBING_MODEL";
		mapping["tianxianjinjie_616"] = "TIANXIAN_CULTURE";
		mapping["tianxianfujihuo_616"] = "TIANXIAN_SKIN";
		mapping["tianxianjihuo_616"] = "TIANXIAN_SKILL_ACTIVE";
		mapping["tianxianjinengshegnji_605"] = "TIANXIAN_SKILL";
		mapping["fazhenjinjie_607"] = "FAZHEN_CULTURE";
		mapping["fazhenjinengjihuo_607"] = "FAZHEN_SKILL_ACTIVE";
		mapping["fazhenjinengshegnji_607"] = "FAZHEN_SKILL";
		mapping["xianweijinjie_608"] = "XIANWEI_CULTURE";
		mapping["xianweijinengjihuo_608"] = "XIANWEI_SKILL_ACTIVE";
		mapping["xianweijinengshegnji_608"] = "XIANWEI_SKILL";
		mapping["tonglingjinjie_613"] = "TONGLING_CULTURE";
		mapping["tonglingjinengjihuo_613"] = "TONGLING_SKILL_ACTIVE";
		mapping["tonglingjinengshegnji_613"] = "TONGLING_SKILL";
		mapping["shouhunjinjie_614"] = "SOUL_CULTURE";
		mapping["shouhunjinengjihuo_614"] = "SOUL_SKILL_ACTIVE";
		mapping["shouhunjinengshegnji_614"] = "SOUL_SKILL";

		mapping["banghuijichu_004"] = "GANG_CONST";
		mapping["bhjn_112"] = "GANG_SKILL";
		mapping["jnsx_112"] = "GANG_SKILL_MAX";
		mapping["bhjx_004"] = "GANG_DONATE";
		mapping["banghuishangxiang_110"] = "GANG_SHANGXIANG";
		mapping["banghuixhz_110"] = "GANG_SHANGXIANG_REW";
		mapping["renwu_113"] = "GANG_ACT_TASK";
		mapping["mrjl_113"] = "GANG_ACT_DAILY";
		mapping["huoyue_113"] = "GANG_ACT_UP";
		mapping["rwjl_115"] = "GANG_TASK_REWARD";

		mapping["cailiaofuben_109"] = "MATERIALFB";
		mapping["clsd_109"] = "MATERIALFB_SHOP";
		mapping["bhsg_115"] = "GANG_DUIHUAN";

		mapping["xiannvjihuo_606"] = "XIANLV_ACTIVE";
		mapping["xianlvjinjie_605"] = "XIANLV_CULTURE";
		mapping["xianlvshengxing_606"] = "XIANLV_STAR";
		mapping["xianlvqiyuan_606"] = "XIANLV_QIYUAN";

		mapping["gerenboss_106"] = "PERSONALBOSS";
		mapping["quanminBOSS_107"] = "QMBOSS";

		mapping["gerensd_106"] = "PERSONALSHOP";
		mapping["qmsd_107"] = "QMSHOP";
		mapping["qiangdao_116"] = "GANG_QIANGDAO";

		mapping["sdb_100"] = "SYSSHOP";
		mapping["husong_006"] = "PAOBIAO";
		mapping["husonghx_006"] = "PAOBIAO_SHUAXIN";

		mapping["zudui_108"] = "TEAMFB";

		mapping["shizhuang_610"] = "FASHION";
		mapping["chenhao_609"] = "TITLE";

		mapping["chongwujihuo_611"] = "PET_ACTIVE";
		mapping["chongwushengji_611"] = "PET_UPGRADE";
		mapping["jinengsuoding_611"] = "PET_SKILL_LOCK";
		mapping["jinengxingxingxing_611"] = "PET_SKILL_NUM";

		mapping["lgwb_117"] = "LGWB";
		mapping["xyxx_117"] = "LGWB_STAR";
		mapping["dntg_119"] = "HEAVEN";
		mapping["mbjl_119"] = "HEAVEN_TARGET";

		mapping["dyt_118"] = "DAYANTA";
		mapping["zbsd_118"] = "DAYANTA_EQUIP_SHOP";
		mapping["fenjie_118"] = "DAYANTA_EQUIP_FENJIE";
		mapping["qjlj_005"] = "FULI_SIGNIN_LEIJI";
		mapping["qdjl_005"] = "FULI_SIGNIN_DAY";

		mapping["kejutm_007"] = "KEJUTM";
		mapping["kejujl_007"] = "KEJUREWARD";
		mapping["fenjie_118"] = "DAYANTA_EQUIP_FENJIE";
		mapping["qjlj_005"] = "FULI_SIGNIN_LEIJI";
		mapping["qdjl_005"] = "FULI_SIGNIN_DAY";
		mapping["fenjie_118"] = "DAYANTA_EQUIP_FENJIE";
		mapping["fenjie_118"] = "DAYANTA_EQUIP_FENJIE";
		mapping["qjlj_005"] = "FULI_SIGNIN_LEIJI";
		mapping["qdjl_005"] = "FULI_SIGNIN_DAY";
		mapping["djlb_005"] = "FULI_LEVELGIFT";
		mapping["taozhuang_123"] = "CULTURE_SUIT";
		mapping["zhongdaoboss_618"] = "DAILY_ZHONGKUI";
		mapping["zhongdaojiangli_618"] = "DAILY_ZHONGKUI_AWARD";
		mapping["zuduijiangli_618"] = "DAILY_TEAM_AWARD";
		mapping["sanbaijiangli_618"] = "DAILY_300_ROUND";
		mapping["lilianrenwu_618"] = "DAILY_LILIAN";
		mapping["lilianshengji_618"] = "DAILY_LILIAN_LEVEL";
		mapping["liliantupian_618"] = "DAILY_LILIAN_IMAGE";
		mapping["chongzhi_621"] = "RECHARGE";
		mapping["shiyuanchongzhi_622"] = "RECHARGE_TEN_GOLD";
		mapping["denglusongyuanbao_623"] = "LOGIN_SEND";

		mapping["ltbw_120"] = "ARENA";
		mapping["ltcs_120"] = "ARENA_BUYNUM";

		mapping["leixing_124"] = "ACTIVITY";
		mapping["jinjie_124"] = "ACT_CULTURE";
		mapping["ljcz_124"] = "ACT_LJCZ";
		mapping["bhfb_111"] = "GANG_FUBEN";
		mapping["qmjj_124"] = "ACT_QMCULTURE";
		mapping["zksd_124"] = "ACT_ZKSHOP";
		mapping["tjsd_124"] = "ACT_TJSHOP";
		mapping["jjph_124"] = "ACT_CULTURERANK";
		mapping["qmcj_124"] = "ACT_ALLLEVEL";
		mapping["mrmb_124"] = "ACT_DAILYTARGET";

		mapping["sdfl_200"] = "ACT_CHRISTMAS_WELFARE";
		mapping["shegndandenglu_638"] = "ACT_CHRISTMAS_LOGIN";
		mapping["shengdanchongzhi_639"] = "ACT_CHRISTMAS_RECHARGE";

		mapping["bhfb_111"] = "GANG_FUBEN";
		mapping["shouchong_125"] = "FIRSTPAY_SC";
		mapping["czjj_127"] = "FIRSTPAY_JJ";
		mapping["tzjh_128"] = "FIRSTPAY_TZ";

		mapping["zsyj_126"] = "ZHISHENGYIJIE";
		mapping["sctg_124"] = "ACT_SCTG";
		mapping["mrshc_625"] = "ACT_MRSC";
		mapping["jingmai_624"] = "JINGMAI";
		mapping["jiehun_008"] = "MARRY";
		mapping["lijin_008"] = "MARRY_LIJIN";
		mapping["fangwu_009"] = "HOUSE";
		mapping["lemh_129"] = "MONKEY";
		mapping["chushi_010"] = "CHUSHI_AWARD";
		mapping["shiturw_010"] = "SHITU_QUEST";

		mapping["tiannvjinjie_626"] = "TIANNV_CULTURE";
		mapping["tiannvpifu_626"] = "TIANNV_SKIN";
		mapping["tiannvjinengshegnji_626"] = "TIANNV_SKILL";
		mapping["tiannvjinengjihuo_626"] = "TIANNV_SKILL_ACTIVE";
		mapping["xianqijinjie_627"] = "TIANNV_XIANQI";
		mapping["huanianjinjie_628"] = "TIANNV_HUANIAN";
		mapping["lingqijinjie_629"] = "TIANNV_LINGQI";
		mapping["ssj_130"] = "SHENGSIJIE";

		mapping["fabao_620"] = "FABAO";
		mapping["fabaozaowei_620"] = "FABAOOPEN";
		mapping["fabaojijinengshengji_620"] = "FABAO_SKILL";
		mapping["fabaoshengji_620"] = "FABAO_UP";
		mapping["fabaofenjie_620"] = "FABAO_FENJIE";
		mapping["fabaodazao_620"] = "FABAO_DAZAO";

		mapping["feisubiaosheng_630"] = "VIP_QUICK_UP";
		mapping["xinshou_131"] = "TASK";
		mapping["gnyg_131"] = "YUGAO";
		mapping["qixuegaodu_600"] = "QXGD";
		mapping["xianshizhsh_611"] = "XUNBAO_SHOW";
		mapping["chongwuzizhi_633"] = "PET_ZIZHI";

		mapping["shuohua_105"] = "MONSTER_TALK";
		mapping["xiaoguai_115"] = "GANG_MONSTER";

		mapping["buff_103"] = "BUFF";

		mapping["gonggao_005"] = "GAMENOTICE";

		mapping["ywBOSS_132"] = "YWBOSS";
		mapping["xyfl_134"] = "XYFL";

		mapping["szsj_011"] = "GODEQUIP_LEVEL";
		mapping["szgn_011"] = "GODEQUIP_GONGMING";
		mapping["szjpsx_011"] = "GODEQUIP_PRO";
		mapping["fenjie_011"] = "GODEQUIP_FENJIE";

		mapping["jinrihaoli_635"] = "TODAY_HAOLI";

		mapping["kuafuzhankuang_634"] = "KF_ORE";
		mapping["kuangdian_634"] = "KF_ORE_POS";
		mapping["paimingjiangli_634"] = "KUAFU_RANK";
		mapping["leichonghuikui_636"] = "PAYTOTALRET";
		mapping["zhuanpanzhsh_637"] = "XUNBAO_ZHUANPAN_SHOW";
		mapping["zhuanpanshouchou_637"] = "XUNBAO_ZHUANPAN_FIRST";

		mapping["bangqu_136"] = "KF_TIANXIA_BANG";
		mapping["yazhu_136"] = "KF_TIANXIA_BET";
		mapping["xfph_201"] = "CONSUME_RANK";
		mapping["pmjl_012"] = "TOURNAMENT_RANK";
		mapping["jfmb_012"] = "TOURNAMENT_JFGOAL";
		mapping["bwds_012"] = "TOURNAMENT_GUANQIA";
		mapping["kjy_140"] = "QUICK_CHAT";

		mapping["smsd_202"] = "ACT_SM_SHOP";
		mapping["hfAct_142"] = "HEFU_ACT";

		mapping["hfdl_203"] = "HEFU_LOGIN";
		mapping["qmlt_205"] = "HEFU_LEITAI";

		mapping["hfzb_142"] = "HEFU_CROSS_Z8PM";
		mapping["hfbw_142"] = "HEFU_CORSS_B5JF";
		mapping["hftz_143"] = "HEFU_INVEST";
		mapping["hfsd_144"] = "HEFU_SHOP";
		mapping["yuandandenglu_638"] = "YUANDAN_LOGIN";

		mapping["czph_204"] = "HF_CZPH";
		mapping["hfcz_207"] = "HEFU_CZ";
		mapping["ttjh_206"] = "TU_TENG_JIHUO";
		mapping["tutengshengji_206"] = "TU_TENG_UPLEVEL";
		mapping["tttssx_206"] = "TU_TENG_TUPO";
		mapping["tutengbaoji_206"] = "TU_TENG_BAOJILV";
		mapping["leijibaoji_206"] = "TU_TENG_BAOJI_SUM";


		mapping["zhengbaijifen_642"] = "KFZB_ALLZONE_RANK";
		mapping["wulinpaiming_642"] = "BWDS_ALLZONE_RANK";

		mapping["mlph_209"] = "CHARM_RANK";
		mapping["xcjz_201"] = "NEWYEAR_JIZI";
		mapping["ysq_641"] = "YASUIQIAN";
		mapping["hbgg_641"] = "RedPacketGG";

		mapping["dbchz_645"] = "WINTER_DAY_DBCZ";

		mapping["paimingjiangli_640"] = "KFBOSS_RANKREW";
		mapping["bosshuafen_640"] = "KFBOSS_BOSS";
		mapping["bosssuijijiangli_640"] = "KFBOSS_RANDOM";

		mapping["xchxy_641"] = "YEARWISH";
		mapping["xyshj_641"] = "YEARWISH_TIME";

		mapping["addl_208"] = "LOVEGIFT";
		mapping["shenchonglaixi_646"] = "SUPERPET_COME";

		mapping["nianshouid_642"] = "NIAN_BOSS_ID";
		mapping["nianshoujiangli_642"] = "NIAN_BOSS_AWARD";
		mapping["xzhjl_644"] = "ASSIST_FB";

		mapping["jjcj_211"] = "CHENGJIU_JINJIE";

		mapping["sczp_145"] = "PETZHUANPAN";
		mapping["212_jh"] = "PET_FLYUP_PIFU";
		mapping["212_sj"] = "PET_FLYUP_STEP";
	}

	public static setResConfig() {
		var mapping = this.mapCFG;
		for (var key in mapping) {
			var clz = mapping[key];
			var res = RES.getRes(key + "_json");
			Config[clz] = res;
			RES.destroyRes(key + "_json");
		}
		this.mapCFG = null;
		RES.destroyRes("config_yq");
	}

	public static initConfig(object) {
		var mapping = this.mapCFG;
		for (var key in object) {
			var clz = mapping[key];
			if (clz) {
				Config[clz] = object[key];
			}
		}
		this.mapCFG = null;
	}
	/**角色属性*/public static Atrr_LIB;
	/**升级经验*/public static ROLE_EXP;
	/**道具*/public static ITEM;
	/**装备*/public static EQUIP;
	/**装备类型简称*/public static EQUIP_TYPE_NAME;
	/**装备附加属性*/public static EQUIP_EXT;
	/**装备套装*/public static EQUIP_SUIT;
     /**系统 */public static SYSTEM;
	/**广播*/public static NOTICE;
	/**邮件*/public static MAIL;
	/**锻造 */
	public static QIANGHUA;
	public static BAOSHI;
	public static ZHULING; //注灵是锻炼
	public static JINGLIAN;
	public static QHMASTER; //强化大师
	public static JLMASTER;
	public static ZLMASTER;
	public static BSMASTER;
	/**vip*/public static VIP;
	/**商店 */public static SHOP;
    /**关卡怪物 */public static GUANQIABOSS;
	/**地图 */public static MAP;
	/**npc表 */public static NPC;
	/**怪物表 */public static MOSTER;
	/**坐骑偏移高度*/public static RIDE_HEIGHT;
	/**坐骑皮肤*/public static RIDE_SKIN;
	/**坐骑进阶*/public static RIDE_CULTURE;
	/**坐骑技能激活*/public static RIDE_SKILL_ACTIVE;
	/**坐骑技能升级*/public static RIDE_SKILL;
    /**神器*/public static SHENQI;
	/**帮会等级配置*/public static GANG_CONST;
	/**帮会技能*/public static GANG_SKILL;
	/**帮会技能上限*/public static GANG_SKILL_MAX;
	public static GANG_DONATE;
	public static GANG_SHANGXIANG;
	public static GANG_SHANGXIANG_REW;
	public static GANG_ACT_TASK;
	public static GANG_ACT_UP;
	public static GANG_ACT_DAILY;
	public static GANG_QIANGDAO;
	public static GANG_FUBEN;
	public static GANG_TASK_REWARD;

	/**人物技能*/public static SKILL;
	/**技能消耗*/public static SKILLCOST;
	public static BATTLE_CFG;
	//翅膀
	public static WING_CULTURE;
	public static WING_SKIN;
	public static WING_SKILL_ACTIVE;
	public static WING_SKILL;
	//神兵
	public static SHENBING_CULTURE;
	public static SHENBING_SKIN;
	public static SHENBING_SKILL_ACTIVE;
	public static SHENBING_SKILL;
	public static SHENBING_MODEL;
	//天仙
	public static TIANXIAN_CULTURE;
	public static TIANXIAN_SKIN;
	public static TIANXIAN_SKILL_ACTIVE;
	public static TIANXIAN_SKILL;
	//兑换消耗
	public static GANG_DUIHUAN;
	//材料副本
	/** 材料副本 */
	public static MATERIALFB;
	/** 材料副本商店 */
	public static MATERIALFB_SHOP;
	//仙侣
	public static XIANLV_ACTIVE;
	public static XIANLV_CULTURE;
	public static XIANLV_STAR;
	public static XIANLV_QIYUAN;

	public static PERSONALBOSS;
	public static QMBOSS;
	public static PERSONALSHOP;
	public static QMSHOP;
	public static SYSSHOP;
	/** 组队副本 */
	public static TEAMFB;
	//法阵
	public static FAZHEN_CULTURE;
	public static FAZHEN_SKILL_ACTIVE;
	public static FAZHEN_SKILL;
	//仙位
	public static XIANWEI_CULTURE;
	public static XIANWEI_SKILL_ACTIVE;
	public static XIANWEI_SKILL;
	//时装
	public static FASHION;
	//称号
	public static TITLE;

	//通灵
	public static TONGLING_CULTURE;
	public static TONGLING_SKILL_ACTIVE;
	public static TONGLING_SKILL;
	//兽魂
	public static SOUL_CULTURE;
	public static SOUL_SKILL_ACTIVE;
	public static SOUL_SKILL;
	//跑镖
	public static PAOBIAO;
	public static PAOBIAO_SHUAXIN;
	//宠物
	public static PET_ACTIVE;
	public static PET_UPGRADE;
	public static PET_SKILL_LOCK;
	public static PET_SKILL_NUM;
	public static PET_ZIZHI;

	/**龙王宝藏 */
	public static LGWB;
	/**龙王宝藏星星 */
	public static LGWB_STAR;
	/**天庭试炼 */
	public static HEAVEN;
	/**天庭试炼目标奖励 */
	public static HEAVEN_TARGET;
	//小雷音
	public static DAYANTA;
	public static DAYANTA_EQUIP_SHOP;
	public static DAYANTA_EQUIP_FENJIE;
	//擂台战
	public static ARENA;
	public static ARENA_BUYNUM;
	public static ARENA_NPC;
	//福利大厅
	public static FULI_SIGNIN_LEIJI;
	public static FULI_SIGNIN_DAY;
	//科举
	public static KEJUTM;
	public static KEJUREWARD;

	public static FULI_LEVELGIFT;
	/**套装 */
	public static CULTURE_SUIT;

	/**日常任务-钟馗伏魔 */
	public static DAILY_ZHONGKUI;
	/**日常任务-钟馗伏魔奖励 */
	public static DAILY_ZHONGKUI_AWARD;
	/**日常任务-组队奖励 */
	public static DAILY_TEAM_AWARD;
	/**日常任务-每日300 */
	public static DAILY_300_ROUND;
	/**日常任务-西游历练 */
	public static DAILY_LILIAN;
	/**日常任务-西游历练升级 */
	public static DAILY_LILIAN_LEVEL;
	/**日常任务-西游图片 */
	public static DAILY_LILIAN_IMAGE;
	/**充值表 */
	public static RECHARGE;
	/**10元充值 */
	public static RECHARGE_TEN_GOLD;
	/**登录送元宝 */
	public static LOGIN_SEND;

	public static ACTIVITY;//活动类型表
	public static ACT_CULTURE;//进阶活动
	public static ACT_LJCZ;//累计充值
	public static ACT_QMCULTURE;//全民进阶
	public static ACT_ZKSHOP;//折扣商店
	public static ACT_CULTURERANK;//进阶排行
	public static ACT_ALLLEVEL;//全民冲级
	public static ACT_DAILYTARGET;//每日目标
	public static ACT_TJSHOP;//特价商店
	/**首冲 */
	public static FIRSTPAY_SC;
	public static FIRSTPAY_JJ;
	public static FIRSTPAY_TZ;

	public static ZHISHENGYIJIE;

	public static ACT_SCTG;//首充团购
	public static ACT_MRSC;//每日首充

	public static JINGMAI;//经脉
	public static MARRY;//结婚
	public static MARRY_LIJIN;//礼金
	public static HOUSE;//房屋
	public static CHUSHI_AWARD;//出师奖励
	public static SHITU_QUEST;//师徒任务

	public static MONKEY;//六耳猕猴

	public static FABAOOPEN;//法宝开启	
	public static FABAO_UP;//法宝槽位升级	
	public static FABAO;//法宝	
	public static FABAO_SKILL;//法宝技能
	public static FABAO_FENJIE;//法宝分解				
	public static FABAO_DAZAO;//法宝打造					

	//天女
	public static TIANNV_CULTURE;
	public static TIANNV_SKIN;
	public static TIANNV_SKILL;
	public static TIANNV_SKILL_ACTIVE;
	public static TIANNV_XIANQI;
	public static TIANNV_HUANIAN;
	public static TIANNV_LINGQI;
	//生死劫
	public static SHENGSIJIE;
	//vip飙升
	public static VIP_QUICK_UP;
	/**新手任务 */
	public static TASK;
	public static YUGAO;//预告

	public static QXGD; //气血高度

	//寻宝
	public static XUNBAO_SHOW;
	//怪物说话
	public static MONSTER_TALK;
	//帮会小怪
	public static GANG_MONSTER;

	public static BUFF;

	public static GAMENOTICE;
	//野外boss
	public static YWBOSS;

	public static XYFL;

	//神装升级
	public static GODEQUIP_LEVEL;
	//神装共鸣
	public static GODEQUIP_GONGMING;
	//神装极品属性
	public static GODEQUIP_PRO;
	//神装极品属性
	public static GODEQUIP_FENJIE;

	//今日豪礼
	public static TODAY_HAOLI;
	//圣诞节消费排行
	public static CONSUME_RANK;

	//元旦登录表
	public static YUANDAN_LOGIN;

	//跨服争霸
	public static KF_ORE;
	public static KF_ORE_POS;//矿点位置
	public static KUAFU_RANK;//排名奖励	

	//累充回馈
	public static PAYTOTALRET;
	//寻宝转盘
	public static XUNBAO_ZHUANPAN_SHOW;
	public static XUNBAO_ZHUANPAN_FIRST;

	/**服战 天下问鼎*/
	public static KF_TIANXIA_BANG;
	public static KF_TIANXIA_BET;
	public static ACT_CHRISTMAS_WELFARE;
	public static ACT_CHRISTMAS_LOGIN;
	public static ACT_CHRISTMAS_RECHARGE;
	//比武大赛
	public static TOURNAMENT_RANK;
	public static TOURNAMENT_JFGOAL;
	public static TOURNAMENT_GUANQIA;
	//快捷聊天
	public static QUICK_CHAT;
	/**神秘商店 */
	public static ACT_SM_SHOP;
	/**合服活动类型 */
	public static HEFU_ACT;
	/** 合服登录 */
	public static HEFU_LOGIN;
	/** 全民擂台 */
	public static HEFU_LEITAI;

	/**跨服争霸排名目标表 */
	public static HEFU_CROSS_Z8PM;
	/**比武大会积分目标表 */
	public static HEFU_CORSS_B5JF;
	/**合服投资表 */
	public static HEFU_INVEST;
	/**合服商店 */
	public static HEFU_SHOP;
	/**合服充值排行 */
	public static HF_CZPH;
	public static HEFU_CZ;

	/** 图腾系统 */
	public static TU_TENG_JIHUO;
	public static TU_TENG_UPLEVEL;
	public static TU_TENG_TUPO;
	public static TU_TENG_BAOJILV;
	public static TU_TENG_BAOJI_SUM;

	/**跨服争霸全服排名表 */
	public static KFZB_ALLZONE_RANK;
	/**比武大赛全服排名表 */
	public static BWDS_ALLZONE_RANK;

	/**新春活动——魅力排行——新春集字 */
	public static CHARM_RANK;
	public static NEWYEAR_JIZI;
	/**压岁钱*/
	public static YASUIQIAN;
	/**红包滚滚*/
	public static RedPacketGG;

	/**单笔充值*/
	public static WINTER_DAY_DBCZ;
	/**跨服boss */
	public static KFBOSS_RANKREW;
	public static KFBOSS_BOSS;
	public static KFBOSS_RANDOM;
	/**新年许愿 */
	public static YEARWISH;
	public static YEARWISH_TIME;
	/**爱的大礼 */
	public static LOVEGIFT;
	/**神寵來襲 */
	public static SUPERPET_COME;

	/**年兽ID表 */
	public static NIAN_BOSS_ID;
	/**年兽奖励表 */
	public static NIAN_BOSS_AWARD;
	/**协助奖励 */
	public static ASSIST_FB;

	/***211 成就进阶 */
	public static CHENGJIU_JINJIE;
	/**宠物飞升(1皮肤,2升阶) */
	public static PET_FLYUP_PIFU;
	public static PET_FLYUP_STEP;

	public static PETZHUANPAN;

}