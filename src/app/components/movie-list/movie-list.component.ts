import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IMovie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
import { IConfirmationConfig } from 'src/app/model/confirmation-config.model';
import { ConfirmationPopupComponent } from 'src/app/shared/component/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies!: IMovie[];
  confirmationConfigData!: IConfirmationConfig;
  totalMovies!: IMovie[];
  selectedMovie!: number;
  @ViewChild('confirmationModal')
  confirmationModal!: TemplateRef<ConfirmationPopupComponent>;
  @ViewChild('editMovieModal')
  editMovieModal!: TemplateRef<MovieListComponent>;
  @ViewChild('addMovieModal')
  addMovieModal!: TemplateRef<MovieListComponent>;
  editMovieForm: FormGroup = new FormGroup({});
  addMovieForm: FormGroup = new FormGroup({});
  @ViewChild('searchMovie') searchMovie!: ElementRef;
  
  constructor(
    private movieService: MovieService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.editMovieForm = this.onEditMovieForm();
    this.addMovieForm = this.onAddMovieForm();
  }

  ngOnInit(): void {
    this.getMovies();
  }

  ngAfterViewInit(): void {
    const searchMovieText = fromEvent<any>(
      this.searchMovie.nativeElement,
      'keyup'
    );
    searchMovieText
      .pipe(
        map((event) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((res) => {
        if (res) {
          this.movies = this.totalMovies.filter((movieObj) => {
            return movieObj.name.toLowerCase().includes(res.toLowerCase().replace(/\s+/g, ' ').trim());
          });
        } else {
          this.movies = [...this.totalMovies];
        }
      },
      );
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.totalMovies = movies;
    });
  }

  onAddMovieForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      details: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      actors: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
    });
  }

  onEditMovieForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      details: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      actors: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
    });
  }

  addMovie(): void {
    this.modalService.open(this.addMovieModal);
  }

  onActionMovie(key: string): void {
    if (key === 'add') {
      let payload: IMovie = {
        name: this.addMovieForm.value.name,
        details: this.addMovieForm.value.name,
        genre: this.addMovieForm.value.genre,
        actors: this.addMovieForm.value.actors.split(','),
        releaseDate: this.addMovieForm.value.releaseDate,
      };
      this.movieService.addMovie(payload).subscribe((data) => {
        this.confirmationConfigData = {
          title: 'Success',
          icon: 'bi bi-check-circle-fill icon-lg',
          message: 'Successfully added the movie',
          secondaryButton: 'Cancel',
        };
        this.addMovieForm.reset();
        this.modalService.open(this.confirmationModal);
        this.getMovies();
      });
    }
    if (key === 'edit') {
      let payload : IMovie= {
        id: this.selectedMovie,
        name: this.editMovieForm.value.name,
        details: this.editMovieForm.value.name,
        genre: this.editMovieForm.value.genre,
        actors: this.editMovieForm.value.actors.split(','),
        releaseDate: this.editMovieForm.value.releaseDate,
      };

      this.movieService.updateMovie(payload).subscribe(() => {
        this.confirmationConfigData = {
          title: 'Success',
          icon: 'bi bi-check-circle-fill icon-lg',
          message: 'Successfully updated the movie',
          secondaryButton: 'Cancel',
        };
        this.editMovieForm.reset();
        this.modalService.open(this.confirmationModal);
        this.getMovies();
      });
    }
  }

  onMovieAction(event: any): void {
    this.selectedMovie = event.selectedMovieDetails.id;
    switch (event.action) {
      case 'edit':
        this.editMovieForm = this.fb.group({
          name: [event.selectedMovieDetails.name, [Validators.required]],
          details: [event.selectedMovieDetails.details, [Validators.required]],
          genre: [event.selectedMovieDetails.genre, [Validators.required]],
          actors: [
            event.selectedMovieDetails.actors.join(', '),
            [Validators.required],
          ],
          releaseDate: [
            event.selectedMovieDetails.releaseDate,
            [Validators.required],
          ],
        });
        this.modalService.open(this.editMovieModal);
        break;
      case 'delete':
        this.confirmationConfigData = {
          title: 'Delete Movie',
          icon: 'bi bi-trash-fill icon-lg',
          message: 'Do you really want to delete the movie?',
          secondaryButton: 'Cancel',
          primaryButton: 'Delete',
        };
        this.modalService.open(this.confirmationModal);
        break;
    }
  }

  onCancelMovie() : void {
    this.addMovieForm.reset();
    this.modalService.dismissAll();
  }

  onBtnAction(key: string): void {
    switch (key) {
      case 'primary':
        this.movieService.deleteMovie(this.selectedMovie).subscribe((data) => {
          this.confirmationConfigData = {
            title: 'Success',
            icon: 'bi bi-check-circle-fill icon-lg',
            message: 'Successfully deleted the movie',
            secondaryButton: 'Cancel',
          };
          this.modalService.open(this.confirmationModal);
          this.getMovies();
        });
        break;
      case 'secondary':
      case 'close':
        this.modalService.dismissAll();
        break;
    }
  }
}
