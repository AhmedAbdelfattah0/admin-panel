import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriesService } from '../../services/categories.service';
import { CommonDialogService } from 'src/app/shared/components/common-dialog/common-dialog.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryDetailsComponent } from '../../components/category-details/category-details.component';
import { CreateCategoryComponent } from '../../components/create-category/create-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent implements OnInit {

  displayedColumns: string[] = ['category','actions'];
  dataSource: MatTableDataSource<string>;
  categoriesArray: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoriesService: CategoriesService,
    private commonDialogService: CommonDialogService
  ) {
    super();
    this.categoriesService
    .getCategoriesList()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        this.categoriesArray = res;
        this.dataSource = new MatTableDataSource(this.categoriesArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: String, filter: string) => {
          return data.includes(filter);
      };
      });


  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(item: string) {
    this.categoriesService
      .deleteCategory(item)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res) => {
        console.log(res);
      });
  }

  viewDetails(item: string) {
    this.commonDialogService.open({
      data: {
        component: CategoryDetailsComponent,
        title: item,
        details: item,
      },
    });
  }
  addCategory () {
    this.commonDialogService.open({
      data: {
        component: CreateCategoryComponent,
      },
    });
  }
}
