import MailboxScreen from 'components/pages/MailboxScreen';
import MessageScreen from 'components/pages/MessageScreen';
import { useApp } from '../../contexts/State';
import AuthenticateScreen from '../pages/AuthenticateScreen';
import Header from 'components/molecules/Header';

const Content = () => {
  const app = useApp();
  let screen;
  switch (app.state.nav.type) {
    case 'mailbox':
      screen = (
        <>
          <Header />
          <MailboxScreen state={app.state} openMessage={app.openMessage} />
        </>
      );
      break;
    case 'message':
      screen = (
        <>
          <Header />
          <MessageScreen closeMessage={app.openMailbox} state={app.state} />
        </>
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
