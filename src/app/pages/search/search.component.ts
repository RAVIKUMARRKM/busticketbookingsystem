import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, DatePipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  locations$: Observable<any> = new Observable<any[]>;
  masterService = inject(MasterService);
  searchObj: any = {
    fromLocation: '',
    toLocation: '',
    travelDate: ''
  }
  busList: any[] = [];

  ngOnInit(): void {
    this.locations$ = this.masterService.getLocations();
  }

  onSearch() {
    const {fromLocation, toLocation, travelDate} = this.searchObj;
    this.masterService.searchBus(fromLocation, toLocation, travelDate).subscribe((res: any) => {
      this.busList = res;
    })
  }

}
