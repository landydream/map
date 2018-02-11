class SceneComCtrl extends SceneCtrl{
	public constructor() {
		super();
	}
	
	public scene:MapScene;

	update(ctx) {
		this.aiUpdate(ctx);
		this.scene.watchMainRole();
	}

	onEnter(scene:MapScene) {
		this.scene = scene;
	}

	onExit(scene:MapScene) {
		this.scene.ctx = {};
		this.scene.removeAll();
	}

	public aiUpdate(ctx) {
	}
}