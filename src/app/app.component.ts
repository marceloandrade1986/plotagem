import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  view: [number, number] = [1200, 400];
  gradient: boolean = true;
  animations: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  populationData: any;
  countryAmount: any;
  title: string = "Meplis Code Challenge";
  today: number = Date.now();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries/population').subscribe(res => {
      let countryPopulation = res.data.splice(72, 50);
      let dataTreatment: any[] = [];
      
      this.countryAmount = countryPopulation.length;

      countryPopulation.forEach((element: any) => {
        let last = element.populationCounts[element.populationCounts.length - 1]
        let items: any = new Object();

        items.name = element.country;
        items.value = last.value;

        dataTreatment.push(items)
      });

      this.populationData = dataTreatment;
    })
  }

  get single() {
    return this.populationData;
  }

  refresh() {
    window.location.reload();
  }

  onSelect(populationData: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(populationData)));
  }

  onActivate(populationData: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(populationData)));
  }

  onDeactivate(populationData: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(populationData)));
  }
}