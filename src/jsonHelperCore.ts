


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

    loopObj(obj:any){
       this.analysisObj('',obj,(k,v)=>{
           this.entry[k] = v;
       })
    }

    analysisObj(key:string,obj:any,func:(key:string,value:any)=>void){
        if(obj instanceof Array){
            for(let i =0;i<obj.length;i++){
                this.analysisObj(`${key}[${i}]`,obj[i],func)
            }
        }else if(obj instanceof Object){
            for(let item in obj){
                this.analysisObj(`${key}${key==""?"":"."}${item}`,obj[item],func)
            }
        }else{
            func(key,obj)
        }
    }

    

    // loopObj(key: string, val: Object, pre: string, index: number) {
    //     if (pre == null || pre == "") {
    //         pre = key;
    //     } else if (index > -1) {
    //         pre = `${pre}[${index}]`;
    //     } else {
    //         pre = `${pre}.${key}`;
    //     }

    //     if (!(val instanceof Array) && !(typeof val === "object")) {
    //         this.entry[pre] = val;
    //         return;
    //     }

    //     if (val instanceof Array) {
    //         let i = 0;
    //         for (let key in val) {
    //             this.loopObj(key, val[key], pre, i++);
    //         }
    //     } else if (typeof val === "object") {
    //         for (let key in val) {
    //             this.loopObj(key, val[key], pre, -1);
    //         }
    //     }
    // }
}


