maskInput("phone", {
  template: "(~~~) ~~~ - ~~~~",
  input: "~",
  space: "_",
  formatValue: true
});

maskInput("social", {
  template: "XXX-XX-~~~~",
  input: "~",
  space: "*",
  hardInput: "X",
  formatValue: false
});

