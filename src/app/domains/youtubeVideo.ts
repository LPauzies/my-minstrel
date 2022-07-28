export class YoutubeVideo {

    _id: string;
    _title: string;
    _keywords: Array<string>;

    constructor(id: string, title: string, keywords: Array<string>) {
        this._id = id;
        this._title = title;
        this._keywords = keywords;
    }

    get id(): string { return this._id }
    get link(): string { return `https://www.youtube.com/watch?v=${this._id}` }
    get thumbnail(): string { return `https://img.youtube.com/vi/${this._id}/0.jpg` }
    get title(): string { return this._title }
    get keywords(): Array<string> { return this._keywords }

    getDisplayKeywords(): string {
        return this._keywords.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(", ")
    }
}