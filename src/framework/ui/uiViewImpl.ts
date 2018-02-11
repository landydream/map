// TypeScript file
interface IUIView {
    onOpen(arg);
    onClose();
    isInit:boolean;
    initUI();

    destoryView();
    destory();

    openCheck():boolean;

    uiparent:egret.DisplayObjectContainer;
    pid;
    /**1:可以在主界面打开的、2:二级打开例如在主城打开的界面、以此类推。不赋值时不管理,嵌套在总界面中的不赋值。打开界面会关闭等于或大于此值的界面，例如：=1时打开后会关闭1,2...界面*/
    ptype;

    parent:egret.DisplayObjectContainer;
}