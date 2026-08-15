import type { Metadata } from 'next'
import { CreateNoteForm } from '@/components/notes/CreateNoteForm'
import { NotesList } from '@/components/notes/NotesList'

export const metadata: Metadata = {
  title: 'Notes',
}

export default function NotesPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
        <p className="mt-1 text-sm text-zinc-500">Create and manage your personal notes.</p>
      </div>
      <CreateNoteForm />
      <NotesList />
    </div>
  )
}