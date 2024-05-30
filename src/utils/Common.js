import moment from 'moment';
import 'moment/locale/ko';
import _ from 'lodash';

const hexStringToBytes = function (hexStr) {
  let result = [];
  for (let i = 0; i < hexStr.length; i += 2) {
    result.push(hexToByte(hexStr.substr(i, 2)));
  }
  return result;
};
export function utf8BytesToString(arr) {
  if (arr == null) return null;
  let result = '';
  let i;

  while ((i = arr.shift())) {
    if (i <= 0x7f) {
      result += String.fromCharCode(i);
    } else if (i <= 0xdf) {
      let c = (i & 0x1f) << 6;
      c += arr.shift() & 0x3f;
      result += String.fromCharCode(c);
    } else if (i <= 0xe0) {
      let c = ((arr.shift() & 0x1f) << 6) | 0x0800;
      c += arr.shift() & 0x3f;
      result += String.fromCharCode(c);
    } else {
      let c = (i & 0x0f) << 12;
      c += (arr.shift() & 0x3f) << 6;
      c += arr.shift() & 0x3f;
      result += String.fromCharCode(c);
    }
  }
  return result;
}
export function utf8HexStringToString(hexStr) {
  let bytes = hexStringToBytes(hexStr);
  let str = utf8BytesToString(bytes);

  return str;
}
export function stringToUtf8HexString(text) {
  let bytes = stringToUtf8Bytes(text);
  let hexStr = bytesToHexString(bytes);
  return hexStr;
}

export function bytesToHexString(bytes) {
  let result = '';
  for (let i = 0; i < bytes.length; i++) {
    result += byteToHex(bytes[i]);
  }
  return result;
}
export function byteToHex(byteNum) {
  let digits = byteNum.toString(16);
  if (byteNum < 16) return '0' + digits;
  return digits;
}

export function stringToUtf8Bytes(text) {
  let result = [];
  if (text == null) return result;

  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i);
    if (c <= 0x7f) {
      result.push(c);
    } else if (c <= 0x07ff) {
      result.push(((c >> 6) & 0x1f) | 0xc0);
      result.push((c & 0x3f) | 0x80);
    } else {
      result.push(((c >> 12) & 0x0f) | 0xe0);
      result.push(((c >> 6) & 0x3f) | 0x80);
      result.push((c & 0x3f) | 0x80);
    }
  }
  return result;
}
export function hexToByte(hexStr) {
  return parseInt(hexStr, 16);
}

export function diffSinceTime(prev, type) {
  const current = moment().format('YYYYMMDD');
  const momentdiff = moment(current).diff(moment(prev), type);
  return momentdiff;
}

export function dateFormat(date) {
  return moment(date).format('YYYY.MM.DD');
}

// period format
export function periodFormat(startDate, endDate) {
  if (moment(startDate).diff(moment(endDate), 'years') === 0) {
    if (moment(startDate).diff(moment(endDate), 'months', true) === 0) {
      if (startDate === endDate) {
        return moment(startDate).format('YYYY.MM.DD');
      } else {
        return (
          moment(startDate).format('YYYY.MM.DD') +
          ' ~ ' +
          moment(endDate).format('DD')
        );
      }
    } else {
      return (
        moment(startDate).format('YYYY.MM.DD') +
        ' ~ ' +
        moment(endDate).format('MM.DD')
      );
    }
  } else {
    return (
      moment(startDate).format('YYYY.MM.DD') +
      ' ~ ' +
      moment(endDate).format('YYYY.MM.DD')
    );
  }
}

export function periodFormatCalendarButton(startDate, endDate, count) {
  return (
    moment(startDate).format('MM.DD') +
    ' ' +
    momentGetDayOfWeek(moment(startDate).days()) +
    ' ~ ' +
    moment(endDate).format('MM.DD') +
    ' ' +
    momentGetDayOfWeek(moment(endDate).days()) +
    ' (' +
    moment(endDate).diff(startDate, 'day') +
    '박)  |  ' +
    count +
    '명'
  );
}

