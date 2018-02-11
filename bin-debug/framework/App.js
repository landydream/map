var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    App.isWeb = true; //是否web
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map