import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutosubmitEventService {
    private fooSubject = new Subject<any>();

    publish(data: any) {
        this.fooSubject.next(data);
    }

    getObservable(): Subject<any> {
        return this.fooSubject;
    }
}