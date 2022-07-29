import { YoutubeVideo } from "src/app/domains/youtubeVideo";
import { FilterVideo } from "../filterVideo";

export class Transformer {

    constructor() {}

    public static fromJSONtoYoutubeVideos(json: any): any {
        return json.videos.map((e: any) => new YoutubeVideo(e.id, e.title, e.keywords));
    }

    public static fromJSONtoFilter(json: any): Array<FilterVideo> {
        return json.filters.map((e: string) => new FilterVideo(e));
    }
}