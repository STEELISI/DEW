import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from './state-service.service';


@Pipe({
    name: 'textfilter',
    pure: false
})
export class TextFilterPipe implements PipeTransform {

  constructor(private state:StateService){}
  transform(items: any, filter: any): any {
    if (!items || !filter) {
      if(items.length>0)
      this.state.setCurrentWord(items[0].value);
      else
      this.state.setCurrentWord("");
      return items;
    }
    if(filter.trim()===""){

      if(items.length>0)
      this.state.setCurrentWord(items[0].value);
      else
      this.state.setCurrentWord("");
    return items;
  }
    else{
 
   var filterList= items.filter((item: any) => item.value.trim().toLowerCase().indexOf( filter.trim().toLowerCase())> -1);
   if(filterList.length>0)
   this.state.setCurrentWord(filterList[0].value);
   else
   this.state.setCurrentWord("");
   return filterList; 
  }
   }
  
}