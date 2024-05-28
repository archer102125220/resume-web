import { isValidElement } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';
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
    marginLeft: '32px'
  },
  'homePage_experience-work-row-describe-linkList': {
    marginLeft: '16px'
  },
  'homePage_experience-work-row-describe-linkList-link': {
    ...linkStyle
  },
  'homePage_experience-work-row-describe-linkList-link-icon': {
    marginLeft: '5px'
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
    describe: '開發形象網站及中台系統、整合並開發網頁環景服務',
    onLine: [
      {
        webUrl: 'https://www.iseeyou.org.tw/',
        name: '愛嬉遊臺灣青年旅館聯盟',
        summary:
          '本專案為愛嬉遊臺灣青年旅館聯盟的網站翻新、網站內容管理系統開發以及會員系統的整合。',
        responsible: 'API串接，前端資料邏輯處理，RWD樣式調整，第三方服務整合。'
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
    Describe: className => (
      <p className={className}>
        接手代標部門雙平台App開發，並依主管指示作調整前端工程師/紅鬍子數位有限公司
      </p>
    )
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
    Describe: className => (
      <p className={className}>
        翻新購物網站(CSR轉SSR)，並持續維護與新增功能，整合google
        Ads工具成組件以提升代碼品質
      </p>
    )
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
                <p>{describe}</p>
                <ul
                  className={
                    classes['homePage_experience-work-row-describe-linkList']
                  }
                >
                  {experienceData.onLine.map(onLine => (
                    <li key={onLine.webUrl}>
                      <a
                        href={onLine.webUrl}
                        className={
                          classes[
                            'homePage_experience-work-row-describe-linkList-link'
                          ]
                        }
                      >
                        <span>{onLine.name}</span>
                        <Image
                          className={
                            classes[
                              'homePage_experience-work-row-describe-linkList-link-icon'
                            ]
                          }
                          loading="lazy"
                          src="/img/icon/outbound-link-icon.png"
                          alt="outbound Link icon"
                          width={10}
                          height={10}
                        />
                      </a>

                      <p>{onLine.summary}</p>
                      <p>主要負責：{onLine.responsible}</p>
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
