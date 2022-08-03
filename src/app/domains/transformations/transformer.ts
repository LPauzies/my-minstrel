import { YoutubeVideo } from "src/app/domains/youtubeVideo";
import { FilterVideo } from "../filterVideo";

export class Transformer {

    constructor() {}

    public static fromJSONtoYoutubeVideos(json: any): any {
        return json.videos.map((e: any) => new YoutubeVideo(e.id, e.title, e.type, e.keywords));
    }

    public static fromJSONtoFilterMacro(json: any): Array<FilterVideo> {
        return Object.keys(json['filters']).map((e: string) => new FilterVideo(e));
    }

    public static fromJSONtoFilterMicro(json: any, type: string): Array<FilterVideo> {
        return json['filters'][type].map((e: string) => new FilterVideo(e));
    }

}