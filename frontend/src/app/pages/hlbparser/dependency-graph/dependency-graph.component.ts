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
        this.nodes = []
        this.links = []
        this.clusters = []
        console.table(d['nodes'])
        var c2: ClusterNode[] = []
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
        console.log(actors)

        for(const [actor, values] of Object.entries(actors)){
          console.log(values)
          var c1: ClusterNode = {
            id: actor,
            label: actor,
            childNodeIds: actors[actor],
          }
          c2.push(c1)
        }
        console.table(d['edges'])

        for(const e of d['edges']){
          var e2: Edge = e
          this.links.push(e2)
          this.links = [...this.links]
        }

        // this.clusters = c2
      })
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
}