import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IMovie } from 'src/app/model/movie.model';

@Component({
  selector: 'app-block-card',
  templateUrl: './block-card.component.html',
  styleUrls: ['./block-card.component.css'],
})
export class BlockCardComponent {
  @Input()
  movie!: IMovie;
  @Output() movieAction = new EventEmitter();

  onMovieActionClick(selectedMovieDetails: any, action: any) {
    const data = {
      selectedMovieDetails: selectedMovieDetails,
      action: action,
    };
    this.movieAction.emit(data);
  }
}
