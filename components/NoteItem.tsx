import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { useStore } from '../store'
import { useMutateNote } from '../hooks/useMutateNote'
import { Spinner } from './Spinner'
import { Note } from '../types/types'

export const NoteItem: FC<
  Omit<Note, 'created_at' | 'note_id' | 'comments'>
> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedNote)
  const { deleteNoteMutation } = useMutateNote()

  useEffect(() => {
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser()
      setUserId(data.user?.id)
    }
    getUserId()
  }, [])

  if (deleteNoteMutation.isLoading) return <Spinner />

  return (
    <li className="my-3">
      <Link
        href={`/note/${id}`}
        className="cursor-pointer hover:text-pink-600"
        prefetch={false}
      >
        {title}
      </Link>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilSquareIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                title: title,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              deleteNoteMutation.mutate(id)
            }}
          />
        </div>
      )}
    </li>
  )
}
