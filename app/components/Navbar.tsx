import Link from 'next/link'
import React from 'react'
import BookIcon from './BookIcon'

const Navbar = () => {
  return (
    // <div className="flex h-screen w-full flex-col">
    <nav className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center gap-4">
        <Link
          className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
          href="/"
        >
          {/* <BookIcon className="h-6 w-6" /> */}
          <BookIcon />
          <span>BookMinder</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {/* <Button
            className="h-8 w-8 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            size="icon"
            variant="outline"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button> */}
        SignIn
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: '32/32',
                    objectFit: 'cover',
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-medium">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="font-medium">
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-medium">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
      </div>
    </nav>
    // </div>
  )
}

export default Navbar
