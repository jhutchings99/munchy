import {
  BsFillHouseFill,
  BsSearch,
  BsFillPlusCircleFill,
  BsFillPersonFill,
  BsFillBookmarkFill,
} from "react-icons/bs";
import Logo from "../../assets/munchy-logo.png";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 flex justify-around md:justify-center md:gap-28 w-full p-2 bg-background items-center md:flex-col md:top-0 md:w-[30vw] md:items-start md:pl-12 lg:w-[20vw] lg:pl-19">
      <div className="flex items-center gap-2 text-lg hover:cursor-pointer select-none hidden md:flex">
        <img
          src={Logo}
          className="h-12 w-12 hover:cursor-pointer hidden md:block"
        />
        <p className="hidden md:block text-xl font-medium">Munchy</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Home"
      >
        <BsFillHouseFill className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Home</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Search"
      >
        <BsSearch className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Search</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg md:order-1 hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Munch"
      >
        <BsFillPlusCircleFill className="h-10 w-10 text-primary hover:cursor-pointer" />
        <p className="hidden md:block">Munch</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Bookmarks"
      >
        <BsFillBookmarkFill className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Bookmarks</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Profile"
      >
        <BsFillPersonFill className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Profile</p>
      </div>
    </div>
  );
};

export default Navbar;
