class ImageUtil {

	/**设置道具图标 isSmall=true是货币类型获取小图标*/
	public static setItemImg(img: eui.Image, type: number, id: number, isSmall?: boolean) {
		ImageLoader.instance.reduceImgRes(img);
		if (type == Enum_Attr.ITEM) {
			ImageLoader.instance.loader(this.getItemURL(id), img);
		} else if (type == Enum_Attr.EQUIP) {
			ImageLoader.instance.loader(this.getEquipURL(id), img);
		} else if (type == Enum_Attr.FABAO) {
			ImageLoader.instance.loader(this.getFabaoURL(id), img);
		} else {
			if (isSmall) {
				img.source = this.getMoneyUrl(type);
			} else {
				ImageLoader.instance.loader(this.getBigMoneyURL(type), img);
			}
		}
	}

	public static setSkillImg(img: eui.Image, icon, isGrey = false) {
		if (isGrey) {
			var url = "resource/ui/image/skill/grey/" + icon + ".png";
		} else {
			var url = "resource/ui/image/skill/" + icon + ".png";
		}
		ImageLoader.instance.loader(url, img);
	}

	/**设置活动按钮图标 */
	public static setActIcon(img: eui.Image, icon) {
		var url = ImageUtil.getActUrl(icon);
		ImageLoader.instance.loader(url, img);
	}
	/**活动界面的背景 */
	public static setActTitle(img: eui.Image, bg: string) {
		var url = "resource/ui/act/title/" + bg;
		ImageLoader.instance.loader(url, img);
	}


	/**获取角色图标104*104 */
	public static setRoleHeadIcon(job: number, sex: number, img: eui.Image) {
		ImageLoader.instance.loader("resource/ui/image/roleHead/" + job + "_" + sex + ".png", img);
	}
	/**角色头像54*54 */
	public static setRoleHeadMin(job: number, sex: number, img: eui.Image) {
		ImageLoader.instance.loader("resource/ui/image/roleHead/m" + job + sex + ".png", img);
	}

	/**宠物头像 isGrey是否灰色头像 */
	public static setPetHead(id: number, img: eui.Image, isGrey = false) {
		if (isGrey) {
			ImageLoader.instance.loader("resource/ui/image/head/pet/grey/" + id + ".png", img);
		} else {
			ImageLoader.instance.loader("resource/ui/image/head/pet/" + id + ".png", img);
		}
	}

	/**仙侣头像 isGrey是否灰色头像 */
	public static setXianLvHead(id: number, img: eui.Image, isGrey = false) {
		if (isGrey) {
			ImageLoader.instance.loader("resource/ui/image/head/xianlv/grey/" + id + ".png", img);
		} else {
			ImageLoader.instance.loader("resource/ui/image/head/xianlv/" + id + ".png", img);
		}
	}

	/**图腾头像 isGrey是否灰色头像 */
	public static setTutengIco(id: number, img: eui.Image, isGrey = false) {
		if (isGrey) {
			ImageLoader.instance.loader("resource/ui/image/icon/tuteng/grey/" + id + ".png", img);
		} else {
			ImageLoader.instance.loader("resource/ui/image/icon/tuteng/" + id + ".png", img);
		}
	}
	/**图腾贴图 */
	public static setTutengURL(id: number, img: eui.Image, isGrey = false) {
		if (!isGrey) {
			ImageLoader.instance.loader("resource/ui/image/tuteng/" + id + ".png", img);
		} 
	}

	/**活动按钮图片 */
	public static getActUrl(icon) {
		var url = "resource/ui/image/actIcon/" + icon + ".png";
		return url;
	}

	/**角色图片 */
	public static getRoleImg(job: number, sex: number) {
		return "resource/ui/createRole/" + job + sex + ".png";
	}

	/**获取道具图标 */
	public static getItemURL(id: number) {
		return "resource/ui/image/icon/item/" + Config.ITEM[id].icon + ".png";
	}

	/**获取装备图标 */
	public static getEquipURL(id: number) {
		return "resource/ui/image/icon/equip/" + Config.EQUIP[id].icon + ".png";
	}

	/**获取货币图标 */
	public static getBigMoneyURL(type: number) {
		return "resource/ui/image/icon/item/" + Config.Atrr_LIB[type].icon + ".png";
	}

	/**获取货币的小图标路径 */
	public static getMoneyUrl(type: number): string {
		var url = "";
		switch (type) {
			case Enum_Attr.yuanBao://元宝
				url = "MAINUI_json.BM_QianB1";
				break;
			case Enum_Attr.bindYuanBao://绑定元宝
				url = "MAINUI_json.BM_QianB3";
				break;
			case Enum_Attr.yinLiang://银两
				url = "MAINUI_json.BM_QianB2";
				break;
			case Enum_Attr.WXJIN://金
				url = "dayanta_json.Ico_Jin";
				break;
			case Enum_Attr.WXMU://木
				url = "dayanta_json.Ico_Mu";
				break;
			case Enum_Attr.WXSHUI://水
				url = "dayanta_json.Ico_Shui";
				break;
			case Enum_Attr.WXHUO://火
				url = "dayanta_json.Ico_Huo";
				break;
			case Enum_Attr.WXTU://土
				url = "dayanta_json.Ico_Tu";
				break;
			case Enum_Attr.GANGEXP:
				url = "moneyIcon_json.Bmoney_7";
				break;
			default:
				url = "moneyIcon_json.Bmoney_" + type;
				break;
			// case Enum_Attr.GONGXUN://功勋
			// 	url = "MAINUI_json.BM_QianB2";
			// 	break;
			// case Enum_Attr.FRIEND://友情币
			// 	url = "MAINUI_json.BM_QianB2";
			// 	break;
			// case Enum_Attr.WEIWANG://威望
			// 	url = "MAINUI_json.BM_QianB2";
			// 	break;
		}
		return url;
	}
	/**获取法宝图标 */
	public static getFabaoURL(id: number) {
		return "resource/ui/image/icon/fabao/" + Config.FABAO[id].tp + ".png";
	}
}