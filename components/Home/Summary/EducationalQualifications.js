import Image from 'next/image';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';

import AnimationString from '@/components/Animation/String';
import AnimationNumber from '@/components/Animation/Number';

const styles = {
  'homePage_summary-educationalQualifications-title': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: 'auto'
  },
  'homePage_summary-educationalQualifications-title-icon': {
    objectFit: 'contain',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    },
    img: {
      objectFit: 'contain'
    }
  },
  'homePage_summary-educationalQualifications-row': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    marginTop: '8px',
    marginLeft: '20px',
    [mediaTablet]: {
      alignItems: 'flex-start'
    }
  },
  'homePage_summary-educationalQualifications-row-logo': {
    objectFit: 'contain',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'homePage_summary-educationalQualifications-row-school-name': {
    // display: '',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'homePage_summary-educationalQualifications-row-school-rwdName': {
    display: 'none',
    [mediaTablet]: {
      display: 'block'
    }
  }
};

const useStyles = makeStyles(styles);

function SummaryName(props) {
  const classes = useStyles(props);

  return (
    <div {...props} className={[props.className].join(' ')}>
      <div
        className={classes['homePage_summary-educationalQualifications-title']}
      >
        <Image
          className={
            classes['homePage_summary-educationalQualifications-title-icon']
          }
          loading="lazy"
          src="/img/icon/educational-qualifications-icon.png"
          alt="學歷icon"
          width={50}
          height={50}
        />
        <p>學歷</p>
      </div>

      <div
        className={classes['homePage_summary-educationalQualifications-row']}
      >
        <Image
          className={
            classes['homePage_summary-educationalQualifications-row-logo']
          }
          loading="lazy"
          src="/img/logo/nutc-logo.png"
          alt="NUTC LOGO"
          width={40}
          height={40}
        />
        <div
          className={
            classes['homePage_summary-educationalQualifications-row-school']
          }
        >
          <AnimationString
            className={
              classes[
                'homePage_summary-educationalQualifications-row-school-name'
              ]
            }
            label="國立台中科技大學 資訊管理系 學士"
          />
          <AnimationString
            className={
              classes[
                'homePage_summary-educationalQualifications-row-school-rwdName'
              ]
            }
            label="國立台中科技大學"
          />
          <AnimationString
            className={
              classes[
                'homePage_summary-educationalQualifications-row-school-rwdName'
              ]
            }
            label="資訊管理系 學士"
          />
          {/* <p>2018 / 9 - 2020 / 6</p> */}
          <div>
            <AnimationNumber label="2018" start={1000} duration={1000} />
            <span> / </span>
            <AnimationNumber label="9" start={0} duration={1000} />
            <span> - </span>
            <AnimationNumber label="2020" start={1000} duration={1000} />
            <span> / </span>
            <AnimationNumber label="6" start={0} duration={1000} />
          </div>
        </div>
      </div>

      <div
        className={classes['homePage_summary-educationalQualifications-row']}
      >
        <Image
          className={
            classes['homePage_summary-educationalQualifications-row-logo']
          }
          src="/img/logo/knjc-mis-logo.png"
          alt="KNJC MIS LOGO"
          width={40}
          height={40}
        />
        <div
          className={
            classes['homePage_summary-educationalQualifications-row-school']
          }
        >
          <AnimationString
            className={
              classes[
                'homePage_summary-educationalQualifications-row-school-name'
              ]
            }
            label="康寧醫護暨管理專科學校 資訊管理系 副學士"
          />
          <AnimationString
            className={
              classes[
                'homePage_summary-educationalQualifications-row-school-rwdName'
              ]
            }
            label="康寧醫護暨管理專科校"
          />
          <AnimationString
            className={
              classes[
                'homePage_summary-educationalQualifications-row-school-rwdName'
              ]
            }
            label="資訊管理系 副學士"
          />
          {/* <p>2013 / 9 - 2018 / 6</p> */}
          <div>
            <AnimationNumber label="2013" start={1000} duration={1000} />
            <span> / </span>
            <AnimationNumber label="9" start={0} duration={1000} />
            <span> - </span>
            <AnimationNumber label="2018" start={1000} duration={1000} />
            <span> / </span>
            <AnimationNumber label="6" start={0} duration={1000} />
          </div>
        </div>
      </div>
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
