export function importTappay(APP_ID, APP_KEY, isPord = false) {
  if (
    (typeof APP_ID !== 'number' && typeof APP_ID !== 'string') ||
    APP_ID === ''
  ) {
    throw new Error('APP_ID is invalid');
  } else if (typeof APP_KEY !== 'string' || APP_KEY === '') {
    throw new Error('APP_KEY is invalid');
  } else if (typeof isPord !== 'boolean') {
    throw new Error('isPord is invalid');
  }

  if (document.querySelector('#tappay-script') === null) {
    const tappayScript = document.createElement('script');
    tappayScript.src = 'https://js.tappaysdk.com/tpdirect/v5.13.1';
    tappayScript.id = 'tappay-script';
    document.head.appendChild(tappayScript);
  }

  return new Promise(resolve => {
    setTimeout(async () => {
      resolve(await tappayInit(APP_ID, APP_KEY, isPord));
    }, 20);
  });
}

export function tappayInit(APP_ID, APP_KEY, isPord = false) {
  if (document.querySelector('iframe[src*="tappaysdk.com"]') !== null) {
    console.log('Tappay has been initialized!');
  }
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};

    if (typeof TPDirect?.setupSDK === 'function') {
      TPDirect.setupSDK(
        APP_ID,
        APP_KEY,
        isPord === false ? 'sandbox' : 'production'
      );
      resolve(TPDirect);
    } else {
      setTimeout(async () => {
        resolve(await tappayInit(APP_ID, APP_KEY, isPord));
      }, 20);
    }
  });
}

export function tappayDirectPayInit(config, onUpdate) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.setup !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  TPDirect.card.setup(config);
  TPDirect.card.onUpdate(onUpdate);
  return TPDirect.card;
}

export function tappayValidateCardNumber(cardNumber, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.cardNumber !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.cardNumber(cardNumber, ...arg);
}

export function tappayValidateCardType(cardNumber, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.cardType !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.cardType(cardNumber, ...arg);
}

export function tappayValidateCCV(ccv, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.ccv !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.ccv(ccv, ...arg);
}

export function tappayValidateExpiry(expiry, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.expiry !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.expiry(expiry, ...arg);
}

export function tappayDirectPayGetPrime() {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.card?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.card.getPrime(result => {
      resolve({ result, tappayStatus: TPDirect.card.getTappayFieldsStatus() });
    });
  });
}

export function importGooglePay(googlePaySetting, paymentRequest) {
  if (googlePaySetting === null || googlePaySetting === undefined) {
    throw new Error('googlePaySetting is invalid');
  } else if (paymentRequest === null || paymentRequest === undefined) {
    throw new Error('paymentRequest is invalid');
  }

  if (document.querySelector('#google-pay-script') === null) {
    const googlePayScript = document.createElement('script');
    googlePayScript.src = 'https://pay.google.com/gp/p/js/pay.js';
    googlePayScript.id = 'google-pay-script';
    document.head.appendChild(googlePayScript);
  }

  return new Promise(resolve => {
    setTimeout(async () => {
      resolve(await tappayGooglePayInit(googlePaySetting, paymentRequest));
    }, 20);
  });
}

export function tappayGooglePayInit(googlePaySetting, paymentRequest) {
  return new Promise(resolve => {
    const google = window.google;
    if (google === undefined) {
      return setTimeout(async () => {
        resolve(await tappayGooglePayInit(googlePaySetting, paymentRequest));
      }, 20);
    }

    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.googlePay?.setupGooglePay !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.googlePay.setupGooglePay(googlePaySetting);

    TPDirect.googlePay.setupPaymentRequest(paymentRequest, (error, result) => {
      resolve({ error, result, tappayGooglePay: TPDirect.googlePay });
    });
  });
}
export function tappayGooglePaySetupPrice(price) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.googlePay?.setupTransactionPrice !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  TPDirect.googlePay.setupTransactionPrice(price);
}

