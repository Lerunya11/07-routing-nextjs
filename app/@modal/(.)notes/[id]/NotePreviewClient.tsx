// app/@modal/(.)notes/[id]/NotePreview.client.tsx
'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';

import css from './NotePreview.module.css';

type NotePreviewClientProps = {
  note: Note;
};

const NotePreviewClient = ({ note }: NotePreviewClientProps) => {
  const router = useRouter();

  const handleClose = () => {
   
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <section className={css.preview}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
      </section>
    </Modal>
  );
};

export default NotePreviewClient;
