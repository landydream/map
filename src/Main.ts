
class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        GameGlobal.main = this;
        GameGlobal.init(this);

        // this.createScene();
        this.jumpAndJumpEnter();
    }

    private createScene() {
        GameGlobal.mapscene = new MapScene();

        var layermgr = GameGlobal.layerMgr;
        this._last = this._mcDesTime = egret.getTimer();
        this._mapScene = GameGlobal.mapscene;
        this._timer = Timer.instance;

        layermgr.GameMain.addChildAt(GameGlobal.mapscene.view, 0);


        GameGlobal.mapscene.enterScene(1000,SceneCtrl.GUANQIA);
        this.addEventListener(egret.Event.ENTER_FRAME, this.frameLogic, this);

        GameGlobal.initData();
        GameGlobal.isEnterGame = true;

        var vo = Model_player.voMine;
        vo.createTestData();

        var mapScene: MapScene = GameGlobal.mapscene;
		var hero: SceneCharRole = vo.getCharRole(0);
		if (!hero) {
			hero = SceneCharRole.create();
            hero.x = 400;
            hero.y = 800;
			hero.charType = UnitConst.PLAYER;
			hero.forceType = 1;
			hero.scene = mapScene;

            // var autoMove = new AutoMovePlug();
            // autoMove.tar = hero;
            // hero.addPlugOnly(autoMove);

            var input = new UserInputPlug();
            input.tar = hero;
            hero.addPlugOnly(input);

            var pathAccording: GameObjectPathAccording = new GameObjectPathAccording();
            pathAccording.tar = hero;
            hero.addPlugOnly(pathAccording);


			mapScene.hero = hero;
			mapScene.addUnit(hero);
		}

        GameGlobal.modelPlayer.updateRoleInfoByVo(hero, vo);
    }

    protected jumpAndJumpEnter():void{
        //测试1111
    }




    public _last;
    public _mcDesTime;
    public _mapScene;
    public _timer;
    public frameLogic() {
        var nowTime = egret.getTimer();
        var self = this;
        //var dt = nowTime - this._last;
        var dt = 33;

        self._mapScene.update(dt);
        self._timer.run();

        // if (nowTime - self._mcDesTime > 60000) {
            // self._mcDesTime = nowTime;
            // GameGlobal.resMgr.checkDestory1();
            // ImageLoader.instance.checkDestoryT();
        // }
    }


}