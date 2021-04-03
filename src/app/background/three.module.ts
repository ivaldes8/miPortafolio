import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeComponent } from './three/three.component';
import { CanvasTutorialComponent } from './canvas-tutorial/canvas-tutorial.component';
import { SkillsComponent } from './skills/skills.component';

@NgModule({
  declarations: [ThreeComponent,CanvasTutorialComponent,SkillsComponent],
  imports: [
    CommonModule
  ],
  exports:[ThreeComponent,SkillsComponent]
})
export class ThreeModule { }
