// app/notes/filter/[...slug]/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { fetchNotes, type FetchNotesParams } from '@/lib/api';
import NotesClient from '../../Notes.client';

const PER_PAGE = 12;

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesFilterPage({ params }: Props) {
  const { slug } = await params;

  const tagFromUrl = slug?.[0]; // 'all', 'Work', 'Todo' и т.д.
  const tag = tagFromUrl === 'all' ? undefined : tagFromUrl;

  const initialParams: FetchNotesParams = {
    page: 1,
    perPage: PER_PAGE,
    search: '',
    tag,
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialParams],
    queryFn: () => fetchNotes(initialParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialParams={initialParams} />
    </HydrationBoundary>
  );
}
