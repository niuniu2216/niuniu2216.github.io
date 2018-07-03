require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        text: "Hello, World!"
      },
      onLoad: function onLoad() {
        this.label.string = this.text;
        if (cc.sys.isNative) {
          cc.log("Path:" + jsb.fileUtils.getWritablePath());
          cc.log(jsb.fileUtils.writeToFile({
            new: "value"
          }, jsb.fileUtils.getWritablePath() + "data.json"));
          cc.log("fullPathForFilename:" + jsb.fileUtils.fullPathForFilename("resources/data.json"));
        }
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "HelloWorld" ]);
//# sourceMappingURL=project.dev.js.map