import { Text, Flex, Checkbox } from '@chakra-ui/react';
import { StoredMessage } from 'contexts/State';

type MailboxItemProps = {
  message: StoredMessage;
  onClick: () => void;
};

const MailboxItem = (props: MailboxItemProps) => {
  return (
    <Flex padding="2" borderBottom="1px solid #eee">
      <Checkbox marginRight="2" />
      <Flex overflow="hidden" onClick={props.onClick}>
        <Text
          width="3xs"
          flexShrink={0}
          color="gray"
          isTruncated
          marginRight={2}
        >
          {props.message.sender}
        </Text>
        <Text isTruncated flexShrink={1} marginLeft="3">
          {props.message.subject}
        </Text>
        <Text
          isTruncated
          flexBasis={0}
          flexGrow={1}
          flexShrink={1}
          marginLeft={2}
          color="gray.500"
        >
          {props.message.content}
        </Text>
        <Text
          whiteSpace="nowrap"
          fontSize={12}
          lineHeight="24px"
          color="gray.400"
          paddingLeft={2}
        >
          {Intl.DateTimeFormat(navigator.language, {
            month: 'short',
            day: 'numeric',
            hour: "numeric",
            minute:"numeric"
          }).format(props.message.date)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MailboxItem;
