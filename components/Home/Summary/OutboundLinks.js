import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { mediaTablet } from '@/styles/globals';
import { linkStyle } from '@/styles/linkStyle';

import Image from '@/components/Image';
import AnimationString from '@/components/Animation/String';

const outboundLinksStyle = {
  ...linkStyle,
  margin: 'auto',
  marginLeft: 'unset',
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
  outbound_links: {
    margin: 'auto',
    [mediaTablet]: {
      marginLeft: 'unset'
    }
  },
  'outbound_links-email': {
    ...outboundLinksStyle,
    marginTop: '8px',
    marginBottom: '8px'
  },
  'outbound_links-email-icon': {
    ...iconStyle
  },
  'outbound_links-email-label': {
    display: 'block',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'outbound_links-email-rwd': {
    ...outboundLinksRwdStyle
  },
  'outbound_links-gitHub': {
    ...outboundLinksStyle,
    marginBottom: '16px'
  },
  'outbound_links-gitHub-cion': {
    ...iconStyle
  },
  'outbound_links-gitHub-link': {
    ...linkStyle,
    margin: 'unset'
  },

  'outbound_links-gitHub-rwd': {
    ...outboundLinksRwdStyle
  }
};

const useStyles = makeStyles(styles);

function HomeSummaryOutboundLinks(props) {
  const classes = useStyles(props);
  const { className = '' } = props;

  return (
    <div {...props} className={[classes.outbound_links, className].join(' ')}>
      <div className={classes['outbound_links-email']}>
        <Image
          className={classes['outbound_links-email-icon']}
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
          className={classes['outbound_links-email-label']}
        />
        <div className={classes['outbound_links-email-rwd']}>
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
      <div className={classes['outbound_links-gitHub']}>
        <Image
          className={classes['outbound_links-gitHub-cion']}
          loading="lazy"
          src="/img/icon/github-icon.png"
          alt="email icon"
          width={40}
          height={40}
        />
        <AnimationString
          className={classes['outbound_links-gitHub-link']}
          tagName="a"
          color={linkStyle.color}
          label="archer102125220"
          target="_blank"
          rel="noreferrer noopenner"
          href="https://github.com/archer102125220"
        />
      </div>
    </div>
  );
}

HomeSummaryOutboundLinks.propTypes = {
  className: PropTypes.string
};

// HomeSummaryOutboundLinks.defaultProps = {
//   className: ''
// };

export default HomeSummaryOutboundLinks;
