import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'textfilter',
    pure: false
})
export class TextFilterPipe implements PipeTransform {
  transform(items: any, filter: any): any {
    if (!items || !filter) {
      return items;
    }
    if(filter.trim()==="")
    return items;
   return items.filter((item: any) => item.value.trim().toLowerCase().indexOf( filter.trim().toLowerCase())> -1);
  }
  
}