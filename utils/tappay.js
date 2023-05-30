export function importTapPay(APP_ID, APP_KEY, isPord = false) {
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
      resolve(await tapPayInit(APP_ID, APP_KEY, isPord));
    }, 20);
  });
}

export function tapPayInit(APP_ID, APP_KEY, isPord = false) {
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
        resolve(await tapPayInit(APP_ID, APP_KEY, isPord));
      }, 20);
    }
  });
}

export function tapPayDirectPayInit(config, onUpdate) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.setup !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  TPDirect.card.setup(config);
  TPDirect.card.onUpdate(onUpdate);
  return TPDirect.card;
}

export function tapPayValidateCardNumber(cardNumber, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.cardNumber !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.cardNumber(cardNumber, ...arg);
}

export function tapPayValidateCardType(cardNumber, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.cardType !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.cardType(cardNumber, ...arg);
}

export function tapPayValidateCCV(ccv, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.ccv !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.ccv(ccv, ...arg);
}

export function tapPayValidateExpiry(expiry, ...arg) {
  const TPDirect = window.TPDirect || {};
  if (typeof TPDirect?.card?.validate?.expiry !== 'function') {
    throw new Error('Tappay has not been initialized!');
  }
  return TPDirect.validate.expiry(expiry, ...arg);
}
