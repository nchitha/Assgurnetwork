import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { EngagementService } from 'src/app/_services/engagement.service';

@Component({
  selector: 'app-customer-delight',
  templateUrl: './customer-delight.component.html',
  styleUrls: ['./customer-delight.component.scss']
})
export class CustomerDelightComponent implements OnInit {
   saleData:any = [
    { name: 'a', value: '9' },
    { name: 'b', value: '20' },
    { name: 'c', value: '30' },
  ];
  afterSaleData:any = [
    { name: 'a', value: '9' },
    { name: 'b', value: '20' },
    { name: 'c', value: '30' },
  ];
  public calculatedSales: any =
    {
      slabLow: "",
      slabMid: "",
      slabHigh: "",
      sales: {
        score: "",
        manpower: "",
        infrastructure: "",
        process: "",
      },
      dealers: [
        {
          dealer: "",
          score: "",
          area: [
            {
              areaname: "",
            }
          ]
        }
      ],
      topSalesDealers: [
        {
          dealer: "",
          areas: "",
          score: "",
          type: "",
        }
      ],
      bottomSalesDealers: [
        {
          dealer: "",
          areas: "",
          score: "",
          type: "",
        }
      ],

    };


  public calculatedAfterSales: any =
    {
      slabLow: "",
      slabMid: "",
      slabHigh: "",
      sales: {
        score: "",
        area: [

        ],

      },
      dealers: [
        {
          dealer: "",
          score: "",
          area: [

          ],
        }
      ],
      topAfterSalesDealers: [
        {
          dealer: "",
          areas: "",
          score: "",
          type: "",
        }
      ],
      bottomAfterSalesDealers: [
        {
          dealer: "",
          areas: "",
          score: "",
          type: "",
        }
      ],

    };
  areaDetailsAfterSales: any;
  areaDetailsSales: any;
  commonAreaLabel: any;
  isScatterPlotDataAvailable = false;
  margin = { top: 10, right: 30, bottom: 30, left: 40 };
  width = 250;
  height = 250;
  svg: any;
  colors: any;
  radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  constructor(private engagementService:EngagementService) { }

  async ngOnInit() {
    this.createSaleSvg();
    this.createSaleColors(this.saleData);
    this.drawSaleChart();
    this.createAfterSaleSvg();
    this.createAfterSaleColors(this.afterSaleData);
    this.drawAfterSaleChart();
    await this.calafterSales();
    await this.calSales();
    this.scatterplotchart();
  }

  async calSales() {
    this.calculatedSales = await this.engagementService.demomethod(5);
    this.areaDetailsSales = await this.engagementService.demomethod4(5, 1);
    if (this.calculatedSales!.dealers) {
      this.calculatedSales.dealers.sort((a: any, b: any) => {
        return b.score - a.score
      })
    }


    // this.dashService.demomethod(9).subscribe(dash => {console.log("dash-",dash);this.calculatedSales=dash});  
  }
  async calafterSales() {
    this.calculatedAfterSales = await this.engagementService.demomethod2(5);
    this.areaDetailsAfterSales = await this.engagementService.demomethod4(5, 2);
    console.log(this.calculatedAfterSales);
    if (this.calculatedAfterSales!.dealers) {
      this.calculatedAfterSales.dealers.sort((a: any, b: any) => {
        return b.score - a.score
      })
    }

    //this.dashService.demomethod2(9).subscribe(dash1 => {console.log("dash1-",dash1);this.calculatedAfterSales=dash1});  
  }

  private mergedata(sales:any, asales:any) {
    let arr = []
    console.log(sales, asales);

    if (Object.keys(sales).length !== 0 && Object.keys(asales).length !== 0) {
      for (let i of sales.dealers) {
        let obj: any = {}
        for (let j of asales.dealers) {

          if (i.dealer === j.dealer) {
            obj.overall = {
              sales: i.score,
              asales: j.score
            }
            obj.dealer = i.dealer
            for (let a of Object.keys(i.areas)) {
              for (let b of Object.keys(j.areas)) {
                if (a === b) {
                  // console.log(a,b)
                  obj[a] = {
                    sales: i.areas[a],
                    asales: j.areas[b]
                  }
                  // console.log(obj)
                }
              }
            }
          }
        }
        arr.push(obj)
      }
    }
    console.log(arr)
    return arr.filter((i: any) => i !== {}) || [];
  }