export function periodFormatWithMonthDay(startDate, endDate) {
  if (moment(startDate).diff(moment(endDate), 'years') === 0) {
    if (moment(startDate).diff(moment(endDate), 'months', true) === 0) {
      if (startDate === endDate) {
        return moment(startDate).format('YYYY.MM.DD') + '(1일)';
      } else {
        return (
          moment(startDate).format('MM.DD') +
          ' ~ ' +
          moment(endDate).format('MM.DD') +
          ' (' +
          moment(endDate).diff(moment(startDate), 'days') +
          '박)'
        );
      }
    } else {
      return (
        moment(startDate).format('MM.DD') +
        ' ~ ' +
        moment(endDate).format('MM.DD') +
        ' (' +
        moment(endDate).diff(moment(startDate), 'days') +
        '박)'
      );
    }
  } else {
    return (
      moment(startDate).format('YYYY.MM.DD') +
      ' ~ ' +
      moment(endDate).format('YYYY.MM.DD') +
      ' (' +
      moment(endDate).diff(moment(startDate), 'days') +
      '박)'
    );
  }
}

export function periodFormatWithDay(startDate, endDate) {
  if (moment(startDate).diff(moment(endDate), 'years') === 0) {
    if (moment(startDate).diff(moment(endDate), 'months', true) === 0) {
      if (startDate === endDate) {
        return moment(startDate).format('YYYY.MM.DD') + '(1일)';
      } else {
        return (
          moment(startDate).format('YYYY.MM.DD') +
          ' ~ ' +
          moment(endDate).format('DD') +
          ' (' +
          moment(endDate).diff(moment(startDate), 'days') +
          '박' +
          (moment(endDate).diff(moment(startDate), 'days') + 1) +
          '일)'
        );
      }
    } else {
      return (
        moment(startDate).format('YYYY.MM.DD') +
        ' ~ ' +
        moment(endDate).format('MM.DD') +
        ' (' +
        moment(endDate).diff(moment(startDate), 'days') +
        '박' +
        (moment(endDate).diff(moment(startDate), 'days') + 1) +
        '일)'
      );
    }
  } else {
    return (
      moment(startDate).format('YYYY.MM.DD') +
      ' ~ ' +
      moment(endDate).format('YYYY.MM.DD') +
      ' (' +
      moment(endDate).diff(moment(startDate), 'days') +
      '박' +
      (moment(endDate).diff(moment(startDate), 'days') + 1) +
      '일)'
    );
  }
}

export function calendarPeriodFormat(startDate, endDate) {
  if (startDate && endDate) {
    if (moment(endDate).diff(moment(startDate), 'years') === 0) {
      if (moment(endDate).diff(moment(startDate), 'months', true) === 0) {
        if (startDate === endDate) {
          return moment(startDate).format('YYYY년 MM월 DD일') + ', 1일';
        } else {
          return (
            moment(startDate).format('YYYY년 MM월 DD일') +
            ' ~ ' +
            moment(endDate).format('DD일') +
            ', ' +
            moment(endDate).diff(moment(startDate), 'days') +
            '박'
          );
        }
      } else {
        return (
          moment(startDate).format('MM월 DD일') +
          ' ~ ' +
          moment(endDate).format('MM월 DD일') +
          ', ' +
          moment(endDate).diff(moment(startDate), 'days') +
          '박'
        );
      }
    } else {
      return (
        moment(startDate).format('YYYY년 MM월 DD일') +
        ' ~ ' +
        moment(endDate).format('YYYY년 MM월 DD일') +
        ', ' +
        moment(endDate).diff(moment(startDate), 'days') +
        '박'
      );
    }
  } else {
    return '';
  }
}

// 00000 -> 00,000
export function numberWithComma(num) {
  return num.toLocaleString('ko-kr');
}

// 100 -> 100
// 1000 -> 1천원
// 10000 -> 1만원
// 10000000 -> 1,000만원
export function numberWithUnit(num) {
  let temp = num.toString();
  if (temp.length === 4) {
    temp = temp[0] + '천원';
  } else if (temp.length > 4) {
    temp = numberWithComma(parseInt(temp.slice(0, temp.length - 4))) + '만원';
  } else {
    temp = numberWithComma(num) + '원';
  }
  return temp;
}

