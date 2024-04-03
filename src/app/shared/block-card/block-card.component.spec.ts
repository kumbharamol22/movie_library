import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockCardComponent } from './block-card.component';
import { IMovie } from 'src/app/model/movie.model';

describe('BlockCardComponent', () => {
  let component: BlockCardComponent;
  let fixture: ComponentFixture<BlockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCardComponent);
    component = fixture.componentInstance;
    component.movie = {
      name: 'Harray Potter',
      details: 'A mind-bending movie',
      genre: 'Sci-Fi',
      actors: ['Harry', 'Rone', 'Harmoini'],
      releaseDate: '2010-07-16',
      id: 1,
    };
    fixture.detectChanges();
  });

  it('should emit movie action with correct data', () => {
    spyOn(component.movieAction, 'emit');
    const movieDetails = {
      name: 'Harray Potter',
      details: 'A mind-bending movie',
      genre: 'Sci-Fi',
      actors: ['Harry', 'Rone', 'Harmoini'],
      releaseDate: '2010-07-16',
      id: 1,
    };
    const action = 'edit';

    component.onMovieActionClick(movieDetails, action);

    expect(component.movieAction.emit).toHaveBeenCalledWith({
      selectedMovieDetails: movieDetails,
      action: action,
    });
  });
});
