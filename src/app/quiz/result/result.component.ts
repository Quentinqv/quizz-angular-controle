import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  score = 0;
  scoreTotal = this.quizService.quizContent.length;
  playerName = this.quizService.playerName;
  startDate = this.quizService.startDate;
  endDate = new Date();

  constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.quizService.checkAnswers();
    this.score = this.quizService.score;
    this.startDate = this.quizService.startDate;
  }

  goToHome() {
    this.router.navigate(['/']);
    this.quizService.resetQuiz();
  }

  getGifUrl() {
    if (this.score > this.scoreTotal/2) return 'https://media.giphy.com/media/YRuFixSNWFVcXaxpmX/giphy.gif';
    return 'https://media.giphy.com/media/jWcypagX0tNtiup1pg/giphy.gif';
  }
}