// [{key1:value1},{key2:value2},{key3:value3},...]
export function minValueToObject(obj) {
  let values = [];
  obj.map((item) => values.push(item[Object.keys(item)]));
  const minValue = Math.min(...values);

  return minValue;
}

// [{key1:value1},{key2:value2},{key3:value3},...]
export function maxValueToObject(obj) {
  let values = [];
  obj.map((item) => values.push(item[Object.keys(item)]));
  const maxValue = Math.max(...values);

  return maxValue;
}
// 사이트 요금 조회
// seasons : 시즌정보. 가장 우선순위가 높은 시즌 적용
// method : 요금계산방식. 합산방식 : 1박 일반요금 + 나머지일수 * 연박요금, 곱셈방식 : 전체일수 * 연박요금
// weekends : 주말정보. 주말에 포함되는 요일정보
// holidays : 공휴일정보. 공휴일 전날 요금 계산
// fees : 기본요금 정보
// specialFees : 특별요금 정보
// specialDiscounts : 특별할인 정보
// searchOptions : 검색조건. 기간(시작일, 종료일) 산정
export function getSiteBaseFee(
  seasons,
  method,
  weekends,
  holidays,
  fees,
  specialFees,
  specialDiscounts,
  searchOptions
) {
  let normalWeekendInfo = [];
  let specialWeekendInfo = [];

  weekends?.map((weekend) => {
    switch (weekend.day_week) {
      case '월요일':
        weekend.day_division === '특별'
          ? specialWeekendInfo.push(1)
          : normalWeekendInfo.push(1);
        break;
      case '화요일':
        weekend.day_division === '특별'
          ? specialWeekendInfo.push(2)
          : normalWeekendInfo.push(2);
        break;
      case '수요일':
        weekend.day_division === '특별'
          ? specialWeekendInfo.push(3)
          : normalWeekendInfo.push(3);
        break;
      case '목요일':
        weekend.day_division === '특별'
          ? specialWeekendInfo.push(4)
          : normalWeekendInfo.push(4);
        break;
      case '금요일':
        weekend.day_division === '특별'
          ? specialWeekendInfo.push(5)
          : normalWeekendInfo.push(5);
        break;
      case '토요일':
        weekend.day_division === '특별'
          ? specialWeekendInfo.push(6)
          : normalWeekendInfo.push(6);
        break;
      case '일요일':
        weekend.day_division === '특별'
          ? specialWeekendInfo.push(0)
          : normalWeekendInfo.push(0);
        break;
    }
  });

  let arrSeason = [];

  let totalSiteFee = 0;
  let discountFee = 0;
  let dayCnt = 0;
  let normalWeekendCnt = 0;
  let specialWeekendCnt = 0;
  let specialWeekendName = '';

  let currDate = moment(searchOptions.start_date).startOf('day');
  let lastDate = moment(searchOptions.end_date).startOf('day');
  let continuousYn =
    moment(searchOptions.end_date).diff(
      moment(searchOptions.start_date),
      'days'
    ) > 1
      ? true
      : false;

  if (specialDiscounts && specialDiscounts.length > 0) {
    if (!specialDiscounts[0].duplication_yn) continuousYn = false;
  }

  do {
    let seasonInfo = '비수기';
    let seasonOrder = 999;
    let pDay = moment(currDate).day();
    let normalWeekendYn = normalWeekendInfo.indexOf(pDay) < 0 ? false : true;
    let specialWeekendYn = specialWeekendInfo.indexOf(pDay) < 0 ? false : true;
    let chgContinuousYn = continuousYn;
    let holidayPreviousYn = false;
    let holidayDayYn = false;
    let siteSpecialFee = 0;

    seasons.map((season) => {
      if (
        moment(currDate).isBetween(
          season.season_start_date,
          season.season_end_date,
          undefined,
          []
        )
      ) {
        if (seasonOrder >= season.season_order) {
          seasonInfo = season.season_division;
          seasonOrder = season.season_order;
        }
      }
    });
    if (arrSeason.indexOf(seasonInfo) < 0) {
      arrSeason.push(seasonInfo);
    }

    holidays.map((holiday) => {
      if (moment(holiday.holiday_date).diff(moment(currDate), 'days') === 1) {
        if (specialWeekendInfo.length > 0) {
          specialWeekendYn = true;
          normalWeekendYn = false;
        } else if (normalWeekendInfo.length > 0) {
          specialWeekendYn = false;
          normalWeekendYn = true;
        }
        holidayPreviousYn = true;
      } else if (
        moment(holiday.holiday_date).diff(moment(currDate), 'days') === 0
      ) {
        holidayDayYn = true;
      }
    });

    dayCnt += 1;
    if (normalWeekendYn) normalWeekendCnt += 1;
    if (specialWeekendYn) specialWeekendCnt += 1;

    if (continuousYn && dayCnt === 1 && method === '합산방식') {
      chgContinuousYn = false;
    }

    // 특별요금 확인
    if (specialFees && specialFees.length > 0) {
      specialFees.map((specialFee) => {
        if (
          currDate.isSameOrAfter(moment(specialFee.start_date)) &&
          currDate.isSameOrBefore(moment(specialFee.end_date))
        ) {
          if (
            (specialFee.monday_yn && pDay === 1) ||
            (specialFee.tuesday_yn && pDay === 2) ||
            (specialFee.wednesday_yn && pDay === 3) ||
            (specialFee.thursday_yn && pDay === 4) ||
            (specialFee.friday_yn && pDay === 5) ||
            (specialFee.saturday_yn && pDay === 6) ||
            (specialFee.sunday_yn && pDay === 0) ||
            (specialFee.holyday_previous_yn && holidayPreviousYn) ||
            (specialFee.holyday_day_yn && holidayDayYn)
          ) {
            if (chgContinuousYn) {
              if (specialFee.consecutive_night_fee >= siteSpecialFee) {
                siteSpecialFee = specialFee.consecutive_night_fee;
              }
            } else {
              if (specialFee.one_night_fee >= siteSpecialFee) {
                siteSpecialFee = specialFee.one_night_fee;
              }
            }
          }
        }
      });
    }

    if (siteSpecialFee > 0) {
      totalSiteFee += siteSpecialFee;
    } else {
      fees.map((fee) => {
        let feeAllDayYn = fee.weekend_division === '평일+주말' ? true : false;
        let feeNormalWeekendYn = fee.weekend_division === '주말' ? true : false;
        let feeSpeciaWeekendlYn =
          fee.weekend_division === '주말특수' ? true : false;

        if (
          fee.season_division === seasonInfo &&
          fee.season_order === seasonOrder &&
          (feeAllDayYn ? normalWeekendYn : feeNormalWeekendYn) ===
            normalWeekendYn &&
          (feeAllDayYn ? specialWeekendYn : feeSpeciaWeekendlYn) ===
            specialWeekendYn &&
          fee.consecutive_nights_yn === chgContinuousYn
        ) {
          let tmpFee = 0;
          if (specialDiscounts && specialDiscounts.length > 0) {
            if (
              moment(currDate).isBetween(
                specialDiscounts[0].start_date,
                specialDiscounts[0].end_date,
                undefined,
                []
              )
            ) {
              if (specialDiscounts[0].weekend_yn) {
                if (specialDiscounts[0].rate > 0) {
                  tmpFee = fee.fee * ((100 - specialDiscounts[0].rate) / 100);
                  specialWeekendName = specialDiscounts[0].name;
                } else if (specialDiscounts[0].fee > 0) {
                  tmpFee = fee.fee - specialDiscounts[0].fee;
                  specialWeekendName = specialDiscounts[0].name;
                }
              } else {
                if (!normalWeekendYn && !specialWeekendYn) {
                  if (specialDiscounts[0].rate > 0) {
                    tmpFee = fee.fee * ((100 - specialDiscounts[0].rate) / 100);
                    specialWeekendName = specialDiscounts[0].name;
                  } else if (specialDiscounts[0].fee > 0) {
                    tmpFee = fee.fee - specialDiscounts[0].fee;
                    specialWeekendName = specialDiscounts[0].name;
                  }
                }
              }
            }
          }

          totalSiteFee += tmpFee > 0 ? tmpFee : fee.fee;
          discountFee += tmpFee > 0 ? fee.fee - tmpFee : 0;
        }
      });
    }
  } while (currDate.add(1, 'days').diff(lastDate) < 0);

  return {
    season: arrSeason.join(','),
    continuous: continuousYn,
    totalFee: totalSiteFee,
    discountFee: discountFee,
    day: dayCnt,
    weekend: normalWeekendCnt,
    special: specialWeekendCnt,
    specialName: specialWeekendName,
  };
}

