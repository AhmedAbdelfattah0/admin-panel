import { takeUntil } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonDialogService } from 'src/app/shared/components/common-dialog/common-dialog.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends BaseComponent implements OnInit {
  productForm: FormGroup;
  constructor(
    private commonDialogService: CommonDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService:ProductsService
  ) {
    super();
    this.productForm = new FormGroup({
      title: new FormControl(this.data?.details.title),
      price: new FormControl(this.data?.details.price),
      category: new FormControl(this.data?.details.category),
      description: new FormControl(this.data?.details.description),
      image: new FormControl(this.data?.details.image),
    });

    this.commonDialogService.confirmButtonEmitter
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        if (res) {
          this.updateProduct();
        }
      });
  }

  ngOnInit(): void {}

  updateProduct() {
    let productData = {
      id: this.data?.details.id,
      ...this.productForm.value,
    };

    this.productsService.updateProduct(productData).subscribe({
      next: (v) =>this.commonDialogService.confirmButtonEmitter.next(false),
      error: (e) =>this.commonDialogService.confirmButtonEmitter.next(false),

    }
  )}
}
