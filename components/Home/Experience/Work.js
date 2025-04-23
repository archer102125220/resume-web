import { isValidElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { mediaTablet, mediaMobile } from '@/styles/globals';
import { linkStyle } from '@/styles/linkStyle';

import { GET_homeExperience } from '@servicesClient/home';

import Image from '@/components/Image';
import AnimationString from '@/components/Animation/String';
import AnimationNumber from '@/components/Animation/Number';
import ExperienceProdItem from '@/components/Home/Experience/ProdItem';

const styles = {
  'work-title': {
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    marginRight: 'auto'
  },
  'work-title-icon': {
    objectFit: 'contain',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'work-row': {
    marginTop: '16px',
    marginLeft: '20px'
  },
  'work-row-info': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
    [mediaTablet]: {
      alignItems: 'flex-start'
    }
  },
  'work-row-info-logo': {
    objectFit: 'contain',
    backgroundColor: '#fff',
    [mediaTablet]: {
      width: '25px',
      height: '25px'
    }
  },
  'work-row-info-company-name': {
    marginLeft: 'auto',
    [mediaTablet]: {
      display: 'none'
    }
  },
  'work-row-info-company-rwdName': {
    display: 'none',
    [mediaTablet]: {
      display: 'block'
    }
  },
  'work-row-info-company-isStillWorking': {
    display: 'inline-block'
  },
  'work-row-describe': {
    marginTop: '8px',
    marginLeft: '32px',
    [mediaMobile]: {
      marginLeft: '10px'
    }
  },
  'work-row-describe-linkList': {
    marginLeft: '16px'
  },
  'work-row-describe-linkList-link': {
    ...linkStyle,
    marginRight: 'unset'
  },
  'work-row-describe-linkList-link-icon': {
    marginLeft: '5px',
    [mediaTablet]: {
      width: '10px',
      height: '10px'
    }
  }
};

const useStyles = makeStyles(styles);

function HomeExperienceWork(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const systemLoading = useSelector(state => state.system.loading);
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    const fetchExperienceData = async () => {
      dispatch({ type: 'system/SAVE_loading', payload: true });

      try {
        const response = await GET_homeExperience();

        setExperienceData(response);
      } catch (err) {
        console.error(err);
      }

      dispatch({ type: 'system/SAVE_loading', payload: false });
    };

    fetchExperienceData();
  }, [dispatch]);

  useEffect(() => {
    console.log({ experienceData });
    if (experienceData.length > 0) {
      dispatch({ type: 'system/SAVE_loading', payload: false });
    }
  }, [experienceData, dispatch]);

  useEffect(() => {
    console.log({ systemLoading });
  }, [systemLoading]);

  return (
    <div {...props} className={[props.className].join(' ')}>
      <div className={classes['work-title']}>
        <Image
          className={classes['work-title-icon']}
          loading="lazy"
          src="/img/icon/working-icon.png"
          alt="工作icon"
          width={50}
          height={50}
        />
        <p>工作經歷</p>
      </div>

      {experienceData.map(experienceData => {
        const Describe = experienceData.Describe;
        const describe = experienceData.describe;
        const prodList = experienceData.prodList || [];
        const remark = experienceData.remark || [];

        return (
          <div key={experienceData.companyName} className={classes['work-row']}>
            <div className={classes['work-row-info']}>
              <Image
                className={classes['work-row-info-logo']}
                loading={experienceData.logoLoading}
                src={experienceData.logoSrc}
                alt={experienceData.logoAlt}
                width={experienceData.logoWidth}
                height={experienceData.logoHeight}
              />
              <div className={classes['work-row-info-company']}>
                <AnimationString
                  className={classes['work-row-info-company-name']}
                  label={experienceData.companyName}
                />
                {experienceData.companyRwdName.map(companyRwdName => (
                  <AnimationString
                    key={companyRwdName}
                    className={classes['work-row-info-company-rwdName']}
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
                  {experienceData.isStillWorking === true ? (
                    <AnimationString
                      className={
                        classes['work-row-info-company-isStillWorking']
                      }
                      label="至今"
                    />
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
            {isValidElement(Describe) === true ? (
              <Describe />
            ) : typeof Describe === 'function' ? (
              Describe(classes['work-row-describe'])
            ) : (
              <div className={classes['work-row-describe']}>
                <p>* {remark.join('、')}</p>

                <p>{describe}</p>

                <ul className={classes['work-row-describe-linkList']}>
                  {prodList.map(prod => (
                    <ExperienceProdItem key={prod.name} {...prod} />
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

HomeExperienceWork.propTypes = {
  className: PropTypes.string
};

HomeExperienceWork.defaultProps = {
  className: ''
};

export default HomeExperienceWork;