// 사이트 인원추가요금 조회
// seasons : 시즌정보. 가장 우선순위가 높은 시즌 적용
// epsfs : 인원추가요금 정보
// ages : 연령구분
// accommodationYn : 숙박여부
// searchOptions : 검색조건. 기간(시작일, 종료일) 산정
export function getSitePersonFee(
  seasons,
  epsfs,
  ages,
  accommodationYn,
  searchOptions
) {
  let totalFee = 0;
  let currDate = moment(searchOptions.start_date).startOf('day');
  let lastDate = moment(searchOptions.end_date).startOf('day');

  do {
    let seasonInfo = '비수기';
    let seasonOrder = 999;

    seasons.map((season) => {
      if (
        moment(currDate).isBetween(
          season.season_start_date,
          season.season_end_date,
          undefined,
          []
        )
      ) {
        if (seasonOrder >= season.season_order) {
          seasonInfo = season.season_division;
          seasonOrder = season.season_order;
        }
      }
    });

    epsfs.map((fee) => {
      if (
        fee.season_division === seasonInfo &&
        fee.season_order === seasonOrder &&
        fee.personnel_division === ages &&
        fee.accommodation_yn === accommodationYn
      ) {
        totalFee += fee.fee;
      }
    });
  } while (currDate.add(1, 'days').diff(lastDate) < 0);

  return totalFee;
}

