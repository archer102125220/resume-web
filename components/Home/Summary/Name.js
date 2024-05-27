import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';

import AnimationString from '@/components/Animation/String';

const summaryNameRwdStyle = {
  marginRight: 'auto',
  display: 'none',
  [mediaTablet]: {
    display: 'inline-block'
  }
};

const styles = {
  homePage_summary_name: {
    margin: 'auto'
  },
  'homePage_summary_name-zhName': {
    margin: 'auto',
    display: 'block',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'homePage_summary_name-rwdName': {
    ...summaryNameRwdStyle,
    marginTop: '8px'
  },
  'homePage_summary_name-rwdEnName': {
    ...summaryNameRwdStyle
  },
  'homePage_summary_name-rwdEnNickName': {
    ...summaryNameRwdStyle
  }
};

const useStyles = makeStyles(styles);

function SummaryName(props) {
  const classes = useStyles(props);

  return (
    <div
      {...props}
      className={[classes.homePage_summary_name, props.className].join(' ')}
    >
      <AnimationString
        className={classes['homePage_summary_name-zhName']}
        label="陳柏杰／CHEN,PO-CHIEH／Parker"
      />
      <AnimationString
        className={classes['homePage_summary_name-rwdName']}
        label="姓名：陳柏杰"
      />
      <AnimationString
        className={classes['homePage_summary_name-rwdEnName']}
        label="英文姓名：CHEN,PO-CHIEH"
      />
      <AnimationString
        className={classes['homePage_summary_name-rwdEnNickName']}
        label="英文暱稱：Parker"
      />
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
