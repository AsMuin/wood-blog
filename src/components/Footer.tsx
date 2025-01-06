import { assets } from '@/assets/assets';
import Image from 'next/image';
export default function Footer() {
    return (
        <div className="mt-6 flex flex-col items-center justify-around gap-2 bg-black py-5 sm:flex-row sm:gap-0">
            <Image src={assets.logo_light} alt="logo" width={120} />
            <p className="text-sm text-white">All right reserved. Copyright © 2025</p>
            <div className="flex">
                <Image src={assets.facebook_icon} alt="facebook" width={40} />
                <Image src={assets.twitter_icon} alt="twitter" width={40} />
                <Image src={assets.googleplus_icon} alt="google" width={40} />
            </div>
        </div>
    );
}
