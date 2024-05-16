'use client'
import Card from '../Components/Card'
import Plus from '../Components/Plus'
import { useState } from 'react'
import bookItems from '../bookItems.json'
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator'
import { highlightText } from '../Utilities/HighlightText'
import { Button } from '@/components/ui/button'
import { Edit, Trash2Icon } from 'lucide-react'

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

  const readBook = (id: string) => {
    setSelectedBookId(id)
  }
  const addCharacter = () => {
    // Find the book with the selected ID
    const selectedBook = books.find((item) => item.id === selectedBookId)

    if (selectedBook) {
      // Create a new character object
      const newCharacter = {
        id: crypto.randomUUID(),
        title: 'New character title',
        description: 'Add the description for the new character',
      }

      // Create a new array with the updated characters
      const updatedCharacters = [...selectedBook.characters, newCharacter]

      // Update the book with the new characters array
      const updatedBooks = books.map((book) => {
        if (book.id === selectedBookId) {
          console.log(selectedBook.characters)
          return {
            ...book,
            characters: updatedCharacters,
          }
        }
        return book
      })
      // Update the state with the updated books array
      setBook(updatedBooks)
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
    console.log(updatedBooks)
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
                <div className="flex justify-center max-w-[300px]">
                  <Input
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="h-8 font-small"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto text-wrap whitespace-normal gap-4 ">
              <div className="left-panel text-wrap whitespace-normal  px-4   ">
                <div className="flex justify-center pb-1 pt-3  ">
                  <Button
                    className="add-new-story-buton h-8 font-bold  text-gray-600 transition hover:scale-105"
                    variant="outline"
                    onClick={handleAddNewStory}
                  >
                    {addNewStory ? 'Add later' : 'New Story'}
                  </Button>
                </div>
                <div className="stories-panel text-wrap whitespace-normal  flex flex-col  gap-1   ">
                  {/* adding new title */}
                  <div className="flex items-center flex-col sm:flex-row gap-2 rounded-lg px-3 py-1 text-gray-500 ">
                    {addNewStory && (
                      <>
                        <Input
                          type="text"
                          className="h-8"
                          placeholder="Enter new story title..."
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
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 text-lg dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 cursor-pointer"
                        onClick={() => readBook(item.id)}
                      >
                        {/* {item.title} */}
                        {highlightText(item.title, searchQuery)}
                      </div>
                    ))}
                  {/* Original book list */}
                  {searchQuery.length === 0 &&
                    books.map((item, index) => (
                      <>
                        {index >= 1 && (
                          <Separator
                            className="border-t border-gray-200"
                            orientation="horizontal"
                          />
                        )}
                        <div className="flex flex-row justify-start items-center gap-2 ">
                          <div
                            key={item.id}
                            className="flex items-center flex-row  rounded-lg px-4 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 text-lg dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 cursor-pointer  "
                            onClick={() => readBook(item.id)}
                          >
                            {item.title}
                          </div>
                          <div className="ml-auto">
                            <span className="flex flex-row gap-6 ">
                              <Edit className="w-4 h-4 opacity-55 hover:opacity-100" />
                              <Trash2Icon
                                className="w-4 h-4 opacity-55 hover:opacity-100"
                                onClick={() => deleteBook(item.id)}
                              />
                            </span>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex h-16 items-center justify-between border-b bg-gray-50/40 px-6 shadow-sm dark:bg-gray-800/40">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold text-gray-600 dark:text-gray-50">
                {books.find((item) => item.id === selectedBookId)?.title}
              </h1>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h2 className="text-2xl font-semibold text-gray-500  dark:text-gray-50">
                  Characters
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {books
                    .find((item) => item.id === selectedBookId)
                    ?.characters.map((character) => (
                      <Card
                        key={character.id}
                        characterCardKey={character.id}
                        title={character.title}
                        description={character.description}
                        bookId={selectedBookId}
                        onDelete={removeCharacter}
                      />
                    ))}
                  <Plus onClick={() => addCharacter()} />
                </div>
              </div>
              <div className="grid gap-6 py-8">
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
          </div>
        </div>
      </div>
    </main>
  )
}
