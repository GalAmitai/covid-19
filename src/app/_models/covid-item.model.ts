interface CovidItemDTO {
    code: string;
    country: string;
    confirmed: Number;
    deaths: Number;
    recovered: Number;
    isFavorite: Boolean;
}

export class CovidItem {
    code: string;
    country: string;
    confirmed: Number;
    deaths: Number;
    recovered: Number;
    isFavorite: Boolean;

    constructor(obj: CovidItem) {
        this.code = obj.code;
        this.country = obj.country;
        this.confirmed = obj.confirmed;
        this.deaths = obj.deaths;
        this.recovered = obj.recovered;
        this.isFavorite = obj.isFavorite;
    }

    static create(dto: CovidItemDTO): CovidItem | null {
        let list: CovidItem | null = null;
        if (dto) {
            list = new CovidItem({
                code: dto.code,
                country: dto.country,
                confirmed: dto.confirmed,
                deaths: dto.deaths,
                recovered: dto.recovered,
                isFavorite: false
            });
        }
        return list;
    }

    static createResult(dto: any) {
        if (dto) {
            return new CovidItem({
                code: dto.code,
                country: dto.country,
                confirmed: dto.provinces[0].confirmed,
                deaths: dto.provinces[0].deaths,
                recovered: dto.provinces[0].active,
                isFavorite: false
            });
        }
    }
}