  scatterplotchart() {
    const xaxislabel = "Sales";
    const yaxislabel = "After-sales";
    const data = [];
    const commonArea = [];
    const commonCategory = [];


    let scattermergedata = this.mergedata(this.calculatedSales, this.calculatedAfterSales)
    console.log("MERGED SALES DATA   ", scattermergedata)
    if (scattermergedata!.length !== 0) {
      for (let area of Object.keys(scattermergedata[0])) {
        if (area != "dealer" && area != "overall") {
          commonArea.push(area);
        }
      }
    }

    this.commonAreaLabel = [...commonArea];

    console.log("commonArea", commonArea)


    console.log("merged", scattermergedata)
    for (let item of scattermergedata) {
      console.log("merged item", item)
      if (Object.keys(item).length != 0) {
        data.push({
          name: item.dealer,
          price: item.overall.sales,
          rating: item.overall.asales,
          size: 6,
        });
      }
    }

    console.log(data)

    var nationalOverallSales = 0;
    var nationalOverallAfterSales = 0;
    nationalOverallSales = data.reduce((a, curr) => a + +curr.price, 0);
    nationalOverallAfterSales = data.reduce((a, curr) => a + +curr.rating, 0);
    console.log("data!", data, nationalOverallSales, nationalOverallAfterSales);
    var nationalOverallAvgSales = 0;
    var nationalOverallAvgAfterSales = 0;
    if (data.length > 0) {
      nationalOverallAvgSales = nationalOverallSales / (data.length);
      nationalOverallAvgAfterSales = nationalOverallAfterSales / (data.length);
    }
    console.log("data!", data, nationalOverallAvgSales, nationalOverallAvgAfterSales);
    this.isScatterPlotDataAvailable = data.length ? true : false;
    if (!data.length) {
      return;
    }
    // this.commonAreaLabel = Array.from(new Set(commonArea));
    // this.commonCategoryLabel = Array.from(new Set(commonCategory));

    d3.select("#scatter-load").select("svg").remove();

    // just to have some space around items.
    var margins = {
      left: 40,
      right: 30,
      top: 30,
      bottom: 40,
    };

    var width = 1100;
    var height = 550;
    var domainwidth = width - margins.left - margins.right;
    var domainheight = height - margins.top - margins.bottom;

    // this will be our colour scale. An Ordinal scale.
    // var colors = d3.scaleOrdinal(d3.schemeCategory10);
    var colorRange = ["darkblack", "#87431d", "#000000", "#c52a1a", "red"];
    var colors = d3.scaleOrdinal(colorRange);
    // we add the SVG component to the scatter-load div
    var spacing = 60
    var svg = d3
      .select("#scatter-load")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + spacing + "," + 10 + ")");

    svg
      .append("rect")
      .style("opacity", 0.1)
      .attr("fill", "#333333")
      .attr("width", domainwidth)
      .attr("height", domainheight / 2);

    svg
      .append("rect")
      .style("opacity", 0.1)
      .attr("fill", "#333333")
      .attr("width", domainwidth / 2)
      .attr("height", domainheight);

    // this sets the scale that we're using for the X axis.
    // the domain define the min and max variables to show. In this case, it's the min and max prices of items.
    // this is made a compact piece of code due to d3.extent which gives back the max and min of the price variable within the dataset

    // simple function fixes the axes so they have room to breathe
    // this should really be built into the library for extent
    // https://github.com/ScottLogic/d3-financial-components/issues/228
    function padExtent(e:any, p?:any) {
      if (p === undefined) p = 1;
      return [e[0] - p, e[1] + p];
    }

    // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
    var x = d3
      .scaleLinear()
      // .domain(
      //   padExtent(
      //     d3.extent(data, function (d) {
      //       return Math.round(d.price);
      //     })
      //   )
      // )
      .domain([0,100])
      .range([0,domainwidth])
      .nice();

    // this does the same as for the y axis but maps from the rating variable to the height to 0. Note that height goes first due to the weird SVG coordinate system
    var y = d3
      .scaleLinear()
      // .domain(
        // padExtent(
        //   d3.extent(data, function (d) {
        //     return Math.round(d.rating);
        //   })
        // )

      // )
      .domain([0,100])
      .range([domainheight,0])
      .nice();

    // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + y.range()[0] + ")");
    svg.append("g").attr("class", "y axis");

    // this is our X axis label. Nothing too special to see here.
    svg
      .append("text")
      .style("fill", "#c52a1a")
      .style("font-size", "25px")
      .style("font-family", "Roboto")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("y", height - 25)
      .text(xaxislabel);

    // this is our Y axis label. Nothing too special to see here. //#414241
    svg
      .append("text")
      .style("fill", "#c52a1a")
      .attr("x", -220)
      .attr("y", -28)
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .style("font-size", "25px")
      .style("font-family", "Roboto")
      .text(yaxislabel);

    // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
    var xAxis:any = d3.axisBottom(x).ticks(10).tickPadding(1);
    var yAxis:any = d3.axisLeft(y).ticks(10).tickPadding(1);

    var tooltip = d3.select("body").append("div").attr("class", "tooltip");

    // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);
    // let data = data;
    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
    var item = svg.selectAll("g.node").data(data, function (d:any) {
      return d.name;
    });

    // quadrant grid: horizontal rules
    // svg.append("g").attr("class", "qxgrid")
    //   .call(xAxis.tickFormat("").tickSize(450).ticks(1));

    svg
      .select("g.qxgrid")
      .selectAll(".tick")
      .style("opacity", 0.4)
      .style("stroke", "green")
      .style("stroke-dasharray", 8);

    svg.select("g.qxgrid .domain").style("fill", "none");

    // quadrant grid: vertical rules
    // svg.append("g").attr("class", "qygrid")
    //   .call(yAxis.tickFormat("").tickSize(-1020).ticks(1));

    svg
      .select("g.qygrid")
      .selectAll(".tick")
      .style("opacity", 0.4)
      .style("stroke", "red")
      .style("stroke-dasharray", 8);
    console.log("overview avgs!------",nationalOverallAvgSales,nationalOverallAvgAfterSales)
    svg.select("g.qygrid .domain").style("fill", "none");
    // svg
    //   .append("line")
    //   .attr("x1", x(nationalOverallAvgSales))
    //   .attr("y1", 0)
    //   .attr("x2", x(nationalOverallAvgSales))
    //   .attr("y2", domainheight)
    //   .style("stroke-dasharray", "5,5")
    //   .style("stroke", "black");
    // svg
    //   .append("line")
    //   .attr("x1", 0)
    //   .attr("y1", y(nationalOverallAvgAfterSales))
    //   .attr("x2", domainwidth)
    //   .attr("y2", y(nationalOverallAvgAfterSales))
    //   .style("stroke-dasharray", "5,5")
    //   .style("stroke", "black");

    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.

    var itemGroup = item
      .enter()
      .append("g")
      .attr("class", "node")
      // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
      .attr("transform", function (d) {
        return (
          "translate(" +
          x(Math.round(d.price)) +
          "," +
          y(Math.round(d.rating)) +
          ")"
        );
      });

