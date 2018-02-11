class Astar {
	public constructor() {
	}

	public curRow;
	public curCol;

	public openList: Array<AstarNode> = [];
	public closeList: Array<AstarNode> = [];

	public startNode: AstarNode;
	public endNode: AstarNode;
	public curNode: AstarNode;

	public nodes: Array<Array<AstarNode>>;

	public path: Array<number> = [];

	public state: number = 1;

	public success: boolean;

	public sx: number;
	public sy: number;

	public ex: number;
	public ey: number;

	public startFind(sx, sy, ex, ey, nodes: Array<Array<AstarNode>>) {
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
	}

	public start() {
		var self = this;
		var sn: AstarNode = self.startNode;
		var en: AstarNode = self.endNode;
		var open: Array<AstarNode> = self.openList;
		var nodes: Array<Array<AstarNode>> = self.nodes;
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
	}

	public searchSteps() {
		var remain = 9999;
		var self = this;
		var tile = self.nodes;
		var open = self.openList;
		var close = self.closeList;

		var testn: AstarNode;
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
			var h: number;
			var f: number;
			for (var i = 0; i < nl; i++) {
				var link: AstarLink = nears[i];
				var tn: AstarNode = link.en;

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
					} else if (tn.state == openst) {
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
	}

	protected insertopen(n: AstarNode) {
		var opens = this.openList;
		var l = 0;
		var r = opens.length - 1;
		while (l <= r) {
			var m = ((r + l) >> 1);
			var mn = opens[m];
			if (n.f < mn.f) {
				r = m - 1;
			} else {
				l = m + 1;
			}
		}
		opens.splice(l, 0, n);
	}

	protected swap(n: AstarNode) {
		var opens = this.openList;
		var i = opens.indexOf(n);
		if (i != -1) {
			opens.splice(i, 1);
			this.insertopen(n);
		}
	}

	protected buildPath(node: AstarNode) {
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

		var sy: number = self.startNode.row * 32 + 16;
		var sx: number = self.startNode.col * 32 + 16;
		var len: number = list.length - 1;
		var start: number = 0;
		for (var j: number = len; j > start;) {
			var lx = list[j];
			var ly = list[j - 1];
			if (self.pathCheck(sx, sy, lx, ly)) {
				path.push(ly, lx);
				if (j == len) break;
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
	}


	public pathCheck(x1: number, y1: number, x2: number, y2: number): boolean {
		var dx: number = x2 - x1;
		var dy: number = y2 - y1;
		var len: number = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
		var temp: number = 0;
		var nodes = this.nodes;
		while (true) {
			if ((temp += 32) > len) return true;
			var rate: number = temp / len;
			var ny: number = rate * dy + y1;
			var nx: number = rate * dx + x1;
			if ((dx > 0 && nx > x2) || (dx < 0 && nx < x2))
				nx = x2;
			if ((dy > 0 && ny > y2) || (dy < 0 && ny < y2))
				ny = y2;

			var r = ny / 32 >> 0;
			var c = nx / 32 >> 0;

			if (nodes[r][c].block)
				return false;
		}
	}

	public cleanup() {
		var self = this;
		self.startNode = self.endNode = null;
		self.nodes = null;
		self.openList.forEach(element => {
			element.aPrev = null;
		});
		self.closeList.forEach(element => {
			element.aPrev = null;
		});
		self.path.length = 0;
		self.openList.length = 0;
		self.closeList.length = 0;
	}
}