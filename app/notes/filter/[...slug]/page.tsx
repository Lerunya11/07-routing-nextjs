// app/notes/filter/[...slug]/page.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { fetchNotes, type FetchNotesParams } from '@/lib/api';
import type { NoteTag } from '@/types/note';
import NotesClient from '../../Notes.client';

const PER_PAGE = 12;

// В Next 16 params передаётся как Promise — используем это явно
type RouteParams = {
  slug?: string[];
};

type Props = {
  params: Promise<RouteParams>;
};

export default async function NotesFilterPage({ params }: Props) {
  // ⬇️ Сначала дожидаемся params, потом читаем slug
  const { slug } = await params;

  // slug = ['all'] | ['Work'] | ['Todo'] | ['Personal'] | ... либо undefined → []
  const slugSegment = slug ?? [];

  // первая часть из URL: 'all', 'Work', 'Todo', 'Personal', ...
  const tagFromUrl = slugSegment[0];

  // если 'all' или пусто → тег НЕ передаём (бек вернёт все заметки)
  const tag: NoteTag | undefined =
    tagFromUrl && tagFromUrl !== 'all' ? (tagFromUrl as NoteTag) : undefined;

  const initialParams: FetchNotesParams = {
    page: 1,
    perPage: PER_PAGE,
    search: '',
    tag, // undefined → все заметки; 'Work' | 'Todo' и т.д. → фильтр по тегу
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
