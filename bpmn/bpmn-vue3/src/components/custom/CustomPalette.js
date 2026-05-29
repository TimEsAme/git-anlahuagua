export default class CustomPalette {
  constructor(bpmnFactory, palette, create, elementFactory, translate) {
    this.bpmnFactory = bpmnFactory;
    this.palette = palette;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const { create, elementFactory, translate } = this;

    function createTask() {
      return function (event) {
        const shape = elementFactory.createShape({ type: "bpmn:UserTask" });
        create.start(event, shape);
      };
    }

    return {
      "create.jojo-task-red": {
        group: "model",
        className: "bpmn-icon-task red",
        title: translate("创建一个类型为jojo-task-red的任务节点"),
        action: {
          dragstart: createTask(),
          click: createTask(),
        },
      },
      "create.jojo-task-blue": {
        group: "model",
        className: "bpmn-icon-task blue",
        title: translate("创建一个类型为jojo-task-blue的任务节点"),
        action: {
          dragstart: createTask(),
          click: createTask(),
        },
      },
      "create.jojo-task-icon": {
        group: "model",
        className: "icon-custom jojo-task",
        title: translate("创建一个类型为jojo-task-icon的任务节点"),
        action: {
          dragstart: createTask(),
          click: createTask(),
        },
      },
    };
  }
}

CustomPalette.$inject = [
  "bpmnFactory",
  "palette",
  "create",
  "elementFactory",
  "translate",
];
