import { Avatar } from '../Avatar';
import { useProfile } from '@lawallet/react';

interface AutoAvatarProps {
  walias: string;
  size: number;
}

export function AutoAvatar(props: AutoAvatarProps) {
  const { walias, size } = props;
  const { nip05Avatar, lud16Avatar, domainAvatar, isLoading } = useProfile({ walias });

  return <Avatar alt={walias} size={size} src={(isLoading && nip05Avatar) || lud16Avatar || domainAvatar} />;
}
