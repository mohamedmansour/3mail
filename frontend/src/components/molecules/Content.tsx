import MailboxScreen from 'components/pages/MailboxScreen';
import MessageScreen from 'components/pages/MessageScreen';
import { useApp } from '../../contexts/State';
import AuthenticateScreen from '../pages/AuthenticateScreen';

const Content = () => {
  const app = useApp();
  let screen;
  console.log(app.state);
  switch (app.state.nav.type) {
    case 'mailbox':
      screen = (
        <MailboxScreen state={app.state} openMessage={app.openMessage} />
      );
      break;
    case 'message':
      screen = (
        <MessageScreen closeMessage={app.openMailbox} state={app.state} />
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
