import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng8SelectComponent } from './ng8-select.component';
import { Ng8SelectOptionComponent } from '../ng8-select-option/ng8-select-option.component';
import { Ng8SelectService } from '../ng8-select.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [Ng8SelectComponent, Ng8SelectOptionComponent],
  providers: [Ng8SelectService],
  exports: [Ng8SelectComponent, Ng8SelectOptionComponent]
})
export class Ng8SelectModule { }
