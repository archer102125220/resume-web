import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';

import { mediaTablet, mediaMobile } from '@/styles/globals';
import { linkStyle } from '@/styles/linkStyle';

const styles = {
  prod_item: {
    marginTop: '16px',
    marginLeft: '20px'
  },
  'prod_item-info': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    [mediaTablet]: {
      alignItems: 'flex-start'
    }
  },
  'prod_item-info-logo': {
    objectFit: 'contain',
    backgroundColor: '#fff',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'prod_item-info-company-name': {
    marginLeft: 'auto',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'prod_item-info-company-rwdName': {
    display: 'none',
    [mediaTablet]: {
      display: 'block'
    }
  },
  'prod_item-info-company-isStillWorking': {
    display: 'inline-block'
  },
  'prod_item-describe': {
    marginTop: '8px',
    marginLeft: '32px',
    [mediaMobile]: {
      marginLeft: '10px'
    }
  },
  'prod_item-describe-linkList': {
    marginLeft: '16px'
  },
  'prod_item-describe-linkList-link': {
    ...linkStyle,
    marginRight: 'unset'
  },
  'prod_item-describe-linkList-link-icon': {
    marginLeft: '5px',
    [mediaTablet]: {
      width: '10px',
      height: '10px'
    }
  },
  'prod_item-sub_link_list_title': {
    marginLeft: '32px'
  },
  'prod_item-sub_link_list': {
    marginLeft: '64px'
  }
};

const useStyles = makeStyles(styles);

function ExperienceProdItem(props) {
  const classes = useStyles(props);

  return (
    <li {...props} className={[props.className].join(' ')}>
      {typeof props.webUrl === 'string' && props.webUrl !== '' ? (
        <a
          href={props.webUrl}
          target="_blank"
          rel="noreferrer noopenner"
          className={classes['prod_item-describe-linkList-link']}
        >
          {props.name}
        </a>
      ) : (
        <span>{props.name}</span>
      )}
      {typeof props.describeLink === 'string' && props.describeLink !== '' ? (
        <Link
          href={props.describeLink}
          className={classes['prod_item-describe-linkList-link']}
        >
          (前往介紹頁面)
        </Link>
      ) : (
        ''
      )}

      {typeof props.webUrlListTitle === 'string' &&
      props.webUrlListTitle !== '' ? (
        <p className={classes['prod_item-sub_link_list_title']}>
          {props.webUrlListTitle}
        </p>
      ) : (
        ''
      )}

      {Array.isArray(props.webUrlList) ? (
        <ol className={classes['prod_item-sub_link_list']}>
          {props.webUrlList.map(webUrlItem => (
            <li key={webUrlItem.webUrl}>
              {typeof webUrlItem.webUrl === 'string' &&
              webUrlItem.webUrl !== '' ? (
                <a
                  href={webUrlItem.webUrl}
                  target="_blank"
                  rel="noreferrer noopenner"
                  className={classes['prod_item-describe-linkList-link']}
                >
                  {webUrlItem.name}
                </a>
              ) : (
                <span>{webUrlItem.name}</span>
              )}
            </li>
          ))}
        </ol>
      ) : (
        ''
      )}

      {typeof props.summary === 'string' && props.summary !== '' && (
        <p>{props.summary}</p>
      )}
      {Array.isArray(props.remark) && props.remark.length > 0 && (
        <p>*{props.remark.join('，')}</p>
      )}
      {typeof props.responsible === 'string' && props.responsible !== '' && (
        <p>主要負責：{props.responsible}</p>
      )}
    </li>
  );
}

ExperienceProdItem.propTypes = {
  className: PropTypes.string,
  webUrl: PropTypes.string,
  webUrlListTitle: PropTypes.string,
  webUrlList: PropTypes.array,
  name: PropTypes.string,
  describeLink: PropTypes.string,
  summary: PropTypes.string,
  remark: PropTypes.array,
  responsible: PropTypes.string
};

ExperienceProdItem.defaultProps = {
  className: '',
  webUrl: '',
  webUrlListTitle: '',
  webUrlList: [],
  name: '',
  describeLink: '',
  remark: [],
  responsible: ''
};

export default ExperienceProdItem;
