import { isValidElement } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';

import { mediaTablet, mediaMobile } from '@/styles/globals';
import { linkStyle } from '@/styles/linkStyle';

import AnimationString from '@/components/Animation/String';
import AnimationNumber from '@/components/Animation/Number';

const styles = {
  'homePage_experience-work-title': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: 'auto'
  },
  'homePage_experience-work-title-icon': {
    objectFit: 'contain',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'homePage_experience-work-row': {
    marginTop: '16px',
    marginLeft: '20px'
  },
  'homePage_experience-work-row-info': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    [mediaTablet]: {
      alignItems: 'flex-start'
    }
  },
  'homePage_experience-work-row-info-logo': {
    objectFit: 'contain',
    backgroundColor: '#fff',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'homePage_experience-work-row-info-company-name': {
    marginLeft: 'auto',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'homePage_experience-work-row-info-company-rwdName': {
    display: 'none',
    [mediaTablet]: {
      display: 'block'
    }
  },
  'homePage_experience-work-row-describe': {
    marginTop: '8px',
    marginLeft: '32px',
    [mediaMobile]: {
      marginLeft: '10px'
    }
  },
  'homePage_experience-work-row-describe-linkList': {
    marginLeft: '16px'
  },
  'homePage_experience-work-row-describe-linkList-link': {
    ...linkStyle,
    marginRight: 'unset'
  },
  'homePage_experience-work-row-describe-linkList-link-icon': {
    marginLeft: '5px',
    [mediaTablet]: {
      width: '10px',
      height: '10px'
    }
  }
};

const useStyles = makeStyles(styles);

const EXPERIENCE_DATA = [
  {
    logoLoading: 'lazy',
    logoSrc: '/img/logo/jiapin-cloud-logo.png',
    logoAlt: 'jiapin cloud LOGO',
    logoWidth: 40,
    logoHeight: 40,
    companyName: '資深前端工程師 / 家品媒體科技有限公司',
    companyRwdName: ['資深前端工程師', '家品媒體科技有限公司'],
    startDate: {
      year: '2023',
      animationYearStart: 1000,
      animationYearDuration: 1000,
      month: '5',
      animationMonthStart: 0,
      animationMonthDuration: 1000
    },
    endDate: {
      year: '2024',
      animationYearStart: 1000,
      animationYearDuration: 1000,
      month: '5',
      animationMonthStart: 0,
      animationMonthDuration: 1000
    },
    remark: ['全遠端工作', '因公司資訊技術部門裁撤，被迫離職'],
    describe: '開發形象網站及中台系統、整合並開發網頁環景服務。',
    onLine: [
      {
        webUrl: 'https://etravel.matsu.gov.tw/360vr',
        name: '馬祖e點通 - 360°VR 線上玩',
        summary: '本專案為馬祖縣政府的觀光網站，包含島民系統及線上環景服務。',
        responsible:
          '將A-frame（WebVR框架）與Nuxt3做整合，並開發線上環景服務。',
        describeLink: '/matsu360'
      },
      {
        webUrl: 'https://www.iseeyou.org.tw/',
        name: '愛嬉遊臺灣青年旅館聯盟',
        summary:
          '本專案為愛嬉遊臺灣青年旅館聯盟的網站翻新、網站內容管理系統開發以及會員系統的整合。',
        responsible: 'API串接，前端資料邏輯處理，RWD樣式調整，第三方服務整合。',
        describeLink: '/isu'
      }
    ]
  },
  {
    logoLoading: 'lazy',
    logoSrc: '/img/logo/pchome-logo.png',
    logoAlt: 'pchome LOGO',
    logoWidth: 40,
    logoHeight: 40,
    companyName: 'React Native工程師 / BIBIAN比比昂跨境電商',
    companyRwdName: ['React Native工程師', 'BIBIAN比比昂跨境電商'],
    startDate: {
      year: '2022',
      animationYearStart: 1000,
      animationYearDuration: 1000,
      month: '11',
      animationMonthStart: 0,
      animationMonthDuration: 1000
    },
    endDate: {
      year: '2023',
      animationYearStart: 1000,
      animationYearDuration: 1000,
      month: '5',
      animationMonthStart: 0,
      animationMonthDuration: 1000
    },
    remark: ['由於長期處於閒置狀態且缺乏職業發展機會，因而離職。'],
    describe: '接手代標部門雙平台App開發，並依主管指示作調整。'
  },
  {
    logoLoading: 'lazy',
    logoSrc: '/img/logo/redso-logo.jpg',
    logoAlt: 'redso LOGO',
    logoWidth: 40,
    logoHeight: 40,
    companyName: '前端工程師 / 紅鬍子數位有限公司',
    companyRwdName: ['前端工程師', '紅鬍子數位有限公司'],
    startDate: {
      year: '2020',
      animationYearStart: 1000,
      animationYearDuration: 1000,
      month: '9',
      animationMonthStart: 0,
      animationMonthDuration: 1000
    },
    endDate: {
      year: '2021',
      animationYearStart: 1000,
      animationYearDuration: 1000,
      month: '5',
      animationMonthStart: 0,
      animationMonthDuration: 1000
    },
    remark: ['因義務役入伍離職'],
    describe:
      '翻新購物網站(CSR轉SSR)，並持續維護與新增功能，整合google Ads工具成組件以提升代碼品質。',
    onLine: [
      {
        name: 'Big Big Shop',
        summary:
          '本專案為香港電商平台，已上線5年以上，於2022/10/07確認已下線。',
        responsible:
          '新增及維護功能、SPA轉為SSR，整合google Ads 工具以及youtube 播放器成vue組件。',
        describeLink: '/bbshop'
      }
    ]
  }
];

function SummaryName(props) {
  const classes = useStyles(props);

  return (
    <div {...props} className={[props.className].join(' ')}>
      <div className={classes['homePage_experience-work-title']}>
        <Image
          className={classes['homePage_experience-work-title-icon']}
          loading="lazy"
          src="/img/icon/working-icon.png"
          alt="工作icon"
          width={50}
          height={50}
        />
        <p>工作經歷</p>
      </div>

      {EXPERIENCE_DATA.map(experienceData => {
        const Describe = experienceData.Describe;
        const describe = experienceData.describe;
        const onLine = experienceData.onLine || [];
        const remark = experienceData.remark || [];

        return (
          <div
            key={experienceData.companyName}
            className={classes['homePage_experience-work-row']}
          >
            <div className={classes['homePage_experience-work-row-info']}>
              <Image
                className={classes['homePage_experience-work-row-info-logo']}
                loading={experienceData.logoLoading}
                src={experienceData.logoSrc}
                alt={experienceData.logoAlt}
                width={experienceData.logoWidth}
                height={experienceData.logoHeight}
              />
              <div
                className={classes['homePage_experience-work-row-info-company']}
              >
                <AnimationString
                  className={
                    classes['homePage_experience-work-row-info-company-name']
                  }
                  label={experienceData.companyName}
                />
                {experienceData.companyRwdName.map(companyRwdName => (
                  <AnimationString
                    key={companyRwdName}
                    className={
                      classes[
                        'homePage_experience-work-row-info-company-rwdName'
                      ]
                    }
                    label={companyRwdName}
                  />
                ))}
                <div>
                  <AnimationNumber
                    label={experienceData.startDate.year}
                    start={experienceData.startDate.animationYearStart}
                    duration={experienceData.startDate.animationYearDuration}
                  />
                  <span> / </span>
                  <AnimationNumber
                    label={experienceData.startDate.month}
                    start={experienceData.startDate.animationMonthStart}
                    duration={experienceData.startDate.animationMonthDuration}
                  />
                  <span> - </span>
                  <AnimationNumber
                    label={experienceData.endDate.year}
                    start={experienceData.endDate.animationYearStart}
                    duration={experienceData.endDate.animationYearDuration}
                  />
                  <span> / </span>
                  <AnimationNumber
                    label={experienceData.endDate.month}
                    start={experienceData.endDate.animationMonthStart}
                    duration={experienceData.endDate.animationMonthDuration}
                  />
                </div>
              </div>
            </div>
            {isValidElement(Describe) === true ? (
              <Describe />
            ) : typeof Describe === 'function' ? (
              Describe(classes['homePage_experience-work-row-describe'])
            ) : (
              <div className={classes['homePage_experience-work-row-describe']}>
                {remark.map(_remark => (
                  <p key={_remark}>*{_remark}</p>
                ))}

                <p>{describe}</p>

                <ul
                  className={
                    classes['homePage_experience-work-row-describe-linkList']
                  }
                >
                  {onLine.map(_onLine => (
                    <li key={_onLine.name}>
                      <div>
                        {typeof _onLine.webUrl === 'string' &&
                        _onLine.webUrl !== '' ? (
                          <a
                            href={_onLine.webUrl}
                            target="_blank"
                            rel="noreferrer noopenner"
                            className={
                              classes[
                                'homePage_experience-work-row-describe-linkList-link'
                              ]
                            }
                          >
                            {_onLine.name}
                          </a>
                        ) : (
                          <span>{_onLine.name}</span>
                        )}
                        <Link
                          href={_onLine.describeLink}
                          className={
                            classes[
                              'homePage_experience-work-row-describe-linkList-link'
                            ]
                          }
                        >
                          (前往介紹頁面)
                        </Link>
                      </div>

                      <p>{_onLine.summary}</p>
                      <p>主要負責：{_onLine.responsible}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

SummaryName.propTypes = {
  className: PropTypes.string
};

SummaryName.defaultProps = {
  className: ''
};

export default SummaryName;
