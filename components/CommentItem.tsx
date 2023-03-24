import { FC, useEffect, useState } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { useStore } from '../store'
import { useMutateComment } from '../hooks/useMutateComment'
import { Spinner } from './Spinner'
import { Comment } from '../types/types'

export const CommentItem: FC<Omit<Comment, 'created_at' | 'note_id'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>('')
  const update = useStore((state) => state.updateEditedComment)
  const { deleteCommentMutation } = useMutateComment()

  useEffect(() => {
    const getUserId = async () => {
      const { data } = await supabase.auth.getUser()
      setUserId(data.user?.id)
    }
    getUserId()
  }, [])

  return (
    <li className="my-3">
      <span>{content}</span>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilSquareIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => {
              update({
                id: id,
                content: content,
              })
            }}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => deleteCommentMutation.mutate(id)}
          />
        </div>
      )}
    </li>
  )
}
