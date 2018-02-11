var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this.bgmSound = new egret.Sound();
        this.sounds = {}; //已经加载进来的sounds
        this.loadings = {}; //正在加载的sounds url
        this.stopFlags = [];
        this.counter = 0;
    }
    SoundManager.getInstance = function () {
        var SoundMgr = SoundManager;
        if (!SoundMgr._ins) {
            SoundManager._ins = new SoundManager();
        }
        return SoundMgr._ins;
    };
    SoundManager.prototype.setSoundEnable = function (v) {
        if (v) {
            this.removeStopFlag("enable");
        }
        else {
            this.addStopFlag("enable");
        }
        //localStorage.setItem("sanH5Sound", v ? "true" : "false");
    };
    SoundManager.prototype.addStopFlag = function (key) {
        var index = this.stopFlags.indexOf(key);
        if (index == -1) {
            this.stopFlags.push(key);
            if (this.stopFlags.length == 1) {
                this.stopCurBGM();
            }
        }
    };
    SoundManager.prototype.removeStopFlag = function (key) {
        var index = this.stopFlags.indexOf(key);
        if (index != -1) {
            this.stopFlags.splice(index, 1);
            if (this.soundIsPlaying()) {
                this.playCurBGM();
            }
        }
    };
    /**是否有正在播放的音乐 */
    SoundManager.prototype.soundIsPlaying = function () {
        return !this.stopFlags.length;
    };
    /**
     * 播放背景音乐 resource/sound/bmg
     */
    SoundManager.prototype.playBGM = function (id) {
        var self = this;
        if (!id) {
            if (self.bgmChannel) {
                self.bgmChannel.stop();
                self.bgmChannel = null;
            }
            self.curbgmurl = null;
            return;
        }
        var url = GameGlobal.resMgr.getVersionUrl("/resource/sound/bgm/" + id + ".mp3");
        if (self.curbgmurl == url) {
            return;
        }
        self.curbgmurl = url;
        if (id) {
            self.playCurBGM();
        }
    };
    SoundManager.prototype.playCurBGM = function () {
        var self = this;
        if (!self.stopFlags.length) {
            var url = self.curbgmurl;
            if (!url) {
                return;
            }
            var sound = self.sounds[url];
            if (sound) {
                try {
                    this.stopCurBGM();
                    self.bgmChannel = sound.play();
                    self.bgmChannel.volume = 0.3;
                }
                catch (e) {
                    console.log("playbmgError:" + url);
                }
            }
            else {
                if (!self.loadings[url]) {
                    self.loadings[url] = true;
                    RES.getResByUrl(url, self.onBgmLoaded, self, RES.ResourceItem.TYPE_SOUND);
                }
            }
        }
    };
    SoundManager.prototype.stopCurBGM = function () {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    };
    SoundManager.prototype.onBgmLoaded = function (sound, url) {
        if (sound) {
            this.sounds[url] = sound;
            delete this.loadings[url];
            if (url == this.curbgmurl && !this.stopFlags.length) {
                try {
                    App.stage.once(egret.TouchEvent.TOUCH_TAP, this.onTouchTapPlay, this);
                }
                catch (e) {
                    console.log("playBmgError:" + url);
                }
            }
        }
        else {
            GameGlobal.resMgr.onLoaded();
        }
    };
    SoundManager.prototype.onTouchTapPlay = function (e) {
        var self = this;
        try {
            var sound = self.sounds[self.curbgmurl];
            if (sound) {
                self.stopCurBGM();
                self.bgmChannel = sound.play();
                self.bgmChannel.volume = 0.3;
            }
        }
        catch (e) {
            console.log("playbmgError:" + self.curbgmurl);
        }
    };
    /**
     * 播放音效 resource/sound/eff
     */
    SoundManager.prototype.playEff = function (id) {
        if (!id) {
            return;
        }
        var self = this;
        if (self.stopFlags.length) {
            return;
        }
        if (self.counter > 3) {
            return;
        }
        //id = this.list[(this.list.length * Math.random()) >> 0];
        var url = GameGlobal.resMgr.getVersionUrl("/resource/sound/eff/" + id + ".mp3");
        var sound = self.sounds[url];
        if (sound) {
            try {
                var channel = sound.play(0, 1);
                channel.addEventListener(egret.Event.SOUND_COMPLETE, self.onsounded, self);
                self.counter++;
            }
            catch (e) {
                console.log("playSoundEffError:" + url);
            }
        }
        else {
            if (!self.loadings[url]) {
                self.loadings[url] = true;
                RES.getResByUrl(url, self.onloaded, self, RES.ResourceItem.TYPE_SOUND);
            }
        }
        return channel;
    };
    SoundManager.prototype.onloaded = function (sound, url) {
        if (sound) {
            delete this.loadings[url];
            this.sounds[url] = sound;
        }
        else {
            GameGlobal.resMgr.onLoaded();
        }
    };
    SoundManager.prototype.onsounded = function (e) {
        this.counter--;
        e.target.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
    };
    SoundManager.prototype.killChannel = function (channel) {
        if (channel && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
            channel.stop();
            this.counter--;
            channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
        }
    };
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map