class HtmlUtil {
	public constructor() {
	}

	/**检测字符串是否含有Html标签 */
	public static isHtml(str: string): boolean {
		var reg = /<[^>]+>/g;
		if (reg.test(str)) {
			return true;
		} else {
			return false;
		}
	}

	public static HTMLPARSER: egret.HtmlTextParser = new egret.HtmlTextParser();
	public static createLink(text: string, color = "#FFFFFF", size: number = 12, bUnderline: boolean = true, url: string = 'My'): string {
		var link: string = "";
		if (bUnderline) {
			link += "<u>";
			link += "<a href='event:" + url + "' color='" + color + "'>" + text + "</a>";
			link += "</u>";
			//<u><a href=event:'' color='#FFFFF'></a></u>
		}
		else {
			link += "<a href='event:" + url + "'>" + text + "</a>";
		}
		return link;
	}

	//<font color='#ffe400'> </font>
	public static font(content: string, color: string, size: number = 12): string {
		return "<font color='" + color + "' size='" + size + "'>" + content + "</font>";
	}

	public static fontColorList(contents, colors): Array<egret.ITextElement> {
		var text: string = "";
		for (var i: number = 0; i < contents.length; i++) {
			text += HtmlUtil.fontNoSize(contents[i], colors[i]);
		}
		return HtmlUtil.HTMLPARSER.parser(text);
	}

	public static link(content: string, event: string): string {
		return "<a href='event:" + event + "'>" + content + "</a>";
	}

	public static underLine(content: string): string {
		return "<u>" + content + "</u>";
	}

	public static fontNoSize(content: string, color: string): string {
		return "<font color='" + color + "'>" + content + "</font>";
	}

	public static br(content: string): string {
		return "<br>" + content + "</br>";
	}

	public static bold(content: string): string {
		return "<b>" + content + "</b>";
	}

	public static getRequest(url: string): any {
		var theRequest = {};
		var index = url.indexOf("?");
		if (theRequest && index != -1) {
			var str = url.substr(index + 1);
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				var kv = strs[i].split("=");
				theRequest[kv[0]] = kv[1];
			}
		}
		return theRequest;
	}
}