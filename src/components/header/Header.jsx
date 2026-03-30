import { Link, NavLink } from "react-router-dom"

function Header() {

  return (
    <>
      <header className="bg-white">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link to="#" className="-m-1.5 p-1.5">
                  <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-8 w-auto" />
              </Link>
            </div>
            <div className="flex lg:flex-1 pr-8">
              <el-popover-group className="hidden lg:flex lg:gap-x-12">
                <NavLink to="/" className={({isActive}) => `${isActive ? "text-orange-700" : "text-gray-700"} text-sm/6 font-semibold`}>Currency Converter</NavLink>
                <NavLink to="/password-generator" className={({isActive}) => `${isActive ? "text-orange-700" : "text-gray-700"} text-sm/6 font-semibold`}>Password Generator</NavLink>
                <NavLink href="#" className="text-sm/6 font-semibold text-gray-900">Contact Us</NavLink>
              </el-popover-group>
            </div>
        </nav> 
        </header>
    </>
  )
}

export default Header