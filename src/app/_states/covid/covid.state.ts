import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { finalize, map, take } from "rxjs/operators";
import { CovidItem } from "../../_models/covid-item.model";
import { CovidService } from "../../_services/covid.service";
import { AddItem, Populars, Search, SetList, SetLoading } from "./covid.actions";

interface CovidStateModel {
    list: CovidItem[],
    searchResult: CovidItem[],
    isLoading: Boolean
}

const initialState = (): CovidStateModel => ({
    list: [],
    searchResult: [],
    isLoading: false
});

@State<CovidStateModel>({
    name: 'Covid',
    defaults: initialState()
})

@Injectable()
export class CovidState {

    constructor(
        private covidService: CovidService
    ) { }

    @Selector([CovidState])
    static covidList({ list }: CovidStateModel): CovidItem[] {
        return list;
    }

    @Selector([CovidState])
    static searchList({ searchResult }: CovidStateModel): CovidItem[] {
        return searchResult;
    }

    @Selector([CovidState])
    static isLoading({ isLoading }: CovidStateModel): Boolean {
        return isLoading;
    }

    @Action(Search)
    Search(ctx: StateContext<CovidStateModel>, { text }: Search): any {
        if(!text.length) return;

        ctx.setState({...ctx.getState(), searchResult: []})
        ctx.dispatch(new SetLoading(true));
        this.covidService.getDataByCountry(text).pipe(
            take(1),
            map((res: any) => {
                if(res.message) return;
                const transform = res?.map(e => CovidItem.createResult(e));
                ctx.setState({...ctx.getState(), searchResult: transform})
            }),
            finalize(() => {
                ctx.dispatch(new SetLoading(false));
            })
        ).subscribe();
    }

    @Action(SetLoading)
    SetLoading(ctx: StateContext<CovidStateModel>, { isLoading }: CovidStateModel): any {
        ctx.setState({ ...ctx.getState(), isLoading });
    }

    @Action(SetList)
    SetList(ctx: StateContext<CovidStateModel>, { list }: CovidStateModel): any {
        ctx.setState({ ...ctx.getState(), list });
    }

    @Action(AddItem)
    AddItem(ctx: StateContext<CovidStateModel>, newItem: any): any {
        const oldList = ctx.getState().list;
        const transform = CovidItem.create(newItem.item[0]);
        const newList = [...oldList, transform]
        ctx.setState({ ...ctx.getState(), list: newList });
    }

    @Action(Populars)
    Populars(ctx: StateContext<CovidStateModel>): any {
        ctx.dispatch(new SetLoading(true));
        const { list } = ctx.getState();
        if(list.length) {
            ctx.dispatch(new SetLoading(false));
            return;
        }
        const data = this.covidService.getPopulars();
        data.subscribe(observables => {
            observables.subscribe(item => {
                if(item === 'end') {
                    ctx.dispatch(new SetLoading(false));
                } else {
                    ctx.dispatch(new AddItem(item))
                }
            });
        })
    }

}
