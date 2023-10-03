import { CommonDialogService } from './../../../shared/components/common-dialog/common-dialog.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../services/products.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Product } from './products.entity';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'category','actions'];
  dataSource:MatTableDataSource<Product>
  productsArray: Product[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productsService: ProductsService,private commonDialogService:CommonDialogService) {
    super();
    this.productsService
      .getProductsList()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        this.productsArray = res;
        this.dataSource = new MatTableDataSource(this.productsArray)
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(item:Product){
    this.productsService
    .deleteProduct(item.id)
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe((res) => {
      console.log(res);

    })

  }

  viewDetails(item:Product){
    this.commonDialogService.open({
      data: {
        component: ProductDetailsComponent,
        title: item.title,
        details:item
      },
    })
  }
}
