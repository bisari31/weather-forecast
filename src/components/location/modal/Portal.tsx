import ReactDOM from 'react-dom';

interface IProps {
  children: JSX.Element;
}

const Portal = ({ children }: IProps) => {
  const el = document.getElementById('modal');

  if (!el) return null;

  return ReactDOM.createPortal(children, el);
};

export default Portal;
