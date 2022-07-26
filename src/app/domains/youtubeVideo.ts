export class YoutubeVideo {

    _id: string;
    _description: string;
    _keywords: Array<string>;

    constructor(id: string, description: string, keywords: Array<string>) {
        this._id = id;
        this._description = description;
        this._keywords = keywords;
    }

    get id(): string { return this._id }
    get thumbnail(): string { return `https://img.youtube.com/vi/${this._id}/0.jpg` }
    get description(): string { return this._description }
    get keywords(): Array<string> { return this._keywords }

    getDisplayKeywords(): string {
        return this._keywords.map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(", ")
    }
}