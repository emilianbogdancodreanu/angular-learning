import { Component, forwardRef, Provider } from '@angular/core';
import { profileIconNames } from './profile-icon-names';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelector),
  multi: true
}

@Component({
  selector: 'bot-profile-icon-selector',
  imports: [CommonModule],
  templateUrl: './profile-icon-selector.html',
  styleUrl: './profile-icon-selector.css',
  providers: [PROFILE_ICON_VALUE_ACCESSOR]
})
export class ProfileIconSelector implements ControlValueAccessor {
  profileIcons = profileIconNames;
  showAllIcons: boolean = true;
  selectedIcon!: string | null;
  
  private onChange!: Function;
  private onTouch!: Function;

  writeValue(icon: string | null): void {
    this.selectedIcon = icon;
    if (icon && icon !== '')
      this.showAllIcons = false;
    else
      this.showAllIcons = true;
  }

  registerOnChange(fn: Function): void {
    this.onChange = (icon:string) => { fn(icon); };
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  iconSelected(icon: string) {
    this.selectedIcon = icon;
    this.showAllIcons = false;
    this.onChange(icon);
  }
}
