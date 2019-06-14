const calendarWrapper = document.getElementById('caleandar-wrapper');
const headerDate = document.getElementById('current-date');
const bodyDate = document.getElementsByClassName('day-of-month');
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const currentDay = moment();
let selectMonth = moment();

let counter = 0;

const daysOfMonth = moment().daysInMonth(); ///Checks how many days a month is
const start = moment().startOf('month').weekday(); // take with what day of the week begins the month
const end = findLastDivs(daysOfMonth, start);

headerDate.innerHTML = calendar(); //Here we keep the current month and year

renderCalendarDays(start, daysOfMonth, end);
toastrMessageListener()

//click to change, next month
nextMonth.addEventListener("click", function() {
  calendarWrapper.innerHTML = '';
  counter++;
  headerDate.innerHTML = calendar();
  selectMonth = moment().add(counter, 'month');

  const nextMonthStart = parseInt(moment().add(counter, 'month').startOf('month').format('d'));
  const nextDaysOfMonth = moment().add(counter, 'month').daysInMonth();
  const nextMonthEnd = findLastDivs(nextMonthStart, nextDaysOfMonth);

  renderCalendarDays(nextMonthStart, nextDaysOfMonth, nextMonthEnd);

  toastrMessageListener()

});


//click to change, prev month
prevMonth.addEventListener("click", function() { //click to change, prev month
  calendarWrapper.innerHTML = '';
  counter--;
  headerDate.innerHTML = calendar();
  selectMonth = moment().add(counter, 'month');

  const prevMonthStart = parseInt(moment().add(counter, 'month').startOf('month').format('d'));
  const prevMonthEnd = moment().add(counter, 'month').daysInMonth();
  const prevDaysOfMonth = findLastDivs(prevMonthStart, prevMonthEnd);

  renderCalendarDays(prevMonthStart, prevMonthEnd, prevDaysOfMonth);

  toastrMessageListener()
});
let timer;
let delay = 500;
let prevent = false;

function toastrMessageListener() {
  for (let i = 0; i < bodyDate.length; i++) {
    if (bodyDate[i].innerHTML != '') {
      bodyDate[i].addEventListener("click", function(e) {
        const day = event.target.dataset.day;
        if (!day) return false;
        const year = event.target.dataset.year;
        const month = event.target.dataset.month;
        timer = setTimeout(function() {
          if (!prevent) {

        
            const dateMonthYear = `${year}-${month}-${day}`
            toastr.info(moment(dateMonthYear).format('dddd'));
          }
          prevent = false;
        }, delay);
      });
    }
    if (bodyDate[i].innerHTML != '') {
      bodyDate[i].addEventListener("dblclick", function(event) {
        clearTimeout(timer);
        prevent = true;
      });
    }
  }
}


function findLastDivs(month, start) {
  if (month + start > 35) return 42 - (month + start);

  return 35 - (month + start);
}

//makes the body of the calendar
function renderDays(stopper, cellClass = 'day-of-month', day = false, text = false) {
  let html = '';

  for (let i = 0; i < stopper; i++) {
    let innerText = '';
    let currentDayClass = '';

    if (day) {
      innerText = i + 1;
      if (selectMonth.year() == moment().year()) {
        if (selectMonth.month() == moment().month()) {
          if (i + 1 == moment().date()) {
            currentDayClass = 'current-day';
          }
        }
      }
    }

    if (text) innerText = text[i];

    html += `<div class='${cellClass} ${currentDayClass}' data-day='${innerText}' data-month='${selectMonth.month()+1}' data-year='${selectMonth.year()}'  >${innerText}</div>`
  }

  return html;
};

// create a function that adds the current month and year to header
function calendar() {
  return moment().add(counter, 'month').format('MMMM YYYY');

}

function findLastDivs(month, start) {
  if (month + start > 35) return 42 - (month + start);

  return 35 - (month + start);
}

function renderCalendarDays(start, daysOfMonth, end) {
  var html = '<div class="month">';
  html += renderDays(start);
  html += renderDays(daysOfMonth, 'day-of-month', true);
  html += renderDays(end);
  html += '</div>';
  calendarWrapper.innerHTML += html;
}

$(document).ready(function() {
  function toasterOptions() {
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": false,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  };
});
