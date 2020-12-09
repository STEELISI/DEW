import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  actorForm;
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
  @ViewChild('graph', { static: false }) graphEl: GraphComponent;

  zoomToFit$: Subject<boolean> = new Subject();

  constructor(
    protected http: HttpService,
    protected state: StateService,
    private formBuilder: FormBuilder
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

  public isLanNode(node, dim){
    if(node.data.type == "lan"){
      if(dim == 'x'){
        return node.dimension.width
      }else{
        return node.dimension.height
      }
    }else{
      return "0"
    }
  }

  public zoomIn(){
    this.graphEl.zoom(1.1)
  }

  public zoomOut(){
    this.graphEl.zoom(0.9)
  }

  public fitToView(){
    this.zoomToFit$.next(true)
  }

  public addActor(event){
    event.preventDefault();
    event.stopPropagation();
    const id = (this.nodes.length+1).toString()
    var node: Node = {
      data: {
        'num': 1,
        'os': 'default',
        'type': 'actor'
      },
      id: id,
      label: 'actor' + id.toString()
    }
    var newConstraints = this.generateConstraintDEW(node)
    this.state.getConstraints().subscribe(c => {
       this.state.setConstraints(c + newConstraints)
    })

    this.nodes.push(node)
    this.nodes = [...this.nodes]
  }

  public addLan(event){
    event.preventDefault();
    event.stopPropagation();
    const id = (this.nodes.length+1).toString()
    var node: Node = {
      data: {
        'type': 'lan'
      },
      id: id,
      label: 'lan' + id.toString()
    }

    this.nodes.push(node)
    this.nodes = [...this.nodes]
  }

  public editNode(event,node){
    event.preventDefault()
    event.stopPropagation()
    debugger;
  }

  private generateConstraintDEW(node){
    if(node.data.type == "lan"){
       nodes = this.getLanNodes(node)
       return ["lan all " + nodes.join(" ")]
    } else {
      str = []
      str.push("num " + node.label + node.data.num)
      str.push("os " + node.label + node.data.os)
      return str
    }

  }
}