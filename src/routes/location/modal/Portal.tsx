import ReactDOM from 'react-dom';

interface IProps {
  children: JSX.Element;
}

const Portal = ({ children }: IProps) => {
  const el = document.getElementById('modal');

  if (!el) throw new Error('modal을 사용할 수 없습니다.');

  return ReactDOM.createPortal(children, el);
};

export default Portal;
