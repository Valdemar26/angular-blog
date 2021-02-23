import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'commentsPipe'
})
export class CommentsPipe implements PipeTransform {

  transform(comments: any, id): any {
    return comments.filter((comment) => comment.subjectId[0] === id);
  }

}
