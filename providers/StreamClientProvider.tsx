import { useUser } from '@clerk/nextjs';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StremVideoProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error('Stream API key missing');

    const client = new StreamVideoClient({
      apiKey,
      userId: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
  }, [user, isLoaded]);

  return <StreamVideo client={client}></StreamVideo>;
};

export default StremVideoProvider;
