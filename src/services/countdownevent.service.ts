import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CountdownEventService {
    private fooSubject = new Subject<any>();

    publishCountdown(data: any) {
        this.fooSubject.next(data);
    }

    getCountdown(): Subject<any> {
        return this.fooSubject;
    }
}