// 사이트 차량추가요금 조회
// seasons : 시즌정보. 가장 우선순위가 높은 시즌 적용
// vhcfs : 차량추가요금 정보
// vehicles : 차량구분
// searchOptions : 검색조건. 기간(시작일, 종료일) 산정
export function getSiteVehicleFee(seasons, vhcfs, vehicles, searchOptions) {
  let totalFee = 0;
  let currDate = moment(searchOptions.start_date).startOf('day');
  let lastDate = moment(searchOptions.end_date).startOf('day');

  do {
    let seasonInfo = '비수기';
    let seasonOrder = 999;

    seasons.map((season) => {
      if (
        moment(currDate).isBetween(
          season.season_start_date,
          season.season_end_date,
          undefined,
          []
        )
      ) {
        if (seasonOrder >= season.season_order) {
          seasonInfo = season.season_division;
          seasonOrder = season.season_order;
        }
      }
    });

    vhcfs.map((fee) => {
      if (
        fee.season_division === seasonInfo &&
        fee.season_order === seasonOrder &&
        fee.vehicle_division === vehicles
      ) {
        totalFee += fee.fee;
      }
    });
  } while (currDate.add(1, 'days').diff(lastDate) < 0);

  return totalFee;
}

// 사이트 기타추가요금 조회
// seasons : 시즌정보. 가장 우선순위가 높은 시즌 적용
// etcfs : 기타추가요금 정보
// etcs : 기타요금구분
// searchOptions : 검색조건. 기간(시작일, 종료일) 산정
export function getSiteEtcFee(seasons, etcfs, etcs, searchOptions) {
  let totalFee = 0;
  let currDate = moment(searchOptions.start_date).startOf('day');
  let lastDate = moment(searchOptions.end_date).startOf('day');

  do {
    let seasonInfo = '비수기';
    let seasonOrder = 999;

    seasons.map((season) => {
      if (
        moment(currDate).isBetween(
          season.season_start_date,
          season.season_end_date,
          undefined,
          []
        )
      ) {
        if (seasonOrder >= season.season_order) {
          seasonInfo = season.season_division;
          seasonOrder = season.season_order;
        }
      }
    });

    etcfs.map((fee) => {
      if (
        fee.season_division === seasonInfo &&
        fee.season_order === seasonOrder &&
        fee.etc_division === etcs
      ) {
        totalFee += fee.fee;
      }
    });
  } while (currDate.add(1, 'days').diff(lastDate) < 0);

  return totalFee;
}

