import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { environment } from 'src/environments/environment';
import { IMovie } from '../model/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies', () => {
    const mockMovies: IMovie[] = [
      {
        name: 'Harray Potter',
        details: 'A mind-bending movie',
        genre: 'Sci-Fi',
        actors: ['Harry', 'Rone', 'Harmoini'],
        releaseDate: '2010-07-16',
        id: 1,
      },
    ];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(environment.getMovies);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should add movie', () => {
    const mockMovie: IMovie = {
      name: 'Harray Potter',
      details: 'A mind-bending movie',
      genre: 'Sci-Fi',
      actors: ['Harry', 'Rone', 'Harmoini'],
      releaseDate: '2010-07-16',
      id: 1,
    };

    service.addMovie(mockMovie).subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(environment.addMovie);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockMovie);
    req.flush(mockMovie);
  });

  it('should update movie', () => {
    const mockMovie: IMovie = {
      name: 'Harray Potter',
      details: 'A mind-bending movie',
      genre: 'Sci-Fi',
      actors: ['Harry', 'Rone', 'Harmoini'],
      releaseDate: '2010-07-16',
      id: 1,
    };

    service.updateMovie(mockMovie).subscribe(movie => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(`${environment.updateMovie}${mockMovie.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockMovie);
    req.flush(mockMovie);
  });

  it('should delete movie', () => {
    const movieId = 1;

    service.deleteMovie(movieId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${environment.deleteMovie}${movieId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});