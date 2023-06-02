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
import Stack from '@mui/material/Stack';

import { wrapper } from '@/redux/index';
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

const GOOGLE_MERCHANT_ID = 'tappayTest_CTBC';

const tappayUiPayButton = {
  margin: 'auto',
  maxWidth: '100%',
  minWidth: '100%'
};

const styles = theme => ({
  tappayUi: {
    width: '100%',
    height: '100%'
  },
  tappayUiTitlLogo: {
    margin: 'auto',
    display: 'block',
    maxWidth: '300px'
  },
  tappayUiParagraph: {
    display: 'inline'
  },
  tappayUiParagraphWarning: {
    color: theme.palette.error.main
  },
  tappayUiLink: linkStyle,
  tappayUiRow: {
    margin: '10px',
    flex: 1,
    [mediaMobile]: {
      flex: 'unset'
    }
  },
  tappayUiDirectPayAmount: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [mediaMobile]: {
      marginTop: '10px'
    }
  },
  tappayUiBtnRow: {
    // marginTop: '10px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // overflow: 'hidden'
    [mediaMobile]: {
      width: '100%',
      flex: 'unset',
      display: 'unset',
      flexDirection: 'unset',
      justifyContent: 'unset',
      marginBottom: '10px'
    }
  },
  tappayUiButton: {
    ...tappayUiPayButton,
    ...buttonStyle
  },
  tappayDivButton: {
    [mediaMobile]: {
      width: '100%'
    },
    height: '40px',
    '& > div': {
      [mediaMobile]: {
        width: '100%'
      }
    },
    '& button': {
      ...tappayUiPayButton,
      display: 'block'
    }
  },
  tappayUiPayButton
});

const useStyles = makeStyles(styles);

