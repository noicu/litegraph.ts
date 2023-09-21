```ts
  this.addWidget(
      "text",
      "i",
      this.properties.index,
      "index",
      { precision: 0, step: 10, min: 0 }
  );
  this.addWidget(
      "combo",
      "Combo",
      "red",
      () { },
      { values: ["red", "green", "blue"] }
  );
  this.addWidget(
      "combo",
      "Combo",
      1,
      () { },
      { values: {"title1": 1, "title2": 2} }
  );
  this.addWidget(
      "slider",
      "Slider",
      0.5,
      () { },
      { precision: 0, step: 10, min: 0 }
  );
  this.addWidget(
      "toggle",
      "Toggle",
      0.5,
      () { },
      { precision: 0, step: 10, min: 0 }
  );
  this.addWidget(
      "button",
      "Button",
      0.5,
      () { },
      { precision: 0, step: 10, min: 0 }
  );
  this.addWidget(
      "number",
      "Number",
      0.5,
      () { },
      { precision: 0, step: 10, min: 0 }
  );
```
