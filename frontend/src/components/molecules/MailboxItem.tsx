import { Box } from '@chakra-ui/layout';
import { StoredMessage } from 'contexts/State';

type MailboxItemProps = {
  message: StoredMessage;
  onClick: () => void;
};

const MailboxItem = (props: MailboxItemProps) => {
  return (
    <Box onClick={props.onClick} padding="2" borderBottom="1px solid #eee">
      {props.message.subject}
    </Box>
  );
};

export default MailboxItem;
