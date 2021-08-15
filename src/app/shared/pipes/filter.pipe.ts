import { Pipe, PipeTransform } from '@angular/core';
import { FiltersOptions } from '../interfaces/filters-options';
import { Question } from '../interfaces/question';
import { categories } from '../../shared/constants/categories';
import { milleSecInDay } from '../../shared/constants/date';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/User';

@Pipe({
  name: 'filter',
  pure: false,
})

export class FilterPipe implements PipeTransform {

  categories: string[];
  milleSecInDay: number;
  user: User;
  isAdmin: boolean

  constructor(public authService: AuthService) {
    this.isAdmin = authService.isAdmin;
    this.categories = categories;
    this.milleSecInDay = milleSecInDay
    this.user = authService.userData;
  }

  transform(value: Question[], option?: FiltersOptions): Question[] {
    const sortedCategoriesIndexes = option.categories.map((v,ind) => v ? categories[ind] : false).filter(v => v);
    return value
      .filter(question => option.solved ? question.comments?.find(comment => comment.resolved) : true)
      .filter(question => sortedCategoriesIndexes.find(v => v) ? question.categories.find(v => sortedCategoriesIndexes.find(d => d === v)) : true)
      .filter(question => +option.time ? (new Date().getTime() - question.date) <= this.milleSecInDay * option.time : true)
      .filter(question => option.moderation ? !question.approve : true)
      .filter(question => option.onlyUser ? question.user === this.user.email : true)
      .filter(question => !question.approve && question.user !== this.user.email && !this.isAdmin ? false : true)
      .sort((a, b) => option.last ? a.date - b.date : b.date - a.date)
  }
}
