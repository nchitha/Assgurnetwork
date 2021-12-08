(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-drag'), require('d3-selection')) :
    typeof define === 'function' && define.amd ? define(['exports', 'd3-drag', 'd3-selection'], factory) :
    (factory((global.d3 = global.d3 || {}),global.d3,global.d3));
  }(this, (function (exports,d3Drag,d3Selection) { 'use strict';
  
  // https://github.com/d3/d3-selection-multi/blob/master/src/selection/attrs.js
  function attrsFunction(selection$$1, map) {
    return selection$$1.each(function() {
      var x = map.apply(this, arguments), s = d3Selection.select(this);
      for (var name in x) s.attr(name, x[name]);
    });
  }
  
  function attrsObject(selection$$1, map) {
    for (var name in map) selection$$1.attr(name, map[name]);
    return selection$$1;
  }
  
  var selection_attrs = function(map) {
    return (typeof map === "function" ? attrsFunction : attrsObject)(this, map);
  }
  
  // hacky :( could not get rollup to play nice with d3-selection-multi. << TODO
  // import "d3-selection-multi";
  d3Selection.selection.prototype.attrs = selection_attrs;
  
  var annotate = function() {
    var keyFn = (_, ndx) => ndx,
        textFn = (d) => d,
        container,
        displayAttrs = {
          x: (d) => d.box.x + (d.box.width / 2),
          y: (d) => d.box.y + (d.box.height / 2),
          'text-anchor': 'middle'
        },
        show = true,
        dragControl = d3Drag.drag()
          .on("start", function() { this.classList.add('dragging'); })
          .on("end", function() { this.classList.remove('dragging'); })
          .on("drag", function () {
            var el = d3Selection.select(this);
            el.attr('x', +el.attr('x') + d3Selection.event.dx);
            el.attr('y', +el.attr('y') + d3Selection.event.dy);
          });
  
  
    //
    // serialize keys, bind click to add text, add text if `show` is T or fn
    function annotate(_selection) {
      _selection.nodes().forEach((el, ndx) => el.__key__ = keyFn(el.__data__, ndx));
      _selection.on('click', function() { appendText(d3Selection.select(this)); });
      if(show) { appendText(_selection, true); }
    }
  
    //
    // add new data bound <text> annotation
    function appendText(sel, filter) {
      var _sel = (show instanceof Function && filter) ? sel.filter(show) : sel,
          _textFn = (d) => textFn(d.data),
          annotationData = _sel.nodes().map((node) => {
            return { data: node.__data__, key: node.__key__, box: node.getBBox() };
          });
  
      var textSelection = container.selectAll('text.with-data')
        .data(annotationData, (d) => d.key);
      textSelection.enter().append('text')
        .text(_textFn)
        .attr('class', 'annotation with-data')
        .attrs(displayAttrs)
        .call(dragControl)
        .on('click', function() {
          if(d3Selection.event.metaKey) { this.remove(); }
          else if(d3Selection.event.shiftKey) { _editText(d3Selection.select(this)); }
        });
    }
  
  
    //
    // text editor
    function _editText(el) {
      d3Selection.select('body').append('input')
        .attr('type', 'text')
        .attr('class', 'd3-an-text-edit')
        .attr('value', el.text())
        .on('keyup', function() { d3Selection.event.keyCode === 13 && this.blur(); }) // ESC
        .on('focusout', function() { el.text(this.value) && this.remove(); })
        .node().focus();
    }
  
    //
    // return serialize pojo of annotations
    annotate.serialize = function() {
      return container.selectAll('text.with-data').nodes().map(function(node) {
        var nodeSel = d3.select(node);
        return {
          x: nodeSel.attr('x'),
          y: nodeSel.attr('y'),
          key: node.__data__.key,
          text: nodeSel.text()
        };
      });
    }
  
    //
    // TODO: add annotations from object
  
  
    //
    // properties
    annotate.container = function(_) {
      if(!arguments.length) return container;
      container = _;
      container.classed('d3-an-container', true);
      return annotate;
    };
    annotate.text = function(_) {
      if(!arguments.length) return text;
      textFn = _; return annotate;
    };
    annotate.key = function(_) {
      if(!arguments.length) return keyFn;
      keyFn = _; return annotate;
    };
    annotate.show = function(_) {
      if(!arguments.length) return show;
      show = _; return annotate;
    };
    annotate.attr = function() {
      if(!arguments.length) {
        return displayAttrs;
      } else if(arguments.length === 1) {
        return displayAttrs[arguments[0]];
      } else {
        arguments[1] === null ? (delete displayAttrs[arguments[0]]) :
                                (displayAttrs[arguments[0]] = arguments[1]);
        return annotate;
      }
    };
  
    return annotate;
  }
  
  exports.annotate = annotate;
  
  Object.defineProperty(exports, '__esModule', { value: true });
  
  })));