function TappayUi() {
  const [tappay, setTapPay] = useState(null);
  const [directPayAmount, setDirectPayAmount] = useState('');
  const [directPayError, setDirectPayError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [cardNumberSuccess, setCardNumberSuccess] = useState(false);
  const [expirationDateError, setExpirationDateError] = useState(false);
  const [expirationDateSuccess, setExpirationDateSuccess] = useState(false);
  const [ccvError, setCcvError] = useState(false);
  const [ccvSuccess, setCcvSuccess] = useState(false);
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
  const isMobile = useSelector(({ system }) => system.isMobile);
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

  const informationMessage = useCallback(
    payload => {
      return dispatch({ type: 'system/message_information', payload });
    },
    [dispatch]
  );
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
          googleMerchantId: GOOGLE_MERCHANT_ID,
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
      setCardNumberError(true);
      setCardNumberSuccess(false);
    } else if (update.status.number === 0) {
      setCardNumberError(false);
      setCardNumberSuccess(true);
    } else {
      setCardNumberError(false);
      setCardNumberSuccess(false);
    }

    if (update.status.expiry === 2) {
      setExpirationDateError(true);
      setExpirationDateSuccess(false);
    } else if (update.status.expiry === 0) {
      setExpirationDateError(false);
      setExpirationDateSuccess(true);
    } else {
      setExpirationDateError(false);
      setExpirationDateSuccess(false);
    }

    if (update.status.ccv === 2) {
      setCcvError(true);
      setCcvSuccess(false);
    } else if (update.status.ccv === 0) {
      setCcvError(false);
      setCcvSuccess(true);
    } else {
      setCcvError(false);
      setCcvSuccess(false);
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
      setDirectPayError(true);
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
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          successMessage('直接付款測試成功！');
        } else {
          errorMessage('直接付款錯誤');
        }
      }
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
        merchant_id: GOOGLE_MERCHANT_ID,
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
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          successMessage('GooglePay測試成功！');
        } else {
          errorMessage('GooglePay錯誤');
        }
      }
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
        if (result.status !== 0) {
          errorMessage('ApplePay 錯誤');
          return;
        }
        POST_PayByPrime(
          {
            prime: result.prime,
            partner_key: partnerKey,
            merchant_id: 'tappayTest_CTBC',
            details: 'TapPay ApplePay Test',
            amount: Number(applePayAmount),
            cardholder: {
              phone_number: '+886923456789',
              name: '王小明',
              email: 'LittleMing@Wang.com',
              zip_code: '100',
              address: '台北市天龍區芝麻街1號1樓',
              national_id: 'A123456789'
            }
          },
          (tappayResult, error) => {
            if (error === null) {
              console.log(tappayResult);
              successMessage('ApplePay測試成功！');
            } else {
              errorMessage('ApplePay錯誤');
            }
          }
        );
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
          frontend_redirect_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/portfolio/tappay/result`,
          backend_notify_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/api/tappay/backend_notify`
        }
      },
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          console.log(tappayResult.payment_url);
          location.href = tappayResult.payment_url;
          informationMessage('即將跳轉LinePay頁面！');
        } else {
          errorMessage('LinePay錯誤');
        }
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
    POST_PayByPrime(
      {
        prime: result.prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_CTBC_Union_Pay',
        details: 'TapPay SamsungPay Test',
        amount: Number(samsungPayAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        },
        result_url: {
          frontend_redirect_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/portfolio/tappay/result`,
          backend_notify_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/api/tappay/backend_notify`
        }
      },
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          console.log(tappayResult.payment_url);
          location.href = tappayResult.payment_url;
          informationMessage('即將跳轉SamsungPay頁面！');
        } else {
          errorMessage('SamsungPay錯誤');
        }
      }
    );
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
    POST_PayByPrime(
      {
        prime: result.prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_JKOPAY',
        details: 'TapPay JkoPay Test',
        amount: Number(jkoPayAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        },
        result_url: {
          frontend_redirect_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/portfolio/tappay/result`,
          backend_notify_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/api/tappay/backend_notify`
        }
      },
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          console.log(tappayResult.payment_url);
          location.href = tappayResult.payment_url;
          informationMessage('即將跳轉街口支付頁面！');
        } else {
          errorMessage('街口支付錯誤');
        }
      }
    );
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
    const primeData = await tappayEasyWalletGetPrime();
    console.log(primeData);
    const {
      result: { prime }
    } = primeData;
    POST_PayByPrime(
      {
        prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_EASY_WALLET',
        details: 'TapPay EasyWallet Test',
        amount: Number(easyWalletAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        },
        result_url: {
          frontend_redirect_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/portfolio/tappay/result`,
          backend_notify_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/api/tappay/backend_notify`
        }
      },
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          console.log(tappayResult.payment_url);
          location.href = tappayResult.payment_url;
          informationMessage('即將跳轉悠遊付頁面！');
        } else {
          errorMessage('悠遊付錯誤');
        }
      }
    );
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
    const primeData = await tappayAtomeGetPrime();
    console.log(primeData);
    const {
      result: { prime },
      error
    } = primeData;
    if (error) {
      errorMessage('Atome錯誤');
      return;
    }
    POST_PayByPrime(
      {
        prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_ATOME',
        details: JSON.stringify([
          {
            item_id: 'TapPayAtomeTest',
            item_name: 'TapPayAtomeTest',
            item_quantity: 1,
            item_price: Number(atomeAmount)
          }
        ]),
        amount: Number(atomeAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        },
        extra_info: {
          shopper_info: {
            shipping_address: {
              country_code: 'TW',
              lines: '台北市天龍區芝麻街2號2樓',
              postcode: '200'
            },
            billing_address: {
              country_code: 'TW',
              lines: '台北市天龍區芝麻街2號2樓',
              postcode: '200'
            }
          }
        },
        result_url: {
          frontend_redirect_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/portfolio/tappay/result`,
          backend_notify_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/api/tappay/backend_notify`
        }
      },
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          console.log(tappayResult.payment_url);
          location.href = tappayResult.payment_url;
          informationMessage('即將跳轉Atome頁面！');
        } else {
          errorMessage('Atome錯誤');
        }
      }
    );
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
    const primeData = await tappayPiWalletGetPrime();
    console.log(primeData);
    const {
      result: { prime },
      error
    } = primeData;
    if (error) {
      errorMessage('Pi錢包錯誤');
      return;
    }
    POST_PayByPrime(
      {
        prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_PI_WALLET_AUTO_CAP',
        details: JSON.stringify([
          {
            item_id: 'TapPayPiWalletTest',
            item_name: 'TapPayPiWalletTest',
            item_quantity: 1,
            item_price: Number(piWalletAmount)
          }
        ]),
        amount: Number(piWalletAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        },
        result_url: {
          frontend_redirect_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/portfolio/tappay/result`,
          backend_notify_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/api/tappay/backend_notify`
        }
      },
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          console.log(tappayResult.payment_url);
          location.href = tappayResult.payment_url;
          informationMessage('即將跳轉Pi錢包頁面！');
        } else {
          errorMessage('Pi錢包錯誤');
        }
      }
    );
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
    const primeData = await tappayPlusPayGetPrime();
    console.log(primeData);
    const {
      result: { prime },
      error
    } = primeData;
    if (error) {
      errorMessage('全盈+PAY錯誤');
      return;
    }
    POST_PayByPrime(
      {
        prime,
        partner_key: partnerKey,
        merchant_id: 'tappayTest_PLUSPAY',
        details: 'TapPay PlusPay Test',
        amount: Number(plusPayAmount),
        cardholder: {
          phone_number: '+886923456789',
          name: '王小明',
          email: 'LittleMing@Wang.com',
          zip_code: '100',
          address: '台北市天龍區芝麻街1號1樓',
          national_id: 'A123456789'
        },
        result_url: {
          frontend_redirect_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/portfolio/tappay/result`,
          backend_notify_url: `${process.env.TAPPAY_FRONTEND_DOMAIN}/api/tappay/backend_notify`
        }
      },
      (tappayResult, error) => {
        if (error === null) {
          console.log(tappayResult);
          console.log(tappayResult.payment_url);
          location.href = tappayResult.payment_url;
          informationMessage('即將跳轉全盈+PAY頁面！');
        } else {
          errorMessage('全盈+PAY錯誤');
        }
      }
    );
  }

  return (
    <div className={classes.tappayUi}>
      <Head>
        <title>Parker Chan 的作品集 - Tappay Ui</title>
      </Head>
      <Box>
        <Image
          className={classes.tappayUiTitlLogo}
          src="/img/tappay/tappay-logo.svg"
          alt="tappay"
          width={300}
          height={100}
        />
      </Box>
      <Box>
        <p className={classes.tappayUiParagraph}>沒有測試卡號？試試</p>
        <a
          target="_blank"
          className={[classes.tappayUiLink, classes.tappayUiParagraph].join(
            ' '
          )}
          href="https://www.suijidaquan.com/zh-tw/credit-card-generator"
        >
          測試卡號生成器
        </a>
        <p
          className={[
            classes.tappayUiParagraphWarning,
            classes.tappayUiParagraph
          ].join(' ')}
        >
          （不建議使用真實卡號）
        </p>
      </Box>
      <Divider>DirectPay</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TappayInputField
            label="卡號"
            ref={cardNumberRef}
            error={cardNumberError}
            success={cardNumberSuccess}
          />
        </Box>
        <Box className={classes.tappayUiRow}>
          <TappayInputField
            label="卡片到期日"
            ref={expirationDateRef}
            error={expirationDateError}
            success={expirationDateSuccess}
          />
        </Box>
      </Stack>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TappayInputField
            label="卡片驗證碼"
            ref={ccvRef}
            error={ccvError}
            success={ccvSuccess}
          />
        </Box>
        <Box
          className={[
            classes.tappayUiRow,
            classes.tappayUiDirectPayAmount
          ].join(' ')}
        >
          <TextField
            type="number"
            fullWidth={true}
            label="直接付款金額"
            error={directPayError}
            value={directPayAmount}
            inputProps={{ min: 0 }}
            onChange={handleDirectPayAmount}
          />
        </Box>
      </Stack>
      <Box>
        <Button
          variant="contained"
          onClick={directPayGetPrime}
          disabled={canGetPrime === false}
          className={classes.tappayUiButton}
        >
          <p>直接付款</p>
        </Button>
      </Box>
      <Divider>GooglePay</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="GooglePay金額"
            error={googlePayError}
            value={googlePayAmount}
            inputProps={{ min: 0 }}
            onChange={handleGooglePayAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <div className={classes.tappayDivButton} id={googlePayButtonId} />
        </Box>
      </Stack>
      <Divider>ApplePay</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="ApplePay金額"
            error={applePayError}
            value={applePayAmount}
            inputProps={{ min: 0 }}
            onChange={handleApplePaySetupPayment}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <ApplePayBtn
            onClick={handleApplePayGetPrime}
            disabled={canGetApplePayPrime === false}
            className={classes.tappayUiPayButton}
          />
        </Box>
      </Stack>
      <Divider>LinePay</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="LinePay金額"
            error={linePayError}
            value={linePayAmount}
            inputProps={{ min: 0 }}
            onChange={handleLinePayAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <LinePayBtn
            onClick={handleLinePayGetPrime}
            className={classes.tappayUiPayButton}
          />
        </Box>
      </Stack>
      <Divider>SamsungPay</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="SamsungPay金額"
            error={samsungPayError}
            value={samsungPayAmount}
            inputProps={{ min: 0 }}
            onChange={handleSamsungPayAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <div
            ref={samsungPayButtonRef}
            className={classes.tappayDivButton}
            onClick={handleSamsungPayGetPrime}
          />
        </Box>
      </Stack>
      <Divider>街口支付</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="街口支付金額"
            error={jkoPayError}
            value={jkoPayAmount}
            inputProps={{ min: 0 }}
            onChange={handleJkoPayAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <JkoPayBtn
            className={classes.tappayUiPayButton}
            onClick={handleJkoPayGetPrime}
          />
        </Box>
      </Stack>
      <Divider>悠遊付</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="悠遊付金額"
            error={easyWalletError}
            value={easyWalletAmount}
            inputProps={{ min: 0 }}
            onChange={handleEeasyWalletAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <EasyWalletBtn
            className={classes.tappayUiPayButton}
            onClick={handleEeasyWalletGetPrime}
          />
        </Box>
      </Stack>
      <Divider>Atome</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="Atome金額"
            error={atomeError}
            value={atomeAmount}
            inputProps={{ min: 0 }}
            onChange={handleAtomeAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <AtomeBtn
            onClick={handleAtomeGetPrime}
            className={classes.tappayUiButton}
          />
        </Box>
      </Stack>
      <Divider>Pi錢包</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="Pi錢包金額"
            error={piWalletError}
            value={piWalletAmount}
            inputProps={{ min: 0 }}
            onChange={handlePiWalletAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <PiWalletBtn
            onClick={handlePiWalletGetPrime}
            className={classes.tappayUiPayButton}
          />
        </Box>
      </Stack>
      <Divider>全盈+PAY</Divider>
      <Stack direction={isMobile === false ? 'row' : undefined}>
        <Box className={classes.tappayUiRow}>
          <TextField
            type="number"
            fullWidth={true}
            label="全盈+PAY金額"
            error={plusPayError}
            value={plusPayAmount}
            inputProps={{ min: 0 }}
            onChange={handlePlusPayAmount}
          />
        </Box>
        <Box className={classes.tappayUiBtnRow}>
          <PlusPayBtn
            onClick={handlePlusPayGetPrime}
            className={classes.tappayUiButton}
          />
        </Box>
      </Stack>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  reduxStore =>
    function (ctx) {
      // 經過數次測試，若伺服端需要透過req等連線資訊初始化資料池，若頁面不觸發wrapper.getServerSideProps，則createWrapper內的function無法接到相關餐數
      const reduxIsMobile = reduxStore.getState()?.system?.isMobile || false;

      const userAgent = ctx?.req?.headers?.['user-agent'] || '';
      const isMobile =
        userAgent.includes('Android') || userAgent.includes('iPhone');

      if (reduxIsMobile !== isMobile) {
        reduxStore.dispatch({
          type: 'system/SAVE_is_mobile',
          payload: isMobile
        });
      }

      return { props: {} };
    }
);

export default TappayUi;
