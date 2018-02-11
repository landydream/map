class SceneObject implements ISceneObject {

	public x = 0;
	public y = 0

	/** 1:通常角色(主角 怪物等) 10:岩石 20:掉落货币*/
	public objType = 0;
	//1 主角  2 其他玩家 3 场景怪物
	public forceType = 0;

	public scene:MapScene;
	public id;
	public sid = 0;

	public static COUNTER = 0;

	public scale:number = 1;

	public constructor() {
		this.id = SceneObject.COUNTER++;
	}

	public update(ctx) {
	}

	public onAdd() {
	}

	public onRemove() {
	}

	public onEvent(evt, arg=null) {
	}
}