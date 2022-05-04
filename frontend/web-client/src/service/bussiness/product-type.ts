import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../app/management/home/buyer/product-grid/product-grid.component';

@Injectable()
export class ProductTypeService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [
        // "Áo phông", 
        // "Áo khoác", 
        // "Quần bò", 
        // "Quần đùi", 
        // "Bánh ngọt", 
        // "Kẹo chocolate", 
        // "Tủ bếp",
        // "Vợt cầu lông",
        // "Vợt bóng bàn",
        // "Vợt tennis"
    ];

    constructor(private http: HttpClient) { }

    getProductTypes() {
        return this.http.get<any>('assets/products-type.json')
        .toPromise()
        .then(res => <Product[]>res.data)
        .then(data => { return data; });
    }

    generatePrduct(): Product {
        const product: Product =  {
            id: this.generateId(),
            name: this.generateName(),
            description: "Product Description",
            price: this.generatePrice(),
            quantity: this.generateQuantity(),
            category: "Product Category",
            inventoryStatus: this.generateStatus(),
            rating: this.generateRating()
        };

        product.image = product.name?.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
        return product;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75)+1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }
}