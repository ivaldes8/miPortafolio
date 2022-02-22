import { Component, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './theme/theme.service';
import { SwUpdate } from '@angular/service-worker';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Portafolio';

  isCollapsed = true;
  customClass = 'active';
  toggleSidebar = false;
  collapsed = true;
  public isMenuCollapsed = true;

  toggle(){
    this.toggleSidebar = !this.toggleSidebar;
    if (this.toggleSidebar){
      this.customClass = 'active';
    } else {
      this.customClass = '';
    }
  }

  constructor(private translate: TranslateService, private themeService: ThemeService, private swUpdate: SwUpdate, private languageService: LanguageService){
    translate.setDefaultLang('es');
    this.languageService.setItem('language', 'es')
    console.log(this.translate.getLangs(), 'WAKALA')
  }


  ngOnInit(){
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("New version available. Load New Version?")) {

              window.location.reload();
          }
      });
  }

  this.themeService.setBlueTheme();

}

  selectedLanguage(event:any){
    this.translate.use(event.target.value);
    this.languageService.setItem('language', event.target.value)
  }

  selectTheme(event){
    if(event.target.text == "Dark" || event.target.text == "Oscuro"){
      this.themeService.setDarkTheme();
    }
    if(event.target.text == "Blue" || event.target.text == "Azul"){
      this.themeService.setBlueTheme();
    }
    if(event.target.text == "Ligth" || event.target.text == "Blanco"){
      this.themeService.setLightTheme();
    }
  }

}
