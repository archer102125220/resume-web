import { useState, useEffect, useRef, useId, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import { tappayAsyncThunk } from '@/redux/tappay';
import useGTMTrack from '@/hooks/useGTMTrack';
import {
  importTappay,
  tappayDirectPayInit,
  tappayDirectPayGetPrime,
  importGooglePay,
  tappayGooglePaySetupPrice,
  tappayGooglePayButtonInit,
  tappayApplePayInit,
  tappayApplePaySetupPayment,
  tappayLinePayGetPrime,
  tappaySamsungPayInit,
  tappaySamsungPayButtonInit,
  tappaySamsungPaySetupPayment,
  tappaySamsungPayGetPrime,
  tappayJkoPayGetPrime,
  tappayEasyWalletGetPrime,
  tappayAtomeGetPrime,
  tappayPiWalletGetPrime,
  tappayPlusPayGetPrime
} from '@/utils/tappay';
import { buttonStyle } from '@/styles/buttonStyle';
import { linkStyle } from '@/styles/linkStyle';
import { mediaMobile } from '@/styles/globals';
import TappayInputField from '@/components/Tappay/InputField';
import ApplePayBtn from '@/components/Tappay/ApplePayBtn';
import LinePayBtn from '@/components/Tappay/LinePayBtn';
import JkoPayBtn from '@/components/Tappay/JkoPayBtn';
import EasyWalletBtn from '@/components/Tappay/EasyWalletBtn';
import AtomeBtn from '@/components/Tappay/AtomeBtn';
import PiWalletBtn from '@/components/Tappay/PiWalletBtn';
import PlusPayBtn from '@/components/Tappay/PlusPayBtn';

const tappayIframePayButton = {
  margin: 'auto',
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
  tappayIframeParagraph: {
    display: 'inline'
  },
  tappayIframeParagraphWarning: {
    color: theme.palette.error.main
  },
  tappayIframeLink: linkStyle,
  tappayIframeRow: {
    margin: '10px'
    // overflow: 'hidden'
  },
  tappayIframeBtnRow: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px'
    // overflow: 'hidden'
  },
  tappayIframeButton: {
    ...tappayIframePayButton,
    ...buttonStyle
  },
  tappayIframeInputSuccess: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main
  },
  tappayIframeInputError: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  },
  tappayDivButton: {
    width: '100%',
    height: '40px',
    '& > div': {
      width: '100%'
    },
    '& button': {
      ...tappayIframePayButton,
      display: 'block'
    }
  },
  tappayIframePayButton
});

const useStyles = makeStyles(styles);

