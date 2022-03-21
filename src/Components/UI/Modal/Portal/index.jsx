import ReactDOM from 'react-dom';

export const PortalModal = ({ children }) => {
  const portal = document.getElementById('portalModal');
  return ReactDOM.createPortal(children, portal);
}
