import { Component, OnInit, HostListener } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { Option, Question, Quiz } from '../models/index';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizzes: any[];
  quiz: Quiz = new Quiz(null);
  mode= 'quiz';
  quizName: string;
  /* config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 480,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  }; */

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizzes = this.quizService.getAll();
    this.quizName = this.quizzes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;      
    });
    this.mode = 'quiz';
  }
  get allQuestions(){
    return this.quiz.questions;
  }
  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }
  }
  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };
 
  onSubmit(){
    if(confirm('Are you sure you want to submit? You will not be able to change your answers after this point.')){
      let answers = [];
      this.mode = 'result';
      this.quiz.questions.forEach(res => answers.push({ 'quizId': this.quiz.id, 'qId': res.id, 'answered': res.answered}));
    }
    else{
      console.log('No was pressed');
      this.mode = 'quiz';
    }
  }
  @HostListener("window:scroll", []) onWindowScroll(){
    this.scrollFunction();
  }
  scrollFunction(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
      document.getElementById("topBtn").style.display = "block";
      document.getElementById("bottomBtn").style.display = "block";
    }else{
      document.getElementById("topBtn").style.display = "none";
      document.getElementById("bottomBtn").style.display = "none";
    }
  }
  goTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  goBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
}
  

