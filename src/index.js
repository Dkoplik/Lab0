function riemannSum(fn, a, b, n, method = "midpoint") {
  if (n <= 0) {
    throw new Error("n должно быть > 0");
  }
  if (a > b) {
    throw new Error("a должно быть < b");
  }
  if (a === b) {
    return 0;
  }

  const dx = (b - a) / n;
  let sum = 0;

  switch (method.toLowerCase()) {
    case "left":
      for (let i = 0; i < n; i++) {
        const x = a + i * dx;
        sum += fn(x);
      }
      break;

    case "right":
      for (let i = 1; i <= n; i++) {
        const x = a + i * dx;
        sum += fn(x);
      }
      break;

    case "midpoint":
      for (let i = 0; i < n; i++) {
        const x = a + (i + 0.5) * dx;
        sum += fn(x);
      }
      break;

    case "trapezoid":
      sum = (fn(a) + fn(b)) / 2;
      for (let i = 1; i < n; i++) {
        const x = a + i * dx;
        sum += fn(x);
      }
      break;

    default:
      throw new Error(`Неизвестный метод: ${method}.`);
  }

  return sum * dx;
}

function promptNumber(message) {
  while (true) {
    const input = prompt(message);
    if (input === null) {
      return null;
    }
    const num = parseFloat(input);
    if (!isNaN(num)) {
      return num;
    }
    alert("Некорректное число.");
  }
}

function promptPositiveInt(message) {
  while (true) {
    const input = prompt(message);
    if (input === null) {
      return null;
    }
    const num = parseInt(input, 10);
    if (!isNaN(num) && num > 0) {
      return num;
    }
    alert("Нужно положительное число");
  }
}

const functions = Object.freeze({
  "1. x^2 - cos(x)": (x) => x * x - Math.cos(x),
  "2. x^3 + sin(x)": (x) => x * x * x + Math.sin(x),
  "3. x^2 - x + 1": (x) => x * x - x + 1,
  "4. x * cos(x)": (x) => x * Math.cos(x),
  "5. 4x - x^2": (x) => 4 * x - x * x,
  "6. x + x^2 - x^3": (x) => x + x * x - x * x * x,
  "7. x/16 + 4sin(x) - 3": (x) => x / 16 + 4 * Math.sin(x) - 3,
});

let function_names = "";
for (const name in functions) {
  function_names += name;
  function_names += "\n";
}

function main() {
  const fn_num = prompt(`Функция (указать номер):\n${function_names}`, 1);
  if (fn_num === null) {
    alert("Операция отменена");
    return null;
  }
  if (fn_num < 1 || 7 < fn_num) {
    alert(`Некорректный номер: ${fn_num}`);
    return null;
  }

  const fn = functions[Object.keys(functions)[fn_num - 1]];

  const a = promptNumber("Левая граница интеграла (a):");
  if (a === null) {
    alert("Операция отменена");
    return null;
  }

  const b = promptNumber("Правая граница интеграла (b):");
  if (b === null) {
    alert("Операция отменена");
    return null;
  }

  const n = promptPositiveInt("Количество точек (n):");
  if (n === null) {
    alert("Операция отменена");
    return null;
  }

  const method =
    prompt("Метод: 'left', 'right', 'midpoint', or 'trapezoid':", "midpoint") ||
    "midpoint";

  try {
    const result = riemannSum(fn, a, b, n, method);
    alert(
      `Интеграл ${Object.keys(functions)[fn_num - 1]} на отрезке [${a}, ${b}] с ${n} точек методом ${method}: ${result}`,
    );
  } catch (err) {
    console.error(err.message);
    alert("Error: " + err.message);
  }
}

main();
