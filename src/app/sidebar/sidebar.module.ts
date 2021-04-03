import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './about-me/about-me.component';

import { ProjectsComponent } from './projects/projects.component';
import { EducationComponent } from './education/education.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ThreeModule } from '../background/three.module';
import { TranslateModule } from '@ngx-translate/core';





@NgModule({
  declarations: [AboutMeComponent,ProjectsComponent, EducationComponent, HabilidadesComponent],
  imports: [
    CommonModule,
    ThreeModule,
    TranslateModule
  ]
})
export class SidebarModule { }
