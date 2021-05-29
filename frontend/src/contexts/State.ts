import { useCallback, useReducer } from 'react';

type AuthStatus = 'pending' | 'loading' | 'failed';
export type DraftStatus = 'unsaved' | 'saving' | 'failed' | 'saved';
type MessageLoadingStatus = 'init' | 'loading' | 'loading failed';
type MessageSavingStatus = 'loaded' | 'saving' | 'saving failed' | 'saved';

type UnauthenticatedState = { status: AuthStatus };
type AuthenticatedState = { status: 'done' };
export type AuthState = UnauthenticatedState | AuthenticatedState;

type NavDefaultState = { type: 'default' };
type NavDraftState = { type: 'draft' };
export type NavMessageState = {
  type: 'message';
  docID: string;
  message?: StoredMessage;
};
type NavMailboxState = { type: 'mailbox' };

export type StoredMessage = {
  id: string;
  status: MessageSavingStatus;
  subject: string;
  content: string;
};

type Store = {
  draftStatus: DraftStatus;
  messages: Array<StoredMessage>;
};
type DefaultState = {
  auth: AuthState;
  nav: NavDefaultState;
};
type MessageState = {
  auth: AuthenticatedState;
  nav: NavDraftState | NavMessageState | NavMailboxState;
};
export type State = Store & (DefaultState | MessageState);

type AuthAction = { type: 'auth'; status: AuthStatus };
type AuthSuccessAction = { type: 'auth success' };
type NavMailboxAction = { type: 'nav mailbox' };
type NavMessageAction = { type: 'nav message'; docID: string };
type MessageLoadedAction = { type: 'message loaded'; message: StoredMessage };
type Action =
  | AuthAction
  | AuthSuccessAction
  | NavMailboxAction
  | NavMessageAction
  | MessageLoadedAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'auth':
      return {
        ...state,
        nav: { type: 'default' },
        auth: { status: action.status },
      };
    case 'nav mailbox':
    case 'auth success': {
      const auth = {
        status: 'done',
      } as AuthenticatedState;
      return {
        auth,
        draftStatus: 'unsaved',
        nav: { type: 'mailbox' },
        messages: [
          {
            status: 'loaded',
            id: '1',
            subject: 'Message 1',
            content: 'Content 1',
          },
          {
            status: 'loaded',
            id: '1',
            subject: 'Message 2',
            content: 'Content 2',
          },
          {
            status: 'loaded',
            id: '1',
            subject: 'Message 3',
            content: 'Content 3',
          },
        ],
      };
    }
    case 'nav message':
      return {
        ...state,
        auth: state.auth as AuthenticatedState,
        nav: {
          type: 'message',
          docID: action.docID,
        },
      };
    case 'message loaded':
      return {
        ...state,
        auth: state.auth as AuthenticatedState,
        nav: {
          ...(state.nav as NavMessageState),
          message: action.message,
        },
      };
  }

  return state;
}

export function useApp() {
  const [state, dispatch] = useReducer(reducer, {
    auth: { status: 'pending' },
    draftStatus: 'unsaved',
    nav: { type: 'default' },
    messages: [],
  });

  const authenticate = useCallback((seed: Uint8Array) => {
    dispatch({ type: 'auth', status: 'loading' });
    // Imitate loading
    setTimeout(() => {
      dispatch({ type: 'auth success' });
    }, 1000);
  }, []);

  const openMailbox = useCallback(() => {
    dispatch({ type: 'nav mailbox' });
  }, []);

  const openMessage = useCallback((docID: string) => {
    dispatch({ type: 'nav message', docID });
    // Here do the fetching
    setTimeout(() => {
      dispatch({
        type: 'message loaded',
        message: {
          id: docID,
          status: 'loaded',
          subject: 'Message X',
          content: 'Content X',
        },
      });
    }, 1000);
  }, []);

  return {
    authenticate,
    openMessage,
    openMailbox,
    state,
  };
}