export function tappayGooglePayButtonInit(
  googlePayButtonSetting = {},
  getPrimeCallback = (err, prime) => console.log(err, prime)
) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.googlePay?.setupGooglePayButton !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  TPDirect.googlePay.setupGooglePayButton({
    ...googlePayButtonSetting,
    getPrimeCallback
  });
}

export function tappayGooglePayGetPrime(price) {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.googlePay?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    if (typeof price?.price === 'string') {
      tappayGooglePaySetupPrice(price);
    }
    TPDirect.googlePay.getPrime((error, prime, result) => {
      resolve({ error, prime, result });
    });
  });
}

let tappayApplePayPaymentRequest = {};
export async function tappayApplePayInit(
  setting,
  paymentRequest = tappayApplePayPaymentRequest
) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.paymentRequestApi?.checkAvailability !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  const checkAvailability = TPDirect.paymentRequestApi.checkAvailability();
  let result = {};
  if (checkAvailability === true) {
    TPDirect.paymentRequestApi.setupApplePay(setting);
    result = await tappayApplePaySetupPayment(paymentRequest);
  }
  const hasApplePaySession = typeof window.ApplePaySession === 'function';
  tappayApplePayPaymentRequest = {
    ...paymentRequest,
    tappayApplePayPaymentRequest
  };
  return {
    ...result,
    hasApplePaySession,
    success: checkAvailability && hasApplePaySession,
    tappayPaymentRequestApi: TPDirect.paymentRequestApi
  };
}

export function tappayApplePaySetupPayment(
  paymentRequest = tappayApplePayPaymentRequest
) {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (
      typeof TPDirect?.paymentRequestApi?.setupPaymentRequest !== 'function'
    ) {
      throw new Error('Tappay has not been initialized!');
    }

    tappayApplePayPaymentRequest = {
      ...paymentRequest,
      ...tappayApplePayPaymentRequest
    };

    TPDirect.paymentRequestApi.setupPaymentRequest(
      tappayApplePayPaymentRequest,
      result => {
        resolve({ ...result, paymentRequest: tappayApplePayPaymentRequest });
      }
    );
  });
}

export function tappayLinePayGetPrime() {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.linePay?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.linePay.getPrime(result => {
      resolve(result);
    });
  });
}

export function tappaySamsungPayInit(samsungPaySetting) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.samsungPay?.setup !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  TPDirect.samsungPay.setup(samsungPaySetting);
  return TPDirect.samsungPay;
}

export function tappaySamsungPaySetupPayment(paymentRequest) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.samsungPay?.setupPaymentRequest !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  TPDirect.samsungPay.setupPaymentRequest(paymentRequest);
}

export function tappaySamsungPayButtonInit(
  HTMLElement,
  samsungPayButtonSetting = {}
) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.samsungPay?.setupSamsungPayButton !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  TPDirect.samsungPay.setupSamsungPayButton(
    HTMLElement,
    samsungPayButtonSetting
  );
}

export function tappaySamsungPayGetPrime() {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.samsungPay?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.samsungPay.getPrime(result => {
      resolve(result);
    });
  });
}

export function tappayJkoPayGetPrime() {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.jkoPay?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.jkoPay.getPrime(result => {
      resolve(result);
    });
  });
}

export function tappayEasyWalletGetPrime() {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.easyWallet?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.easyWallet.getPrime((error, result) => {
      resolve({ error, result });
    });
  });
}

export function tappayAtomeGetPrime() {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.atome?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.atome.getPrime((error, result) => {
      resolve({ error, result });
    });
  });
}

export function tappayPiWalletGetPrime() {
  return new Promise(resolve => {
    const TPDirect = window.TPDirect || {};
    if (typeof TPDirect?.piWallet?.getPrime !== 'function') {
      throw new Error('Tappay has not been initialized!');
    }
    TPDirect.piWallet.getPrime((error, result) => {
      resolve({ error, result });
    });
  });
}
