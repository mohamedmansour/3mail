import { useCallback, useReducer } from 'react';
import { loremIpsum } from 'lorem-ipsum';

type AuthStatus = 'pending' | 'loading' | 'failed';
export type DraftStatus = 'unsaved' | 'saving' | 'failed' | 'saved';
// type MessageLoadingStatus = 'init' | 'loading' | 'loading failed';
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
  date: number;
  sender: string;
  status: MessageSavingStatus;
  subject: string;
  content: string;
};

type Store = {
  draftStatus: DraftStatus;
  messages: StoredMessage[];
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
type AuthLogoutAction = { type: 'auth logout' };
type AuthSuccessAction = { type: 'auth success'; messages: StoredMessage[] };
type NavMailboxAction = { type: 'nav mailbox'; messages: StoredMessage[] };
type NavMessageAction = { type: 'nav message'; docID: string };
type MessageLoadedAction = { type: 'message loaded'; message: StoredMessage };
type Action =
  | AuthAction
  | AuthLogoutAction
  | AuthSuccessAction
  | NavMailboxAction
  | NavMessageAction
  | MessageLoadedAction;

const currentDateInMs = Date.now();
const tempDb: StoredMessage[] = [];

for (let mockIndex = 0; mockIndex < 100; mockIndex++) {
  tempDb.push({
    date: currentDateInMs + 1000 * 60 * 60 * mockIndex,
    status: 'loaded',
    id: mockIndex.toString(),
    sender: `${loremIpsum({ count: 1, units: 'word' })}.eth`,
    subject: loremIpsum(),
    content: loremIpsum({ count: 1, units: 'paragraphs' }),
  });
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'auth':
      return {
        ...state,
        nav: { type: 'default' },
        auth: { status: action.status },
      };
    case 'auth logout': {
      return {
        auth: { status: 'pending' },
        draftStatus: 'unsaved',
        nav: { type: 'default' },
        messages: [],
      };
    }
    case 'nav mailbox':
    case 'auth success': {
      const auth = {
        status: 'done',
      } as AuthenticatedState;
      return {
        auth,
        draftStatus: 'unsaved',
        nav: { type: 'mailbox' },
        messages: action.messages,
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
      dispatch({ type: 'auth success', messages: tempDb });
    }, 500);
  }, []);

  const openMailbox = useCallback(() => {
    dispatch({ type: 'nav mailbox', messages: tempDb });
  }, []);

  const openMessage = useCallback((docID: string) => {
    dispatch({ type: 'nav message', docID });
    // Here do the fetching
    setTimeout(() => {
      dispatch({
        type: 'message loaded',
        message: tempDb[parseInt(docID)],
      });
    }, 500);
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'auth logout' });
  }, []);

  return {
    authenticate,
    openMessage,
    openMailbox,
    logout,
    state,
  };
}
