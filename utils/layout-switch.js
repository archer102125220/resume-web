import DefalutLayout from '@/layouts/defalut';
import ErrorLayout from '@/layouts/error';

export default function LayoutSwitch({ route }) {
  if (route === '/404' || route === '/500') {
    return ErrorLayout;
  }
  return DefalutLayout;
}