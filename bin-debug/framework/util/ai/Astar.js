var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Astar = (function () {
    function Astar() {
        this.openList = [];
        this.closeList = [];
        this.path = [];
        this.state = 1;
    }
    Astar.prototype.startFind = function (sx, sy, ex, ey, nodes) {
        var self = this;
        self.sx = sx;
        self.sy = sy;
        self.ex = ex;
        self.ey = ey;
        self.nodes = nodes;
        if (self.pathCheck(sx, sy, ex, ey) == true) {
            self.success = true;
            self.path = [self.ey, self.ex];
            return;
        }
        var sr = (sy / 32) >> 0;
        var sc = (sx / 32) >> 0;
        var er = (ey / 32) >> 0;
        var ec = (ex / 32) >> 0;
        self.success = false;
        self.cleanup();
        self.nodes = nodes;
        self.startNode = nodes[sr][sc];
        self.endNode = nodes[er][ec];
        self.start();
    };
    Astar.prototype.start = function () {
        var self = this;
        var sn = self.startNode;
        var en = self.endNode;
        var open = self.openList;
        var nodes = self.nodes;
        if (!nodes[sn.row] || !nodes[sn.row][sn.col]) {
            if (!nodes[en.row] || !nodes[en.row][en.col]) {
                return;
            }
        }
        if (self.startNode.block || self.endNode.block) {
            return;
        }
        open.push(sn);
        self.state += 2;
        self.searchSteps();
    };
    Astar.prototype.searchSteps = function () {
        var remain = 9999;
        var self = this;
        var tile = self.nodes;
        var open = self.openList;
        var close = self.closeList;
        var testn;
        var endNode = self.endNode;
        var sr = self.startNode.row;
        var sc = self.startNode.col;
        var er = endNode.row;
        var ec = endNode.col;
        var openst = self.state;
        var closetst = openst + 1;
        var closeList = self.closeList;
        var temp;
        while (open.length > 0) {
            testn = null;
            var curNode = self.curNode = open.shift();
            curNode.state = closetst;
            closeList.push(curNode);
            if (curNode.row == er && curNode.col == ec) {
                self.buildPath(curNode);
                break;
            }
            var nears = curNode.nears;
            var nl = nears.length;
            var h;
            var f;
            for (var i = 0; i < nl; i++) {
                var link = nears[i];
                var tn = link.en;
                if (tn.block == false && tn.state <= openst) {
                    if (nears.length == 0) {
                        var aaa = 1;
                    }
                    temp = er - tn.row;
                    //manhatan distance
                    if (temp < 0) {
                        temp = -temp;
                    }
                    h = temp;
                    temp = ec - tn.col;
                    if (temp < 0) {
                        temp = -temp;
                    }
                    h += temp;
                    f = link.g + h;
                    if (tn.state < openst) {
                        tn.aPrev = curNode;
                        tn.state = openst;
                        tn.h = h;
                        tn.f = f;
                        self.insertopen(tn);
                    }
                    else if (tn.state == openst) {
                        if (f < tn.f) {
                            tn.aPrev = curNode;
                            tn.state = openst;
                            tn.h = h;
                            tn.f = f;
                            self.swap(tn);
                        }
                    }
                }
            }
        }
    };
    Astar.prototype.insertopen = function (n) {
        var opens = this.openList;
        var l = 0;
        var r = opens.length - 1;
        while (l <= r) {
            var m = ((r + l) >> 1);
            var mn = opens[m];
            if (n.f < mn.f) {
                r = m - 1;
            }
            else {
                l = m + 1;
            }
        }
        opens.splice(l, 0, n);
    };
    Astar.prototype.swap = function (n) {
        var opens = this.openList;
        var i = opens.indexOf(n);
        if (i != -1) {
            opens.splice(i, 1);
            this.insertopen(n);
        }
    };
    Astar.prototype.buildPath = function (node) {
        var list = [];
        var self = this;
        var sr = self.startNode.row;
        var sc = self.startNode.col;
        list.push(self.ey, self.ex);
        while (node.aPrev && node.aPrev != self.startNode) {
            list.unshift(node.aPrev.row * 32 + 16, node.aPrev.col * 32 + 16);
            node = node.aPrev;
        }
        //list[0] = self.sy;
        //list[1] = self.sx;
        var path = self.path;
        path.length = 0;
        var sy = self.startNode.row * 32 + 16;
        var sx = self.startNode.col * 32 + 16;
        var len = list.length - 1;
        var start = 0;
        for (var j = len; j > start;) {
            var lx = list[j];
            var ly = list[j - 1];
            if (self.pathCheck(sx, sy, lx, ly)) {
                path.push(ly, lx);
                if (j == len)
                    break;
                sx = lx;
                sy = ly;
                start = j;
                j = len + 2;
            }
            j = j - 2;
        }
        if (!path.length) {
            path.push(self.ey, self.ex);
        }
        self.success = true;
        //console.log("pathlength" + path.length);
    };
    Astar.prototype.pathCheck = function (x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var len = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
        var temp = 0;
        var nodes = this.nodes;
        while (true) {
            if ((temp += 32) > len)
                return true;
            var rate = temp / len;
            var ny = rate * dy + y1;
            var nx = rate * dx + x1;
            if ((dx > 0 && nx > x2) || (dx < 0 && nx < x2))
                nx = x2;
            if ((dy > 0 && ny > y2) || (dy < 0 && ny < y2))
                ny = y2;
            var r = ny / 32 >> 0;
            var c = nx / 32 >> 0;
            if (nodes[r][c].block)
                return false;
        }
    };
    Astar.prototype.cleanup = function () {
        var self = this;
        self.startNode = self.endNode = null;
        self.nodes = null;
        self.openList.forEach(function (element) {
            element.aPrev = null;
        });
        self.closeList.forEach(function (element) {
            element.aPrev = null;
        });
        self.path.length = 0;
        self.openList.length = 0;
        self.closeList.length = 0;
    };
    return Astar;
}());
__reflect(Astar.prototype, "Astar");
//# sourceMappingURL=Astar.js.map