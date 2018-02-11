// TypeScript file
class AstarLink{
    public static pool:Array<AstarLink> = [];

    public static create(sn:AstarNode, en:AstarNode):AstarLink {
        var ret:AstarLink = AstarLink.pool.length ? AstarLink.pool.pop() : new AstarLink();
        ret.sn = sn;
        ret.en = en;
        return ret;
    }

    public sn:AstarNode;
    public en:AstarNode;

    public g:number;
}