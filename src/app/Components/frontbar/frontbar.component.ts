import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface navItem {
  name: string;
  link?: string;
}

@Component({
  selector: 'app-frontbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './frontbar.component.html',
  styleUrl: './frontbar.component.css'
})
export class FrontbarComponent {

    categories: navItem[] = [
    { name: 'All', link: '/all' },
    { name: 'Fresh', link: '/fresh' },
    { name: 'MX Player', link: '/mx-player' },
    { name: 'Sell', link: '/sell' },
    { name: 'Bestsellers', link: '/bestsellers' },
    { name: 'Mobiles', link: '/mobiles' },
    { name: "Today's Deals", link: '/deals' },
    { name: 'Customer Service', link: '/customer-service' },
    { name: 'New Releases', link: '/new-releases' },
    { name: 'Prime', link: '/prime' },
    { name: 'Amazon Pay', link: '/amazon-pay' },
    { name: 'Electronics', link: '/electronics' },
    { name: 'Fashion', link: '/fashion' },
    { name: 'Home & Kitchen', link: '/home-kitchen' },
    { name: 'Computers', link: '/computers' },
    { name: 'Books', link: '/books' },
    { name: 'Toys & Games', link: '/toys-games' }
  ];

  onNavClick(category: navItem) {
    console.log(`Navigating to ${category.name}`);
  }

}
