'use client'
import CharacterCard from '../Components/CharacterCard'
import { useState } from 'react'
import bookItems from '../bookItems.json'
import { Input } from '@/components/ui/input'
import { highlightText } from '../Utilities/HighlightText'
import { Button } from '@/components/ui/button'
import { Search, Edit, Trash2Icon, CircleX, CircleCheck } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Character = {
  id: string
  title: string
  description: string
}

type StoryPoint = {
  id: string
  title: string
  description: string
}

type Book = {
  id: string
  title: string
  characters: Character[]
  storypoints: StoryPoint[]
}

export default function Home() {
  const [books, setBook] = useState<Book[]>(bookItems)
  const [selectedBookId, setSelectedBookId] = useState('1')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [newBookTitle, setNewBookTitle] = useState<string>('')
  const [addNewStory, setAddNewStory] = useState(false)
  const [editingBookId, setEditingBookId] = useState<string | null>(null)
  const [editedBookTitle, setEditedBookTitle] = useState<string>('')
  const [originalBookTitle, setOriginalBookTitle] = useState<string>('')
  const [newCharacterCardName, setnewCharacterCardName] = useState<string>('')
  const [newCharacterCardDescription, setnewCharacterCardDescription] =
    useState<string>('')
  const [activeTab, setActiveTab] = useState('characters')

  const editBookTitle = (bookId: string, title: string) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          title: title,
        }
      }
      return book
    })
    setBook(updatedBooks)
    setEditingBookId(null) // Exit editing mode
  }

  const readBook = (id: string) => {
    setSelectedBookId(id)
  }

  const addCharacter = () => {
    if (!newCharacterCardName.trim()) return // Prevent adding character with empty name

    const selectedBookIndex = books.findIndex(
      (book) => book.id === selectedBookId
    )
    if (selectedBookIndex !== -1) {
      const newCharacter: Character = {
        id: crypto.randomUUID(),
        title: newCharacterCardName,
        description: newCharacterCardDescription,
      }

      const updatedBooks = [...books]
      updatedBooks[selectedBookIndex].characters.push(newCharacter)
      setBook(updatedBooks)

      // Reset input values after adding character
      setnewCharacterCardName('')
      setnewCharacterCardDescription('')
    }
  }

  const removeCharacter = (bookId: string, characterCardKey: string) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          characters: book.characters.filter(
            (character) => character.id !== characterCardKey
          ),
        }
      }
      return book
    })
    setBook(updatedBooks)
  }

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value)
  }

  const filteredBooks = books.filter((book) =>
    book.title
      .replace(/\s/g, '')
      .toLowerCase()
      .includes(searchQuery.replace(/\s/g, '').toLowerCase())
  )

  const addNewBook = () => {
    if (newBookTitle.trim() === '') {
      setAddNewStory(false)
      return // Prevent adding empty title
    }

    const newBook: Book = {
      // Create new book object
      id: crypto.randomUUID(),
      title: newBookTitle,
      characters: [],
      storypoints: [],
    }

    const updatedBooks = [newBook, ...books] // Add new book to the beginning of the books array
    setBook(updatedBooks) // Update books state

    // Reset input field
    setNewBookTitle('')
  }

  const handleAddNewStory = () => {
    setAddNewStory((prev) => !prev)
  }

  const deleteBook = (bookId: string) => {
    const updatedBooks = books.filter((item) => item.id !== bookId)
    setBook(updatedBooks)
    // Check if the currently selected book is deleted
    if (selectedBookId === bookId) {
      // If deleted, set selectedBookId to the id of the first book in the updated array
      if (updatedBooks.length > 0) {
        setSelectedBookId(updatedBooks[0].id)
      } else {
        // If no books left, reset selectedBookId to an empty string or any default value
        setSelectedBookId('')
      }
    }
  }

  const handleEmptySearchQuery = () => {
    setSearchQuery('')
  }
  const handleCharacterDialogClose = () => {
    // Reset input values or states related to the dialog here
    setnewCharacterCardName('')
    setnewCharacterCardDescription('')
  }

  const updateCharacter = (
    bookId: string,
    characterId: string,
    newTitle: string,
    newDescription: string
  ) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        const updatedCharacters = book.characters.map((character) => {
          if (character.id === characterId) {
            return {
              ...character,
              title: newTitle,
              description: newDescription,
            }
          }
          return character
        })

        return {
          ...book,
          characters: updatedCharacters,
        }
      }
      return book
    })

    setBook(updatedBooks)
  }

  return (
    <main>
      <div className="flex flex-1 overflow-hidden">
        <div className="border-r min-w-[230px] max-w-[230px] sm:min-w-[230px] sm:max-w-[350px] bg-gray-50/40  sm:block dark:bg-gray-800/40 ">
          <div className="flex h-full max-h-screen flex-col   sm:min-w-[350px] ">
            {/* Search input */}
            <div className="flex h-[65px] items-center border-b justify-center bg-white shadow-sm dark:bg-gray-950 ">
              <div className="flex items-center gap-2  font-semibold text-gray-600 dark:text-gray-50">
                <span className="text-lg">My Stories</span>
                <div className="flex justify-center items-center gap-1 max-w-[300px] ">
                  {/* <Search className=" w-5 h-5 text-gray-500" /> */}
                  <Input
                    value={searchQuery}
                    placeholder={`🔍 Search your story...`}
                    onChange={handleSearchInputChange}
                    className="h-8 font-small border-b-1 border-t-0 border-l-0 border-r-0 rounded-none"
                  />

                  {searchQuery.length > 0 && (
                    <CircleX
                      color="rgb(107 114 128)"
                      opacity={0.7}
                      width={22}
                      height={22}
                      onClick={handleEmptySearchQuery}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto text-wrap whitespace-normal gap-4   ">
              <div className="left-panel text-wrap whitespace-normal px-4  ">
                <div className="flex justify-center pb-1 pt-3   ">
                  {searchQuery.length === 0 && (
                    <Button
                      className="add-new-story-buton h-8 font-bold  text-gray-600 transition hover:scale-105"
                      variant="outline"
                      onClick={handleAddNewStory}
                    >
                      {addNewStory ? 'Add later' : 'New Story'}
                    </Button>
                  )}
                </div>
                <div className="stories-panel  text-wrap whitespace-normal  flex flex-col gap-1  ">
                  {/* adding new title */}
                  <div className="   flex items-center flex-col sm:flex-row gap-2 rounded-lg px-3 py-1 text-gray-500 ">
                    {searchQuery.length === 0 && addNewStory && (
                      <>
                        <Input
                          type="text"
                          className="h-8 mr-10"
                          placeholder="Enter new story..."
                          value={newBookTitle}
                          onChange={(e) => {
                            if (e.target.value.length <= 50) {
                              // Set your desired character limit, e.g., 50
                              setNewBookTitle(e.target.value)
                            }
                          }}
                        />
                        <Button
                          className="text-gray-600 hover:text-gray-900 h-8  transition hover:scale-105"
                          onClick={addNewBook}
                          variant="outline"
                        >
                          Add story
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Render filtered books while being searched in search box */}
                  {searchQuery.length >= 1 &&
                    filteredBooks.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 text-lg dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 cursor-pointer "
                        onClick={() => readBook(item.id)}
                      >
                        {/* {item.title} */}
                        {highlightText(item.title, searchQuery)}
                      </div>
                    ))}
                  {filteredBooks.length === 0 && (
                    <div className="text-gray-500 flex bg-gray-100 h-8  rounded-full   justify-center items-center ">
                      No results...
                    </div>
                  )}
                  {/* Original book list */}
                  {searchQuery.length === 0 &&
                    books.map((item, index) => (
                      <>
                        {/* {index >= 1 && (
                          <Separator
                            className="border-t border-gray-200"
                            orientation="horizontal"
                          />
                        )} */}
                        <div className="flex flex-row justify-start items-center gap-2  ">
                          {editingBookId === item.id ? (
                            <>
                              <Input
                                type="text"
                                className={`h-10 w-50 flex justify-center items-center border-none text-lg text-gray-500 ${
                                  editingBookId === item.id ? 'bg-gray-100' : ''
                                }`}
                                value={editedBookTitle}
                                onChange={(e) =>
                                  setEditedBookTitle(e.target.value)
                                }
                                placeholder={
                                  editedBookTitle.trim() !== ''
                                    ? ''
                                    : 'Please enter a title...'
                                }
                                onBlur={() => {
                                  if (editedBookTitle.trim() === '') {
                                    // Reset to original value and exit editing mode
                                    setEditedBookTitle(originalBookTitle)
                                    setEditingBookId(null)
                                  } else {
                                    // Save the edited title and exit editing mode
                                    editBookTitle(item.id, editedBookTitle)
                                    setEditingBookId(null)
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === 'Return') {
                                    e.currentTarget.blur() // Close editing mode
                                  }
                                }}
                                autoFocus // Automatically focuses the input field
                              />
                              <div className="ml-auto">
                                <CircleCheck
                                  color="rgb(107 114 128)"
                                  height={22}
                                  width={22}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                key={item.id}
                                className={`flex items-center flex-row  rounded-lg px-4 py-2 text-gray-500 transition-all hover:bg-slate-100 hover:text-gray-900 text-lg dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 cursor-pointer  overflow-hidden w-full  pt-4 h-full ${
                                  selectedBookId === item.id
                                    ? 'bg-slate-200 text-gray-500'
                                    : ''
                                }`}
                                onClick={() => readBook(item.id)}
                              >
                                {item.title}
                              </div>
                              <div className="ml-auto">
                                <span className="flex flex-row gap-6 ">
                                  <Edit
                                    className="w-4 h-4 opacity-55 hover:opacity-100"
                                    onClick={() => {
                                      setEditedBookTitle(item.title) // Reset edited title
                                      setEditingBookId(item.id)
                                      setSelectedBookId(item.id)
                                      setOriginalBookTitle(item.title)
                                    }}
                                  />
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Trash2Icon className="w-4 h-4 opacity-55 hover:opacity-100" />
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      <DialogHeader>
                                        <DialogTitle>Delete</DialogTitle>
                                        <DialogDescription>
                                          Are you sure you want to permanently
                                          delete
                                          {` ${item.title}`}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <DialogFooter>
                                        <DialogClose asChild>
                                          <Button
                                            variant="outline"
                                            type="submit"
                                            onClick={() => deleteBook(item.id)}
                                          >
                                            Yes
                                          </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                          <Button
                                            variant="outline"
                                            type="submit"
                                          >
                                            No
                                          </Button>
                                        </DialogClose>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col ">
          <div className="flex h-16 items-center justify-between border-b bg-gray-50/40 px-6 shadow-sm dark:bg-gray-800/40">
            <div className="flex items-center gap-4  ">
              <h1 className="text-3xl font-semibold text-gray-600 dark:text-gray-50">
                {books.find((item) => item.id === selectedBookId)?.title}
              </h1>
            </div>
            {/* <div className="flex items-center gap-2">sdfsdfsdf</div> */}
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="flex gap-4 mb-4">
              <button
                className={`text-xl rounded-full font-medium text-gray-500 hover:bg-slate-100 mb-2 dark:text-gray-50 px-4 py-2 ${
                  activeTab === 'characters' ? 'bg-slate-200' : ''
                }`}
                onClick={() => setActiveTab('characters')}
              >
                Characters
              </button>
              <button
                className={`text-xl rounded-full font-medium hover:bg-slate-100 text-gray-500 mb-2 dark:text-gray-50 px-4 py-2 ${
                  activeTab === 'storypoints' ? 'bg-slate-200' : ''
                }`}
                onClick={() => setActiveTab('storypoints')}
              >
                StoryPoints
              </button>
            </div>

            {activeTab === 'characters' && (
              <div className="character-tab p-4 ">
                <div>
                  <Dialog>
                    <div className="flex  gap-4  ">
                      <DialogTrigger asChild>
                        <Button variant="outline" className="h-8 w-30 mb-4">
                          Add character
                        </Button>
                      </DialogTrigger>
                      <div className="flex  gap-1 max-w-[300px] ">
                        {/* <Search className=" w-5 h-5 text-gray-500" /> */}
                        <Input
                          value={searchQuery}
                          placeholder={`🔍 Search character...`}
                          onChange={handleSearchInputChange}
                          className="h-8 font-small border-b-1 border-t-0 border-l-0 border-r-0 rounded-none"
                        />

                        {searchQuery.length > 0 && (
                          <CircleX
                            color="rgb(107 114 128)"
                            opacity={0.7}
                            width={22}
                            height={22}
                            onClick={handleEmptySearchQuery}
                          />
                        )}
                      </div>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          New character card
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-10 py-4">
                        <div className="flex flex-col justify-start  gap-2 ">
                          <Label
                            htmlFor="name"
                            className="flex justify-start text-right"
                          >
                            Name
                          </Label>
                          <Input
                            id="name"
                            maxLength={50}
                            placeholder="New character title"
                            value={newCharacterCardName}
                            onChange={(e) =>
                              setnewCharacterCardName(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col justify-start  gap-2">
                          <p>Description</p>
                          <Textarea
                            maxLength={150}
                            placeholder="New character's description..."
                            value={newCharacterCardDescription}
                            onChange={(e) =>
                              setnewCharacterCardDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose
                          disabled={
                            newCharacterCardName.length === 0 ||
                            newCharacterCardDescription.length === 0
                          }
                        >
                          <Button
                            disabled={
                              newCharacterCardName.length === 0 ||
                              newCharacterCardDescription.length === 0
                            }
                            onClick={addCharacter}
                            className="text-gray-500"
                            type="submit"
                            variant="outline"
                          >
                            Add
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button
                            variant="outline"
                            className="text-gray-500"
                            onClick={handleCharacterDialogClose}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                  {books
                    .find((item) => item.id === selectedBookId)
                    ?.characters.map((character) => (
                      <CharacterCard
                        key={character.id}
                        characterCardKey={character.id}
                        title={character.title}
                        description={character.description}
                        bookId={selectedBookId}
                        onDelete={removeCharacter}
                        onUpdate={updateCharacter}
                      />
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'storypoints' && (
              <div className="storypoints-tab grid gap-6 py-8 ">
                <div className="relative grid gap-4 pl-6 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
                  <div className="grid gap-4 text-sm relative">
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                    {books
                      .find((item) => item.id === selectedBookId)
                      ?.storypoints.map((item) => (
                        <>
                          <div key={item.id} className="font-medium">
                            {item.title}{' '}
                          </div>
                          <div
                            key={item.id}
                            className="text-gray-500 dark:text-gray-400"
                          >
                            {item.description}{' '}
                          </div>
                        </>
                      ))}
                  </div>
                  <div className="grid gap-1 text-sm relative">
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* <div className="flex-1 overflow-auto p-6  ">
            <div className="grid gap-6 ">
              <div className="grid gap-4">
                <div className="flex flex-col gap-2  ">
                  <div className="character-tab border-2 border-red-600 ">
                    <h2 className="text-2xl font-semibold text-gray-500 mb-2   dark:text-gray-50 ">
                      Characters
                    </h2>
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-8 w-30 my-4">
                            Add character
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">
                              New character card
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-10 py-4">
                            <div className="flex flex-col justify-start  gap-2 ">
                              <Label
                                htmlFor="name"
                                className="flex justify-start text-right"
                              >
                                Name
                              </Label>
                              <Input
                                id="name"
                                maxLength={50}
                                placeholder="New character title"
                                value={newCharacterCardName}
                                onChange={(e) =>
                                  setnewCharacterCardName(e.target.value)
                                }
                              />
                            </div>
                            <div className="flex flex-col justify-start  gap-2">
                              <p>Description</p>
                              <Textarea
                                maxLength={150}
                                placeholder="New character's description..."
                                value={newCharacterCardDescription}
                                onChange={(e) =>
                                  setnewCharacterCardDescription(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose
                              disabled={
                                newCharacterCardName.length === 0 ||
                                newCharacterCardDescription.length === 0
                              }
                            >
                              <Button
                                disabled={
                                  newCharacterCardName.length === 0 ||
                                  newCharacterCardDescription.length === 0
                                }
                                onClick={addCharacter}
                                type="submit"
                              >
                                Add
                              </Button>
                            </DialogClose>
                            <DialogClose>
                              <Button onClick={handleCharacterDialogClose}>
                                Cancel
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                      {books
                        .find((item) => item.id === selectedBookId)
                        ?.characters.map((character) => (
                          <CharacterCard
                            key={character.id}
                            characterCardKey={character.id}
                            title={character.title}
                            description={character.description}
                            bookId={selectedBookId}
                            onDelete={removeCharacter}
                            onUpdate={updateCharacter}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="storypoints-tab grid gap-6 py-8 border-2">
                <h2 className="text-2xl  font-semibold text-gray-500 dark:text-gray-50">
                  StoryPoints
                </h2>
                <div className="relative grid gap-4 pl-6 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
                  <div className="grid gap-4 text-sm relative">
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                    {books
                      .find((item) => item.id === selectedBookId)
                      ?.storypoints.map((item) => (
                        <>
                          <div key={item.id} className="font-medium">
                            {item.title}{' '}
                          </div>
                          <div
                            key={item.id}
                            className="text-gray-500 dark:text-gray-400"
                          >
                            {item.description}{' '}
                          </div>
                        </>
                      ))}
                  </div>
                  <div className="grid gap-1 text-sm relative">
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  )
}
