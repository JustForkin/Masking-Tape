window.maskInput = (function() {
  function replaceCharAtIndex(str, index, character) {
    return str.substr(0, index) + character + str.substr(index+character.length);
  }

  function deepExtend(destination, source) {
    for (var property in source) {
      if (source[property] && source[property].constructor &&
        source[property].constructor === Object) {
          destination[property] = destination[property] || {};
          arguments.callee(destination[property], source[property]);
        } else {
          destination[property] = source[property];
        }
    }
    return destination;
  }

  function maskInput(id, options) {
    var opts = deepExtend({
      input: "",
      space: " ",
      template: "",
      hardInput: "",
      formatValue: false
    }, options || {});

    var input = opts.input;
    var hardInput = opts.hardInput;
    var template = opts.template;

    var replaceRegExpInput = new RegExp((function() {
      var s = "";
      for(var i = 0; i < input.length; i++) {
        s += input[i] + "|";
      }
      s = s.slice(0, -1);
      return s;
    })(), "g");

    var replaceRegExpHard = (hardInput.length === 0) ? null : new RegExp((function() {
      var s = "";
      for(var i = 0; i < hardInput.length; i++) {
        s += hardInput[i] + "|";
      }
      s = s.slice(0, -1);
      return s;
    })(), "g");

    var replaceRegExpAll = new RegExp((function() {
      var s = "";
      for(var i = 0; i < input.length; i++) {
        s += input[i] + "|";
      }
      for(var i = 0; i < hardInput.length; i++) {
        s += hardInput[i] + "|";
      }
      s = s.slice(0, -1);
      return s;
    })(), "g");

    var val = "";

    var maskVal;
    if (input !== "") {
      maskVal = template.replace(replaceRegExpInput, opts.space);
    } else {
      maskVal = template;
    }

    var index = 0;
    var mappedIndicies = (function(arr, val) {
      var indicies = [];
      for(var i = 0; i < template.length; i++) {
        var pushCurrentIndex = false;
        for(var j = 0; j < input.length; j++) {
          if (input[j] === template[i]) pushCurrentIndex = true;
        }
        for(var j = 0; j < hardInput.length; j++) {
          if (hardInput[j] === template[i]) pushCurrentIndex = true;
        }
        if (pushCurrentIndex) indicies.push(i);
      }
      return indicies;
    })(template, input);
    var requestedChars = template.match(replaceRegExpAll).length;
    var $el = document.getElementById(id);
    var $mask = $el.cloneNode();

    $mask.id += "-mask";
    $mask.name += "-mask";
    $mask.value = maskVal;
    $el.parentNode.insertBefore($mask, $el);

    $el.style.display = "none";

    $mask.addEventListener("keydown", function(e) {
      var chCode = e.which;

      if (chCode !== 18 && chCode !== 9 && chCode !== 17) {
        e.preventDefault();

        for(var i = 0; i < requestedChars; i++) {
          var mI = mappedIndicies[i];
          if (template[mI].match(replaceRegExpHard)) {
            maskVal = replaceCharAtIndex(maskVal, mI, template[mI]);
          }
        }

        if (chCode === 37 || chCode === 8) {
          index -= 1;
          if (index < 0) index = 0;
        } else if (chCode === 39) {
          index += 1;
          if (index >= requestedChars - 1) index = requestedChars - 1;
        } else {
          var ch = String.fromCharCode(e.which);

          val = replaceCharAtIndex(val, index, ch);

          maskVal = replaceCharAtIndex(maskVal, mappedIndicies[index], ch);

          if (opts.formatValue) {
            $el.value = maskVal;
          } else {
            $el.value = val;
          }
          $mask.value = maskVal;

          if (index !== requestedChars - 1) {
            ++index;
          }
        }

        $mask.selectionStart = $mask.selectionEnd = mappedIndicies[index] + 1;
      }
    });

    $mask.addEventListener("click", function(e) {
      var i = $mask.selectionStart;
      if (i === 0) {
        index = 0;
      } else {
        while(mappedIndicies.indexOf(i) === -1 && i > 0) --i;
        index = mappedIndicies.indexOf(i);
      }

      $mask.selectionStart = $mask.selectionEnd = mappedIndicies[index] + 1;
    });
  }

  return maskInput;
})();