    // we add our first graphics element! A circle!
    itemGroup
      .append("circle")
      .attr("r", function (d) {
        return d.size;
      })
      .attr("class", "dot")
      .style("fill", function (d:any) {
        // remember the ordinal scales? We use the colors scale to get a colour for our category.
        return colors(d.category);
      })
      .on("mouseover", function (d) {
        return tooltip
          .style("display", "block")
          .style("font-size", "20px")
          .style("opacity", 1)
          .html(function (da) {
            return (
              d.name +
              " <br>Sales - " +
              Math.round(d.price) +
              "%  <br>After-sales - " +
              Math.round(d.rating) +
              "% <br>"
            );
          });
      })
      .on("mousemove",  () => {
        return tooltip
          // .style("top", d3.event.pageY + 20 + "px")
          // .style("left", d3.event.pageX + 20 + "px")
          .style("display", "block");
      })
      .on("mouseout", function () {
        return tooltip.style("display", "none");
      });

    // now we add some text, so we can see what each item is.
    itemGroup
      .append("text")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-family", "Roboto")
      .attr("dy", -10)
      .text(function (d) {
        // this shouldn't be a surprising statement.
        return d.name;
      })
      .on("mouseover", function (d) {
        return tooltip
          .style("display", "block")
          .style("font-size", "20px")
          .style("opacity", 1)
          .html(function (da) {
            return (
              d.name +
              " <br>Sales - " +
              Math.round(d.price) +
              "%<br>After-sales -" +
              Math.round(d.rating) +
              "%<br>"
            );
          });
      })
      .on("mousemove", function () {
        return tooltip
          // .style("top", d3.event.pageY + 20 + "px")
          // .style("left", d3.event.pageX + 20 + "px")
          .style("display", "block");
      })
      .on("mouseout", function () {
        return tooltip.style("display", "none");
      });
  }

  private createSaleSvg(): void {
    const svgWidth = 250,
    svgHeight = 250,
    radius = Math.min(svgWidth, svgHeight) / 2;
    this.svg = d3
      .select('#sales-pie-chart')
      .append('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append('g')
      .attr(
        'transform',
        'translate(' + radius + ',' + radius + ')'
      );
  }

  private createSaleColors(data:any): void {
    let index = 0;
    const defaultColors = [
      "#c52a1a", "#666", "lightgray"
    ];
    const colorsRange:any = [];
    this.saleData.forEach((element:any) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = d3
      .scaleOrdinal()
      .domain(data.map((d:any) => d.value.toString()))
      .range(colorsRange);
  }

  private drawSaleChart(): void {
    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d:any) => {
        return d.value;
      });
    var data_ready = pie(this.saleData);

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(50) // This is the size of the donut hole
      .outerRadius(105);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(50) // This is the size of the donut hole
      .outerRadius(105);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d:any) => this.colors(d.data.value))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 1);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', (d:any) => {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d:any) => {
        return d.data.name;
      })
      .attr('transform', (d:any) => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d:any) => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }

  private createAfterSaleSvg(): void {
    const svgWidth = 250,
    svgHeight = 250,
    radius = Math.min(svgWidth, svgHeight) / 2;
    this.svg = d3
      .select('#aftersales-pie-chart')
      .append('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append('g')
      .attr(
        'transform',
        'translate(' + radius + ',' + radius + ')'
      );
  }

  private createAfterSaleColors(data:any): void {
    let index = 0;
    const defaultColors = [
      "#c52a1a", "#666", "lightgray"
    ];
    const colorsRange:any = [];
    this.afterSaleData.forEach((element:any) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = d3
      .scaleOrdinal()
      .domain(data.map((d:any) => d.value.toString()))
      .range(colorsRange);
  }

  private drawAfterSaleChart(): void {
    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d:any) => {
        return d.value;
      });
    var data_ready = pie(this.afterSaleData);

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(50) // This is the size of the donut hole
      .outerRadius(105);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(50) // This is the size of the donut hole
      .outerRadius(105);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d:any) => this.colors(d.data.value))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity',1);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', (d:any) => {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d:any) => {
        return d.data.name;
      })
      .attr('transform', (d:any) => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d:any) => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }


}
