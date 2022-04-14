import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-statschart',
  templateUrl: './statschart.component.html',
  styleUrls: ['./statschart.component.css']
})
export class StatschartComponent implements OnInit {
  performance :any ={}
  chart : any;
  statschart : any

  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getStatistics().subscribe(res=>{
      this.performance =res
      this.chart = document.getElementById('statschart')
      Chart.register(...registerables);
      this.loadChart(this.performance);
    },err=>{console.log(err)})
    
  }
  loadChart(details : any ={}){
     this.statschart = new Chart(this.chart,{
      type:'doughnut',
      data:{
        datasets:[{
          data:[details.Offleg,details.Onleg],
          backgroundColor:["grey","black"],
          hoverBackgroundColor:["grey","black"],
          hoverBorderColor:["grey","black"]
        }],
        labels:['On-leg','Off-leg'],
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        radius:55,
        cutout:45
      }
      
    })
  
  }

}
