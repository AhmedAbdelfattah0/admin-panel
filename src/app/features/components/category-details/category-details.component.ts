import { takeUntil } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CommonDialogService } from 'src/app/shared/components/common-dialog/common-dialog.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent extends BaseComponent implements OnInit {
  category: FormControl;
  constructor(
    private commonDialogService: CommonDialogService,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.category = new FormControl(data?.details);

    this.commonDialogService.confirmButtonEmitter
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        if (res) {
          this.updateCategory();
        }
      });
  }

  ngOnInit(): void {}
  updateCategory() {
    this.categoriesService.updateCategory(this.category.value).subscribe({
      next: (v) => {
        this.commonDialogService.confirmButtonEmitter.next(false),
        this.categoriesService.getCategoriesList().subscribe()
      },
      error: (e) => this.commonDialogService.confirmButtonEmitter.next(false),
    })
  }
}
