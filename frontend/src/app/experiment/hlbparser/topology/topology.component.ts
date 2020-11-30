import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Edge, Node, Layout, ClusterNode, NodePosition, GraphComponent } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import * as shape from 'd3-shape';
import { HttpService } from "src/app/http-service.service";
import { StateService } from "src/app/state-service.service";


@Component({
  selector: 'topology-graph',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss']
})
export class TopologyGraphComponent implements OnInit{
  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layout: String | Layout = 'dagreCluster';
  public layoutSettings = {
    orientation: "TB"
  }
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];  

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = false;
  zoomLevel: number = 1.0;
  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

    customColors = [
    "#bf9d76",
    "#f2dfa7",
    "#a5d7c6",
    "#afafaf",
    "#ba9383",
    "#d9d5c3",
    "#55C22D",
    "#C1F33D",
    "#3CC099",
    "#AFFFFF",
    "#8CFC9D",
    "#76CFFA",
    "#FC9F32",
  ]

  matching: {[key: string]: string} = {}

  autoZoom: boolean = false;
  autoCenter: boolean = true; 

  constructor(
    protected http: HttpService,
    protected state: StateService
  ) {
  }

  public ngOnInit(): void {
    this.state.getExperimentColors().subscribe((d) => {
      this.matching = d
    })

    var behaviors = null
    var constraints = null
    this.state.getConstraints().subscribe((c) => {
      constraints = c
    })
    this.state.getBehavior().subscribe((b) => {
      behaviors = b
    })
    this.http.put("v1/pr/hlb/topology/parse", {"scenario": behaviors, "constraints": constraints},{withCredential: true}).subscribe((data) => {
      this.nodes = []
      this.links = []
      for(const n in data['nodes']){
        var n2: Node = {
          data: data['nodes'][n],
          id: n,
          label: n
        }
        console.log(n2)
        this.nodes.push(n2)
        this.nodes =  [...this.nodes]
      }

      for(const e of data['edges']){
        var e2: Edge = e
        this.links.push(e2)
        this.links = [...this.links]
      }
      console.log(this.links)
    })

  }

  public getColor(node) {
    const existingColors = Object.values(this.matching)
    if(this.matching.hasOwnProperty(node.label)){
      return this.matching[node.label]
    }
    else{
      var c = this.customColors[Math.floor(Math.random() * this.customColors.length)]
      while (existingColors.includes(c)) {
        c = this.customColors[Math.floor(Math.random() * this.customColors.length)]
      }
      this.matching[node.label] = c
      this.state.setExperimentColors(this.matching)
      return c
    }

  }
}