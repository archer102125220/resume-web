import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';

const CKEditor = dynamic(
  () => import('ckeditor4-react').then(({ CKEditor }) => CKEditor),
  { ssr: false }
);

import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';

const m3 = {
  margin: '16px'
};
const mb3 = {
  marginBottom: '16px'
};
const formLabel = {
  display: 'inline-block',
  marginBottom: '8px'
};
const formSelect = {
  // eslint-disable-next-line quotes
  '--bs-form-select-bg-img': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
  display: 'block',
  width: '100%',
  padding: '6px 36px 6px 12px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#212529',
  backgroundColor: '#fff',
  backgroundImage:
    'var(--bs-form-select-bg-img),var(--bs-form-select-bg-icon,none)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  backgroundSize: '16px 12px',
  border: '1px solid #dee2e6',
  borderRadius: '6px',
  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  appearance: 'none',
  '&:focus': {
    borderColor: '#86b7fe',
    outline: 0,
    boxShadow: '0 0 0 4px rgba(13,110,253,.25)'
  }
};
const formControl = {
  display: 'block',
  width: '100%',
  padding: '6px 12px',
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: '1.5',
  color: '#212529',
  backgroundColor: '#fff',
  backgroundClip: 'padding-box',
  border: '1px solid #dee2e6',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  appearance: 'none',
  borderRadius: '6px',
  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
};
const invalidFeedback = {
  display: 'none',
  width: '100%',
  marginTop: '4px',
  fontSize: '.875em',
  color: '#dc3545'
};
const row = {
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 'calc(-1 * 16px)',
  marginRight: 'calc(-.5 * 16px)',
  marginLeft: 'calc(-.5 * 16px)',
  '& > *': {
    flexShrink: '0',
    width: '100%',
    maxWidth: '100%',
    paddingRight: 'calc(16px * .5)',
    paddingLeft: 'calc(16px * .5)',
    marginTop: '16px'
  }
};
const colAuto = {
  flex: '0 0 auto',
  width: 'auto'
};
const isInvalid = {
  borderColor: '#dc3545',
  paddingRight: 'calc(1.5em + 12px)',
  // eslint-disable-next-line quotes
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right calc(0.375em + 3px) center',
  backgroundSize: 'calc(0.75em + 6px) calc(0.75em + 6px)'
};

