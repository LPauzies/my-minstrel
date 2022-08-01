import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { Transformer } from 'src/app/domains/transformations/transformer';
import { FilterVideo } from '../domains/filterVideo';
import { YoutubeVideo } from '../domains/youtubeVideo';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    static DATA: Array<YoutubeVideo> = [];
    static FILTERS_MACRO: Array<FilterVideo> = [];
    static FILTERS_MICRO: Array<FilterVideo> = [];

    private dataSubject = new BehaviorSubject<Array<YoutubeVideo>>(DataService.DATA);
    private currentData = this.dataSubject.asObservable();

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpClient.get(`./assets/data/data.json`).subscribe(json => this.dataSubject.next(Transformer.fromJSONtoYoutubeVideos(json)));
    }

    getData(): Observable<Array<YoutubeVideo>> {
        return this.currentData;
    }

    getFilters(): Observable<any> {
        return this.httpClient.get(`./assets/data/filters.json`);
    }
}