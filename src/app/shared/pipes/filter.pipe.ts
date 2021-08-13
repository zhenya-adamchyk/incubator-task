import { Pipe, PipeTransform } from '@angular/core';
import { FiltersOptions } from '../interfaces/filters-options';
import { Question } from '../interfaces/question';
import { categories } from '../../shared/constants/categories';
import { milleSecInDay } from '../../shared/constants/date';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  categories: string[];
  milleSecInDay: number;

  constructor() {
    this.categories = categories;
    this.milleSecInDay = milleSecInDay
  }

  transform(value: Question[], option?: FiltersOptions): Question[] {
    console.log(option)
    const sortedCategoriesIndexes = option.categories.map((v,ind) => v ? categories[ind] : false).filter(v => v);
    return value
      .filter(question => option.solved ? question.comments?.find(comment => comment.resolved) : true)
      .filter(question => sortedCategoriesIndexes.find(v => v) ? question.categories.find(v => sortedCategoriesIndexes.find(d => d === v)) : true)
      .filter(question => +option.time ? (new Date().getTime() - question.date) <= this.milleSecInDay * option.time : true)
      .sort((a, b) => option.last ? a.date - b.date : b.date - a.date)
  }
}
