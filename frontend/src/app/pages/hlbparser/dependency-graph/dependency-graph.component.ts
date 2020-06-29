import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node, Layout, ClusterNode } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import * as shape from 'd3-shape';
import { HttpService } from "src/app/http-service.service";
import { StateService } from "src/app/state-service.service"


@Component({
  selector: 'dependency-graph',
  templateUrl: './dependency-graph.component.html',
  styleUrls: ['./dependency-graph.component.scss']
})
export class DependencyGraphComponent implements OnInit{
  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layout: String | Layout = 'dagreCluster';
  public clusters: ClusterNode[] = [];

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

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false; 

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  constructor(
    protected http: HttpService,
    protected state: StateService
  ) {
  }

  public ngOnInit(): void {
    this.state.getBehavior().subscribe((behavior) => {
      this.http.put("v1/pr/hlb/dependency_graph/parse", {"scenario": behavior}, {withCredential: true}).subscribe((d) => {
    })

    const a1:Node = {
      id: 'a1',
      label: 'aa'
    }
    const a2:Node = {
      id: 'a2',
      label: 'aa'
    }
    const e1:Edge = {
      id: '1',
      source: 'a1',
      target: 'a2'
    }
    const e2:Edge = {
      id: '2',
      source: 'a2',
      target: 'a1'
    }
    this.nodes.push(a1)
    this.nodes.push(a2)
    this.links.push(e2)
    this.links.push(e1)
  })

  }

  public updateGraph(response): void {
    // var actors = {}
    // for (var r of response) {
    //   for (var a of r["actors"]) {
    //         if(actors.hasOwnProperty(a)){
    //       actors[a].push(r['action'])
    //     } else {
    //       actors[a] = [r['action']]
    //     }
    //   }
    // }
    // console.log(actors)
    // var actorsList = Object.keys(actors)
    // for (var a2 of actorsList) {
    //   const n: Node = {id: a2, label: a2}
    //   this.nodes.push(n)
    //   this.links.push({id: a2, source: a2, target: a2, label: a2})
    // }
    
    // var t_events = {}
    // for (var r of response) {
    //   if(r["t_events"] != null){
    //     for (var a of r["t_events"]) {
    //         if(t_events.hasOwnProperty(a)){
    //           t_events[a].push(r['t_events'])
    //         } else {
    //           t_events[a] = [r]
    //         }
    //       }
    //   }
    // }
  }

  public getNodes(): any {
    return [{id: 'a1', label: 'aa'}, {id: 'a2', label: 'ab'}]
  }

  public getEdges(): any {
    return [{id: 1, source: 'a1', target: 'a2'}]
  }

  public getStyles(node: Node): any {
    return {
      'backgroundColor': 'red'
    };
  }
}