// create model use easy-peasy
import { action, thunk } from 'easy-peasy';
import { ApiService } from '@/store/index';
import { STATUS } from '@/constants';
import BaseModel from './Base';
import moment from 'moment';
import * as common from '@/utils/Common';

const getCalendarItems = thunk(async (actions, payload) => {
  try {
    const periodData = await ApiService.campReservationCalendar(payload);
    actions.setPeriodData(periodData.data);
  } catch (error) {
    console.warn(error);
  }
});

const getCalendarSiteInfo = thunk(async (actions, payload) => {
  const { campId } = payload;

  try {
    const response = await ApiService.campSiteInfo({
      id: campId,
      people: 2,
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().add(180, 'day').format('YYYY-MM-DD'),
    });
    actions.setCalendarSiteInfo(response.data);
  } catch (error) {
    console.warn(error);
  }
});
const getCampCalendar = thunk(async (actions, payload) => {
  const { campDefaultInfo, periodData, calendarSiteInfo, isFastRender } = payload;

  const calendarSiteMap = {};
  calendarSiteInfo.forEach((site) => {
    calendarSiteMap[site.id] = site;
  });

  const items = periodData.sort((a, b) =>
    a.days === b.days && a.zone_name === b.zone_name
      ? common.ascSort(a.site_name, b.site_name)
      : 0
  );

  if (isFastRender) {
    actions.setCampCalendar([]);
    // 100개씩 렌더링 하기 위해 chunk 처리 : getSiteBaseFee가 느리기 때문에 전부 터리하고 렌더링하면 1초 이상 걸림
    const chunkedItems = _.chunk(items, 100);
    for (let i = 0; i < chunkedItems.length; i++) {
      const chunkedItem = chunkedItems[i].map((item) => {
        const site = calendarSiteMap[item.site_id];
        if (site === undefined) {
          item.fee = 0;
        } else {
          const feeInfo = common.getSiteBaseFee(
            site.rg_camp_sspd,
            campDefaultInfo.rg_camp_rsnf.continuous_night_method,
            campDefaultInfo.rg_camp_inwk,
            campDefaultInfo.rg_camp_hldy,
            site.rg_site_fee,
            site.rg_site_sfee,
            site.rg_site_spcd,
            {
              start_date: item.days,
              end_date: moment(item.days).add(1, 'days').format('YYYY-MM-DD'),
            }
          );
          item.fee = feeInfo.totalFee;
        }

        return {
          date: item.days,
          ...item,
        };
      });

      actions.addCampCalendar(chunkedItem);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  } else {
    const renderItems = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const site = calendarSiteMap[item.site_id];
      if (site === undefined) {
        item.fee = 0;
      } else {
        const feeInfo = common.getSiteBaseFee(
          site.rg_camp_sspd,
          campDefaultInfo.rg_camp_rsnf.continuous_night_method,
          campDefaultInfo.rg_camp_inwk,
          campDefaultInfo.rg_camp_hldy,
          site.rg_site_fee,
          site.rg_site_sfee,
          site.rg_site_spcd,
          {
            start_date: item.days,
            end_date: moment(item.days).add(1, 'days').format('YYYY-MM-DD'),
          }
        );
        item.fee = feeInfo.totalFee;
      }

      renderItems.push({
        date: item.days,
        ...item,
      });

      if (i % 100 === 0) { // 비동기 처리를 위해 적당한 단위(여기서는 100개 아이템마다)로 나누어 처리
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    actions.setCampCalendar(renderItems);
  }
});

const getCampDefaultInfo = thunk(async (actions, payload) => {
  try {
    const response = await ApiService.campDefaultInfo(payload);
    actions.setCampDefualtInfo(response.data);
  } catch (error) {
    console.warn(error);
  }
});

const getCampZoneInfo = thunk(async (actions, payload) => {
  try {
    const response = await ApiService.campZoneInfo(payload);
    actions.setCampZoneInfo(response.data);
  } catch (error) {
    console.warn(error);
  }
});

const getCampSiteInfo = thunk(async (actions, payload) => {
  try {
    const response = await ApiService.campSiteInfo(payload);
    actions.setCampSiteInfo(response.data);
  } catch (error) {
    console.warn(error);
  }
});

const getCouponList = thunk(async (actions, payload) => {
  try {
    const response = await ApiService.couponList(payload);
    actions.setCouponList(response.data);
  } catch (error) {
    console.warn(error);
  }
});

const ReservationModel = {
  ...BaseModel(),
  ready: false,
  calendarItems: [],
  couponList: [],
  campId: parseInt(process.env.NEXT_PUBLIC_CAMP_ID),
  campDefaultInfo: null,
  campSiteInfo: [],
  siteInfo: {},
  campZoneInfo: null,
  feeInfo: {},
  infoList: [],
  error: null,
  refundInfo: null, // 환불
  periodData: null,
  calendarSiteInfo: null,
  getCampCalendar,
  getCalendarSiteInfo,
  getCampDefaultInfo,
  getCampZoneInfo,
  getCampSiteInfo,
  getCouponList,
  getCalendarItems,
  setReady: action((state, ready) => {
    state.ready = ready;
  }),
  setCampId: action((state, campId) => {
    state.campId = campId;
  }),
  setError: action((state, error) => {
    state.error = error.message;
  }),
  setIsLoading: action((state) => {
    state.isLoading = !state.isLoading;
  }),
  addCampCalendar: action((state, campCalendarItem) => {
    state.calendarItems.push(...campCalendarItem);
  }),
  setCampCalendar: action((state, campCalendarItems) => {
    state.calendarItems = campCalendarItems;
  }),
  setCampDefualtInfo: action((state, campDefaultInfo) => {
    state.campDefaultInfo = campDefaultInfo[0];
  }),
  setCampZoneInfo: action((state, campZoneInfo) => {
    state.campZoneInfo = campZoneInfo[0];
  }),
  setCampSiteInfo: action((state, campSiteInfo) => {
    state.campSiteInfo = campSiteInfo;
  }),
  setCouponList: action((state, couponList) => {
    state.couponList = couponList;
  }),
  setFeeInfo: action((state, feeInfo) => {
    state.feeInfo = feeInfo;
  }),
  setInfoList: action((state, infoList) => {
    state.infoList = infoList;
  }),
  setRefundInfo: action((state, refundInfo) => {
    state.refundInfo = refundInfo;
  }),
  setPeriodData: action((state, periodData) => {
    state.periodData = periodData;
  }),
  setCalendarSiteInfo: action((state, calendarSiteInfo) => {
    state.calendarSiteInfo = calendarSiteInfo;
  }),
};

export default ReservationModel;
