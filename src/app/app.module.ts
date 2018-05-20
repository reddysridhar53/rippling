import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UtilityService } from './services/utils.service';
import { AppComponent } from './components/root/app.component';
import { HomeComponent } from './components/home/home.component';
import { SeatsComponent } from './components/seats/seats.component';
import { ReservedSeatsComponent } from './components/seats/reserved-seats.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SeatsComponent,
        ReservedSeatsComponent
    ],
    providers: [
        UtilityService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
