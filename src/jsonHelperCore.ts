


export class JsonHelperCore {

    entry: { [id: string]: Object };

    constructor() {
        this.entry = {};
    }


    formatJson(jsonStr: string): string {
        var reg = /[\\]["]/g;
        while (reg.test(jsonStr)) {
            jsonStr = jsonStr.replace(reg, '"');
        }
        jsonStr = jsonStr.replace(/["][\[]/g, '['); // replace "[ using [
        jsonStr = jsonStr.replace(/[\]]["]/g, ']'); // replace ]" using ]
        jsonStr = jsonStr.replace(/["][{]/g, '{'); // replace "{ using {
        jsonStr = jsonStr.replace(/[}]["]/g, '}'); // repaace }" using }
        // jsonStr = jsonStr.replace(/[\\]["]/g, '"').replace(/["][\[]/g, '[').replace(/[\]]["]/g, ']').replace(/["][{]/g, '{').replace(/[}]["]/g, '}');
        return jsonStr;
    }

    jsonInLine(obj: Object): string {
        let jsonStr: string = JSON.stringify(obj);
        return jsonStr;
    }

    loopObj(key: string, val: Object, pre: string, index: number) {
        if (pre == null || pre == "") {
            pre = key;
        } else if (index > -1) {
            pre = `${pre}[${index}]`;
        } else {
            pre = `${pre}.${key}`;
        }

        if (!(val instanceof Array) && !(typeof val === "object")) {
            this.entry[pre] = val;
            return;
        }

        if (val instanceof Array) {
            let i = 0;
            for (let key in val) {
                this.loopObj(key, val[key], pre, i++);
            }
        } else if (typeof val === "object") {
            for (let key in val) {
                this.loopObj(key, val[key], pre, -1);
            }
        }
    }
}


