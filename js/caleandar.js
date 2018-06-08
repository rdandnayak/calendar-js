var Calendar = function(model, options, date) {
  // Default Values
  this.Model = '';
  this.Today = '';
  this.Selected = '';
  this.Prev = '';

  // model ? (this.Model = model) : (this.Model = {}); // model is events data to be used later on

  this.Today = new Date();

  this.Selected = this.Today;

  this.Today.Month = this.Today.getMonth();

  this.Today.Year = this.Today.getFullYear();

  if (date) {
    this.Selected = date;
  }
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();

  this.Selected.Days = new Date(
    this.Selected.Year,
    this.Selected.Month + 1,
    0
  ).getDate();
  this.Selected.FirstDay = new Date(
    this.Selected.Year,
    this.Selected.Month,
    1
  ).getDay();
  this.Selected.LastDay = new Date(
    this.Selected.Year,
    this.Selected.Month + 1,
    0
  ).getDay();

  this.Prev = new Date(this.Selected.Year, this.Selected.Month - 1, 1);
  if (this.Selected.Month == 0) {
    this.Prev = new Date(this.Selected.Year - 1, 11, 1);
  }
  this.Prev.Days = new Date(
    this.Prev.getFullYear(),
    this.Prev.getMonth() + 1,
    0
  ).getDate();
};

function createCalendar(calendar, element, adjuster) {
  // what is adjuster
  if (typeof adjuster !== 'undefined') {
    var newDate = new Date(
      calendar.Selected.Year,
      calendar.Selected.Month + adjuster,
      1
    );
    calendar = new Calendar(calendar.Model, {}, newDate);
    element.innerHTML = '';
  } else {
  }
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  var mainSection = document.createElement('div');
  mainSection.className += 'cld-main';

  function AddDateTime() {
    var datetime = document.createElement('div');
    datetime.className += 'cld-datetime';
    var today = document.createElement('div');
    today.className += ' today';
    today.innerHTML =
      months[calendar.Selected.Month] + ', ' + calendar.Selected.Year;
    datetime.appendChild(today);

    // showing top navigation
    var rwd = document.createElement('div');
    rwd.className += ' cld-rwd cld-nav';
    rwd.addEventListener('click', function() {
      createCalendar(calendar, element, -1);
    });
    rwd.innerHTML = '<<';
    datetime.appendChild(rwd);
    // }
    // show right navigation
    var fwd = document.createElement('div');
    fwd.className += ' cld-fwd cld-nav';
    fwd.addEventListener('click', function() {
      createCalendar(calendar, element, 1);
    });
    fwd.innerHTML = '>>';
    datetime.appendChild(fwd);
    mainSection.appendChild(datetime);
  }
  // adding days of wee
  function AddLabels() {
    var labels = document.createElement('ul');
    labels.className = 'cld-labels';
    var labelsList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (var i = 0; i < labelsList.length; i++) {
      var label = document.createElement('li');
      label.className += 'cld-label';
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }

  function AddDays() {
    // Create Number Element
    function DayNumber(n) {
      var number = document.createElement('p');
      number.className += 'cld-number';
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += 'cld-days';
    // append blank Previous Month's Days
    for (var i = 0; i < calendar.Selected.FirstDay; i++) {
      var day = document.createElement('li');
      day.className += 'cld-day prevMonth';
      console.log(calendar);
      days.appendChild(day);
    }
    // Current Month's Days
    for (var i = 0; i < calendar.Selected.Days; i++) {
      var day = document.createElement('li');
      day.className += 'cld-day currMonth';
      // //Disabled Days
      var number = DayNumber(i + 1);
      day.appendChild(number);
      // If Today..
      // if (
      //   i + 1 == calendar.Today.getDate() &&
      //   calendar.Selected.Month == calendar.Today.Month &&
      //   calendar.Selected.Year == calendar.Today.Year
      // ) {
      //   day.className += ' today';
      // }
      days.appendChild(day);
    }

    mainSection.appendChild(days);
  }
  element.appendChild(mainSection);

  AddDateTime();
  AddLabels();
  AddDays();
}

function caleandar(el, data) {
  var obj = new Calendar(data);
  createCalendar(obj, el);
}
