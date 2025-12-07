// app/@modal/(.)notes/[id]/page.tsx
import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

type NotePreviewPageProps = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: NotePreviewPageProps) => {
  const { id } = await params;

  const note = await fetchNoteById(id);

  if (!note) {
    
    return null;
  }

  return <NotePreviewClient note={note} />;
};

export default NotePreviewPage;
