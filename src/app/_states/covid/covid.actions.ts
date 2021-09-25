import { CovidItem } from "../../_models/covid-item.model";

export class Populars {
    static readonly type = '[COVID] Get Popular data';
    constructor() { }
}
export class Search {
    static readonly type = '[COVID] Searching data';
    constructor(public text: string) { }
}
export class SetLoading {
    static readonly type = '[COVID] Set Loading';
    constructor(public isLoading: boolean) {}
}
export class AddItem {
    static readonly type = '[COVID] Add New Item';
    constructor(public item: CovidItem) {}
}
export class SetList {
    static readonly type = '[COVID] Set New List';
    constructor(public list: CovidItem[]) {}
}
export class StatusByDate {
    static readonly type = '[COVID] Get Status By Date';
    constructor() { }
}

export class UpdateList {
    static readonly type = '[COVID] Update List';
    constructor() { }
}

export class AddToFavorite {
    static readonly type = '[COVID] Add to Favorite';
    constructor() { }
}