import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(comments: any): any {

    if (typeof comments === 'string') {
      return comments.split('-').reverse().join('-');
    } else if (typeof comments === 'object') {
      return comments.slice().reverse();
    }
  }

}
