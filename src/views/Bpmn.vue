<template>
  <div class="flow-container">
    <div class="containers" ref="content">
      <div class="canvas" id="canvas"></div>
      <div id="js-properties-panel" class="panel"></div>
      <div>
        <button @click="download">保存到本地</button>
        <button @click="createNew">新建</button>
      </div>
    </div>
  </div>
</template>
<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
// import bpmnModdleDescriptor from 'bpmn-moddle/resources/bpmn/json/bpmn.json';

// BPMN国际化
import customTranslate from "./bpmn/customTranslate";
// 自定义汉化模块
const customTranslateModule = {
  translate: ["value", customTranslate],
};

export default {
  name: "bpmn",
  data() {
    return {
      viewer: null,
      canvas: null,
      bpmnText: "",
    };
  },
  mounted() {
    this.$nextTick().then(() => {
      this.canvas = document.getElementById("canvas");

      this.viewer = new BpmnModeler({
        container: this.canvas,
        keyboard: {
          bindTo: window,
        },
        propertiesPanel: {
          parent: "#js-properties-panel",
        },
        additionalModules: [
          // 左边工具栏以及节点
          propertiesProviderModule,
          // 右边的工具栏
          propertiesPanelModule,
          // 国际化
          customTranslateModule,
        ],
        // moddleExtensions: {
        //   bpmn: bpmnModdleDescriptor
        // },
      });
      this.create();
    });
  },
  methods: {
    download() {
      this.viewer.saveXML({ format: true }, (err, xml) => {
        if (xml) {
          this.bpmnText = xml;
          let a = document.createElement("a");
          a.href =
            "data:application/bpmn20-xml;charset=UTF-8," +
            encodeURIComponent(xml);
          a.download = "diagram.bpmn";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          a = null;
        }
      });
    },
    create() {
      this.bpmnText =
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
        'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
        'targetNamespace="http://bpmn.io/schema/bpmn" ' +
        'id="Definitions_1">' +
        '<bpmn:process id="Process_1" isExecutable="false">' +
        '<bpmn:startEvent id="StartEvent_1"/>' +
        "</bpmn:process>" +
        '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
        '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
        '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
        "</bpmndi:BPMNShape>" +
        "</bpmndi:BPMNPlane>" +
        "</bpmndi:BPMNDiagram>" +
        "</bpmn:definitions>";
      this.viewer.importXML(this.bpmnText, (err) => {
        if (err) {
          throw err;
        }
        this.viewer.get("canvas").zoom("fit-viewport");
        const eventBus = this.viewer.get("eventBus");

        const events = ["element.click", "element.dblclick"];
        events.forEach((event) => {
          eventBus.on(event, (e) => {
            console.log(event, "on", e.element.id);
          });
        });
      });
    },
    createNew() {
      this.viewer.createDiagram((err) => {
        if (err) {
          throw err;
        }
        this.viewer.get("canvas").zoom("fit-viewport");
        const eventBus = this.viewer.get("eventBus");

        const events = ["element.click", "element.dblclick"];
        events.forEach((event) => {
          eventBus.on(event, (e) => {
            console.log(event, "on", e.element.id);
          });
        });
      });
    },
  },
};
</script>
<style>
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
@import "~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
.flow-container {
  display: flex;
}
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 99.6%;
  height: 85%;
}
.canvas {
  width: 80%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 20%;
  height: 100%;
  overflow-y: scroll;
  background-color: #f8f8f8;
}
</style>
