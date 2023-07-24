import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudService } from './services/crud.service';
import { DisplayComponent } from './component/display/display.component';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './component/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DisplayComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: '', component: DisplayComponent },
      {
        path: 'update/:id',
        component: UpdateComponent,
      },
    ]),
  ],
  providers: [CrudService],
  bootstrap: [AppComponent],
})
export class AppModule {}
