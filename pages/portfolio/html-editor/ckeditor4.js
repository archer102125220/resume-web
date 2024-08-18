import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

const CKEditor = dynamic(
  () => import('ckeditor4-react').then(({ CKEditor }) => CKEditor),
  { ssr: false }
);

import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import Image from '@/components/Image';

const colAuto = {
  flex: '0 0 auto',
  width: 'auto'
};

const styles = {
  m3: {
    margin: '16px'
  },
  formLabel: {
    display: 'inline-block',
    marginRight: '8px',
    marginBottom: '8px',
  },
  inputBlock: {
    width: '100%',
    marginBottom: '16px',
  },
  formSelect: {
    width: '100%'
  },
  invalidFeedback: {
    display: 'none',
    width: '100%',
    marginTop: '4px',
    fontSize: '.875em',
    color: '#dc3545'
  },
  row: {
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
  },
  colAuto,
  ckeditorTitlLogo: {
    width: '100px'
  },
  ckeditorTitlText: {
    fontSize: '24px'
  },
  dataTime: {
    marginBottom: '16px',
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
  const [description, setDescription] = useState('Hello from CKEditor 4!');
  const [context, setContext] = useState('<p>Hello from CKEditor 4!</p>');
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
  const nextRouter = useRouter();

  const CKEditorBlockRef = useRef(null);
  const classes = useStyles();

  const dispatch = useDispatch();
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );

  useEffect(() => {
    SAVE_loading(true);
    handleDescriptionChange(context);
  }, []);
  useEffect(() => {
    handleDescriptionChange(context);
  }, [context]);
  useEffect(() => {
    dataTimeCheck(startDate, endDate);
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
        CKEditorBlockRef.current.querySelector('[id^=cke_editor]');
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
    dataTimeCheck(newStartDate, endDate);
  }

  function handleEndDateChange(newEndDate) {
    setEndDate(newEndDate);
    setEndDateError(false);
    dataTimeCheck(startDate, newEndDate);
  }

  function dataTimeCheck(_startDate, _endDate) {
    if (_startDate !== null && _endDate !== null) {
      let _dateErrorMsg = '';
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

  function handleSubmit() {
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

    const ckeditorDom =
      CKEditorBlockRef.current.querySelector('[id^=cke_editor]');

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
    if (dataTimeCheck(startDate, endDate) === false) {
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

    nextRouter.push({
      pathname: '/portfolio/html-editor/ckeditor4-view',
      query: {
        category,
        title,
        description,
        context,
        articleVisible: articleVisible.status,
        keyWord,
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf()
      }
    });
    // CKEDITOR.editor.setReadOnly(true);
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
    const ckeditorDom =
      CKEditorBlockRef.current.querySelector('[id^=cke_editor]');
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
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Image
          className={classes.ckeditorTitlLogo}
          src="/img/ckeditor/ckeditor-4.svg"
          alt="tappay"
          width={100}
          height={100}
        />
        <p className={classes.ckeditorTitlText}>CKEditor4</p>
      </Stack>
      <div>
        <label className={classes.formLabel}>文章類別</label>
        <FormControl className={[classes.formSelect,classes.inputBlock].join(' ')} error={categoryError}>
          <InputLabel>文章類別</InputLabel>
          <Select
            label="文章類別"
            value={category}
            onChange={e => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="">請選擇</MenuItem>
            <MenuItem value="test">測試</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <label className={classes.formLabel}>文章標題</label>
        <TextField
          label="文章標題"
          value={title}
          error={titleError} className={classes.inputBlock}
          onChange={e => handleTitleChange(e.target.value)}
        />
      </div>

      <div>
        <label className={classes.formLabel}>文章內文</label>
        <div ref={CKEditorBlockRef} className={classes.inputBlock}>
          <CKEditor
            editorUrl="https://cdn.ckeditor.com/4.21.0/full-all/ckeditor.js"
            onNamespaceLoaded={_CKEDITOR => {
              _CKEDITOR.plugins.addExternal(
                'videoembed',
                '/ckeditor/plugins/videoembed/plugin.js'
              );
              set_CKEDITOR(_CKEDITOR);
            }}
            onInstanceReady={() => {
              SAVE_loading(false);
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

      <div>
        <label className={classes.formLabel}>
          文章描述(自動節錄文章內文內容，最多75字)
        </label>
        {/* <dd className="col-sm-9">{description}</dd> */}
        <TextField
          label="文章描述"
          value={description}
          error={description === ''}
          // readOnly={true}
          className={classes.inputBlock}
          onChange={e => setDescription(`${e.target.value}`.substring(0, 75))}
        />
      </div>

      <div>
        <label className={classes.formLabel}>文章關鍵字</label>
        <TextField
          label="文章關鍵字"
          value={keyWord}
          error={keyWordError} className={classes.inputBlock}
          onChange={e => handleKeyWordChange(e.target.value)}
        />
      </div>
      <div>
        <label className={classes.formLabel}>文章狀態</label>
        <div className={classes.inputBlock}>
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
            <DatePicker
              value={startDate}
              minDate={dayjs()}
              maxDate={endDate ? endDate : ''}
              onChange={handleStartDateChange}
              slotProps={{
                field: {
                  error: endDateError
                }
              }}
            />
          </div>
          <div className={classes.dataTimeBetween}>~</div>
          <div className={classes.dataTimeInput}>
            <DatePicker
              value={endDate}
              minDate={dayjs()}
              onChange={handleEndDateChange}
              slotProps={{
                field: {
                  error: endDateError
                }
              }}
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
          預覽文章
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
