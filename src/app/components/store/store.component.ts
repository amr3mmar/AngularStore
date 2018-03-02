import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import * as sweetalert from 'sweetalert';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'store',
  styleUrls: ['./store.component.css'],
  templateUrl: './store.component.html',
})
export class StoreComponent {
  displayedColumns = ['name', 'price', 'createdAt', 'updatedAt', 'sellerName', '_id'];
  dataSource: MatTableDataSource<ProductData>;
  products: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient
  ) {
    this.getProducts();
  }

  delete(id){
    this.http.delete('http://localhost:3000/api/product/deleteProduct/'+id)
    .subscribe(res=>{
      let product = res.data;
        if (product) {
          this.getProducts();
          sweetalert("Success",
          "product deleted successfully",
          "success");
        }else{
          console.log('server might be down');
        }
      }
    );
  }

  getProducts(){
    var user = JSON.parse(localStorage.getItem('user'));
    var username = user.username;
    this.http.get('http://localhost:3000/api/product/getProductByUsername/'+username)
    .subscribe(res=>{
      let products = res.data;
        if (products) {
            this.products = products;
            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.products);
            /**
           * Set the paginator and sort after the view init since this component will
           * be able to query its view for the initialized paginator and sort.
           */
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.products);
        }else{
          console.log('server might be down');
        }
      }
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface ProductData {
  _id: string;
  name: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  sellerName: string;
}
