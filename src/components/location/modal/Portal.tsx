import ReactDOM from 'react-dom';

interface IProps {
  children: JSX.Element;
}

const Portal = ({ children }: IProps) => {
  const el = document.getElementById('modal');

  if (!el) throw new Error('document를 찾을 수 없습니다.');

  return ReactDOM.createPortal(children, el);
};

export default Portal;
