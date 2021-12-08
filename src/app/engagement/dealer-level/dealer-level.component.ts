//@ts-nocheck

import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { EngagementService } from 'src/app/_services/engagement.service.js';
import { RadarChart } from '../../charts/radarchart.js';
const IMAGE_EXT_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
const DLRLVLCLR = "#00A0B0";
const CATLVLCLR = "#e86153";
const NATLVLCLR = "#ffc83d";
interface Payload {
  "engagementId": number,
  "dealerId": number,
  "checkListType": number,
  "areas": number[],
  "buckets": number[],
  "nonComplaint"?: boolean
}

@Component({
  selector: 'app-dealer-level',
  templateUrl: './dealer-level.component.html',
  styleUrls: ['./dealer-level.component.scss']
})
export class DealerLevelComponent implements OnInit,OnDestroy {
  @ViewChild('kpidetailssection') kpiSection: ElementRef
  curr_client_eng_id;
  selectedDealer: any;
  processedSalesData: Array<any> = [];
  processedAfterSalesData: Array<any> = [];

  currDealerSales: any = 0;
  currDealerAfterSales: any = 0;
  allDealers: any;
  dealearLevelArray: any[];
  categoryLevelArray: any[];
  nationalLevelArray: any[];
  allKpis: Array<any> = []
  salesDataSet: any = {};
  afterSalesDataSet: any = {};
  processedData: any;
  switch: boolean;
  piedata: { name: string; value: number; }[];
  pieoldId: any = "d_id"
  selectedArea: any;
  radarDataSet: { key: string; values: any[]; }[];
  isChecked: boolean = true;
  afterSales: boolean = false;
  isCheckedcatavg: boolean = true;
  isCheckedntgavg: boolean = true;
  piedynamicId: any = "d_id";
  showLevel: boolean[] = [true, false, false];
  nodataerrmsg = "There is no data for the selected engagement please try with other.";
  flag: boolean = false;
  showNonCompliantKpis: boolean = false
  dropdownAreaList:any = [];
  dropdownBktList:any = [];
  selectedAreas:any = [];
  selectedBkts:any = [];
  dropdownSettings = {};
  currClient: any = {};
  allEvidences: any = [];
  modalEvidences: any = [];
  currRole: string;
  selectedIndex: number;
  loadingDealer:boolean=false;
  payload: Payload = {
    "engagementId": 0,
    "dealerId": 0,
    "checkListType": 0,
    "areas": [],
    "buckets": [],
    "nonComplaint": false
  };
  loadingkpis: boolean;
  event: any;

  // event: EventEmitter<any> = new EventEmitter<any>();

  constructor(private engagementService: EngagementService,private spinner: NgxSpinnerService) {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };

    this.currRole = localStorage.getItem('user_role') || "";


  }

  async ngOnInit() {
    //new implementation----
    this.curr_client_eng_id = 5;
    this.currClient = {"client_pkid":1,"client_name":"Audi","client_registration_date":"2020-10-24T07:25:58.000+00:00"};
    // const result = await this.engagementService.getAllDealers(this.curr_client_eng_id,1);
    // //(result);
    // this.allDealers = result;
    // this.selectedDealer = this.allDealers[0];
    this.switchSales();


    //-------------

    



    // if (this.eventEmitterService.subsVar2 == undefined) {
    //   this.eventEmitterService.subsVar2 = this.eventEmitterService.
    //     invokeDealerLevelComponentFunction.subscribe(() => {
    //       this.downloadExcel2();
    //     });
    // }



  }

  ngOnDestroy(){
    if(this.event){
      this.event.unsubscribe()
    }
      
  }

  selectIndex(index) {
    for (let i = 0; i < this.showLevel.length; i++) {
      if (index == i) {
        continue;
      }
      this.showLevel[i] = false;
    }
    this.showLevel[index] = !this.showLevel[index];
  }

  isImage(name) {
    return (IMAGE_EXT_REGEX).test(name);
  }

  checkIfAllAnsInAAPIsNA(category_bean) {
    let ansArr:any = [];
    let isAllAnsNA = false;
    category_bean.bucket_beans.forEach((bucket_bean) => {
      bucket_bean.question_beans.forEach((question) => {
        ansArr.push(question.answer)
      })
    })
    ////("Array of AAP answers:", ansArr)
    if (ansArr.every(v => v === 'N/A')) {
      isAllAnsNA = true;
      return isAllAnsNA;
    }
    else {
      isAllAnsNA = false
      return isAllAnsNA;
    }
  }

  openModal(kpi) {
    this.modalEvidences = kpi.evidences

  }

   switchSales() {
    this.loadingDealer=true;
    this.spinner.show();
    const result =  this.engagementService.getAllDealers(this.curr_client_eng_id, (this.switch ? 2 : 1)).subscribe(result=>{
      console.log(result);
    this.allDealers = result;
    if(this.allDealers.length>0){
      if (this.selectedDealer && this.allDealers.find(i => i.dealer_name === this.selectedDealer!.dealer_name)) {
        this.selectedDealer = this.allDealers[this.allDealers.indexOf(this.allDealers.find(i => i.dealer_name === this.selectedDealer!.dealer_name))];
      }
      else {
        console.log(this.selectedDealer && this.allDealers.find(i => i.dealer_name === this.selectedDealer!.dealer_name));
        this.selectedDealer = this.allDealers[0];
      }
      this.loadingDealer=false
      this.selectDealer(this.selectedDealer);
    }
    else{
      this.selectedDealer=undefined;
      this.loadingDealer=false;
      this.radarDataSet=[];
    }
    });
    

  }

   selectDealer(dealer) {
    //new implementation
    this.engagementService.getDealerDetails(dealer.dealer_id).subscribe((currentDealerDetails)=>{
      
    this.selectedDealer.investor_name = currentDealerDetails.investor_name;
    this.selectedDealer.dealer_category = currentDealerDetails.dealer_category;

    //get selected dealer's scores. Argument "1" for sales and "2" for aftersales
      this.engagementService.getDealerScores(this.curr_client_eng_id, '1', dealer.dealer_id).subscribe((dealerSalesScore)=>{
        this.engagementService.getDealerScores(this.curr_client_eng_id, '2', dealer.dealer_id).subscribe((dealerAfterSalesScore)=>{
          this.engagementService.getDealerCategoryLevelScore(this.curr_client_eng_id, !this.switch ?"1" :"2", dealer.dealer_category).subscribe((dealerCategoryLevelScore)=>{
            this.engagementService.getDealerNationalLevelScore(this.curr_client_eng_id, !this.switch ?"1" :"2").subscribe((dealerNationalLevelScore)=>{
              this.engagementService.getDealerAreaDetails(this.curr_client_eng_id, !this.switch ?"1" :"2", dealer.dealer_id).subscribe((dealerAreaDetails)=>{
                this.engagementService.getDealerLevelKPIDropDownData(this.curr_client_eng_id, !this.switch ?"1" :"2", dealer.dealer_id).subscribe((kpidropdown)=>{
                  this.spinner.hide();
                  this.selectedDealer.dealerSalesScore = dealerSalesScore;
                  this.selectedDealer.dealerAfterSalesScore = dealerAfterSalesScore;
                  this.selectedDealer.dealerCategoryLevelScore = dealerCategoryLevelScore;
                  this.selectedDealer.dealerNationalLevelScore = dealerNationalLevelScore;
                  this.selectedDealer.kpidropdown = kpidropdown;
                  console.log("DROPDOWN : ", kpidropdown)
              
                  let arr:any = []
                  for (let key in dealerAreaDetails) {
                    //(typeof (dealerAreaDetails[key]))
                    if (typeof (dealerAreaDetails[key]) === 'number' || typeof (dealerAreaDetails[key]) === 'string') {
                      this.selectedDealer[key] = dealerAreaDetails[key]
                    }
                    if (typeof (dealerAreaDetails[key]) === 'object') {
                      arr.push({ 'category_name': this.capitalize(key), ...dealerAreaDetails[key] })
                    }
                  }
              
                  //(arr);
              
                  this.selectedDealer.dealerAreaDetails = arr;
              
                  //("SELECTED DEALER: ", this.selectedDealer)
              
                  //extracting areas
                  const areas = !this.switch ? this.extractAreas(this.selectedDealer.dealerSalesScore) : this.extractAreas(this.selectedDealer.dealerAfterSalesScore)
              
                  //(areas);
              
                  this.piedata = [
                    {
                      name: "Overview",
                      value: 1,
                    }
                  ];
              
                  areas.forEach((i: string) => {
                    this.piedata.push({ name: i, value: 1 })
                  })
              
                  //(this.piedata)
                  this.flag = false;
                  this.hybridPie();
                  this.prepareRadarData("overview");
                  this.getAllAreas();
                  this.onAreaSelect();
                });
              });
            });
          });
        });
      });
    });
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  extractAreas(obj): Array<string> {

    const areas = Object.keys(obj).filter((i: any) => i !== 'score' && i !== 'type').map((i: any) => this.capitalize(i))
    //("AREAS ----------",areas)
    return areas;

  }



  showNonComKpis() {
    this.getAllKPIS()
  }

  async getAllKPIS() {
    this.loadingkpis = true;
    this.allKpis = [];
    this.payload!.checkListType = !this.switch ? 1 : 2;
    this.payload!.dealerId = +this.selectedDealer.dealer_id;
    this.payload!.engagementId = +this.curr_client_eng_id;
    this.payload!.areas = [];
    this.payload!.buckets = [];
    this.selectedAreas.forEach((i:any) => {
      this.payload!.areas.push(i.item_id)
    });
    this.selectedBkts.forEach((i:any) => {
      this.payload!.buckets.push(i.item_id)
    })
    this.payload!.nonComplaint = this.showNonCompliantKpis;

    //("PAYLOAD", this.payload)
    if (this.payload!.buckets.length > 0 && this.payload!.areas.length > 0) {
      this.allKpis = await this.engagementService.getDealerLevelKPIList(this.payload)
      this.allKpis.sort(function (a, b) {
        var keyA = +a.kpi_number,
          keyB = +b.kpi_number;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    }

    console.log("KPIS: ", this.allKpis)
    this.loadingkpis = false;
  }

  toggleKpiSection(element: HTMLElement) {
    this.flag = !this.flag;
    if (this.flag) {
      window.scrollTo()
    }
  }

  onAreaSelect() {
    this.getAllBuckets(this.selectedAreas);
  }

  onBktSelect(event) {

    this.allKpis = [];
    this.getAllKPIS();
  }

  extractKpis(): Array<any> {
    this.allKpis = []

    return this.allKpis
  }

  public round = Math.round;



  getAllAreas() {
    this.dropdownAreaList = [];
    this.selectedAreas = [];
    if (this.selectedDealer!.kpidropdown!.categoryList.length > 0) {
      this.selectedDealer.kpidropdown.categoryList.forEach((cat) => {
        this.dropdownAreaList.push({ item_id: +cat.category_id, item_text: cat.category_name });
        this.selectedAreas.push({ item_id: +cat.category_id, item_text: cat.category_name })
      });
    }
  };

  async getAllBuckets(items) {
    this.dropdownBktList = [];
    this.selectedBkts = [];
    //(items);
    console.log(this.selectedDealer);

    if (this.selectedDealer!.kpidropdown!.bucketList.length) {
      items.forEach(element => {
        this.selectedDealer!.kpidropdown!.bucketList.forEach(bkt => {
          if (element.item_id === +bkt.category_id) {
            //(element.item_id, bkt.category_id)
            this.dropdownBktList.push({ item_id: +bkt.bucket_id, item_text: bkt.description });
            this.selectedBkts.push({ item_id: +bkt.bucket_id, item_text: bkt.description })
          }
        });
      });
    }

    this.getAllKPIS()
  };



  prepareRadarData(selectedArea) {

    //new implementation
    console.log(this.selectedDealer)
    this.dealearLevelArray = []
    this.categoryLevelArray = []
    this.nationalLevelArray = []
    const areas = !this.switch ? this.selectedDealer.dealerSalesScore : this.selectedDealer.dealerAfterSalesScore
    
    //dealer level 
    for (let key in areas) {
      if (selectedArea.toLowerCase() == 'overview') {
        if (key !== 'score' && key !== 'type') {
          this.dealearLevelArray.push({ axis: this.capitalize(key), value: (parseFloat(areas[key].score) ), color: DLRLVLCLR, index: 1 })
        }
      }
      else {
        if (key !== 'score' && key !== 'type') {
          if (key.toLowerCase() === selectedArea.toLowerCase()) {

            Object.keys(areas[key]['buckets']).forEach(element => {
              // const [[attr, value]] = Object.entries(areas[key]['buckets'][element]);
              // console.log("VALUE",value);

              this.dealearLevelArray.push(
                {
                  axis: element,
                  value: (parseFloat(areas[key]['buckets'][element].score) ),
                  color: DLRLVLCLR,
                  index: 1
                }
              )
            });
          }

        }
      }
      //category level
      const catareas = this.selectedDealer.dealerCategoryLevelScore;
      if (selectedArea.toLowerCase() == 'overview') {
        if (key !== 'score' && key !== 'type') {
          this.categoryLevelArray.push({ axis: this.capitalize(key), value: (parseFloat(catareas[key].score) ), color: CATLVLCLR, index: 0 })
        }
      }
      else {
        if (key !== 'score' && key !== 'type') {
          if (key.toLowerCase() === selectedArea.toLowerCase()) {
            Object.keys(catareas[key]['buckets']).forEach(element => {
              const [[attr, value]] = Object.entries(catareas[key]['buckets'][element]);
              this.categoryLevelArray.push(
                {
                  axis: element,
                  value: (parseFloat(catareas[key]['buckets'][element].score) ),
                  color: CATLVLCLR,
                  index: 0
                }
              )
            });
          }

        }
      }
      //national level
      const natareas = this.selectedDealer.dealerNationalLevelScore;
      if (selectedArea.toLowerCase() == 'overview') {
        if (key !== 'score' && key !== 'type') {
          this.nationalLevelArray.push({ axis: this.capitalize(key), value: (parseFloat(natareas[key].score)), color: NATLVLCLR, index: 2 })
        }
      }
      else {
        if (key !== 'score' && key !== 'type') {
          if (key.toLowerCase() === selectedArea.toLowerCase()) {
            Object.keys(natareas[key]['buckets']).forEach(element => {
              const [[attr, value]] = Object.entries(natareas[key]['buckets'][element]);
              this.nationalLevelArray.push(
                {
                  axis: element,
                  value: (parseFloat(catareas[key]['buckets'][element].score) ),
                  color: NATLVLCLR,
                  index: 2
                }
              )
            });
          }

        }
      }

    }

    this.radarDataSet = [
      {
        "key": "Dealer score",
        "values": this.dealearLevelArray
      },
      {
        "key": "Category avg score",
        "values": this.categoryLevelArray
      },
      {
        "key": "National avg score",
        "values": this.nationalLevelArray
      }
    ];
    console.log("RADAR DATA=====", this.radarDataSet);
    this.hybridRadar(this.radarDataSet);
  }

  checkValue(name?) {
    if (name == "d") {
      if (!this.isChecked) {
        this.radarDataSet.splice(this.radarDataSet.findIndex(i => i.key == "Dealer score"), 1);
        // this.radarDataSet[0]={key:"Dealer score",values:[{axis:"",value:null}]}

      }
      else {
        if (this.radarDataSet.findIndex(i => i.key == "Dealer score") == -1) {
          this.radarDataSet.push({ key: "Dealer score", values: this.dealearLevelArray })
          // this.radarDataSet[0]={ key: "Dealer score", values: this.dealearLevelArray }
        }
      }
    } else if (name == "c") {

      if (!this.isCheckedcatavg) {
        this.radarDataSet.splice(this.radarDataSet.findIndex(i => i.key == "Category avg score"), 1);
        // this.radarDataSet[1]={key:"Category avg scoree",values:[{axis:"",value:null}]}
      }
      else {
        if (this.radarDataSet.findIndex(i => i.key == "Category avg score") == -1) {
          this.radarDataSet.push({ key: "Category avg score", values: this.categoryLevelArray });
          // this.radarDataSet[1]={key: "Category avg score", values: this.categoryLevelArray};
        }

      }
    } else if (name == "n") {
      if (!this.isCheckedntgavg) {
        this.radarDataSet.splice(this.radarDataSet.findIndex(i => i.key == "National avg score"), 1);
        // this.radarDataSet[2]={key:"National avg score",values:[{axis:"",value:null}]}
      }
      else {
        if (this.radarDataSet.findIndex(i => i.key == "National avg score") == -1) {
          this.radarDataSet.push({ key: "National avg score", values: this.nationalLevelArray })
          // this.radarDataSet[2]={key: "National avg score", values: this.nationalLevelArray}
        }
      }
    }

    this.hybridRadar(this.radarDataSet);
  }

  //PIE CHART-----------/////
  hybridPie() {
    let self = this;
    // var donutData = [{
    //   name: "Overall",
    //   value: 2.5
    // },
    // {
    //   name: "Manpower",
    //   value: 2.5
    // },
    // {
    //   name: "Infrastructure",
    //   value: 2.5
    // },
    // {
    //   name: "Process",
    //   value: 2.5
    // },
    // ];

    // this.piedata = [
    //   {
    //     name: "Overview",
    //     value: 1,
    //   }
    // ];
    //(this.selectedDealer);

    var screenWidth = 800;
    var screenHeight = 800;

    var margin = {
      left: 20,
      top: 20,
      right: 20,
      bottom: 20
    },
      width = Math.min(screenWidth, 800) - margin.left - margin.right,
      height = Math.min(screenHeight, 800) - margin.top - margin.bottom;

    d3.select('#' + this.pieoldId).remove();
    d3.select('#piechart').append('div').attr('id', this.piedynamicId).attr('class', '');
    const svg = d3.select("#" + this.piedynamicId)
      .append('svg')
      .attr("width", (width + margin.left + margin.right))
      .attr("height", (height + margin.top + margin.bottom))
      .append("g").attr("class", "wrapper")
      .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    // //("PIEDATA: ", this.piedata)
    var donutData:any = this.piedata;
    //Create a color scale
    var colorScale = d3.scaleOrdinal()
      .domain([1, 3.5, 6])
      .range(["#f97324"])

    // helper function

    //Create an arc function   
    var arc:any = d3.arc()
      .innerRadius(width * 0.90 / 2)
      .outerRadius(width * 0.95 / 2 + 30);
    //Turn the pie chart 90 degrees counter clockwise, so it starts at the left	
    var pie = d3.pie()
      .startAngle(180 * Math.PI / 180)
      .endAngle(0 * Math.PI / 180 + 2 * Math.PI)
      .value((d: any) => { return d.value; })
      .padAngle(.01)
      .sort(null);
    svg.selectAll(".donutArcs")
      .data(pie(donutData))
      .enter().append("path")
      .attr("class", "donutArcs")
      .attr("d", arc)
      .style("pointer-events", "visible")
      .style("cursor", "pointer")
      .style("fill", "#fff")
      .on("click", function (d:any) {
        self.selectedArea = d.data.name;
        self.prepareRadarData(self.selectedArea);
        d3.selectAll('.donutArcs')
          .style("fill", (d:any, i:any):any => {
            if (i === 7) return "#fff"; //Other
            else return colorScale(i);
          })
          .attr("d",d3.arc()
          .innerRadius(width * 0.90 / 2)
          .outerRadius(width * 0.95 / 2 + 30))
        d3.select(this)
          .style("fill", (d, i) => {
            return "d21";
          }).attr("d", 
              d3.arc()
                .innerRadius(width * 0.88 / 2)
                .outerRadius(width * 0.97 / 2 + 30)
            )
      })
      .style("fill", (d, i):any => {
        if (i === 7) return "#fff"; //Other
        else return colorScale(i);
      })
      .each(function (d, i) {
        if (i == 0) {
          d3.select(this).style("fill", (d, i) => {
            return "d21";
          })
        }

      })


      .text((d: any, i):any => {
        // // 
        if (i == 0) {
          this.selectedArea = d.data.name;
        }
      })
      .each(function (d, i) {
        //Search pattern for everything between the start and the first capital L
        var firstArcSection = /(^.+?)L/;

        //Grab everything up to the first Line statement
        var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
        //Replace all the comma's so that IE can handle it
        newArc = newArc.replace(/,/g, " ");

        //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
        //flip the end and start position
        //("END ANGLE: ", d.endAngle)
        if (d.endAngle <= 270 * Math.PI / 180) {
          var startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
            middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
            endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
          //Flip the direction of the arc by switching the start en end point (and sweep isAnsNo)
          //of those elements that are below the horizontal line
          var newStart = endLoc.exec(newArc)[1];
          var newEnd = startLoc.exec(newArc)[1];
          var middleSec = middleLoc.exec(newArc)[1];

          //Build up the new arc notation, set the sweep-isAnsNo to 0
          newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
        } //if

        //Create a new invisible arc that the text can flow along
        svg.append("path")
          .attr("class", "hiddenDonutArcs")
          .attr("id", "donutArc" + i)
          .attr("d", newArc)

          .style("fill", "none")
        // .style("pointer-events", "visible")

        // .style("fill", "#444")
        // .on("click", function (d) {
        //   // // 
        // })

      })

    //Append the label names on the outside
    svg.selectAll(".donutText")
      .data(pie(donutData))
      .enter().append("text")
      .attr("class", "donutText")
      //Move the labels below the arcs for those slices with an end angle greater than 90 degrees
      .attr("dy", function (d, i) {
        return (d.endAngle <= 270 * Math.PI / 180 ? -20 : 30);
      })

      .append("textPath")
      .attr("startOffset", "50%")
      .style("text-anchor", "middle")
      .style("fill", "#fff")
      .attr("xlink:href", function (d, i) {
        return "#donutArc" + i;
      })
      .text((d: any) => {
        return d.data.name;
      })

  }
  // RADAR CHART ----- /////
  hybridRadar(rdata) {
    // let data =[
    //   {
    //     "key": "Dealer score",
    //     "values": this.dealearLevelArray
    //   },
    //   {
    //     "key": "Category avg score",
    //     "values": this.categoryLevelArray
    //   },
    //   {
    //     "key": "National avg score",
    //     "values": this.nationalLevelArray
    //   }
    // ];;
    let data = rdata;
    var margin = { top: 100, right: 100, bottom: 100, left: 100 };
    var width = 460;
    var height = 460;
    var color = d3.scaleOrdinal()
      .range(["#00A0B0", "#e86153", "#ffc83d"]);
      
    console.log("hybrid");
    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 1,
      levels: 5,
      roundStrokes: true,
      color: color
    };
    RadarChart("#radarChart", data, radarChartOptions);
  }
}
