import { useCallback, useReducer } from 'react';
import { useCeramic } from './Ceramic';

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
type NavComposeState = { type: 'compose' };

export type StoredMessage = {
  id: string;
  date: number;
  sender: string;
  status: MessageSavingStatus;
  subject: string;
  content: string;
};

type Store = {
  searchResults: StoredMessage[];
  messages: StoredMessage[];
};
type DefaultState = {
  auth: AuthState;
  nav: NavDefaultState;
};
type MessageState = {
  auth: AuthenticatedState;
  nav: NavDraftState | NavMessageState | NavMailboxState | NavComposeState;
};
export type State = Store & (DefaultState | MessageState);

type AuthAction = { type: 'auth'; status: AuthStatus };
type AuthLogoutAction = { type: 'auth logout' };
type AuthSuccessAction = { type: 'auth success'; messages: StoredMessage[] };
type NavMailboxAction = { type: 'nav mailbox'; messages: StoredMessage[] };
type NavMessageAction = { type: 'nav message'; docID: string };
type NavComposeAction = { type: 'nav compose' };
type MessageLoadedAction = { type: 'message loaded'; message: StoredMessage };
type SearchLoadingAction = { type: 'search loading' };
type SearchLoadedAction = { type: 'search loaded'; results: StoredMessage[] };
type SearchClearedAction = { type: 'search cleared' };
type AddMessageAction = { type: 'message added'; message: StoredMessage };
type Action =
  | AuthAction
  | AuthLogoutAction
  | AuthSuccessAction
  | NavComposeAction
  | NavMailboxAction
  | NavMessageAction
  | MessageLoadedAction
  | SearchLoadingAction
  | SearchLoadedAction
  | SearchClearedAction
  | AddMessageAction;

const tempDb: StoredMessage[] = [];

// for (let mockIndex = 0; mockIndex < 100; mockIndex++) {
//   tempDb.push({
//     date: currentDateInMs + 1000 * 60 * 60 * mockIndex,
//     status: 'loaded',
//     id: mockIndex.toString(),
//     sender: `${loremIpsum({ count: 1, units: 'word' })}.eth`,
//     subject: loremIpsum(),
//     content: loremIpsum({ count: 1, units: 'paragraphs' }),
//   });
// }

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
        searchResults: [],
        auth: { status: 'pending' },
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
        searchResults: [],
        auth,
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
    case 'nav compose':
      return {
        ...state,
        auth: state.auth as AuthenticatedState,
        nav: {
          type: 'compose',
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
    case 'search loading':
      return {
        ...state,
        auth: state.auth as AuthenticatedState,
      };
    case 'search loaded':
      return {
        ...state,
        auth: state.auth as AuthenticatedState,
        searchResults: action.results,
      };
    case 'search cleared': {
      return {
        ...state,
        auth: state.auth as AuthenticatedState,
        searchResults: [],
      };
    }
    case 'message added': {
      return {
        ...state,
        messages: [action.message, ...state.messages],
      };
    }
  }

  return state;
}

export function useApp() {
  const [state, dispatch] = useReducer(reducer, {
    auth: { status: 'pending' },
    searchResults: [],
    nav: { type: 'default' },
    messages: [],
  });

  const { setSeed: updateSeed } = useCeramic();

  const authenticateWithSeed = useCallback(
    (seed: Uint8Array) => {
      dispatch({ type: 'auth', status: 'loading' });
      // Imitate loading
      updateSeed(seed);
      setTimeout(() => {
        dispatch({ type: 'auth success', messages: tempDb });
      }, 500);
    },
    [updateSeed]
  );

  const openMailbox = useCallback(() => {
    dispatch({ type: 'nav mailbox', messages: tempDb });
  }, []);

  const openMessage = useCallback((docID: string) => {
    dispatch({ type: 'nav message', docID });
    // Here do the fetching
    const msg = state.messages.find(m => m.id === docID);
    
    setTimeout(() => {
      dispatch({
        type: 'message loaded',
        message: msg!,
      });
    }, 500);
  }, [state.messages]);

  const logout = useCallback(() => {
    dispatch({ type: 'auth logout' });
  }, []);

  const openCompose = useCallback(() => {
    dispatch({ type: 'nav compose' });
  }, []);

  const search = useCallback((query: string) => {
    if (query.length < 3) return;
    dispatch({ type: 'search loading' });
    const results: StoredMessage[] = [];
    query = query.toLowerCase();
    for (let itemIndex in tempDb) {
      const item = tempDb[itemIndex];

      if (results.length === 10) {
        break;
      }

      if (item.content.toLowerCase().indexOf(query) !== -1) {
        results.push(item);
      } else if (item.subject.toLowerCase().indexOf(query) !== -1) {
        results.push(item);
      } else if (item.sender.toLowerCase().indexOf(query) !== -1) {
        results.push(item);
      }
    }

    dispatch({ type: 'search loaded', results });
  }, []);

  const clearSearch = useCallback(() => {
    dispatch({ type: 'search cleared' });
  }, []);

  const addMessage = useCallback((message: StoredMessage) => {
    dispatch({ type: 'message added', message });
  }, []);

  return {
    authenticateWithSeed,
    openMessage,
    openMailbox,
    openCompose,
    addMessage,
    logout,
    search,
    clearSearch,
    state,
  };
}
