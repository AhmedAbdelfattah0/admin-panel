import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { CommonDialogService } from 'src/app/shared/components/common-dialog/common-dialog.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent extends BaseComponent implements OnInit {
  category: FormControl;
  constructor(
    private commonDialogService: CommonDialogService,
    private categoriesService: CategoriesService
  ) {
    super();
    this.category = new FormControl('');

    this.commonDialogService.confirmButtonEmitter
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        if (res) {
          this.addCategory();
        }
      });
  }

  ngOnInit(): void {}
  addCategory() {
    this.categoriesService.addCategory(this.category.value).subscribe({
      next: (v) => {
        this.commonDialogService.confirmButtonEmitter.next(false),
          this.categoriesService.getCategoriesList().subscribe();
      },
      error: (e) => this.commonDialogService.confirmButtonEmitter.next(false),
    });
  }
}