const styles = {
  m3,
  mb3,
  formLabel,
  formSelect,
  formControl,
  invalidFeedback,
  row,
  colAuto,
  isInvalid,
  root: {
    ...m3
    // minWidth: 1200
  },
  dataTime: {
    ...mb3,
    minHeight: '6.25em'
  },
  dataTimeInput: {
    ...colAuto,
    // width: '10.625em',
    padding: '0',
    backgroundColor: '#fff',
    borderRadius: '4px'
  },
  dataTimeBetween: {
    ...colAuto,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBlock: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};

const useStyles = makeStyles(styles);

function CKEditor4() {
  const [CKEDITOR, set_CKEDITOR] = useState(null);
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('Hello from CKEditor 5!');
  const [context, setContext] = useState('<p>Hello from CKEditor 5!</p>');
  const [contextErrorMsg, setContextErrorMsg] = useState('');
  const [hasImg, setHasImg] = useState(false);
  const [articleVisible, setArticleVisible] = useState({
    status: true,
    message: '上架'
  });
  const [keyWord, setKeyWord] = useState('');
  const [keyWordError, setKeyWordError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startDateError, setStartDateError] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [endDateError, setEndDateError] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState('');

  const CKEditorBlockRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    handleDescriptionChange(context);
  }, []);
  useEffect(() => {
    handleDescriptionChange(context);
  }, [context]);
  useEffect(() => {
    dataTimeCheck(startDate, endDate, articleVisible.status);
  }, [articleVisible]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/html-editor/ckeditor4' });

  function handleArticleVisibleChange(e) {
    if (e.target.checked) {
      setArticleVisible({ status: true, message: '上架' });
    } else {
      setArticleVisible({ status: false, message: '下架' });
    }
  }

  function handleCategoryChange(newCategory) {
    setCategory(newCategory);
    setCategoryError(false);
  }

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
    setTitleError(false);
  }

  function handleContextChange({ editor }) {
    const data = editor.getData();
    setContext(data);
    // console.log({ event: { ...event }, editor: { ...editor } });
  }

  function handleDescriptionChange(newContext) {
    const div = document.createElement('div');
    div.innerHTML = newContext;

    if (div.querySelector('img') !== null) {
      setHasImg(true);
      setContextErrorMsg('');
      const ckeditorDom =
        CKEditorBlockRef.current.querySelector('#cke_editor1');
      if (ckeditorDom !== null) {
        ckeditorDom.style.borderColor = '';
      }
    }

    const descriptionElement = div.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6'
    );
    let _description = '';
    for (let i = 0; i < descriptionElement.length; i++) {
      const innerText = descriptionElement[i].innerText.trim();
      if (_description.length >= 75) {
        break;
      } else if (innerText !== '') {
        _description += _description.length === 0 ? innerText : ' ' + innerText;
      }
    }
    setDescription(_description.substring(0, 75));
  }

  function handleKeyWordChange(newKeyWord) {
    setKeyWord(newKeyWord);
    setKeyWordError(false);
  }

  function handleStartDateChange(newStartDate) {
    setStartDate(newStartDate);
    setStartDateError(false);
    dataTimeCheck(newStartDate, endDate, articleVisible.status);
  }

  function handleEndDateChange(newEndDate) {
    setEndDate(newEndDate);
    setEndDateError(false);
    dataTimeCheck(startDate, newEndDate, articleVisible.status);
  }

  function dataTimeCheck(_startDate, _endDate, articleVisibleStatus = true) {
    if (_startDate !== null && _endDate !== null) {
      let _dateErrorMsg = '';
      if (articleVisibleStatus === true && Date.now() > _endDate.valueOf()) {
        setEndDateError(true);
        _dateErrorMsg = '請檢查上架結束時間';
        if (_startDate.valueOf() > _endDate.valueOf()) {
          _dateErrorMsg = '請檢查上架開始及結束時間';
          setStartDateError(true);
        }
        setDateErrorMsg(_dateErrorMsg);
        return false;
      }
      if (_startDate.valueOf() > _endDate.valueOf()) {
        setStartDateError(true);
        setEndDateError(true);

        _dateErrorMsg = '請檢查上架開始及結束時間';
        setDateErrorMsg(_dateErrorMsg);
        return false;
      }

      if (startDateError === true) {
        setStartDateError(false);
      }
      if (endDateError === true) {
        setEndDateError(false);
      }
      if (dateErrorMsg !== '') {
        setDateErrorMsg('');
      }
    }
    return true;
  }

  async function handleSubmit() {
    const field = [category, title, keyWord, startDate, endDate];
    const errorFieldSetter = [
      setCategoryError,
      setTitleError,
      setKeyWordError,
      setStartDateError,
      setEndDateError
    ];

    const fail = field.filter((element, index) => {
      if (element === '' || element === null) {
        errorFieldSetter[index](true);
        return true;
      }
      return false;
    });

    const ckeditorDom = CKEditorBlockRef.current.querySelector('#cke_editor1');

    let _contextErrorMsg = '';
    if (description === '' && ckeditorDom !== null) {
      _contextErrorMsg += '請輸入文字';
      ckeditorDom.style.borderColor = '#dc3545';
      fail.push(true);
    }
    if (hasImg === false) {
      _contextErrorMsg +=
        (_contextErrorMsg !== '' ? '；' : '') + '請插入圖片，以利建立文章縮圖';
      if (ckeditorDom !== null) {
        ckeditorDom.style.borderColor = '#dc3545';
      }
      fail.push(true);
    }
    if (dataTimeCheck(startDate, endDate, articleVisible.status) === false) {
      fail.push(true);
    }

    if (_contextErrorMsg !== '') {
      setContextErrorMsg(_contextErrorMsg);
    }
    if (fail.length > 0) {
      return;
    }

    console.log({
      POST_URL: '/api/add-html',
      category,
      title,
      description,
      context,
      articleVisible: articleVisible.status,
      keyWord,
      startDate: startDate.valueOf(),
      endDate: endDate.valueOf()
    });

    // try {
    //   await axios.post(
    //     POST_URL,
    //     {
    //       category,
    //       title,
    //       description,
    //       context,
    //       articleVisible: articleVisible.status,
    //       keyWord,
    //       startDate,
    //       endDate
    //     }
    //   );
    // } catch (error) {
    //   console.log('post error');
    // }
  }

  function handleReset() {
    setCategory('');
    setCategoryError(false);
    setTitle('');
    setTitleError(false);
    setDescription('');
    setContext('');
    setArticleVisible({ status: true, message: '上架' });
    setKeyWord('');
    setKeyWordError(false);
    setStartDate(null);
    setStartDateError(false);
    setEndDate(null);
    setEndDateError(false);
    setDateErrorMsg('');
    setHasImg(false);
    setContextErrorMsg('');
    const ckeditorDom = CKEditorBlockRef.current.querySelector('#cke_editor1');
    if (ckeditorDom !== null) {
      ckeditorDom.style.borderColor = '';
    }

    if (typeof CKEDITOR?.instances?.editor1?.setData === 'function') {
      CKEDITOR.instances.editor1.setData('');
    }
  }

  return (
    <div className={classes.m3}>
      <Head>
        <title>Parker Chan 的作品集 - HTML編輯器</title>
      </Head>
      <div className={classes.md3}>
        <label className={classes.formLabel}>文章類別</label>
        <select
          className={[
            classes.formSelect,
            categoryError ? classes.isInvalid : ''
          ].join(' ')}
          onChange={e => handleCategoryChange(e.target.value)}
          value={category}
        >
          <option value="">請選擇</option>
          <option value="test">測試</option>
        </select>
      </div>
      <div className={classes.md3}>
        <label className={classes.formLabel}>文章標題</label>
        <input
          type="text"
          className={[
            classes.formControl,
            titleError ? classes.isInvalid : ''
          ].join(' ')}
          onChange={e => handleTitleChange(e.target.value)}
          value={title}
        />
      </div>

      <div className={classes.md3}>
        <label className={classes.formLabel}>文章內文</label>
        <div ref={CKEditorBlockRef}>
          <CKEditor
            editorUrl="https://cdn.ckeditor.com/4.21.0/full-all/ckeditor.js"
            onNamespaceLoaded={_CKEDITOR => {
              _CKEDITOR.plugins.addExternal(
                'videoembed',
                '/ckeditor/plugins/videoembed/plugin.js'
              );
              set_CKEDITOR(_CKEDITOR);
            }}
            initData={context}
            onChange={handleContextChange}
            config={{
              language: 'zh',
              filebrowserUploadUrl: '/upload-img?a',
              plugins: [
                'dialogui',
                'dialog',
                'format',
                'basicstyles',
                'button',
                'toolbar',
                'fakeobjects',
                'link',
                'popup',
                'undo',
                'contextmenu',
                'floatpanel',
                'wysiwygarea',
                'resize',
                'elementspath',
                'image',
                'xml',
                'ajax',
                'filetools',
                'filebrowser',
                'notificationaggregator',
                'notification',
                'widgetselection',
                'widget',
                'uploadwidget',
                'uploadimage',
                'htmlwriter',
                'videoembed',
                'panel',
                'menu',
                'enterkey',
                'entities',
                'floatingspace',
                'listblock',
                'richcombo',
                'pastetools',
                'pastefromgdocs',
                'pastefromlibreoffice',
                'menubutton',
                'showborders',
                'lineutils',
                'colorbutton',
                'font'
                // 'stylescombo'
              ],
              format_tags: 'p;h1;h2;h3;h4;h5;h6',
              toolbarGroups: [
                { name: 'document', groups: ['mode', 'document', 'doctools'] },
                { name: 'clipboard', groups: ['clipboard', 'undo'] },
                {
                  name: 'editing',
                  groups: ['find', 'selection', 'spellchecker']
                },
                { name: 'forms' },
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                {
                  name: 'paragraph',
                  groups: ['list', 'indent', 'blocks', 'align', 'bidi']
                },
                { name: 'links' },
                { name: 'insert' },
                { name: 'styles' },
                { name: 'colors' },
                { name: 'tools' },
                { name: 'others' },
                { name: 'about' }
              ],
              removeButtons: [
                'Cut',
                'Copy',
                'Paste',
                'Undo',
                'Redo',
                'Anchor',
                'Underline',
                'Strike',
                'Subscript',
                'Superscript'
              ],
              removeDialogTabs: 'image:advanced;image:Link'
            }}
          />
        </div>
        <div
          className={classes.invalidFeedback}
          style={contextErrorMsg !== '' ? { display: 'block' } : {}}
        >
          {contextErrorMsg}
        </div>
      </div>

      <div className={classes.md3}>
        <label className={classes.formLabel}>
          文章描述(自動節錄文章內文內容，最多75字)
        </label>
        {/* <dd className="col-sm-9">{description}</dd> */}
        <input
          type="text"
          // readOnly={true}
          value={description}
          onChange={e => setDescription(`${e.target.value}`.substring(0, 75))}
          className={[
            classes.formControl,
            contextErrorMsg !== '' ? classes.isInvalid : ''
          ].join(' ')}
        />
      </div>

      <div className={classes.md3}>
        <label className={classes.formLabel}>文章關鍵字</label>
        <input
          type="text"
          value={keyWord}
          onChange={e => handleKeyWordChange(e.target.value)}
          className={[
            classes.formControl,
            keyWordError ? classes.isInvalid : ''
          ].join(' ')}
        />
      </div>
      <div className={classes.md3}>
        <label className={classes.formLabel}>文章狀態</label>
        {/* <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            onChange={handleArticleVisibleChange}
            checked={articleVisible?.status}
          />
          <label className="form-check-label">{articleVisible?.message}</label>
        </div> */}
        <div>
          <FormControlLabel
            control={
              <Switch
                color="warning"
                checked={articleVisible?.status}
                onChange={handleArticleVisibleChange}
              />
            }
            label={articleVisible?.message}
          />
        </div>
      </div>
      <div className={classes.dataTime}>
        <label className={classes.formLabel}>上架時間</label>
        <div className={classes.row}>
          <div className={classes.dataTimeInput}>
            {/* <input
              type="date"
              className={[
                classes.formControl,
                startDateError ? classes.isInvalid : ''
              ].join(' ')}
              value={startDate}
              onChange={e => handleStartDateChange(e.target.value)}
            /> */}
            <DatePicker
              value={startDate}
              className={[startDateError ? classes.isInvalid : ''].join(' ')}
              onChange={handleStartDateChange}
              renderInput={params => <TextField {...params} />}
            />
          </div>
          <div className={classes.dataTimeBetween}>~</div>
          <div className={classes.dataTimeInput}>
            {/* <input
              type="date"
              className={[
                classes.formControl,
                endDateError ? classes.isInvalid : ''
              ].join(' ')}
              value={endDate}
              onChange={e => handleEndDateChange(e.target.value)}
            /> */}
            <DatePicker
              value={endDate}
              className={[endDateError ? classes.isInvalid : ''].join(' ')}
              onChange={handleEndDateChange}
              renderInput={params => <TextField {...params} />}
            />
          </div>
        </div>
        <div
          className={classes.invalidFeedback}
          style={endDateError || startDateError ? { display: 'block' } : {}}
        >
          {dateErrorMsg}
        </div>
      </div>
      <div className={classes.buttonBlock}>
        <Button sx={buttonStyle} variant="contained" onClick={handleSubmit}>
          發布文章
        </Button>
        <Button
          sx={buttonLayout}
          variant="contained"
          color="error"
          onClick={handleReset}
        >
          重新填寫
        </Button>
      </div>
    </div>
  );
}

export default CKEditor4;
