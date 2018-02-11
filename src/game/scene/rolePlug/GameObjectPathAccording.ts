//沿着路径走挂机
class GameObjectPathAccording {
    public tag:string = "GameObjectPathAccording";

    public tar:SceneCharRole;
    public index:number = 0;
    public route:Array<number>;

    public allTime:number;
    public addTime:number;

    public moving:boolean = false;
    public sx:number;
    public sy:number;

    public subx:number;
    public suby:number;

	public onAdd() {
	}

	public onRemove() {
	}

    public update(ctx) {
        var dt = ctx.dt;
        var self = this;

        var tar = self.tar;
        if(tar.canMove) {
            var route = self.route;
            if(!self.moving) {
                if(route && route.length > 0) {
                    self.addTime = 0;
                    var dy = route.shift();
                    var dx = route.shift();
                    
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
                    if(self.sx <= dx && self.sy >= dy) {
                        d = 1;
                    }else if(self.sx <= dx && self.sy <= dy) {
                        d = 2;
                    }else if(self.sx >= dx && self.sy <= dy) {
                        d = 3;
                    }else {
                        d = 4;
                    }

                    tar.setDir(d);
                    tar.setAciton(Action.RUN);
                }
            }else{
                if(self.moving) {
                    self.addTime += dt;
                    var perc = self.addTime / self.allTime;
                    if(perc > 1) {
                        perc = 1;
                        self.moving = false;
                        if(!route.length) {
                            tar.setAciton(Action.IDLE);
                            tar.onEvent(SceneCharRole.UEVENT_REACH, 0);
                        }
                    }
                    var nx = self.sx + self.subx * perc;
                    var ny = self.sy + self.suby * perc;
                    tar.x = nx;
                    tar.y = ny;
                }
            }
        }
	}

    public onEvent(evt:number, arg:any) {
        if(evt == SceneCharRole.UEVENT_ACCPATH) {
            this.moving = false;
            this.route = (arg as Array<number>).concat();
        }else if(evt == SceneCharRole.UEVENT_STOPMOVE) {
            this.moving = false;
            this.route = [];
            this.tar.setAciton(Action.IDLE);
        }
    }
}