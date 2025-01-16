import Link from 'next/link';
import NavLinks from '@/components/ui/sensors/nav-links';
//import AcmeLogo from '@/app/ui/acme-logo';
//import { PowerIcon } from '@heroicons/react/24/outline';
//import { signOut } from '@/auth';
//import BarkerLogo from '../barker-logo';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-barker-primary p-4 md:h-40"
        href="/"
      > 
       
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-barker-tertiary bg-opacity-20 md:block"></div>
        {/*Adds the signout capability*/}
      </div>
    </div>
  );
}
