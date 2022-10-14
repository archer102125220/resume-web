import Link from 'next/link';
// import { useDispatch } from 'react-redux';
// import { makeStyles } from '@mui/styles';
// import { systemAsyncThunk } from '@/redux/system';

// const styles = {
//   footer: {
//     display: 'flex',
//     flex: '1',
//     padding: '2rem 0',
//     borderTop: '1px solid #eaeaea',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     height: '1em',
//     marginLeft: '0.5rem'
//   }
// };

// const useStyles = makeStyles(styles);

function Home() {
  // const classes = useStyles();

  return (
    <div>
      <p>不好意思，其餘頁面與動畫正在設計中，感謝您的來訪~</p>
      <Link href="/tow">home</Link>
    </div>
  );
}

export default Home;
