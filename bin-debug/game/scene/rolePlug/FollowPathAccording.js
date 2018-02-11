var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//跟随路径组件
var FollowPathAccording = (function () {
    function FollowPathAccording() {
        this.tag = "FollowPathAccording";
        this.index = 0;
        this.route = [];
        this.moving = false;
        this.invf = 0;
        this.topX = 0;
        this.topY = 0;
    }
    FollowPathAccording.prototype.onAdd = function () {
        GameGlobal.control.listen(MapScene.MSG_CHANGE, this.onMapChangeHandler, this);
    };
    FollowPathAccording.prototype.onRemove = function () {
        GameGlobal.control.remove(MapScene.MSG_CHANGE, this.onMapChangeHandler, this);
    };
    FollowPathAccording.prototype.onMapChangeHandler = function () {
        this.route = [];
        this.tar.x = this.ftar.x + 30;
        this.tar.y = this.ftar.y - 20;
        this.moving = false;
        this.tar.setAciton(Action.IDLE);
    };
    FollowPathAccording.prototype.update = function (ctx) {
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
            var dis = gx * gx + gy * gy;
            if (dis > 8000) {
                if (dis > 14400) {
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
                    }
                    else {
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
            }
            else {
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
    };
    FollowPathAccording.prototype.onEvent = function (evt, arg) {
    };
    return FollowPathAccording;
}());
__reflect(FollowPathAccording.prototype, "FollowPathAccording");
//# sourceMappingURL=FollowPathAccording.js.map