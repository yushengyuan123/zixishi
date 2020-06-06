interface dateOptions {
  type: string
}

export function changeDateFormat(date: string) {
  return date.split(' ')[0]
}

function dateFormat(dateOption: string): Object {
  const date = new Date();
  const day = date.getDate();
  const week = day + 7;
  const month = date.getMonth();
  const year = date.getFullYear();
  let resDate = {
    now: `${year}-${month}-${day} 00:00:00`,
    future: `${year}-${month}-${day} 23:59:59`
  };
  switch (dateOption) {
    case 'day': {
      return resDate;
    }
    case 'week': {
      resDate.future = `${year}-${month}-${week} 00:00:00`
      return resDate;
    }
    case 'month': {
      resDate.future = `${year}-${month+1}-${day} 00:00:00`
      return resDate;
    }
    case 'year': {
      resDate.future = `${year+1}-${month}-${day} 00:00:00`
      return resDate;
    }
    default: {
      throw new Error('dateType Error')
    }
  }
}

export function date(options: dateOptions) {
  return dateFormat(options.type);
}

function getDate(type: string) {
  switch (type) {

  }
}

function addDate<T>(date: string, dateSort: string): T {
  const dateObj = {
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]),
    day: Number(date.split('-')[2]),
  }
  let resDate
  switch(dateSort) {
    case 'day': {
      resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day + 1}`
      return resDate;
    }
    case 'week': {
      resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day + 7}`
      return resDate;
    }
    case 'month': {
      resDate = `${dateObj.year}-${dateObj.month+1}-${dateObj.day}`
      return resDate;
    }
    case 'year': {
      resDate = `${dateObj.year+1}-${dateObj.month}-${dateObj.day}`
      return resDate;
    }
    default: {
      throw new Error('dateType Error')
    }
  }
}

function reduceDate<T>(date: string, dateSort: string): T {
  const dateObj = {
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]),
    day: Number(date.split('-')[2]),
  }
  let resDate
  switch(dateSort) {
    case 'day': {
      resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day - 1}`
      return resDate;
    }
    case 'week': {
      resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day - 7}`
      return resDate;
    }
    case 'month': {
      resDate = `${dateObj.year}-${dateObj.month-1}-${dateObj.day}`
      return resDate;
    }
    case 'year': {
      resDate = `${dateObj.year-1}-${dateObj.month}-${dateObj.day}`
      return resDate;
    }
    default: {
      throw new Error('dateType Error')
    }
  }
}

export function arrowOnclick (type: string, date: string, direction: string): string {
  let leftDate = date.split('~')[0]
  let rightDate = date.split('~')[1] !== undefined
    ? date.split('~')[1] : null
  let resDate
  if (direction === 'left') {
    if (rightDate === null) {
      resDate = `${reduceDate(leftDate, type)}`
    } else {
      resDate = `${reduceDate(leftDate, type)}~${rightDate}`
    }
  } else {
    if (rightDate === null) {
      resDate = `${addDate(leftDate, type)}`
    } else {
      resDate = `${leftDate}~${addDate(rightDate, type)}`
    }
  }
  return resDate
}

export function addZero() {
  
}


