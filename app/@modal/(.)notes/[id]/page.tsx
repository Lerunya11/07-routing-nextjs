// app/@modal/(.)notes/[id]/page.tsx

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

type NotePreviewPageProps = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: NotePreviewPageProps) => {
  const { id } = await params;

  const note: Note = await fetchNoteById(id);

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal>
      <section className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>

        <div className={css.meta}>
          <span className={css.tag}>{note.tag}</span>
          <span className={css.date}>{formattedDate}</span>
        </div>
      </section>
    </Modal>
  );
};

export default NotePreviewPage;
