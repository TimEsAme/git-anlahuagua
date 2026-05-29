import BaseRenderer from "diagram-js/lib/draw/BaseRenderer"; // 引入默认的renderer
import { customElements, customConfig } from "@/components/utils/utils"; // 引入自定义元素和配置
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from "tiny-svg";

import { is } from "bpmn-js/lib/util/ModelUtil";

const HIGH_PRIORITY = 1500; // 最高优先级

export default class CustomRenderer extends BaseRenderer {
  // 继承BaseRenderer
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);

    if (is(element, "bpmn:Task")) {
      // 当元素类型是 bpmn:Task 时
      const rect = drawRect(parentNode, 100, 80, 2, "#52B415"); // 创建一个带绿色边框的矩形

      prependTo(rect, parentNode);

      svgRemove(shape);

      return shape;
    }

    // 其他不属于 bpmn:Task 的元素，如开始事件
    // 也创建一个 红色小矩形
    const rect = drawRect(parentNode, 30, 20, TASK_BORDER_RADIUS, "#cc0000");
    // 放置于左上角;
    svgAttr(rect, {
      transform: "translate(-20, -10)",
    });

    return shape;
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }
}

CustomRenderer.$inject = ["eventBus", "bpmnRenderer"];

// copied from bpmn-js/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor) {
  const rect = svgCreate("rect");

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: strokeColor || "#000",
    strokeWidth: 2,
    fill: "#fff",
  });

  svgAppend(parentNode, rect);

  return rect;
}

// copied from /diagram-js/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}
