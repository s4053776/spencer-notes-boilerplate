'use client'

import { where, orderBy } from 'firebase/firestore'
import { StickyNote, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { useCollection } from '@/hooks/useFirestore'
import { getNotesCollection } from '@/lib/firebase/firestore'
import { deleteNote } from '@/actions/notes.actions'
import { EmptyState } from '@/components/shared/EmptyState'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import type { Note } from '@/types/firestore'

export function NotesList() {
  const { user } = useAuth()
  const { data: notes, loading } = useCollection<Note>(
    getNotesCollection(),
    where('uid', '==', user?.uid ?? ''),
    orderBy('updatedAt', 'desc')
  )

  const handleDelete = async (id: string) => {
    const result = await deleteNote(id)
    if (result.success) {
      toast.success('Note deleted')
    } else {
      toast.error(result.error ?? 'Failed to delete note')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <EmptyState icon={StickyNote} title="No notes yet" description="Create your first note above." />
    )
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-sm">{note.title}</h3>
              {note.body && (
                <p className="mt-1 text-sm text-zinc-500 whitespace-pre-wrap">{note.body}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(note.id)}
              className="shrink-0 text-zinc-400 hover:text-red-500"
              aria-label="Delete note"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}