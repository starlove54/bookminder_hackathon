import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { highlightText } from '../Utilities/HighlightText'

type CharacterCardProps = {
  characterCardKey: string
  bookId: string
  title: string
  description: string
  onDelete: (bookId: string, characterCardKey: string) => void
  onUpdate: (
    bookId: string,
    characterCardKey: string,
    title: string,
    description: string
  ) => void
  characterSearchQuery?: string
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterCardKey,
  bookId,
  title,
  description,
  onDelete,
  onUpdate,
  characterSearchQuery = '',
}) => {
  const [editedCharacterTitle, setEditedCharacterTitle] = useState(title)
  const [editedCharacterDescription, setEditedCharacterDescription] =
    useState(description)

  const handleDelete = () => {
    onDelete(bookId, characterCardKey)
    setEditedCharacterDescription(description)
    setEditedCharacterTitle(title)
  }

  const handleUpdate = () => {
    onUpdate(
      bookId,
      characterCardKey,
      editedCharacterTitle,
      editedCharacterDescription
    )
  }

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow dark:bg-gray-950 px-4 py-8  border-t-2 ">
      <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-50">
        {highlightText(title, characterSearchQuery)}
        {/* {title} */}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      <div className="mt-4 flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              size="sm"
              variant="outline"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-10 py-4">
              <div className="flex flex-col justify-start  gap-2 ">
                <Label htmlFor="name" className="flex justify-start text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  maxLength={50}
                  placeholder="New character title"
                  value={editedCharacterTitle}
                  onChange={(e) => setEditedCharacterTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-start  gap-2">
                <p>Description</p>
                <Textarea
                  maxLength={150}
                  placeholder="New character's description..."
                  value={editedCharacterDescription}
                  onChange={(e) =>
                    setEditedCharacterDescription(e.target.value)
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose disabled={editedCharacterTitle.length === 0}>
                <Button
                  variant="outline"
                  className="text-gray-500"
                  onClick={handleUpdate}
                  type="submit"
                  disabled={editedCharacterTitle.length === 0}
                >
                  update
                </Button>
              </DialogClose>
              <DialogClose>
                <Button variant="outline" className="text-gray-500">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          color="red"
          size="sm"
          onClick={handleDelete}
          variant="outline"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default CharacterCard
