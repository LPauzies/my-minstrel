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

    static DATA: Array<YoutubeVideo> = []
    static FILTERS: Array<FilterVideo> = []

    private dataSubject = new BehaviorSubject<Array<YoutubeVideo>>(DataService.DATA);
    private currentData = this.dataSubject.asObservable();
    private filterMusicSubject = new BehaviorSubject<Array<FilterVideo>>(DataService.FILTERS);
    private currentMusicFilters = this.filterMusicSubject.asObservable();
    private filterAmbientSubject = new BehaviorSubject<Array<FilterVideo>>(DataService.FILTERS);
    private currentAmbientFilters = this.filterAmbientSubject.asObservable();

    constructor(
        private httpClient: HttpClient
    ) {
        this.httpClient.get(`./assets/data/data.json`).subscribe(json => this.dataSubject.next(Transformer.fromJSONtoYoutubeVideos(json)));
        this.httpClient.get(`./assets/data/filters.json`).subscribe(json => this.filterMusicSubject.next(Transformer.fromJSONtoFilter(json, "music")));
        this.httpClient.get(`./assets/data/filters.json`).subscribe(json => this.filterAmbientSubject.next(Transformer.fromJSONtoFilter(json, "ambient")));
    }

    getData(): Observable<Array<YoutubeVideo>> {
        return this.currentData;
    }

    getMusicFilters(): Observable<Array<FilterVideo>> {
        return this.filterMusicSubject;
    }

    getAmbientFilters(): Observable<Array<FilterVideo>> {
        return this.filterMusicSubject;
    }
}