import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GenericChartService {

  constructor(private http: HttpClient) { }

  async get(requestParam: any) {
    const headers = requestParam.headers ? new HttpHeaders(requestParam.headers) : new HttpHeaders();
    const options = {
      headers: headers
    };
    return this.http.get(requestParam.url, options).toPromise()
      .then((data: any) => {
        let result: any = data;
        if (result.responseCode === "OK") {
          return result.result.data;
        } else {
          return data;
        }
      });
  }

  async post(requestParam: any) {
    const headers = requestParam.headers ? new HttpHeaders(requestParam.headers) : new HttpHeaders();
    const options = {
      headers: headers
    };
    return this.http.post(requestParam.url,requestParam?.entityType, options).toPromise()
      .then((data: any) => {
        let result: any = data;
        if (result.responseCode === "OK") {
          return result.result.data;
        } else {
          return data;
        }
      });
  }

  transformApiResponse(response: any[], legends: any): any {
    const labels: string[] = [];
    let dataset: any = [];
    response.forEach(item => {
      const startDateEpoch = Number(item.startdate);
      const endDateEpoch = Number(item.enddate);
      const startDate :any = startDateEpoch ? new Date(startDateEpoch) : null;
      const endDate :any = endDateEpoch ? new Date(endDateEpoch) : null;
      const formattedStartDate = startDate
        ? moment.unix(startDate).format('DD/MM/YY')
        : 'Invalid Date';
      const formattedEndDate = endDate
        ? moment.unix(endDate).format('DD/MM/YY')
        : 'Invalid Date';
      labels.push(formattedStartDate);
      for (const legend of legends) {
        const key: any = Object.keys(legend)[0];
        const label = legend[key];
        let existingDataset = dataset.find((ds:any) => ds.label === label);
        if (item[key] && !isNaN(item[key])) {
          const value = Number(item[key]);
          if (value !== 0) {
            if (existingDataset) {
              existingDataset?.data.push(value);
            } else {
              dataset.push({
                label: label,
                data: [value],
                barPercentage: 1,
                maxBarThickness: 50,
                backgroundColor: legend.backgroundColor || this.getRandomColor(),
              });
            }
        }
      }
      }
    });
    return {
      labels,
      datasets: dataset
    };
  }
  private getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }
}





