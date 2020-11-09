import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '@stores/material';   // Added

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderModule {}
