import { YoutubeVideo } from "src/app/domains/youtubeVideo";
import { FilterVideo } from "../filterVideo";

export class Transformer {

    constructor() {}

    public static fromJSONtoYoutubeVideos(json: any): any {
        return json.videos.map((e: any) => new YoutubeVideo(e.id, e.title, e.keywords));
    }

    public static fromJSONtoFilter(json: any, type: string): Array<FilterVideo> {
        return json['filters'][type].map((e: string) => new FilterVideo(e));
    }

}