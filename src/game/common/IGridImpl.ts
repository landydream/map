interface IGridImpl {
    /**sid */
    sid:number;
    /**id */
    id:number;
    /**质量颜色 */
    qColor:number;
    /**质量 */
    quality:number;
    /** 数量 */
    count:number;
    /**名字*/
    name:string;
    /**cfg配置*/
    cfg:any;
    /*格子类型**/
    gType:number;
    /**边长，不设置值，默认宽度 */
    size:number;
}