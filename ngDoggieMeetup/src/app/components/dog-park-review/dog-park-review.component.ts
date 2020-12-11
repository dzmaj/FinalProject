import { DogParkReviewId } from './../../models/dog-park-review-id';
import { DogParkReview } from './../../models/dog-park-review';
import { DogParkReviewService } from './../../services/dog-park-review.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dog-park-review',
  templateUrl: './dog-park-review.component.html',
  styleUrls: ['./dog-park-review.component.css'],
})
export class DogParkReviewComponent implements OnInit {
  selected: DogParkReview = null;
  newDogParkReview: DogParkReview = new DogParkReview();
  dogParkReviews: DogParkReview[] = [];
  editDogParkReview: DogParkReview = null;
  dogParkId: number = 1;
  displayTable() {
    this.selected = null;
  }

  constructor(private dogParkReviewService: DogParkReviewService) {}



  displayDogParkReview(dogparkReview) {
    this.selected = dogparkReview;
  }

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.dogParkReviewService.index(this.dogParkId).subscribe(
      (data) => {
        (this.dogParkReviews = data), console.log(data);
      },

      (err) => console.error('Error in reloading the dogParkReviews: ')
    );
  }

  getNumOfReviews = function () {
    return this.dogParkReviews.length;
  };


  addDogParkReview(addDogParkReviewForm: NgForm) {
    console.log(addDogParkReviewForm.value);
    this.dogParkReviews.push(this.newDogParkReview);
    this.dogParkReviewService
      .create(addDogParkReviewForm.value, this.dogParkId)
      .subscribe(
        (data) => {
          this.reload();
        },
        (err) => {
          console.error(err);
        }
      );
    this.dogParkReviewService.index(this.dogParkId).subscribe(
      (data) => {
        this.dogParkReviews = data;
      },
      (err) => {
        console.error(err);
      }
    );
    this.newDogParkReview = new DogParkReview();
    addDogParkReviewForm.reset();
    console.log(addDogParkReviewForm.value);
    console.log('Dog Park Review Added!!+++++****');
  }

  updateDogParkReview(dogParkReview: DogParkReview, dogParkId: number) {
    this.dogParkReviewService.update(dogParkReview, dogParkId).subscribe(
      (good) => {
        this.dogParkReviewService.index(this.dogParkId);
        if (this.selected != null) {
          this.selected = Object.assign({}, dogParkReview);
        }
      },
      (bad) => {
        console.error(bad);
      }
    );
    this.editDogParkReview = null;
  }

  setEditDogParkReview() {
    this.editDogParkReview = Object.assign({}, this.selected);
  }

  deleteDogParkReview(user: User, dogParkReview: DogParkReview): void {
    this.dogParkReviewService
      .deleteDogParkReview(user, dogParkReview)
      .subscribe((data) => {
        this.dogParkReviews = this.dogParkReviews.filter(
          (dogParkReview) => dogParkReview !== dogParkReview
        );
      });
  }
}
