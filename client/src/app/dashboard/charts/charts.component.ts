import { Component, OnInit,Input } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  performance :any ={}
  chart : any;
  linechart : any
 
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.auth.showPerformance().subscribe(res=>{
      this.performance = res.T20
      console.log(this.performance)
      this.chart = document.getElementById('linechart')
    Chart.register(...registerables);
    this.loadChart(this.performance);
    },err=>{console.log(err)})
    
  }
  loadChart(digits : any={}){
    if(this.linechart instanceof Chart)
    {
      this.linechart.destroy();
    }
     this.linechart = new Chart(this.chart,{
      type:'line',
      data:{
        datasets:[{
          data:[digits.Runs1,digits.Runs2,digits.Runs3,digits.Runs4,digits.Runs5],
          label:"Runs",
          backgroundColor:"grey",
          pointBackgroundColor: "black",
          pointRadius:5,
          tension:0.1,
          borderColor:"grey",
        }],
        labels:[digits.Year1,digits.Year2,digits.Year3,digits.Year4,digits.Year5],
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
      
    })
  
  }
   T20clicked()
  {
    this.auth.showPerformance().subscribe(res=>{
      this.performance = res.T20
      this.chart = document.getElementById('linechart')
    Chart.register(...registerables);
    this.loadChart(this.performance);
    },err=>{console.log(err)})
  }
  OneDayclicked()
  {
    this.auth.showPerformance().subscribe(res=>{
      this.performance = res.OneDay
      this.chart = document.getElementById('linechart')
    Chart.register(...registerables);
    this.loadChart(this.performance);
    },err=>{console.log(err)})
  }
  Testclicked()
  {
    this.auth.showPerformance().subscribe(res=>{
      this.performance = res.Test
      this.chart = document.getElementById('linechart')
    Chart.register(...registerables);
    this.loadChart(this.performance);
    },err=>{console.log(err)})
  }
}
