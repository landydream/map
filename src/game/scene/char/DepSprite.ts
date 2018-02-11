class DepSprite extends egret.DisplayObjectContainer implements IDepObject {
	public constructor() {
		super();
	}

	public dep = 0;
	public childIndex = -1;

	public depAddChild(child: DepSprite) {
		var list = this.$children;
		var rightindex = list.length - 1;
		var leftindex = 0;
		var minIndex = (leftindex + rightindex) / 2 >> 0;
		while (leftindex < rightindex) {
			var minChild: DepSprite = list[minIndex] as any;
			if (child.dep > minChild.dep) {
				leftindex = minIndex + 1;
			} else if (child.dep < minChild.dep) {
				rightindex = minIndex - 1;
			} else {
				break;
			}
			minIndex = (leftindex + rightindex) / 2 >> 0;
		}
		if (!child.$parent) {
			super.$doAddChild((child as any), minIndex);
		}
		child.childIndex = minIndex;
	}

	public depRemoveChild(sp: DepSprite) {
		var list = this.$children;
		var index = list.indexOf(sp as any);
		if (index >= 0) {
			this.$doRemoveChild(index, false);
		}
	}

	public sortChild() {
		var list = this.$children;
		list.sort(this.sortFunc);
	}

	public sortFunc(a: DepSprite, b: DepSprite): number {
		if (!a) {
			return 1;
		}
		if (!b) {
			return -1;
		}
		return a.dep - b.dep;
	}
}

interface IDepObject {
	dep:number;
	childIndex:number;
	$parent;
}