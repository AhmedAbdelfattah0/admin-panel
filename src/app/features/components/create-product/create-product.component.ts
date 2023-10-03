import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CommonDialogService } from 'src/app/shared/components/common-dialog/common-dialog.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent implements OnInit {

  productForm: FormGroup;
  categories: String[];
  constructor(
    private commonDialogService: CommonDialogService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
    super();
    this.productForm = new FormGroup({
      title: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
    });

    this.commonDialogService.confirmButtonEmitter
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        if (res) {
          this.addProduct();
        }
      });

    this.categoriesService
      .getCategoriesList()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        this.categories = res;
      });
  }

  ngOnInit(): void {}

  addProduct() {

    this.productsService.addProduct(this.productForm.value).subscribe({
      next: (v) => {
        this.commonDialogService.confirmButtonEmitter.next(false),
        this.productsService.getProductsList().subscribe()
      },
      error: (e) => this.commonDialogService.confirmButtonEmitter.next(false),
    });
  }
}
