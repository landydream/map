var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResURL = (function () {
    function ResURL() {
    }
    ResURL.getBoxUrl = function (id) {
        return 'resource/image/jumpAndJump/' + id + '.png';
    };
    return ResURL;
}());
__reflect(ResURL.prototype, "ResURL");
//# sourceMappingURL=ResURL.js.map