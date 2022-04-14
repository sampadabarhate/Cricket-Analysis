import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import{HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ChartsComponent } from './dashboard/charts/charts.component';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { StatschartComponent } from './dashboard/statschart/statschart.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DashboardComponent,
    ChartsComponent,
    StatschartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [AuthenticationService,AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
