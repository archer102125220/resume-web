import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import {
  importCKEditor,
  UploadAdapter,
  removeCKEditor
} from '@/utils/createdCKEditor';

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

function CKEditor5v2() {
  const [CKEditor, setCKEditor] = useState(null);
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('Hello from CKEditor 5!');
  const [context, setContext] = useState('<p>Hello from CKEditor 5!</p>');
  const [contextErrorMsg, setContextErrorMsg] = useState('');
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

  const CKEditorRef = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    createdCKEditor();
    handleDescriptionChange(context);
    return () => setTimeout(removeCKEditor, 100);
  }, []);
  useEffect(() => {
    handleDescriptionChange(context);
  }, [context]);
  useEffect(() => {
    dataTimeCheck(startDate, endDate);
  }, [articleVisible]);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/html-editor/ckeditor5v2' });

  function handleArticleVisibleChange(e) {
    if (e.target.checked) {
      setArticleVisible({ status: true, message: '上架' });
    } else {
      setArticleVisible({ status: false, message: '下架' });
    }
  }

  async function createdCKEditor() {
    try {
      if (document.querySelector('#ckEditor-script')) return;
      const _CKEditor = await importCKEditor(CKEditorRef.current, {
        initialData: context,
        language: 'zh',
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'imageUpload',
            'mediaEmbed',
            'fontSize',
            'fontBackgroundColor',
            'fontColor',
            'fontFamily'
          ]
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4'
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5'
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6'
            }
          ]
        }
      });
      _CKEditor.model.document.on('change:data', () =>
        handleContextChange(_CKEditor)
      );
      _CKEditor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new UploadAdapter(loader, '/upload-img');
      };
      setCKEditor(_CKEditor);
    } catch (error) {
      console.log(error);
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

  function handleContextChange(editor) {
    if (typeof editor?.getData === 'function') {
      const data = editor.getData();
      setContext(data);
      // console.log({ event: { ...event }, editor: { ...editor } });
    }
  }

  function handleDescriptionChange(newContext) {
    const div = document.createElement('div');
    div.innerHTML = newContext;

    if (div.querySelector('img') !== null) {
      setContextErrorMsg('');
    }

    const _description =
      getDescription(div, 'p') || getDescription(div, 'h1,h2,h3,h4,h5,h6');

    if (_description.trim() !== '') {
      setDescription(_description.substring(0, 75));
    }
  }
  function getDescription(div, query) {
    let _description = '';
    const descriptionElementList = div.querySelectorAll(query);
    if (descriptionElementList.length === 0) return _description;

    for (let i = 0; i <= descriptionElementList.length; i++) {
      const descriptionElement = descriptionElementList[i];
      if (
        descriptionElement?.innerText &&
        descriptionElement.innerText.trim() !== ''
      ) {
        _description = descriptionElement.innerText;
        break;
      }
    }
    return _description;
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
    if (_startDate !== '' && _endDate !== '') {
      const startDateObj = new Date(_startDate);
      const endDateObj = new Date(_endDate);
      let _dateErrorMsg = '';
      // console.log({ startDateObj: startDateObj.getTime(), endDateObj: endDateObj.getTime() });
      if (startDateObj.getTime() > endDateObj.getTime()) {
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
      if (element === '') {
        if (typeof errorFieldSetter[index] === 'function') {
          errorFieldSetter[index](true);
        }
        return true;
      }
      return false;
    });
    let _contextErrorMsg = '';
    if (context === '') {
      _contextErrorMsg += '請輸入文字';
      fail.push(true);
    }

    const div = document.createElement('div');
    div.innerHTML = context;

    const img = div.querySelector('img');
    let firstImage = '';
    if (img === null) {
      _contextErrorMsg +=
        (_contextErrorMsg !== '' ? '；' : '') + '請插入圖片，以利建立文章縮圖';
      console.log('ckeditor5v2版因無法透過上傳以外方式插入圖片，故品集版不做無圖片阻擋');
      // fail.push(true);
    } else {
      firstImage = img.src;
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
      visible: articleVisible.status,
      keyWord,
      firstImage,
      startDate: startDate.valueOf(),
      endDate: endDate.valueOf()
    });

    nextRouter.push({
      pathname: '/portfolio/html-editor/ckeditor5v2-view',
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
    setStartDate('');
    setStartDateError(false);
    setEndDate('');
    setEndDateError(false);
    setDateErrorMsg('');
    setContextErrorMsg('');
    if (typeof CKEditor?.setData === 'function') {
      CKEditor.setData('');
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
        <div
          style={
            contextErrorMsg !== ''
              ? {
                  '--ck-color-base-border': '#dc3545',
                  '--ck-color-toolbar-border': '#dc3545'
                }
              : {}
          }
        >
          <div ref={CKEditorRef} />
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
              onChange={handleStartDateChange}
              minDate={dayjs()}
              maxDate={endDate ? endDate : ''}
              className={[startDateError ? classes.isInvalid : ''].join(' ')}
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
              onChange={handleEndDateChange}
              minDate={dayjs()}
              className={[endDateError ? classes.isInvalid : ''].join(' ')}
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

export default CKEditor5v2;