// 사이트 환불요금 산정 (사용자에게 환불할 금액)
// seasons : 시즌정보. 이용시작일이 포함된 시즌 적용
// rfnds : 환불금액 정보. 이용시작일이 포함된 시즌의 환불금액 정보 적용
// fee : 결제금액
// startDate : 예약된 이용시작일
// endDate : 예약된 이용종료일
export function getSiteRefundFee(seasons, rfnds, fee, startDate, endDate) {
  let refundFee = -1;
  let refundRate = -1;
  let maxRefundRate = 0;
  let seasonInfo = '비수기';
  const useStartDate = moment(startDate).startOf('day');
  const today = moment().format('YYYYMMDD');
  const diffDays = moment(useStartDate).diff(today, 'days');

  seasons.map((season) => {
    if (
      moment(useStartDate).isBetween(
        season.season_start_date,
        season.season_end_date,
        undefined,
        []
      )
    ) {
      seasonInfo = season.season_division;
    }
  });

  rfnds.map((rfnd) => {
    if (seasonInfo === rfnd.season_division) {
      let rfndDays = 0;
      if (rfnd.use_day_division === '당일') {
        rfndDays = 0;
      } else {
        rfndDays = Number(rfnd.use_day_division.replace(/\일전/g, ''));
      }

      if (diffDays === rfndDays) {
        refundFee = fee - fee * ((100 - rfnd.refund_rate) / 100);
        refundRate = rfnd.refund_rate;
      } else {
        if (maxRefundRate < rfnd.refund_rate) {
          maxRefundRate = rfnd.refund_rate;
        }
      }
    }
  });

  if (refundFee < 0) {
    refundFee = fee - fee * ((100 - maxRefundRate) / 100);
  }

  return {
    season: seasonInfo,
    days: diffDays,
    rate: refundRate < 0 ? maxRefundRate : refundRate,
    fee: refundFee,
  };
}
// [{key1:value1},{key2:value2},{key3:value3},...] => value1/value2/value3/...
export function delimiterToObject(obj, delimiter) {
  let rString = '';

  obj.map((item, index) => {
    if (index === 0) {
      rString = item[Object.keys(item)];
    } else {
      rString += delimiter + item[Object.keys(item)];
    }
  });

  return rString;
}

export function newDelimiterToObject(obj, delimiter) {
  let type = '';
  obj.map((item, index) => {
    if (index === 0) {
      type = type + item.type_division;
    } else {
      type = type + delimiter + ' ' + item.type_division;
    }
  });

  return type;
}

export function personListToText(personList) {
  let count = 0;

  if (!personList || personList.length <= 0) return '';
  let temp = personList.map((item, index) => {
    if (item.count > 0) {
      count = count + item.count;
      let content = item.name;
      if (!item.accommodation_yn) {
        content = content + '(방문)';
      }
      if (index > 0) {
        return (content = content + ' ' + item.count + '인');
      }
      return content + ' ' + item.count + '인';
    }
    return null;
  });

  if (count <= 0) return '';

  const list = temp.filter((item) => {
    return item !== null;
  });
  let text = '';
  list.map((item, index) => {
    if (list.length - 1 === index) {
      text = text + item;
    } else {
      text = text + item + ' / ';
    }
  });
  return text;
}