function TappayIframe() {
  const [tappay, setTapPay] = useState(null);
  const [directPayAmount, setDirectPayAmount] = useState('');
  const [directPayError, setDirectPayError] = useState(false);
  const [cardNumberStatus, setCardNumberStatus] = useState('');
  const [expirationDateStatus, setExpirationDateStatus] = useState('');
  const [ccvStatus, setCcvStatus] = useState('');
  const [canGetPrime, setCanGetPrime] = useState(false);
  const [canUseGooglePay, setCanUseGooglePay] = useState(false);
  const [googlePayAmount, setGooglePayAmount] = useState('');
  const [googlePayError, setGooglePayError] = useState(false);
  const [applePay, setApplePay] = useState(null);
  const [applePayAmount, setApplePayAmount] = useState('');
  const [canGetApplePayPrime, setCanGetApplePayPrime] = useState(false);
  const [applePayError, setApplePayError] = useState(false);
  const [linePayAmount, setLinePayAmount] = useState('');
  const [linePayError, setLinePayError] = useState(false);
  const [samsungPayAmount, setSamsungPayAmount] = useState('');
  const [samsungPayError, setSamsungPayError] = useState(false);
  const [jkoPayAmount, setJkoPayAmount] = useState('');
  const [jkoPayError, setJkoPayError] = useState(false);
  const [easyWalletAmount, setEasyWalletAmount] = useState('');
  const [easyWalletError, setEasyWalletError] = useState(false);
  const [atomeAmount, setAtomeAmount] = useState('');
  const [atomeError, setAtomeError] = useState(false);
  const [piWalletAmount, setPiWalletAmount] = useState('');
  const [piWalletError, setPiWalletError] = useState(false);
  const [plusPayAmount, setPlusPayAmount] = useState('');
  const [plusPayError, setPlusPayError] = useState(false);
  // const [cardNumber, setCardNumber] = useState('6224314183841750');
  // const [expirationDate, setExpirationDate] = useState('10/27');
  // const [ccv, setCcv] = useState('048');

  const cardNumberRef = useRef(null);
  const expirationDateRef = useRef(null);
  const ccvRef = useRef(null);
  const googlePayButtonId = useId();
  const samsungPayButtonRef = useRef(null);
  const appId = useSelector(({ tappay }) => tappay.appId || -1);
  const appKey = useSelector(({ tappay }) => tappay.appKey || '');
  const prod = useSelector(({ tappay }) => tappay.prod || false);
  const partnerKey = useSelector(({ tappay }) => tappay.partnerKey || '');
  const theme = useTheme();
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    createdTapPay();
  }, []);
  useEffect(() => {
    if (tappay !== null) {
      tappayInit();
    }
  }, [tappay]);
  useEffect(() => {
    if (canUseGooglePay === true) {
      document.querySelector(`[id="${googlePayButtonId}"]`).innerHTML = '';
      tappayGooglePayButtonInit(
        {
          el: `[id="${googlePayButtonId}"]`,
          color: 'white',
          type: 'long'
        },
        handleGooglePayGetPrime
      );
    }
  }, [canUseGooglePay, googlePayAmount]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay/tappay-ui' });

  const successMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_success', payload });
    },
    [dispatch]
  );
  const errorMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_error', payload });
    },
    [dispatch]
  );
  const warningMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_warning', payload });
    },
    [dispatch]
  );
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );
  const POST_PayByPrime = useCallback(
    (payload, callback) => {
      return dispatch(
        tappayAsyncThunk.POST_PayByPrime({
          payload,
          loading: boloean => SAVE_loading(boloean),
          callback
        })
      );
    },
    [dispatch]
  );
  // const POST_Refund = useCallback(() => {
  //   return dispatch(
  //     tappayAsyncThunk.POST_Refund({
  //       loading: boloean => SAVE_loading(boloean)
  //     })
  //   );
  // }, [dispatch]);

  async function createdTapPay() {
    try {
      const _tappay = await importTappay(appId, appKey, prod);
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
      setCanUseGooglePay(result.canUseGooglePay);
      const { success, tappayPaymentRequestApi } = await tappayApplePayInit(
        {
          // Apple Developer 註冊的 Merchant Id
          merchantIdentifier: 'merchant.tech.cherri',
          countryCode: 'TW'
        },
        {
          supportedNetworks: ['AMEX', 'JCB', 'MASTERCARD', 'VISA'],
          supportedMethods: ['apple_pay'],
          total: {
            label: '付給 TapPay',
            amount: {
              currency: 'TWD',
              value: '1.00'
            }
          }
        }
      );
      setCanGetApplePayPrime(success);
      setApplePay(tappayPaymentRequestApi);
      tappaySamsungPayInit({ country_code: 'tw' });
      tappaySamsungPayButtonInit(samsungPayButtonRef.current, {
        // black, white
        color: 'white',
        // pay, buy
        type: 'pay',
        // rectangular, pill
        shape: 'rectangular'
      });
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

  function handleDirectPayAmount(e) {
    setDirectPayAmount(e.target.value);
    setDirectPayError(false);
  }

  async function directPayGetPrime() {
    const _directPayAmount = Number(directPayAmount);
    if (_directPayAmount <= 0) {
      setDirectPayAmount(true);
      warningMessage('請輸入直接付款金額');
      return;
    }
    const primeData = await tappayDirectPayGetPrime();
    console.log(primeData);
    const {
      result: {
        card: { prime }
      }
    } = primeData;
    POST_PayByPrime(
      {
        prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_CTBC_Union_Pay',
        details: 'TapPay DirectPay Test',
        amount: _directPayAmount,
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        }
      },
      () => successMessage('直接付款測試成功！')
    );
  }

  function handleGooglePayAmount(e) {
    setGooglePayError(false);
    setGooglePayAmount(e.target.value);
    tappayGooglePaySetupPrice({
      price: e.target.value,
      currency: 'TWD'
    });
  }

  function handleGooglePayGetPrime(err, prime, result) {
    console.log({ googlePayAmount, err, prime, result });
    if (err?.status === 2200) {
      setGooglePayError(true);
      warningMessage('請輸入GooglePay金額');
      return;
    }
    POST_PayByPrime(
      {
        prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_CTBC_Union_Pay',
        details: 'TapPay GooglePay Test',
        amount: Number(googlePayAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        }
      },
      () => successMessage('GooglePay測試成功！')
    );
  }

  async function handleApplePaySetupPayment(e) {
    setApplePayAmount(e.target.value);
    setApplePayError(false);
    await tappayApplePaySetupPayment({
      displayItems: [
        {
          label: 'iPhone8',
          amount: {
            currency: 'TWD',
            value: e.target.value
          }
        }
      ],
      total: {
        label: 'Apple pay 測試',
        amount: {
          currency: 'TWD',
          value: e.target.value
        }
      }
    });
  }

  function handleApplePayGetPrime() {
    if (Number(applePayAmount) <= 0) {
      setApplePayError(true);
      warningMessage('請輸入ApplePay金額');
      return;
    }
    try {
      applePay.getPrime(result => {
        console.log(result);
        // POST_PayByPrime(
        //   {
        //     prime,
        //     partner_key: partnerKey,
        //     merchant_id: 'tappayTest_CTBC_Union_Pay',
        //     details: 'TapPay ApplePay Test',
        //     amount: Number(applePayAmount),
        //     cardholder: {
        //       phone_number: '+886923456789',
        //       name: '王小明',
        //       email: 'LittleMing@Wang.com',
        //       zip_code: '100',
        //       address: '台北市天龍區芝麻街1號1樓',
        //       national_id: 'A123456789'
        //     }
        //   },
        //   () => successMessage('ApplePay測試成功！')
        // );
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleLinePayAmount(e) {
    setLinePayAmount(e.target.value);
    setLinePayError(false);
  }

  async function handleLinePayGetPrime() {
    if (Number(linePayAmount) <= 0) {
      setLinePayError(true);
      warningMessage('請輸入LinePay金額');
      return;
    }
    const result = await tappayLinePayGetPrime();
    console.log(result);
    if (result.err) {
      errorMessage('LinePay 錯誤');
      return;
    }
    POST_PayByPrime(
      {
        prime: result.prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_LINEPAY',
        details: 'TapPay LinePay Test',
        amount: Number(linePayAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        },
        result_url: {
          frontend_redirect_url: `${process.env.TAPPAY_DOMAIN}/tappay`,
          backend_notify_url: `${process.env.TAPPAY_DOMAIN}/tappay/backend_notify`
        }
      },
      tappayResult => {
        console.log(tappayResult);
        console.log(tappayResult.payment_url);
        location.href = tappayResult.payment_url;
        successMessage('LinePay測試成功！');
      }
    );
  }

  function handleSamsungPayAmount(e) {
    setSamsungPayAmount(e.target.value);
    setSamsungPayError(false);
  }

  async function handleSamsungPayGetPrime() {
    if (Number(samsungPayAmount) <= 0) {
      setSamsungPayError(true);
      warningMessage('請輸入SamsungPay金額');
      return;
    }
    tappaySamsungPaySetupPayment({
      total: {
        label: 'SamsungPay 測試',
        amount: {
          currency: 'TWD',
          value: samsungPayAmount
        }
      }
    });
    const result = await tappaySamsungPayGetPrime();
    console.log(result);
  }

  function handleJkoPayAmount(e) {
    setJkoPayAmount(e.target.value);
    setJkoPayError(false);
  }

  async function handleJkoPayGetPrime() {
    if (Number(jkoPayAmount) <= 0) {
      setJkoPayError(true);
      warningMessage('請輸入街口支付金額');
      return;
    }
    const result = await tappayJkoPayGetPrime();
    console.log(result);
  }

  function handleEeasyWalletAmount(e) {
    setEasyWalletAmount(e.target.value);
    setEasyWalletError(false);
  }

  async function handleEeasyWalletGetPrime() {
    if (Number(easyWalletAmount) <= 0) {
      setEasyWalletError(true);
      warningMessage('請輸入悠遊付金額');
      return;
    }
    const result = await tappayEasyWalletGetPrime();
    console.log(result);
  }

  function handleAtomeAmount(e) {
    setAtomeAmount(e.target.value);
    setAtomeError(false);
  }

  async function handleAtomeGetPrime() {
    if (Number(atomeAmount) <= 0) {
      setAtomeError(true);
      warningMessage('請輸入悠遊付金額');
      return;
    }
    const result = await tappayAtomeGetPrime();
    console.log(result);
  }

  function handlePiWalletAmount(e) {
    setPiWalletAmount(e.target.value);
    setPiWalletError(false);
  }

  async function handlePiWalletGetPrime() {
    if (Number(piWalletAmount) <= 0) {
      setPiWalletError(true);
      warningMessage('請輸入Pi錢包金額');
      return;
    }
    const result = await tappayPiWalletGetPrime();
    console.log(result);
  }

  function handlePlusPayAmount(e) {
    setPlusPayAmount(e.target.value);
    setPlusPayError(false);
  }

  async function handlePlusPayGetPrime() {
    if (Number(plusPayAmount) <= 0) {
      setPlusPayError(true);
      warningMessage('請輸入全盈+PAY金額');
      return;
    }
    const result = await tappayPlusPayGetPrime();
    console.log(result);
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
      <Box>
        <p className={classes.tappayIframeParagraph}>沒有測試卡號？試試</p>
        <a
          target="_blank"
          className={[
            classes.tappayIframeLink,
            classes.tappayIframeParagraph
          ].join(' ')}
          href="https://www.suijidaquan.com/zh-tw/credit-card-generator"
        >
          測試卡號生成器
        </a>
        <p
          className={[
            classes.tappayIframeParagraphWarning,
            classes.tappayIframeParagraph
          ].join(' ')}
        >
          （不建議使用真實卡號）
        </p>
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
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="直接付款金額"
          value={directPayAmount}
          error={directPayError}
          onChange={handleDirectPayAmount}
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
          error={googlePayError}
          onChange={handleGooglePayAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <div className={classes.tappayDivButton} id={googlePayButtonId} />
      </Box>
      <Divider>ApplePay</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="ApplePay金額"
          value={applePayAmount}
          error={applePayError}
          onChange={handleApplePaySetupPayment}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <ApplePayBtn
          onClick={handleApplePayGetPrime}
          disabled={canGetApplePayPrime === false}
          className={classes.tappayIframePayButton}
        />
      </Box>
      <Divider>LinePay</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="LinePay金額"
          value={linePayAmount}
          error={linePayError}
          onChange={handleLinePayAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <LinePayBtn
          onClick={handleLinePayGetPrime}
          className={classes.tappayIframePayButton}
        />
      </Box>
      <Divider>SamsungPay</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="SamsungPay金額"
          value={samsungPayAmount}
          error={samsungPayError}
          onChange={handleSamsungPayAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <div
          ref={samsungPayButtonRef}
          className={classes.tappayDivButton}
          onClick={handleSamsungPayGetPrime}
        />
      </Box>
      <Divider>街口支付</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="街口支付金額"
          value={jkoPayAmount}
          error={jkoPayError}
          onChange={handleJkoPayAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <JkoPayBtn
          className={classes.tappayIframePayButton}
          onClick={handleJkoPayGetPrime}
        />
      </Box>
      <Divider>悠遊付</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="悠遊付金額"
          value={easyWalletAmount}
          error={easyWalletError}
          onChange={handleEeasyWalletAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <EasyWalletBtn
          className={classes.tappayIframePayButton}
          onClick={handleEeasyWalletGetPrime}
        />
      </Box>
      <Divider>Atome</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="Atome金額"
          value={atomeAmount}
          error={atomeError}
          onChange={handleAtomeAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <AtomeBtn
          onClick={handleAtomeGetPrime}
          className={classes.tappayIframeButton}
        />
      </Box>
      <Divider>Pi錢包</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="Pi錢包金額"
          value={piWalletAmount}
          error={piWalletError}
          onChange={handlePiWalletAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <PiWalletBtn
          onClick={handlePiWalletGetPrime}
          className={classes.tappayIframePayButton}
        />
      </Box>
      <Divider>全盈+PAY</Divider>
      <Box className={classes.tappayIframeRow}>
        <TextField
          fullWidth={true}
          label="全盈+PAY金額"
          value={plusPayAmount}
          error={plusPayError}
          onChange={handlePlusPayAmount}
        />
      </Box>
      <Box className={classes.tappayIframeBtnRow}>
        <PlusPayBtn
          onClick={handlePlusPayGetPrime}
          className={classes.tappayIframeButton}
        />
      </Box>
    </div>
  );
}

export default TappayIframe;
