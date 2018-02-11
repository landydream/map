class UnitConst {
	public static PLAYER: number = 1; //玩家
	public static XIANNV: number = 2; //仙侣
	public static MONSTER: number = 3; //怪物
	public static PET: number = 4; //宠物
	public static TIANNV: number = 5; //天女

	public static COLLOCTNPC: number = 20; //采集NPC
	public static MONSTER_GUI: number = 21; //钟馗伏魔
	public static MONSTER_GANG: number = 22; //帮会小妖
	public static ORE_NPC = 23;//跨服战中的矿NPC;
	public static TOUR_PLAYER = 24;//比武中的玩家;
	public static TOUR_NPC = 25;//比武中的NPC;	
	public static KFBOSS_BOSS = 26;//跨服boss中的NPC;			
	public static KFBOSS_PLAYER = 27;//跨服boss中的玩家;	
	public static KFBOSS_NPC = 28;//采集NPC;												

	public static MAGIC: number = 100;

	//场景更新的顺序
	public static POS_PALYER = 0;
	public static POS_PET = 1;
	public static POS_XIANNV = 2;

	//单位属性KEY 暂时用于发送附近玩家数据
	public static KEY_JOB: number = 1;
	public static KEY_SEX: number = 2;

	/**模型 */
	public static KEY_BODY: number = 10;
	/**武器 */
	public static KEY_WEAPON: number = 11;
	/**坐骑 */
	public static KEY_HORSE: number = 12;
	/**翅膀 */
	public static KEY_WING: number = 13;

	public static KEY_GUANGHUAN: number = 14; //光环ID

	public static KEY_TITLE: number = 15; //称呼

	public static KEY_PET_ID: number = 20; //宠物id
	public static KEY_PETFLY: number = 32; //宠物飞升标记 0 1 2 

	public static KEY_XIANLV_ID: number = 21; //仙侣id

	public static KEY_TIANXIAN_ID: number = 22; //天仙id
	/**法阵 */
	public static KEY_FAZHEN = 23;
	/**仙位 */
	public static KEY_XIANWEI = 24;
	/**通灵 */
	public static KEY_TONGLING = 25;
	/**兽魂 */
	public static KEY_SOUL = 26;
	/**天女id */
	public static KEY_TIANNV_ID = 27;
	/**天女仙器 */
	public static KEY_XIANQI = 28;
	/**天女花辇 */
	public static KEY_HUANIAN = 29;
	/**天女灵气 */
	public static KEY_LINGQI = 30;
	/**战斗中 */
	public static KEY_ATTACK = 31;

	/**性别:男 */
	public static SEX_BOY = 1;
	/**性别:女 */
	public static SEX_GIRL = 2;

	/**
	 * 1 剑（人族）
	 * 2 枪（仙族) 
	 * 3 刀（妖族）
	*/
	public static JOB_REN = 1;
	public static JOB_XIAN = 2;
	public static JOB_YAO = 3;
}