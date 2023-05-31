import { useState, useEffect, useRef, useId } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import useGTMTrack from '@/hooks/useGTMTrack';
import {
  importTappay,
  tappayDirectPayInit,
  tappayDirectPayGetPrime,
  importGooglePay,
  tappayGooglePaySetupPrice,
  tappayGooglePayButtonInit
} from '@/utils/tappay';
import { buttonStyle } from '@/styles/buttonStyle';
import { mediaMobile } from '@/styles/globals';
import TappayInputField from '@/components/Tappay/InputField';
import ApplePayBtn from '@/components/Tappay/ApplePayBtn';

const tappayIframePayButton = {
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  [mediaMobile]: {
    minWidth: '100%'
  }
};

const styles = theme => ({
  tappayIframe: {
    width: '100%',
    height: '100%'
  },
  tappayIframeTitlLogo: {
    margin: 'auto',
    display: 'block',
    maxWidth: '300px'
  },
  tappayIframeRow: {
    margin: '10px'
    // overflow: 'hidden'
  },
  tappayIframeBtnRow: {
    marginTop: '10px',
    marginBottom: '10px'
    // overflow: 'hidden'
  },
  tappayIframeButton: {
    ...buttonStyle,
    margin: 'auto'
  },
  tappayIframeInputSuccess: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main
  },
  tappayIframeInputError: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  },
  tappayGooglePayButton: {
    width: '100%',
    '& > div': {
      width: '100%'
    },
    '& button': tappayIframePayButton
  },
  tappayIframePayButton
});

const useStyles = makeStyles(styles);

function TappayIframe() {
  const [tappay, setTapPay] = useState(null);
  const [cardNumberStatus, setCardNumberStatus] = useState('');
  const [expirationDateStatus, setExpirationDateStatus] = useState('');
  const [ccvStatus, setCcvStatus] = useState('');
  const [canGetPrime, setCanGetPrime] = useState(false);
  const [googlePayAmount, setGooglePayAmount] = useState('');
  const [applePayAmount, setApplePayAmount] = useState('');
  // const [cardNumber, setCardNumber] = useState('6224314183841750');
  // const [expirationDate, setExpirationDate] = useState('10/27');
  // const [ccv, setCcv] = useState('048');

  const cardNumberRef = useRef(null);
  const expirationDateRef = useRef(null);
  const ccvRef = useRef(null);
  const googlePayButtonId = useId();
  const theme = useTheme();

  const classes = useStyles();

  useEffect(() => {
    createdTapPay();
  }, []);
  useEffect(() => {
    if (tappay !== null) {
      tappayInit();
    }
  }, [tappay]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay/tappay-iframe' });

  async function createdTapPay() {
    try {
      const _tappay = await importTappay(
        process.env.TAPPAY_APP_ID,
        process.env.TAPPAY_APP_KEY,
        process.env.TAPPAY_PROD
      );
      setTapPay(_tappay);
    } catch (error) {
      console.log(error);
    }
  }

  async function tappayInit() {
    try {
      tappayDirectPayInit(
        {
          fields: {
            number: {
              element: cardNumberRef.current,
              placeholder: '**** **** **** ****'
            },
            expirationDate: {
              element: expirationDateRef.current,
              placeholder: 'MM / YY'
            },
            ccv: {
              element: ccvRef.current,
              placeholder: '驗證碼'
            }
          },
          styles: {
            '.valid': {
              color: theme.palette.success.main
            },
            '.invalid': {
              color: theme.palette.error.main
            }
          },
          isMaskCreditCardNumber: true,
          maskCreditCardNumberRange: {
            beginIndex: 6,
            endIndex: 11
          }
        },
        tappayUpdate
      );
      const { result } = await importGooglePay(
        {
          googleMerchantId: 'tappayTest_CTBC_Union_Pay',
          allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          merchantName: process.env.TAPPAY_MERCHANT_NAME,

          allowPrepaidCards: true,
          allowedCountryCodes: ['TW'],
          billingAddressFormat: 'MIN', // FULL, MIN

          emailRequired: true, // optional
          shippingAddressRequired: true, // optional,
          billingAddressRequired: true, // optional

          phoneNumberRequired: true // optional
        },
        {
          allowedNetworks: ['AMEX', 'JCB', 'MASTERCARD', 'VISA']
        }
      );
      if (result.canUseGooglePay === true) {
        tappayGooglePayButtonInit(
          {
            el: `[id="${googlePayButtonId}"]`,
            color: 'white',
            type: 'long'
          },
          googlePayGetPrime
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  function tappayUpdate(update) {
    if (update.status.number === 2) {
      setCardNumberStatus(classes.tappayIframeInputError);
    } else if (update.status.number === 0) {
      setCardNumberStatus(classes.tappayIframeInputSuccess);
    } else {
      setCardNumberStatus('');
    }

    if (update.status.expiry === 2) {
      setExpirationDateStatus(classes.tappayIframeInputError);
    } else if (update.status.expiry === 0) {
      setExpirationDateStatus(classes.tappayIframeInputSuccess);
    } else {
      setExpirationDateStatus('');
    }

    if (update.status.ccv === 2) {
      setCcvStatus(classes.tappayIframeInputError);
    } else if (update.status.ccv === 0) {
      setCcvStatus(classes.tappayIframeInputSuccess);
    } else {
      setCcvStatus('');
    }

    setCanGetPrime(update.canGetPrime);
    console.log(update);
  }

  async function directPayGetPrime() {
    const tappayStatus = tappay.card.getTappayFieldsStatus();
    const prime = await tappayDirectPayGetPrime();
    console.log({ prime, tappayStatus });
  }

  function handleGooglePayAmount(e) {
    setGooglePayAmount(e.target.value);
    tappayGooglePaySetupPrice({
      price: e.target.value,
      currency: 'TWD'
    });
  }

  function googlePayGetPrime(err, prime) {
    console.log(prime);
  }

  return (
    <div className={classes.tappayIframe}>
      <Head>
        <title>Parker Chan 的作品集 - Tappay Ui</title>
      </Head>
      <Box>
        <Image
          className={classes.tappayIframeTitlLogo}
          src="/img/tappay/tappay-logo.svg"
          alt="tappay"
          width={300}
          height={100}
        />
      </Box>
      <Divider>DirectPay</Divider>
      <Box className={classes.tappayIframeRow}>
        <TappayInputField
          label="卡號"
          ref={cardNumberRef}
          inputStatusClassName={cardNumberStatus}
        />
      </Box>
      <Box className={classes.tappayIframeRow}>
        <TappayInputField
          label="卡片到期日"
          ref={expirationDateRef}
          inputStatusClassName={expirationDateStatus}
        />
      </Box>
      <Box className={classes.tappayIframeRow}>
        <TappayInputField
          label="卡片驗證碼"
          ref={ccvRef}
          inputStatusClassName={ccvStatus}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={directPayGetPrime}
          disabled={canGetPrime === false}
          className={classes.tappayIframeButton}
        >
          <p>直接付款</p>
        </Button>
      </Box>
      <Divider>GooglePay</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="GooglePay金額"
          value={googlePayAmount}
          onChange={handleGooglePayAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <div className={classes.tappayGooglePayButton} id={googlePayButtonId} />
      </Box>
      <Divider>ApplePay</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="ApplePay金額"
          value={applePayAmount}
          onChange={e => setApplePayAmount(e.target.value)}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <ApplePayBtn className={classes.tappayIframePayButton} />
      </Box>
    </div>
  );
}

export default TappayIframe;
