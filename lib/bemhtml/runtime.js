module.exports = function() {
  var __$that = this,
      __$queue = [];

  // Called after all matches
  function __$flush() {
    __$queue.filter(function(item) {
      return !item.__$parent;
    }).forEach(function(item) {
      function apply(conditions, item) {
        if (item && item.__$children) {
          // Sub-template
          var subcond = conditions.concat(item.__$cond);
          item.__$children.forEach(function(child) {
            apply(subcond, child);
          });
        } else {
          // Body
          template.apply(null, conditions)(item);
        }
      }
      apply([], item);
    });
  };

  // Matching
  function match() {
    function fn() {
      var args = Array.prototype.slice.call(arguments);

      args.forEach(function(arg) {
        if (arg && arg.__$children) {
          // Sub-template
          arg.__$parent = fn;
        }
        fn.__$children.push(arg);
      });

      // Handle match().match()
      var res = fn;
      while (res.__$parent) res = res.__$parent;
      return res;
    };
    __$queue.push(fn);
    fn.__$children = [];
    fn.__$parent = null;
    fn.__$cond = Array.prototype.slice.call(arguments);

    fn.match = match;
    fn.block = block;
    fn.elem = elem;
    fn.mode = mode;
    fn.def = def;
    fn.tag = tag;
    fn.attrs = attrs;
    fn.cls = cls;
    fn.js = js;
    fn.jsAttr = jsAttr;
    fn.bem = bem;
    fn.mix = mix;
    fn.content = content;

    // match().match()
    if (this && this.__$children) {
      this.__$children.push(fn);
      fn.__$parent = this;
    }

    return fn;
  };

  function block(name) {
    return match.call(this, __$that.block === name);
  };

  function elem(name) {
    return match.call(this, __$that.elem === name);
  };

  function mode(name) {
    return match.call(this, __$that._mode === name);
  };

  function def() { return mode.call(this, 'default'); };
  function tag() { return mode.call(this, 'tag'); };
  function attrs() { return mode.call(this,'attrs'); };
  function cls() { return mode.call(this, 'cls'); };
  function js() { return mode.call(this, 'js'); };
  function jsAttr() { return mode.call(this, 'jsAttr'); };
  function bem() { return mode.call(this, 'bem'); };
  function mix() { return mode.call(this, 'mix'); };
  function content() { return mode.call(this, 'content'); };

  // Apply by mode, local by mode and applyCtx
  apply = function(apply) {
    return function bemApply() {
      var args = Array.prototype.map.call(arguments, function(arg) {
        if (typeof arg === 'string') {
          return { _mode: arg };
        } else {
          return arg;
        }
      });
      return apply.apply(null, args);
    };
  }(apply);

  applyNext = function(applyNext) {
    return function bemApplyNext() {
      var args = Array.prototype.map.call(arguments, function(arg) {
        if (typeof arg === 'string') {
          return { _mode: arg };
        } else {
          return arg;
        }
      });
      return applyNext.apply(null, args);
    };
  }(applyNext);

  local = function(local) {
    return function bemLocal() {
      var args = Array.prototype.map.call(arguments, function(arg) {
        if (typeof arg === 'string') {
          return { _mode: arg };
        } else {
          return arg;
        }
      });
      return local.apply(null, args);
    };
  }(local);

  function applyCtx(context) {
    return applyNext({ _mode: '', ctx: context });
  };
}.toString().replace(/^function\s*\(\)\s*{|}$/g, '');
