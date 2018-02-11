class SoundManager {
	public constructor() {
	}

	private static _ins;
	public static getInstance(): SoundManager {
		var SoundMgr = SoundManager;
		if (!SoundMgr._ins) {
			SoundManager._ins = new SoundManager();
		}
		return SoundMgr._ins;
	}

	public bgmSound: egret.Sound = new egret.Sound();
	public bgmChannel: egret.SoundChannel;
	public curbgmurl: string;

	public sounds: any = {};//已经加载进来的sounds
	public loadings: any = {};//正在加载的sounds url

	public stopFlags = [];
	public setSoundEnable(v: boolean) {
		if (v) {
			this.removeStopFlag("enable");
		} else {
			this.addStopFlag("enable");
		}
		//localStorage.setItem("sanH5Sound", v ? "true" : "false");
	}

	public addStopFlag(key) {
		var index = this.stopFlags.indexOf(key);
		if (index == -1) {
			this.stopFlags.push(key);
			if (this.stopFlags.length == 1) {
				this.stopCurBGM();
			}
		}
	}

	public removeStopFlag(key) {
		var index = this.stopFlags.indexOf(key);
		if (index != -1) {
			this.stopFlags.splice(index, 1);
			if (this.soundIsPlaying()) {
				this.playCurBGM();
			}
		}
	}

	/**是否有正在播放的音乐 */
	public soundIsPlaying():boolean{
		return !this.stopFlags.length;
	}

	/**
	 * 播放背景音乐 resource/sound/bmg
	 */
	public playBGM(id) {
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
	}

	protected playCurBGM() {
		var self = this;
		if (!self.stopFlags.length) {
			var url = self.curbgmurl;
			if (!url) {
				return;
			}
			var sound: egret.Sound = self.sounds[url];
			if (sound) {
				try {
					this.stopCurBGM();
					self.bgmChannel = sound.play();
					self.bgmChannel.volume = 0.3;
				} catch (e) {
					console.log("playbmgError:" + url);
				}
			} else {
				if (!self.loadings[url]) {
					self.loadings[url] = true;
					RES.getResByUrl(url, self.onBgmLoaded, self, RES.ResourceItem.TYPE_SOUND);
				}
			}
		}
	}

	public stopCurBGM() {
		if (this.bgmChannel) {
			this.bgmChannel.stop();
			this.bgmChannel = null;
		}
	}

	protected onBgmLoaded(sound: egret.Sound, url) {
		if (sound) {
			this.sounds[url] = sound;
			delete this.loadings[url];
			if (url == this.curbgmurl && !this.stopFlags.length) {
				try {
					App.stage.once(egret.TouchEvent.TOUCH_TAP, this.onTouchTapPlay, this);
				} catch (e) {
					console.log("playBmgError:" + url);
				}
			}
		} else {
			GameGlobal.resMgr.onLoaded();
		}
	}

	public onTouchTapPlay(e): void {
		var self = this;
		try {
			var sound = self.sounds[self.curbgmurl];
			if (sound) {
				self.stopCurBGM();
				self.bgmChannel = sound.play();
				self.bgmChannel.volume = 0.3;
			}
		} catch (e) {
			console.log("playbmgError:" + self.curbgmurl);
		}
	}

	/**
	 * 播放音效 resource/sound/eff
	 */
	public playEff(id): egret.SoundChannel {
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

		var sound: egret.Sound = self.sounds[url];
		if (sound) {
			try {
				var channel = sound.play(0, 1);
				channel.addEventListener(egret.Event.SOUND_COMPLETE, self.onsounded, self);
				self.counter++;
			} catch (e) {
				console.log("playSoundEffError:" + url);
			}
		} else {
			if (!self.loadings[url]) {
				self.loadings[url] = true;
				RES.getResByUrl(url, self.onloaded, self, RES.ResourceItem.TYPE_SOUND);
			}
		}
		return channel;
	}

	protected onloaded(sound, url) {
		if (sound) {
			delete this.loadings[url];
			this.sounds[url] = sound;
		} else {
			GameGlobal.resMgr.onLoaded();
		}
	}

	public counter = 0;
	protected onsounded(e: egret.Event) {
		this.counter--;
		e.target.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
	}

	public killChannel(channel: egret.SoundChannel) {
		if (channel && channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
			channel.stop();
			this.counter--;
			channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onsounded, this);
		}
	}

}