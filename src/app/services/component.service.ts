import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private reloadSubject = new Subject<void>();
  reload$ = this.reloadSubject.asObservable();

  reloadComponents() {
    this.reloadSubject.next();
  }
}
