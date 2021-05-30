import MailboxScreen from 'components/pages/MailboxScreen';
import MessageScreen from 'components/pages/MessageScreen';
import { useApp } from '../../contexts/State';
import AuthenticateScreen from '../pages/AuthenticateScreen';
import { Layout } from './Layout';

const Content = () => {
  const app = useApp();
  let screen;
  switch (app.state.nav.type) {
    case 'mailbox':
      screen = (
        <Layout logout={app.logout} home={app.openMailbox}>
          <MailboxScreen state={app.state} openMessage={app.openMessage} />
        </Layout>
      );
      break;
    case 'message':
      screen = (
        <Layout logout={app.logout} home={app.openMailbox}>
          <MessageScreen closeMessage={app.openMailbox} state={app.state} />
        </Layout>
      );
      break;
    default:
      screen = (
        <AuthenticateScreen
          authenticate={app.authenticate}
          state={app.state.auth}
        />
      );
      break;
  }

  return screen;
};

export default Content;
