interface ISceneCtrl {
	onEnter(scene: MapScene);
	onExit(scene: MapScene);

	update(ctx);
}

class SceneCtrl {
	public static GUANQIA = 1; /**关卡小怪 */
	public static GANG = 2; /**帮会 */
	public static KUAFU_BATTLE = 3;//跨服战
	public static TOURNAMENT = 4;//比武大会	
	public static KFBOSS = 5;//跨服boss		

	public static getCtrl(scenetype): ISceneCtrl {
		var sceneCtrl = SceneCtrl;
		if (scenetype == sceneCtrl.GUANQIA) {
			return GuanQiaSceneCtrl.instance;
		} 
	}

	scene: MapScene;
}