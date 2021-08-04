import { Pipe, PipeTransform } from '@angular/core';
import {Song} from "../model/Song";

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  // @ts-ignore
  transform(Songs : Song[],searchValue:string): Song[] {
    if (!Songs || !searchValue){
      return  Songs;
    }
    return Songs.filter(song => song.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

}