export function listToText(carList) {
  let count = 0;

  if (!carList || carList.length <= 0) return '';
  let temp = carList.map((item, index) => {
    if (item.count > 0) {
      count = count + item.count;
      let content = item.name;
      if (index > 0) {
        return (content = content + '-' + item.count);
      }
      return content + '-' + item.count;
    }
    return null;
  });

  if (count <= 0) return '';

  const list = temp.filter((item) => {
    return item !== null;
  });
  let text = '';
  list.map((item, index) => {
    if (list.length - 1 === index) {
      text = text + item;
    } else {
      text = text + item + ',';
    }
  });
  return text;
}

export function listToCount(list) {
  if (!list) return;
  return list.reduce(
    (total, currentValue) => (total = total + currentValue.count),
    0
  );
}

// 랜덤한 N(stringLength) 자릿수 문자열 생성
export function randomString(stringLength) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  let randomstring = '';

  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
}

export function checkNullTimeText(text) {
  return text?.length > 0 ? text.substr(0, 5) : '-';
}

// 현재 요일이 토요일 12시가 넘으면 다음주 토요일, 일요일이 선택되게 반환됨.
export function checkWeekend(day) {
  if (moment().format('HH') >= 12 && moment().day() == 6) {
    return moment()
      .day(day + 7)
      .format('YYYY-MM-DD');
  } else {
    return moment().day(day).format('YYYY-MM-DD');
  }
}

// 대상 Object(target)의 키의 값이 포함되는지 확인
export function checkInclusionStatus(target, key, value) {
  let bExist = false;
  target.map((item, index) => {
    // console.log(item, item[key], value);
    if (item[key] === value) {
      bExist = true;
    }
  });

  return bExist;
}

// 예약 가능한 범위 (최대 날짜) 조회
export function getMaxDate(openingDate, maxMonths) {
  const maxDate = moment().add(maxMonths, 'months').endOf('month');
  // 오픈일이 정의되지 않았다면
  if (openingDate === 0) {
    return moment().add(maxMonths, 'months').format('YYYY-MM-DD');
  }

  const openingDay = moment.isMoment(openingDate)
    ? openingDate
    : moment().date(openingDate);

  if (
    (moment.isMoment(openingDate) ? openingDate.date() : Number(openingDate)) <
    16
  ) {
    return maxDate.subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
  }

  if (moment().isAfter(openingDay)) {
    return maxDate.format('YYYY-MM-DD');
  }

  return maxDate.subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
}
export function momentGetDayOfWeek(day) {
  switch (day) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
  }
}

export function getPersonCount(basicNumber, personFeeDesc) {
  const regex = /[^0-9]/g;

  let count = 0;
  if (personFeeDesc) {
    let temp = personFeeDesc.split(',');
    temp = personFeeDesc.split('/');
    temp.map((item) => {
      count = count + parseInt(item.replace(regex, ''));
    });
    return `총 ${basicNumber + count}인, 추가 ${count}인`;
  } else {
    return `총 ${basicNumber}인`;
  }
}

