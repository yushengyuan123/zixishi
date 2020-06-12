import {failNotice} from '../wx_alert/wx_alert'

interface dateOptions {
  type: string
}

export function changeDateFormat(date: string) {
  //给数字加上0
  const dateValue: Array<string> = date.split('-');
  dateValue.forEach((value, index, arr) => {
    if (parseInt(value) <= 9) {
      arr[index] = '0' + value;
    }
  });
  return dateValue.join('-');
}

function dateFormat(dateOption: string): Object {
  const date = new Date();
  const day = date.getDate() - 6;
  const week = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let resDate = {
    now: `${year}-${month + 1}-${day}`,
    future: `${year}-${month + 1}-${day}`
  };
  switch (dateOption) {
    case 'day': {
      resDate.future = `${year}-${month + 1}-${week}`
      return resDate;
    }
    case 'week': {
      resDate.future = `${year}-${month + 1}-${week}`;
      return resDate;
    }
    case 'month': {
      resDate.future = `${year}-${month + 1}`;
      return resDate;
    }
    case 'year': {
      resDate.future = `${year}`;
      return resDate;
    }
    default: {
      throw new Error('dateType Error');
    }
  }
}

export function date(options: dateOptions) {
  return dateFormat(options.type);
}

function addDate<T>(date: string, dateSort: string): any {
  const dateObj = {
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]),
    day: Number(date.split('-')[2])
  };
  const compareNow = new Date()
  let resDate;
  switch (dateSort) {
    case 'day': {
      //获取本月有多少天
      if (compareNow.getDate() < dateObj.day + 1
        && compareNow.getMonth() + 1  === dateObj.month) {
        resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
        failNotice('不能选择未来时间')
      } else {
        const hasDay = new Date(dateObj.year, dateObj.month, 0).getDate();
        if (dateObj.day + 1 > hasDay) {
          if (dateObj.month + 1 > 12) {
            resDate = `${dateObj.year + 1}-${1}-${1}`;
          } else {
            resDate = `${dateObj.year}-${dateObj.month + 1}-${1}`;
          }
        } else {
          resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day + 1}`;
        }
      }
      return resDate
    }
    case 'week': {
      if (compareNow.getDate() < dateObj.day + 7
      && compareNow.getMonth() + 1 === dateObj.month) {
        resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;
        failNotice('不能选择未来时间')
      } else {
        const hasDay = new Date(dateObj.year, dateObj.month, 0).getDate();
        if (dateObj.day + 7 > hasDay) {
          if (dateObj.month + 1 > 12) {
            resDate = `${dateObj.year + 1}-${1}-${7 - (hasDay - dateObj.day)}`;
          } else {
            resDate = `${dateObj.year}-${dateObj.month + 1}-${7 - (hasDay - dateObj.day)}`;
          }
        } else {
          resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day + 7}`;
        }
      }
      return resDate;
    }
    case 'month': {
      if (compareNow.getMonth() < dateObj.month + 1
        && compareNow.getFullYear() === dateObj.year) {
        resDate = `${dateObj.year}-${dateObj.month}`;
        failNotice('不能选择未来时间')
      } else {
        if (dateObj.month + 1 > 12) {
          resDate = `${dateObj.year + 1}-${1}`;
        } else {
          resDate = `${dateObj.year}-${dateObj.month + 1}`;
        }
      }
      return resDate;
    }
    case 'year': {
      if (compareNow.getFullYear() < dateObj.year + 1) {
        resDate = `${dateObj.year}`;
        failNotice('不能选择未来时间')
      } else {
        resDate = `${dateObj.year + 1}`;
      }
      return resDate;
    }
    default: {
      throw new Error('dateType Error');
    }
  }
}

function reduceDate<T>(date: string, dateSort: string): T {
  const dateObj = {
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]),
    day: Number(date.split('-')[2])
  };
  let resDate;
  switch (dateSort) {
    case 'day': {
      if (dateObj.day - 1 <= 0) {
        //获取这个月有多少天
        const hasDay = new Date(dateObj.year, dateObj.month - 1, 0).getDate();
        if (dateObj.month - 1 <= 0) {
          resDate = `${dateObj.year - 1}-${12}-${31}`;
        } else {
          resDate = `${dateObj.year}-${dateObj.month - 1}-${hasDay}`;
        }
      } else {
        resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day - 1}`;
      }
      return resDate;
    }
    case 'week': {
      //防止减出一个负数,需要判断大小月份
      if (dateObj.day - 7 <= 0) {
        if (dateObj.month - 1 <= 0) {
          resDate = `${dateObj.year - 1}-${12}-${31 - Math.abs(dateObj.day - 7)}`;
        } else {
          //获取这个月有多少天
          const hasDay = new Date(dateObj.year, dateObj.month - 1, 0).getDate();
          resDate = `${dateObj.year}-${dateObj.month - 1}-${hasDay - Math.abs(dateObj.day - 7)}`;
        }
      } else {
        resDate = `${dateObj.year}-${dateObj.month}-${dateObj.day - 7}`;
      }
      return resDate;
    }
    case 'month': {
      //避免一直减小到0的情况
      if (dateObj.month - 1 <= 0) {
        resDate = `${dateObj.year - 1}-${12}`;
      } else {
        resDate = `${dateObj.year}-${dateObj.month - 1}`;
      }
      return resDate;
    }
    case 'year': {
      resDate = `${dateObj.year - 1}`;
      return resDate;
    }
    default: {
      throw new Error('dateType Error');
    }
  }
}

//箭头时间过滤加0
function filter(dateString: string, type: string) {
  if (type === 'day' || type === 'month') {
    //给数字加上0
    const dateValue: Array<string> = dateString.split('-');
    dateValue.forEach((value, index, arr) => {
      if (parseInt(value) <= 9) {
        arr[index] = '0' + value;
      }
    });
    return dateValue.join('-');
  } else if (type === 'week') {
    const dateValue: Array<string> = dateString.split('~');
    for (let i = 0; i < dateValue.length; i++) {
      const temp = dateValue[i].split('-');
      temp.forEach((value, index, arr) => {
        if (value.length === 1) {
          arr[index] = '0' + value;
        };
      });
      // @ts-ignore
      dateValue[i] = temp.join('-')
    }
    return dateValue.join('~')
  } else {
    return dateString;
  }

  return dateString;
}

export function arrowOnclick(type: string, date: string, direction: string): string {
  let leftDate = date.split('~')[0];
  let rightDate = date.split('~')[1] !== undefined
    ? date.split('~')[1] : null;
  let resDate;
  if (type !== 'week') {
    if (direction === 'left') {
      if (rightDate === null) {
        resDate = `${reduceDate(leftDate, type)}`;
      } else {
        resDate = `${reduceDate(leftDate, type)}~${rightDate}`;
      }
    } else {
      if (rightDate === null) {
        resDate = `${addDate(leftDate, type)}`;
      } else {
        resDate = `${leftDate}~${addDate(rightDate, type)}`;
      }
    }
  } else {
    if (direction === 'left') {
      resDate = `${reduceDate(leftDate, type)}~${reduceDate(rightDate, type)}`;
    } else {
      resDate = `${addDate(leftDate, type)}~${addDate(rightDate, type)}`;
    }
  }

  resDate = filter(resDate, type);
  return resDate;
}



