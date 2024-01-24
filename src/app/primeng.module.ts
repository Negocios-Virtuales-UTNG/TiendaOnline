import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

const modPrimeNg: any = [
  ButtonModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modPrimeNg
  ],
  exports: [
    modPrimeNg
  ]
})
export class PrimengModule { }
