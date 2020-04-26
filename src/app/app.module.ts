import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import uaLocale from '@angular/common/locales/uk';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { AlertService } from './admin/shared/services/alert.service';
import { environment } from '../environments/environment';

registerLocaleData(uaLocale, 'ua');

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [INTERCEPTOR_PROVIDER, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
