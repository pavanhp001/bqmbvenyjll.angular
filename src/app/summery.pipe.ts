import {Pipe, PipeTransform } from '@angular/core'
import { summaryFileName } from '@angular/compiler/src/aot/util';
@Pipe({
    name:'summary'
})
export class SummeryPipe implements PipeTransform{
    transform(value: string, limit?: number) {
        if(!value){
            return null;
        }

        let actualLimit = (limit) ? limit : 15;
        
        return value.substr(0, actualLimit)+"...";
      }
}
