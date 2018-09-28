$(document).ready(function() {
  var input = "";
  var sol = "";
  var current = "";
  var decimal = true;
  var log = "";
  var reset = "";

  //round decimal place
  function round(value) {
    value = value.toString().split("");
    if (value.indexOf(".") !== -1) {
      var valTest = value.slice(value.indexOf(".") + 1, value.length);
      value = value.slice(0, value.indexOf(".") + 1);
      var i = 0;
      while (valTest[i] < 1) {
        i++;
      }
      valTest = valTest.join("").slice(0, i + 2);
      if (valTest[valTest.length - 1] === "0") {
        valTest = valTest.slice(0, -1);
      }
      return value.join("") + valTest;
    } else {
      return value.join("");
    }
  }

  $("button").click(function() {
    input = $(this).attr("value");
    console.log("userinput: " + input);

    //reset log after equation solution
    if (reset) {
      if (input === "/" || input === "*" || input === "-" || input === "+") {
        log = sol;
      } else {
        sol = "";
      }
    }
    reset = false;

    //prevent multiple decimals
    if (input === "." || input === "0.") {
      if (!decimal) {
        input = "";
      }
    }

    //ensures proper first digit
    if (
      (sol.length === 0 && isNaN(input) && input !== ".") ||
      (sol.length === 0 && input === "0")
    ) {
      input = "";
      sol = "";
    }

    //limits operators
    if (current !== "noChange") {
      if (
        (current === "" && isNaN(input) && input !== ".") ||
        (isNaN(current) && isNaN(input) && input !== ".")
      ) {
        input = "";
      }
    }
    //combine digits
    while (Number(input) || input === "0" || current === ".") {
      if (isNaN(current) && input === "0" && current !== ".") {
        input = "";
      } else if (isNaN(current) && Number(input) && current !== ".") {
        current = "";
      }
      if (input === ".") {
        decimal = false;
      }
      if (current === "0." && isNaN(input)) {
        input = "";
      } else {
        if (current[current.length - 1] === ".") {
          current = current.concat(input);
        } else {
          current += input;
        }
        sol += input;
        $("#answer").html(current);
        log += input;
        $("#history").html(log);
        input = "";
      }
    }

    //clear buttons
    if (input === "ac" || (input === "clear" && current === "noChange")) {
      sol = "";
      current = "";
      input = "";
      log = "";
      $("#history").html("0");
      $("#answer").html("0");
      decimal = true;
    } else if (input === "clear") {
      $("#history").html(log.slice(0, -current.length));
      log = log.slice(0, -current.length);
      sol = sol.slice(0, -current.length);
      current = sol;
      if (log.length === 0 || log === " ") {
        $("#history").html("0");
      }
      $("#answer").html("0");
      input = "";
      decimal = true;
    }

    //operations
    if (input === ".") {
      if (current === "" || isNaN(current[current.length - 1])) {
        current = "0.";
        sol += input;
        $("#answer").html("0.");
        log += current;
        $("#history").html(log);
      } else {
        current = current.concat(".");
        sol = sol.concat(".");
        log = sol;
        $("#history").html(sol);
        $("#answer").html(current);
      }
      input = "";
      decimal = false;
    } else if (input === "/") {
      current = "/";
      sol = round(eval(sol)) + current;
      log += current;
      $("#history").html(log);
      $("#answer").html("/");
      input = "";
      decimal = true;
    } else if (input === "*") {
      current = "*";
      sol = round(eval(sol)) + current;
      log += "x";
      $("#history").html(log);
      $("#answer").html("x");
      input = "";
      decimal = true;
    } else if (input === "-") {
      current = "-";
      sol = round(eval(sol)) + current;
      log += "-";
      $("#history").html(log);
      $("#answer").html("-");
      input = "";
      decimal = true;
    } else if (input === "+") {
      current = "+";
      log += current;
      $("#history").html(log);
      $("#answer").html("+");
      input = "";
      decimal = true;
    } else if (input === "") {
    } else if (input === "=") {
      if (current[current.length - 1] === ".") {
        input = "";
      } else {
        current = eval(sol).toString();
        $("#answer").html(round(eval(sol)));
        sol = round(eval(sol));
        log = sol;
        input = "";
        reset = true;
        decimal = true;
      }
      current = "noChange";
    }

    //reset
    if (reset) {
      log = "";
    }

    //max digits
    /* if($("#userinput").children().text().length > 29 ) {
      $("#answer").html(log.slice(0, current.length - 1).join());
      $("#history").html("reached limit");
    }*/

    console.log("decimal: " + decimal);
    console.log("current: " + current);
    console.log("answer: " + sol);
    console.log($("#history").text().length);
  });
});