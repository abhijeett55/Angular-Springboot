import { Component, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-dropdown',
  imports: [CommonModule],
  templateUrl: './search-dropdown.component.html',
  styleUrl: './search-dropdown.component.css'
})
export class SearchDropdownComponent {
  dropdownOpen = false;
  selectedOption = 'All';
  options = ['All', 'Fresh', 'Pharmacy', 'Books', 'Watches', 'Under 2000', 'Under 1000', 'Under 500' , 'Audio', 'Baby', 'Software', 'Electronics', 'Utensils', 'Toys & Games', 'Home & Kitchen'];

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    this.cdr.detectChanges(); // force view update
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.dropdownOpen = false;
    this.cdr.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
      this.cdr.detectChanges();
    }
  }
}

