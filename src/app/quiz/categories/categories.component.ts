import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "./categories.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../shared/services/quiz.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  playerName = '';
  search = '';

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.searchCategorie();

    this.route.params.subscribe(params => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
    });
  }

  goToCategorie(id: number) {
    this.router.navigate([`/quiz/${this.playerName}/${id}`]);
  }

  searchCategorie() {
    this.categoriesService.getCategories(this.search).subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  reset() {
    this.search = '';
    this.searchCategorie();
  }
}
