import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node, Layout, ClusterNode } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import * as shape from 'd3-shape';
import { HttpService } from "src/app/http-service.service";
import { StateService } from "src/app/state-service.service";
import { ColorHelper } from "@swimlane/ngx-charts";


@Component({
  selector: 'dependency-graph',
  templateUrl: './dependency-graph.component.html',
  styleUrls: ['./dependency-graph.component.scss']
})
export class DependencyGraphComponent implements OnInit{
  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layout: String | Layout = 'dagreCluster';
  public layoutSettings = {
    orientation: "TB"
  }
  public clusters = undefined;

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
  zoomEnabled: boolean = true;
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

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = true; 

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  constructor(
    protected http: HttpService,
    protected state: StateService
  ) {
  }

  public ngOnInit(): void {
    this.state.getExperimentColors().subscribe((d) => {
      this.matching = d
    })
    this.state.getBehavior().subscribe((behavior) => {
      this.http.put("v1/pr/hlb/dependency_graph/parse", {"scenario": behavior}, {withCredential: true}).subscribe((d) => {
        this.nodes = []
        this.links = []
        var actors = {}
        for (const n of d['nodes']) {
          var n2: Node = {
            data: n,
            id: n.id,
            label: n.actors[0]
          }
          if(actors.hasOwnProperty(n.actors[0])){
            actors[n.actors[0]].push(n.id)
          }else{
            actors[n.actors[0]] = [n.id]
          }
          this.nodes.push(n2)
          this.nodes =  [...this.nodes]
        }

        for(const e of d['edges']){
          var e2: Edge = e
          this.links.push(e2)
          this.links = [...this.links]
        }
      })
    })

  }

  /**
   * getColor
node   */
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

  /**
   * getMatching
   */
  public getMatching() {
    return this.matching
  }
}