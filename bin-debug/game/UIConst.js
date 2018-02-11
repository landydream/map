var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIConst = (function () {
    function UIConst() {
    }
    UIConst.CREATEROLE = -1;
    UIConst.COMMONWARN = 1;
    /**主界面上方 */
    UIConst.TOP_UI = 10;
    /**主界面的头像 */
    UIConst.MAIN_HEAD = 11;
    /**主界面地图 */
    UIConst.MAIN_MAP = 12;
    /**主界面下方按钮 */
    UIConst.BOTTOM_UI = 13;
    /**左边按钮 */
    UIConst.LEFT_UI = 14;
    /**主界面活动图标 */
    UIConst.ACTIVITY_BTN_UI = 15;
    /**右边按钮 */
    UIConst.RIGHT_UI = 16;
    /**地图UI */
    UIConst.UI_MAP = 30;
    /**地图提示 */
    UIConst.UI_MAPALERT = 31;
    /**断开链接*/
    UIConst.OFFLINE = 40;
    /**协议界面 */
    UIConst.PROTOCOL = 80;
    /**机器人界面 */
    UIConst.ROBOT = 90;
    /**服务器信息弹框 */
    UIConst.SERVERALERT = 91;
    /**防沉迷 */
    UIConst.WALLOW = 98;
    UIConst.GM = 99;
    /** 连接提示 道具获取 材料获取 材料 */
    UIConst.GUIDEALERT = 100;
    /**提示 */
    UIConst.ALERT = 101;
    /**玩法提示 */
    UIConst.TIPS = 102;
    /**活动装备提示 */
    UIConst.EQUIP_ALERT = 103;
    /**战斗胜利界面 */
    UIConst.BOSS_RESULT_WIN = 110;
    /**战斗失败界面 */
    UIConst.BOSS_RESULT_LOST = 111;
    /**战斗控制 跳过设置速度 */
    UIConst.BATTLE_CONTROL = 112;
    /**战斗右上角描述 */
    UIConst.BATTLE_DES = 113;
    /**战斗进场动画 */
    UIConst.BATTLE_ENTER_MV = 114;
    /**购买弹框 */
    UIConst.BUYALERT = 120;
    /**系统设置 */
    UIConst.SYSTEM_SETTING = 130;
    /**速度设置*/
    UIConst.SYSTEM_SPEEDSET = 131;
    /**改名*/
    UIConst.SYSTEM_RENAME = 132;
    /**兑换银两*/
    UIConst.SYSTEM_EXSLIVER = 133;
    /**系统通用商店UI*/
    UIConst.SYSTEM_SHOP = 134;
    /**VIP */
    UIConst.VIP = 140;
    UIConst.VIPTVNOTICE = 141;
    UIConst.VIPTVREWARD = 142;
    /**任务 */
    UIConst.TASK_MAIN = 150;
    UIConst.ENTERGAME = 151;
    UIConst.YUGAO = 152;
    /**功能预告奖励 */
    UIConst.YUGAO_RD = 153;
    /**连接中央服 */
    UIConst.CONNECT_WORLD = 154;
    /**背包 */
    UIConst.BAG_PANEL = 1002;
    UIConst.BAG_EQUIP = 100201;
    UIConst.BAG_ITEM = 100202;
    UIConst.BAG_OPEN_GRID = 100203;
    /** 道具使用界面 */
    UIConst.BAG_USEITEM_ALERT = 100204;
    /** 道具礼包选择使用 */
    UIConst.BAG_CHOOSE_ITEM_ALERT = 100205;
    /** 道具TIPS */
    UIConst.ITEM_TIPS = 100206;
    /**装备TIPS */
    UIConst.EQUIP_TIPS = 100401;
    /**熔炼 */
    UIConst.RONGLIAN = 100207;
    /**熔炼选择 */
    UIConst.RONGLIAN_SELECT = 100208;
    /**角色 */
    UIConst.ROLE = 1001;
    UIConst.ROLE_ATTR = 100101;
    /**玩家详情 */
    UIConst.ROLE_DETAIL = 100102;
    UIConst.ROLE_EQUIP = 1004;
    /**装备套装 */
    UIConst.EQUIP_SUIT = 100402;
    /**聊天 */
    UIConst.CHAT = 1012;
    UIConst.FACE = 101201;
    UIConst.QUICK_CHAT = 101202;
    /**邮件 */
    UIConst.MAILPANEL = 1006;
    UIConst.MAILALERT_1 = 100601;
    /**锻造 */
    UIConst.FORGE = 2007;
    UIConst.FORGEQH = 1007;
    UIConst.FORGEJL = 1008;
    UIConst.FORGEZL = 1010;
    UIConst.FORGEBS = 1009;
    UIConst.FORGE_MASTER_TIPS = 100705;
    /**关卡 */
    UIConst.GUANQIA = 1014;
    UIConst.GUANQIA_ENTRY = 101401;
    UIConst.GUANQIA_RANK = 101402;
    UIConst.GUANQIA_CHAPREWARD = 101403;
    UIConst.GUANQIA_OFFLINE = 101404;
    UIConst.GUANGQIA_HELP = 101405;
    /**坐骑 */
    UIConst.RIDE = 1013;
    /**使用属性丹 */
    UIConst.CULTURE_USE_ATTRDRUG = 101301;
    /**进阶系统加成属性 */
    UIConst.CULTURE_ALLATTR = 101302;
    /**进阶技能界面 */
    UIConst.CULTURE_SKILL = 101303;
    UIConst.CULTURE_SKIN = 101304;
    /**获得新的皮肤提示 */
    UIConst.NEWPART_ALERT = 101305;
    /**军团 */
    UIConst.GANG = 1018;
    UIConst.GANGHOME = 1028;
    UIConst.GANGRENOTICE = 102800;
    UIConst.GANGAPPLY = 102801;
    UIConst.GANGRENAME = 102802;
    UIConst.GANGRENAME2 = 102803;
    UIConst.GANGDONATE = 102804;
    UIConst.GANGMEMBER = 102805;
    UIConst.GANGLIST = 102806;
    UIConst.GANGACT = 1033;
    UIConst.GANGACTTASK = 103301;
    UIConst.GANGACTDAILY = 103302;
    UIConst.GANGACTREW = 103303;
    UIConst.GANGSHOP = 1032;
    UIConst.GANGSHOP_1 = 103201; //商店
    UIConst.GANGSHOP_2 = 103202; //福利
    UIConst.GANGSHANGXIANG = 1029;
    UIConst.GANGSHANGXIANGREW = 102901;
    UIConst.GANGFUBEN = 1030;
    UIConst.GANGSKILL = 1031;
    UIConst.GANGJOIN = 101805;
    UIConst.GANGCREATE = 101806;
    UIConst.GANG_ICON_RET = 101850;
    UIConst.GANG_ICON_BOSS = 101851;
    UIConst.GANG_ICON_CALL = 101852;
    UIConst.GANG_ICON_SHOP = 101853;
    UIConst.GANG_TASK_INFO = 101854;
    UIConst.GANG_COLLECT = 101855;
    UIConst.GANG_SHOP = 101856;
    UIConst.GANG_CALL_NOTICE = 101857;
    UIConst.GANG_TASK_RESET = 101858;
    /**技能 */
    UIConst.SKILL = 1017;
    UIConst.SKILLSETTING = 101701; //技能配置
    /**翅膀 */
    UIConst.WING = 1023;
    /**天仙总界面 */
    UIConst.TIANXIAN_MAIN = 1035;
    /**神兵 */
    UIConst.SHENBING = 1024;
    /**天仙 */
    UIConst.TIANXIAN = 1025;
    /**仙侣的总图标 */
    UIConst.XIANLV_MAIN = 1036;
    /**仙侣 */
    UIConst.XIANLV = 1026;
    /**好友系统 */
    UIConst.FRIEND = 1005;
    /**私聊系统 */
    UIConst.PRIVATE_CHAT = 10005;
    UIConst.XIANLV_BATTLE = 102601;
    UIConst.XIANLV_QIYUAN = 102602;
    UIConst.XIANLV_SKILL = 102603;
    UIConst.XIANLV_DETAILS = 102604;
    UIConst.XIANLV_PET_ATTR = 102605;
    /**法阵 */
    UIConst.FAZHEN = 1039;
    /**仙位 */
    UIConst.XIANWEI = 1040;
    /**主城 */
    UIConst.MAIN_CITY = 1027;
    /**BOSS主界面 */
    UIConst.BOSS_MAIN = 2019;
    /**个人BOSS */
    UIConst.PERSONAL_BOSS = 1019;
    /**全民BOSS */
    UIConst.QM_BOSS = 1020;
    UIConst.QM_RANK = 102001;
    UIConst.QM_KILLRANK = 102002;
    UIConst.QM_BOSS_BATTLEINFO = 102003;
    UIConst.QM_BOSS_NOTICE = 102004;
    UIConst.QM_BOSS_BUYCOUNT = 102005;
    UIConst.QM_BOSS_NOTICETIPS = 102006;
    //public static BOSS_SHOP = 102050;
    /**跨服主界面 */
    UIConst.KUAFU_MAIN = 2021;
    /**组队BOSS */
    UIConst.TEAM_BOSS = 1021;
    /*副本 */
    UIConst.FB_MAIN = 2022;
    /*材料副本 */
    UIConst.MATERIAL_FB = 1022;
    /**活动大厅 */
    UIConst.ACTIVITY_HOME = 1037;
    /**跑镖 */
    UIConst.PAOBIAO = 1045;
    UIConst.PAOBIAO_HUSONG = 104501;
    UIConst.PAOBIAO_LOG = 104502;
    UIConst.PAOBIAO_REW = 104503;
    UIConst.PAOBIAO_FUCHOU = 104504;
    UIConst.PAOBIAO_LANJIE = 104505;
    UIConst.PAOBIAO_SHOP = 104506;
    /**称号 */
    UIConst.TITLE = 1015;
    /**时装 */
    UIConst.FASHION = 1016;
    /**查看称号或时装 */
    UIConst.SHAPE_CHECK = 10151016;
    /**宠物 */
    UIConst.PET_MAIN = 1041;
    UIConst.PET = 1042;
    UIConst.PET_TONGLING = 1043;
    UIConst.PET_SOUL = 1044;
    UIConst.PET_SKILL_REFRESH = 104201;
    UIConst.SKILL_TIP = 104202;
    UIConst.PET_RENAME = 104203;
    UIConst.PET_BATTLE = 104204;
    UIConst.PET_DETAILS = 104205;
    UIConst.PET_CHECKINFO = 104206;
    UIConst.PET_SHEN = 104207;
    UIConst.CATCH_PET_RESULT = 104208;
    UIConst.CATCH_PET_BATTLE = 104209;
    UIConst.PET_ZZ = 104210;
    UIConst.PET_SHAPE = 104211;
    UIConst.PET_SHAPE_MAIN = 104212;
    //宠物飞升
    UIConst.PET_FLYUP = 104213;
    UIConst.PET_FLYUP_UP = 104214;
    UIConst.PET_FLYUP_REC = 104215;
    UIConst.PET_FLYUP_DETAIL = 104216;
    //小雷音
    UIConst.DAYANTA = 1048;
    UIConst.DAYANTA_RANK = 104801;
    UIConst.DAYANTA_SHOP_MAIN = 104802;
    UIConst.DAYANTA_EQUIP_SHOP = 10480201;
    UIConst.DAYANTA_FULI_SHOP = 10480202;
    UIConst.DAYANTA_BUY_ALERT = 10480203;
    UIConst.GOLD_EQUIP_FENJIE = 10480204;
    //擂台
    UIConst.ARENA_MAIN = 1056;
    UIConst.ARENA = 1057;
    UIConst.ARENA_RANK = 105601;
    UIConst.ARENA_SHOP_MAIN = 105602;
    // public static ARENA_SHOP = 10560200;
    UIConst.ARENA_WELF = 10560201;
    UIConst.ARENA_LOG = 105603;
    UIConst.ARENA_RESULT = 105604;
    /**龙王宝藏 */
    UIConst.LONG_GONG_WA_BAO = 1047;
    /**龙王宝藏排行榜 */
    UIConst.LONG_GONG_WA_BAO_RANK = 104701;
    /**龙王宝藏星级奖励展示 */
    UIConst.LONG_GONG_WA_BAO_SHOW_AWARD = 104702;
    /**天庭试炼 */
    UIConst.HEAVEN = 1049;
    /**天庭试炼排行榜 */
    UIConst.HEAVEN_RANK = 104901;
    /**天庭试炼奖励展示 */
    UIConst.HEAVEN_SHOW_AWARD = 104902;
    /**天庭试炼扫荡奖励 */
    UIConst.HEAVEN_SHOW_SAODANG_AWARD = 104903;
    UIConst.FULI = 1050;
    UIConst.FULI_SIGNIN = 1051; //签到
    UIConst.FULI_LEVEL = 1052; //等级礼包
    UIConst.FULI_MONTHCARD = 1053; //月卡
    UIConst.FULI_CODE = 1054; //激活码
    UIConst.FULI_NOTICE = 1055; //公告
    UIConst.FULI_XIYOU = 1097; //西游福利
    UIConst.FULI_WEEKCARD = 1099; //周卡	
    UIConst.KEJU_MAIN = 1046; //答题面板
    UIConst.KEJU_ENTRY = 104601; //答题入口
    UIConst.KEJU_RESULT = 104602; //答题结果
    UIConst.KEJU_RANK = 104603; //答题排行
    UIConst.KEJU_SHOP = 104604; //答题商店	
    //套装
    UIConst.CULTURE_SUIT = 1058;
    /**日常活动 */
    UIConst.DAILY = 1059;
    /**钟馗伏魔 */
    UIConst.DAILY_ZHONGKUI = 1060;
    /**组队历练 */
    UIConst.DAILY_TEAM = 1061;
    /**每日300 */
    UIConst.DAILY_300ROUND = 1062;
    /**每日300 奖励展示 */
    UIConst.DAILY_300ROUND_AWARD = 106201;
    /**西游历练 */
    UIConst.DAILY_XIYOU = 1063;
    /**钟馗伏魔-boss */
    UIConst.DAILY_ZHONGKUI_BOSS = 110005;
    /**西游历练-找回经验 */
    UIConst.DAILY_XIYOU_FIND = 110006;
    /**充值 */
    UIConst.RECHARGE = 1065;
    /**10元充值 */
    UIConst.RECHARGE_TEN = 1067;
    /**登录送元宝 */
    UIConst.LOGIN_GIVE_GOLD = 1066;
    /**每日首充 */
    UIConst.DAYFIRSTRECHARGE = 1076;
    /**丹药 */
    UIConst.MEDICINE = 1074;
    //活动界面
    UIConst.ACTIVITY = 1069;
    UIConst.ACT_CULTURE = 106901; //进阶活动
    UIConst.ACT_CULTURE_RANK = 106902; //进阶排行
    UIConst.ACT_LJCZ = 106903; //累计充值
    UIConst.ACT_QM_CULTURE = 106904; //全民进阶
    UIConst.ACT_ZKSHOP = 106905; //折扣商店
    UIConst.ACT_SCTG = 106906; //首充团购
    UIConst.ACT_ALLLEVEL = 106907; //全民冲级
    UIConst.ACT_DAILYTARGET = 106908; //每日目标
    UIConst.ACT_MYSTERYSHOP = 106909; //神秘商店
    UIConst.ACT_SDDL = 106910; // 圣诞登录
    UIConst.ACT_SDFL = 106911; // 圣诞返利
    UIConst.ACT_SDCZ = 106912; // 圣诞充值
    UIConst.ACT_XFPH = 106913; //圣诞消费排行
    UIConst.ACT_XFPH_RANK = 106914; //圣诞消费排行榜
    UIConst.ACT_YDDL = 106915; //元旦登录
    UIConst.ACT_YDCZ = 106916; //元旦充值
    UIConst.ACT_YDFL = 106917; //元旦返利
    UIConst.ACT_IMGDES = 106918; //活动的图片描述类型
    UIConst.ACT_HBGG = 106941; //红包滚滚
    UIConst.ACT_SENDMONEY = 10694101; // 发红包面板
    UIConst.ACT_MONEY_DETAILS = 10694102; // 红包领取详情面板
    UIConst.ACT_NEWYEAR_MONEY = 106942; //压岁钱
    UIConst.NEWYEAR_JIZI = 106943; // 新春集字
    /**合服 */
    UIConst.ACT_HEFU_TOUZI = 106990; //合服投资
    UIConst.ACT_HEFU_SHOP = 106991; //合服商店
    UIConst.ACT_HEFU_WARCRAFT = 106992; //合服争霸
    UIConst.ACT_HF_LOGIN = 106993; //合服登录
    UIConst.ACT_HF_LEITAI = 106994; //合服擂台
    /**寒假活动 */
    UIConst.ACT_WINTER_DBCZ = 1069101; //单笔充值
    UIConst.CHARM_RANK = 1069102; //-魅力排行
    UIConst.CHARM_RANK_DETAIL = 106910201; //-魅力排行详情
    UIConst.CHARM_RANK_FLOWER = 106910202;
    //首冲 基金 投资
    UIConst.FIRSTPAYMAIN = 1073;
    UIConst.FIRSTPAY_SC = 1068;
    UIConst.FIRSTPAY_JJ = 1070;
    UIConst.FIRSTPAY_TZ = 1071;
    UIConst.ZHISHENGYIJIE = 1072; //直升一阶	
    UIConst.JINGMAI = 1075; //经脉
    //装扮商店
    UIConst.FASHIONSHOPMAIN = 1077;
    //public static FASHIONSHOP = 107701;
    //public static PETSHOP = 107704;
    //public static FRIENDSHOP = 107702;
    //public static SKINSHOP = 107703;
    //public static WEIWANGSHOP = 107705;
    //结婚
    UIConst.MARRY_PANEL = 1078;
    UIConst.YIYUAN = 1079;
    UIConst.YIYUAN_QIUHUN = 107901;
    UIConst.YIYUAN_QIUHUN_ALERT = 107902;
    UIConst.MARRY_RESULT = 107903;
    UIConst.MARRY_LIJIN = 107904;
    UIConst.HOUSE = 1080; //房屋
    UIConst.HOUSE_EXP = 108001;
    UIConst.HOUSE_ATTR = 108002;
    UIConst.HOUSE_ALERT = 108003;
    UIConst.SHITU = 1081; //师徒
    UIConst.SHITU_INVITE = 1081001; //师徒邀请
    UIConst.SHITU_SENDEXP = 1081002; //师徒传功
    UIConst.ACT_MONKEY = 1082; //六耳猕猴
    //天女
    UIConst.TIANNV_MAIN = 1083;
    UIConst.TIANNV = 1084;
    UIConst.TIANNV_SKILL = 108401;
    UIConst.XIANQI = 1085;
    UIConst.HUANIAN = 1086;
    UIConst.LINGQI = 1087;
    //法宝
    UIConst.FABAO_MAIN = 1088;
    UIConst.FABAO_SHOW = 108801;
    UIConst.FABAO_BAG = 108802;
    UIConst.FABAO_UP = 108803;
    UIConst.FABAO_PAGE = 108806;
    UIConst.FABAO_DAZAO = 108804;
    UIConst.FABAO_FENJIE = 108805;
    UIConst.FABAO_UP_DESC = 108807;
    UIConst.FABAO_TIPS = 108808;
    UIConst.FABAO_TUJIAN = 108809;
    UIConst.FABAO_ALERT = 108810;
    UIConst.SHENGSIJIE = 1089; //生死劫
    UIConst.SHENGSIJIE_TEAM = 108901;
    UIConst.SHENGSIJIE_OPENBOX = 108902;
    /**排行榜 */
    UIConst.RANK = 1090;
    UIConst.VIP_QUICK_UP = 9999;
    //寻宝
    UIConst.TREASURE = 1092;
    UIConst.XUNBAO = 1093;
    UIConst.XUNBAO_ZHUANPAN = 1103;
    UIConst.XUNBAO_ALERT = 109301;
    //野外boss
    UIConst.YW_BOSS = 1096;
    UIConst.YW_BOSS_ALERT = 109601;
    UIConst.YW_BOSS_HF_ALERT = 109602;
    //累充回馈
    UIConst.PAYTOTALRET = 1102;
    /**跨服争霸 */
    UIConst.KF_BATTLE = 1100;
    //神装
    UIConst.GOD_EQUIP = 1098;
    //神装升级
    UIConst.GOD_EQUIP_LEVEL_UP = 109801;
    //神装分解
    UIConst.GOD_EQUIP_XL = 109802;
    //神装分解
    UIConst.GOD_EQUIP_FENJIE = 109803;
    //神装共鸣tip
    UIConst.GOD_EQUIP_GONGMING_TIP = 109804;
    //每日豪礼
    UIConst.TODAY_HAOLI = 1101;
    /**场景中的UI */
    UIConst.KF_BATTLE_SCENE_UI = 110001;
    /**队伍列表*/
    UIConst.KF_BATTLE_TEAMLIST = 110002;
    /**队伍详情 */
    UIConst.KF_BATTLE_TEAMINFO = 110003;
    /**跨服活动开始提示进入 */
    UIConst.KF_ENTER_ALERT = 110004;
    /**跨服 服战 天下问鼎 */
    UIConst.KF_TIANXIA = 1105;
    UIConst.KF_TIANXIA_SIGNUP = 110501;
    UIConst.KF_TIANXIA_HAIXUAN = 110502;
    UIConst.KF_TIANXIA_MATCH = 110503;
    UIConst.KF_TIANXIA_BET = 110504;
    UIConst.KF_TIANXIA_REPORT = 110505;
    UIConst.ACTIVITY_OPEN_ALERT = 1000000;
    //比武
    UIConst.TOUR = 1104;
    UIConst.TOUR_BAT_CONFIRM = 110401;
    UIConst.TOUR_RANK = 110402;
    UIConst.TOUR_TIME = 110403;
    UIConst.TOUR_JF_GOAL = 110404;
    //跨服boss
    UIConst.KFBOSS_MAIN = 1114;
    UIConst.KFBOSS_REW = 111401;
    UIConst.KFBOSS_LAST = 111402;
    UIConst.KFBOSS_LIVETIME = 111403;
    UIConst.KFBOSS_SCENEMAIN = 111404;
    UIConst.KFBOSS_DEMRANK = 111405;
    UIConst.KFBOSS_COLLECT = 111406;
    //图腾系统
    UIConst.TUTENG_SYSTEM = 1118;
    UIConst.TUTENG_UPLEVEL = 1115;
    UIConst.TUTENG_DETAIL_VIEW = 111501;
    //跨服争霸排行榜
    UIConst.KFZB_RANK = 1116;
    //比武大赛排行榜
    UIConst.BWDS_RANK = 1117;
    //年兽活动页
    UIConst.NIAN_BOSS = 1119;
    //年兽挑战界面
    UIConst.NIAN_BOSS_FIGHT = 111901;
    UIConst.KFBOSS_PLAYERDT = 111407;
    UIConst.KFBOSS_HPANDHD = 111408;
    //许愿
    UIConst.YEARWISH = 1122;
    UIConst.YEARWISH_ALERT = 112201;
    UIConst.YEARWISH_RELATE = 112202;
    //爱的大礼
    UIConst.LOVEGIFT = 1120;
    //神宠来袭
    UIConst.SUPERPET_COME = 1125;
    //成就进阶
    UIConst.CHENGJIU_JINJIE = 1123;
    UIConst.CHENGJIU_JINJIE_LIST = [1013, 1023, 1024, 1025, 1039, 1040, 1043, 1044, 1084, 1085, 1086, 1087]; //成就集合
    //宠物转盘
    UIConst.PET_ZHUANPAN = 1124;
    UIConst.PET_ZHUANPAN_LOG = 112401;
    return UIConst;
}());
__reflect(UIConst.prototype, "UIConst");
//# sourceMappingURL=UIConst.js.map