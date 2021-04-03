import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasTutorialComponent } from './background/canvas-tutorial/canvas-tutorial.component';
import { SkillsComponent } from './background/skills/skills.component';
import { ThreeComponent } from './background/three/three.component';
import { AboutMeComponent } from './sidebar/about-me/about-me.component';
import { EducationComponent } from './sidebar/education/education.component';
import { HabilidadesComponent } from './sidebar/habilidades/habilidades.component';
import { ProjectsComponent } from './sidebar/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: AboutMeComponent
  },
  {
    path: 'aboutme',
    component: AboutMeComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'skills',
    component: HabilidadesComponent
  },
  {
    path: 'canvasTutorial',
    component: CanvasTutorialComponent
  },
  {
    path: 'three',
    component: ThreeComponent
  },
  {
    path: 'skillsEsphere',
    component: SkillsComponent
  },
  {
    path:'**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
