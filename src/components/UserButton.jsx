'use client'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { BiLoaderCircle } from "react-icons/bi";

export default function UserButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="navbar-end">
        <BiLoaderCircle className="size-6 animate-spin mx-1" />
      </div>
    )
  }

  const handleLogout = (e) => {
    e.preventDefault()
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className='navbar-end'>
        {session ? (
          <div className="flex items-center gap-1">
            <div>
              <button className="btn btn-ghost py-6">
                <Link href={'/blog/create-blog'}>Write</Link>
              </button>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost py-6">
                <div className="size-10 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-200">
                    {session?.user?.name?.charAt(0)}
                  </span>
                </div>
                {session?.user?.name}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  {/* Bouton de déconnexion */}
                  <button
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="btn btn-ghost">
            <Link href={'/login'}>Login</Link>
          </div>
        )}
    </div>
  )
}
