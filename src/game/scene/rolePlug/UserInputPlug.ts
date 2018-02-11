class UserInputPlug {
    public tag:string = "UserInputPlug";
    public tar: SceneCharRole;

    public onAdd() {
        this.tar.scene.mapMgr.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
    }

    public onRemove() {
        this.tar.scene.mapMgr.view.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
    }

    public update(ctx) {
    }

    protected onToucBegin(e: egret.TouchEvent) {
        var tar = this.tar;
        var mapscene = tar.scene;
        if (mapscene.mapMgr.isLoading == true || GameGlobal.isInBattle == true ) {
            return;
        }
        var distx = e.localX;
        var disty = e.localY;

        var map: MapManager = this.tar.scene.mapMgr;

        var suc: boolean = map.searchPath(this.tar.x, this.tar.y, distx, disty);
        if (suc == false) return;
        
        var path = map.getLastPath();
        if (path && path.length > 0) {
            this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
            this.tar.onEvent(SceneCharRole.UEVENT_USERCLICKMAP, null);
        }
    }

    public onEvent(evt: number, arg: any) {
    }
}