import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';

import Image from '@/components/Image';
import AnimationString from '@/components/Animation/String';
import AnimationNumber from '@/components/Animation/Number';

const styles = {
  'summary_educationalQualifications-title': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: 'auto'
  },
  'summary_educationalQualifications-title-icon': {
    objectFit: 'contain',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    },
    img: {
      objectFit: 'contain'
    }
  },
  'summary_educationalQualifications-row': {
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
  'summary_educationalQualifications-row-logo': {
    objectFit: 'contain',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'summary_educationalQualifications-row-school-name': {
    // display: '',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'summary_educationalQualifications-row-school-rwdName': {
    display: 'none',
    [mediaTablet]: {
      display: 'block'
    }
  }
};

const useStyles = makeStyles(styles);

function HomeSummaryEducationalQualifications(props) {
  const classes = useStyles(props);

  return (
    <div {...props} className={[props.className].join(' ')}>
      <div className={classes['summary_educationalQualifications-title']}>
        <Image
          className={classes['summary_educationalQualifications-title-icon']}
          loading="lazy"
          src="/img/icon/educational-qualifications-icon.png"
          alt="學歷icon"
          width={50}
          height={50}
        />
        <p>學歷</p>
      </div>

      <div className={classes['summary_educationalQualifications-row']}>
        <Image
          className={classes['summary_educationalQualifications-row-logo']}
          loading="lazy"
          src="/img/logo/nutc-logo.png"
          alt="NUTC LOGO"
          width={40}
          height={40}
        />
        <div
          className={classes['summary_educationalQualifications-row-school']}
        >
          <AnimationString
            className={
              classes['summary_educationalQualifications-row-school-name']
            }
            label="國立台中科技大學 資訊管理系 學士"
          />
          <AnimationString
            className={
              classes['summary_educationalQualifications-row-school-rwdName']
            }
            label="國立台中科技大學"
          />
          <AnimationString
            className={
              classes['summary_educationalQualifications-row-school-rwdName']
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

      <div className={classes['summary_educationalQualifications-row']}>
        <Image
          className={classes['summary_educationalQualifications-row-logo']}
          src="/img/logo/knjc-mis-logo.png"
          alt="KNJC MIS LOGO"
          width={40}
          height={40}
        />
        <div
          className={classes['summary_educationalQualifications-row-school']}
        >
          <AnimationString
            className={
              classes['summary_educationalQualifications-row-school-name']
            }
            label="康寧醫護暨管理專科學校 資訊管理科 副學士"
          />
          <AnimationString
            className={
              classes['summary_educationalQualifications-row-school-rwdName']
            }
            label="康寧醫護暨管理專科校"
          />
          <AnimationString
            className={
              classes['summary_educationalQualifications-row-school-rwdName']
            }
            label="資訊管理科 副學士"
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

HomeSummaryEducationalQualifications.propTypes = {
  className: PropTypes.string
};

HomeSummaryEducationalQualifications.defaultProps = {
  className: ''
};

export default HomeSummaryEducationalQualifications;
