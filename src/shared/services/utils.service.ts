import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

    constructor() { }

    wordTrim(value, length, overflowSuffix) {
        value = value.trim();
        if (value.length <= length) return value;
        var strAry = value.split(' ');
        var retString = strAry[0];
        for (var i = 1; i < strAry.length; i++) {
            if (retString.length >= length || retString.length + strAry[i].length + 1 > length) break;
            retString += " " + strAry[i];
        }
        return retString + (overflowSuffix || '');
    }

    strip(html) {
       const tmp = document.createElement('DIV');
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || '';
    }

    time2TimeAgo(ts) {
        var d = new Date();
        var nowTs = Math.floor(d.getTime()/1000);
        var seconds = nowTs - ts;

        if (seconds > 2*24*3600) {
           return moment.unix(ts).format('YYYY-MM-DD');
        }

        if (seconds > 24*3600) {
           return "yesterday";
        }

        if (seconds > 3600) {
           return "a few hours ago";
        }
        if (seconds > 1800) {
           return "Half an hour ago";
        }
        if (seconds > 60) {
           return Math.floor(seconds / 60) + " minutes ago";
        }
    }
}
