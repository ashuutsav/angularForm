import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent {
  constructor(private crudService: CrudService) {
    this.crudService.getDetails().subscribe((res) => {
      this.details = res;
      console.log(this.details);
    });
  }

  details: any;

  onDelete(code: any) {
    this.crudService.removeDetails(code).subscribe((res) => {
      // this.details = res;
      this.details = this.details.filter((detail: any) => detail._id !== code);
      console.log(res);
    });
  }
}
