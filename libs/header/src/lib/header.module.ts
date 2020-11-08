import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '@stores/material';   // Added

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
