var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//沿着路径走挂机
var GameObjectPathAccording = (function () {
    function GameObjectPathAccording() {
        this.tag = "GameObjectPathAccording";
        this.index = 0;
        this.moving = false;
    }
    GameObjectPathAccording.prototype.onAdd = function () {
    };
    GameObjectPathAccording.prototype.onRemove = function () {
    };
    GameObjectPathAccording.prototype.update = function (ctx) {
        var dt = ctx.dt;
        var self = this;
        var tar = self.tar;
        if (tar.canMove) {
            var route = self.route;
            if (!self.moving) {
                if (route && route.length > 0) {
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
                    if (self.sx <= dx && self.sy >= dy) {
                        d = 1;
                    }
                    else if (self.sx <= dx && self.sy <= dy) {
                        d = 2;
                    }
                    else if (self.sx >= dx && self.sy <= dy) {
                        d = 3;
                    }
                    else {
                        d = 4;
                    }
                    tar.setDir(d);
                    tar.setAciton(Action.RUN);
                }
            }
            else {
                if (self.moving) {
                    self.addTime += dt;
                    var perc = self.addTime / self.allTime;
                    if (perc > 1) {
                        perc = 1;
                        self.moving = false;
                        if (!route.length) {
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
    };
    GameObjectPathAccording.prototype.onEvent = function (evt, arg) {
        if (evt == SceneCharRole.UEVENT_ACCPATH) {
            this.moving = false;
            this.route = arg.concat();
        }
        else if (evt == SceneCharRole.UEVENT_STOPMOVE) {
            this.moving = false;
            this.route = [];
            this.tar.setAciton(Action.IDLE);
        }
    };
    return GameObjectPathAccording;
}());
__reflect(GameObjectPathAccording.prototype, "GameObjectPathAccording");
//# sourceMappingURL=GameObjectPathAccording.js.map