/**캠핑장 필터 함수 */
// campList :필터링할 캠핑장 목록
// preferences :필터링할 조건 목록
export function filteringCampList(campList, preferences) {
  if (preferences) {
    const tempPreferences = Object.entries(preferences).map((item) => {
      const tempItem = item[0].split('-');
      return { type: tempItem[1], value: tempItem[2] };
    });
    if (tempPreferences.length > 0) {
      let groupPreferences = _.groupBy(tempPreferences, 'type');
      const tempList = campList.filter((camp, index) => {
        let typeCheck = false;
        if (groupPreferences?.type_division?.length > 0) {
          groupPreferences.type_division.map(({ value }) => {
            if (!typeCheck) {
              typeCheck = camp.rg_camp_typ.some(({ type_division_code }) => {
                return type_division_code === value;
              });
            }
          });
          if (!typeCheck) {
            return false;
          }
        }

        if (groupPreferences?.ground_division?.length > 0) {
          let groundCheck = false;
          groupPreferences.ground_division.map(({ value }) => {
            if (!groundCheck) {
              groundCheck = camp.rg_site_ground.some(
                ({ ground_division_code }) => {
                  return ground_division_code === value;
                }
              );
            }
          });
          if (!groundCheck) {
            return false;
          }
        }
        if (groupPreferences?.reservation_yn?.length > 0) {
          if (!camp.reservation_yn) {
            return false;
          }
        }
        if (groupPreferences?.campingcar_yn?.length > 0) {
          if (!camp.campingcar_yn) {
            return false;
          }
        }
        if (groupPreferences?.trailer_yn?.length > 0) {
          if (!camp.trailer_yn) {
            return false;
          }
        }
        if (groupPreferences?.side_parking_yn?.length > 0) {
          if (!camp.side_parking_yn) {
            return false;
          }
        }
        if (groupPreferences?.pet_access?.length > 0) {
          if (
            groupPreferences.pet_access[0].value === 'PTAC0001' &&
            !camp.pet_yn
          ) {
            return false;
          } else if (
            groupPreferences.pet_access[0].value === 'PTAC0003' &&
            camp.pet_yn
          ) {
            return false;
          }
        }
        if (groupPreferences?.two_night_yn?.length > 0) {
          if (
            groupPreferences.two_night_yn[0].value === 'TNYN0001' &&
            (camp.two_night_yn || camp.weekend_two_night_yn)
          ) {
            return false;
          } else if (
            groupPreferences.two_night_yn[0].value === 'TNYN0002' &&
            !camp.two_night_yn &&
            !camp.weekend_two_night_yn
          ) {
            return false;
          }
        }
        if (groupPreferences?.location_division?.length > 0) {
          let locationCheck = false;
          groupPreferences.location_division.map(({ value }) => {
            if (!locationCheck) {
              locationCheck = camp.rg_camp_lctn.some(
                ({ location_division_code }) => {
                  return location_division_code === value;
                }
              );
            }
          });
          if (!locationCheck) {
            return false;
          }
        }
        if (
          groupPreferences?.facility_division?.length > 0 &&
          camp.rg_camp_amfc?.length > 0
        ) {
          let facilityCheck = false;
          groupPreferences.facility_division.map(({ value }) => {
            if (!facilityCheck) {
              facilityCheck = camp.rg_camp_amfc.some(
                ({ facility_division_code }) => {
                  return facility_division_code === value;
                }
              );
            }
          });
          if (!facilityCheck) {
            return false;
          }
        }
        return true;
      });
      return tempList;
    }
  }

  return campList;
}

// 캠핑장 목록의 영역((x_min, y_min) ~ (x_max, y_max)) 및 중심점(center_x, center_y) 계산
// campList : 지도에 표출할 캠핑장 목록
export function getCenterPositionWithList(campList) {
  let xMin = 0,
    yMin = 0,
    xMax = 0,
    yMax = 0;

  campList.map((camp, index) => {
    if (index === 0) {
      xMin = parseFloat(camp.x_coordinate);
      xMax = parseFloat(camp.x_coordinate);
      yMin = parseFloat(camp.y_coordinate);
      yMax = parseFloat(camp.y_coordinate);
    } else {
      if (xMin > parseFloat(camp.x_coordinate))
        xMin = parseFloat(camp.x_coordinate);
      if (xMax < parseFloat(camp.x_coordinate))
        xMax = parseFloat(camp.x_coordinate);
      if (yMin > parseFloat(camp.y_coordinate))
        yMin = parseFloat(camp.y_coordinate);
      if (yMax < parseFloat(camp.y_coordinate))
        yMax = parseFloat(camp.y_coordinate);
    }
  });

  return {
    x_min: xMin,
    y_min: yMin,
    x_max: xMax,
    y_max: yMax,
    center_x: (xMin + xMax) / 2,
    center_y: (yMin + yMax) / 2,
  };
}

export const ascSort = (a, b) =>
  isNaN(a) || isNaN(b)
    ? a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    : parseInt(a) - parseInt(b);
