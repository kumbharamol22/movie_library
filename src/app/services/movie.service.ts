import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovie } from '../model/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${environment.getMovies}`);
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<IMovie>(`${environment.addMovie}`, movie, {
      headers,
    });
  }

  updateMovie(movie: IMovie): Observable<IMovie> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<IMovie>(
      `${environment.updateMovie}${movie.id}`,
      movie,
      { headers }
    );
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.deleteMovie}${id}`);
  }
}
