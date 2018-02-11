// module RES {
//     export class ZipAnalyzer extends BinAnalyzer {
//         protected jsonMap: any;
//         constructor() {
//             super();
//             this.jsonMap = {};
//         }
//         public analyzeData(resItem, data) {
//             var name = resItem.name;
//             if (this.fileDic[name] || (data != "" && !data)) {
//                 return;
//             }
//             this.fileDic[name] = data;
//             var zip = new JSZip(data);
//             var jsons: JSZipObject[] = zip.file(/\.(?:json)$/i);
//             for (var i = 0, len = jsons.length; i < len; i++) {
//                 let json = JSON.parse(jsons[i].asText());
//                 let subkey = RES.AnalyzerBase.getStringPrefix(jsons[i].name) + '_' + RES.AnalyzerBase.getStringTail(jsons[i].name);
//                 if (!this.jsonMap[subkey]) {
//                     this.jsonMap[subkey] = json;
//                     this.addSubkey(subkey, name);
//                 }
//             }
//         }
//         public getRes(name) {
//             var res = this.fileDic[name];
//             if (!res) {
//                 res = this.jsonMap[name];
//             }
//             return res;
//         }
//         public destroyRes(name) {
//             var res = this.fileDic[name];
//             if (res) {
//                 delete this.fileDic[name];
//                 return true;
//             }
//             res = this.jsonMap[name];
//             if (res) {
//                 delete this.jsonMap[name];
//                 return true;
//             }
//             return false;
//         }
//     }
// } 
//# sourceMappingURL=ZipAnalyzer.js.map