import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { PetComponentComponent } from '../components/renderer/pet-component/pet-component.component';
import { PetComponentRendererComponent } from '../components/renderer/pet-component-renderer/pet-component-renderer.component';


@NgModule({
  imports: [
    PetComponentComponent,
    PetComponentRendererComponent
  ],
  declarations: [
   
  ],
})
export class ComponentModule {}
