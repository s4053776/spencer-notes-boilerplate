'use client'

import { addDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { getNotesCollection, noteDoc } from '@/lib/firebase/firestore'
import type { ActionResult } from '@/types'
import type { CreateNoteInput, UpdateNoteInput, Note } from '@/types/firestore'

export async function createNote(uid: string, input: CreateNoteInput): Promise<ActionResult> {
  try {
    await addDoc(getNotesCollection(), {
      uid,
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      _schemaVersion: 1,
    } as unknown as Note)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to create note' }
  }
}

export async function updateNote(id: string, input: UpdateNoteInput): Promise<ActionResult> {
  try {
    await updateDoc(noteDoc(id), {
      ...input,
      updatedAt: serverTimestamp(),
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update note' }
  }
}

export async function deleteNote(id: string): Promise<ActionResult> {
  try {
    await deleteDoc(noteDoc(id))
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete note' }
  }
}