import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { CovidState } from "./covid/covid.state";

@NgModule({
    declarations: [],
    imports: [
      NgxsModule.forFeature([
        CovidState,
      ]),
    ]
  })
  export class StatesModule { }