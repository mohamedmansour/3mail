# Introduction to 3Mail 

An SMTP-compatible "mail" client that uses Ceramic documents to sync & relay email-like messages between identities. Roughly related to did-comm.

![image](https://user-images.githubusercontent.com/1344649/120116936-fe3d2600-c18a-11eb-9ea1-0237b7bbdf30.png)

![image](https://user-images.githubusercontent.com/1344649/120116947-101ec900-c18b-11eb-90a7-2c7059bc8269.png)

![image](https://user-images.githubusercontent.com/1344649/120117004-52480a80-c18b-11eb-9625-51e26104647f.png)

![image](https://user-images.githubusercontent.com/1344649/120117024-6855cb00-c18b-11eb-9815-4994477906ea.png)


## Some Fundamentals

The fundamental idea of a self-sovereign identity is the "DID", a decentralized identifier, looking like `did:key:zkmanycharacters`. DIDs are uniquely identified by the key material of a user, derived by some random seed only the user knows. DIDs can be resolved/expanded to DID documents that contain information about the public keys a user uses for communication and authentication purposes. 

At its core, the Ceramic protocol uses DIDs to represent identities that are interacting with documents, atm did:3 and did:key are supported: https://developers.ceramic.network/learn/overview/#authentication. On top of Ceramic, IDX is adding a layer of well-formed documents that contain additional information about the user, e.g. a user "profile".

Ceramic is a "smart" document protocol that allows users to collaboratively document contents. A document is the result of applying many CRDT based changesets in the right order. It's the job of Ceramic nodes and the Ceramic network (Clay) to keep track of the changeset ordering and anchoring them on arbitrary blockchains / pinning their content on IPFS. Ceramic nodes make use of a cryptographically modified DAG component in IPFS (dag-jose) to create DID-crypto compatible IPLD relations between changesets. This all leads to one fundamental concept: each document gets **one unique key** after its creation ("genesis doc") and is modified by a sequence of change logs applied to it. Since a ceramic client enforces documents to adhere to predefined schemas and definitions, document types can contain logic that's applied when users are making changes to / reading those documents. Hence they call them "smart". 

## An "email" like messaging protocol on top of Ceramic

First, without "SMTP" integration.

A user runs a local "mail" client that's nothing but a client connected to a ceramic node (thereby connected to IPFS & blockchains which are hidden technical details of the ceramic protocol).

To interact with a ceramic node, a ceramic client must identify itself with a DID (see client initialization code).

A user can create a mail message, containing
recipient
subject
payload

These fields are wrapped into a new dispatchable ceramic document that's controlled by the sending party, roughly using these schematics: 

```
recipient: did:key:...
payload: __encrypted by (did:key:sender#encryption-key):__
  sender: did:key:sender...
  recipient: did:key...
  subject:...
  payload:...
__/encrypted__
```

The recipient can be any DID that's resolvable by the ceramic protocol (did:3 / did:key)

Upon sending I'm encrypting the message's content with the recipients' public encryption key (think this can be safely done inside ceramic already).

By adding the "message" document to ceramic it gets a unique ceramic document id like `ceramic://bafyfsdifsduifh`.

## Relaying

Every user / DID create a relay document that's world writeable (or writeable by DIDs the user trusts but that's another story.) that uses a schema like:

```
{inbox: [Message]}
...

Every user is *listening* locally on his relay document for updates. 

To "send" a mail to another user, the sender updates the recipient's relay document by adding his message document **id** to its inbox field, e.g.:

```
{
  inbox: [
    "ceramic://bafysomeidofanotherguy",
    "ceramic://bafythemessageiwanttosend", //<--
    ...
  ]
}

Since the recipient gets a notification about changes on his relay document he can fetch the content of `ceramic://bafythemessageiwanttosend` using the ceramic protocol on his machine, decrypt the payload with his private key and store the decrypted message locally (not necessary, it's only mandatory to list them)

## Nice to Haves

If the relay documents are publicly writeable, every user might delete the entry for every other user. That's not good ;) A custom Ceramic DocType should be perfectly able to allow only the creator (i.e. the owner) to remove entries and every other user to add entries.

To avoid "spam", a user might set controllers for his relay document (controllers are DIDs) so only Identities known to the user might send him mails.

(Extension 1, totally unexplained here: all users who want to send "blind" emails must add some token stake that the recipient will pay back after marking the message as "not spam")

## ENS / Nice names

Of course, it'll be much nicer if we could not only send emails to a DID (did:key:zk21323zwuhsef) but rather using a "readable" address: elamariachi@cemail.eth. We can use ENS to make that happen!

Someone (we) registers cemail.eth. We set 1 TXT record that contains a ceramic document id that represents the global email address registry. It's world writeable and lets each IDX DID define a name they want to be aliased with (did:keyzk98ur89289 || ceramic://bafyanidxdocumentindex => elmariachi).

A sender can use that email address in his client.

Our dispatching backend first resolves the ceramic registry document and then looks up a the IDX document id / DID of the recipient. 

(Alternative, maybe simpler: each user registers an "ENS root" we can send messages to, that resolves e.g. *@elmariachi.eth)

## SMTP gateway

Ideally, this whole thing (sending side!) works without a dedicated "sending" frontend. Instead, we're using commonly used desktop SMTP clients like "Outlook" (find the simplest option here for demo).

Our account is "did:key:zkourdidkey", respectively "something@our.eth" / "elmariachi@cemail.eth" when using ENS aliases

We don't need a password / any password will do / the private key's passphrase (we're not using passwords here)

Each user is running a small "SMTP" server on his machine. That one is configured with the private key (derived by a seed that's "safely" stored on disk) for the ceramic identity that matches the account name.

To relay mails for that account, the mail client is using this "SMTP" server.

the server behaves like an SMTP server but under the hood, it'll create/relay messages as written above

## Reading frontend

There's a simple (React) frontend that users can use to fetch/read messages. Of course, this could be built with a POP/IMAP interface but that will likely lead too far. 

It's just displaying a chronological message list on the left & a reading pane on the right.

## Slight UX addons

Recipients can mark a mail as "read". To do so, they're modifying the "read" status of the message document. To be able to do so, a sender (or the ceramic doctype) must allow the recipient to change the message doc content (esp. the "read" field).
