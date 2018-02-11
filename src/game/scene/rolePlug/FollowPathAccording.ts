//跟随路径组件
class FollowPathAccording {
    public tag: string = "FollowPathAccording";

    public tar: SceneCharRole;
    public ftar: SceneCharRole;

    public index: number = 0;
    protected route: Array<number> = [];

    protected allTime: number;
    protected addTime: number;

    protected moving: boolean = false;
    protected sx: number;
    protected sy: number;

    protected subx: number;
    protected suby: number;

    protected invf: number = 0;

    public onAdd() {
        GameGlobal.control.listen(MapScene.MSG_CHANGE, this.onMapChangeHandler, this);
    }

    public onRemove() {
        GameGlobal.control.remove(MapScene.MSG_CHANGE, this.onMapChangeHandler, this);
    }

    public onMapChangeHandler(): void {
        this.route = [];
        this.tar.x = this.ftar.x + 30;
        this.tar.y = this.ftar.y - 20;
        this.moving = false;
        this.tar.setAciton(Action.IDLE);
    }

    public topX = 0;
    public topY = 0;
    public update(ctx) {
        var dt = ctx.dt;
        var self = this;
        var tar = self.tar;
        var ftar = self.ftar;
        var route = self.route;
        self.invf += dt;

        var topChagel = false;
        if (true) {
            self.invf = 0;
            var tarex = ftar.x;
            var tarey = ftar.y;
            var gx = tarex - tar.x;
            var gy = tarey - tar.y;
            var dis: number = gx * gx + gy * gy;

            if (dis > 8000) {
                if (dis > 14400) { //修正距离过大的情况
                    tar.x = ftar.x + 30;
                    tar.y = ftar.y - 20;
                    return;
                }
                var fex = ftar.ex;
                var fey = ftar.ey;
                if (self.topX != ftar.ex || self.topY != ftar.ey) {
                    if (route.length == 0) {
                        //有新的路径
                        topChagel = true;
                    } else {
                        //取出之前要到达的点修改
                        route.length = route.length - 2;
                    }

                    route.push(tarey);
                    route.push(tarex);
                    route.push(ftar.ey);
                    route.push(ftar.ex);
                    tar.ex = self.topX = ftar.ex;
                    tar.ey = self.topY = ftar.ey;
                }
            } else {
                if (dis < 6400) {
                    if (route.length == 0 || ftar.action == Action.IDLE) {
                        self.moving = false;
                        tar.setAciton(Action.IDLE);
                    }
                }
            }
        }

        var routhChagel = false;
        if (tar.canMove) {
            
            if (!self.moving || topChagel) {
                if (route && route.length > 0) {
                    var dy = route.shift();
                    var dx = route.shift();
                    routhChagel = true;
                }
            }

            if (routhChagel) {
                self.addTime = 0;
                self.sx = tar.x;
                self.sy = tar.y;
                tar.ex = dx;
                tar.ey = dy;

                var subx = self.subx = dx - self.sx;
                var suby = self.suby = dy - self.sy;

                var dist = Math.sqrt(subx * subx + suby * suby);
                self.allTime = dist / tar.moveSpeed * 1000;
                self.moving = true;

                var d = 0;
                if (self.sx <= dx && self.sy >= dy) {
                    d = 1;
                } else if (self.sx <= dx && self.sy <= dy) {
                    d = 2;
                } else if (self.sx >= dx && self.sy <= dy) {
                    d = 3;
                } else {
                    d = 4;
                }

                tar.setDir(d);
                tar.setAciton(Action.RUN);
            }

            if (self.moving) {
                self.addTime += dt;
                var perc = self.addTime / self.allTime;
                if (perc > 1) {
                    perc = 1;
                    self.moving = false;
                    if (!route.length) {
                        tar.setAciton(Action.IDLE);
                    }
                }
                var nx = self.sx + self.subx * perc;
                var ny = self.sy + self.suby * perc;
                tar.x = nx;
                tar.y = ny;
            }
        }
    }

    public onEvent(evt: number, arg: any) {
    }
}