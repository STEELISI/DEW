import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { Edge, Node, Layout, ClusterNode, NodePosition, GraphComponent } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import * as shape from 'd3-shape';
import { HttpService } from "src/app/http-service.service";
import { StateService } from "src/app/state-service.service";


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
  curve: any = shape.curveCardinal;
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

  isDragging: boolean = false;
  draggingNode: Node = null;

  public currentDragPosition: NodePosition = {x: 0, y: 0};
  public startingDragPosition: NodePosition = {x: 0, y: 0};
  mouseOverNode: Node = null;

  @ViewChild('graph', { static: false }) graphEl: GraphComponent;


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
   * toggleDragging
   */
  public toggleDragging() {
    this.draggingEnabled = !this.draggingEnabled
    console.log(this.draggingEnabled)
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
   * On mouse up event
   *
   */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) {
      return;
    }
    this.currentDragPosition.x += event.movementX / this.graphEl.zoomLevel;
    this.currentDragPosition.y += event.movementY / this.graphEl.zoomLevel;
  }


  /**
   * On node circle mouse down to kick off dragging
   *
   */
  onNodeCircleMouseDown(event: any, node: Node): void {
    if (this.draggingEnabled) {
      return;
    }
    this.isDragging = true;

    this.draggingNode = node;

    
    console.log("starting node....")

    this.startingDragPosition = {
      x: (event.layerX - this.graphEl.panOffsetX) / this.graphEl.zoomLevel,
      y: (event.layerY - this.graphEl.panOffsetY) / this.graphEl.zoomLevel
    };

    this.currentDragPosition = {
      x: node.position.x + node.dimension.width / 2,
      y: node.position.y
    };

    setTimeout(() => {
      this.mouseOverNode = undefined;
    });
  }

  onNodeCircleMouseUp(event: any, node: Node): void {
    if (this.draggingEnabled) {
      return;
    }
    console.log("ending node....")
    console.table(this.links)
    console.table(this.nodes)
    this.isDragging = false;
    var src = this.draggingNode;
    var dest = node;
    console.log(src, dest, this.links)
    

    var edge: Edge = {
      id: Math.random().toString(36).substring(7),
      source: this.draggingNode.id,
      target: dest.id,
      label: this.draggingNode.label + "Run" + this.draggingNode.data.action + "Sig"
    }

    src.data['e_events'].push(edge.label)
    dest.data['t_events'].push(edge.label)

    var reconstructedString = ""
    if(src.data['t_events'].length > 0){
      reconstructedString += "when " + src.data['t_events'].join(", ") + " "
    }
    if(src.data['wait_time'] !== "None"){
      reconstructedString += " wait " + JSON.parse(src.data['wait_time'].replaceAll("'", '"')).join(",") + " "
    }
    reconstructedString += src.data['actors'].join(", ") + " " + src.data["action"] + " "
    if(src.data['e_events'].length > 0){
      reconstructedString += "emit " +  src.data['e_events'].join(", ")
    }


    var reconstructedString2 = ""
    if(dest.data['t_events'].length > 0){
      reconstructedString2 += "when " + dest.data['t_events'].join(", ") + " "
    }
    if(dest.data['wait_time'] !== "None"){
      reconstructedString2 += " wait " + JSON.parse(dest.data['wait_time'].replaceAll("'", '"')).join(",") + " "
    }
    reconstructedString2 += dest.data['actors'].join(", ") + " " + dest.data["action"] + " "
    if(dest.data['e_events'].length > 0){
      reconstructedString2 += "emit " +  dest.data['e_events'].join(", ")
    }

    var behaviors = null
    this.state.behavior.subscribe((b) => {
      behaviors = b
    })
    console.log("before : ", behaviors)
    behaviors[parseInt(src.id)-1] = reconstructedString
    behaviors[parseInt(dest.id)-1] = reconstructedString2
    console.log("after : ", behaviors)
    this.state.setBehavior(behaviors)

    this.links.push(edge)
    this.links = [...this.links]

    this.startingDragPosition = {
      x: (event.layerX - this.graphEl.panOffsetX) / this.graphEl.zoomLevel,
      y: (event.layerY - this.graphEl.panOffsetY) / this.graphEl.zoomLevel
    };

    this.currentDragPosition = {
      x: node.position.x + node.dimension.width / 2,
      y: node.position.y
    };

    setTimeout(() => {
      this.mouseOverNode = undefined;
    });
  }

  /**
   * getMatching
   */
  public getMatching() {
    return this.matching
  }
}