interface ISceneObject {
    onAdd();
    onRemove();
    update(ctx);
    onEvent(evt,any);
    scene:MapScene;

    /**类别 0:不参与游戏逻辑 1:角色*/
    objType;
    //1 主角  2 其他玩家 3 场景怪物
    forceType;
    
    x;
	y;
    /**id */
	id;
}