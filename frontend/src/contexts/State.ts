import { TileDocument } from '@ceramicnetwork/stream-tile';
import { useCallback, useEffect, useReducer } from 'react';
import { useCeramic } from './Ceramic';
import { useOrbitDb } from './OrbitDB';

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
type AuthSuccessAction = { type: 'auth success';};
type NavMailboxAction = { type: 'nav mailbox'; };
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
    case 'nav mailbox': {
      return {
        ...state,
        auth: state.auth as AuthenticatedState,
        nav: { type: 'mailbox' },
        messages: [...state.messages],
      };
    }

    case 'auth success': {
      const auth = {
        status: 'done',
      } as AuthenticatedState;
      return {
        searchResults: [],
        auth,
        nav: { type: 'mailbox' },
        messages: [...state.messages],
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
        auth: state.auth as AuthenticatedState,
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

  const { ceramic, did, logout: doLogout } = useCeramic();
  const { odb, db, setDbName } = useOrbitDb();

  const addMessage = useCallback((message: StoredMessage) => {
    dispatch({ type: 'message added', message });
  }, []);

  useEffect(() => {
    if (did) {
      setDbName(did.id)
    }
  },[setDbName, did]);

  const convertMessage = useCallback((latest: string) => {
    if (!ceramic) return;
    (async () => {
      const doc = await TileDocument.load(ceramic, latest  );
      const content: {
        date: string;
        message: string;
        subject: string;
      } = doc.content as any;

      const latestMessage: StoredMessage = {
        id: doc.id.toString(),
        date: (new Date(content.date)).getTime(),
        content: content.message,
        sender: doc.controllers[0],
        subject: content.subject,
        status: 'loaded'
      }
      addMessage(latestMessage);
    })();
  }, [ceramic, addMessage]);

  useEffect(() => {
    if (!db || !ceramic) return;

    (async () => {
      const all = db
      .iterator({ reverse: true, limit: 10 })
      .collect()
      .reverse()
      .map((e: any) => { return e.payload.value.doc});
      
      for await (const msg of all) {
        convertMessage(msg);
      }

      //todo: this is not working as expected:
      console.log("listening");
      db.events.on('replicated', (address: string) => {
        console.log("replicated");
        const all = db
          .iterator({ reverse: true, limit: 3 })
          .collect()
          .reverse()
          .map((e: any) => { return e.payload.value.doc});

        const latest = all[0];
        convertMessage(latest);
      });     
    
    })();
  }, [db, ceramic, convertMessage]);

  const startAuth = useCallback(() => {
    dispatch({ type: 'auth', status: 'loading' });
  }, []);

  const authSuccess = useCallback(() => {
    dispatch({ type: 'auth success' });
  }, []);

  const openMailbox = useCallback(() => {
    dispatch({ type: 'nav mailbox' });
  }, []);

  const openMessage = useCallback((docID: string) => {
    dispatch({ type: 'nav message', docID });
    const msg = state.messages.find(m => m.id === docID);
    dispatch({
      type: 'message loaded',
      message: msg!,
    });
  }, [state.messages]);

  const logout = useCallback(() => {
    doLogout();
    dispatch({ type: 'auth logout' });
  }, [doLogout]);

  const openCompose = useCallback(() => {
    dispatch({ type: 'nav compose' });
  }, []);

  const search = useCallback((query: string) => {
    if (query.length < 3) return;
    dispatch({ type: 'search loading' });
    query = query.toLowerCase();

    const results = state.messages.filter(m => {
      return m.content.toLocaleLowerCase().indexOf(query) !== -1
        || m.subject.toLocaleLowerCase().indexOf(query) !== -1
        || m.sender.toLocaleLowerCase().indexOf(query) !== -1
    }).slice(0, 10);

    dispatch({ type: 'search loaded', results });
  }, [state.messages]);

  const clearSearch = useCallback(() => {
    dispatch({ type: 'search cleared' });
  }, []);

  return {
    startAuth,
    authSuccess,
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
