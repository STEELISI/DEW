import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener 
} from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import * as Quill from "quill";
import EditorService from "../common/editor-service";
import { StateService } from "../../../state-service.service";
import { MatSnackBar } from "@angular/material";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { HttpService } from "src/app/http-service.service";
import { Observable, of } from "rxjs";
import * as _ from 'lodash';
// import * as $ from 'jquery';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import { GRAPH_ITEM_PARAMETERS_LIST } from '../../graph-data/graph-item-parameters-list';
import { GraphItemParameters, GraphItemType } from '../../graph-data/graph-item-parameters-interface';
import { NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { type } from "os";
import { LogService, LogHeader, LogEntry } from '../common/logging-service';
import { GoogleDriveService } from "src/app/google-drive-service.service";
declare let $:any;

Quill.register("modules/counter", EditorService);

@Component({
  selector: "hlb",
  templateUrl: "./hlb.component.html",
  styleUrls: ["./hlb.component.scss"],
})
export class HlbComponent implements OnInit, AfterViewInit {

  @ViewChild('topologyGraphNetwork', { static: false }) topologyGraphNetwork!: ElementRef;
  @ViewChild('dependencyGraphNetwork', { static: false }) dependencyGraphNetwork!: ElementRef;
  @ViewChild('dependencyGraphCycleNetwork', { static: false }) dependencyGraphCycleNetwork!: ElementRef;
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) { 
    this.addNodeType = null;
    this.clearMessage();
    this.topologyNetworkInstance.disableEditMode();
  }
  private topologyNetworkInstance: any;
  private dependencyNetworkInstance: any;
  private selectedNetworkInstance: any;
  private dependencyCycleNetworkInstance: any;
  addNodeType: "Node" | "LAN";
  isKeyPressed: boolean = false;
  graphItemParametersList: Map<any, GraphItemParameters>;
  actorService: EditorService;
  behaviorService: EditorService;
  filteredBindingHandle: Observable<string[]>;
  filteredBindingHandleForEvent: Observable<string[]>;
  topologyGraphNodes: DataSet<any>;
  topologyGraphEdges: DataSet<any>;
  graph_data: any;
  graph_container: any;
  graphDescription: string;
  dependencyGraphNodes: DataSet<any>;
  dependencyGraphEdges: DataSet<any>;
  dependencyGraphCyclePath: null | Array<Array<String>>;
  actorsGroup: Map<string, number> = new Map();
  graphColors = ["#F0C929",
    "#F48B29",
    "#AC0D0D",
    "#693C72",
    "#55B3B1",
    "#F08A5D",
    "#B83B5E",
    "#54E346",
    "#1F1D36",
    "#420516",
    "#91091E",
    "#EE8572",
    "#35495E",
    "#347474",
    "#480032",
    "#FF4C29",
    "#FB3640",
    "#126E82",
    "#05004E",
    "#FF005C",
    "#240041",
    "#F4E557",
    "#B983FF",
    "#1DB9C3",
    "#005F99"];
  filterBindingOptions = [
    "tcpdump -i expeth($node) -w $file",
    "ping $node",
    "iperf -s",
    "iperf -c $node",
    "nmap $node",
    "wget $node",
    "dig $name",
    "sudo service apache2 start",
    "sudo service bind9 start"
  ];
  filterBindingOptionsForEvent = [
    'fexists($file) - file exists',
    'fmod($file) - file was modified',
    'pexists($action) - process exists that performs action in the binding',
    'psuccess($action) - process completed w success for the given action'
  ];

  filterBindingOptionsForEventCleaned = this.filterBindingOptionsForEvent.map((value) => {
    return value.split(' - ')[0];
  });

  specialFunctions = [
    { name: 'expIP', value: 'experimental IP on the node' },
    { name: 'ctlIP', value: 'control IP on the node' },
    { name: 'expeth', value: 'experimental interface on the node' },
    { name: 'expIP(A)', value: 'experimental IP on this node leading to A' },
    { name: 'expeth(A)', value: 'experimental interface on this node leading to A' },
    { name: 'IP(A)', value: 'IP address of node A' },
    { name: 'pid', value: 'project name' },
    { name: 'eid', value: 'experiment name' },
    { name: 'nid', value: 'node name' },
    { name: 'epoch', value: 'epoch time' }
  ];

  scenariosObjFormat = [];
  constraintsObjFormat = [];
  defaultTextColor = {};
  editorService: EditorService;
  constraintService: EditorService;
  service: any;
  actorTextFilter: String = "";
  behaviorTextFilter: any = {
    name: "behavior",
    text: "",
  };
  constraintTextFilter: any = {
    name: "constraint",
    text: "",
  };
  editIndex: number;
  behaviorText: String;
  constraintText: string;
  textBoxId: number;
  behaviorList: any = [];
  constraintWordList: any = [];
  actorsList: any = [];
  contraintList: any = [];
  bindingList: any = [];
  suggestionbehaviorMessage: String;
  suggestionConstraintMessage: String;

  bindingMap = new Map<String, any>();
  behaviorWordList: any = [];
  inputText: string = "";
  actors: String = "";
  selectedIndex = 0;
  experimentAccess = 4;
  showAlertMsg = false;
  alertMessage: string;
  showSpecialFuncDialog = false;
  constructor(
    private http: HttpService,
    public dialog: MatDialog,
    private stateservice: StateService,
    private _snackBar: MatSnackBar,
    private changeDetection: ChangeDetectorRef,
    private logger: LogService
  ) {
    this.graphItemParametersList = GRAPH_ITEM_PARAMETERS_LIST;
    accessibleLogger = logger;
    graphColors = this.graphColors;
  }

  resetFilterList() {
    this.filteredBindingHandle = of(this.filterBindingOptions);
    this.filteredBindingHandleForEvent = of(this.filterBindingOptionsForEvent);
  }
  searchFilter(value: any, category: any) {
    if (category === 'event' || category === 't_event') {
      this.filteredBindingHandleForEvent = of(
        this._filter(value, this.filterBindingOptionsForEvent)
      );
    } else {
      this.filteredBindingHandle = of(
        this._filter(value, this.filterBindingOptions)
      );
    }
  }

  convertStringToJsonObject(text: string) {
    const wordArray = text.trim().split(' ');
    const result = [];
    wordArray.forEach((element) => {
      if (this.defaultTextColor[element] !== undefined && this.defaultTextColor[element] !== null &&
        this.defaultTextColor[element].trim() !== '') {
        result.push({ insert: element + ' ', attributes: { color: this.defaultTextColor[element], bold: true } });
      } else {
        result.push({ insert: element + ' ' });
      }
    });
    return result;
  }

  convertTextToMap(textJson) {
    const map: Map<string, {}> = new Map<string, {}>();
    console.log(textJson)
    textJson.forEach(element => {
      map.set(element['text'] + "_row_" + element['row'], element)
    });

    return map;
  }

  openSideNavBar() {
    $('.side-nav-icon > img').toggleClass('hide');
    this.logger.log(LogHeader.KEY_PRESS, "User opened/closed the side navigation bar");
    setTimeout(() => {
      this.selectedNetworkInstance.fit();
    }, 600);
  }

  addColor(stringArray, row, map) {
    let occurenceMap: Map<String, number> = new Map<String, number>();
    stringArray.forEach(element => {
      if (occurenceMap.has(element.insert.trim())) {
        occurenceMap.set(element.insert.trim(), occurenceMap.get(element.insert.trim()) + 1)
      } else {
        occurenceMap.set(element.insert.trim(), 1)
      }

      if (map.has(element.insert.trim() + "_row_" + row)) {
        let detail = map.get(element.insert.trim() + "_row_" + row)
        if (detail['occurence'] == -1) {
          element["attributes"] = { "color": detail['color'], "bold": true }
        } else {
          if (occurenceMap.get(element.insert.trim()) == detail['occurence']) {
            element["attributes"] = { "color": detail['color'], "bold": true }
          }
        }

      }
    });

    return stringArray
  }

  colorText(data, textJson) {
    let map = this.convertTextToMap(textJson)
    var textArray = []
    let row = 1
    data.forEach((element) => {
      let stringArray = this.convertStringToJsonObject(element)
      textArray = [...textArray, ...this.addColor(stringArray, row, map), { insert: '\n' }]
      row++
    });

    return textArray
  }
  ngOnInit(): void {
    this.logger.log(LogHeader.INFO, "User entered the experiment page")
    this.resetFilterList();
    this.bindingMap = new Map<String, any>();
    this.behaviorList = [];
    const instance = this;
    this.stateservice.getBehavior().subscribe((data) => {
      if (data != null) {
        var text = "";
        var textArray = []
        data.forEach((element) => {
          textArray = [...textArray, ...this.convertStringToJsonObject(element), { insert: '\n' }]
          text += element + "<br>";
        });

        // let test = [{
        //   text:"trigger",
        //   row:"1",
        //   occurence:1,
        //   color:"pink"
        // },{
        //   text:"trigger",
        //   row:"2",
        //   occurence:-1,
        //   color:"red"
        // },{
        //   text:"trigg",
        //   row:"1",
        //   occurence:1,
        //   color:"red"
        // },{
        //   text:"actor2",
        //   row:"2",
        //   occurence:1,
        //   color:"red"
        // }]
        this.scenariosObjFormat = textArray
        instance.behaviorText = text;
      }
    });
    this.stateservice.getBindings().subscribe((data) => {
      if (data != null) {
        this.bindingList = [];
        this.bindingMap = new Map<String, any>();

        data.forEach((element) => {
          this.bindingMap.set(element.key, element);
          this.bindingList.push(element);
        });
      }
    });
    this.stateservice.getActors().subscribe((data) => {
      // //console.log(data);
      if (data != null) {
        instance.actorsList = [];
        data.forEach((element) => {
          this.actorsList.push({ text: element });
        });
      }
    });
    this.stateservice.getConstraints().subscribe((data) => {
      // //console.log(data);
      if (data != null) {
        let text = '';
        let textArray = [];
        data.forEach((element) => {
          textArray = [...textArray, ...this.convertStringToJsonObject(element), { insert: '\n' }];
          text += element + '<br>';
        });
        instance.constraintText = text;
        this.constraintsObjFormat = textArray;
      }
    });
    this.stateservice.getExperimentControl().subscribe((flag) => {
      this.experimentAccess = flag;
    });

  }

  ngAfterViewInit(): void {
    $('.convert-btn > div').on('click', ()=>{
      var $span = $('.convert-btn > span');
      if($span.html().includes("DEW 1.0 to 2.0")) {
        $span.html("Click again to convert...");
        setTimeout(()=> {
          $span.html("Convert from DEW 1.0 to 2.0");
        }, 2000);
        return true;
      }
      this.logger.log(LogHeader.KEY_PRESS, "User tried converting the constraints from DEW 1.0 to 2.0");
      $span.html("Convert from DEW 1.0 to 2.0");
      //Animate Button
      $('.convert-btn > div').animate(
        { deg: '+=360' },
        {
          duration: 600,
          step: function(now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
      );
      //Update DEW
        const data = {
          constraints: []
        };
        const constraints = this.getConstraintsFromEditor();
        this.logger.log(LogHeader.DATA_SENT, constraints);
        data.constraints = constraints;
        this.http
          .put('v1/pr/convert/dew1to2', data, { withCredential: true })
          .subscribe((receivedData: ParseApiBean) => {
            $('.error-text').addClass('hide');
            this.stateservice.setConstraints(receivedData.parsedConstraints);
            this.logger.log(LogHeader.DATA_RECEIVED, receivedData.parsedConstraints);
            setTimeout(()=> {
              this.updateActorsConstraint()
            }, 2000);
          }, (error: any) => {
            $('.error-text').removeClass('hide');
            setTimeout(()=> {
              $('.error-text').addClass('hide');
            }, 3000);
            this.logger.log(LogHeader.DATA_RECEIVED, "Error converting constraints");
          });
    });

    $('#modal-action-wait-checkbox').on('change', (event)=> {
      $('#modal-action-wait-input').attr('disabled', !event.currentTarget.checked)
    });

    $('#modal-action-emit-checkbox').on('change', (event)=> {
      $('#modal-action-emit-input').attr('disabled', !event.currentTarget.checked);
      if(!event.currentTarget.checked) {
        $('#modal-action-event-checkbox').prop('checked', false);
        $('#modal-event-binding-input').attr('disabled', true);
      }
      $('#modal-action-event-checkbox').attr('disabled', !event.currentTarget.checked);
    });

    $('#modal-action-trigger-checkbox').on('change', (event)=> {
      $('#modal-action-trigger-selections').attr('disabled', !event.currentTarget.checked);
    });

    $('#modal-action-event-checkbox').on('change', (event)=> {
      $('#modal-event-binding-input').attr('disabled', !event.currentTarget.checked)
    });

    this.toggleTopologyView();
  }

  clearModalContent(): void {
    $('#modal-action-name-input').val('');
    $('#modal-action-binding-input').val('');
    $('#modal-action-wait-input').val('');
    $('#modal-action-emit-input').val('');
    $('#modal-event-binding-input').val('');
    $("#modal-action-trigger-selections option:selected").prop("selected", false);
    $(".modal-action-headers > input[type='checkbox']:checked").prop('checked', false).change();
  }

  addActionFromUI(): void {
    var actionData = {};
    var name = $('#modal-action-name-input').val().trim();
    $('#modal-action-name-input').val(name);
    actionData['name'] = name;
    if(actionData['name']=='') {
      $('.modal-add-action-error').removeClass('hide');
      setTimeout(()=> {
        $('.modal-add-action-error').addClass('hide');
      }, 3000);
    } else {
      $('.modal').modal('toggle');
      //TODO: Add code to populate bindings and scenario
    }
  }


  isExperimentDisabled(): boolean {
    return this.experimentAccess == 2;
  }
  drop(event: CdkDragDrop<string[]>, list: Array<any>) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }
  private _filter(value: string, options): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  created(editor, id: number) {
    // //console.log(id);
    var instance = this;
    switch (id) {
      case 1:
        this.actorService = editor.getModule("counter");
        break;
      case 2:
        this.behaviorService = editor.getModule("counter");

        this.behaviorService.isBlur().subscribe((data) => {
          // if (data && instance.behaviorService.isTextChanged())
          //   this.updateActors();

          if (!data) this.textBoxId = 2;
          else this.textBoxId = -1;
        });
        this.behaviorService.isEnterPressed().subscribe((flag) => {
          if (flag && instance.behaviorService.isTextChanged()) {
            if (this.behaviorService.getText().trim() === "") return;
            var index = this.behaviorService.getText().length - 2;
            if (this.behaviorService.getText().charAt(index) == "\n")
              this.updateActors();
          }
        });

        this.behaviorService.isTabPressed().subscribe((flag) => {
          if (flag) {
            //console.log("inside istab");
            if (this.stateservice.getCurrentBehaviorWord().trim() != "")
              this.insertValue(
                this.stateservice.getCurrentBehaviorWord(),
                true
              );
            //this.behaviorService
          }
        });
        this.behaviorService.getSuggestionData().subscribe((data) => {
          if (data == null) {
            data = {
              currentSentence: "",
              remainingSentences: []
            }
          }
          if (data != null) {
            var params = {
              type: "behavior",
              suggestion_for: data.currentSentence,
              behaviors: data.remainingSentences,
              constraints: [],
              actors: [],
            };
            this.stateservice.getConstraints().subscribe((constraints) => {
              if (constraints != null || constraints != undefined) {
                params.constraints = constraints
              }
            })
            this.behaviorTextFilter.text = "";
            this.http
              .put("v1/pr/hlb/suggestions", params, { withCredential: true })
              .subscribe((data) => {
                var list = [];
                data.suggestions.forEach((element) => {
                  list.push({ value: element, flag: false });
                });
                if (data.suggestion_text.trim() != "")
                  this.suggestionbehaviorMessage = data.suggestion_text;
                else this.suggestionbehaviorMessage = null;
                this.behaviorWordList = list;
                this.changeDetection.detectChanges();
              });
          }
        });

        this.behaviorService.getCurrentWord().subscribe((data) => {
          //console.log(data);
          if (data != null && data.trim()) {
            this.behaviorTextFilter.text = data;
          }
        });
        break;
      case 3:
        this.constraintService = editor.getModule("counter");
        this.constraintService.isBlur().subscribe((data) => {
          // if (data && instance.constraintService.isTextChanged())
          //   this.updateActorsConstraint();

          if (!data) this.textBoxId = 3;
          else this.textBoxId = -1;
        });
        this.constraintService.isEnterPressed().subscribe((flag) => {
          if (flag && instance.constraintService.isTextChanged()) {
            if (this.constraintService.getText().trim() === "") return;
            var index = this.constraintService.getText().length - 2;
            if (this.constraintService.getText().charAt(index) == "\n")
              this.updateActorsConstraint();
          }
        });

        this.constraintService.isTabPressed().subscribe((flag) => {
          if (flag) {
            if (this.stateservice.getCurrentConstraintWord().trim() != "")
              this.insertValueInConstraint(
                this.stateservice.getCurrentConstraintWord(),
                true
              );
            //this.behaviorService
          }
        });
        this.constraintService.getSuggestionData().subscribe((data) => {
          if (data == null) {
            data = {
              currentSentence: "",
              remainingSentences: []
            }
          }
          if (data != null) {
            var params = {
              type: "constraint",
              suggestion_for: data.currentSentence,
              behaviors: [],
              constraints: data.remainingSentences,
              actors: [],
            };
            var behaviors = this.behaviorService.getText().trim();
            if (behaviors != "") {
              var behaviorsList = behaviors.split("\n");
              params.behaviors = behaviorsList;
            }
            this.constraintTextFilter.text = "";
            this.http
              .put("v1/pr/hlb/suggestions", params, { withCredential: true })
              .subscribe((data) => {
                var list = [];
                data.suggestions.forEach((element) => {
                  list.push({ value: element, flag: false });
                });
                if (data.suggestion_text.trim() != "")
                  this.suggestionConstraintMessage = data.suggestion_text;
                else this.suggestionConstraintMessage = null;
                this.constraintWordList = list;
                this.changeDetection.detectChanges();
              });
          }
        });

        this.constraintService.getCurrentWord().subscribe((data) => {
          if (data != null && data.trim()) {
            this.constraintTextFilter.text = data;
          }
        });
        break;
    }
    this.updateActors();
  }

  getScenariosFromEditor() {
    const bList = [];
    this.behaviorService.getText().trim().split('\n').forEach((element) => {
      const text = element.trim();
      if (text !== '') {
        bList.push(text);
      }
    });
    return bList;
  }

  getConstraintsFromEditor() {
    const cList = [];
    this.constraintService.getText().trim().split('\n').forEach((element) => {
      const text = element.trim();
      if (text !== '') {
        cList.push(text);
      }
    });
    return cList;
  }

  checkIfAllKeywordPresentInStrings(values) {
    for (const value of values) {
      if (value.includes('ALL') || value.includes('all')) {
        return true;
      }
    }
    return false;
  }

  updateActors() {
    // if (this.behaviorService.getText().trim() === '') {
    //   this.actorsList = [];
    //   return;
    // }
    const data = {
      ParseType: 'bash',
      Scenario: [],
      Constraints: [],
    };
    const scenarios = this.getScenariosFromEditor();
    // const constraints = this.getConstraintsFromEditor();
    // if (this.stateservice.getAllAnyPresentFlag() && (!this.checkIfAllKeywordPresentInStrings(scenarios) ||
    //     !this.checkIfAllKeywordPresentInStrings(constraints))) {
    //   // this.alertMessage = 'You have an unresolved choice between ALL or ANY for either a link or an event.' +
    //   //                     ' Please resolved it to process the bindings.';
    //   this.alertMessage = 'You have not inserted an ALL keyword for either a link command, lan command, ' +
    //                       'os command or an event. Please resolve it to process the bindings.';
    //   this.showAlertMsg = true;
    //   return;
    // } else {
    //   this.showAlertMsg = false;
    //   this.stateservice.setAllAnyPresentFlag(false);
    // }
    data.Constraints = this.getConstraintsFromEditor();
    data.Scenario = this.behaviorList = scenarios;
    this.stateservice.setBehavior(this.behaviorList);
    this.http
      .put('v1/pr/hlb/parse', data, { withCredential: true })
      .subscribe((receivedData: ParseApiBean) => {
        this.extractInfo(receivedData);
        //this.suggestAll(receivedData);
      });
  }

  updateActorsConstraint() {
    // if (this.constraintService.getText().trim() === '') {
    //   this.stateservice.setConstraints(this.getConstraintsFromEditor());
    //   this.actorsList = [];
    //   return;
    // }
    const data = {
      ParseType: 'bash',
      Scenario: [],
      Constraints: [],
    };
    const scenarios = this.getScenariosFromEditor();
    const constraints = this.getConstraintsFromEditor();
    // if (this.stateservice.getAllAnyPresentFlag() && (!this.checkIfAllKeywordPresentInStrings(scenarios) ||
    //     !this.checkIfAllKeywordPresentInStrings(constraints))) {
    //   // this.alertMessage = 'You have an unresolved choice between ALL or ANY for either a link or an event.' +
    //   //                     ' Please resolved it to process the bindings.';
    //   this.alertMessage = 'You have not inserted an ALL keyword for either a link command, lan command, ' +
    //                       'os command or an event. Please resolve it to process the bindings.';
    //   this.showAlertMsg = true;
    //   return;
    // } else {
    //   this.showAlertMsg = false;
    //   this.stateservice.setAllAnyPresentFlag(false);
    // }

    data.Scenario = scenarios;
    data.Constraints = this.contraintList = constraints;
    this.stateservice.setConstraints(this.contraintList);
    this.http
      .put('v1/pr/hlb/parse', data, { withCredential: true })
      .subscribe((receivedData: ParseApiBean) => {
        //this.suggestAll(receivedData);
        this.extractInfo(receivedData);
      });
  }

  extractInfo(data: ParseApiBean) {
    this.logger.log(LogHeader.TEXT_UPDATED, "Constraints/Scenario Updated");
    this.logger.log(LogHeader.DATA_RECEIVED, "Parsed Scenario - " + data.parsedScenario + " | Parsed Constraints - " + data.parsedConstraints);
    this.updateGraph();
    this.extractScenario(data.parsedScenario);
    this.storeBinding(undefined);
  }

  assignNewActorInTopologyGraph(isLAN) {
    var name;
    var max_count = 0
    for(var i in id_of_node) {
      max_count = Math.max(max_count, id_of_node[i]);
    }
    for(var i in id_of_edge) {
      max_count = Math.max(max_count, id_of_edge[i]['id']);
    }
    name = isLAN ? "lan" + (max_count + 1) : "actor" + (max_count + 1);
    id_of_node[name] = max_count + 1;
    var temp = this.stateservice.getConstraints().source['_value'];
    isLAN ? temp.push("lan [ bw 1, delay 0 ]") : temp.push(name + " [ num 1 ]");
    // this.stateservice.setConstraints(temp);
    this.createNewGraphTypeObject(isLAN, name);
    return [isLAN ? "" : name, max_count+1];
  }

  assignNewEdgeInTopologyGraph(from, to) {
    var max_count = 0
    for(var i in id_of_edge) {
      max_count = Math.max(max_count, id_of_edge[i]['id']);
    }
    for(var i in id_of_node) {
      max_count = Math.max(max_count, id_of_node[i]);
    }
    var swappedNodes = swapJSON(id_of_node);
    var name = swappedNodes[from] + '-' + swappedNodes[to];
    id_of_edge[name] = {from: from, to: to, id: max_count + 1};
    console.log(id_of_edge)
    var temp = this.stateservice.getConstraints().source['_value'];
    temp.push('link ' + swappedNodes[from] + ' ' + swappedNodes[to] + " [ bw 1, delay 0 ]");
    // this.stateservice.setConstraints(temp);
    this.createNewGraphTypeObjectEdge(name);
    return max_count + 1;
  }

  createNewGraphTypeObjectEdge(name) {
    var temp = {};
    temp['bandwidth'] = '1';
    temp['delay'] = '0';
    temp['ipAddress'] = '';
    temp['operatingSystem'] = '';
    temp['hardwareType'] = '';
    temp['nodeName'] = name;
    temp['num'] = '';
    temp['type'] = GraphItemType.LINK;
    this.graphItemParametersList[id_of_edge[name]['id']] = temp;
    globalGraphItemParametersList = this.graphItemParametersList;
  }

  createNewGraphTypeObject(isLAN, name) {
    var temp = {}
    temp['bandwidth'] = isLAN ? '1': '';
    temp['delay'] = isLAN ? '0': '';
    temp['ipAddress'] = '';
    temp['operatingSystem'] = '';
    temp['hardwareType'] = '';
    temp['nodeName'] = name;
    temp['num'] = isLAN ? '' : '1';
    temp['type'] = isLAN ? GraphItemType.LAN : GraphItemType.NODE;
    this.graphItemParametersList[id_of_node[name]] = temp;
    globalGraphItemParametersList = this.graphItemParametersList;
  }

  updateGraph(updateTopology: boolean = true, updateDependency: boolean = true) { //Update the Graph View
    this.logger.log(LogHeader.GRAPH_UPDATE, "Graph update initiated");
    var request = {
      ParseType: 'bash',
      scenario: [],
      constraints: [],
    };
    var scenarios = this.getScenariosFromEditor();
    var constraints = this.getConstraintsFromEditor();
    request.constraints = constraints;
    request.scenario = scenarios;
    if (updateTopology) {
      this.http
      .put('v1/pr/hlb/topology/parse', request, { withCredential: true })
      .subscribe((receivedData: ParseApiBean) => {
        //Graph Operations
        var temp_nodes = [];
        var temp_edges = [];
        id_of_node = {};
        id_of_edge = {};
        var id_count = 1;
        var temp;
        //Populate the Nodes in the Graph
        var actors = receivedData['actors'];
        for (var data in actors) {
          //Create actor group
          if (!this.actorsGroup.has(data)) {
            this.actorsGroup.set(data, this.actorsGroup.size);
          }
          if (!id_of_node[data]) {
            id_of_node[data] = id_count;
            temp = {
              id: id_count++,
              label: data.toString(),
              group: "group" + this.actorsGroup.get(data)
            }
            temp_nodes.push(temp);
            temp = {}
            temp['bandwidth'] = '';
            temp['delay'] = '';
            temp['ipAddress'] = actors[data]['location'] == 'default' ? '' : actors[data]['location'];
            temp['operatingSystem'] = actors[data]['os'] == 'default' ? '' : actors[data]['os'];
            temp['hardwareType'] = actors[data]['nodeType'] == 'default' ? '' : actors[data]['nodeType'];
            temp['nodeName'] = data;
            temp['num'] = actors[data]['num'];
            temp['type'] = GraphItemType.NODE;
            this.graphItemParametersList[id_count-1] = temp;
            globalGraphItemParametersList = this.graphItemParametersList;
          }
        }
        var received_lans = receivedData['lans'];
        for(var i = 0; i < received_lans.length; i++) {
          var name = received_lans[i]['type'] + received_lans[i]['lineNum']
          if (!id_of_node[name]) {
            id_of_node[name] = id_count;
            temp = {
              id: id_count++,
              label: "",
              group: "LAN"
            }
            temp_nodes.push(temp);
          }
        }


        //Populate the Edges in the Graph
        var received_edges = receivedData['edges'];
        for(var i = 0; i < received_edges.length; i++) {
          var source = received_edges[i]['source'];
          var target = received_edges[i]['target'];
          temp = {
            from: id_of_node[source],
            to: id_of_node[target],
            id: id_count++
          }
          temp_edges.push(temp);
          id_of_edge[source + '-' + target] = temp;
          temp = {};
          temp['bandwidth'] = received_edges[i]['bw']=='default' ? '1' : received_edges[i]['bw']; //Default Value
          temp['delay'] = received_edges[i]['delay']=='default' ? '0' : received_edges[i]['delay']; //Default Value
          temp['ipAddress'] = '';
          temp['operatingSystem'] = '';
          temp['hardwareType'] = '';
          temp['nodeName'] = '';
          temp['num'] = ''; //The value is empty to help with the backend parsing of graph to text
          temp['type'] = target.includes('lan') ? GraphItemType.LAN : GraphItemType.LINK;
          var pointer = temp['type'] == GraphItemType.LAN ? id_of_node[target] : id_count-1;
          this.graphItemParametersList[pointer] = temp;
          globalGraphItemParametersList = this.graphItemParametersList;
        }
        //Log Data
        this.logger.log(LogHeader.GRAPH_UPDATE, entry.printGraphParameterData(globalGraphItemParametersList, id_of_node, id_of_edge));

        // Create an array with nodes
        this.topologyGraphNodes = new DataSet<any>(
          temp_nodes
        );

        // Create an array with edges
        this.topologyGraphEdges = new DataSet<any>(
          temp_edges
        );

        var nodes = this.topologyGraphNodes;
        var edges = this.topologyGraphEdges;

        this.graph_data = { nodes, edges };

        this.topologyNetworkInstance = new Network(this.topologyGraphNetwork.nativeElement, this.graph_data, {
          manipulation: {
            enabled: false,
            initiallyActive: false,
            addNode: (nodeData, callback) => {
              [nodeData.label, nodeData.id] = this.assignNewActorInTopologyGraph(nodeData.group == "LAN");
              if (!this.actorsGroup.has(nodeData.label)) {
                this.actorsGroup.set(nodeData.label, this.actorsGroup.size);
              }
              if (this.addNodeType == "LAN") {
                nodeData.group = "LAN";
                nodeData.label = "";
              } else {
                nodeData.group = "group" + this.actorsGroup.get(nodeData.label)
              }
              this.clearMessage();
              this.onTopologyChange();
              callback(nodeData);
            },
            addEdge: (edgeData, callback) => {
              //Check for self connection
              if (edgeData.from == edgeData.to) {
                return;
              }
              //Check if such an edge already exists or 2 LANs are connected
              const sameEdges = this.topologyGraphEdges.get({
                filter: (edge) =>
                  (edge.from == edgeData.from && edge.to == edgeData.to) ||
                  (edge.from == edgeData.to && edge.to == edgeData.from) ||
                  (this.topologyGraphNodes.get(edgeData.from)["group"] == "LAN" && this.topologyGraphNodes.get(edgeData.to)["group"] == "LAN")
              });
              if (sameEdges.length) {
                return;
              }

              this.clearMessage();
              edgeData.id = this.assignNewEdgeInTopologyGraph(edgeData.from, edgeData.to);
              this.onTopologyChange();
              callback(edgeData);
            },
            deleteNode: (data, callback) => {
              //Remove node from id_of_node and all linked edges from id_of_edge
              delete id_of_node[Object.keys(id_of_node).find(node_name => id_of_node[node_name] == data.nodes[0])]
              delete globalGraphItemParametersList[data.nodes[0] + ""]
              for (const deletedEdge of data.edges) {
                delete id_of_edge[Object.keys(id_of_edge).find(edge_name => id_of_edge[edge_name].id == deletedEdge)]
              }

              this.onTopologyDelete(this.topologyGraphNodes.get(data.nodes[0])['label']);
              this.onTopologyChange();
              callback(data);
            },
            deleteEdge: (data, callback) => {
              //Remove deleted edge from id_of_edge
              delete id_of_edge[Object.keys(id_of_edge).find(edge_name => id_of_edge[edge_name].id == data.edges[0])]
              delete globalGraphItemParametersList[data.edges[0] + ""]
              const edge = this.topologyGraphEdges.get(data.edges[0]);
              this.onTopologyChange();
              callback(data);
            }
          },
          edges: {
            color: '#777777'
          },
          nodes: {
            image: "/assets/server.png",
            shape: "image",
          },
          groups: {
            LAN: {
              shape: 'circle',
              color: '#000000'
            },
            ...Object.assign({}, ...this.graphColors.map((color, index) => ({ ["group" + (index)]: { font: { color } } })))
          }
        });

        this.topologyNetworkInstance.on('click', function (properties) {
          var ids = properties.nodes;
          var clickedNodes = nodes.get(ids);
          var items = properties.items;
          //Show Dialog Box
          var $dialogBox = $('.dialog-box');
          $dialogBox.hasClass('hide') && $dialogBox.toggleClass('hide');
          clickedNodes.length || items.length || $dialogBox.toggleClass('hide');
          //Show Node/Link Content
          if(clickedNodes.length) {
            accessibleLogger.log(LogHeader.KEY_PRESS, "User Clicked on a Node");
            $('.dialog-box-action-button').removeClass('hide');
            var nodeGroup = clickedNodes[0]['group'];
            nodeGroup.includes('group') && $('.dialog-box-action-button, .modal-add-button').css('background-color', graphColors[nodeGroup.replace('group', '')]) && setActionTriggersInModal();
            $('.modal-title').html('Add Action - ' + clickedNodes[0].label);
            $('#dialog-box-title').html(clickedNodes[0].label) && (currentGraphItemSelection['id'] = clickedNodes[0].id) && (currentGraphItemSelection['type'] = 'node');
            for(var i in id_of_node) {
              if(id_of_node[i] == currentGraphItemSelection['id'] && i.includes('lan')) {
                accessibleLogger.log(LogHeader.KEY_PRESS, "User Clicked on a LAN");
                $('#dialog-box-title').html('LAN') && (currentGraphItemSelection['type'] = 'lan');
                $('.dialog-box-action-button').addClass('hide');
                break;
              }
            }
          }
          if(items.length && (clickedNodes.length == 0)) {
            accessibleLogger.log(LogHeader.KEY_PRESS, "User Clicked on a Link");
            $('#dialog-box-title').html('Link') && (currentGraphItemSelection['id'] = items[0].edgeId) && (currentGraphItemSelection['type'] = 'link');
            $('.dialog-box-action-button').addClass('hide');
            var selectedEdge = items[0]['edgeId'];
            var id_of_nodes_rev = swapJSON(id_of_node);
            for(var i in id_of_edge) {
              if(id_of_edge[i]['id']==selectedEdge && id_of_nodes_rev[id_of_edge[i]['to']].includes('lan')) {
                $dialogBox.toggleClass('hide');
                break;
              }
            }
          }
          if ((items.length && clickedNodes.length == 0) || currentGraphItemSelection['type'] == 'lan') {
            $('.dialog-box-fields:not(is-node)').removeClass('hide');
            $('.dialog-box-fields.is-node').addClass('hide');
          } else if (clickedNodes.length) {
            $('.dialog-box-fields:not(is-node)').addClass('hide');
            $('.dialog-box-fields.is-node').removeClass('hide');
          }
          showRelevantContentInDialogBox(); //Content to Display on the Context Menu
          //Hide dialogBox and customMenu
          //$(".custom-menu").is(':visible') && $(".custom-menu").finish().toggle(100);
          });

          this.topologyNetworkInstance.on('oncontext', function (properties) {
            properties.event.preventDefault();
            // if (!properties.nodes.length) {
            //   $('.toastBox').fadeIn(200);
            //   setTimeout(() => {
            //     $('.toastBox').fadeOut(500);
            //   }, 4000);
            // } else {
            //   $(".custom-menu").is(':visible') && $(".custom-menu").finish().toggle();;
            //   $(".custom-menu").finish().toggle(100);
            //   $(".custom-menu").css({
            //     top: properties.event.pageY - 100 + "px",
            //     left: properties.event.pageX + "px"
            //   });
            // }
          });
        
          if (!this.selectedNetworkInstance) {
            this.selectedNetworkInstance = this.topologyNetworkInstance;
          }
      });
    }

    if (updateDependency) {
      this.http.put("v1/pr/hlb/dependency-graph/has-cycle", {scenarios: scenarios}, { withCredential: true })
        .subscribe((d) => {
          const cyclePath = d["cycle_path"];
          this.dependencyGraphCyclePath = cyclePath;
          this.http.put("v1/pr/hlb/dependency_graph/parse", request, { withCredential: true })
            .subscribe((d) => {
            let nodes = []
            let links = []
            for (const n of d['nodes']) {
              if (!this.actorsGroup.has(n.actors[0])) {
                this.actorsGroup.set(n.actors[0], this.actorsGroup.size);
              }
              var n2 = {
                data: n,
                id: n.id,
                label: n.action,
                group: "group" + this.actorsGroup.get(n.actors[0])
              }
              nodes.push(n2)
            }
    
            for (const e of d['edges']) {
              var e2 = e
              e2.from = e2.source;
              e2.to = e2.target;
              e2.arrows = {
                to: {
                  enabled: true,
                  type: "arrow",
                },
              }
              links.push(e2)
            }
              
            const graphGroups = Object.assign({}, ...this.graphColors.map((color, index) => ({ ["group" + (index)]: { color } })));
              
            this.dependencyGraphNodes = new DataSet<any>(nodes);
            this.dependencyGraphEdges = new DataSet<any>(links);
        
            this.dependencyNetworkInstance = new Network(this.dependencyGraphNetwork.nativeElement, { nodes: this.dependencyGraphNodes, edges: this.dependencyGraphEdges }, {
              manipulation: {
                  enabled: false,
                  initiallyActive: false,
                  addNode: (data, callback) => { return; },
                  deleteNode: (data, callback) => { return; },
                  addEdge: (edgeData, callback) => {
                    
                    if (edgeData.from == edgeData.to) {
                      return;
                    }
                    //Check if such an edge already exists
                    const sameEdges = this.dependencyGraphEdges.get({
                      filter: (edge) =>
                        (edge.from == edgeData.from && edge.to == edgeData.to) ||
                        (edge.from == edgeData.to && edge.to == edgeData.from)
                    });
                    if (sameEdges.length) {
                      return;
                    }
    
                    edgeData.arrows = {
                      to: {
                        enabled: true,
                        type: "arrow",
                      },
                    };
                    const actorFrom = this.dependencyGraphNodes.get(edgeData.from)["data"].actors[0];
                    const actionFrom = this.dependencyGraphNodes.get(edgeData.from)["data"].action;
    
                    const actorTo = this.dependencyGraphNodes.get(edgeData.to)["data"].actors[0];
                    const actionTo = this.dependencyGraphNodes.get(edgeData.to)["data"].action;
                    this.onDependencyUpdateEdge("INSERT", actorFrom, actionFrom, actorTo, actionTo).then((result: any) => {
                      const eventName = result.eventName;
                      const cyclePath = result.cyclePath;
                      //Only add edge if event name received (if event name is null, the new edge creates a cycle)
                      if (!cyclePath) {
                        edgeData.label = eventName;
                        callback(edgeData);
                      }else{
                        alert("Cannot add this dependency, as it will create cyclic dependency");
                      }

                    })
                    this.clearMessage();
                  },
                  deleteEdge: (data, callback) => {
                    const edgeData = this.dependencyGraphEdges.get(data.edges[0]);
                    
                    const actorFrom = this.dependencyGraphNodes.get(edgeData["from"])["data"].actors[0];
                    const actionFrom = this.dependencyGraphNodes.get(edgeData["from"])["data"].action;
    
                    const actorTo = this.dependencyGraphNodes.get(edgeData["to"])["data"].actors[0];
                    const actionTo = this.dependencyGraphNodes.get(edgeData["to"])["data"].action;
                    this.onDependencyUpdateEdge("REMOVE", actorFrom, actionFrom, actorTo, actionTo)
                    this.clearMessage();
                    callback(data);
                  }
              },
              layout: {
                hierarchical: {
                  sortMethod: "directed",
                  shakeTowards: "leaves",
                  treeSpacing: 150,
                  levelSeparation: 100,
                  nodeSpacing: 200,
                  edgeMinimization: false,
                  blockShifting: false
                },
              },
              edges: {
                color: '#999999',
                length: 200
              },
              nodes: {
                shape: "box",
                font: {
                  color: '#FFFFFF'
                }
              },
              groups: graphGroups
            });


            //Show dependency cycle if any
              if (this.dependencyGraphCyclePath) {
                $('#dependencyGraphCycleContainer').show();
                const cycleNodes = this.dependencyGraphCyclePath.map((node, index) => {
                  return {
                    id: index,
                    label: node[1].toString(),
                    group: "group" + this.actorsGroup.get(node[0].toString())
                  }
                })

                const cycleEdge = [];
                for (let i = 0; i < this.dependencyGraphCyclePath.length; i++){
                  cycleEdge.push({
                    from: i,
                    to: (i + 1) % this.dependencyGraphCyclePath.length,
                    arrows: {
                      to: {
                        enabled: true,
                        type: "arrow",
                      },
                    }
                  })
                }

                this.dependencyCycleNetworkInstance = new Network(this.dependencyGraphCycleNetwork.nativeElement, { nodes: cycleNodes, edges: cycleEdge }, {
                  edges: {
                    color: '#999999',
                    length: 200
                  },
                  nodes: {
                    // fixed: true,
                    shape: "box",
                    font: {
                      color: '#FFFFFF'
                    }
                  },
                  groups: graphGroups
                })

              } else {
                $('#dependencyGraphCycleContainer').hide();
              }
          })
      })
    }
    
    $("#graph-container").keyup((e) => {
      this.isKeyPressed = false;
      if (e.key === "Control") {
        this.addNodeType = null;
        this.clearMessage();
        this.selectedNetworkInstance.disableEditMode();
      } else if (e.key === "Delete") {
        this.selectedNetworkInstance.deleteSelected();
        var $dialogBox = $('.dialog-box');
        !$dialogBox.hasClass('hide') && $dialogBox.addClass('hide');
      }
    });

    $("#graph-container").keydown((e) => {
      if (this.isKeyPressed) {
        return;
      }
      this.isKeyPressed = true;
      if (e.key === "Control") {
        this.selectedNetworkInstance.addEdgeMode();
        this.displayMessage("Draw an edge between two nodes");
        accessibleLogger.log(LogHeader.GRAPH_UPDATE, "User initiated drawing an edge");
      }
    });
    this.logger.log(LogHeader.GRAPH_UPDATE, "Graph update completed");
  }

  displayMessage = (message) => {
    $("#graphActionButtonList").hide();
    $("#actionMessage").html(message);
    $("#actionMessage").show();
  }

  clearMessage = () => {
    $("#graphActionButtonList").show();
    $("#actionMessage").html("<span>Press <kbd>Ctrl</kbd> to edit edges, Select a node/edge and press <kbd>Del</kbd> to delete</span>");
    // $("#actionMessage").hide();
  }

  onAddNodeClick = (type) => {
    accessibleLogger.log(LogHeader.GRAPH_UPDATE, "User initiated node addition. Node type - " + type);
    if (type == "Node") {
      this.addNodeType = "Node";
      this.displayMessage("Click anywhere to add a node, press <kbd>ESC</kbd> to cancel.");
    } else {
      this.addNodeType = "LAN";
      this.displayMessage("Click anywhere to add a LAN, press <kbd>ESC</kbd> to cancel.");
    }
    this.topologyNetworkInstance.addNodeMode();
    $("#graph-container").focus();
  }

  toggleTopologyView() {
    this.logger.log(LogHeader.KEY_PRESS, "User toggled topology view");
    $('.dependency-topology-toggle-icon-topology').addClass('active');
    $('.dependency-topology-toggle-icon-dependency').removeClass('active');
    $('.graph-box').removeClass('hide');
    $('.graph-box-dependency').addClass('hide');
    //$(".custom-menu").is(':visible') && $(".custom-menu").finish().toggle(100);
    var $dialogBox = $('.dialog-box');
    !$dialogBox.hasClass('hide') && $dialogBox.addClass('hide');
    $('#graphActionButtonList').removeClass('hide');
    this.graphDescription = "This graph depicts the connections between different Node/LAN in the network";
    this.selectedNetworkInstance = this.topologyNetworkInstance;
    this.selectedNetworkInstance.fit();
  }

  toggleDependencyView() {
    this.logger.log(LogHeader.KEY_PRESS, "User toggled dependency view");
    $('.dependency-topology-toggle-icon-topology').removeClass('active');
    $('.dependency-topology-toggle-icon-dependency').addClass('active');
    $('.graph-box').addClass('hide');
    $('.graph-box-dependency').removeClass('hide');
    //$(".custom-menu").is(':visible') && $(".custom-menu").finish().toggle(100);
    var $dialogBox = $('.dialog-box');
    !$dialogBox.hasClass('hide') && $dialogBox.addClass('hide');
    $('#graphActionButtonList').addClass('hide');
    this.graphDescription = "This graph depicts the dependency between different actions as stated in scenario";
    this.selectedNetworkInstance = this.dependencyNetworkInstance;
    this.selectedNetworkInstance.fit();
    this.dependencyCycleNetworkInstance.fit();
  }

  onTopologyChange() {
    this.logger.log(LogHeader.KEY_PRESS, "The topology changed");
    var request = {
      parameters: [JSON.stringify(globalGraphItemParametersList)],
      nodes: [JSON.stringify(id_of_node)],
      edges: [JSON.stringify(id_of_edge)]
    };
    this.http
    .put('v1/pr/hlb/topology-graph/generate-constrains', request, { withCredential: true })
      .subscribe((receivedData: ParseApiBean) => {
        this.stateservice.setConstraints(receivedData['constraints']);
        this.logger.log(LogHeader.DATA_RECEIVED, "Updated constraints - " + receivedData['constraints']);
    });
  }

  onTopologyDelete(deletedNode: string) {
    this.logger.log(LogHeader.KEY_PRESS, "User tried to delete a topology element");
    var request = {
      scenarios: this.getScenariosFromEditor(),
      bindings: [JSON.stringify(this.bindingList)],
      deleted_node: deletedNode,
    };
    this.logger.log(LogHeader.DATA_SENT, "Scenario - " + request['scenarios'] + ",Bindings - " + request['bindings'] + ", Deleted Node - " + request['deleted_node']);
    this.http
    .put('v1/pr/hlb/topology/graph-remove', request, { withCredential: true })
      .subscribe((receivedData: ParseApiBean) => {
        this.stateservice.setBehavior(receivedData['scenarios']);
        this.stateservice.setBindings(receivedData['bindings']);
        this.logger.log(LogHeader.DATA_RECEIVED, "Scenario - " + receivedData['scenarios'] + ", Bindings - " + receivedData['bindings']);
        setTimeout(() => {
          this.updateGraph(false, true);
        }, 500)
    });
  }

  onTopologyParametersChange(event: any) {
    // type: GraphItemType,
    // bandwidth: string,
    // delay: string,
    // ipAddress: string,
    // operatingSystem: string,
    // hardwareType: string
    // num: string
    this.logger.log(LogHeader.GRAPH_UPDATE, "Topology parameters have changed");
    var temp = this.graphItemParametersList[currentGraphItemSelection['id']] ? this.graphItemParametersList[currentGraphItemSelection['id']] : null;
    if (!temp) {
      temp = {};
      temp['bandwidth'] = '1'; //Default Value
      temp['delay'] = '0'; //Default Value
      temp['ipAddress'] = '';
      temp['operatingSystem'] = '';
      temp['hardwareType'] = '';
      temp['nodeName'] = '';
      temp['num'] = '1'; //Default Value
      switch (currentGraphItemSelection['type']) {
        case 'node':
          temp['type'] = GraphItemType.NODE;
          temp['nodeName'] = $('#dialog-box-title').html();
          break;
        case 'link':
          temp['type'] = GraphItemType.LINK;
          break;
        case 'lan':
          temp['type'] = GraphItemType.LAN;
          break;
      }
    }
    var currentValue = event.target.value;
    var currentField = $(event.target).attr('id');
    switch (currentField) {
      case 'node-ip-address':
        temp['ipAddress'] = currentValue;
        break;
      case 'node-operating-system':
        temp['operatingSystem'] = currentValue;
        break;
      case 'node-hardware-type':
        temp['hardwareType'] = currentValue;
        break;
      case 'node-num':
        temp['num'] = currentValue=="" || (parseInt(currentValue)<=0) ? '1': currentValue;
        $('#node-num').val(temp['num']);
        break;
      case 'link-bandwidth':
        temp['bandwidth'] = currentValue=="" || (parseInt(currentValue)<0) ? '1': currentValue;
        $('#link-bandwidth').val(temp['bandwidth']);
        break;
      case 'link-delay':
        temp['delay'] = currentValue=="" || (parseInt(currentValue)<0) ? '0': currentValue;
        $('#link-delay').val(temp['delay']);
        break;
    }
    this.graphItemParametersList[currentGraphItemSelection['id']] = temp;
    globalGraphItemParametersList = this.graphItemParametersList;
    this.logger.log(LogHeader.GRAPH_UPDATE, entry.printGraphParameterData(globalGraphItemParametersList, id_of_node, id_of_edge));
    this.onTopologyChange();
  }

  onDependencyUpdateEdge(updateType, actorFrom, actionFrom, actorTo, actionTo) {
    this.logger.log(LogHeader.GRAPH_UPDATE, "User updated edge of dependency graph. actorFrom - " + actorFrom + ", actionFrom - " + actionFrom + ", actorTo - " + actorTo + ", actionTo - " + actionTo);
    return new Promise((resolve, reject) => {
      var request = {
        scenarios: this.getScenariosFromEditor(),
        bindings: [JSON.stringify(this.bindingList)],
        actor_from: actorFrom,
        action_from: actionFrom,
        actor_to: actorTo,
        action_to: actionTo,
        update_type: updateType
      };
      this.http
        .put('v1/pr/hlb/dependency-graph/update-edge', request, { withCredential: true })
        .subscribe((receivedData: ParseApiBean) => {
          this.stateservice.setBehavior(receivedData['scenarios']);
          this.stateservice.setBindings(receivedData['bindings']);
          resolve({ eventName: receivedData['event_name'], cyclePath: receivedData['cycle_path']});
        });
    });
    
  }

  removeConstraintSentences(data) {
    var temp = [];
    data.forEach(element => {
      if (!['os', 'nodetype', 'location'].includes(element.split(' ')[0])) {
        temp.push(element);
      }
    });
    return temp;
  }

  checkIfEmittedEventIsATriggerEvent(emittedEvents, scenario) {
    if (!emittedEvents) {
      return false;
    }
    for (const evt of emittedEvents) {
      for (const sce of scenario) {
        if (sce[0] && sce[0].includes(evt)) {
          return true;
        }
      }
    }
    return false;
  }

  checkIfAllOrAnyAlreadyEntered(emittedEvents) {
    for (const evt of emittedEvents) {
      const allIdxs = _.map(_.keys(_.pickBy(this.scenariosObjFormat, { insert: evt + ' ' })), Number);
      for (const idx of allIdxs) {
        if (idx > 0) {
          if (this.scenariosObjFormat[idx - 1].insert.toLowerCase() === 'all ') {
            // || this.scenariosObjFormat[idx - 1].insert.toLowerCase() === 'any ') {
            return true;
          }
        }
      }
    }
    return false;
  }

  async addAllInScenarioEditor(emittedEvents) {
    // addAllAnyInScenarioEditor - change function name to this when including all and any
    if (!emittedEvents) {
      return;
    }

    for (const val of emittedEvents) {
      const allIdxs = _.map(_.keys(_.pickBy(this.scenariosObjFormat, { insert: val + ' ' })), Number);

      // Add the all/any keyword at the location of the when keyword and assign new array to the scenario object array
      const tempObjFmtArray = _.cloneDeep(this.scenariosObjFormat);

      for (const idx of allIdxs) {
        if (idx > 0) {
          if (this.scenariosObjFormat[idx - 1].insert.toLowerCase() === 'when ') {
            // tempObjFmtArray.splice(idx, 0, {insert: 'ALL|ANY ', attributes: {bold: true, color: 'red'}});
            tempObjFmtArray.splice(idx, 0, { insert: 'all ' });
          }
        }
      }

      this.scenariosObjFormat = tempObjFmtArray;
    }
  }

  async addAllInConstraintsEditor(actor) {
    // addAllAnyInConstraintsEditor - change function name to this when including all and any
    if (!actor) {
      return;
    }
    // Add the all/any keyword at the location of the when keyword and assign new array to the scenario object array
    const tempObjFmtArray = _.cloneDeep(this.constraintsObjFormat);
    // Get all indexes where the actor is present
    const allIdxs = _.map(_.keys(_.pickBy(tempObjFmtArray, { insert: actor + ' ' })), Number);
    for (const idx of allIdxs) {
      if (idx === 1) {
        if (this.constraintsObjFormat[idx - 1].insert.toLowerCase() === 'link ' ||
          this.constraintsObjFormat[idx - 1].insert.toLowerCase() === 'lan ') {
          // tempObjFmtArray.splice(idx, 0, {insert: 'ALL|ANY ', attributes: {bold: true, color: 'red'}});
          tempObjFmtArray.splice(idx, 0, { insert: 'all ' });
          continue;
        }
      }
      if (idx > 1) {
        if ((this.constraintsObjFormat[idx - 1].insert.toLowerCase() === 'link ' ||
          this.constraintsObjFormat[idx - 2].insert.toLowerCase() === 'link ' ||
          this.constraintsObjFormat[idx - 1].insert.toLowerCase() === 'lan ' ||
          this.constraintsObjFormat[idx - 2].insert.toLowerCase() === 'lan ') &&
          (this.constraintsObjFormat[idx - 1].insert.toLowerCase() !== 'all ')) {
          // tempObjFmtArray.splice(idx, 0, {insert: 'ALL|ANY ', attributes: {bold: true, color: 'red'}});
          tempObjFmtArray.splice(idx, 0, { insert: 'all ' });
        }
      }
    }
    this.constraintsObjFormat = tempObjFmtArray;
  }

  validateAllKeywordIfPresent(constraints, actorEventObj) {
    // Filter all actors with the all keyword
    const constraintsWithNum = _.filter(constraints, (v) => v[0] === 'num');

    // First run in the scenario editor and update the object
    let tempArray = _.cloneDeep(this.scenariosObjFormat);
    let allIdxs = _.map(_.keys(_.pickBy(tempArray, { insert: 'all ' })), Number);
    for (const idx of allIdxs) {
      const actName = _.findKey(actorEventObj, (v, k) => {
        return v.includes(this.scenariosObjFormat[idx + 1].insert.trimEnd());
      });
      const numActor = _.find(constraintsWithNum, v => v[1][0] === actName);
      if (!constraintsWithNum.map(v => v[1][0]).includes(actName) ||
        (numActor && parseInt(numActor[2][0], 10) === 1)) {
        tempArray.splice(idx, 1);
      }
    }
    if (!_.isEqual(this.scenariosObjFormat, tempArray)) {
      this.scenariosObjFormat = tempArray;
    }

    // Secondly run in the constraints editor and update the object
    tempArray = _.cloneDeep(this.constraintsObjFormat);
    allIdxs = _.map(_.keys(_.pickBy(tempArray, { insert: 'all ' })), Number);
    for (const idx of allIdxs) {
      const actName = this.constraintsObjFormat[idx + 1].insert.trimEnd();
      const numActor = _.find(constraintsWithNum, v => v[1][0] === actName);
      if (!constraintsWithNum.map(v => v[1][0]).includes(actName) ||
        (numActor && parseInt(numActor[2][0], 10) === 1)) {
        tempArray.splice(idx, 1);
      }
    }
    if (!_.isEqual(this.constraintsObjFormat, tempArray)) {
      this.constraintsObjFormat = tempArray;
    }
  }

  suggestAll(parsedConstraintData: ParseApiBean) {
    // change name to suggestAllAny when adding any also
    const actorEventObj = {};
    parsedConstraintData.parsedConstraints.forEach((val) => {
      if (val[2]) {
        // Check if its in any link attribute
        const foundInLinkLan = _.find(parsedConstraintData.parsedConstraints, (vl) => {
          return (vl[0] === 'link' || vl[0] === 'lan') && vl[1].includes(val[1][0]);
        });

        // get if the Actor emits an event and get the emitted events
        const foundScenario = _.find(parsedConstraintData.parsedScenario, (vl) => {
          return vl[1].includes(val[1][0]);
        });
        const emittedEvents = foundScenario ? foundScenario[3] : [];
        // this.validateAllKeywordIfPresent(val[1][0], emittedEvents, val);

        actorEventObj[val[1][0]] = emittedEvents;
        // if it has a link attribute or its emitted event is waited for my some node
        if (val[0] === 'num' && parseInt(val[2][0], 10) > 1 && (foundInLinkLan || (this.checkIfEmittedEventIsATriggerEvent(emittedEvents,
          parsedConstraintData.parsedScenario) && !this.checkIfAllOrAnyAlreadyEntered(emittedEvents)))) {
          // this.alertMessage = 'You should have an ALL or ANY preceding ' + val[1][0] + '. Please see the documentation';
          this.alertMessage = 'An ALL keyword has been inserted preceding ' + val[1][0] +
            ' and/or its events as it maps to multiple nodes. Please see the documentation';
          this.showAlertMsg = true;
          setTimeout(() => {
            this.showAlertMsg = false;
          }, 5000);

          // add all in the scenarios and constraints
          Promise.all([this.addAllInScenarioEditor(emittedEvents), this.addAllInConstraintsEditor(val[1][0])])
            .then((done) => {
              // Still have to resolve the promises part. This is a hack and ugly way of doing it
              setTimeout(() => {
                this.stateservice.setBehavior(this.getScenariosFromEditor());
                this.stateservice.setConstraints(this.getConstraintsFromEditor());
              }, 1000);
            });
          this.stateservice.setAllAnyPresentFlag(true);
        }
      }
    });
    this.validateAllKeywordIfPresent(parsedConstraintData.parsedConstraints, actorEventObj);
  }

  toggleSpecialFuncDialog() {
    this.showSpecialFuncDialog = !this.showSpecialFuncDialog;
  }

  unsetShowAlertMessage() {
    this.showAlertMsg = false;
  }

  extractScenario(scenario) {
    // console.log(scenario);
    // this.bindingMap = new Map<String,any>();
    this.actorsList = [];
    this.bindingList = [];
    const trigger = [];
    scenario.forEach((element) => {
      this.extractActors(element[1] != null ? element[1] : []);

      if (element[0] != null) {
        element[0].map((x) => {
          if (!trigger.includes(x)) {
            trigger.push({ key: x, category: 't_event', value: '' });
          }
        });
      }

      if (element[2] != null) {
        element[2].map((x) => {
          if (!trigger.includes(x)) {
            trigger.push({ key: x, category: 'action', value: '' });
          }
        });
      }

      if (element[3] != null) {
        element[3].map((x) => {
          if (!trigger.includes(x)) {
            trigger.push({ key: x, category: 'event', value: '' });
          }
        });
      }
    });
    this.extractEvents(trigger);
    this.extractTriggers(trigger);

    // this.loadBindings();
    this.changeDetection.detectChanges();
  }

  extractTriggers(triggers) {
    triggerSignals = []
    for(var item of triggers) {
      if(item['category']=='t_event') {
        triggerSignals.push(item['key']);
      }
    }
  }

  isEmpty(binding): boolean {
    if (binding.value == undefined) return true;
    return binding.value.trim() == "";
  }
  loadBindings() {
    this.bindingMap.forEach((value, key) => {
      this.bindingList.push(key);
    });
  }
  extractEvents(
    triggers //,actions,emitters
  ) {
    if (triggers != null) {
      triggers.forEach((element) => {
        if (!this.bindingMap.has(element.key)) {
          this.bindingMap.set(element.key, element);
          this.bindingList.push(element);
        } else {
          if (!this.bindingList.some(e => e.key === element.key)) {
            this.bindingList.push(this.bindingMap.get(element.key));
          }
        }
      });
    }
    //   if(actions!=null)
    //   actions.forEach(element => {
    //     //console.log(element);

    //     if (!this.bindingMap.has(element)){
    //       var t = {key:element,value:""};
    //       this.bindingMap.set(element,t);
    //       this.bindingList.push(t);
    // }else{
    //   this.bindingList.push(this.bindingMap.get(element));

    // }
    //   });
    //   if(emitters!=null)
    //   emitters.forEach(element => {
    //     //console.log(element);

    //     if (!this.bindingMap.has(element)){
    //       var t = {key:element,value:""};
    //       this.bindingMap.set(element,t);
    //       this.bindingList.push(t);
    // }else{
    //   this.bindingList.push(this.bindingMap.get(element));

    // }
    //   });

    // //console.log(this.bindingMap);
  }
  logChangeBehavior(event) {
    // if (this.behaviorService.getText().trim() === "") return;
    // var index = this.behaviorService.getText().length-2;
    // if (this.behaviorService.getText().charAt(index) == '\n')
    //     this.updateActors();
  }
  logChangeConstraints(event) {
    // if (this.constraintService.getText().trim() === "") return;
    // //console.log(this.constraintService.getText().charAt(this.constraintService.getText().length-1))
  }
  insertValue(text: any, flag: boolean = false) {
    // console.log("word:"+text);
    this.service.insertVaue(text, flag, this.behaviorTextFilter.text);
  }
  insertValueInConstraint(text: any, flag: boolean = false) {
    this.service.insertVaue(text, flag, this.constraintTextFilter.text);
  }

  selectTextBox(id: number) {
    this.textBoxId = id;
    switch (id) {
      case 1:
        this.service = this.actorService;
        break;
      case 2:
        this.service = this.behaviorService;
        break;
      case 3:
        this.service = this.constraintService;
        break;
    }
  }

  isEnable(id: number): Boolean {
    return this.textBoxId == id;
  }

  extractActors(data: Array<any>) {
    data.forEach((element) => {
      ////console.log(element);
      this.insertActor(element);
    });
    var alist = [];
    this.actorsList.forEach((element) => {
      alist.push(element.text);
    });
    this.stateservice.setActors(alist);
  }

  showInfo(id: number) {
    //console.log(this.bindingList);

    var dialogRef = this.dialog.open(HLBInforPopUp, {
      width: "70%",
      data: id,
    });
  }

  insertActor(actor: String) {
    var t = this.actorsList.find(function (element) {
      return element.text === actor;
    });

    // //console.log(t);
    if (t == undefined) this.actorsList.push({ text: actor });
  }
  clear() {
    //console.log(this.behaviorText);
    this.service.clear();
    this.behaviorText = "";
  }

  selectedTab(index: number) {
    this.selectedIndex = index;
  }

  addBindings() {
    //console.log(this.bindingList);

    var dialogRef = this.dialog.open(BindingPopUp, {
      width: "70%",
      data: this.bindingList,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log('The dialog was closed');
      this.generateNs();
    });
  }
  generateNs() {
    var data = {
      actors: [],
      behaviors: [],
      constraints: [],
      bindings: [],
    };

    if (this.actorsList.length == 0) return;

    if (this.behaviorList.length == 0) return;
    this.actorsList.forEach((element) => {
      data.actors.push(element.text);
    });
    var flag = false;
    this.behaviorList.forEach((element) => {
      data.behaviors.push(element);
    });
    this.contraintList.forEach((element) => {
      data.constraints.push(element.text);
    });
    this.bindingList.forEach((element) => {
      if (element.value == null || element.value.trim() == "") {
        flag = true;
        return;
      }
      data.bindings.push(element.key + " " + element.value);
    });

    if (flag) return;
    this.stateservice.enableLoader();
    this.http
      .put("v1/pr/hlb/generateNs", data, { withCredential: true })
      .subscribe(
        (data) => {
          //console.log(data);
          this.stateservice.disableLoader();
          this.downLoadFile(data.script);
          this._snackBar.open("Successfully Downloaded.", "close", {
            duration: 2000,
          });
          // this.stateservice.setBindings(data.Bindings);
        },
        (error) => {
          this.stateservice.disableLoader();
          this._snackBar.open(error, "close", {
            duration: 2000,
          });
        }
      );
  }
  storeBinding(index) {
    const str1 = ' - file exists';
    const str2 = ' - file was modified';
    const str3 = ' - process exists that performs action in the binding';
    const str4 = ' - process completed w success for the given action';

    // This part is done just to remove the the description
    if (index && (this.bindingList[index].value.includes(str1) || this.bindingList[index].value.includes(str2) ||
      this.bindingList[index].value.includes(str3) || this.bindingList[index].value.includes(str4))) {
      const splitter = this.bindingList[index].value.split(' - ');
      this.bindingList[index].value = splitter[0];
    }
    this.stateservice.setBindings(this.bindingList);
  }

  downLoadFile(data: any) {
    var blob = new Blob([data], { type: "text/plain" });
    //console.log(blob);
    // var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var fileName = "experiment.txt";
    if ("msSaveOrOpenBlob" in navigator) {
      navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      var downloadLink = document.createElement("a");
      downloadLink.download = fileName;
      downloadLink.innerHTML = "Download File";
      downloadLink.href = window.URL.createObjectURL(blob);
      //downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      //  }

      downloadLink.click();
    }
  }
}

@Component({
  selector: "hlb-binding",
  templateUrl: "hlb-binding.component.html",
  styleUrls: ["./hlb.component.scss"],
})
export class BindingPopUp {
  constructor(
    public dialogRef: MatDialogRef<BindingPopUp>,
    @Inject(MAT_DIALOG_DATA) public bindingList: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "hlb-info",
  templateUrl: "hlb-info.component.html",
  styleUrls: ["./hlb.component.scss"],
})
export class HLBInforPopUp {
  constructor(
    public dialogRef: MatDialogRef<HLBInforPopUp>,
    @Inject(MAT_DIALOG_DATA) public showId: number
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

var currentGraphItemSelection = {};
var globalGraphItemParametersList;
var id_of_node = {};
var id_of_edge = {};
let accessibleLogger;
let entry = new LogEntry();
var graphColors;
var triggerSignals;

function swapJSON(data) {
  var temp = {};
  for(var i in data) {
    temp[data[i]] = i;
  }
  return temp;
}

function setActionTriggersInModal() {
  var content;
  content = triggerSignals.map((item) => { return ('<option>' + item + '</option>') });
  content = content.reduce((prevVal, curVal) => prevVal + curVal);
  $('#modal-action-trigger-selections').html(content);
}

function showRelevantContentInDialogBox() {
  try {
    var temp = globalGraphItemParametersList[currentGraphItemSelection['id']];
    if (!temp) {
      $('#node-ip-address').val('');
      $('#node-operating-system').val('');
      $('#node-hardware-type').val('');
      $('#node-num').val('');
      $('#link-bandwidth').val('');
      $('#link-delay').val('');
    } else {
      $('#node-ip-address').val(temp.ipAddress);
      $('#node-operating-system').val(temp.operatingSystem);
      $('#node-hardware-type').val(temp.hardwareType);
      $('#node-num').val(temp.num);
      $('#link-bandwidth').val(temp.bandwidth);
      $('#link-delay').val(temp.delay);
    }
  } catch (ex) {
    //Do nothing
  }
}