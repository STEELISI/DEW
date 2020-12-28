import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
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


  isDragging: boolean = false;
  draggingNode: Node = null;

  public currentDragPosition: NodePosition = {x: 0, y: 0};
  public startingDragPosition: NodePosition = {x: 0, y: 0};
  mouseOverNode: Node = null;

  @ViewChild('graph', { static: false }) graphEl: GraphComponent;

  update$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  constructor(
    protected http: HttpService,
    protected state: StateService,
    public dialog: MatDialog,
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
      for(const n in data['actors']){
        var n2: Node = {
          data: data['actors'][n],
          id: n,
          label: n
        }
        console.log(n2)
        this.nodes.push(n2)
        this.nodes =  [...this.nodes]
      }

      for(const n of data['lans']){
        var n2: Node = {
          data: n,
          id: "lan" + n['lineNum'],
          label: "lan"
        }
        this.nodes.push(n2)
        this.nodes =  [...this.nodes]
      }

      for(const e of data['edges']){
        var e2: Edge = e
        this.links.push(e2)
        this.links = [...this.links]
      }
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

  public showPopup(node){
    alert("node.label: " + node.label)
  }

  public getTitle(node){
    if(node.data.type == "actor"){
      return "num : " + node.data.num + ", os: " + node.data.os
    }else {
      return ""
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
    var oldConstraints = null;
    this.state.getConstraints().subscribe(c => {
       oldConstraints = c
    })
    newConstraints = oldConstraints.concat(newConstraints)
    this.state.setConstraints(newConstraints)
    this.nodes.push(node)
    this.nodes = [...this.nodes]
  }

  public getSubText(node){
    if(node.data.type == "actor"){
      return "(" + node.data.num + "), ("+node.data.os+")"
    } else
    {
      return ""
    }
  }

  public addLan(event){
    event.preventDefault();
    event.stopPropagation();
    const id = (this.nodes.length+1).toString()
    var node: Node = {
      data: {
        'type': 'lan',
        nodes: [],
        lineNum: null

      },
      id: id,
      label: 'lan'
    }

    this.updateLanDEW(node)

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
       // var nodes = this.getLanNodes(node)
       this.updateLanDEW(node)
    } else {
      var str = []
      str.push("num " + node.label + " " + node.data.num)
      str.push("os " + node.label + " " + node.data.os)
      return str
    }
  }

  private addLinkDEW(source, target){
    if(source.data.type == "actor" && target.data.type == "actor"){
      return ["link all "+ source.label + " " + target.label]
    } else if(source.data.type == "lan" && target.data.type == "actor"){
      source.data.nodes.push(target.label)
      this.updateLanDEW(source)
    } else if(source.data.type == "actor" && target.data.type == "lan"){
      target.data.nodes.push(source.label)
      this.updateLanDEW(target)
    }
  }

  private updateLanDEW(lannode){
    if ((lannode.data.type != 'lan') || (lannode.data.nodes.length < 2)) {
      return
    }
    var str = "lan all " + lannode.data.nodes.join(" ")
    var oldConstraints = null;
    this.state.getConstraints().subscribe(c => {
       oldConstraints = c
    })
    debugger;
    if (lannode.data.lineNum) {
      oldConstraints[parseInt(lannode.data.lineNum)] = str
    }else{
      oldConstraints.push(str)
    }
    
    this.state.setConstraints(oldConstraints)

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
   * On mouse up event
   *
   */
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.isDragging && this.draggingNode) {
      // logic if mouse is released over another node
      console.log(event, this.draggingNode)
    }

    this.isDragging = false;
    this.draggingNode = undefined;
  }

  onNodeCircleMouseDown(event: any, node: Node): void {
    if (this.draggingEnabled) {
      return;
    }
    this.isDragging = true;

    this.draggingNode = node;

    this.startingDragPosition = {
      x: (event.layerX - this.graphEl.panOffsetX) / this.graphEl.zoomLevel,
      y: (event.layerY - this.graphEl.panOffsetY) / this.graphEl.zoomLevel
    };

    this.currentDragPosition = {
      x: (event.layerX - this.graphEl.panOffsetX) / this.graphEl.zoomLevel,
      y: (event.layerY - this.graphEl.panOffsetY) / this.graphEl.zoomLevel
    };

    setTimeout(() => {
      this.mouseOverNode = undefined;
    });
  }

  onNodeCircleMouseUp(event: any, node: Node): void {
    if (this.draggingEnabled) {
      return;
    }
    this.isDragging = false;
    var src = this.draggingNode;
    var dest = node;
    
    if((src.id == dest.id) || (src.data.type == "lan" && dest.data.type == "lan")){
      return;
    }


    var edge: Edge = {
      id: Math.random().toString(36).substring(7),
      source: this.draggingNode.id,
      target: dest.id,
      label: ""
    }

    this.links.push(edge)
    this.links = [...this.links]

    var newConstraints = this.addLinkDEW(this.draggingNode, dest)
    if (newConstraints) {
      var oldConstraints = null;
      this.state.getConstraints().subscribe(c => {
         oldConstraints = c
      })
      newConstraints = oldConstraints.concat(newConstraints)
      this.state.setConstraints(newConstraints)
    }


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
   * toggleDragging
   */
  public toggleDragging() {
    this.draggingEnabled = !this.draggingEnabled
    console.log(this.nodes)
    this.update$.next(true)
  }

  

}