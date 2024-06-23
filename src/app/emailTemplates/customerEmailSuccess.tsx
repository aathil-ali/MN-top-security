import { CustomerEmailSuccess } from '@/components/customer-email-success';
import ReactDOMServer from 'react-dom/server';

export function renderCustomerEmailSuccess() {
  return ReactDOMServer.renderToStaticMarkup(<CustomerEmailSuccess />);
}