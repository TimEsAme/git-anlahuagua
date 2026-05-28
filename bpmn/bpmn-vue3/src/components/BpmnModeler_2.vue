<template>
  <!-- 
    BPMN 编辑器容器
    bpmn-js 会把流程图渲染到这个 div 中
  -->
  <div class="jojo">
    <!-- 按钮组 -->
    <div class="button-group">
      <button class="toolbar-btn" @click="handleNew">新建</button>
      <label class="upload-btn">
        <span>导入 XML</span>
        <input
          type="file"
          accept=".xml .bpmn"
          class="upload-input"
          @change="handleImport"
        />
      </label>
      <button class="toolbar-btn" @click="handleExportXML">导出 XML</button>
      <button class="toolbar-btn" @click="handleExportSVG">导出 SVG</button>
    </div>
    <!-- 内容区 -->
    <div class="container">
      <div ref="cavansDom" class="canvas">
        <div id="js-properties-panel" class="panel"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { xmlStr } from "@/mock/xmlStr";
import BpmnModeler from "bpmn-js/lib/Modeler";
import type Canvas from "diagram-js/lib/core/Canvas";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";

// 加入属性控制面板的样式
import "@bpmn-io/properties-panel/assets/properties-panel.css";

// 汉化模块
import customTranslateModule from "@/additional-modules/Translate";

const cavansDom = ref<HTMLElement | null>(null);

let modeler: BpmnModeler | null = null;

// 新建
async function handleNew() {
  const emptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false"/>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"/>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
  await loadXml(emptyXml);
  const canvans = modeler?.get<Canvas>("canvas");
  canvans?.zoom("fit-viewport");
}
// 导出XML
async function handleExportXML() {
  if (!modeler) return;
  const { xml } = await modeler.saveXML({ format: true });
  download("jojo.xml", xml as string, "application/xml");
}
// 导出 SVG
async function handleExportSVG() {
  if (!modeler) return;
  const { svg } = await modeler.saveSVG();
  download("jojo.svg", svg, "image/svg+xml");
}
// 导入本地 .bpmn
async function handleImport(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const text = await file.text();
  await loadXml(text);
  const canvas = modeler!.get<Canvas>("canvas");
  canvas.zoom("fit-viewport");
  input.value = "";
}
// 下载辅助
function download(filename: string, data: string, mime: string) {
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
async function loadXml(xml: string) {
  if (!modeler) return;
  try {
    await modeler.importXML(xml);
  } catch (err) {
    console.error("无法导入 BPMN 2.0 XML", err);
  }
}

onMounted(() => {
  if (!cavansDom.value) return;
  modeler = new BpmnModeler({
    // 指定挂载容器
    container: cavansDom.value,
    // 添加控制面板
    //添加控制板
    propertiesPanel: {
      parent: "#js-properties-panel",
    },
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      customTranslateModule,
    ],
  });
  loadXml(xmlStr);
  const canvans = modeler.get<Canvas>("canvas");
  canvans.zoom("fit-viewport");
});

onBeforeUnmount(() => {
  modeler?.destroy();
  modeler = null;
});
</script>

<style scoped lang="scss">
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

.jojo {
  display: flex;
  flex-direction: column;
  // background-color: firebrick;
}
.container {
  padding: 20px;
  width: 100%;
  height: calc(100vh);
  // background-color: tomato;
}
.canvas {
  position: relative;
  width: 100%;
  height: 600px;
  border: 2px solid #000;
  // background-color: orange;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 350px;
}

/* 按钮组 */
.button-group {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
}

/* 通用按钮样式 */
.toolbar-btn,
.upload-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* hover */
.toolbar-btn:hover,
.upload-btn:hover {
  background-color: #656565;
}

/* 隐藏 input */
.upload-input {
  display: none;
}
</style>
