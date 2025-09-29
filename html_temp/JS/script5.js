class Marker {
  constructor(color, inkLevel = 100) {
    this.color = color;
    this.inkLevel = inkLevel; // відсотки
  }

  print(text) {
    let output = '';
    for (let char of text) {
      if (this.inkLevel <= 0) break;
      if (char !== ' ') {
        this.inkLevel -= 0.5;
      }
      output += char;
    }
    console.log(`%c${output}`, `color: ${this.color}`);
  }
}

class RefillableMarker extends Marker {
  refill(amount) {
    this.inkLevel = Math.min(100, this.inkLevel + amount);
    console.log(`Маркер заправлено. Поточний рівень чорнил: ${this.inkLevel}%`);
  }
}

// Демонстрація
const marker = new RefillableMarker('blue', 10);
marker.print('Привіт, світе!');
marker.refill(50);
marker.print('Це новий текст після заправки.');
marker.print('Ще трохи тексту, щоб перевірити рівень чорнил.');
class ExtendedDate extends Date {
  getTextDate() {
    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
                    'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    return `${this.getDate()} ${months[this.getMonth()]}`;
  }

  isFutureOrToday() {
    const now = new Date();
    // Порівнюємо лише дату, ігноруючи час
    return this >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  isLeapYear() {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  getNextDate() {
    const next = new Date(this);
    next.setDate(this.getDate() + 1);
    return next;
  }
}

// Демонстрація
const myDate = new ExtendedDate('2025-09-29');
console.log('Дата текстом:', myDate.getTextDate());
console.log('Майбутня або сьогоднішня?', myDate.isFutureOrToday());
console.log('Високосний рік?', myDate.isLeapYear());
console.log('Наступна дата:', myDate.getNextDate().toDateString());
class Employee {
  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }
}

class EmpTable {
  constructor(employees) {
    this.employees = employees;
  }

  getHtml() {
    let html = '<table border="1"><tr><th>Ім’я</th><th>Посада</th><th>Зарплата</th></tr>';
    for (let emp of this.employees) {
      html += `<tr><td>${emp.name}</td><td>${emp.position}</td><td>${emp.salary}</td></tr>`;
    }
    html += '</table>';
    return html;
  }
}

// Демонстрація
const employees = [
  new Employee('Олена', 'Менеджер', 12000),
  new Employee('Ігор', 'Аналітик', 15000),
  new Employee('Світлана', 'Касир', 8000)
];

const table = new EmpTable(employees);
document.getElementById("standart").innerHTML += table.getHtml();
class StyledEmpTable extends EmpTable {
  getStyles() {
    return `<style>
      #custom table { border-collapse: collapse; width: 60%; margin: 10px 0; }
      #custom th, td { padding: 8px 12px; border: 1px solid #333; text-align: left; }
      #custom th { background-color: #4CAF50; color: white; }
      #custom tr:nth-child(even) { background-color: #f2f2f2; }
    </style>`;
  }

  getHtml() {
    return this.getStyles() + super.getHtml();
  }
}

// Демонстрація
const styledTable = new StyledEmpTable(employees);
document.getElementById("custom").innerHTML += styledTable.getHtml();