import classNames from 'classnames';
import { useStoreState } from 'easy-peasy';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

export default function ROCalendar({ campDefaultInfo, events, updateTime }) {
  const calendarRef = useRef();
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const [data, setData] = useState([]);

  const handlePrevClick = () => {
    setDate({
      year: date.month === 0 ? date.year - 1 : date.year,
      month: date.month === 0 ? 11 : date.month - 1,
    });
  };

  const handleNextClick = () => {
    setDate({
      year: date.month === 11 ? date.year + 1 : date.year,
      month: date.month === 11 ? 0 : date.month + 1,
    });
  };

  useEffect(() => {
    calendarRef?.current.scrollTo(0, 0);
  }, [date]);

  useEffect(() => {
    let newData = getCalendar(date.year, date.month);
    if (events) {
      newData = newData.map((week) => {
        return week.map((day) => {
          events.map((event) => {
            if (event.date === day.str) {
              day.items.push(event);
            }
          });

          return day;
        });
      });
    }

    setData(newData);
  }, [date, events]);

  return (
    <div className="subpixel-antialiased">
      <header className="flex flex-col items-center justify-center">
        <h1 className="flex text-[32px] font-bold">{campDefaultInfo?.name}</h1>
        <div className="flex mt-[12px] text-[24px] gap-x-[12px] items-center">
          <button
            onClick={handlePrevClick}
            className="flex rounded-full w-[32px] h-[32px] bg-[#5254cc] justify-center items-center hover:bg-primary-hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 48 48"
              fill="#fff"
            >
              <path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z" />
            </svg>
          </button>
          <span className="font-medium">
            {date.year}년 {date.month + 1}월
          </span>
          <button
            onClick={handleNextClick}
            className="flex rounded-full w-[32px] h-[32px] bg-[#5254cc] justify-center items-center hover:bg-primary-hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              viewBox="0 0 48 48"
              fill="#fff"
            >
              <path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="mt-[24px] mb-[8px] md:mb-[12px] flex items-center justify-between text-sm md:text-[16px]">
        <div className="flex gap-[8px] md:gap-x-[12px]">
          <div className="flex items-center gap-x-[4px] md:gap-x-[6px]">
            <span className="flex w-[20px] md:w-[24px] h-[20px] md:h-[24px] bg-green-500 text-white mr-1 px-1 rounded-sm justify-center items-center">
              가
            </span>
            <span className="flex">예약가능</span>
          </div>
          <div className="flex items-center gap-x-[4px] md:gap-x-[6px]">
            <span className="flex w-[20px] md:w-[24px] h-[20px] md:h-[24px] text-white mr-1 px-1 rounded-sm bg-gray-400 justify-center items-center">
              완
            </span>
            <span className="flex">예약완료</span>
          </div>
        </div>
        <div className="flex">
          {updateTime && (
            <span className="text-gray-400 font-normal">
              <span className="hidden md:inline">업데이트 </span>
              {moment(updateTime).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          )}
        </div>
      </div>

      <div
        ref={calendarRef}
        className="border-gray-400 border text-sm md:text-[15px] max-h-[calc(100vh_-_220px)] md:max-h-[calc(100vh_-_260px)] overflow-auto"
      >
        <table className="table-fixed min-w-[1280px] w-full border-collapse text-center ">
          <thead className="sticky z-20 top-[-1px] bg-white">
            <tr>
              <th className="border py-1 text-red-500">일</th>
              <th className="border py-1">월</th>
              <th className="border py-1">화</th>
              <th className="border py-1">수</th>
              <th className="border py-1">목</th>
              <th className="border py-1">금</th>
              <th className="border py-1 text-blue-500">토</th>
            </tr>
          </thead>
          <tbody>
            {data.map((week, index) => {
              return (
                <tr key={index}>
                  {week.map((day, index) => {
                    return (
                      <Day key={index} {...day} defineMonth={date.month} />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Day = ({ dayOfWeek, date, str, items, defineMonth }) => {
  const campDefaultInfo = useStoreState(
    (state) => state.reservation.campDefaultInfo
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let isToday = false;

  let bg = '';
  if (today > date || items.length === 0) {
    bg = 'bg-white';
  } else if (today < date) {
    bg = 'bg-[#EFFBE6]';
  } else {
    bg = 'bg-[#D6F4C2]';
    isToday = true;
  }

  return (
    <td className={classNames('align-top group/day border p-0', bg)}>
      <div
        className={classNames(
          'sticky z-10 top-[27px] border text-right px-[5px] py-1 bg-white ml-[-1px] w-[calc(100%_+_2px)] shadow-[0_4px_0_0_#0000001a]',
          {
            'text-red-500': dayOfWeek === 0,
            'text-blue-500': dayOfWeek === 6,
            'font-bold': isToday,
          }
        )}
      >
        {date.getMonth() !== defineMonth ? (
          <span className='opacity-30'>{date.getMonth() + 1}월 {date.getDate()}일</span>
        ) : (
          <span>{date.getDate()}일</span>
        )}
       
      </div>
      <div className="min-h-[20px] h-full pt-1 flex-1">
        {campDefaultInfo?.rg_camp_rsnf.today_online_yn === false && isToday ? (
          <div className="p-1 text-gray-500">당일예약불가</div>
        ) : (
          <>
            {items.map((item, idx) => {
              return <Item key={idx} data={item} />;
            })}
          </>
        )}
      </div>
    </td>
  );
};

const Item = ({ data }) => {
  const router = useRouter();
  const onClick = () => {
    router.push({
      pathname: 'reservation',
      query: {
        siteId: data.site_id,
        checkIn: moment(data.date).format('YYYY-MM-DD'),
      },
    });
  };

  const isDisable =
    data.block_yn ||
    !data.sale_yn ||
    isSiteBlck(data);

  let price = data.fee.toLocaleString() + '원';
  if (!data.sale_yn) {
    price = '판매중지';
  }
  if (data.block_yn || isSiteBlck(data)) {
    price = '예약마감';
  }

  return (
    <div
      onClick={onClick}
      className={classNames(
        'flex text-left hover:bg-black/10 hover:cursor-pointer mb-1 px-[2px] md:px-1 rounded-sm whitespace-nowrap',
        { 'text-gray-300': isDisable }
      )}
      title={`${data.zone_name} ${data.site_name}`}
    >
      <span
        className={classNames(
          'text-white mr-1 px-1 rounded-sm',
          isDisable ? 'bg-gray-400' : 'bg-green-500'
        )}
      >
        {isDisable ? '완' : '가'}
      </span>
      <span
        className={classNames('flex-1 overflow-hidden', {
          'line-through': isDisable,
        })}
      >
        {data.site_name} ({data.zone_name})
      </span>
      <span className="text-[12px] md:text-sm font-bold pl-[2px] md:pl-1">
        {price}
      </span>
    </div>
  );
};

// 이번달 달력 생성 code
const getCalendar = (year, month) => {
  const calendar = [];
  const firstDate = new Date(year, month, 1);
  const startDate = new Date(year, month, 1 - firstDate.getDay());
  const lastDate = new Date(year, month + 1, 0);
  const endDate = new Date(year, month + 1, 6 - lastDate.getDay());

  startDate.setHours(0, 0, 0, 0);
  let date = startDate;
  let index = 0;
  while (date <= endDate) {
    if (index % 7 === 0) {
      calendar.push([]);
    }
    calendar[calendar.length - 1].push({
      dayOfWeek: date.getDay(),
      date: new Date(date),
      str: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      items: [],
    });
    date.setDate(date.getDate() + 1);
    index += 1;
  }

  return calendar;
};

const isSiteBlck = (eventData) =>
  eventData.site_count -
    eventData.block_count -
    parseInt(eventData.reservation_count) <
  1;
