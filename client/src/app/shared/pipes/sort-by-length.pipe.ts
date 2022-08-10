import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project.interface';

@Pipe({
  name: 'sortByLength',
  pure: false,
})
export class ArraySortLengthPipe implements PipeTransform {
  transform(array: Project[] | null): Project[] {
    if (!array) {
      return [];
    }
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: Project, b: Project) => {
      const lenghtA = a.todos.length ? a.todos.length : 0;
      const lenghtB = b.todos.length ? b.todos.length : 0;
      if (lenghtA > lenghtB) {
        return -1;
      } else if (lenghtA < lenghtB) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
