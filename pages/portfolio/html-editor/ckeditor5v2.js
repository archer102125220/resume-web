import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Image from 'next/image';
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

import { buttonStyle, buttonLayout } from '@/styles/buttonStyle';
import useGTMTrack from '@/hooks/useGTMTrack';
import {
  importCKEditor5,
  UploadAdapter,
  removeCKEditor5
} from '@/utils/CKEditor5';

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

  const dispatch = useDispatch();
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );

  useEffect(() => {
    SAVE_loading(true);
    createdCKEditor();
    handleDescriptionChange(context);
    return () => setTimeout(removeCKEditor5, 100);
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
      if (document.querySelector('#ckEditor-script')) return SAVE_loading(false);
      const _CKEditor = await importCKEditor5(CKEditorRef.current, {
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
      SAVE_loading(false);
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
      console.log(
        'ckeditor5v2版因無法透過上傳以外方式插入圖片，故品集版不做無圖片阻擋'
      );
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
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Image
          className={classes.ckeditorTitlLogo}
          src="/img/ckeditor/ckeditor-5.svg"
          alt="tappay"
          width={100}
          height={100}
        />
        <p className={classes.ckeditorTitlText}>CKEditor5</p>
      </Stack>
      <div >
        <label className={classes.formLabel}>文章類別</label>
        <FormControl className={[classes.formSelect, classes.inputBlock].join(' ')} error={categoryError}>
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
        <div
          style={
            contextErrorMsg !== ''
              ? {
                  '--ck-color-base-border': '#dc3545',
                  '--ck-color-toolbar-border': '#dc3545'
                }
              : {}
          } className={classes.inputBlock}
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

export default CKEditor5v2;
