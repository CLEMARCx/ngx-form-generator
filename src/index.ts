import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';
import { MatSliderModule, MatSelectModule, MatSlideToggleModule, MatTabsModule, MatIconModule, MatButtonModule, MatGridListModule, MatSidenavModule, MatToolbarModule, MatInputModule } from '@angular/material';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { FormElementComponent } from './form-element/form-element.component';

export * from './form-generator/form-generator.component';
export * from './form-element/form-element.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  declarations: [FormGeneratorComponent, FormElementComponent],
  exports: [FormGeneratorComponent, FormElementComponent]
})
export class FormModule { }
