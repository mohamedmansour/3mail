import { ComposeScreen } from 'components/pages/ComposeScreen';
import MailboxScreen from 'components/pages/MailboxScreen';
import MessageScreen from 'components/pages/MessageScreen';
import React, { useState } from 'react';
import { useApp } from '../../contexts/State';
import AuthenticateScreen from '../pages/AuthenticateScreen';
import { Layout } from './Layout';

const Content = () => {
  const app = useApp();

  switch (app.state.nav.type) {
    case 'mailbox':
      return (
        <Layout
          logout={app.logout}
          home={app.openMailbox}
          compose={app.compose}
        >
          <MailboxScreen state={app.state} openMessage={app.openMessage} />
        </Layout>
      );
    case 'message':
      return (
        <Layout
          logout={app.logout}
          home={app.openMailbox}
          compose={app.compose}
        >
          <MessageScreen closeMessage={app.openMailbox} state={app.state} />
        </Layout>
      );
    case 'compose':
      return (
        <Layout
          logout={app.logout}
          home={app.openMailbox}
          compose={app.compose}
        >
          <ComposeScreen closeMessage={app.openMailbox} state={app.state} />
        </Layout>
      );
    default:
      return (
        <AuthenticateScreen
          authenticate={app.authenticate}
          state={app.state.auth}
        />
      );
  }
};

export default Content;
