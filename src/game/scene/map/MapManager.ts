class MapManager {
	public static TILE_WIDTH: number = 510;
	public static TILE_HEIGHT: number = 510;

	public id = 0;
	public mapWid = 0;
	public mapHei = 0;
	public mapName = "";
	public head: string;

	public len = 0;
	public endRow;
	public endCol;

	public maptiled = [];
	public mapcfg: any;
	public rcDic: Object = {};
	public tileDic:Object = {}; //总块数
	public itemInfoRCMap: Object = {};

	public viewPort: egret.Rectangle;
	public offsetX: number;
	public offsetY: number;
	public nodes: Array<Array<AstarNode>> = new Array<Array<AstarNode>>();

	public isLoading: boolean = true;
	public alphaMap: boolean = false; //是否开启aplha地图块检测
	public loadingkey;

	public miniMapUrl: string = "";
	public mapUrl: string = "";
	public miniMap: egret.Bitmap;
	public map: egret.Bitmap;
	public tileLayer: egret.DisplayObjectContainer;
	public shap: egret.Shape;
	public view: egret.DisplayObjectContainer;
	public paths: Array<egret.Point> = new Array<egret.Point>();
	public npcsBronP: Array<egret.Point> = new Array<egret.Point>();

	public constructor(view: egret.DisplayObjectContainer) {
		var self = this;
		self.tileLayer = new egret.DisplayObjectContainer();
		self.tileLayer.touchEnabled = true;
		//self.tileLayer.cacheAsBitmap = true;
		//self.miniMap = new egret.Bitmap();
		//self.map = new egret.Bitmap();
		//self.map.cacheAsBitmap = true;

		self.shap = new egret.Shape();
		self.shap.graphics.beginFill(0);
		self.shap.graphics.drawRect(0, 0, 720, 1200);
		self.shap.graphics.endFill();

		self.view = view;
		//self.view.addChild(self.miniMap);
		//self.miniMap.scaleX = self.miniMap.scaleY = 10;
		self.view.addChild(self.tileLayer);
		//self.tileLayer.addChild(self.map);
	}

	public clean(): void {
		var tileDic: Object = this.tileDic;
		for (var oldkey in tileDic) {
			var oldtile: MapTile = tileDic[oldkey];
			oldtile.dispose();
			delete tileDic[oldkey];
			if(this.rcDic[oldkey]) delete this.rcDic[oldkey];
		}

		this.tileDic = {};
		this.rcDic = {};
		this.paths = [];
		this.npcsBronP = [];
		this.invalid = 0;
		//RES.destroyRes(this.miniMapUrl);
		//RES.destroyRes(this.mapUrl);
	}

	public initCustom(offsetX, offsetY, vpwidth, vpheight) {
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.viewPort = new egret.Rectangle(0, 0, vpwidth, vpheight);
	}

	protected firstLoad: boolean = true;
	public initConfig(id) {
		if (this.id == id) return;
		this.isLoading = true;
		GameGlobal.mapscene.addStopRenderFlag("mapInitConfig");

		if (!this.firstLoad) {
			this.shap.alpha = 0;
			egret.Tween.get(this.shap).to({ alpha: 1 }, 500);
		}
		GameGlobal.layerMgr.GameMain.addChildAt(this.shap, 1);
		this.firstLoad = false;

		this.id = id;
		this.head = "" + id;
		//this.miniMapUrl = GameGlobal.resMgr.getVersionUrl("/resource/map/" + this.head + "/clipmap/mini.jpg");
		//RES.getResByUrl(this.miniMapUrl, this.onMiniMapComplete, this);

		var mapcfgurl = GameGlobal.resMgr.getVersionUrl("/resource/map/" + this.head + "/map.json");
		RES.getResByUrl(mapcfgurl, this.onLoaderComplete, this, RES.ResourceItem.TYPE_JSON);
	}

	// protected onMiniMapComplete(texture) {
	// 	var self = this;
	// 	if (texture) {
	// 		self.miniMap.texture = texture;
	// 	}
	// 	var mapcfgurl = GameGlobal.resMgr.getVersionUrl("/resource/map/" + this.head + "/map.json");
	// 	RES.getResByUrl(mapcfgurl, this.onLoaderComplete, this, RES.ResourceItem.TYPE_JSON);
	// }
	protected onLoaderComplete(data) {
		if(data == null) {
			View_Alert.show("加载地图配置错误,请联系客服");
			return;
		}
		
		var self = this;
		self.clean();

		self.mapcfg = data;

		self.mapWid = self.mapcfg.width;
		self.mapHei = self.mapcfg.height;
		self.mapName = self.mapcfg.name;

		self.endCol = Math.ceil(self.mapcfg.width / MapManager.TILE_WIDTH) - 1;
		self.endRow = Math.ceil(self.mapcfg.height / MapManager.TILE_HEIGHT) - 1;

		self.initNodes();
		self.caculateLink();
		self.parseMapItems(self.mapcfg.items);

		self.isLoading = false;
		GameGlobal.mapscene.removStopRenderFlag("mapInitConfig");
		self.showView();

		GameGlobal.control.notify(MapScene.MSG_MAPCFG_COMPLECT);

		// setTimeout(function () {
		// 	SoundManager.getInstance().playBGM(1000);
		// }, 1000);
	}

	public showView(): void {
		var self = this;
		egret.Tween.removeTweens(self.shap);
		self.shap.alpha = 1;
		egret.Tween.get(self.shap).to({ alpha: 0 }, 500).call(function () {
			if (self.shap.parent) self.shap.parent.removeChild(self.shap);
		})
	}

	public watch(x, y) {
		var self = this;

		//var port: egret.Rectangle = self.viewPort;
		//var px = x - port.width / 2 - self.offsetX;
		//var py = y - port.height / 2 - self.offsetY;
		var px = x - 360;
		var py = y - 500;

		if (px < 0) {
			px = 0;
		} else if (px > self.mapWid - 720) {
			px = self.mapWid - 720;
		}
		if (py < 0) {
			py = 0;
		} else if (py > self.mapHei - 1200) {
			py = self.mapHei - 1200;
		}

		self.viewPort.x = px;
		self.viewPort.y = py;

		self.view.$setX(-px);
		self.view.$setY(-py);

		if (self.mapcfg == null) {
			return;
		}

		// if (self.invalid < 15) {
			self.rebuild();
		// }
	}

	public invalid: number = 0;  //这个变量代表你已经遍历了地图了 不需要再检测地图加载
	protected rebuild() {
		var self = this;

		var TILEW = MapManager.TILE_WIDTH;
		var TILEH = MapManager.TILE_HEIGHT;

		var numRow = self.mapcfg.height / TILEH;
		var numCol = self.mapcfg.width / TILEW;

		var port: egret.Rectangle = self.viewPort;
		var rcDic: Object = self.rcDic;
		var tile: MapTile;

		var startx = (port.x / TILEH) >> 0;
		var starty = (port.y / TILEW) >> 0;
		var endx = (port.right / TILEH) >> 0;
		var endy = (port.bottom / TILEW) >> 0;

		if (startx <= 0) {
			startx = 0;
		}
		if (starty <= 0) {
			starty = 0;
		}
		if (endy >= self.endRow) {
			endy = self.endRow;
		}
		if (endx >= self.endCol) {
			endx = self.endCol;
		}

		// if (startx == 0 && starty == 0) {
		// 	self.invalid |= 1;
		// }
		// if (endx == self.endCol && starty == 0) {
		// 	self.invalid |= 2;
		// }
		// if (endx == self.endCol && endy == self.endRow) {
		// 	self.invalid |= 4;
		// }
		// if (startx == 0 && endy == self.endRow) {
		// 	self.invalid |= 8;
		// }

		for (var oldkey in rcDic) {
			var oldtile: MapTile = rcDic[oldkey];
			if (oldtile.r < starty || oldtile.r > endy || oldtile.c < startx || oldtile.c > endx) {
				oldtile.onRemove();
				delete rcDic[oldkey];
				self.len--;
			}
		}

		var tileDic = self.tileDic;
		for (var r = starty; r <= endy; r++) {
			for (var c = startx; c <= endx; c++) {
				var key = self.id * 10000 + r * 1000 + c;
				tile = tileDic[key];
				if (!tile) {
					tile = tileDic[key] = MapTile.CREATEFUNC(self, key, r, c);
				}
				if (!rcDic[key]) {
					rcDic[key] = tile;
					self.len++;
					tile.onAdd();
				}
			}
		}
	}

	public setHeroBronPoint(x, y): void {
		// var hero: SceneCharRole = GameGlobal.mapscene.hero;
		// hero.x = x;
		// hero.y = y;
		// hero.setDir(3);
	}

	protected parseMapItems(items): void {
		var len = items.length;
		//var map = this.itemInfoRCMap;
		for (var i: number = 0; i < len; i++) {
			var itemInfo = items[i];

			if (itemInfo.type == MapItemConst.BORNPOINT) {
				this.setHeroBronPoint(itemInfo.x, itemInfo.y);
				continue;
			}

			if (itemInfo.type == MapItemConst.PATHPOINT) {
				this.paths.push(new egret.Point(itemInfo.x, itemInfo.y));
				continue;
			}

			if (itemInfo.type == MapItemConst.NPC) {
				this.npcsBronP.push(new egret.Point(itemInfo.x, itemInfo.y));
				continue;
			}

			// var k = this.id * 1000000 + ((itemInfo.y / MapManager.TILE_HEIGHT) >> 0) * 1000 + ((itemInfo.x / MapManager.TILE_WIDTH) >> 0);
			// if (map[k] == null) {
			// 	map[k] = [];
			// }
			// map[k].push(itemInfo);
		}
	}

	protected initNodes() {
		var self = this;
		var tile: Array<Array<number>> = self.mapcfg.tile;
		var rowLen = tile.length;
		var nodes = this.nodes;
		nodes.length = 0;
		self.alphaMap = false;

		if (rowLen > 0) {
			var colLen = tile[0].length;
			for (var r = 0; r < rowLen; r++) {
				var colinfo: Array<number> = tile[r];
				var colnodes: Array<AstarNode> = [];
				for (var c = 0; c < colLen; c++) {
					var node: AstarNode = AstarNode.create();
					node.row = r;
					node.col = c;
					node.type = colinfo[c];
					node.block = node.type == 0;
					if (node.type == 3) {
						self.alphaMap = true;
					}

					colnodes.push(node);
				}
				nodes.push(colnodes);
			}
		}
	}

	protected caculateLink() {
		var nodes = this.nodes;
		var rowLen = nodes.length;
		var endrow = rowLen - 1;
		var coseL: number = 1;
		var costD: number = 1.414;
		for (var r = 0; r < rowLen; r++) {
			var colNodes: Array<AstarNode> = nodes[r];
			var colLen = colNodes.length;
			var endcol = colLen - 1;
			for (var c = 0; c < colLen; c++) {
				var cn: AstarNode = colNodes[c];
				if (cn.block == true) {
					continue;
				}
				//top
				if (r > 0) {
					var top = nodes[r - 1][c];
					if (top.block == false) {
						var link = AstarLink.create(cn, top);
						cn.nears.push(link);
						link.g = coseL;
					}
					//top left
					if (c > 0) {
						var link = AstarLink.create(cn, nodes[r - 1][c - 1]);
						cn.nears.push(link);
						link.g = costD;
					}
					//top right
					if (c < endcol) {
						var link = AstarLink.create(cn, nodes[r - 1][c + 1])
						cn.nears.push(link);
						link.g = costD;
					}
				}
				//bottom
				if (r < endrow) {
					var link = AstarLink.create(cn, nodes[r + 1][c]);
					cn.nears.push(link);
					link.g = coseL;
					//bottom left
					if (c > 0) {
						var link = AstarLink.create(cn, nodes[r + 1][c - 1]);
						cn.nears.push(link);
						link.g = costD;
					}
					//bottom right
					if (c < endcol) {
						var link = AstarLink.create(cn, nodes[r + 1][c + 1]);
						cn.nears.push(link);
						link.g = costD;
					}
				}
				if (c > 0) {//left
					var link = AstarLink.create(cn, nodes[r][c - 1]);
					cn.nears.push(link);
					link.g = coseL;
				}
				if (c < endcol) {//right
					var link = AstarLink.create(cn, nodes[r][c + 1]);
					cn.nears.push(link);
					link.g = coseL;
				}
			}
		}
	}


	public isCanWalk(x: number, y: number): Boolean {
		var r = y / 32 >> 0;
		var c = x / 32 >> 0;
		var tinfo = this.nodes;
		if (tinfo[r] && tinfo[r][c] && tinfo[r][c].block == false) {
			return true;
		}
		return false;
	}

	public isAlpha(x: number, y: number): boolean {
		var r = y / 32 >> 0;
		var c = x / 32 >> 0;
		var tinfo = this.nodes;
		if (tinfo[r] && tinfo[r][c] && tinfo[r][c].type == 3) {
			return true;
		}
		return false;
	}

	public getNearCanWalkBlock(r: number, c: number, p: egret.Point = null) {
		var times = 1;
		var self = this;
		r = r >> 0;
		c = c >> 0;
		var tinfo = self.nodes;
		var bestScore = Number.MAX_VALUE;
		do {
			var sr = r - times;
			var er = r + times;
			var sc = c - times;
			var ec = c + times;

			for (var nr = sr; nr <= er; nr++) {
				for (var nc = sc; nc <= ec; nc++) {
					if (nr == sr || nr == er || nc == sc || nc == ec) {
						if (tinfo[nr] && tinfo[nr][nc]) {
							var n: AstarNode = tinfo[nr][nc];
							if (n.block == false) {
								var score = self.getNearScore(nr, nc, r, c);
								if (score < bestScore) {
									bestScore = score;
									if (p == null) {
										p = new egret.Point();
									}
									p.y = nr;
									p.x = nc;
									break;
								}
							}
						}
					}
				}
			}
			if (bestScore < Number.MAX_VALUE) {
				break;
			}
			times++;
		} while (times < 6)
		return p;
	}

	public getNearScore(r: number, c: number, r1: number, c1: number): number {
		var dr = r - r1;
		if (dr < 0) {
			dr = -dr;
		}
		var dc = c - c1;
		if (dc < 0) {
			dc = dc;
		}
		return dr + dc;
	}

	protected astar: Astar;
	public searchPath(sx: number, sy: number, ex: number, ey: number): boolean {
		var self = this;
		if (self.astar == null) {
			self.astar = new Astar();
		}

		if (self.isCanWalk(ex, ey)) {
			self.astar.startFind(sx, sy, ex, ey, self.nodes);
			return true;
		} else {
			var p = self.getNearCanWalkBlock(ey / 32, ex / 32);
			if (p) {
				self.astar.startFind(sx, sy, p.x * 32, p.y * 32, self.nodes);
				return true;
			}
		}

		return false;
	}


	public getLastPath(): Array<number> {
		var ret: Array<number> = null;
		if (this.astar.success) {
			ret = this.astar.path;
		}
		return ret;
	}
}