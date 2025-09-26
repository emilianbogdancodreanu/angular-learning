import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'bot-template-form-controls',
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form-controls.html',
  styleUrls: ['./template-form-controls.css'],
})
export class TemplateFormControls implements OnInit {
  textInput: string = '';
  numericInput: number = 0;
  stringInput: string = '';
  numericSelect: number = 0;
  checkboxInput: boolean = false;
  radioInput: number | null = null;

  selectOptions: any[] = [
    { text: 'Option One', value: 1 },
    { text: 'Option Two', value: 2 },
  ];
  constructor() {}

  ngOnInit(): void {}

  getType(value: any) {
    if (value === null || value === undefined) return '';

    console.log('ns', this.numericSelect);
    return typeof value;
  }
}
