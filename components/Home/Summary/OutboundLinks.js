import Image from 'next/image';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';
import { linkStyle } from '@/styles/linkStyle';

import AnimationString from '@/components/Animation/String';

const outboundLinksStyle = {
  ...linkStyle,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  [mediaTablet]: {
    marginLeft: 'unset'
  }
};
const outboundLinksRwdStyle = {
  display: 'none',
  [mediaTablet]: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const iconStyle = {
  objectFit: 'contain',
  [mediaTablet]: {
    width: '25px',
    height: '25px'
  },
  img: {
    objectFit: 'contain'
  }
};

const styles = {
  homePage_summary_outbound_links: {
    margin: 'auto',
    [mediaTablet]: {
      marginLeft: 'unset'
    }
  },
  'homePage_summary_outbound_links-email': {
    ...outboundLinksStyle,
    marginTop: '8px',
    marginBottom: '8px'
  },
  'homePage_summary_outbound_links-email-icon': {
    ...iconStyle
  },
  'homePage_summary_outbound_links-email-label': {
    display: 'block',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'homePage_summary_outbound_links-email-rwd': {
    ...outboundLinksRwdStyle
  },
  'homePage_summary_outbound_links-gitHub': {
    ...outboundLinksStyle,
    marginBottom: '16px'
  },
  'homePage_summary_outbound_links-gitHub-cion': {
    ...iconStyle
  },
  'homePage_summary_outbound_links-gitHub-label': {
    display: 'block',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'homePage_summary_outbound_links-gitHub-rwd': {
    ...outboundLinksRwdStyle
  }
};

const useStyles = makeStyles(styles);

function SummaryName(props) {
  const classes = useStyles(props);

  return (
    <div
      {...props}
      className={[
        classes.homePage_summary_outbound_links,
        props.className
      ].join(' ')}
    >
      <div className={classes['homePage_summary_outbound_links-email']}>
        <Image
          className={classes['homePage_summary_outbound_links-email-icon']}
          loading="lazy"
          src="/img/icon/email-icon.png"
          alt="email icon"
          width={40}
          height={40}
        />
        <AnimationString
          tagName="a"
          color={linkStyle.color}
          label="archer102125220.2015@gmail.com"
          href="mailto: archer102125220.2015@gmail.com"
          className={classes['homePage_summary_outbound_links-email-label']}
        />
        <div className={classes['homePage_summary_outbound_links-email-rwd']}>
          <AnimationString
            tagName="a"
            color={linkStyle.color}
            label="archer102125220.2015"
            href="mailto: archer102125220.2015@gmail.com"
          />
          <AnimationString
            tagName="a"
            color={linkStyle.color}
            label="@gmail.com"
            href="mailto: archer102125220.2015@gmail.com"
          />
        </div>
      </div>
      <div className={classes['homePage_summary_outbound_links-gitHub']}>
        <Image
          className={classes['homePage_summary_outbound_links-gitHub-cion']}
          loading="lazy"
          src="/img/icon/github-icon.png"
          alt="email icon"
          width={40}
          height={40}
        />
        <AnimationString
          tagName="a"
          color={linkStyle.color}
          label="https://github.com/archer102125220"
          href="https://github.com/archer102125220"
          className={classes['homePage_summary_outbound_links-gitHub-label']}
        />
        <div className={classes['homePage_summary_outbound_links-gitHub-rwd']}>
          <AnimationString
            tagName="a"
            color={linkStyle.color}
            label="https://github.com/"
            href="https://github.com/archer102125220"
          />
          <AnimationString
            tagName="a"
            color={linkStyle.color}
            label="archer102125220"
            href="https://github.com/archer102125220"
          />
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
