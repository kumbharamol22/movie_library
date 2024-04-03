import { Directive, ElementRef, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimValue]'
})
export class TrimValueDirective {
  constructor(
    private elementRef: ElementRef,
    @Self() private ngControl: NgControl
  ) {}

  @HostListener('blur')
  onBlur() {
    let value = this.elementRef.nativeElement.value;
    this.ngControl?.control?.patchValue(value.replace(/\s+/g, ' ').trim());
  }
}
