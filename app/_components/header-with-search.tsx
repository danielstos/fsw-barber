"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, CircleUser, LogOutIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import Search from "./search"

const HeaderSearch = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
        </Link>
        <div className="hidden md:block">
          <div className="flex flex-row items-center gap-4">
            <div className="min-w-[800px]">
              <Search />
            </div>
            {data?.user && (
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href="/bookings">
                  <CalendarIcon size={18} />
                  Agendamentos
                </Link>
              </Button>
            )}
            {data?.user ? (
              <div className="md flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={data?.user?.image ?? ""} />
                </Avatar>
                <div>
                  <p className="font-bold">{data.user.name}</p>
                  <p className="text-xs">{data.user.email}</p>
                </div>
              </div>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="left-[1250px] justify-start gap-2">
                      <CircleUser />
                      Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <SignInDialog />
                  </DialogContent>
                </Dialog>
              </>
            )}

            {data?.user && (
              <div className="flex flex-col gap-2 py-5">
                <Button
                  variant="ghost"
                  className="justify-start gap-2"
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default HeaderSearch
