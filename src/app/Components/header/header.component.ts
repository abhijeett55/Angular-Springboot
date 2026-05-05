import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, SearchDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  locationText: string = '';

  async updateLocation(): Promise<void> {
    if( 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude , longitude } = position.coords;
          const locationName = await this.getLocationName(latitude, longitude);

          if(locationName) {
            this.locationText = locationName;
          } else {
            this.fallbackManualLocation();
          }
        },
        (error) => {
          console.log('Geolocation error: ', error);
          this.fallbackManualLocation();
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      this.fallbackManualLocation();
    }
  }


  private async getLocationName(lat: number, lon: number) : Promise<string | null> {
    try {
      const response = await fetch(
         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
        );

      const data = await response.json();
      const address = data.address;
      const city = address.city || address.town || address.village || address.muncipality;
      const postcode = address.postcode;


      if(city && postcode) {
        return `${city} ${postcode}`;
      } else if(city) {
        return city;
      } else if(postcode) {
        return postcode;
      }
      return null;
      } catch(err) {
        console.error('Reverse geocoding failed:', err);
        return null;
      }
   }


   private fallbackManualLocation(): void {
    const newLocation = prompt('Enter your location (e.g., City postalCode):', this.locationText);
    if(newLocation && newLocation.trim()) {
      this.locationText = newLocation.trim();
    }
   }
}